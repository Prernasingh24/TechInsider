package com.blog.controllers;
import java.security.Principal;
import java.util.*;
import org.modelmapper.ModelMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.blog.payloads.JwtAuthRequest;
import com.blog.payloads.JwtAuthResponse;
import com.blog.payloads.UserDto;
import com.blog.repositories.UserRepo;
import com.blog.security.JwtTokenHelper;
import com.blog.services.UserService;
import jakarta.validation.Valid;
import  com.blog.exceptions.ApiException;
import com.blog.model.User;

@RestController
@RequestMapping("/api/v1/auth/")

public class AuthController {


@Autowired
private JwtTokenHelper jwtTokenHelper;
@Autowired
private UserDetailsService userDetailsService;
@Autowired
private AuthenticationManager authenticationManager;
@Autowired
private UserService userService;
@Autowired
private ModelMapper mapper;
@PostMapping("/login")
public ResponseEntity<JwtAuthResponse> createToken(@RequestBody JwtAuthRequest request)

{
this.authenticate(request.getUsername(),request.getPassword());

// if authentication is right so now we will generate token by getting details
UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
String token = this.jwtTokenHelper.generateToken(userDetails);
JwtAuthResponse response = new JwtAuthResponse();
response.setToken(token);
response.setUser(this.mapper.map((User) userDetails, UserDto.class));
return new ResponseEntity<JwtAuthResponse>(response,HttpStatus.OK);

}
private void authenticate(String username, String password)
{
UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,password);
this.authenticationManager.authenticate(authenticationToken);
try {
this.authenticationManager.authenticate (authenticationToken);
} catch (BadCredentialsException e) { System.out.println("Invalid Detials !!"); throw new ApiException("Invalid username or password !!"); }

}

@PostMapping("/register")
public ResponseEntity<UserDto> registerUser(@Valid @RequestBody UserDto userDto) {
	UserDto registeredUser = this.userService.registerNewUser(userDto);
	return new ResponseEntity<UserDto>(registeredUser, HttpStatus.CREATED);
}

// get loggedin user data
@Autowired
private UserRepo userRepo;


@GetMapping("/current-user/")
public ResponseEntity<UserDto> getUser(Principal principal) {
	User user = this.userRepo.findByEmail(principal.getName()).get();
	return new ResponseEntity<UserDto>(this.mapper.map(user, UserDto.class), HttpStatus.OK);
}

}