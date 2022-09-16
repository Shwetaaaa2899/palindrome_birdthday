function revString(strin){
    
    var listOfChars = strin.split('');
    var revList = listOfChars.reverse();
    var revStr  = revList.join('');
    // Dot miss ('') inside join 


    return revStr;
};
function isPalindrome(str){
    var revStr = revString(str);
    return str === revStr;
};

function convertDateToString(str){
    var ans = {
        day : '',
        month :'',
        year :''
    };
    if(str.day < 10){
        ans.day = '0' + str.day;
        // internal typecasting is done here auto
    }
    else{
        ans.day = str.day.toString();
    }
    if(str.month < 10){
        ans.month = '0' + str.month;
        // internal typecasting is done here auto
    }
    else{
        ans.month = str.month.toString();
    }
    ans.year = str.year.toString();
    return ans

};

function getAllDateFormats(date){
    var dateStr = convertDateToString(date);
    var ddmmyyyy   = dateStr.day + dateStr.month + dateStr.year;
  
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd  = dateStr.year + dateStr.month + dateStr.day;

    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);

    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);

    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return( [ddmmyyyy,mmddyyyy,yyyymmdd ,
        ddmmyy ,mmddyy,yymmdd])
    };
function isLeapYear(year){
    if(year % 400 || year % 4){
            return true;
    }
    if(year % 100){
        return false;
    }

};
function getNextDate(str){
    var day = str.day + 1;
    var month = str.month ;
    var year = str.year;
    var daysInmonth =  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
    if(month == 2){

        if(isLeapYear(year)){
            if(day > 29){
                // when it's leap yr and has exceeded 29 days
                day = 1;
                month += 1;
            }
            else{
              // when it's not  leap yr and has exceeded 28 days
              if(day > 28){
                day = 1;
                month += 1;
              }

            }

        }
    }
    else{
        if(day > daysInmonth[month-1]){
                day = 1;
                month += 1;
        }
    }
    if(month > 12){
        // taking care of month to not exceed 12
        month = 1;
        year += 1;
    }


    
  return {
    day:day,
    month:month,
    year:year
  };
};


function checkPalindromeForAllFormats(date){
    var dateList = getAllDateFormats(date);
    // console.log(dateList)
   var  flag = false;
    for(let i = 0;i<dateList.length;i++){
        // console.log(isPalindrome(dateList[i]) ) 
    
        if(isPalindrome(dateList[i]))
        {
            flag = true;
            console.log(dateList[i]);
      
            break;
        }
    }
        
   return flag;

    };


function getNextPalindromeDate(date){
    var count = 0
    var nextDate =  getNextDate(date);
    while(1){
        count += 1;
        var checkForAllDateFormats = checkPalindromeForAllFormats(nextDate);
        if(checkForAllDateFormats){
            break;
        }
        nextDate = getNextDate(nextDate);

        }
        return [count,nextDate] ;
    };
var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#msg');

function check(e){

if(dateInputRef.value == ''){
    resultRef.innerText = "Blank value is not valid to see the results 👀";
    resultRef.style.display = "block";

}
else{
    // resultRef.style.display = "none";
    var ListOfDate = dateInputRef.value.split("-");
//    2022-08-19
    var date = {
        day:Number(ListOfDate[2]),
        month:Number(ListOfDate[1]),
        year:Number(ListOfDate[0])
    };

   var getNatureOFPalindrome = checkPalindromeForAllFormats(date);
   if(getNatureOFPalindrome){
    resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
}
else {
    var [ctr, nextDate] = getNextPalindromeDate(date);

    resultRef.innerText = `OOps ! It's not palindromic .The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
}
}
};
showBtnRef.addEventListener('click',check);


    
    

// var date = {
//     day : 31,
//     month : 12,
//     year : 2020
// };

// console.log(getNextPalindromeDate(date));