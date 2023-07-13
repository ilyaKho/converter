import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import * as admin from 'firebase-admin'
import { signUpType } from './auth.schema'
export const signUp = async (dto: signUpType) => {
    try {
        await admin.auth().createUser({
            email: dto.email,
            password: dto.password
        })
    } catch (error) {
        throw error
    }
}

export const signIn = async (dto: signUpType) => {
    try {
        // await admin.auth().generateSignInWithEmailLink()
    } catch (error) {
        throw error
    }
}
