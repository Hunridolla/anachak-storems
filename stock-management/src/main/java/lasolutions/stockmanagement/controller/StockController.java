package lasolutions.stockmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class StockController {

    @RequestMapping(value = "/_blank")
    public ModelAndView _blank() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("_blank");
        return modelAndView;
    }
}
