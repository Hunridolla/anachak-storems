package lasolutions.stockmanagement.controller;


import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class RobotController {
    @RequestMapping("/robots.txt")
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ModelAndView robotsTxt() {
        ModelAndView modelAndView = new ModelAndView("404");
        return modelAndView;
    }
}
