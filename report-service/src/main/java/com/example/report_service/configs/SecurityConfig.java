package com.example.report_service.configs;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/health").permitAll()

                        // Noticias públicas
                        .requestMatchers(HttpMethod.GET, "/api/new/public").permitAll()

                        // Estadísticas públicas
                        .requestMatchers(HttpMethod.GET, "/api/report/public/statistics/**").permitAll()

                        // Crear reporte y ver mis reportes: ciudadano/admin autenticado
                        .requestMatchers(HttpMethod.POST, "/api/report").hasAnyRole("CIUDADANO", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/report/me").hasAnyRole("CIUDADANO", "ADMIN")

                        // Administración de reportes, squads y noticias
                        .requestMatchers("/api/report/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/new/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/new/admin").hasRole("ADMIN")

                        // Actualización de estado por admin o cuadrilla
                        .requestMatchers("/api/report/status/**").hasAnyRole("ADMIN", "CUADRILLA")

                        // Endpoints de cuadrilla
                        .requestMatchers("/api/squad/reports/**").hasRole("CUADRILLA")
                        .requestMatchers("/api/squad/reports").hasRole("CUADRILLA")

                        // Todo lo demás autenticado
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}