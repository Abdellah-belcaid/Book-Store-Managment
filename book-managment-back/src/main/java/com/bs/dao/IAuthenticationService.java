package com.bs.dao;

import com.bs.model.User;

public interface IAuthenticationService {

	User signInAndReturnJWT(User SignInRequest);

}
