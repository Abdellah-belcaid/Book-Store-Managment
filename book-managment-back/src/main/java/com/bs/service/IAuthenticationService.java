package com.bs.service;

import com.bs.model.User;

public interface IAuthenticationService {

	User signInAndReturnJWT(User SignInRequest);

}
