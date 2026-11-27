/* Home page: service tiles, results slider, opening hours */
(function () {
  var grid = document.getElementById("svcGrid");
  SERVICES.forEach(function (s) {
    var a = document.createElement("a");
    a.className = "tile rv tile-" + s.slug;
    a.href = "service.html?s=" + s.slug;
    a.innerHTML = '<img src="assets/cards/' + s.slug + '.jpg?v=9" alt="" loading="lazy">' +
      '<h3 data-svc="' + s.slug + '"></h3><p data-tag="' + s.slug + '"></p>' +
      '<span class="more"><span data-i18n="svc.more"></span><i aria-hidden="true">↗</i></span>';
    grid.appendChild(a);
  });

  var slider = document.getElementById("slider"), tabs = document.getElementById("tabs"),
      prev = document.getElementById("prev"), next = document.getElementById("next"),
      veil = document.getElementById("veilBtn");
  var withWork = SERVICES.filter(function (s) { return WORK[s.slug]; });
  var current = withWork[0].slug;

  function name(slug) {
    var s = SERVICES.find(function (x) { return x.slug === slug; });
    return s[DR.lang()].name.split(" · ")[0];
  }
  function veilLabel() {
    veil.textContent = DR.t(slider.classList.contains("veiled") ? "res.show" : "res.hide");
  }
  function arrows() {
    var max = slider.scrollWidth - slider.clientWidth, x = Math.abs(slider.scrollLeft);
    prev.disabled = x < 4;
    next.disabled = x > max - 4;
  }
  function reveal() { slider.classList.remove("veiled"); veilLabel(); }

  function drawSlides() {
    slider.innerHTML = "";
    var list = WORK[current].map(function (src, i) { return { src: src, alt: name(current) + " " + (i + 1) }; });
    list.forEach(function (item, i) {
      var b = DR.shot(item, function () {
        if (slider.classList.contains("veiled")) reveal();
        else DR.lightbox(list, i);
      });
      slider.appendChild(b);
    });
    slider.scrollLeft = 0;
    requestAnimationFrame(arrows);
  }
  function drawTabs() {
    tabs.innerHTML = "";
    withWork.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "tab"; b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", s.slug === current);
      b.textContent = name(s.slug);
      b.addEventListener("click", function () { current = s.slug; drawTabs(); drawSlides(); });
      tabs.appendChild(b);
    });
  }
  function move(dir) {
    var step = slider.firstElementChild.getBoundingClientRect().width + 10;
    slider.scrollBy({ left: dir * step * (document.documentElement.dir === "rtl" ? -1 : 1), behavior: "smooth" });
  }
  prev.addEventListener("click", function () { move(-1); });
  next.addEventListener("click", function () { move(1); });
  slider.addEventListener("scroll", arrows, { passive: true });
  window.addEventListener("resize", arrows);
  veil.addEventListener("click", function () { slider.classList.toggle("veiled"); veilLabel(); });

  document.getElementById("homeDir").href = SITE.mapsLink;

  function render() {
    var l = DR.lang();
    document.querySelectorAll("[data-tag]").forEach(function (el) {
      el.textContent = SERVICES.find(function (x) { return x.slug === el.dataset.tag; })[l].tag;
    });
    DR.fillHours(document.getElementById("homeHours"));
    drawTabs(); drawSlides(); veilLabel();
  }
  document.addEventListener("langchange", render);
  /* main.js builds the header on DOMContentLoaded; it fires "langchange" which draws everything */
  if (document.readyState !== "loading") { DR.applyLang(); }
  grid.querySelectorAll(".tile").forEach(function (c) { DR.observe(c); });
})();
