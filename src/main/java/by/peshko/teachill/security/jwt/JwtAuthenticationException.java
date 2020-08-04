package by.peshko.teachill.security.jwt;

import org.springframework.security.core.AuthenticationException;

/**
 * @author Artem Peshko
 * @version 1.0
 */

public class JwtAuthenticationException extends AuthenticationException {
    public JwtAuthenticationException(String msg, Throwable t) {
        super(msg, t);
    }

    public JwtAuthenticationException(String msg) {
        super(msg);
    }
}