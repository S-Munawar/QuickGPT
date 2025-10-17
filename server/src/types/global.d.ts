// Augment Express Request to include `user` attached by auth middleware.
// Using the express-serve-static-core module augmentation ensures compatibility
// with Express types provided by @types/express.
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
	interface Request {
		user?: any;
	}
}

// Replace `any` with a concrete user/document type for stricter typing later.
