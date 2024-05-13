import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import {
	AnimationBaseT,
	AnimationChildrenTypesT,
} from '@/types/animation/animation.types';
import mongoClientPromise from '@/libs/mongodb/mongoClient';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const ids = searchParams.get('ids');

	if (ids) {
		const objectIds: ObjectId[] = decodeURIComponent(ids)
			.split('&')
			.map((id) => new ObjectId(id));

		const client = await mongoClientPromise;

		const animations = await client
			.db(process.env.NEXT_PUBLIC_MONGO_DB_NAME)
			.collection(process.env.NEXT_PUBLIC_MONGO_ANIMATIONS_COLLECTION)
			.find<AnimationBaseT>({
				_id: { $in: objectIds },
			})
			.toArray();

		if (!animations) {
			return new NextResponse(null, {
				status: 404,
				statusText: 'Unable to find animations',
			});
		} else {
			return NextResponse.json(animations);
		}
	} else {
		return new NextResponse(null, {
			status: 422,
			statusText: 'Missing required query parameters',
		});
	}
}

export async function POST(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const duplicateId = searchParams.get('duplicateId');

	const formData = await req.formData();
	const data = {
		type: formData.get('type') as AnimationChildrenTypesT,
		name: formData.get('name') as string,
		description: formData.get('description') as string,
	};

	const client = await mongoClientPromise;
	const collection = client
		.db(process.env.NEXT_PUBLIC_MONGO_DB_NAME)
		.collection(process.env.NEXT_PUBLIC_MONGO_ANIMATIONS_COLLECTION);

	let newAnimation: Omit<AnimationBaseT, '_id'> | any = {
		...data,
		dateCreated: new Date(),
		dateModified: new Date(),
		children: [],
	};

	if (duplicateId) {
		const animationToDuplicate = await collection
			.find<AnimationBaseT>({ _id: new ObjectId(duplicateId) })
			.limit(1)
			.next();

		if (!animationToDuplicate) {
			return new NextResponse(null, {
				status: 410,
			});
		}

		newAnimation = {
			...animationToDuplicate,
			...newAnimation,
		};
	} else {
		const isAnimationStatic = data.type === AnimationChildrenTypesT.animation;

		newAnimation = {
			...newAnimation,
			...(isAnimationStatic && {
				frames: [],
				framesLength: 0,
				duration: 0,
				power: 0,
			}),
		};
	}

	const result = await collection.insertOne(newAnimation);

	if (result.insertedId) {
		return new NextResponse(null, {
			status: 201,
		});
	} else {
		return new NextResponse(null, {
			status: 500,
		});
	}
}

// export async function PATCH(req: NextRequest) {
// 	try {
// 		const dateModified = new Date();
// 		const { name, ...animationData }: AnimationT = await req.json();
// 		console.log('🚀 ~ PATCH ~ animationData:', animationData);

// 		const client = await mongoClientPromise;

// 		const result = await client
// 			.db(process.env.DB_NAME)
// 			.collection(process.env.EFFECTS_COLLECTION)
// 			.findOneAndUpdate({ name: name }, { $set: animationData });
// 		console.log('🚀 ~ PATCH ~ result:', result);
// 	} catch (e) {
// 		console.log(e);
// 		console.error(e);
// 	}

// 	return new NextResponse(null, {
// 		status: 200,
// 	});
// }
