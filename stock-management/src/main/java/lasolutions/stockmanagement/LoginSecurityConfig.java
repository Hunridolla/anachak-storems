package lasolutions.stockmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.sql.DataSource;


@Configuration
@EnableWebSecurity
@Order(1)
public class LoginSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    DataSource dataSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("select username, password, enabled from users where username=?")
                .authoritiesByUsernameQuery("select username, role from user_roles where username=?")
                .passwordEncoder(passwordEncoder());
//        BCryptPasswordEncoder encoder = (BCryptPasswordEncoder) passwordEncoder();
//        auth.inMemoryAuthentication().withUser("admin").password(encoder.encode("admin")).roles("ADMIN");
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/ajax/**").permitAll()
                .antMatchers("/css/**").permitAll()
                .antMatchers("/data/**").permitAll()
                .antMatchers("/fonts/**").permitAll()
                .antMatchers("/img/**").permitAll()
                .antMatchers("/js/**").permitAll()
                .antMatchers("/sound/**").permitAll()
                .antMatchers("/xml.gmap/**").permitAll()
                .anyRequest().fullyAuthenticated()
                .antMatchers("/").permitAll()
                .antMatchers("/home").hasRole("USER")
                .antMatchers("/profiles").hasRole("ADMIN")
                .antMatchers("/users").hasRole("ADMIN")
                .antMatchers("/").hasRole("ADMIN")
                .antMatchers("/customers").hasRole("ADMIN")
                .antMatchers("/unit-measures").hasRole("ADMIN")
                .antMatchers("/VAT").hasRole("ADMIN")
                .antMatchers("/sellers").hasRole("ADMIN")
                .antMatchers("/invoices").hasRole("ADMIN")
                .antMatchers("/categories").hasRole("ADMIN")
                .antMatchers("/items").hasRole("ADMIN")
                .antMatchers("/vendors").hasRole("ADMIN")
                .antMatchers("/vendor-types").hasRole("ADMIN")
                .antMatchers("/stock-in").hasRole("ADMIN")
                .antMatchers("/exchange-rate").hasRole("ADMIN")

                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login").permitAll()
                .and()
                .logout().permitAll()
                .and()
                .csrf().disable();
        http.exceptionHandling().accessDeniedPage("/403");
    }
}
