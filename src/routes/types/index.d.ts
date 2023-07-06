import { Query as query } from 'express-serve-static-core';
export namespace TypedRequest {
    interface Body<T> extends Express.Request {
        body: T
    }
    interface Query<T extends query> extends Express.Request {
        query: T
    }
    interface BodyQuery<T, K> extends Express.Request {
        body: T,
        query: K
    }
}