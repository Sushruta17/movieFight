const createAutoComplete = ({root, renderOption,onOptionSelect,inputValue,fetchData}) => {
    
root.innerHTML =`
<label><b>Search</b></label>
<input type="text" name="" id="" class="input"/> 
<div class="dropdown"> 
<div class="dropdown-menu">
  <div class="dropdown-content results">
  </div>
</div>
</div>
`;

const input = root.querySelector("input");
const dropdown = root.querySelector(".dropdown");
const resultsWrapper = root.querySelector(".results");

const onInput = async (event) =>{
const items = await fetchData(event.target.value);
if(!items.length){
    dropdown.classList.remove("is-active"); //to remove the blank dropdown
    return; 
}
 resultsWrapper.innerHTML = '';//to clear the dropdown before the second search to clear the previous search
 dropdown.classList.add('is-active');
  for(let item of items)
{
  const option = document.createElement('a');

  option.classList.add("dropdown-item")
  option.innerHTML = renderOption(item);
  option.addEventListener("click",()=>{
      dropdown.classList.remove("is-active");
      input.value = inputValue(item);
     onOptionSelect(item);
  });
  resultsWrapper.appendChild(option);
    };
}
input.addEventListener("input",debounce(onInput,1000));
document.addEventListener('click', (event) => {
    if(!root.contains(event.target)){ //to remove the dropdown when clicked other than the input and results
        dropdown.classList.remove("is-active"); 
    }

})

};