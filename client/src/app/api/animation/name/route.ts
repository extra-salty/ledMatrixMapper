import { NextRequest, NextResponse } from 'next/server';
import { AnimationBaseT } from '@/types/animation/animation.types';
import mongoClientPromise from '@/libs/mongodb/mongoClient';

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get('name');

	if (name) {
		const client = await mongoClientPromise;

		const animation = await client
			.db(process.env.NEXT_PUBLIC_MONGO_DB_NAME)
			.collection<AnimationBaseT>(process.env.NEXT_PUBLIC_MONGO_ANIMATIONS_COLLECTION)
			.find({ name: name })
			.limit(1)
			.next();

		return NextResponse.json({ exist: animation ? true : false });
	} else {
		return new NextResponse(null, {
			status: 422,
			statusText: 'Missing required query parameters',
		});
	}
}
