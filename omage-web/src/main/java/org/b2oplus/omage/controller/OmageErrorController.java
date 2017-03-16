/*
 *
 *  * Copyright 2017 abuabdul.com, B2OPlus
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *   http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *  *
 *
 *
 */

package org.b2oplus.omage.controller;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by abuabdul
 */
public class OmageErrorController {

    //  private static final Logger log = LogManager.getLogger(OmageErrorController.class.getName());

    private final String ERROR_PATH = "/error";
    private final String ERROR_VIEW = "generic/error";

    public String getErrorPath() {
        return this.ERROR_PATH;
    }

    public String error(HttpServletRequest request, Exception ex) {
        Object status = request.getAttribute("javax.servlet.error.status_code");
//        log.info("Status code :" + status);
        //      log.info("Exception :" + ex.getMessage());
        //    log.info("Exception type :" + ex.getClass());
        return ERROR_VIEW;
    }
}