// Đối tượng Validator
function Validator(options) {
   //Tim cha cua element
   function getParent(element, selector){
      while (element.parentElement) {
         if (element.parentElement.matches(selector)) {
            return element.parentElement;
         }
         element = element.parentElement;
      }
   }


   var selectorRules = {};
   function validate(inputElement, rule){
      var errorElement = getParent(inputElement, options.formGroup).querySelector(options.errorSelector);
      var errorMessage;

      var rules = selectorRules[rule.selector];
         
      for(var i = 0; i < rules.length; i++){
         switch(inputElement.type) {
            case 'radio':
            case 'checkbox':
               errorMessage = rules[i](
                  formElement.querySelector(rule.selector + ':checked')
               );
               break;
            default:
               errorMessage = rules[i](inputElement.value); // Dung voi radio
         }
         if(errorMessage) break;
      }

      if(errorMessage) {
         errorElement.innerText = errorMessage;
      }else {
         errorElement.innerText = null;
      }
      return !errorMessage;
   }

   var formElement = document.querySelector(options.form);
   if(formElement) {
      formElement.addEventListener('submit', (e) => {
         e.preventDefault();
         var isFormValid = true;

         options.rule.forEach( (rule) => {
            var inputElement = formElement.querySelector(rule.selector);
            var isValid = validate(inputElement,rule);
            if(!isValid) {
               isFormValid = false;
            }
         });
         
         if(isFormValid) {
            if(typeof options.onSubmit === 'function') {
               var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
               var formValue = Array.from(enableInputs).reduce((values, input) => {
                  switch (input.type) {
                     case 'radio':
                        values[input.name] = formElement.querySelector('input[name="'+ input.name +'"]:checked').value;
                        break;
                     case 'checkbox':
                        if(!values[input.name]){
                           values[input.name] = [];
                        }if (input.checked){
                           values[input.name].push(input.value);
                        }
                        break;
                     case 'file':
                        values[input.name] = input.files;
                        break;   
                     default:
                        values[input.name] = input.value;
                  }
                  return values;
               }, {});
               options.onSubmit(formValue);
            } 
            //Submit voi hanh vi mac dinh
            else {
               formElement.submit();
            }
         }
      })
      

      // Xu ly su kien onblur
      options.rule.forEach(function (rule) {
         if(Array.isArray(selectorRules[rule.selector])){
            selectorRules[rule.selector].push(rule.test);
         }else {
            selectorRules[rule.selector] = [rule.test];
         }

         var inputElements = formElement.querySelectorAll(rule.selector);
         Array.from(inputElements).forEach( (inputElement) => {
            var errorElement = getParent(inputElement, options.formGroup).querySelector(options.errorSelector);
            if(inputElement) {
               inputElement.addEventListener('blur', function (){
                 validate(inputElement,rule);
               })
               inputElement.addEventListener('input', function (){
                  errorElement.innerText = null;
               })
            }
         });

      });
   }
}

// Định nghĩa Rule
Validator.isRequired = function (selector,message) {
   return {
      selector: selector,
      test: function (value) {
         return value ? undefined : message;
      }
   }
}

Validator.isEmail = function (selector, message) {
   return {
      selector: selector,
      test: function (value) {
         var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         return regex.test(value) ? undefined : message;
      }
   }
}

Validator.minlength = function (selector, min, message) {
   return {
      selector: selector,
      test: function (value) {
         return value.length >= min ? undefined : message;
      }
   }
}

Validator.isConfirmation = function (selector, getConfirmValue, message) {
   return {
      selector: selector,
      test: function (value) {
         return value === getConfirmValue() ? undefined : message;
      }
   }
}


Validator ({
   form: '#form_Login',
   formGroup: '.form-group',
   errorSelector: '.message',
   rule: [
      Validator.isRequired('#username', 'Vui long nhap ten dang nhap!'),
      Validator.minlength('#username',4, 'Ten dang nhap it nhat 4 ki tu!'),
      Validator.isRequired('#password', 'Vui long nhap mat khau!'),
      Validator.minlength('#password',8, 'Mat khau it nhat 8 ki tu!')
      // Validator.isEmail('#email','Email chua hop le!'),
      // Validator.isRequired('#confirm-password', 'Vui long nhap lai mat khau!'),
      // Validator.isConfirmation('#confirm-password', function (){
      //    return document.querySelector('#form #password').value;
      // }, 'Mat khau nhap lai khong dung!'),
      // Validator.isRequired('#province', 'Khong bo trong truong nay'),
      // Validator.isRequired('input[name="gendle"]', 'Truong nay khong the bo trong'),
      // Validator.isRequired('input[name="enjoy"]', 'Vui long nhap lai mat khau!'),
      // Validator.isRequired('input[name="avatar"]', 'Chua chon anh dai dien')
   ],
   onSubmit: (data) => {
      var formElement = document.querySelector("#form_Login");
      console.log(data);
      formElement.submit();
   }
});


Validator ({
   form: '#form_Signin',
   formGroup: '.form-group',
   errorSelector: '.message',
   rule: [
      Validator.isRequired('#fullname', 'Vui long nhap ten!'),
      Validator.isRequired('#username', 'Vui long nhap ten dang nhap!'),
      Validator.minlength('#username',4, 'Ten dang nhap it nhat 4 ki tu!'),
      Validator.isRequired('#password', 'Vui long nhap mat khau!'),
      Validator.minlength('#password',8, 'Mat khau it nhat 8 ki tu!'),
      // Validator.isEmail('#email','Email chua hop le!'),
      Validator.isRequired('#confirm-password', 'Vui long nhap lai mat khau!'),
      Validator.isConfirmation('#confirm-password', function (){
         return document.querySelector('#form_Signin #password').value;
      }, 'Mat khau nhap lai khong dung!')
      // Validator.isRequired('#province', 'Khong bo trong truong nay'),
      // Validator.isRequired('input[name="gendle"]', 'Truong nay khong the bo trong'),
      // Validator.isRequired('input[name="enjoy"]', 'Vui long nhap lai mat khau!'),
      // Validator.isRequired('input[name="avatar"]', 'Chua chon anh dai dien')
   ], 
   onSubmit: (data) => {
      var formElement = document.querySelector("#form_Signin");
      console.log(formElement);
      console.log(data);
      formElement.submit();
   }
});