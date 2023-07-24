package com.example.demo.security;


import com.example.demo.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .authorizeRequests()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/thymeleaf/**").permitAll()
                .antMatchers(HttpMethod.POST, "/product_data").permitAll()
                .antMatchers(HttpMethod.GET, "/product").permitAll()
                .antMatchers("/camp/**").permitAll()
                .antMatchers("/", "/static/**", "/CAMOLOGO.png", "/introMovie.mp4").permitAll()
                .antMatchers("/campcomment/**").permitAll()
                .antMatchers("/weather/**").permitAll()
                .antMatchers("/image/**").permitAll()
                .antMatchers("/oji/**").permitAll()
                .antMatchers("/cart/**").permitAll()
                .antMatchers("/likes/**").permitAll()
                .antMatchers("/comment/**").permitAll()
                .antMatchers("/review/**").permitAll()
                .antMatchers("/one-Line/**").permitAll()
                .antMatchers("/intro/**").permitAll()
                .antMatchers("/open/**").permitAll()
                .antMatchers("/UserEdit/**").permitAll()
                .antMatchers("/NewPassword/**").permitAll()
                .antMatchers("/favorite/**").permitAll()
                .antMatchers("/product-search/**").permitAll()
                .antMatchers("/mainsection2/**").permitAll()
                .antMatchers("/api/v1/**").permitAll()
                .antMatchers(HttpMethod.POST, "/json").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/order/**").permitAll()
                .antMatchers(HttpMethod.GET, "/product","/productDetail/**").permitAll()
                .antMatchers("/verifyIamport/**").permitAll()
                .antMatchers("/camping-data", "/campData").permitAll()
                .antMatchers(HttpMethod.POST, "/product-data", "/camp-json").permitAll()

                .antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**", "/sign-api/exception").permitAll()
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
}
