package com.example.demo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Slf4j

public class WebController {
    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public ModelAndView saveLeadQuery() {
        return new ModelAndView("forward:/");
    }
}
