package com.bs.service;

import com.bs.dao.UserDTO;
import com.bs.model.User;

public interface IAuthenticationService {

	UserDTO signInAndReturnJWT(User SignInRequest);

}
