! function() {
    "use strict";
    ! function(t) {
        var e = t.screen,
            n = e.width,
            r = e.height,
            a = t.navigator.language,
            i = t.location,
            o = t.localStorage,
            c = t.document,
            u = t.history,
            s = i.hostname,
            f = i.pathname,
            l = i.search,
            d = c.currentScript;
        if (d) {
            var v, p = function(t, e) {
                    return Object.keys(e).forEach((function(n) {
                        void 0 !== e[n] && (t[n] = e[n])
                    })), t
                },
                h = function(t, e, n) {
                    var r = t[e];
                    return function() {
                        for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
                        return n.apply(null, e), r.apply(t, e)
                    }
                },
                m = function() {
                    return o && o.getItem("umami.disabled") || E && function() {
                        var e = t.doNotTrack,
                            n = t.navigator,
                            r = t.external,
                            a = "msTrackingProtectionEnabled",
                            i = e || n.doNotTrack || n.msDoNotTrack || r && a in r && r[a]();
                        return "1" == i || "yes" === i
                    }() || A && !N.includes(s)
                },
                g = "data-",
                b = "false",
                y = d.getAttribute.bind(d),
                w = y(g + "website-id"),
                S = y(g + "host-url"),
                k = y(g + "auto-track") !== b,
                E = y(g + "do-not-track"),
                T = y(g + "css-events") !== b,
                A = y(g + "domains") || "",
                N = A.split(",").map((function(t) {
                    return t.trim()
                })),
                j = (S ? S.replace(/\/$/, "") : d.src.split("/").slice(0, -1).join("/")) + "/api/collect",
                x = n + "x" + r,
                O = /^umami--([a-z]+)--([\w]+[\w-]*)$/,
                K = "[class*='umami--']",
                L = {},
                D = "" + f + l,
                P = c.referrer,
                $ = function() {
                    return {
                        website: w,
                        hostname: s,
                        screen: x,
                        language: a,
                        url: D
                    }
                },
                _ = function(t, e) {
                    var n;
                    if (!m()) return fetch(j, {
                        method: "POST",
                        body: JSON.stringify({
                            type: t,
                            payload: e
                        }),
                        headers: p({
                            "Content-Type": "application/json"
                        }, (n = {}, n["x-umami-cache"] = v, n))
                    }).then((function(t) {
                        return t.text()
                    })).then((function(t) {
                        return v = t
                    }))
                },
                q = function(t, e, n) {
                    return void 0 === t && (t = D), void 0 === e && (e = P), void 0 === n && (n = w), _("pageview", p($(), {
                        website: n,
                        url: t,
                        referrer: e
                    }))
                },
                z = function(t, e, n, r) {
                    return void 0 === n && (n = D), void 0 === r && (r = w), _("event", p($(), {
                        website: r,
                        url: n,
                        event_name: t,
                        event_data: e
                    }))
                },
                C = function(t) {
                    var e = t.querySelectorAll(K);
                    Array.prototype.forEach.call(e, I)
                },
                I = function(t) {
                    var e = t.getAttribute.bind(t);
                    (e("class") || "").split(" ").forEach((function(n) {
                        if (O.test(n)) {
                            var r = n.split("--"),
                                a = r[1],
                                o = r[2],
                                c = L[n] ? L[n] : L[n] = function(n) {
                                    "click" !== a || "A" !== t.tagName || n.ctrlKey || n.shiftKey || n.metaKey || n.button && 1 === n.button || e("target") ? z(o) : (n.preventDefault(), z(o).then((function() {
                                        var t = e("href");
                                        t && (i.href = t)
                                    })))
                                };
                            t.addEventListener(a, c, !0)
                        }
                    }))
                },
                J = function(t, e, n) {
                    if (n) {
                        P = D;
                        var r = n.toString();
                        (D = "http" === r.substring(0, 4) ? "/" + r.split("/").splice(3).join("/") : r) !== P && q()
                    }
                };
            if (!t.umami) {
                var M = function(t) {
                    return z(t)
                };
                M.trackView = q, M.trackEvent = z, t.umami = M
            }
            if (k && !m()) {
                u.pushState = h(u, "pushState", J), u.replaceState = h(u, "replaceState", J);
                var V = function() {
                    "complete" === c.readyState && (q(), T && (C(c), new MutationObserver((function(t) {
                        t.forEach((function(t) {
                            var e = t.target;
                            I(e), C(e)
                        }))
                    })).observe(c, {
                        childList: !0,
                        subtree: !0
                    })))
                };
                c.addEventListener("readystatechange", V, !0), V()
            }
        }
    }(window)
}();