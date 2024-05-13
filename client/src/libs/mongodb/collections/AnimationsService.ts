import { AnimationBaseT, AnimationStateT } from '@/types/animation/animation.types';
import { CollectionT } from '@/providers/DatabaseProvider/DatabaseProvider';
import { Animation } from '@/types/animation/animationConstructor.types';
import { BSON } from 'realm-web';
import {
	EffectBaseT,
	EffectListStateT,
	EffectCollectionStateT,
} from '@/types/effects/effect.types';
import { PlaylistDataT } from '@/types/playlist/playlist.types';

import dayjs from 'dayjs';

export type DeleteResultT = Realm.Services.MongoDB.DeleteResult;
export type InsertOneResultT = Realm.Services.MongoDB.InsertOneResult<BSON.ObjectID>;
export type UpdateResultT = Realm.Services.MongoDB.UpdateResult<BSON.ObjectID>;

type ConvertedAnimationT = {
	details: AnimationStateT;
	effects: EffectListStateT;
};

export class AnimationCollection {
	private collection: CollectionT<AnimationBaseT>;
	private userId: string;

	constructor(userId: string, collection: CollectionT<AnimationBaseT>) {
		this.userId = userId;
		this.collection = collection;
	}

	private convertToState(animation: AnimationBaseT): ConvertedAnimationT {
		const { userId, _id, dateCreated, dateModified, effects, ...rest } = animation;

		return {
			details: {
				...rest,
				_id: _id.toString(),
				dateCreated: dayjs(dateCreated).format(),
				dateModified: dayjs(dateModified).format(),
				disabled: false,
			},
			effects,
		};
	}

	private async findOne(_id: string): Promise<AnimationBaseT | null> {
		return await this.collection.findOne({
			_id: new BSON.ObjectID(_id),
			userId: this.userId,
		});
	}

	private async insertOne(
		animation: Omit<AnimationBaseT, '_id'>,
	): Promise<InsertOneResultT> {
		return await this.collection.insertOne(animation);
	}

	async getAnimation(_id: string): Promise<
		| {
				details: AnimationStateT;
				effects: EffectListStateT;
		  }
		| undefined
	> {
		const animation = await this.findOne(_id);

		if (animation) return this.convertToState(animation);
	}

	async getAnimations(): Promise<AnimationStateT[]> {
		const animations = await this.collection.find(
			{ userId: this.userId },
			{ projection: { effects: 0 } },
		);

		return animations
			.map((animation) => this.convertToState(animation))
			.map((animation) => animation.details);
	}

	async validateName(name: string) {
		const animation = await this.collection.findOne({
			name: name,
			userId: this.userId,
		});

		if (animation) throw { message: 'Name already exist', code: 409 };
	}

	async create(formData: FormData): Promise<InsertOneResultT> {
		const newAnimation = new Animation(this.userId, formData);

		return await this.insertOne(newAnimation);
	}

	async duplicate(
		_id: string,
		formData: FormData,
	): Promise<InsertOneResultT | undefined> {
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		const animationToDuplicate = await this.findOne(_id);

		if (animationToDuplicate) {
			const { _id, ...rest } = animationToDuplicate;

			const newAnimation: Omit<AnimationBaseT, '_id'> = {
				...rest,
				userId: this.userId,
				name,
				description,
				dateCreated: new Date(),
				dateModified: new Date(),
			};

			return await this.insertOne(newAnimation);
		}
	}

	async delete(ids: string[]): Promise<DeleteResultT> {
		const objectIds = ids.map((id) => new BSON.ObjectID(id));

		return await this.collection.deleteMany({
			_id: { $in: objectIds },
			userId: this.userId,
		});
	}

	private convertToBase(
		animation: AnimationStateT,
		effects: EffectListStateT,
	): AnimationBaseT {
		const { _id, dateCreated, dateModified, ...rest } = animation;

		console.log(rest.children);

		const baseEffectsArr: [string, EffectBaseT][] = Object.entries(effects).map(
			([key, { frames, ...rest }]) => [
				key,
				{
					...rest,
					frames: Object.fromEntries(
						Object.entries(frames).map(([key, { undo, redo, ...rest }]) => [
							key,
							{
								...rest,
							},
						]),
					),
				},
			],
		);

		return {
			userId: this.userId,
			_id: new BSON.ObjectID(_id),
			dateCreated: dayjs(dateCreated).toDate(),
			dateModified: new Date(),
			effects: Object.fromEntries(baseEffectsArr),
			...rest,
		};
	}

	async save(animation: AnimationStateT, effects: EffectListStateT) {
		const updatedAnimation = this.convertToBase(animation, effects);

		return await this.collection.findOneAndUpdate(
			{
				_id: updatedAnimation._id,
				userId: this.userId,
			},
			updatedAnimation,
		);
	}

	async saveAll(animations: PlaylistDataT, effects: EffectCollectionStateT) {
		Object.values(animations).forEach((animation) => {
			this.save(animation, effects[animation._id]);
		});
	}
}
