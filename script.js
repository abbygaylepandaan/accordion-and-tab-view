document.addEventListener("DOMContentLoaded", () => {
    const tabList = document.getElementById("tab-list");
    const tabContent = document.getElementById("tab-content");
    const accordionContainer = document.getElementById("accordion-container");
  
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error loading JSON: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) { // checks if the array is empty
          tabContent.innerHTML = `<p style="text-align: center;">No content available.</p>`;
          accordionContainer.innerHTML = `<p style="text-align: center;">No content available.</p>`;
          return;
        }
        
        console.log("Data loaded successfully:", data);
        data.forEach((item, index) => {
          // tabs
          const tabButton = document.createElement("button"); // dynamically creates a button for the tab
          tabButton.className = "tab-button";
          tabButton.textContent = item.title;
          if (index === 0) tabButton.classList.add("active"); // first tab is open by default
  
          const tabContentItem = document.createElement("div"); // dynamically creates a div for the content
          tabContentItem.className = "tab-content-item";
          tabContentItem.innerHTML = item.content;
          if (index !== 0) tabContentItem.style.display = "none";
  
          tabButton.addEventListener("click", () => {
            document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
            document.querySelectorAll(".tab-content-item").forEach(content => content.style.display = "none");
  
            tabButton.classList.add("active");
            tabContentItem.style.display = "block";
          });
  
          tabList.appendChild(tabButton);
          tabContent.appendChild(tabContentItem);
  
          // accordion
          const accordionItem = document.createElement("div"); // dynamically creates a div for the elements
          accordionItem.className = "accordion-item";
  
          const accordionHeader = document.createElement("div"); // dynamically creates a header for the title
          accordionHeader.className = "accordion-header";
          accordionHeader.textContent = item.title;
          if (index === 0) accordionHeader.classList.add("active"); // first accordion is open by default

          const accordionContent = document.createElement("div"); // dynamically creates a div for the content
          accordionContent.className = "accordion-content";
          accordionContent.innerHTML = item.content;
          if (index === 0) accordionContent.style.display = "block";
  
          accordionHeader.addEventListener("click", () => {
            const isActive = accordionHeader.classList.contains("active");
  
            document.querySelectorAll(".accordion-header").forEach(header => header.classList.remove("active"));
            document.querySelectorAll(".accordion-content").forEach(content => content.style.display = "none");
  
            if (!isActive) {
              accordionHeader.classList.add("active");
              accordionContent.style.display = "block";
            }
          });
  
          accordionItem.appendChild(accordionHeader);
          accordionItem.appendChild(accordionContent);
          accordionContainer.appendChild(accordionItem);
        });
      })
      .catch(error => {
        tabContent.innerHTML = `<p style="color: red; text-align: center;">Error: ${error.message}</p>`;
        accordionContainer.innerHTML = `<p style="color: red; text-align: center;">Error: ${error.message}</p>`;
      });
  });
  