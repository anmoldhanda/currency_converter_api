// ============================= currency conversion validation so the user only enters the numbers =============================
const input_convert_currency = document.getElementById("input-convert-currency");
let valid_input_convert_currency = false;
input_convert_currency.addEventListener("blur", () => {
  let regex = /^([0-9]){1,10}$/;
  let input_convert_currency_value = input_convert_currency.value;
  if (regex.test(input_convert_currency_value)) {
    console.log("valid input currency conversion amount");
    valid_input_convert_currency = true;
    input_convert_currency.classList.remove("currency-conversion-error");
  } else {
    console.log("invalid");
    valid_input_convert_currency = false;
    input_convert_currency.classList.add("currency-conversion-error");
  }
});

const overlay_notification_container = document.querySelector(".overlay-notification-container");
const close_overlay_btn = document.querySelector(".close-overlay-btn");
const notification_text = document.querySelector(".notification-text");
// ====================================== api credentials & other things related to api ======================================
const populatedata_apirespone = async (user_selected_currency,currency_conversion_value) => {
  const api_key = `your api key`;
  // const base_currency = `the base currency you want to compare with`;
  const api_url = `your api url`;
  let table_data = "";
  const select_element = document.querySelector("select[name='available-currencies-list']");
  // ============================= selected currency from the select tag within the options value =============================
  let selected_currency = select_element.options[select_element.selectedIndex].value;
  let currency_conversion_inputfield = Number.parseInt(document.querySelector("input[name='currency-conversion-inputfield']").value);
  console.log("currency " + selected_currency);
  console.log("currency conversion " + currency_conversion_inputfield);
  const converted_currency_result_tablebody = document.querySelector("tbody");
  try {
    // ============================= show the loader before the api response printed to the DOM =============================
    converted_currency_result_tablebody.innerHTML = `
    <tbody>
    <tr>
      <img src="loading.svg" alt="loading gif api response">
    </tr>
    </tbody>
    `;
    let api_response = await fetch(api_url);
    let json_response_apidata = await api_response.json();
    // console.log(json_response_apidata);
    for (let key of Object.keys(json_response_apidata["data"])) {
      // console.log(key);
      table_data += `
                    <tbody>
                    <tr>
                    <td>${key}</td>
                    <td>${json_response_apidata["data"][key]["code"]}</td>
                    <td>${Math.round(
                      json_response_apidata["data"][key]["value"] *
                        currency_conversion_inputfield
                    )}</td>
                    </tr>
                    </tbody>`;
    }
    // the json data has two main objects first one is meta for second one is which contains the material the main obj is key then it further has another objected if iterated over it we get and obj havig two key value pairs code & value code: "something", value: "something"
    converted_currency_result_tablebody.innerHTML = table_data;
  } catch (error) {
    console.log(error);
    overlay_notification_container.style.display = "block";
    notification_text.innerHTML = error.message;
  }
};

// ============================ if the validations are true then work with the api and give response ============================
const currency_conversion_form = document.querySelector(".currency-conversion-form");
currency_conversion_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (valid_input_convert_currency) {
    console.log("form submitted");
    let user_selected_currency = "";
    let currency_conversion_value = "";
    populatedata_apirespone(user_selected_currency, currency_conversion_value);
  } else {
    console.log("form not submitted");
  }
});

close_overlay_btn.addEventListener("click", () => {
  overlay_notification_container.style.display = "none";
});
