package lasolutions.stockmanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ReportSetupController {

    @RequestMapping(value = "/report-setup", method = RequestMethod.GET)
    public ModelAndView showReportSetup(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("report-setup");
        return modelAndView;
    }
}
