(() => {
  "use strict";
  const e = ((e = 100) => {
      document.querySelector(".calc-block").addEventListener("input", (e) => {
        e.target.matches("input") &&
          (e.target.value = e.target.value.replace(/\D/, ""));
      });
      const t = document.querySelector(".calc-block"),
        o = document.querySelector(".calc-type"),
        a = document.querySelector(".calc-square"),
        n = document.querySelector(".calc-count"),
        r = document.querySelector(".calc-day"),
        c = document.getElementById("total");
      t.addEventListener("change", (t) => {
        const l = t.target;
        (l.matches("select") || l.matches("input")) &&
          (() => {
            let t = 0,
              l = 1,
              s = 1;
            const d = o.options[o.selectedIndex].value,
              i = +a.value;
            n.value > 1 && (l += (n.value - 1) / 10),
              r.value && r.value < 5
                ? (s *= 2)
                : r.value && r.value < 10 && (s *= 1.5),
              d && i && (t = e * d * i * l * s),
              (c.textContent = t);
          })();
      }),
        t.addEventListener("input", (e) => {
          e.target.matches("input") &&
            (e.target.value = e.target.value.replace(/\D/, ""));
        });
    })(),
    t = (e) => {
      const t = document.getElementById(e),
        o = document.createElement("div");
      (o.style.cssText = "font-size: 2rem;"),
        t.addEventListener("submit", (e) => {
          e.preventDefault(), t.appendChild(o);
          const a = new FormData(t);
          o.textContent = "Загрузка...";
          let n = {};
          t.reset(),
            a.forEach((e, t) => {
              n[t] = e;
            }),
            ((e) =>
              fetch("./server.php", {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                body: e,
              }))(a)
              .then((e) => {
                if (200 !== e.status) throw new Error("Status network not 200");
                o.textContent = "Спасибо! Мы скоро с Вами свяжемся!";
              })
              .catch((e) => {
                (o.textContent = "Что-то пошло не так!"), console.error(e);
              });
        });
    };
  ((e) => {
    const t = document.getElementById("timer-hours"),
      o = document.getElementById("timer-minutes"),
      a = document.getElementById("timer-seconds"),
      n = (e) => (e < 10 ? "0" + e : e),
      r = () => {
        const t = new Date(e).getTime(),
          o = new Date().getTime(),
          a = o > t,
          r = (t - o) / 1e3,
          c = n(Math.floor(r % 60)),
          l = n(Math.floor((r / 60) % 60));
        return {
          timeRemaining: r,
          hours: n(Math.floor(r / 60 / 60)),
          minutes: l,
          seconds: c,
          fullStop: a,
        };
      },
      c = () => {
        const e = r();
        (t.textContent = e.hours),
          (o.textContent = e.minutes),
          (a.textContent = e.seconds);
      };
    if (r().timeRemaining > 0) {
      c();
      const e = setInterval(() => {
        r().fullStop ? clearInterval(e) : c();
      }, 1e3);
    } else
      r().fullStop &&
        (document.getElementById("timer").style.color = "#FF0000");
  })("22 march 2022"),
    document.body.addEventListener("click", (e) => {
      const t = e.target,
        o = document.querySelector("menu");
      t.closest(".menu")
        ? o.classList.add("active-menu")
        : t !== o && o.classList.remove("active-menu");
    }),
    (() => {
      const e = document.querySelector(".popup"),
        t = document.querySelectorAll(".popup-btn");
      (e.style.display = "block"), (e.style.transform = "translateX(100%)");
      let o,
        a = 20;
      const n = () => {
        (o = requestAnimationFrame(n)),
          a--,
          a >= 0
            ? (e.style.transform = `translateX(${a}%)`)
            : cancelAnimationFrame(o);
      };
      t.forEach((t) => {
        t.addEventListener("click", () => {
          document.body.clientWidth > 768
            ? requestAnimationFrame(n)
            : (e.style.transform = "translateX(0)");
        });
      }),
        e.addEventListener("click", (t) => {
          let o = t.target;
          o.classList.contains("popup-close")
            ? ((a = 100), (e.style.transform = "translateX(100%)"))
            : ((o = o.closest(".popup-content")),
              o || ((a = 100), (e.style.transform = "translateX(100%)")));
        });
    })(),
    (() => {
      const e = document.querySelector(".service-header"),
        t = document.querySelectorAll(".service-header-tab"),
        o = document.querySelectorAll(".service-tab");
      e.addEventListener("click", (e) => {
        let a = e.target;
        (a = a.closest(".service-header-tab")),
          a &&
            t.forEach((e, n) => {
              e === a &&
                ((e) => {
                  for (let a = 0; a < o.length; a++)
                    e === a
                      ? (t[a].classList.add("active"),
                        o[a].classList.remove("d-none"))
                      : (t[a].classList.remove("active"),
                        o[a].classList.add("d-none"));
                })(n);
            });
      });
    })(),
    (() => {
      const e = document.querySelector(".portfolio-content"),
        t = document.querySelectorAll(".portfolio-item"),
        o = document.querySelector(".portfolio-dots");
      for (let e = 0; e < t.length; e++) {
        const t = document.createElement("li");
        t.classList.add("dot"),
          0 === e && t.classList.add("dot-active"),
          o.append(t);
      }
      const a = document.querySelectorAll(".dot");
      let n,
        r = 0;
      const c = (e, t, o) => {
          e[t].classList.remove(o);
        },
        l = (e, t, o) => {
          e[t].classList.add(o);
        },
        s = () => {
          c(t, r, "portfolio-item-active"),
            c(a, r, "dot-active"),
            r++,
            r >= t.length && (r = 0),
            l(t, r, "portfolio-item-active"),
            l(a, r, "dot-active");
        },
        d = (e = 3e3) => {
          n = setInterval(s, e);
        };
      e.addEventListener("click", (e) => {
        e.preventDefault();
        let o = e.target;
        o.matches(".portfolio-btn, .dot") &&
          (c(t, r, "portfolio-item-active"),
          c(a, r, "dot-active"),
          o.matches("#arrow-right")
            ? r++
            : o.matches("#arrow-left")
            ? r--
            : o.matches(".dot") &&
              a.forEach((e, t) => {
                e === o && (r = t);
              }),
          r >= t.length && (r = 0),
          r < 0 && (r = t.length - 1),
          l(t, r, "portfolio-item-active"),
          l(a, r, "dot-active"));
      }),
        e.addEventListener("mouseover", (e) => {
          (e.target.matches(".portfolio-btn") || e.target.matches(".dot")) &&
            clearTimeout(n);
        }),
        e.addEventListener("mouseout", (e) => {
          (e.target.matches(".portfolio-btn") || e.target.matches(".dot")) &&
            d();
        }),
        d(1500);
    })(),
    ((e) => {
      const t = document.querySelector("#command .row"),
        o = (e) => {
          const t = e.target;
          if (t.classList.contains("command__photo")) {
            const e = t.src;
            (t.src = t.dataset.img), (t.dataset.img = e);
          }
        };
      t.addEventListener("mouseover", o), t.addEventListener("mouseout", o);
    })(),
    e(100),
    document.querySelectorAll('[placeholder="Ваше имя"]').forEach((e) => {
      e.addEventListener("input", () => {
        e.value = e.value.replace(/[^а-яё\s]/gi, "");
      }),
        e.addEventListener("blur", () => {
          e.value = e.value
            .split(/\s+/)
            .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
            .join(" ");
        });
    }),
    document.querySelectorAll('[placeholder="E-mail"]').forEach((e) => {
      e.addEventListener("input", () => {
        e.value = e.value.replace(/[^a-z@\-_.!~*^1-9']{1,}/gi, "");
      }),
        e.addEventListener("blur", () => {
          e.value = e.value
            .replace(/^[\s-]+|[\s-]+$/gi, "")
            .replace(/-+/g, "-");
        });
    }),
    document.querySelectorAll('[placeholder*="телефон"]').forEach((e) => {
      e.addEventListener("input", () => {
        e.value = e.value.replace(/[^+\d]/g, "");
      }),
        e.addEventListener("blur", () => {
          e.value = e.value.replace(/^[\s]+|[\s\+]{1,}$/g, "");
        });
    }),
    (() => {
      const e = document.getElementById("form2-message");
      e.addEventListener("input", () => {
        e.value = e.value.replace(/[^а-яё\d\s\-\?;:,.!]/gi, "");
      }),
        e.addEventListener("blur", () => {
          e.value = e.value.trim().replace(/\s+/g, " ").replace(/-+/g, "-");
        });
    })(),
    t("form1"),
    t("form2"),
    t("form3");
})();
