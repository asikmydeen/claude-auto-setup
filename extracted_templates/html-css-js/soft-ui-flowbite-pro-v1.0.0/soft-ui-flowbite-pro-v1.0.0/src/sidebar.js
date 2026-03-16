let toggleAccess = true;

window.addEventListener("resize", () => {
  toggleAccess = window.innerWidth > 1024 ? true : false;
});
window.addEventListener("load", () => {
  toggleAccess = window.innerWidth > 1024 ? true : false;
});

const isSidebarExpanded = (toggleSidebarEl) => {
  return toggleSidebarEl.getAttribute("aria-expanded") === "true"
    ? true
    : false;
};

const toggleSidebarEl = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const sidebarItems = document.getElementById("sidebar-items");

const toggleSidebar = (sidebarEl, expand, setExpanded = false) => {
  const bottomMenuEl = document.querySelector("[sidebar-bottom-menu]");
  const mainContentEl = document.getElementById("main-content");
  if (expand) {
    sidebarEl.classList.add("lg:w-64");
    sidebarEl.classList.remove("lg:w-16");
    mainContentEl.classList.add("lg:ml-64");
    mainContentEl.classList.remove("lg:ml-16");

    document
      .querySelectorAll(
        "#" + sidebarEl.getAttribute("id") + " [sidebar-toggle-item]"
      )
      .forEach((sidebarToggleEl) => {
        sidebarToggleEl.classList.remove("lg:hidden");
        sidebarToggleEl.classList.remove("lg:absolute");
      });

    // toggle multi level menu item initial and full text
    document
      .querySelectorAll(
        "#" + sidebar.getAttribute("id") + " ul > li > ul > li > a"
      )
      .forEach((e) => {
        e.classList.add("pl-11");
        e.classList.remove("px-4");
        e.childNodes[0].classList.remove("hidden");
        e.childNodes[1].classList.add("hidden");
      });

    bottomMenuEl.classList.remove("flex-col", "space-y-4", "p-2");
    bottomMenuEl.classList.add("space-x-4", "p-4");
    setExpanded ? toggleSidebarEl.setAttribute("aria-expanded", "true") : null;
  } else {
    sidebarEl.classList.remove("lg:w-64");
    sidebarEl.classList.add("lg:w-16");
    mainContentEl.classList.remove("lg:ml-64");
    mainContentEl.classList.add("lg:ml-16");
    document
      .querySelectorAll(
        "#" + sidebarEl.getAttribute("id") + " [sidebar-toggle-item]"
      )
      .forEach((sidebarToggleEl) => {
        sidebarToggleEl.classList.add("lg:hidden");
        sidebarToggleEl.classList.add("lg:absolute");
      });

    // toggle multi level menu item initial and full text
    document
      .querySelectorAll(
        "#" + sidebar.getAttribute("id") + " ul > li > ul > li > a"
      )
      .forEach((e) => {
        e.classList.remove("pl-11");
        e.classList.add("px-4");
        e.childNodes[0].classList.add("hidden");
        e.childNodes[1].classList.remove("hidden");
      });

    bottomMenuEl.classList.add("flex-col", "space-y-4", "p-2");
    bottomMenuEl.classList.remove("space-x-4", "p-4");
    setExpanded ? toggleSidebarEl.setAttribute("aria-expanded", "false") : null;
  }
};

document
  .querySelectorAll("#" + sidebar.getAttribute("id") + " ul > li > ul > li > a")
  .forEach((e) => {
    var fullText = e.textContent;
    var firstLetter = fullText.substring(0, 1);

    var fullTextEl = document.createElement("span");
    var firstLetterEl = document.createElement("span");
    firstLetterEl.classList.add("hidden");
    fullTextEl.textContent = fullText;
    firstLetterEl.textContent = firstLetter;

    e.textContent = "";
    e.appendChild(fullTextEl);
    e.appendChild(firstLetterEl);
  });

// initialize sidebar
if (localStorage.getItem("sidebarExpanded") !== null) {
  if (localStorage.getItem("sidebarExpanded") === "true") {
    toggleSidebar(sidebar, true, false);
  } else {
    toggleSidebar(sidebar, false, true);
  }
}

toggleSidebarEl.addEventListener("click", () => {
  if (toggleAccess) {
    localStorage.setItem(
      "sidebarExpanded",
      !isSidebarExpanded(toggleSidebarEl)
    );
    toggleSidebar(sidebar, !isSidebarExpanded(toggleSidebarEl), true);

    if (!isSidebarExpanded(toggleSidebarEl)) {
      sidebarItems.classList.remove("px-3");
      sidebarItems.classList.add("pr-3");
      sidebarItems.classList.add("pl-1.5");
    } else {
      sidebarItems.classList.add("px-3");
      sidebarItems.classList.remove("pr-3");
      sidebarItems.classList.remove("pl-1.5");
    }

    document
      .querySelectorAll(
        "#" + sidebar.getAttribute("id") + " [sidebar-toggle-collapse]"
      )
      .forEach((sidebarToggleEl) => {
        if (!isSidebarExpanded(toggleSidebarEl)) {
          sidebarToggleEl.classList.add("bg-gray-50");
          sidebarToggleEl.classList.add("shadow-none");
        } else {
          sidebarToggleEl.classList.remove("bg-gray-50");
          sidebarToggleEl.classList.remove("shadow-none");
        }
      });

    document
      .querySelectorAll(
        "#" + sidebar.getAttribute("id") + " [sidebar-toggle-list]"
      )
      .forEach((sidebarToggleEl) => {
        if (!isSidebarExpanded(toggleSidebarEl)) {
          sidebarToggleEl.classList.add("ml-3");
        } else {
          sidebarToggleEl.classList.remove("ml-3");
        }
      });
  }
});

sidebar.addEventListener("mouseenter", () => {
  if (toggleAccess) {
    if (!isSidebarExpanded(toggleSidebarEl)) {
      toggleSidebar(sidebar, true);
      document
        .querySelectorAll(
          "#" + sidebar.getAttribute("id") + " [sidebar-toggle-collapse]"
        )
        .forEach((sidebarToggleEl) => {
          sidebarToggleEl.classList.remove("bg-gray-50");
          sidebarToggleEl.classList.remove("shadow-none");
        });
      document
        .querySelectorAll(
          "#" + sidebar.getAttribute("id") + " [sidebar-toggle-list]"
        )
        .forEach((sidebarToggleEl) => {
          sidebarToggleEl.classList.remove("ml-3");
        });
      sidebarItems.classList.add("px-3");
      sidebarItems.classList.remove("pr-3");
      sidebarItems.classList.remove("pl-1.5");
    }
  }
});

sidebar.addEventListener("mouseleave", () => {
  if (toggleAccess) {
    if (!isSidebarExpanded(toggleSidebarEl)) {
      toggleSidebar(sidebar, false);
      document
        .querySelectorAll(
          "#" + sidebar.getAttribute("id") + " [sidebar-toggle-collapse]"
        )
        .forEach((sidebarToggleEl) => {
          sidebarToggleEl.classList.add("bg-gray-50");
          sidebarToggleEl.classList.add("shadow-none");
        });
      document
        .querySelectorAll(
          "#" + sidebar.getAttribute("id") + " [sidebar-toggle-list]"
        )
        .forEach((sidebarToggleEl) => {
          sidebarToggleEl.classList.add("ml-3");
        });
      sidebarItems.classList.remove("px-3");
      sidebarItems.classList.add("pr-3");
      sidebarItems.classList.add("pl-1.5");
    }
  }
});

const toggleSidebarMobile = (
  sidebar,
  sidebarBackdrop,
  toggleSidebarMobileHamburger,
  toggleSidebarMobileClose
) => {
  sidebar.classList.toggle("hidden");
  sidebarBackdrop.classList.toggle("hidden");
  toggleSidebarMobileHamburger.classList.toggle("hidden");
  toggleSidebarMobileClose.classList.toggle("hidden");
};

const toggleSidebarMobileEl = document.getElementById("toggleSidebarMobile");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const toggleSidebarMobileHamburger = document.getElementById(
  "toggleSidebarMobileHamburger"
);
const toggleSidebarMobileClose = document.getElementById(
  "toggleSidebarMobileClose"
);
const toggleSidebarMobileSearch = document.getElementById(
  "toggleSidebarMobileSearch"
);

toggleSidebarMobileSearch.addEventListener("click", () => {
  toggleSidebarMobile(
    sidebar,
    sidebarBackdrop,
    toggleSidebarMobileHamburger,
    toggleSidebarMobileClose
  );
});

toggleSidebarMobileEl.addEventListener("click", () => {
  toggleSidebarMobile(
    sidebar,
    sidebarBackdrop,
    toggleSidebarMobileHamburger,
    toggleSidebarMobileClose
  );
});

sidebarBackdrop.addEventListener("click", () => {
  toggleSidebarMobile(
    sidebar,
    sidebarBackdrop,
    toggleSidebarMobileHamburger,
    toggleSidebarMobileClose
  );
});
