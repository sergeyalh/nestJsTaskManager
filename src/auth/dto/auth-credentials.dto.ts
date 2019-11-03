import {IsNotEmpty, IsString, MinLength, MaxLength, Matches} from 'class-validator'

export class AuthCredentialsDto {

    @ IsString()
    @ MinLength(4)
    @ MaxLength(12)
    username: string;

    @ IsString()
    @ MinLength(8)
    @ MaxLength(12)
    @ Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Weak Password'})
    password: string;
}
