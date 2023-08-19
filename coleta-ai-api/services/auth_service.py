import hashlib
from typing import Optional
from fastapi import HTTPException
from entities.user import User
from repositories import user_repository
from requests.login_request import LoginRequest


def __get_auth_key() -> str:
    with open("auth_key.txt", "r") as f:
        return f.read().replace("\n", "")


def __get_active_user(user_email: str) -> User:
    user = user_repository.get_user_by_email(user_email)
    if user is None or not user.active:
        raise HTTPException(status_code=401, detail="Invalid user")
    return user


def login(request: LoginRequest) -> str:
    user = __get_active_user(request.email)
    password = hashlib.md5(bytes(request.password, "utf-8"))
    if user.password != password.hexdigest():
        raise HTTPException(status_code=401, detail="Invalid user")

    return f"{user.email}|{__get_auth_key()}"


def extract_user_from_token(token: str) -> Optional[User]:
    user_email, auth_key = token.split("|")
    user = __get_active_user(user_email)
    if __get_auth_key() == auth_key:
        return user
    return None
