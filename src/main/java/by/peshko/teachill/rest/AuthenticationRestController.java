package by.peshko.teachill.rest;

import by.peshko.teachill.dto.AuthenticationRequestDto;
import by.peshko.teachill.dto.SingUpDto;
import by.peshko.teachill.dto.UserDto;
import by.peshko.teachill.model.UserEntity;
import by.peshko.teachill.repository.UserRepository;
import by.peshko.teachill.security.jwt.JwtResponse;
import by.peshko.teachill.security.jwt.JwtTokenProvider;
import by.peshko.teachill.security.jwt.JwtUser;
import by.peshko.teachill.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Artem Peshko
 * @version 1.0
 */
@Slf4j
@CrossOrigin(value = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/auth")
public class AuthenticationRestController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    private final UserRepository userRepository;

    @Autowired
    public AuthenticationRestController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserService userService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
        this.userRepository = userRepository;
    }
    @PostMapping("/singin")
    public ResponseEntity<?> authenticateUser (@Valid  @RequestBody AuthenticationRequestDto requestDto) {
        try {
            String username = requestDto.getUsername();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, requestDto.getPassword()));
            UserEntity user = userService.findByUsername(username);

            if (user == null) {
                throw new UsernameNotFoundException("User with username: " + username + " not found");
            }
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.createToken(username, user.getRoles());

            JwtUser userDetails = (JwtUser) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(token,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @PostMapping("/singup")
    public UserEntity registerUser (@RequestBody UserEntity user) {

        return userService.register(user);
    }

    @GetMapping("/all")
    public String all () {
        return "all";
    }
    @GetMapping("/user")
    public String user () {
        return "user";
    }

    @GetMapping("/admin")
    public String admin () {
        return "admin";
    }
}