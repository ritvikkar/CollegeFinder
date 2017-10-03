/*
 *  colleges.js
 *  Ritvik Kar, Estelle Bayer, Anna Johnson, 27 April 2017
 *
 *  A little bit of Javascript showing one small example of AJAX
 *  within the "colleges" sample for Carleton CS257,
 *  Spring Term 2017.
 */

function onClickSearchButton() {
    var search = document.getElementById('search');
    var state = document.getElementById('state');
    var state_option = state.options[state.selectedIndex].value;
    var url;
    var advancedOptions=document.getElementsByName('advanced');
    document.getElementsByName('advanced').innerHTML = advancedOptions.length;

    if(search.value!='') {
        //college name provided in search field: search by name
        url = api_base_url + 'college/name/' + search.value;
    } else if (search.value=='' && state_option!='') {
        //blank text field value and state selected: return all colleges in a state
        url = api_base_url + 'college/state/' + state_option;
    } else{
        //otherwise, return all colleges
        url = api_base_url + 'colleges/';
    }

    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('get', url);

    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            searchCallback(xmlHttpRequest.responseText, search.value, state_option,advancedOptions);
        }
    };

    xmlHttpRequest.send(null);
}

function searchCallback(responseText, search, state, advancedOptions) {
    var collegesList = JSON.parse(responseText);
    var tableBody = '';
    var greater;

    //create header for result table
    tableBody += '<tr><td>' + 'State, College'+ '</td>';
    tableBody += '<td>' + 'Quick Facts' + '</td></tr>';

    /* The following blocks of code all do the following for different search
    criteria: by default, the minimum and maximum are set to the most extreme
    values. Then, the respective slider inputs are checked and assigned to
    variables, after checking to make sure that the maximum exceeds the minimum.

    A variable named "default" is assigned to every criterion that can extend
    beyond the upper limit we've set for input.
    */
    //testing advanced options
    var testSATmin = 0;
    var testSATmax = 1600;
    greater = advancedOptions.item(8).value - advancedOptions.item(7).value;

    //SAT Testing Data
    if(greater < 0){
        testSATmin = advancedOptions.item(8).value;
        testSATmax = advancedOptions.item(7).value;
    } else {
        if(advancedOptions.item(7).value != 0)
            testSATmin = advancedOptions.item(7).value;
        if(advancedOptions.item(8).value != 0)
            testSATmax = advancedOptions.item(8).value;
    }

    //ACT Testing Data
    var testACTmin = 0;
    var testACTmax = 36;
    greater = advancedOptions.item(10).value - advancedOptions.item(9).value;

    if(greater < 0){
        testACTmin = advancedOptions.item(10).value;
        testACTmax = advancedOptions.item(9).value;
    } else {
        if(advancedOptions.item(9).value != 0)
            testACTmin = advancedOptions.item(9).value;
        if(advancedOptions.item(10).value != 0)
            testACTmax = advancedOptions.item(10).value;
    }

    //Debt data
    var debtMin = 0;
    var debtDefault = 50000;
    var debtMax = debtDefault;
    greater = advancedOptions.item(12).value - advancedOptions.item(11).value;

    if(greater < 0) {
        debtMin = advancedOptions.item(12).value;
        debtMax = advancedOptions.item(11).value;
    } else {
        if(advancedOptions.item(11).value != 0)
            debtMin = advancedOptions.item(11).value;
        if(advancedOptions.item(12).value != 0)
            debtMax = advancedOptions.item(12).value;
    }

    //gender advanced options
    var femaleMin = 0;
    var femaleMax = 100;
    greater = advancedOptions.item(14).value - advancedOptions.item(13).value;

    if(greater < 0) {
        femaleMin = advancedOptions.item(14).value;
        femaleMax = advancedOptions.item(13).value;
    } else {
        if(advancedOptions.item(13).value != 0)
            femaleMin = advancedOptions.item(13).value;
        if(advancedOptions.item(14).value != 0)
            femaleMax = advancedOptions.item(14).value;
    }

    //In-state Tuition data
    var inStateTuitionmin = 0;
    var inStateDefault = 50000;
    var inStateTuitionmax = inStateDefault;
    greater = advancedOptions.item(16).value - advancedOptions.item(15).value;

    if(greater < 0) {
        inStateTuitionmin = advancedOptions.item(16).value;
        inStateTuitionmax = advancedOptions.item(15).value;
    } else {
        if(advancedOptions.item(15).value != 0)
            inStateTuitionmin = advancedOptions.item(15).value;
        if(advancedOptions.item(16).value != 0)
            inStateTuitionmax = advancedOptions.item(16).value;
    }

    //Out Tuition data
    var outStateTuitionmin = 0;
    var outStateDefault = 50000;
    var outStateTuitionmax = outStateDefault;
    greater = advancedOptions.item(18).value - advancedOptions.item(17).value;

    if(greater < 0) {
        outStateTuitionmin = advancedOptions.item(18).value;
        outStateTuitionmax = advancedOptions.item(17).value;
    } else {
        if(advancedOptions.item(17).value != 0)
            outStateTuitionmin = advancedOptions.item(17).value;
        if(advancedOptions.item(18).value != 0)
            outStateTuitionmax = advancedOptions.item(18).value;
    }

    //Admissions Data
    var admissionMin = 0;
    var admissionMax = 100;
    greater = advancedOptions.item(20).value - advancedOptions.item(19).value;

    if(greater < 0) {
        admissionMin = advancedOptions.item(20).value;
        admissionMax = advancedOptions.item(19).value;
    } else {
        if(advancedOptions.item(19).value != 0)
            admissionMin = advancedOptions.item(19).value;
        if(advancedOptions.item(20).value != 0)
            admissionMax = advancedOptions.item(20).value;
    }

    //school size advanced options
    var schoolMin = 0;
    var schoolDefault = 20000;
    var schoolMax = schoolDefault;
    greater = advancedOptions.item(22).value - advancedOptions.item(21).value;

    if(greater < 0) {
        schoolMin = advancedOptions.item(22).value;
        schoolMax = advancedOptions.item(21).value;
    } else {
        if(advancedOptions.item(21).value != 0)
            schoolMin = advancedOptions.item(21).value;
        if(advancedOptions.item(22).value != 0)
            schoolMax = advancedOptions.item(22).value;
    }

    /* Counts the number of specific demographics selected, and tracks the
    location in the variable array of the latest one
    */
    //race advanced options
    var demoCount = 0;
    var demoLoc;
    for(var i=0 ; i < 7 ; i++) {
        if(advancedOptions.item(i).checked){
            demoCount++;
            demoLoc = i;
        }
    }

    var demographic = advancedOptions.item(demoLoc).value;

    /* In general, advanced search operates in the following way:
    Every college in the colleges list is iterated through.
    For each search criterion, we check to see if the actual value of the data
    is between the provided maximum and minimum, or in the case of data values
    that can exceed the highest slider value, if the slider is set to maximum
    and the value exceeds that maximum.

    Only colleges which return true for every checked criterion are returned.
    */
    if(demoCount > 1) {
        window.alert('Please choose 1 demographic');
    } else {
        //if state isn't empty, return colleges consistent with the search criteria in that state
        if(state!='') {
            for (var k = 0; k < collegesList.length; k++) {
                //if a demographic is specified, only return colleges flagged as that demographic
                if(demoCount!=0) {
                    if(state==collegesList[k]['state'] && collegesList[k][demographic] == 1
                        && (collegesList[k]['sat_avg'] >= testSATmin && collegesList[k]['sat_avg'] <= testSATmax)
                        && (collegesList[k]['act_avg'] >= testACTmin && collegesList[k]['act_avg'] <= testACTmax)
                        && (collegesList[k]['median_debt'] >= debtMin && (collegesList[k]['median_debt'] <= debtMax
                            || collegesList[k]['median_debt'] > debtDefault && debtMax == debtDefault))
                        && (collegesList[k]['pct_women']*100 >= femaleMin && collegesList[k]['pct_women']*100 <= femaleMax)
                        && (collegesList[k]['in_state_tuition'] >= inStateTuitionmin && (collegesList[k]['in_state_tuition'] <= inStateTuitionmax
                            || collegesList[k]['in_state_tuition'] > inStateDefault && inStateTuitionmax == inStateDefault))
                        && (collegesList[k]['out_state_tuition'] >= outStateTuitionmin && (collegesList[k]['out_state_tuition'] <= outStateTuitionmax
                            || collegesList[k]['out_state_tuition'] > outStateDefault && outStateTuitionmax == outStateDefault))
                        && (collegesList[k]['adm_rate']*100 >= admissionMin && collegesList[k]['adm_rate']*100 <= admissionMax)
                        && (collegesList[k]['undergrads'] >= schoolMin && (collegesList[k]['undergrads'] <= schoolMax
                            || collegesList[k]['undergrads'] > schoolDefault && schoolMax == schoolDefault))) {

                        tableBody += '<tr>';
                        tableBody += '<td><a onclick="getCollege(' + collegesList[k]['college_id'] + ",'"
                        + collegesList[k]['name'] + ' ' + collegesList[k]['state'] + "')\">"
                        + collegesList[k]['state'] + ', '
                        + collegesList[k]['name'] + '</a></td>';

                        tableBody += '<td>' + 'Address: ' + collegesList[k]['city'] + ' ' + collegesList[k]['state'] + ' ' + collegesList[k]['zipcode'];
                        tableBody += ', URL: ' + collegesList[k]['insturl'] + ', Instution Type: ';

                        if(collegesList[k]['inst_type'] == 1){
                            tableBody+= '4 year, ';
                        }
                        else if(collegesList[k]['inst_type'] == 2){
                            tableBody+= '2 year, ';
                        }
                        else if(collegesList[k]['inst_type'] == 3){
                            tableBody+= 'Less than 2-year, ';
                        }

                        if (collegesList[k]['adm_rate'] != 0) {
                            tableBody += 'Admission Rate: ' + (collegesList[k]['adm_rate']*100).toFixed(2);
                        }
                        tableBody += '</td>';
                        tableBody += '</tr>';
                    }
                    //state specifed, but no demographic
                } else {
                    if(state==collegesList[k]['state']
                        && (collegesList[k]['sat_avg'] >= testSATmin && collegesList[k]['sat_avg'] <= testSATmax)
                        && (collegesList[k]['act_avg'] >= testACTmin && collegesList[k]['act_avg'] <= testACTmax)
                        && (collegesList[k]['median_debt'] >= debtMin && (collegesList[k]['median_debt'] <= debtMax
                            || collegesList[k]['median_debt'] > debtDefault && debtMax == debtDefault))
                        && (collegesList[k]['pct_women']*100 >= femaleMin && collegesList[k]['pct_women']*100 <= femaleMax)
                        && (collegesList[k]['in_state_tuition'] >= inStateTuitionmin && (collegesList[k]['in_state_tuition'] <= inStateTuitionmax
                            || collegesList[k]['in_state_tuition'] > inStateDefault && inStateTuitionmax == inStateDefault))
                        && (collegesList[k]['out_state_tuition'] >= outStateTuitionmin && (collegesList[k]['out_state_tuition'] <= outStateTuitionmax))
                        && (collegesList[k]['adm_rate']*100 >= admissionMin && collegesList[k]['adm_rate']*100 <= admissionMax)
                        && (collegesList[k]['undergrads'] >= schoolMin && (collegesList[k]['undergrads'] <= schoolMax
                            || collegesList[k]['undergrads'] > schoolDefault && schoolMax == schoolDefault))) {

                        tableBody += '<tr>';
                        tableBody += '<td><a onclick="getCollege(' + collegesList[k]['college_id'] + ",'"
                        + collegesList[k]['name'] + ' ' + collegesList[k]['state'] + "')\">"
                        + collegesList[k]['state'] + ', '
                        + collegesList[k]['name'] + '</a></td>';

                        tableBody += '<td>' + 'Address: ' + collegesList[k]['city'] + ' ' + collegesList[k]['state'] + ' ' + collegesList[k]['zipcode'];
                        tableBody += ', URL: ' + collegesList[k]['insturl'] + ', Instution Type: ';

                        if(collegesList[k]['inst_type'] == 1){
                            tableBody+= '4 year, ';
                        }
                        else if(collegesList[k]['inst_type'] == 2){
                            tableBody+= '2 year, ';
                        }
                        else if(collegesList[k]['inst_type'] == 3){
                            tableBody+= 'Less than 2-year, ';
                        }

                        if (collegesList[k]['adm_rate'] != 0) {
                            tableBody += 'Admission Rate: ' + (collegesList[k]['adm_rate']*100).toFixed(2);
                        }
                        tableBody += '</td>';
                        tableBody += '</tr>';
                    }
                }
            }
        //no state specified, just check other search criteria
        } else {
            for (var k = 0; k < collegesList.length; k++) {
                //a demographic is specified
                if(demoCount!=0) {
                    if(collegesList[k][demographic] == 1
                        && (collegesList[k]['sat_avg'] >= testSATmin && collegesList[k]['sat_avg'] <= testSATmax)
                        && (collegesList[k]['act_avg'] >= testACTmin && collegesList[k]['act_avg'] <= testACTmax)
                        && (collegesList[k]['median_debt'] >= debtMin && (collegesList[k]['median_debt'] <= debtMax
                            || collegesList[k]['median_debt'] > debtDefault && debtMax == debtDefault))
                        && (collegesList[k]['pct_women']*100 >= femaleMin && collegesList[k]['pct_women']*100 <= femaleMax)
                        && (collegesList[k]['in_state_tuition'] >= inStateTuitionmin && (collegesList[k]['in_state_tuition'] <= inStateTuitionmax
                            || collegesList[k]['in_state_tuition'] > inStateDefault && inStateTuitionmax == inStateDefault))
                        && (collegesList[k]['out_state_tuition'] >= outStateTuitionmin && (collegesList[k]['out_state_tuition'] <= outStateTuitionmax
                            || collegesList[k]['out_state_tuition'] > outStateDefault && outStateTuitionmax == outStateDefault))
                        && (collegesList[k]['adm_rate']*100 >= admissionMin && collegesList[k]['adm_rate']*100 <= admissionMax)
                        && (collegesList[k]['undergrads'] >= schoolMin && (collegesList[k]['undergrads'] <= schoolMax
                            || collegesList[k]['undergrads'] > schoolDefault && schoolMax == schoolDefault))) {

                        tableBody += '<tr>';
                        tableBody += '<td><a onclick="getCollege(' + collegesList[k]['college_id'] + ",'"
                        + collegesList[k]['name'] + ' ' + collegesList[k]['state'] + "')\">"
                        + collegesList[k]['state'] + ', '
                        + collegesList[k]['name'] + '</a></td>';

                        tableBody += '<td>' + 'Address: ' + collegesList[k]['city'] + ' ' + collegesList[k]['state'] + ' ' + collegesList[k]['zipcode'];
                        tableBody += ', URL: ' + collegesList[k]['insturl'] + ', Instution Type: ';

                        if(collegesList[k]['inst_type'] == 1){
                            tableBody+= '4 year, ';
                        }
                        else if(collegesList[k]['inst_type'] == 2){
                            tableBody+= '2 year, ';
                        }
                        else if(collegesList[k]['inst_type'] == 3){
                            tableBody+= 'Less than 2-year, ';
                        }

                        if (collegesList[k]['adm_rate'] != 0) {
                            tableBody += 'Admission Rate: ' + (collegesList[k]['adm_rate']*100).toFixed(2);
                        }
                        tableBody += '</td>';
                        tableBody += '</tr>';
                    }
                    //no state or demographic specified
                } else {
                    if((collegesList[k]['sat_avg'] >= testSATmin && collegesList[k]['sat_avg'] <= testSATmax)
                        && (collegesList[k]['act_avg'] >= testACTmin && collegesList[k]['act_avg'] <= testACTmax)
                        && (collegesList[k]['median_debt'] >= debtMin && (collegesList[k]['median_debt'] <= debtMax
                            || collegesList[k]['median_debt'] > debtDefault && debtMax == debtDefault))
                        && (collegesList[k]['pct_women']*100 >= femaleMin && collegesList[k]['pct_women']*100 <= femaleMax)
                        && (collegesList[k]['in_state_tuition'] >= inStateTuitionmin && (collegesList[k]['in_state_tuition'] <= inStateTuitionmax
                            || collegesList[k]['in_state_tuition'] > inStateDefault && inStateTuitionmax == inStateDefault))
                        && (collegesList[k]['out_state_tuition'] >= outStateTuitionmin && (collegesList[k]['out_state_tuition'] <= outStateTuitionmax
                            || collegesList[k]['out_state_tuition'] > outStateDefault && outStateTuitionmax == outStateDefault))
                        && (collegesList[k]['adm_rate']*100 >= admissionMin && collegesList[k]['adm_rate']*100 <= admissionMax)
                        && (collegesList[k]['undergrads'] >= schoolMin && (collegesList[k]['undergrads'] <= schoolMax
                            || collegesList[k]['undergrads'] > schoolDefault && schoolMax == schoolDefault))) {

                        tableBody += '<tr>';
                        tableBody += '<td><a onclick="getCollege(' + collegesList[k]['college_id'] + ",'"
                        + collegesList[k]['name'] + ' ' + collegesList[k]['state'] + "')\">"
                        + collegesList[k]['state'] + ', '
                        + collegesList[k]['name'] + '</a></td>';

                        tableBody += '<td>' + 'Address: ' + collegesList[k]['city'] + ' ' + collegesList[k]['state'] + ' ' + collegesList[k]['zipcode'];
                        tableBody += ', URL: ' + collegesList[k]['insturl'] + ', Instution Type: ';

                        if(collegesList[k]['inst_type'] == 1){
                            tableBody+= '4 year, ';
                        }
                        else if(collegesList[k]['inst_type'] == 2){
                            tableBody+= '2 year, ';
                        }
                        else if(collegesList[k]['inst_type'] == 3){
                            tableBody+= 'Less than 2-year, ';
                        }

                        if (collegesList[k]['adm_rate'] != 0) {
                            tableBody += 'Admission Rate: ' + (collegesList[k]['adm_rate']*100).toFixed(2);
                        }
                        tableBody += '</td>';
                        tableBody += '</tr>';
                    }
                }
            }
        }
    }

    var resultsTableElement = document.getElementById('results_table');
    resultsTableElement.innerHTML = tableBody;
}

//get a single college by ID or name
function getCollege(collegeID, collegeName) {
    var url = api_base_url + 'college/' + collegeID;
    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('get', url);

    xmlHttpRequest.onreadystatechange = function() {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            getInfoForCollegeCallback(collegeName, xmlHttpRequest.responseText);
        }
    };
    xmlHttpRequest.send(null);
}

function getInfoForCollegeCallback(collegeName, responseText) {
    var collegeList = JSON.parse(responseText);
    var tableBody = '<div style="text-align:center"><b>' + collegeName + '</b></div>';

    /*SECTION1*/
    tableBody += '<tr><td><b>' + 'Address'+ '</b></td>';
    tableBody += '<td><b>' + 'Tuition' + '</b></td>';
    tableBody += '<td><b>' + 'Instution Type' + '</b></td>';
    tableBody += '<td><b>' + 'Total Undergrads' + '</b></td></tr>';

    tableBody += '<tr><td>' + collegeList['city'] + ' ' + collegeList['state'] + ' ' + collegeList['zipcode'] + '</td><td>' +
                    'In-state: ' + collegeList['in_state_tuition'] + '<br/>Out-state: ' + collegeList['out_state_tuition'];
    tableBody += '</td><td>';

    if(collegeList['inst_type'] == 1)
    tableBody+= '4 year';
    else if(collegeList['inst_type'] == 2)
    tableBody+= '2 year';
    else if(collegeList['inst_type'] == 3)
    tableBody+= 'Less than 2-year';

    tableBody+= '</td><td>' + collegeList['undergrads'];
    tableBody += '</td>';
    tableBody += '</tr>';

    /*SECTION2*/
    tableBody += '<tr><td><b>' + 'Testing Data' + '</b></td>';
    tableBody += '<td><b>' + 'Demographics' + '</b></td>';
    tableBody += '<td><b>' + 'Debt' + '</b></td>';
    tableBody += '<td><b>' + 'Completion Rates' + '</b></td></tr>';

    tableBody += '<tr><td>' + 'SAT:<br/>Reading: ' + collegeList['sat_r_mid'] + '<br/>Math: ' + collegeList['sat_m_mid']
                        + '<br/>Writing: ' + collegeList['sat_w_mid'] + '<br/>Average: ' + collegeList['sat_avg'];
    tableBody += '<br/>ACT:<br/>English: ' + collegeList['act_en_mid'] + '<br/>Math: ' + collegeList['act_m_mid']
                        + '<br/>Writing: ' + collegeList['act_w_mid'] + '<br/>Average: ' + collegeList['act_avg'] + '</td>';

    tableBody += '<td>' + 'White: ' + (collegeList['pct_white']*100).toFixed(2) + '%<br/>Black: ' + (collegeList['pct_black']*100).toFixed(2)
                        + '%<br/>Hispanic: ' + (collegeList['pct_hisp']*100).toFixed(2) + '%<br/>Asian: ' + (collegeList['pct_asian']*100).toFixed(2)
                        + '%<br/>American Indian/Alaska Native: ' + (collegeList['pct_ai_an']*100).toFixed(2) + '%<br/>Native Hawaiian/Pacific Islander: ' + (collegeList['pct_nh_pi']*100).toFixed(2)
                        + '%<br/>Two or More: ' + (collegeList['pct_two_or_more']*100).toFixed(2) + '%<br/>International: ' + (collegeList['pct_international']*100).toFixed(2)
                        + '%<br/>Unknown: ' + (collegeList['pct_unkwn']*100).toFixed(2) + '%'
                        + '</td>';

    tableBody += '<td>' + 'Median Debt: $' + collegeList['median_debt'] + '<br/>Median Graduate Debt: $' + collegeList['median_grad_debt']
                        + '<br/>Median Withdraw Debt: $' + collegeList['median_withdraw_debt'] + '<br/>Median Female Debt: $' + collegeList['median_female_debt']
                        + '<br/>Median Male Debt: $' + collegeList['median_male_debt'] + '<br/>Median First-Generation Debt: $' + collegeList['median_first_gen_debt']
                        + '<br/>Median Non-First-Generation Debt: $' + collegeList['median_non_first_gen_debt'] + '<br/>FAFSA Applications: ' + collegeList['fafsa_apps']
                        + '</td>';

    if(collegeList['inst_type'] == 1){
        tableBody += '<td>' + (collegeList['completion_fouryear']*100).toFixed(2) + '%</td>';
    }
    else{
        tableBody += '<td>' + (collegeList['completion_lessfour']*100).toFixed(2) + '%</td>';
    }

    tableBody += '</tr>';

    /*SECTION3*/
    tableBody += '<tr><td><b>' + 'Transfer Rates' + '</b></td>';
    tableBody += '<td><b>' + 'Percent Men' + '</b></td>';
    tableBody += '<td><b>' + 'Percent Women' + '</b></td></tr>';

    tableBody += '<tr>';
    if(collegeList['inst_type'] == 1){
        tableBody += '<td>' + (collegeList['transfer_fouryear']*100).toFixed(2) + '%</td>';
    }
    else{
        tableBody += '<td>' + (collegeList['transfer_lessfour']*100).toFixed(2) + '%</td>';
    }

    tableBody += '<td>' + (collegeList['pct_men']*100).toFixed(2) + '%</td>';
    tableBody += '<td>' + (collegeList['pct_women']*100).toFixed(2) + '%</td>';

    tableBody += '</tr>';

    var resultsTableElement = document.getElementById('results_table');
    resultsTableElement.innerHTML = tableBody;
}

/*Functions to give live view of the slider data*/

function showValueSATmin(newValue)
{
    document.getElementById("rangeSATmin").innerHTML=newValue;
}

function showValueSATmax(newValue)
{
    document.getElementById("rangeSATmax").innerHTML=newValue;
}


function showValueACTmin(newValue)
{
    document.getElementById("rangeACTmin").innerHTML=newValue;
}

function showValueACTmax(newValue)
{
    document.getElementById("rangeACTmax").innerHTML=newValue;
}

function showValueDebtmin(newValue)
{
    document.getElementById("rangeDebtmin").innerHTML=newValue;
}

function showValueDebtmax(newValue)
{
    document.getElementById("rangeDebtmax").innerHTML=newValue;
}

function showValueGendermin(newValue)
{
    document.getElementById("rangeGendermin").innerHTML=newValue;
}

function showValueGendermax(newValue)
{
    document.getElementById("rangeGendermax").innerHTML=newValue;
}

function showValueTuitionInmin(newValue)
{
    document.getElementById("rangeTuitionInmin").innerHTML=newValue;
}

function showValueTuitionInmax(newValue)
{
    document.getElementById("rangeTuitionInmax").innerHTML=newValue;
}

function showValueTuitionOutmin(newValue)
{
    document.getElementById("rangeTuitionOutmin").innerHTML=newValue;
}

function showValueTuitionOutmax(newValue)
{
    document.getElementById("rangeTuitionOutmax").innerHTML=newValue;
}

function showValueAdmissionmin(newValue)
{
    document.getElementById("rangeAdmissionmin").innerHTML=newValue;
}

function showValueAdmissionmax(newValue)
{
    document.getElementById("rangeAdmissionmax").innerHTML=newValue;
}

function showValueSchoolmin(newValue)
{
    document.getElementById("rangeSchoolmin").innerHTML=newValue;
}

function showValueSchoolmax(newValue)
{
    document.getElementById("rangeSchoolmax").innerHTML=newValue;
}
