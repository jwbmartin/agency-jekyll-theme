function registerTransition(e, t) {
    var n, r;
    e.indexOf("In") >= 0 ? (n = aniEase,
    r = aniDuration,
    t.opacity = [1, 0]) : (r = aniDuration / 1.66,
    n = aniEaseOut,
    t.opacity = 0),
    $.Velocity.RegisterUI(e, {
        defaultDuration: r,
        calls: [[t, aniDuration / 1e3, {
            easing: n
        }]]
    })
}
function changeEventInfo(e, t, n) {
    if (!Sidebar.isAnimating()) {
        if (!stateHandler.supported())
            return void (window.location = e.children("a").attr("href"));
        Sidebar.isOpen() && Sidebar.animClose(e);
        var r = $(t[t.index(e) - 1])
          , i = $(t[t.index(e) + 1])
          , a = $(".js-event-next-prev");
        a.html(""),
        r.length && ($eventPrev = $('<a href="" class="nav-arrows--arrow"><img src="/assets/img/arrow-left.svg" alt="Previous"></a>'),
        a.append($eventPrev),
        $eventPrev.on("click touch", function(e) {
            e.preventDefault(),
            r.trigger("click")
        })),
        i.length && ($eventNext = $('<a href="#" class="nav-arrows--arrow"><img src="/assets/img/arrow-right.svg" alt="Next"></a>'),
        a.append($eventNext),
        $eventNext.on("click touch", function(e) {
            e.preventDefault(),
            i.trigger("click")
        }));
        var o = e.children("a").attr("href");
        setEventDetails(o + ".json", function(t) {
            n || stateHandler.push({
                url: o,
                title: t.title + " – See&Do",
                eventId: e.attr("id")
            })
        }),
        $(".event--active").removeClass("event--active"),
        e.addClass("event--active")
    }
}
function setEventDetails(e, t) {
    $.getJSON(e, function(e) {
        $(".event-info--title").html(e.title),
        $(".js-event-info-date").html(e.longDates),
        $(".js-event-info-time").html(e.times),
        $(".js-event-info-venue").html(e.venue),
        $(".js-event-info-user").html('<a href="/' + $(location).prop("pathname").split("/")[1] + "/users/" + e.user.slug + '">' + e.user.username + "</a>"),
        $(".js-event-info-fb").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(e.url)),
        $(".js-event-info-twitter").attr("href", "https://twitter.com/home?status=" + encodeURI(e.title + " " + e.url)),
        $(".js-edit-event").attr("href", encodeURI(e.url + "/edit")),
        null != e.more_info ? $(".js-event-info-wrapper").html('<a href="' + e.more_info + '" target="_blank">More Info</a>') : $(".js-event-info-wrapper").html(""),
        $(".event-info .body-copy").html("<p>" + e.parsedContent + "</p>");
        var n;
        n = ".event-background-color { background: " + e.color_scheme.color_1 + "; fill: " + e.color_scheme.color_1 + ";}",
        n += ".event-primary-color { color: " + e.color_scheme.color_2 + "; fill: " + e.color_scheme.color_2 + ";}",
        n += ".event-secondary-color { color: " + e.color_scheme.color_3 + "; fill: " + e.color_scheme.color_3 + ";}",
        n += ".event-info .body-copy a, .event-info .meta-data a { color: " + e.color_scheme.color_3 + ";}",
        n += ".event-info .js-event-info-wrapper a { color: " + e.color_scheme.color_3 + ";}",
        n += ".event-info .event-info--share a:hover { color: " + e.color_scheme.color_3 + ";}",
        $("#js-event-color-scheme").remove(),
        $('<style id="js-event-color-scheme" type="text/css">' + n + "</style>").appendTo("head"),
        Sidebar.animOpen(),
        t && t(e)
    })
}
function siteTitleFun(e) {
    var t = this;
    t.$elem = e,
    t._currentText = e.text(),
    t._finalText = e.text(),
    t._randomChars = "Jordan Whitney Martin s  mulcp g☺☼☽✈✍✎□☹♀",
    t.addChar = function() {
        t._currentText = t.randomize(),
        t.$elem.text(t._currentText),
        t._currentText !== t._finalText && setTimeout(function() {
            t.addChar()
        }, 22)
    }
    ,
    t.randomize = function(e) {
        for (var n = t._currentText.split(""), r = t._finalText.split(""), i = "", a = 0, o = n.length; o > a; a++)
            i += n[a] !== r[a] || e ? t._randomChars.charAt(Math.floor(Math.random() * t._randomChars.length)) : r[a];
        return t._currentText = i,
        t._currentText
    }
    ,
    t._currentText = t.randomize(!0),
    e.text("&nbsp;"),
    t.addChar()
}
function findInArrayByKey(e, t, n) {
    var r = $.grep(e, function(e) {
        return e[t] == n
    });
    return r.length ? r[0] : null
}
!function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
    : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    function n(e) {
        var t = "length"in e && e.length
          , n = ie.type(e);
        return "function" === n || ie.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    function r(e, t, n) {
        if (ie.isFunction(t))
            return ie.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n
            });
        if (t.nodeType)
            return ie.grep(e, function(e) {
                return e === t !== n
            });
        if ("string" == typeof t) {
            if (fe.test(t))
                return ie.filter(t, e, n);
            t = ie.filter(t, e)
        }
        return ie.grep(e, function(e) {
            return ie.inArray(e, t) >= 0 !== n
        })
    }
    function i(e, t) {
        do
            e = e[t];
        while (e && 1 !== e.nodeType);return e
    }
    function a(e) {
        var t = we[e] = {};
        return ie.each(e.match(be) || [], function(e, n) {
            t[n] = !0
        }),
        t
    }
    function o() {
        pe.addEventListener ? (pe.removeEventListener("DOMContentLoaded", s, !1),
        e.removeEventListener("load", s, !1)) : (pe.detachEvent("onreadystatechange", s),
        e.detachEvent("onload", s))
    }
    function s() {
        (pe.addEventListener || "load" === event.type || "complete" === pe.readyState) && (o(),
        ie.ready())
    }
    function u(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(De, "-$1").toLowerCase();
            if (n = e.getAttribute(r),
            "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Se.test(n) ? ie.parseJSON(n) : n
                } catch (i) {}
                ie.data(e, t, n)
            } else
                n = void 0
        }
        return n
    }
    function l(e) {
        var t;
        for (t in e)
            if (("data" !== t || !ie.isEmptyObject(e[t])) && "toJSON" !== t)
                return !1;
        return !0
    }
    function c(e, t, n, r) {
        if (ie.acceptData(e)) {
            var i, a, o = ie.expando, s = e.nodeType, u = s ? ie.cache : e, l = s ? e[o] : e[o] && o;
            if (l && u[l] && (r || u[l].data) || void 0 !== n || "string" != typeof t)
                return l || (l = s ? e[o] = G.pop() || ie.guid++ : o),
                u[l] || (u[l] = s ? {} : {
                    toJSON: ie.noop
                }),
                ("object" == typeof t || "function" == typeof t) && (r ? u[l] = ie.extend(u[l], t) : u[l].data = ie.extend(u[l].data, t)),
                a = u[l],
                r || (a.data || (a.data = {}),
                a = a.data),
                void 0 !== n && (a[ie.camelCase(t)] = n),
                "string" == typeof t ? (i = a[t],
                null == i && (i = a[ie.camelCase(t)])) : i = a,
                i
        }
    }
    function d(e, t, n) {
        if (ie.acceptData(e)) {
            var r, i, a = e.nodeType, o = a ? ie.cache : e, s = a ? e[ie.expando] : ie.expando;
            if (o[s]) {
                if (t && (r = n ? o[s] : o[s].data)) {
                    ie.isArray(t) ? t = t.concat(ie.map(t, ie.camelCase)) : t in r ? t = [t] : (t = ie.camelCase(t),
                    t = t in r ? [t] : t.split(" ")),
                    i = t.length;
                    for (; i--; )
                        delete r[t[i]];
                    if (n ? !l(r) : !ie.isEmptyObject(r))
                        return
                }
                (n || (delete o[s].data,
                l(o[s]))) && (a ? ie.cleanData([e], !0) : ne.deleteExpando || o != o.window ? delete o[s] : o[s] = null )
            }
        }
    }
    function f() {
        return !0
    }
    function h() {
        return !1
    }
    function p() {
        try {
            return pe.activeElement
        } catch (e) {}
    }
    function m(e) {
        var t = Ie.split("|")
          , n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length; )
                n.createElement(t.pop());
        return n
    }
    function g(e, t) {
        var n, r, i = 0, a = typeof e.getElementsByTagName !== _e ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== _e ? e.querySelectorAll(t || "*") : void 0;
        if (!a)
            for (a = [],
            n = e.childNodes || e; null != (r = n[i]); i++)
                !t || ie.nodeName(r, t) ? a.push(r) : ie.merge(a, g(r, t));
        return void 0 === t || t && ie.nodeName(e, t) ? ie.merge([e], a) : a
    }
    function y(e) {
        Ye.test(e.type) && (e.defaultChecked = e.checked)
    }
    function v(e, t) {
        return ie.nodeName(e, "table") && ie.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function b(e) {
        return e.type = (null !== ie.find.attr(e, "type")) + "/" + e.type,
        e
    }
    function w(e) {
        var t = ze.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function x(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++)
            ie._data(n, "globalEval", !t || ie._data(t[r], "globalEval"))
    }
    function T(e, t) {
        if (1 === t.nodeType && ie.hasData(e)) {
            var n, r, i, a = ie._data(e), o = ie._data(t, a), s = a.events;
            if (s) {
                delete o.handle,
                o.events = {};
                for (n in s)
                    for (r = 0,
                    i = s[n].length; i > r; r++)
                        ie.event.add(t, n, s[n][r])
            }
            o.data && (o.data = ie.extend({}, o.data))
        }
    }
    function _(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(),
            !ne.noCloneEvent && t[ie.expando]) {
                i = ie._data(t);
                for (r in i.events)
                    ie.removeEvent(t, r, i.handle);
                t.removeAttribute(ie.expando)
            }
            "script" === n && t.text !== e.text ? (b(t).text = e.text,
            w(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
            ne.html5Clone && e.innerHTML && !ie.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Ye.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
            t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }
    function S(t, n) {
        var r, i = ie(n.createElement(t)).appendTo(n.body), a = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : ie.css(i[0], "display");
        return i.detach(),
        a
    }
    function D(e) {
        var t = pe
          , n = Ke[e];
        return n || (n = S(e, t),
        "none" !== n && n || (Qe = (Qe || ie("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement),
        t = (Qe[0].contentWindow || Qe[0].contentDocument).document,
        t.write(),
        t.close(),
        n = S(e, t),
        Qe.detach()),
        Ke[e] = n),
        n
    }
    function k(e, t) {
        return {
            get: function() {
                var n = e();
                return null != n ? n ? void delete this.get : (this.get = t).apply(this, arguments) : void 0
            }
        }
    }
    function C(e, t) {
        if (t in e)
            return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = ft.length; i--; )
            if (t = ft[i] + n,
            t in e)
                return t;
        return r
    }
    function M(e, t) {
        for (var n, r, i, a = [], o = 0, s = e.length; s > o; o++)
            r = e[o],
            r.style && (a[o] = ie._data(r, "olddisplay"),
            n = r.style.display,
            t ? (a[o] || "none" !== n || (r.style.display = ""),
            "" === r.style.display && Me(r) && (a[o] = ie._data(r, "olddisplay", D(r.nodeName)))) : (i = Me(r),
            (n && "none" !== n || !i) && ie._data(r, "olddisplay", i ? n : ie.css(r, "display"))));
        for (o = 0; s > o; o++)
            r = e[o],
            r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? a[o] || "" : "none"));
        return e
    }
    function E(e, t, n) {
        var r = ut.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function Y(e, t, n, r, i) {
        for (var a = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2)
            "margin" === n && (o += ie.css(e, n + Ce[a], !0, i)),
            r ? ("content" === n && (o -= ie.css(e, "padding" + Ce[a], !0, i)),
            "margin" !== n && (o -= ie.css(e, "border" + Ce[a] + "Width", !0, i))) : (o += ie.css(e, "padding" + Ce[a], !0, i),
            "padding" !== n && (o += ie.css(e, "border" + Ce[a] + "Width", !0, i)));
        return o
    }
    function P(e, t, n) {
        var r = !0
          , i = "width" === t ? e.offsetWidth : e.offsetHeight
          , a = et(e)
          , o = ne.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, a);
        if (0 >= i || null == i) {
            if (i = tt(e, t, a),
            (0 > i || null == i) && (i = e.style[t]),
            rt.test(i))
                return i;
            r = o && (ne.boxSizingReliable() || i === e.style[t]),
            i = parseFloat(i) || 0
        }
        return i + Y(e, t, n || (o ? "border" : "content"), r, a) + "px"
    }
    function O(e, t, n, r, i) {
        return new O.prototype.init(e,t,n,r,i)
    }
    function N() {
        return setTimeout(function() {
            ht = void 0
        }),
        ht = ie.now()
    }
    function A(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t)
            n = Ce[i],
            r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
        r
    }
    function F(e, t, n) {
        for (var r, i = (bt[t] || []).concat(bt["*"]), a = 0, o = i.length; o > a; a++)
            if (r = i[a].call(n, t, e))
                return r
    }
    function I(e, t, n) {
        var r, i, a, o, s, u, l, c, d = this, f = {}, h = e.style, p = e.nodeType && Me(e), m = ie._data(e, "fxshow");
        n.queue || (s = ie._queueHooks(e, "fx"),
        null == s.unqueued && (s.unqueued = 0,
        u = s.empty.fire,
        s.empty.fire = function() {
            s.unqueued || u()
        }
        ),
        s.unqueued++,
        d.always(function() {
            d.always(function() {
                s.unqueued--,
                ie.queue(e, "fx").length || s.empty.fire()
            })
        })),
        1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
        l = ie.css(e, "display"),
        c = "none" === l ? ie._data(e, "olddisplay") || D(e.nodeName) : l,
        "inline" === c && "none" === ie.css(e, "float") && (ne.inlineBlockNeedsLayout && "inline" !== D(e.nodeName) ? h.zoom = 1 : h.display = "inline-block")),
        n.overflow && (h.overflow = "hidden",
        ne.shrinkWrapBlocks() || d.always(function() {
            h.overflow = n.overflow[0],
            h.overflowX = n.overflow[1],
            h.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r],
            mt.exec(i)) {
                if (delete t[r],
                a = a || "toggle" === i,
                i === (p ? "hide" : "show")) {
                    if ("show" !== i || !m || void 0 === m[r])
                        continue;p = !0
                }
                f[r] = m && m[r] || ie.style(e, r)
            } else
                l = void 0;
        if (ie.isEmptyObject(f))
            "inline" === ("none" === l ? D(e.nodeName) : l) && (h.display = l);
        else {
            m ? "hidden"in m && (p = m.hidden) : m = ie._data(e, "fxshow", {}),
            a && (m.hidden = !p),
            p ? ie(e).show() : d.done(function() {
                ie(e).hide()
            }),
            d.done(function() {
                var t;
                ie._removeData(e, "fxshow");
                for (t in f)
                    ie.style(e, t, f[t])
            });
            for (r in f)
                o = F(p ? m[r] : 0, r, d),
                r in m || (m[r] = o.start,
                p && (o.end = o.start,
                o.start = "width" === r || "height" === r ? 1 : 0))
        }
    }
    function L(e, t) {
        var n, r, i, a, o;
        for (n in e)
            if (r = ie.camelCase(n),
            i = t[r],
            a = e[n],
            ie.isArray(a) && (i = a[1],
            a = e[n] = a[0]),
            n !== r && (e[r] = a,
            delete e[n]),
            o = ie.cssHooks[r],
            o && "expand"in o) {
                a = o.expand(a),
                delete e[r];
                for (n in a)
                    n in e || (e[n] = a[n],
                    t[n] = i)
            } else
                t[r] = i
    }
    function H(e, t, n) {
        var r, i, a = 0, o = vt.length, s = ie.Deferred().always(function() {
            delete u.elem
        }), u = function() {
            if (i)
                return !1;
            for (var t = ht || N(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, a = 1 - r, o = 0, u = l.tweens.length; u > o; o++)
                l.tweens[o].run(a);
            return s.notifyWith(e, [l, a, n]),
            1 > a && u ? n : (s.resolveWith(e, [l]),
            !1)
        }
        , l = s.promise({
            elem: e,
            props: ie.extend({}, t),
            opts: ie.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: ht || N(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = ie.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(r),
                r
            },
            stop: function(t) {
                var n = 0
                  , r = t ? l.tweens.length : 0;
                if (i)
                    return this;
                for (i = !0; r > n; n++)
                    l.tweens[n].run(1);
                return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]),
                this
            }
        }), c = l.props;
        for (L(c, l.opts.specialEasing); o > a; a++)
            if (r = vt[a].call(l, e, c, l.opts))
                return r;
        return ie.map(c, F, l),
        ie.isFunction(l.opts.start) && l.opts.start.call(e, l),
        ie.fx.timer(ie.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })),
        l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    function $(e) {
        return function(t, n) {
            "string" != typeof t && (n = t,
            t = "*");
            var r, i = 0, a = t.toLowerCase().match(be) || [];
            if (ie.isFunction(n))
                for (; r = a[i++]; )
                    "+" === r.charAt(0) ? (r = r.slice(1) || "*",
                    (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function j(e, t, n, r) {
        function i(s) {
            var u;
            return a[s] = !0,
            ie.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || o || a[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l),
                i(l),
                !1)
            }),
            u
        }
        var a = {}
          , o = e === Vt;
        return i(t.dataTypes[0]) || !a["*"] && i("*")
    }
    function W(e, t) {
        var n, r, i = ie.ajaxSettings.flatOptions || {};
        for (r in t)
            void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && ie.extend(!0, e, n),
        e
    }
    function R(e, t, n) {
        for (var r, i, a, o, s = e.contents, u = e.dataTypes; "*" === u[0]; )
            u.shift(),
            void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (o in s)
                if (s[o] && s[o].test(i)) {
                    u.unshift(o);
                    break
                }
        if (u[0]in n)
            a = u[0];
        else {
            for (o in n) {
                if (!u[0] || e.converters[o + " " + u[0]]) {
                    a = o;
                    break
                }
                r || (r = o)
            }
            a = a || r
        }
        return a ? (a !== u[0] && u.unshift(a),
        n[a]) : void 0
    }
    function V(e, t, n, r) {
        var i, a, o, s, u, l = {}, c = e.dataTypes.slice();
        if (c[1])
            for (o in e.converters)
                l[o.toLowerCase()] = e.converters[o];
        for (a = c.shift(); a; )
            if (e.responseFields[a] && (n[e.responseFields[a]] = t),
            !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
            u = a,
            a = c.shift())
                if ("*" === a)
                    a = u;
                else if ("*" !== u && u !== a) {
                    if (o = l[u + " " + a] || l["* " + a],
                    !o)
                        for (i in l)
                            if (s = i.split(" "),
                            s[1] === a && (o = l[u + " " + s[0]] || l["* " + s[0]])) {
                                o === !0 ? o = l[i] : l[i] !== !0 && (a = s[0],
                                c.unshift(s[1]));
                                break
                            }
                    if (o !== !0)
                        if (o && e["throws"])
                            t = o(t);
                        else
                            try {
                                t = o(t)
                            } catch (d) {
                                return {
                                    state: "parsererror",
                                    error: o ? d : "No conversion from " + u + " to " + a
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }
    function U(e, t, n, r) {
        var i;
        if (ie.isArray(t))
            ie.each(t, function(t, i) {
                n || zt.test(e) ? r(e, i) : U(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
            });
        else if (n || "object" !== ie.type(t))
            r(e, t);
        else
            for (i in t)
                U(e + "[" + i + "]", t[i], n, r)
    }
    function X() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }
    function q() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }
    function z(e) {
        return ie.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var G = []
      , B = G.slice
      , Z = G.concat
      , J = G.push
      , Q = G.indexOf
      , K = {}
      , ee = K.toString
      , te = K.hasOwnProperty
      , ne = {}
      , re = "1.11.3"
      , ie = function(e, t) {
        return new ie.fn.init(e,t)
    }
      , ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , oe = /^-ms-/
      , se = /-([\da-z])/gi
      , ue = function(e, t) {
        return t.toUpperCase()
    }
    ;
    ie.fn = ie.prototype = {
        jquery: re,
        constructor: ie,
        selector: "",
        length: 0,
        toArray: function() {
            return B.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : B.call(this)
        },
        pushStack: function(e) {
            var t = ie.merge(this.constructor(), e);
            return t.prevObject = this,
            t.context = this.context,
            t
        },
        each: function(e, t) {
            return ie.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(ie.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(B.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length
              , n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null )
        },
        push: J,
        sort: G.sort,
        splice: G.splice
    },
    ie.extend = ie.fn.extend = function() {
        var e, t, n, r, i, a, o = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
        for ("boolean" == typeof o && (l = o,
        o = arguments[s] || {},
        s++),
        "object" == typeof o || ie.isFunction(o) || (o = {}),
        s === u && (o = this,
        s--); u > s; s++)
            if (null != (i = arguments[s]))
                for (r in i)
                    e = o[r],
                    n = i[r],
                    o !== n && (l && n && (ie.isPlainObject(n) || (t = ie.isArray(n))) ? (t ? (t = !1,
                    a = e && ie.isArray(e) ? e : []) : a = e && ie.isPlainObject(e) ? e : {},
                    o[r] = ie.extend(l, a, n)) : void 0 !== n && (o[r] = n));
        return o
    }
    ,
    ie.extend({
        expando: "jQuery" + (re + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === ie.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === ie.type(e)
        }
        ,
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return !ie.isArray(e) && e - parseFloat(e) + 1 >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== ie.type(e) || e.nodeType || ie.isWindow(e))
                return !1;
            try {
                if (e.constructor && !te.call(e, "constructor") && !te.call(e.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (n) {
                return !1
            }
            if (ne.ownLast)
                for (t in e)
                    return te.call(e, t);
            for (t in e)
                ;
            return void 0 === t || te.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? K[ee.call(e)] || "object" : typeof e
        },
        globalEval: function(t) {
            t && ie.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            }
            )(t)
        },
        camelCase: function(e) {
            return e.replace(oe, "ms-").replace(se, ue)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, r) {
            var i, a = 0, o = e.length, s = n(e);
            if (r) {
                if (s)
                    for (; o > a && (i = t.apply(e[a], r),
                    i !== !1); a++)
                        ;
                else
                    for (a in e)
                        if (i = t.apply(e[a], r),
                        i === !1)
                            break
            } else if (s)
                for (; o > a && (i = t.call(e[a], a, e[a]),
                i !== !1); a++)
                    ;
            else
                for (a in e)
                    if (i = t.call(e[a], a, e[a]),
                    i === !1)
                        break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(ae, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? ie.merge(r, "string" == typeof e ? [e] : e) : J.call(r, e)),
            r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (Q)
                    return Q.call(t, e, n);
                for (r = t.length,
                n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                    if (n in t && t[n] === e)
                        return n
            }
            return -1
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r; )
                e[i++] = t[r++];
            if (n !== n)
                for (; void 0 !== t[r]; )
                    e[i++] = t[r++];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            for (var r, i = [], a = 0, o = e.length, s = !n; o > a; a++)
                r = !t(e[a], a),
                r !== s && i.push(e[a]);
            return i
        },
        map: function(e, t, r) {
            var i, a = 0, o = e.length, s = n(e), u = [];
            if (s)
                for (; o > a; a++)
                    i = t(e[a], a, r),
                    null != i && u.push(i);
            else
                for (a in e)
                    i = t(e[a], a, r),
                    null != i && u.push(i);
            return Z.apply([], u)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return "string" == typeof t && (i = e[t],
            t = e,
            e = i),
            ie.isFunction(e) ? (n = B.call(arguments, 2),
            r = function() {
                return e.apply(t || this, n.concat(B.call(arguments)))
            }
            ,
            r.guid = e.guid = e.guid || ie.guid++,
            r) : void 0
        },
        now: function() {
            return +new Date
        },
        support: ne
    }),
    ie.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        K["[object " + t + "]"] = t.toLowerCase()
    });
    var le = function(e) {
        function t(e, t, n, r) {
            var i, a, o, s, u, l, d, h, p, m;
            if ((t ? t.ownerDocument || t : j) !== O && P(t),
            t = t || O,
            n = n || [],
            s = t.nodeType,
            "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s)
                return n;
            if (!r && A) {
                if (11 !== s && (i = ve.exec(e)))
                    if (o = i[1]) {
                        if (9 === s) {
                            if (a = t.getElementById(o),
                            !a || !a.parentNode)
                                return n;
                            if (a.id === o)
                                return n.push(a),
                                n
                        } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(o)) && H(t, a) && a.id === o)
                            return n.push(a),
                            n
                    } else {
                        if (i[2])
                            return Q.apply(n, t.getElementsByTagName(e)),
                            n;
                        if ((o = i[3]) && x.getElementsByClassName)
                            return Q.apply(n, t.getElementsByClassName(o)),
                            n
                    }
                if (x.qsa && (!F || !F.test(e))) {
                    if (h = d = $,
                    p = t,
                    m = 1 !== s && e,
                    1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (l = D(e),
                        (d = t.getAttribute("id")) ? h = d.replace(we, "\\$&") : t.setAttribute("id", h),
                        h = "[id='" + h + "'] ",
                        u = l.length; u--; )
                            l[u] = h + f(l[u]);
                        p = be.test(e) && c(t.parentNode) || t,
                        m = l.join(",")
                    }
                    if (m)
                        try {
                            return Q.apply(n, p.querySelectorAll(m)),
                            n
                        } catch (g) {} finally {
                            d || t.removeAttribute("id")
                        }
                }
            }
            return C(e.replace(ue, "$1"), t, n, r)
        }
        function n() {
            function e(n, r) {
                return t.push(n + " ") > T.cacheLength && delete e[t.shift()],
                e[n + " "] = r
            }
            var t = [];
            return e
        }
        function r(e) {
            return e[$] = !0,
            e
        }
        function i(e) {
            var t = O.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function a(e, t) {
            for (var n = e.split("|"), r = e.length; r--; )
                T.attrHandle[n[r]] = t
        }
        function o(e, t) {
            var n = t && e
              , r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || z) - (~e.sourceIndex || z);
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling; )
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function l(e) {
            return r(function(t) {
                return t = +t,
                r(function(n, r) {
                    for (var i, a = e([], n.length, t), o = a.length; o--; )
                        n[i = a[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function c(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        function d() {}
        function f(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++)
                r += e[t].value;
            return r
        }
        function h(e, t, n) {
            var r = t.dir
              , i = n && "parentNode" === r
              , a = R++;
            return t.first ? function(t, n, a) {
                for (; t = t[r]; )
                    if (1 === t.nodeType || i)
                        return e(t, n, a)
            }
            : function(t, n, o) {
                var s, u, l = [W, a];
                if (o) {
                    for (; t = t[r]; )
                        if ((1 === t.nodeType || i) && e(t, n, o))
                            return !0
                } else
                    for (; t = t[r]; )
                        if (1 === t.nodeType || i) {
                            if (u = t[$] || (t[$] = {}),
                            (s = u[r]) && s[0] === W && s[1] === a)
                                return l[2] = s[2];
                            if (u[r] = l,
                            l[2] = e(t, n, o))
                                return !0
                        }
            }
        }
        function p(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--; )
                    if (!e[i](t, n, r))
                        return !1;
                return !0
            }
            : e[0]
        }
        function m(e, n, r) {
            for (var i = 0, a = n.length; a > i; i++)
                t(e, n[i], r);
            return r
        }
        function g(e, t, n, r, i) {
            for (var a, o = [], s = 0, u = e.length, l = null != t; u > s; s++)
                (a = e[s]) && (!n || n(a, r, i)) && (o.push(a),
                l && t.push(s));
            return o
        }
        function y(e, t, n, i, a, o) {
            return i && !i[$] && (i = y(i)),
            a && !a[$] && (a = y(a, o)),
            r(function(r, o, s, u) {
                var l, c, d, f = [], h = [], p = o.length, y = r || m(t || "*", s.nodeType ? [s] : s, []), v = !e || !r && t ? y : g(y, f, e, s, u), b = n ? a || (r ? e : p || i) ? [] : o : v;
                if (n && n(v, b, s, u),
                i)
                    for (l = g(b, h),
                    i(l, [], s, u),
                    c = l.length; c--; )
                        (d = l[c]) && (b[h[c]] = !(v[h[c]] = d));
                if (r) {
                    if (a || e) {
                        if (a) {
                            for (l = [],
                            c = b.length; c--; )
                                (d = b[c]) && l.push(v[c] = d);
                            a(null , b = [], l, u)
                        }
                        for (c = b.length; c--; )
                            (d = b[c]) && (l = a ? ee(r, d) : f[c]) > -1 && (r[l] = !(o[l] = d))
                    }
                } else
                    b = g(b === o ? b.splice(p, b.length) : b),
                    a ? a(null , o, b, u) : Q.apply(o, b)
            })
        }
        function v(e) {
            for (var t, n, r, i = e.length, a = T.relative[e[0].type], o = a || T.relative[" "], s = a ? 1 : 0, u = h(function(e) {
                return e === t
            }, o, !0), l = h(function(e) {
                return ee(t, e) > -1
            }, o, !0), c = [function(e, n, r) {
                var i = !a && (r || n !== M) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                return t = null ,
                i
            }
            ]; i > s; s++)
                if (n = T.relative[e[s].type])
                    c = [h(p(c), n)];
                else {
                    if (n = T.filter[e[s].type].apply(null , e[s].matches),
                    n[$]) {
                        for (r = ++s; i > r && !T.relative[e[r].type]; r++)
                            ;
                        return y(s > 1 && p(c), s > 1 && f(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(ue, "$1"), n, r > s && v(e.slice(s, r)), i > r && v(e = e.slice(r)), i > r && f(e))
                    }
                    c.push(n)
                }
            return p(c)
        }
        function b(e, n) {
            var i = n.length > 0
              , a = e.length > 0
              , o = function(r, o, s, u, l) {
                var c, d, f, h = 0, p = "0", m = r && [], y = [], v = M, b = r || a && T.find.TAG("*", l), w = W += null == v ? 1 : Math.random() || .1, x = b.length;
                for (l && (M = o !== O && o); p !== x && null != (c = b[p]); p++) {
                    if (a && c) {
                        for (d = 0; f = e[d++]; )
                            if (f(c, o, s)) {
                                u.push(c);
                                break
                            }
                        l && (W = w)
                    }
                    i && ((c = !f && c) && h--,
                    r && m.push(c))
                }
                if (h += p,
                i && p !== h) {
                    for (d = 0; f = n[d++]; )
                        f(m, y, o, s);
                    if (r) {
                        if (h > 0)
                            for (; p--; )
                                m[p] || y[p] || (y[p] = Z.call(u));
                        y = g(y)
                    }
                    Q.apply(u, y),
                    l && !r && y.length > 0 && h + n.length > 1 && t.uniqueSort(u)
                }
                return l && (W = w,
                M = v),
                m
            }
            ;
            return i ? r(o) : o
        }
        var w, x, T, _, S, D, k, C, M, E, Y, P, O, N, A, F, I, L, H, $ = "sizzle" + 1 * new Date, j = e.document, W = 0, R = 0, V = n(), U = n(), X = n(), q = function(e, t) {
            return e === t && (Y = !0),
            0
        }
        , z = 1 << 31, G = {}.hasOwnProperty, B = [], Z = B.pop, J = B.push, Q = B.push, K = B.slice, ee = function(e, t) {
            for (var n = 0, r = e.length; r > n; n++)
                if (e[n] === t)
                    return n;
            return -1
        }
        , te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ie = re.replace("w", "w#"), ae = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]", oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ae + ")*)|.*)\\)|)", se = new RegExp(ne + "+","g"), ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$","g"), le = new RegExp("^" + ne + "*," + ne + "*"), ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]","g"), fe = new RegExp(oe), he = new RegExp("^" + ie + "$"), pe = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + ae),
            PSEUDO: new RegExp("^" + oe),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)","i"),
            bool: new RegExp("^(?:" + te + ")$","i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)","i")
        }, me = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, ye = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, be = /[+~]/, we = /'|\\/g, xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)","ig"), Te = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        }
        , _e = function() {
            P()
        }
        ;
        try {
            Q.apply(B = K.call(j.childNodes), j.childNodes),
            B[j.childNodes.length].nodeType
        } catch (Se) {
            Q = {
                apply: B.length ? function(e, t) {
                    J.apply(e, K.call(t))
                }
                : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; )
                        ;
                    e.length = n - 1
                }
            }
        }
        x = t.support = {},
        S = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }
        ,
        P = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : j;
            return r !== O && 9 === r.nodeType && r.documentElement ? (O = r,
            N = r.documentElement,
            n = r.defaultView,
            n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", _e, !1) : n.attachEvent && n.attachEvent("onunload", _e)),
            A = !S(r),
            x.attributes = i(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }),
            x.getElementsByTagName = i(function(e) {
                return e.appendChild(r.createComment("")),
                !e.getElementsByTagName("*").length
            }),
            x.getElementsByClassName = ye.test(r.getElementsByClassName),
            x.getById = i(function(e) {
                return N.appendChild(e).id = $,
                !r.getElementsByName || !r.getElementsByName($).length
            }),
            x.getById ? (T.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && A) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }
            ,
            T.filter.ID = function(e) {
                var t = e.replace(xe, Te);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }
            ) : (delete T.find.ID,
            T.filter.ID = function(e) {
                var t = e.replace(xe, Te);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }
            ),
            T.find.TAG = x.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : x.qsa ? t.querySelectorAll(e) : void 0
            }
            : function(e, t) {
                var n, r = [], i = 0, a = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = a[i++]; )
                        1 === n.nodeType && r.push(n);
                    return r
                }
                return a
            }
            ,
            T.find.CLASS = x.getElementsByClassName && function(e, t) {
                return A ? t.getElementsByClassName(e) : void 0
            }
            ,
            I = [],
            F = [],
            (x.qsa = ye.test(r.querySelectorAll)) && (i(function(e) {
                N.appendChild(e).innerHTML = "<a id='" + $ + "'></a><select id='" + $ + "-\f]' msallowcapture=''><option selected=''></option></select>",
                e.querySelectorAll("[msallowcapture^='']").length && F.push("[*^$]=" + ne + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || F.push("\\[" + ne + "*(?:value|" + te + ")"),
                e.querySelectorAll("[id~=" + $ + "-]").length || F.push("~="),
                e.querySelectorAll(":checked").length || F.push(":checked"),
                e.querySelectorAll("a#" + $ + "+*").length || F.push(".#.+[+~]")
            }),
            i(function(e) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && F.push("name" + ne + "*[*^$|!~]?="),
                e.querySelectorAll(":enabled").length || F.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                F.push(",.*:")
            })),
            (x.matchesSelector = ye.test(L = N.matches || N.webkitMatchesSelector || N.mozMatchesSelector || N.oMatchesSelector || N.msMatchesSelector)) && i(function(e) {
                x.disconnectedMatch = L.call(e, "div"),
                L.call(e, "[s!='']:x"),
                I.push("!=", oe)
            }),
            F = F.length && new RegExp(F.join("|")),
            I = I.length && new RegExp(I.join("|")),
            t = ye.test(N.compareDocumentPosition),
            H = t || ye.test(N.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            : function(e, t) {
                if (t)
                    for (; t = t.parentNode; )
                        if (t === e)
                            return !0;
                return !1
            }
            ,
            q = t ? function(e, t) {
                if (e === t)
                    return Y = !0,
                    0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1,
                1 & n || !x.sortDetached && t.compareDocumentPosition(e) === n ? e === r || e.ownerDocument === j && H(j, e) ? -1 : t === r || t.ownerDocument === j && H(j, t) ? 1 : E ? ee(E, e) - ee(E, t) : 0 : 4 & n ? -1 : 1)
            }
            : function(e, t) {
                if (e === t)
                    return Y = !0,
                    0;
                var n, i = 0, a = e.parentNode, s = t.parentNode, u = [e], l = [t];
                if (!a || !s)
                    return e === r ? -1 : t === r ? 1 : a ? -1 : s ? 1 : E ? ee(E, e) - ee(E, t) : 0;
                if (a === s)
                    return o(e, t);
                for (n = e; n = n.parentNode; )
                    u.unshift(n);
                for (n = t; n = n.parentNode; )
                    l.unshift(n);
                for (; u[i] === l[i]; )
                    i++;
                return i ? o(u[i], l[i]) : u[i] === j ? -1 : l[i] === j ? 1 : 0
            }
            ,
            r) : O
        }
        ,
        t.matches = function(e, n) {
            return t(e, null , null , n)
        }
        ,
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== O && P(e),
            n = n.replace(de, "='$1']"),
            !(!x.matchesSelector || !A || I && I.test(n) || F && F.test(n)))
                try {
                    var r = L.call(e, n);
                    if (r || x.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return r
                } catch (i) {}
            return t(n, O, null , [e]).length > 0
        }
        ,
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== O && P(e),
            H(e, t)
        }
        ,
        t.attr = function(e, t) {
            (e.ownerDocument || e) !== O && P(e);
            var n = T.attrHandle[t.toLowerCase()]
              , r = n && G.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !A) : void 0;
            return void 0 !== r ? r : x.attributes || !A ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }
        ,
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }
        ,
        t.uniqueSort = function(e) {
            var t, n = [], r = 0, i = 0;
            if (Y = !x.detectDuplicates,
            E = !x.sortStable && e.slice(0),
            e.sort(q),
            Y) {
                for (; t = e[i++]; )
                    t === e[i] && (r = n.push(i));
                for (; r--; )
                    e.splice(n[r], 1)
            }
            return E = null ,
            e
        }
        ,
        _ = t.getText = function(e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += _(e)
                } else if (3 === i || 4 === i)
                    return e.nodeValue
            } else
                for (; t = e[r++]; )
                    n += _(t);
            return n
        }
        ,
        T = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(xe, Te),
                    e[3] = (e[3] || e[4] || e[5] || "").replace(xe, Te),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = D(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                    e[2] = n.slice(0, t)),
                    e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(xe, Te).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    }
                    : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = V[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && V(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var a = t.attr(i, e);
                        return null == a ? "!=" === n : n ? (a += "",
                        "=" === n ? a === r : "!=" === n ? a !== r : "^=" === n ? r && 0 === a.indexOf(r) : "*=" === n ? r && a.indexOf(r) > -1 : "$=" === n ? r && a.slice(-r.length) === r : "~=" === n ? (" " + a.replace(se, " ") + " ").indexOf(r) > -1 : "|=" === n ? a === r || a.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var a = "nth" !== e.slice(0, 3)
                      , o = "last" !== e.slice(-4)
                      , s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    }
                    : function(t, n, u) {
                        var l, c, d, f, h, p, m = a !== o ? "nextSibling" : "previousSibling", g = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !u && !s;
                        if (g) {
                            if (a) {
                                for (; m; ) {
                                    for (d = t; d = d[m]; )
                                        if (s ? d.nodeName.toLowerCase() === y : 1 === d.nodeType)
                                            return !1;
                                    p = m = "only" === e && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [o ? g.firstChild : g.lastChild],
                            o && v) {
                                for (c = g[$] || (g[$] = {}),
                                l = c[e] || [],
                                h = l[0] === W && l[1],
                                f = l[0] === W && l[2],
                                d = h && g.childNodes[h]; d = ++h && d && d[m] || (f = h = 0) || p.pop(); )
                                    if (1 === d.nodeType && ++f && d === t) {
                                        c[e] = [W, h, f];
                                        break
                                    }
                            } else if (v && (l = (t[$] || (t[$] = {}))[e]) && l[0] === W)
                                f = l[1];
                            else
                                for (; (d = ++h && d && d[m] || (f = h = 0) || p.pop()) && ((s ? d.nodeName.toLowerCase() !== y : 1 !== d.nodeType) || !++f || (v && ((d[$] || (d[$] = {}))[e] = [W, f]),
                                d !== t)); )
                                    ;
                            return f -= i,
                            f === r || f % r === 0 && f / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, a = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return a[$] ? a(n) : a.length > 1 ? (i = [e, e, "", n],
                    T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = a(e, n), o = i.length; o--; )
                            r = ee(e, i[o]),
                            e[r] = !(t[r] = i[o])
                    }) : function(e) {
                        return a(e, 0, i)
                    }
                    ) : a
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = []
                      , n = []
                      , i = k(e.replace(ue, "$1"));
                    return i[$] ? r(function(e, t, n, r) {
                        for (var a, o = i(e, null , r, []), s = e.length; s--; )
                            (a = o[s]) && (e[s] = !(t[s] = a))
                    }) : function(e, r, a) {
                        return t[0] = e,
                        i(t, null , a, n),
                        t[0] = null ,
                        !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(xe, Te),
                    function(t) {
                        return (t.textContent || t.innerText || _(t)).indexOf(e) > -1
                    }
                }),
                lang: r(function(e) {
                    return he.test(e || "") || t.error("unsupported lang: " + e),
                    e = e.replace(xe, Te).toLowerCase(),
                    function(t) {
                        var n;
                        do
                            if (n = A ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                return n = n.toLowerCase(),
                                n === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === N
                },
                focus: function(e) {
                    return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !T.pseudos.empty(e)
                },
                header: function(e) {
                    return ge.test(e.nodeName)
                },
                input: function(e) {
                    return me.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(e, t) {
                    return [t - 1]
                }),
                eq: l(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: l(function(e, t) {
                    for (var n = 0; t > n; n += 2)
                        e.push(n);
                    return e
                }),
                odd: l(function(e, t) {
                    for (var n = 1; t > n; n += 2)
                        e.push(n);
                    return e
                }),
                lt: l(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0; )
                        e.push(r);
                    return e
                }),
                gt: l(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t; )
                        e.push(r);
                    return e
                })
            }
        },
        T.pseudos.nth = T.pseudos.eq;
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            T.pseudos[w] = s(w);
        for (w in {
            submit: !0,
            reset: !0
        })
            T.pseudos[w] = u(w);
        return d.prototype = T.filters = T.pseudos,
        T.setFilters = new d,
        D = t.tokenize = function(e, n) {
            var r, i, a, o, s, u, l, c = U[e + " "];
            if (c)
                return n ? 0 : c.slice(0);
            for (s = e,
            u = [],
            l = T.preFilter; s; ) {
                (!r || (i = le.exec(s))) && (i && (s = s.slice(i[0].length) || s),
                u.push(a = [])),
                r = !1,
                (i = ce.exec(s)) && (r = i.shift(),
                a.push({
                    value: r,
                    type: i[0].replace(ue, " ")
                }),
                s = s.slice(r.length));
                for (o in T.filter)
                    !(i = pe[o].exec(s)) || l[o] && !(i = l[o](i)) || (r = i.shift(),
                    a.push({
                        value: r,
                        type: o,
                        matches: i
                    }),
                    s = s.slice(r.length));
                if (!r)
                    break
            }
            return n ? s.length : s ? t.error(e) : U(e, u).slice(0)
        }
        ,
        k = t.compile = function(e, t) {
            var n, r = [], i = [], a = X[e + " "];
            if (!a) {
                for (t || (t = D(e)),
                n = t.length; n--; )
                    a = v(t[n]),
                    a[$] ? r.push(a) : i.push(a);
                a = X(e, b(i, r)),
                a.selector = e
            }
            return a
        }
        ,
        C = t.select = function(e, t, n, r) {
            var i, a, o, s, u, l = "function" == typeof e && e, d = !r && D(e = l.selector || e);
            if (n = n || [],
            1 === d.length) {
                if (a = d[0] = d[0].slice(0),
                a.length > 2 && "ID" === (o = a[0]).type && x.getById && 9 === t.nodeType && A && T.relative[a[1].type]) {
                    if (t = (T.find.ID(o.matches[0].replace(xe, Te), t) || [])[0],
                    !t)
                        return n;
                    l && (t = t.parentNode),
                    e = e.slice(a.shift().value.length)
                }
                for (i = pe.needsContext.test(e) ? 0 : a.length; i-- && (o = a[i],
                !T.relative[s = o.type]); )
                    if ((u = T.find[s]) && (r = u(o.matches[0].replace(xe, Te), be.test(a[0].type) && c(t.parentNode) || t))) {
                        if (a.splice(i, 1),
                        e = r.length && f(a),
                        !e)
                            return Q.apply(n, r),
                            n;
                        break
                    }
            }
            return (l || k(e, d))(r, t, !A, n, be.test(e) && c(t.parentNode) || t),
            n
        }
        ,
        x.sortStable = $.split("").sort(q).join("") === $,
        x.detectDuplicates = !!Y,
        P(),
        x.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(O.createElement("div"))
        }),
        i(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || a("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        x.attributes && i(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || a("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }),
        i(function(e) {
            return null == e.getAttribute("disabled")
        }) || a(te, function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }),
        t
    }(e);
    ie.find = le,
    ie.expr = le.selectors,
    ie.expr[":"] = ie.expr.pseudos,
    ie.unique = le.uniqueSort,
    ie.text = le.getText,
    ie.isXMLDoc = le.isXML,
    ie.contains = le.contains;
    var ce = ie.expr.match.needsContext
      , de = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
      , fe = /^.[^:#\[\.,]*$/;
    ie.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === r.nodeType ? ie.find.matchesSelector(r, e) ? [r] : [] : ie.find.matches(e, ie.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }
    ,
    ie.fn.extend({
        find: function(e) {
            var t, n = [], r = this, i = r.length;
            if ("string" != typeof e)
                return this.pushStack(ie(e).filter(function() {
                    for (t = 0; i > t; t++)
                        if (ie.contains(r[t], this))
                            return !0
                }));
            for (t = 0; i > t; t++)
                ie.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? ie.unique(n) : n),
            n.selector = this.selector ? this.selector + " " + e : e,
            n
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0))
        },
        is: function(e) {
            return !!r(this, "string" == typeof e && ce.test(e) ? ie(e) : e || [], !1).length
        }
    });
    var he, pe = e.document, me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ge = ie.fn.init = function(e, t) {
        var n, r;
        if (!e)
            return this;
        if ("string" == typeof e) {
            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null , e, null ] : me.exec(e),
            !n || !n[1] && t)
                return !t || t.jquery ? (t || he).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof ie ? t[0] : t,
                ie.merge(this, ie.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : pe, !0)),
                de.test(n[1]) && ie.isPlainObject(t))
                    for (n in t)
                        ie.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if (r = pe.getElementById(n[2]),
            r && r.parentNode) {
                if (r.id !== n[2])
                    return he.find(e);
                this.length = 1,
                this[0] = r
            }
            return this.context = pe,
            this.selector = e,
            this
        }
        return e.nodeType ? (this.context = this[0] = e,
        this.length = 1,
        this) : ie.isFunction(e) ? "undefined" != typeof he.ready ? he.ready(e) : e(ie) : (void 0 !== e.selector && (this.selector = e.selector,
        this.context = e.context),
        ie.makeArray(e, this))
    }
    ;
    ge.prototype = ie.fn,
    he = ie(pe);
    var ye = /^(?:parents|prev(?:Until|All))/
      , ve = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    ie.extend({
        dir: function(e, t, n) {
            for (var r = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !ie(i).is(n)); )
                1 === i.nodeType && r.push(i),
                i = i[t];
            return r
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }),
    ie.fn.extend({
        has: function(e) {
            var t, n = ie(e, this), r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++)
                    if (ie.contains(this, n[t]))
                        return !0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, a = [], o = ce.test(e) || "string" != typeof e ? ie(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : 1 === n.nodeType && ie.find.matchesSelector(n, e))) {
                        a.push(n);
                        break
                    }
            return this.pushStack(a.length > 1 ? ie.unique(a) : a)
        },
        index: function(e) {
            return e ? "string" == typeof e ? ie.inArray(this[0], ie(e)) : ie.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(ie.unique(ie.merge(this.get(), ie(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
    ie.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return ie.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return ie.dir(e, "parentNode", n)
        },
        next: function(e) {
            return i(e, "nextSibling")
        },
        prev: function(e) {
            return i(e, "previousSibling")
        },
        nextAll: function(e) {
            return ie.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return ie.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return ie.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return ie.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return ie.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return ie.sibling(e.firstChild)
        },
        contents: function(e) {
            return ie.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ie.merge([], e.childNodes)
        }
    }, function(e, t) {
        ie.fn[e] = function(n, r) {
            var i = ie.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n),
            r && "string" == typeof r && (i = ie.filter(r, i)),
            this.length > 1 && (ve[e] || (i = ie.unique(i)),
            ye.test(e) && (i = i.reverse())),
            this.pushStack(i)
        }
    });
    var be = /\S+/g
      , we = {};
    ie.Callbacks = function(e) {
        e = "string" == typeof e ? we[e] || a(e) : ie.extend({}, e);
        var t, n, r, i, o, s, u = [], l = !e.once && [], c = function(a) {
            for (n = e.memory && a,
            r = !0,
            o = s || 0,
            s = 0,
            i = u.length,
            t = !0; u && i > o; o++)
                if (u[o].apply(a[0], a[1]) === !1 && e.stopOnFalse) {
                    n = !1;
                    break
                }
            t = !1,
            u && (l ? l.length && c(l.shift()) : n ? u = [] : d.disable())
        }
        , d = {
            add: function() {
                if (u) {
                    var r = u.length;
                    !function a(t) {
                        ie.each(t, function(t, n) {
                            var r = ie.type(n);
                            "function" === r ? e.unique && d.has(n) || u.push(n) : n && n.length && "string" !== r && a(n)
                        })
                    }(arguments),
                    t ? i = u.length : n && (s = r,
                    c(n))
                }
                return this
            },
            remove: function() {
                return u && ie.each(arguments, function(e, n) {
                    for (var r; (r = ie.inArray(n, u, r)) > -1; )
                        u.splice(r, 1),
                        t && (i >= r && i--,
                        o >= r && o--)
                }),
                this
            },
            has: function(e) {
                return e ? ie.inArray(e, u) > -1 : !(!u || !u.length)
            },
            empty: function() {
                return u = [],
                i = 0,
                this
            },
            disable: function() {
                return u = l = n = void 0,
                this
            },
            disabled: function() {
                return !u
            },
            lock: function() {
                return l = void 0,
                n || d.disable(),
                this
            },
            locked: function() {
                return !l
            },
            fireWith: function(e, n) {
                return !u || r && !l || (n = n || [],
                n = [e, n.slice ? n.slice() : n],
                t ? l.push(n) : c(n)),
                this
            },
            fire: function() {
                return d.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!r
            }
        };
        return d
    }
    ,
    ie.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", ie.Callbacks("once memory"), "resolved"], ["reject", "fail", ie.Callbacks("once memory"), "rejected"], ["notify", "progress", ie.Callbacks("memory")]]
              , n = "pending"
              , r = {
                state: function() {
                    return n
                },
                always: function() {
                    return i.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return ie.Deferred(function(n) {
                        ie.each(t, function(t, a) {
                            var o = ie.isFunction(e[t]) && e[t];
                            i[a[1]](function() {
                                var e = o && o.apply(this, arguments);
                                e && ie.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? ie.extend(e, r) : r
                }
            }
              , i = {};
            return r.pipe = r.then,
            ie.each(t, function(e, a) {
                var o = a[2]
                  , s = a[3];
                r[a[1]] = o.add,
                s && o.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock),
                i[a[0]] = function() {
                    return i[a[0] + "With"](this === i ? r : this, arguments),
                    this
                }
                ,
                i[a[0] + "With"] = o.fireWith
            }),
            r.promise(i),
            e && e.call(i, i),
            i
        },
        when: function(e) {
            var t, n, r, i = 0, a = B.call(arguments), o = a.length, s = 1 !== o || e && ie.isFunction(e.promise) ? o : 0, u = 1 === s ? e : ie.Deferred(), l = function(e, n, r) {
                return function(i) {
                    n[e] = this,
                    r[e] = arguments.length > 1 ? B.call(arguments) : i,
                    r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                }
            }
            ;
            if (o > 1)
                for (t = new Array(o),
                n = new Array(o),
                r = new Array(o); o > i; i++)
                    a[i] && ie.isFunction(a[i].promise) ? a[i].promise().done(l(i, r, a)).fail(u.reject).progress(l(i, n, t)) : --s;
            return s || u.resolveWith(r, a),
            u.promise()
        }
    });
    var xe;
    ie.fn.ready = function(e) {
        return ie.ready.promise().done(e),
        this
    }
    ,
    ie.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? ie.readyWait++ : ie.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--ie.readyWait : !ie.isReady) {
                if (!pe.body)
                    return setTimeout(ie.ready);
                ie.isReady = !0,
                e !== !0 && --ie.readyWait > 0 || (xe.resolveWith(pe, [ie]),
                ie.fn.triggerHandler && (ie(pe).triggerHandler("ready"),
                ie(pe).off("ready")))
            }
        }
    }),
    ie.ready.promise = function(t) {
        if (!xe)
            if (xe = ie.Deferred(),
            "complete" === pe.readyState)
                setTimeout(ie.ready);
            else if (pe.addEventListener)
                pe.addEventListener("DOMContentLoaded", s, !1),
                e.addEventListener("load", s, !1);
            else {
                pe.attachEvent("onreadystatechange", s),
                e.attachEvent("onload", s);
                var n = !1;
                try {
                    n = null == e.frameElement && pe.documentElement
                } catch (r) {}
                n && n.doScroll && !function i() {
                    if (!ie.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(i, 50)
                        }
                        o(),
                        ie.ready()
                    }
                }()
            }
        return xe.promise(t)
    }
    ;
    var Te, _e = "undefined";
    for (Te in ie(ne))
        break;
    ne.ownLast = "0" !== Te,
    ne.inlineBlockNeedsLayout = !1,
    ie(function() {
        var e, t, n, r;
        n = pe.getElementsByTagName("body")[0],
        n && n.style && (t = pe.createElement("div"),
        r = pe.createElement("div"),
        r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
        n.appendChild(r).appendChild(t),
        typeof t.style.zoom !== _e && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
        ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth,
        e && (n.style.zoom = 1)),
        n.removeChild(r))
    }),
    function() {
        var e = pe.createElement("div");
        if (null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                ne.deleteExpando = !1
            }
        }
        e = null
    }(),
    ie.acceptData = function(e) {
        var t = ie.noData[(e.nodeName + " ").toLowerCase()]
          , n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    }
    ;
    var Se = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , De = /([A-Z])/g;
    ie.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? ie.cache[e[ie.expando]] : e[ie.expando],
            !!e && !l(e)
        },
        data: function(e, t, n) {
            return c(e, t, n)
        },
        removeData: function(e, t) {
            return d(e, t)
        },
        _data: function(e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return d(e, t, !0)
        }
    }),
    ie.fn.extend({
        data: function(e, t) {
            var n, r, i, a = this[0], o = a && a.attributes;
            if (void 0 === e) {
                if (this.length && (i = ie.data(a),
                1 === a.nodeType && !ie._data(a, "parsedAttrs"))) {
                    for (n = o.length; n--; )
                        o[n] && (r = o[n].name,
                        0 === r.indexOf("data-") && (r = ie.camelCase(r.slice(5)),
                        u(a, r, i[r])));
                    ie._data(a, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                ie.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                ie.data(this, e, t)
            }) : a ? u(a, e, ie.data(a, e)) : void 0
        },
        removeData: function(e) {
            return this.each(function() {
                ie.removeData(this, e)
            })
        }
    }),
    ie.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue",
            r = ie._data(e, t),
            n && (!r || ie.isArray(n) ? r = ie._data(e, t, ie.makeArray(n)) : r.push(n)),
            r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = ie.queue(e, t)
              , r = n.length
              , i = n.shift()
              , a = ie._queueHooks(e, t)
              , o = function() {
                ie.dequeue(e, t)
            }
            ;
            "inprogress" === i && (i = n.shift(),
            r--),
            i && ("fx" === t && n.unshift("inprogress"),
            delete a.stop,
            i.call(e, o, a)),
            !r && a && a.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ie._data(e, n) || ie._data(e, n, {
                empty: ie.Callbacks("once memory").add(function() {
                    ie._removeData(e, t + "queue"),
                    ie._removeData(e, n)
                })
            })
        }
    }),
    ie.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e,
            e = "fx",
            n--),
            arguments.length < n ? ie.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = ie.queue(this, e, t);
                ie._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && ie.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                ie.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1, i = ie.Deferred(), a = this, o = this.length, s = function() {
                --r || i.resolveWith(a, [a])
            }
            ;
            for ("string" != typeof e && (t = e,
            e = void 0),
            e = e || "fx"; o--; )
                n = ie._data(a[o], e + "queueHooks"),
                n && n.empty && (r++,
                n.empty.add(s));
            return s(),
            i.promise(t)
        }
    });
    var ke = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , Ce = ["Top", "Right", "Bottom", "Left"]
      , Me = function(e, t) {
        return e = t || e,
        "none" === ie.css(e, "display") || !ie.contains(e.ownerDocument, e)
    }
      , Ee = ie.access = function(e, t, n, r, i, a, o) {
        var s = 0
          , u = e.length
          , l = null == n;
        if ("object" === ie.type(n)) {
            i = !0;
            for (s in n)
                ie.access(e, t, s, n[s], !0, a, o)
        } else if (void 0 !== r && (i = !0,
        ie.isFunction(r) || (o = !0),
        l && (o ? (t.call(e, r),
        t = null ) : (l = t,
        t = function(e, t, n) {
            return l.call(ie(e), n)
        }
        )),
        t))
            for (; u > s; s++)
                t(e[s], n, o ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : l ? t.call(e) : u ? t(e[0], n) : a
    }
      , Ye = /^(?:checkbox|radio)$/i;
    !function() {
        var e = pe.createElement("input")
          , t = pe.createElement("div")
          , n = pe.createDocumentFragment();
        if (t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        ne.leadingWhitespace = 3 === t.firstChild.nodeType,
        ne.tbody = !t.getElementsByTagName("tbody").length,
        ne.htmlSerialize = !!t.getElementsByTagName("link").length,
        ne.html5Clone = "<:nav></:nav>" !== pe.createElement("nav").cloneNode(!0).outerHTML,
        e.type = "checkbox",
        e.checked = !0,
        n.appendChild(e),
        ne.appendChecked = e.checked,
        t.innerHTML = "<textarea>x</textarea>",
        ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue,
        n.appendChild(t),
        t.innerHTML = "<input type='radio' checked='checked' name='t'/>",
        ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked,
        ne.noCloneEvent = !0,
        t.attachEvent && (t.attachEvent("onclick", function() {
            ne.noCloneEvent = !1
        }),
        t.cloneNode(!0).click()),
        null == ne.deleteExpando) {
            ne.deleteExpando = !0;
            try {
                delete t.test
            } catch (r) {
                ne.deleteExpando = !1
            }
        }
    }(),
    function() {
        var t, n, r = pe.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            n = "on" + t,
            (ne[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"),
            ne[t + "Bubbles"] = r.attributes[n].expando === !1);
        r = null
    }();
    var Pe = /^(?:input|select|textarea)$/i
      , Oe = /^key/
      , Ne = /^(?:mouse|pointer|contextmenu)|click/
      , Ae = /^(?:focusinfocus|focusoutblur)$/
      , Fe = /^([^.]*)(?:\.(.+)|)$/;
    ie.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var a, o, s, u, l, c, d, f, h, p, m, g = ie._data(e);
            if (g) {
                for (n.handler && (u = n,
                n = u.handler,
                i = u.selector),
                n.guid || (n.guid = ie.guid++),
                (o = g.events) || (o = g.events = {}),
                (c = g.handle) || (c = g.handle = function(e) {
                    return typeof ie === _e || e && ie.event.triggered === e.type ? void 0 : ie.event.dispatch.apply(c.elem, arguments)
                }
                ,
                c.elem = e),
                t = (t || "").match(be) || [""],
                s = t.length; s--; )
                    a = Fe.exec(t[s]) || [],
                    h = m = a[1],
                    p = (a[2] || "").split(".").sort(),
                    h && (l = ie.event.special[h] || {},
                    h = (i ? l.delegateType : l.bindType) || h,
                    l = ie.event.special[h] || {},
                    d = ie.extend({
                        type: h,
                        origType: m,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && ie.expr.match.needsContext.test(i),
                        namespace: p.join(".")
                    }, u),
                    (f = o[h]) || (f = o[h] = [],
                    f.delegateCount = 0,
                    l.setup && l.setup.call(e, r, p, c) !== !1 || (e.addEventListener ? e.addEventListener(h, c, !1) : e.attachEvent && e.attachEvent("on" + h, c))),
                    l.add && (l.add.call(e, d),
                    d.handler.guid || (d.handler.guid = n.guid)),
                    i ? f.splice(f.delegateCount++, 0, d) : f.push(d),
                    ie.event.global[h] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var a, o, s, u, l, c, d, f, h, p, m, g = ie.hasData(e) && ie._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(be) || [""],
                l = t.length; l--; )
                    if (s = Fe.exec(t[l]) || [],
                    h = m = s[1],
                    p = (s[2] || "").split(".").sort(),
                    h) {
                        for (d = ie.event.special[h] || {},
                        h = (r ? d.delegateType : d.bindType) || h,
                        f = c[h] || [],
                        s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        u = a = f.length; a--; )
                            o = f[a],
                            !i && m !== o.origType || n && n.guid !== o.guid || s && !s.test(o.namespace) || r && r !== o.selector && ("**" !== r || !o.selector) || (f.splice(a, 1),
                            o.selector && f.delegateCount--,
                            d.remove && d.remove.call(e, o));
                        u && !f.length && (d.teardown && d.teardown.call(e, p, g.handle) !== !1 || ie.removeEvent(e, h, g.handle),
                        delete c[h])
                    } else
                        for (h in c)
                            ie.event.remove(e, h + t[l], n, r, !0);
                ie.isEmptyObject(c) && (delete g.handle,
                ie._removeData(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var a, o, s, u, l, c, d, f = [r || pe], h = te.call(t, "type") ? t.type : t, p = te.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = r = r || pe,
            3 !== r.nodeType && 8 !== r.nodeType && !Ae.test(h + ie.event.triggered) && (h.indexOf(".") >= 0 && (p = h.split("."),
            h = p.shift(),
            p.sort()),
            o = h.indexOf(":") < 0 && "on" + h,
            t = t[ie.expando] ? t : new ie.Event(h,"object" == typeof t && t),
            t.isTrigger = i ? 2 : 3,
            t.namespace = p.join("."),
            t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
            t.result = void 0,
            t.target || (t.target = r),
            n = null == n ? [t] : ie.makeArray(n, [t]),
            l = ie.event.special[h] || {},
            i || !l.trigger || l.trigger.apply(r, n) !== !1)) {
                if (!i && !l.noBubble && !ie.isWindow(r)) {
                    for (u = l.delegateType || h,
                    Ae.test(u + h) || (s = s.parentNode); s; s = s.parentNode)
                        f.push(s),
                        c = s;
                    c === (r.ownerDocument || pe) && f.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0; (s = f[d++]) && !t.isPropagationStopped(); )
                    t.type = d > 1 ? u : l.bindType || h,
                    a = (ie._data(s, "events") || {})[t.type] && ie._data(s, "handle"),
                    a && a.apply(s, n),
                    a = o && s[o],
                    a && a.apply && ie.acceptData(s) && (t.result = a.apply(s, n),
                    t.result === !1 && t.preventDefault());
                if (t.type = h,
                !i && !t.isDefaultPrevented() && (!l._default || l._default.apply(f.pop(), n) === !1) && ie.acceptData(r) && o && r[h] && !ie.isWindow(r)) {
                    c = r[o],
                    c && (r[o] = null ),
                    ie.event.triggered = h;
                    try {
                        r[h]()
                    } catch (m) {}
                    ie.event.triggered = void 0,
                    c && (r[o] = c)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = ie.event.fix(e);
            var t, n, r, i, a, o = [], s = B.call(arguments), u = (ie._data(this, "events") || {})[e.type] || [], l = ie.event.special[e.type] || {};
            if (s[0] = e,
            e.delegateTarget = this,
            !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (o = ie.event.handlers.call(this, e, u),
                t = 0; (i = o[t++]) && !e.isPropagationStopped(); )
                    for (e.currentTarget = i.elem,
                    a = 0; (r = i.handlers[a++]) && !e.isImmediatePropagationStopped(); )
                        (!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r,
                        e.data = r.data,
                        n = ((ie.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, s),
                        void 0 !== n && (e.result = n) === !1 && (e.preventDefault(),
                        e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e),
                e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, a, o = [], s = t.delegateCount, u = e.target;
            if (s && u.nodeType && (!e.button || "click" !== e.type))
                for (; u != this; u = u.parentNode || this)
                    if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                        for (i = [],
                        a = 0; s > a; a++)
                            r = t[a],
                            n = r.selector + " ",
                            void 0 === i[n] && (i[n] = r.needsContext ? ie(n, this).index(u) >= 0 : ie.find(n, this, null , [u]).length),
                            i[n] && i.push(r);
                        i.length && o.push({
                            elem: u,
                            handlers: i
                        })
                    }
            return s < t.length && o.push({
                elem: this,
                handlers: t.slice(s)
            }),
            o
        },
        fix: function(e) {
            if (e[ie.expando])
                return e;
            var t, n, r, i = e.type, a = e, o = this.fixHooks[i];
            for (o || (this.fixHooks[i] = o = Ne.test(i) ? this.mouseHooks : Oe.test(i) ? this.keyHooks : {}),
            r = o.props ? this.props.concat(o.props) : this.props,
            e = new ie.Event(a),
            t = r.length; t--; )
                n = r[t],
                e[n] = a[n];
            return e.target || (e.target = a.srcElement || pe),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            o.filter ? o.filter(e, a) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, a = t.button, o = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || pe,
                i = r.documentElement,
                n = r.body,
                e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0),
                e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)),
                !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o),
                e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0),
                e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== p() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === p() && this.blur ? (this.blur(),
                    !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return ie.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                    !1) : void 0
                },
                _default: function(e) {
                    return ie.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = ie.extend(new ie.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? ie.event.trigger(i, null , t) : ie.event.dispatch.call(t, i),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    ie.removeEvent = pe.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }
    : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === _e && (e[r] = null ),
        e.detachEvent(r, n))
    }
    ,
    ie.Event = function(e, t) {
        return this instanceof ie.Event ? (e && e.type ? (this.originalEvent = e,
        this.type = e.type,
        this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? f : h) : this.type = e,
        t && ie.extend(this, t),
        this.timeStamp = e && e.timeStamp || ie.now(),
        void (this[ie.expando] = !0)) : new ie.Event(e,t)
    }
    ,
    ie.Event.prototype = {
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = f,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = f,
            e && (e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = f,
            e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    ie.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        ie.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this, i = e.relatedTarget, a = e.handleObj;
                return (!i || i !== r && !ie.contains(r, i)) && (e.type = a.origType,
                n = a.handler.apply(this, arguments),
                e.type = t),
                n
            }
        }
    }),
    ne.submitBubbles || (ie.event.special.submit = {
        setup: function() {
            return ie.nodeName(this, "form") ? !1 : void ie.event.add(this, "click._submit keypress._submit", function(e) {
                var t = e.target
                  , n = ie.nodeName(t, "input") || ie.nodeName(t, "button") ? t.form : void 0;
                n && !ie._data(n, "submitBubbles") && (ie.event.add(n, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }),
                ie._data(n, "submitBubbles", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble,
            this.parentNode && !e.isTrigger && ie.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return ie.nodeName(this, "form") ? !1 : void ie.event.remove(this, "._submit")
        }
    }),
    ne.changeBubbles || (ie.event.special.change = {
        setup: function() {
            return Pe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ie.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }),
            ie.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1),
                ie.event.simulate("change", this, e, !0)
            })),
            !1) : void ie.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Pe.test(t.nodeName) && !ie._data(t, "changeBubbles") && (ie.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ie.event.simulate("change", this.parentNode, e, !0)
                }),
                ie._data(t, "changeBubbles", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return ie.event.remove(this, "._change"),
            !Pe.test(this.nodeName)
        }
    }),
    ne.focusinBubbles || ie.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            ie.event.simulate(t, e.target, ie.event.fix(e), !0)
        }
        ;
        ie.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this
                  , i = ie._data(r, t);
                i || r.addEventListener(e, n, !0),
                ie._data(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this
                  , i = ie._data(r, t) - 1;
                i ? ie._data(r, t, i) : (r.removeEventListener(e, n, !0),
                ie._removeData(r, t))
            }
        }
    }),
    ie.fn.extend({
        on: function(e, t, n, r, i) {
            var a, o;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t,
                t = void 0);
                for (a in e)
                    this.on(a, t, n, e[a], i);
                return this
            }
            if (null == n && null == r ? (r = t,
            n = t = void 0) : null == r && ("string" == typeof t ? (r = n,
            n = void 0) : (r = n,
            n = t,
            t = void 0)),
            r === !1)
                r = h;
            else if (!r)
                return this;
            return 1 === i && (o = r,
            r = function(e) {
                return ie().off(e),
                o.apply(this, arguments)
            }
            ,
            r.guid = o.guid || (o.guid = ie.guid++)),
            this.each(function() {
                ie.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj,
                ie(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                this;
            if ("object" == typeof e) {
                for (i in e)
                    this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t,
            t = void 0),
            n === !1 && (n = h),
            this.each(function() {
                ie.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                ie.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? ie.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Ie = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , Le = / jQuery\d+="(?:null|\d+)"/g
      , He = new RegExp("<(?:" + Ie + ")[\\s/>]","i")
      , $e = /^\s+/
      , je = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , We = /<([\w:]+)/
      , Re = /<tbody/i
      , Ve = /<|&#?\w+;/
      , Ue = /<(?:script|style|link)/i
      , Xe = /checked\s*(?:[^=]|=\s*.checked.)/i
      , qe = /^$|\/(?:java|ecma)script/i
      , ze = /^true\/(.*)/
      , Ge = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , Be = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }
      , Ze = m(pe)
      , Je = Ze.appendChild(pe.createElement("div"));
    Be.optgroup = Be.option,
    Be.tbody = Be.tfoot = Be.colgroup = Be.caption = Be.thead,
    Be.th = Be.td,
    ie.extend({
        clone: function(e, t, n) {
            var r, i, a, o, s, u = ie.contains(e.ownerDocument, e);
            if (ne.html5Clone || ie.isXMLDoc(e) || !He.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (Je.innerHTML = e.outerHTML,
            Je.removeChild(a = Je.firstChild)),
            !(ne.noCloneEvent && ne.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ie.isXMLDoc(e)))
                for (r = g(a),
                s = g(e),
                o = 0; null != (i = s[o]); ++o)
                    r[o] && _(i, r[o]);
            if (t)
                if (n)
                    for (s = s || g(e),
                    r = r || g(a),
                    o = 0; null != (i = s[o]); o++)
                        T(i, r[o]);
                else
                    T(e, a);
            return r = g(a, "script"),
            r.length > 0 && x(r, !u && g(e, "script")),
            r = s = i = null ,
            a
        },
        buildFragment: function(e, t, n, r) {
            for (var i, a, o, s, u, l, c, d = e.length, f = m(t), h = [], p = 0; d > p; p++)
                if (a = e[p],
                a || 0 === a)
                    if ("object" === ie.type(a))
                        ie.merge(h, a.nodeType ? [a] : a);
                    else if (Ve.test(a)) {
                        for (s = s || f.appendChild(t.createElement("div")),
                        u = (We.exec(a) || ["", ""])[1].toLowerCase(),
                        c = Be[u] || Be._default,
                        s.innerHTML = c[1] + a.replace(je, "<$1></$2>") + c[2],
                        i = c[0]; i--; )
                            s = s.lastChild;
                        if (!ne.leadingWhitespace && $e.test(a) && h.push(t.createTextNode($e.exec(a)[0])),
                        !ne.tbody)
                            for (a = "table" !== u || Re.test(a) ? "<table>" !== c[1] || Re.test(a) ? 0 : s : s.firstChild,
                            i = a && a.childNodes.length; i--; )
                                ie.nodeName(l = a.childNodes[i], "tbody") && !l.childNodes.length && a.removeChild(l);
                        for (ie.merge(h, s.childNodes),
                        s.textContent = ""; s.firstChild; )
                            s.removeChild(s.firstChild);
                        s = f.lastChild
                    } else
                        h.push(t.createTextNode(a));
            for (s && f.removeChild(s),
            ne.appendChecked || ie.grep(g(h, "input"), y),
            p = 0; a = h[p++]; )
                if ((!r || -1 === ie.inArray(a, r)) && (o = ie.contains(a.ownerDocument, a),
                s = g(f.appendChild(a), "script"),
                o && x(s),
                n))
                    for (i = 0; a = s[i++]; )
                        qe.test(a.type || "") && n.push(a);
            return s = null ,
            f
        },
        cleanData: function(e, t) {
            for (var n, r, i, a, o = 0, s = ie.expando, u = ie.cache, l = ne.deleteExpando, c = ie.event.special; null != (n = e[o]); o++)
                if ((t || ie.acceptData(n)) && (i = n[s],
                a = i && u[i])) {
                    if (a.events)
                        for (r in a.events)
                            c[r] ? ie.event.remove(n, r) : ie.removeEvent(n, r, a.handle);
                    u[i] && (delete u[i],
                    l ? delete n[s] : typeof n.removeAttribute !== _e ? n.removeAttribute(s) : n[s] = null ,
                    G.push(i))
                }
        }
    }),
    ie.fn.extend({
        text: function(e) {
            return Ee(this, function(e) {
                return void 0 === e ? ie.text(this) : this.empty().append((this[0] && this[0].ownerDocument || pe).createTextNode(e))
            }, null , e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? ie.filter(e, this) : this, i = 0; null != (n = r[i]); i++)
                t || 1 !== n.nodeType || ie.cleanData(g(n)),
                n.parentNode && (t && ie.contains(n.ownerDocument, n) && x(g(n, "script")),
                n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ie.cleanData(g(e, !1)); e.firstChild; )
                    e.removeChild(e.firstChild);
                e.options && ie.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e,
            t = null == t ? e : t,
            this.map(function() {
                return ie.clone(this, e, t)
            })
        },
        html: function(e) {
            return Ee(this, function(e) {
                var t = this[0] || {}
                  , n = 0
                  , r = this.length;
                if (void 0 === e)
                    return 1 === t.nodeType ? t.innerHTML.replace(Le, "") : void 0;
                if (!("string" != typeof e || Ue.test(e) || !ne.htmlSerialize && He.test(e) || !ne.leadingWhitespace && $e.test(e) || Be[(We.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(je, "<$1></$2>");
                    try {
                        for (; r > n; n++)
                            t = this[n] || {},
                            1 === t.nodeType && (ie.cleanData(g(t, !1)),
                            t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null , e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode,
                ie.cleanData(g(this)),
                e && e.replaceChild(t, this)
            }),
            e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = Z.apply([], e);
            var n, r, i, a, o, s, u = 0, l = this.length, c = this, d = l - 1, f = e[0], h = ie.isFunction(f);
            if (h || l > 1 && "string" == typeof f && !ne.checkClone && Xe.test(f))
                return this.each(function(n) {
                    var r = c.eq(n);
                    h && (e[0] = f.call(this, n, r.html())),
                    r.domManip(e, t)
                });
            if (l && (s = ie.buildFragment(e, this[0].ownerDocument, !1, this),
            n = s.firstChild,
            1 === s.childNodes.length && (s = n),
            n)) {
                for (a = ie.map(g(s, "script"), b),
                i = a.length; l > u; u++)
                    r = s,
                    u !== d && (r = ie.clone(r, !0, !0),
                    i && ie.merge(a, g(r, "script"))),
                    t.call(this[u], r, u);
                if (i)
                    for (o = a[a.length - 1].ownerDocument,
                    ie.map(a, w),
                    u = 0; i > u; u++)
                        r = a[u],
                        qe.test(r.type || "") && !ie._data(r, "globalEval") && ie.contains(o, r) && (r.src ? ie._evalUrl && ie._evalUrl(r.src) : ie.globalEval((r.text || r.textContent || r.innerHTML || "").replace(Ge, "")));
                s = n = null
            }
            return this
        }
    }),
    ie.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        ie.fn[e] = function(e) {
            for (var n, r = 0, i = [], a = ie(e), o = a.length - 1; o >= r; r++)
                n = r === o ? this : this.clone(!0),
                ie(a[r])[t](n),
                J.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Qe, Ke = {};
    !function() {
        var e;
        ne.shrinkWrapBlocks = function() {
            if (null != e)
                return e;
            e = !1;
            var t, n, r;
            return n = pe.getElementsByTagName("body")[0],
            n && n.style ? (t = pe.createElement("div"),
            r = pe.createElement("div"),
            r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            n.appendChild(r).appendChild(t),
            typeof t.style.zoom !== _e && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
            t.appendChild(pe.createElement("div")).style.width = "5px",
            e = 3 !== t.offsetWidth),
            n.removeChild(r),
            e) : void 0
        }
    }();
    var et, tt, nt = /^margin/, rt = new RegExp("^(" + ke + ")(?!px)[a-z%]+$","i"), it = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (et = function(t) {
        return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null ) : e.getComputedStyle(t, null )
    }
    ,
    tt = function(e, t, n) {
        var r, i, a, o, s = e.style;
        return n = n || et(e),
        o = n ? n.getPropertyValue(t) || n[t] : void 0,
        n && ("" !== o || ie.contains(e.ownerDocument, e) || (o = ie.style(e, t)),
        rt.test(o) && nt.test(t) && (r = s.width,
        i = s.minWidth,
        a = s.maxWidth,
        s.minWidth = s.maxWidth = s.width = o,
        o = n.width,
        s.width = r,
        s.minWidth = i,
        s.maxWidth = a)),
        void 0 === o ? o : o + ""
    }
    ) : pe.documentElement.currentStyle && (et = function(e) {
        return e.currentStyle
    }
    ,
    tt = function(e, t, n) {
        var r, i, a, o, s = e.style;
        return n = n || et(e),
        o = n ? n[t] : void 0,
        null == o && s && s[t] && (o = s[t]),
        rt.test(o) && !it.test(t) && (r = s.left,
        i = e.runtimeStyle,
        a = i && i.left,
        a && (i.left = e.currentStyle.left),
        s.left = "fontSize" === t ? "1em" : o,
        o = s.pixelLeft + "px",
        s.left = r,
        a && (i.left = a)),
        void 0 === o ? o : o + "" || "auto"
    }
    ),
    !function() {
        function t() {
            var t, n, r, i;
            n = pe.getElementsByTagName("body")[0],
            n && n.style && (t = pe.createElement("div"),
            r = pe.createElement("div"),
            r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            n.appendChild(r).appendChild(t),
            t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
            a = o = !1,
            u = !0,
            e.getComputedStyle && (a = "1%" !== (e.getComputedStyle(t, null ) || {}).top,
            o = "4px" === (e.getComputedStyle(t, null ) || {
                width: "4px"
            }).width,
            i = t.appendChild(pe.createElement("div")),
            i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
            i.style.marginRight = i.style.width = "0",
            t.style.width = "1px",
            u = !parseFloat((e.getComputedStyle(i, null ) || {}).marginRight),
            t.removeChild(i)),
            t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            i = t.getElementsByTagName("td"),
            i[0].style.cssText = "margin:0;border:0;padding:0;display:none",
            s = 0 === i[0].offsetHeight,
            s && (i[0].style.display = "",
            i[1].style.display = "none",
            s = 0 === i[0].offsetHeight),
            n.removeChild(r))
        }
        var n, r, i, a, o, s, u;
        n = pe.createElement("div"),
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        i = n.getElementsByTagName("a")[0],
        (r = i && i.style) && (r.cssText = "float:left;opacity:.5",
        ne.opacity = "0.5" === r.opacity,
        ne.cssFloat = !!r.cssFloat,
        n.style.backgroundClip = "content-box",
        n.cloneNode(!0).style.backgroundClip = "",
        ne.clearCloneStyle = "content-box" === n.style.backgroundClip,
        ne.boxSizing = "" === r.boxSizing || "" === r.MozBoxSizing || "" === r.WebkitBoxSizing,
        ie.extend(ne, {
            reliableHiddenOffsets: function() {
                return null == s && t(),
                s
            },
            boxSizingReliable: function() {
                return null == o && t(),
                o
            },
            pixelPosition: function() {
                return null == a && t(),
                a
            },
            reliableMarginRight: function() {
                return null == u && t(),
                u
            }
        }))
    }(),
    ie.swap = function(e, t, n, r) {
        var i, a, o = {};
        for (a in t)
            o[a] = e.style[a],
            e.style[a] = t[a];
        i = n.apply(e, r || []);
        for (a in t)
            e.style[a] = o[a];
        return i
    }
    ;
    var at = /alpha\([^)]*\)/i
      , ot = /opacity\s*=\s*([^)]*)/
      , st = /^(none|table(?!-c[ea]).+)/
      , ut = new RegExp("^(" + ke + ")(.*)$","i")
      , lt = new RegExp("^([+-])=(" + ke + ")","i")
      , ct = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , dt = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , ft = ["Webkit", "O", "Moz", "ms"];
    ie.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = tt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ne.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, a, o, s = ie.camelCase(t), u = e.style;
                if (t = ie.cssProps[s] || (ie.cssProps[s] = C(u, s)),
                o = ie.cssHooks[t] || ie.cssHooks[s],
                void 0 === n)
                    return o && "get"in o && void 0 !== (i = o.get(e, !1, r)) ? i : u[t];
                if (a = typeof n,
                "string" === a && (i = lt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(ie.css(e, t)),
                a = "number"),
                null != n && n === n && ("number" !== a || ie.cssNumber[s] || (n += "px"),
                ne.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"),
                !(o && "set"in o && void 0 === (n = o.set(e, n, r)))))
                    try {
                        u[t] = n
                    } catch (l) {}
            }
        },
        css: function(e, t, n, r) {
            var i, a, o, s = ie.camelCase(t);
            return t = ie.cssProps[s] || (ie.cssProps[s] = C(e.style, s)),
            o = ie.cssHooks[t] || ie.cssHooks[s],
            o && "get"in o && (a = o.get(e, !0, n)),
            void 0 === a && (a = tt(e, t, r)),
            "normal" === a && t in dt && (a = dt[t]),
            "" === n || n ? (i = parseFloat(a),
            n === !0 || ie.isNumeric(i) ? i || 0 : a) : a
        }
    }),
    ie.each(["height", "width"], function(e, t) {
        ie.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? st.test(ie.css(e, "display")) && 0 === e.offsetWidth ? ie.swap(e, ct, function() {
                    return P(e, t, r)
                }) : P(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i = r && et(e);
                return E(e, n, r ? Y(e, t, r, ne.boxSizing && "border-box" === ie.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }),
    ne.opacity || (ie.cssHooks.opacity = {
        get: function(e, t) {
            return ot.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style
              , r = e.currentStyle
              , i = ie.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
              , a = r && r.filter || n.filter || "";
            n.zoom = 1,
            (t >= 1 || "" === t) && "" === ie.trim(a.replace(at, "")) && n.removeAttribute && (n.removeAttribute("filter"),
            "" === t || r && !r.filter) || (n.filter = at.test(a) ? a.replace(at, i) : a + " " + i)
        }
    }),
    ie.cssHooks.marginRight = k(ne.reliableMarginRight, function(e, t) {
        return t ? ie.swap(e, {
            display: "inline-block"
        }, tt, [e, "marginRight"]) : void 0
    }),
    ie.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        ie.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)
                    i[e + Ce[r] + t] = a[r] || a[r - 2] || a[0];
                return i
            }
        },
        nt.test(e) || (ie.cssHooks[e + t].set = E)
    }),
    ie.fn.extend({
        css: function(e, t) {
            return Ee(this, function(e, t, n) {
                var r, i, a = {}, o = 0;
                if (ie.isArray(t)) {
                    for (r = et(e),
                    i = t.length; i > o; o++)
                        a[t[o]] = ie.css(e, t[o], !1, r);
                    return a
                }
                return void 0 !== n ? ie.style(e, t, n) : ie.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return M(this, !0)
        },
        hide: function() {
            return M(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Me(this) ? ie(this).show() : ie(this).hide()
            })
        }
    }),
    ie.Tween = O,
    O.prototype = {
        constructor: O,
        init: function(e, t, n, r, i, a) {
            this.elem = e,
            this.prop = n,
            this.easing = i || "swing",
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = a || (ie.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = O.propHooks[this.prop];
            return e && e.get ? e.get(this) : O.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = O.propHooks[this.prop];
            return this.options.duration ? this.pos = t = ie.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : O.propHooks._default.set(this),
            this
        }
    },
    O.prototype.init.prototype = O.prototype,
    O.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ie.css(e.elem, e.prop, ""),
                t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                ie.fx.step[e.prop] ? ie.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ie.cssProps[e.prop]] || ie.cssHooks[e.prop]) ? ie.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    },
    O.propHooks.scrollTop = O.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    ie.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    },
    ie.fx = O.prototype.init,
    ie.fx.step = {};
    var ht, pt, mt = /^(?:toggle|show|hide)$/, gt = new RegExp("^(?:([+-])=|)(" + ke + ")([a-z%]*)$","i"), yt = /queueHooks$/, vt = [I], bt = {
        "*": [function(e, t) {
            var n = this.createTween(e, t)
              , r = n.cur()
              , i = gt.exec(t)
              , a = i && i[3] || (ie.cssNumber[e] ? "" : "px")
              , o = (ie.cssNumber[e] || "px" !== a && +r) && gt.exec(ie.css(n.elem, e))
              , s = 1
              , u = 20;
            if (o && o[3] !== a) {
                a = a || o[3],
                i = i || [],
                o = +r || 1;
                do
                    s = s || ".5",
                    o /= s,
                    ie.style(n.elem, e, o + a);
                while (s !== (s = n.cur() / r) && 1 !== s && --u)
            }
            return i && (o = n.start = +o || +r || 0,
            n.unit = a,
            n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]),
            n
        }
        ]
    };
    ie.Animation = ie.extend(H, {
        tweener: function(e, t) {
            ie.isFunction(e) ? (t = e,
            e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++)
                n = e[r],
                bt[n] = bt[n] || [],
                bt[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? vt.unshift(e) : vt.push(e)
        }
    }),
    ie.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? ie.extend({}, e) : {
            complete: n || !n && t || ie.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !ie.isFunction(t) && t
        };
        return r.duration = ie.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ie.fx.speeds ? ie.fx.speeds[r.duration] : ie.fx.speeds._default,
        (null == r.queue || r.queue === !0) && (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            ie.isFunction(r.old) && r.old.call(this),
            r.queue && ie.dequeue(this, r.queue)
        }
        ,
        r
    }
    ,
    ie.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Me).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = ie.isEmptyObject(e)
              , a = ie.speed(t, n, r)
              , o = function() {
                var t = H(this, ie.extend({}, e), a);
                (i || ie._data(this, "finish")) && t.stop(!0)
            }
            ;
            return o.finish = o,
            i || a.queue === !1 ? this.each(o) : this.queue(a.queue, o)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            }
            ;
            return "string" != typeof e && (n = t,
            t = e,
            e = void 0),
            t && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0
                  , i = null != e && e + "queueHooks"
                  , a = ie.timers
                  , o = ie._data(this);
                if (i)
                    o[i] && o[i].stop && r(o[i]);
                else
                    for (i in o)
                        o[i] && o[i].stop && yt.test(i) && r(o[i]);
                for (i = a.length; i--; )
                    a[i].elem !== this || null != e && a[i].queue !== e || (a[i].anim.stop(n),
                    t = !1,
                    a.splice(i, 1));
                (t || !n) && ie.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"),
            this.each(function() {
                var t, n = ie._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], a = ie.timers, o = r ? r.length : 0;
                for (n.finish = !0,
                ie.queue(this, e, []),
                i && i.stop && i.stop.call(this, !0),
                t = a.length; t--; )
                    a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0),
                    a.splice(t, 1));
                for (t = 0; o > t; t++)
                    r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    ie.each(["toggle", "show", "hide"], function(e, t) {
        var n = ie.fn[t];
        ie.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(A(t, !0), e, r, i)
        }
    }),
    ie.each({
        slideDown: A("show"),
        slideUp: A("hide"),
        slideToggle: A("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        ie.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    ie.timers = [],
    ie.fx.tick = function() {
        var e, t = ie.timers, n = 0;
        for (ht = ie.now(); n < t.length; n++)
            e = t[n],
            e() || t[n] !== e || t.splice(n--, 1);
        t.length || ie.fx.stop(),
        ht = void 0
    }
    ,
    ie.fx.timer = function(e) {
        ie.timers.push(e),
        e() ? ie.fx.start() : ie.timers.pop()
    }
    ,
    ie.fx.interval = 13,
    ie.fx.start = function() {
        pt || (pt = setInterval(ie.fx.tick, ie.fx.interval))
    }
    ,
    ie.fx.stop = function() {
        clearInterval(pt),
        pt = null
    }
    ,
    ie.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    ie.fn.delay = function(e, t) {
        return e = ie.fx ? ie.fx.speeds[e] || e : e,
        t = t || "fx",
        this.queue(t, function(t, n) {
            var r = setTimeout(t, e);
            n.stop = function() {
                clearTimeout(r)
            }
        })
    }
    ,
    function() {
        var e, t, n, r, i;
        t = pe.createElement("div"),
        t.setAttribute("className", "t"),
        t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        r = t.getElementsByTagName("a")[0],
        n = pe.createElement("select"),
        i = n.appendChild(pe.createElement("option")),
        e = t.getElementsByTagName("input")[0],
        r.style.cssText = "top:1px",
        ne.getSetAttribute = "t" !== t.className,
        ne.style = /top/.test(r.getAttribute("style")),
        ne.hrefNormalized = "/a" === r.getAttribute("href"),
        ne.checkOn = !!e.value,
        ne.optSelected = i.selected,
        ne.enctype = !!pe.createElement("form").enctype,
        n.disabled = !0,
        ne.optDisabled = !i.disabled,
        e = pe.createElement("input"),
        e.setAttribute("value", ""),
        ne.input = "" === e.getAttribute("value"),
        e.value = "t",
        e.setAttribute("type", "radio"),
        ne.radioValue = "t" === e.value
    }();
    var wt = /\r/g;
    ie.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = ie.isFunction(e),
            this.each(function(n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, ie(this).val()) : e,
                null == i ? i = "" : "number" == typeof i ? i += "" : ie.isArray(i) && (i = ie.map(i, function(e) {
                    return null == e ? "" : e + ""
                })),
                t = ie.valHooks[this.type] || ie.valHooks[this.nodeName.toLowerCase()],
                t && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : i ? (t = ie.valHooks[i.type] || ie.valHooks[i.nodeName.toLowerCase()],
            t && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value,
            "string" == typeof n ? n.replace(wt, "") : null == n ? "" : n)) : void 0
        }
    }),
    ie.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = ie.find.attr(e, "value");
                    return null != t ? t : ie.trim(ie.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, a = "select-one" === e.type || 0 > i, o = a ? null : [], s = a ? i + 1 : r.length, u = 0 > i ? s : a ? i : 0; s > u; u++)
                        if (n = r[u],
                        !(!n.selected && u !== i || (ne.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ie.nodeName(n.parentNode, "optgroup"))) {
                            if (t = ie(n).val(),
                            a)
                                return t;
                            o.push(t)
                        }
                    return o
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, a = ie.makeArray(t), o = i.length; o--; )
                        if (r = i[o],
                        ie.inArray(ie.valHooks.option.get(r), a) >= 0)
                            try {
                                r.selected = n = !0
                            } catch (s) {
                                r.scrollHeight
                            }
                        else
                            r.selected = !1;
                    return n || (e.selectedIndex = -1),
                    i
                }
            }
        }
    }),
    ie.each(["radio", "checkbox"], function() {
        ie.valHooks[this] = {
            set: function(e, t) {
                return ie.isArray(t) ? e.checked = ie.inArray(ie(e).val(), t) >= 0 : void 0
            }
        },
        ne.checkOn || (ie.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        }
        )
    });
    var xt, Tt, _t = ie.expr.attrHandle, St = /^(?:checked|selected)$/i, Dt = ne.getSetAttribute, kt = ne.input;
    ie.fn.extend({
        attr: function(e, t) {
            return Ee(this, ie.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ie.removeAttr(this, e)
            })
        }
    }),
    ie.extend({
        attr: function(e, t, n) {
            var r, i, a = e.nodeType;
            return e && 3 !== a && 8 !== a && 2 !== a ? typeof e.getAttribute === _e ? ie.prop(e, t, n) : (1 === a && ie.isXMLDoc(e) || (t = t.toLowerCase(),
            r = ie.attrHooks[t] || (ie.expr.match.bool.test(t) ? Tt : xt)),
            void 0 === n ? r && "get"in r && null !== (i = r.get(e, t)) ? i : (i = ie.find.attr(e, t),
            null == i ? void 0 : i) : null !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""),
            n) : void ie.removeAttr(e, t)) : void 0
        },
        removeAttr: function(e, t) {
            var n, r, i = 0, a = t && t.match(be);
            if (a && 1 === e.nodeType)
                for (; n = a[i++]; )
                    r = ie.propFix[n] || n,
                    ie.expr.match.bool.test(n) ? kt && Dt || !St.test(n) ? e[r] = !1 : e[ie.camelCase("default-" + n)] = e[r] = !1 : ie.attr(e, n, ""),
                    e.removeAttribute(Dt ? n : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ne.radioValue && "radio" === t && ie.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        }
    }),
    Tt = {
        set: function(e, t, n) {
            return t === !1 ? ie.removeAttr(e, n) : kt && Dt || !St.test(n) ? e.setAttribute(!Dt && ie.propFix[n] || n, n) : e[ie.camelCase("default-" + n)] = e[n] = !0,
            n
        }
    },
    ie.each(ie.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = _t[t] || ie.find.attr;
        _t[t] = kt && Dt || !St.test(t) ? function(e, t, r) {
            var i, a;
            return r || (a = _t[t],
            _t[t] = i,
            i = null != n(e, t, r) ? t.toLowerCase() : null ,
            _t[t] = a),
            i
        }
        : function(e, t, n) {
            return n ? void 0 : e[ie.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }),
    kt && Dt || (ie.attrHooks.value = {
        set: function(e, t, n) {
            return ie.nodeName(e, "input") ? void (e.defaultValue = t) : xt && xt.set(e, t, n)
        }
    }),
    Dt || (xt = {
        set: function(e, t, n) {
            var r = e.getAttributeNode(n);
            return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)),
            r.value = t += "",
            "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    },
    _t.id = _t.name = _t.coords = function(e, t, n) {
        var r;
        return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
    }
    ,
    ie.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        },
        set: xt.set
    },
    ie.attrHooks.contenteditable = {
        set: function(e, t, n) {
            xt.set(e, "" === t ? !1 : t, n)
        }
    },
    ie.each(["width", "height"], function(e, t) {
        ie.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"),
                n) : void 0
            }
        }
    })),
    ne.style || (ie.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var Ct = /^(?:input|select|textarea|button|object)$/i
      , Mt = /^(?:a|area)$/i;
    ie.fn.extend({
        prop: function(e, t) {
            return Ee(this, ie.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = ie.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = void 0,
                    delete this[e]
                } catch (t) {}
            })
        }
    }),
    ie.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, a, o = e.nodeType;
            return e && 3 !== o && 8 !== o && 2 !== o ? (a = 1 !== o || !ie.isXMLDoc(e),
            a && (t = ie.propFix[t] || t,
            i = ie.propHooks[t]),
            void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ie.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Ct.test(e.nodeName) || Mt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }),
    ne.hrefNormalized || ie.each(["href", "src"], function(e, t) {
        ie.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }),
    ne.optSelected || (ie.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex),
            null
        }
    }),
    ie.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ie.propFix[this.toLowerCase()] = this
    }),
    ne.enctype || (ie.propFix.enctype = "encoding");
    var Et = /[\t\r\n\f]/g;
    ie.fn.extend({
        addClass: function(e) {
            var t, n, r, i, a, o, s = 0, u = this.length, l = "string" == typeof e && e;
            if (ie.isFunction(e))
                return this.each(function(t) {
                    ie(this).addClass(e.call(this, t, this.className))
                });
            if (l)
                for (t = (e || "").match(be) || []; u > s; s++)
                    if (n = this[s],
                    r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Et, " ") : " ")) {
                        for (a = 0; i = t[a++]; )
                            r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        o = ie.trim(r),
                        n.className !== o && (n.className = o)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, a, o, s = 0, u = this.length, l = 0 === arguments.length || "string" == typeof e && e;
            if (ie.isFunction(e))
                return this.each(function(t) {
                    ie(this).removeClass(e.call(this, t, this.className))
                });
            if (l)
                for (t = (e || "").match(be) || []; u > s; s++)
                    if (n = this[s],
                    r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Et, " ") : "")) {
                        for (a = 0; i = t[a++]; )
                            for (; r.indexOf(" " + i + " ") >= 0; )
                                r = r.replace(" " + i + " ", " ");
                        o = e ? ie.trim(r) : "",
                        n.className !== o && (n.className = o)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ie.isFunction(e) ? function(n) {
                ie(this).toggleClass(e.call(this, n, this.className, t), t)
            }
            : function() {
                if ("string" === n)
                    for (var t, r = 0, i = ie(this), a = e.match(be) || []; t = a[r++]; )
                        i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else
                    (n === _e || "boolean" === n) && (this.className && ie._data(this, "__className__", this.className),
                    this.className = this.className || e === !1 ? "" : ie._data(this, "__className__") || "")
            }
            )
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Et, " ").indexOf(t) >= 0)
                    return !0;
            return !1
        }
    }),
    ie.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        ie.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null , e, n) : this.trigger(t)
        }
    }),
    ie.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null , t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null , t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Yt = ie.now()
      , Pt = /\?/
      , Ot = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ie.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse)
            return e.JSON.parse(t + "");
        var n, r = null , i = ie.trim(t + "");
        return i && !ie.trim(i.replace(Ot, function(e, t, i, a) {
            return n && t && (r = 0),
            0 === r ? e : (n = i || t,
            r += !a - !i,
            "")
        })) ? Function("return " + i)() : ie.error("Invalid JSON: " + t)
    }
    ,
    ie.parseXML = function(t) {
        var n, r;
        if (!t || "string" != typeof t)
            return null ;
        try {
            e.DOMParser ? (r = new DOMParser,
            n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"),
            n.async = "false",
            n.loadXML(t))
        } catch (i) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ie.error("Invalid XML: " + t),
        n
    }
    ;
    var Nt, At, Ft = /#.*$/, It = /([?&])_=[^&]*/, Lt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, $t = /^(?:GET|HEAD)$/, jt = /^\/\//, Wt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Rt = {}, Vt = {}, Ut = "*/".concat("*");
    try {
        At = location.href
    } catch (Xt) {
        At = pe.createElement("a"),
        At.href = "",
        At = At.href
    }
    Nt = Wt.exec(At.toLowerCase()) || [],
    ie.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: At,
            type: "GET",
            isLocal: Ht.test(Nt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Ut,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ie.parseJSON,
                "text xml": ie.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? W(W(e, ie.ajaxSettings), t) : W(ie.ajaxSettings, e)
        },
        ajaxPrefilter: $(Rt),
        ajaxTransport: $(Vt),
        ajax: function(e, t) {
            function n(e, t, n, r) {
                var i, c, y, v, w, T = t;
                2 !== b && (b = 2,
                s && clearTimeout(s),
                l = void 0,
                o = r || "",
                x.readyState = e > 0 ? 4 : 0,
                i = e >= 200 && 300 > e || 304 === e,
                n && (v = R(d, x, n)),
                v = V(d, v, x, i),
                i ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"),
                w && (ie.lastModified[a] = w),
                w = x.getResponseHeader("etag"),
                w && (ie.etag[a] = w)),
                204 === e || "HEAD" === d.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = v.state,
                c = v.data,
                y = v.error,
                i = !y)) : (y = T,
                (e || !T) && (T = "error",
                0 > e && (e = 0))),
                x.status = e,
                x.statusText = (t || T) + "",
                i ? p.resolveWith(f, [c, T, x]) : p.rejectWith(f, [x, T, y]),
                x.statusCode(g),
                g = void 0,
                u && h.trigger(i ? "ajaxSuccess" : "ajaxError", [x, d, i ? c : y]),
                m.fireWith(f, [x, T]),
                u && (h.trigger("ajaxComplete", [x, d]),
                --ie.active || ie.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e,
            e = void 0),
            t = t || {};
            var r, i, a, o, s, u, l, c, d = ie.ajaxSetup({}, t), f = d.context || d, h = d.context && (f.nodeType || f.jquery) ? ie(f) : ie.event, p = ie.Deferred(), m = ie.Callbacks("once memory"), g = d.statusCode || {}, y = {}, v = {}, b = 0, w = "canceled", x = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === b) {
                        if (!c)
                            for (c = {}; t = Lt.exec(o); )
                                c[t[1].toLowerCase()] = t[2];
                        t = c[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function() {
                    return 2 === b ? o : null
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return b || (e = v[n] = v[n] || e,
                    y[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return b || (d.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (2 > b)
                            for (t in e)
                                g[t] = [g[t], e[t]];
                        else
                            x.always(e[x.status]);
                    return this
                },
                abort: function(e) {
                    var t = e || w;
                    return l && l.abort(t),
                    n(0, t),
                    this
                }
            };
            if (p.promise(x).complete = m.add,
            x.success = x.done,
            x.error = x.fail,
            d.url = ((e || d.url || At) + "").replace(Ft, "").replace(jt, Nt[1] + "//"),
            d.type = t.method || t.type || d.method || d.type,
            d.dataTypes = ie.trim(d.dataType || "*").toLowerCase().match(be) || [""],
            null == d.crossDomain && (r = Wt.exec(d.url.toLowerCase()),
            d.crossDomain = !(!r || r[1] === Nt[1] && r[2] === Nt[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Nt[3] || ("http:" === Nt[1] ? "80" : "443")))),
            d.data && d.processData && "string" != typeof d.data && (d.data = ie.param(d.data, d.traditional)),
            j(Rt, d, t, x),
            2 === b)
                return x;
            u = ie.event && d.global,
            u && 0 === ie.active++ && ie.event.trigger("ajaxStart"),
            d.type = d.type.toUpperCase(),
            d.hasContent = !$t.test(d.type),
            a = d.url,
            d.hasContent || (d.data && (a = d.url += (Pt.test(a) ? "&" : "?") + d.data,
            delete d.data),
            d.cache === !1 && (d.url = It.test(a) ? a.replace(It, "$1_=" + Yt++) : a + (Pt.test(a) ? "&" : "?") + "_=" + Yt++)),
            d.ifModified && (ie.lastModified[a] && x.setRequestHeader("If-Modified-Since", ie.lastModified[a]),
            ie.etag[a] && x.setRequestHeader("If-None-Match", ie.etag[a])),
            (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && x.setRequestHeader("Content-Type", d.contentType),
            x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Ut + "; q=0.01" : "") : d.accepts["*"]);
            for (i in d.headers)
                x.setRequestHeader(i, d.headers[i]);
            if (d.beforeSend && (d.beforeSend.call(f, x, d) === !1 || 2 === b))
                return x.abort();
            w = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            })
                x[i](d[i]);
            if (l = j(Vt, d, t, x)) {
                x.readyState = 1,
                u && h.trigger("ajaxSend", [x, d]),
                d.async && d.timeout > 0 && (s = setTimeout(function() {
                    x.abort("timeout")
                }, d.timeout));
                try {
                    b = 1,
                    l.send(y, n)
                } catch (T) {
                    if (!(2 > b))
                        throw T;
                    n(-1, T)
                }
            } else
                n(-1, "No Transport");
            return x
        },
        getJSON: function(e, t, n) {
            return ie.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return ie.get(e, void 0, t, "script")
        }
    }),
    ie.each(["get", "post"], function(e, t) {
        ie[t] = function(e, n, r, i) {
            return ie.isFunction(n) && (i = i || r,
            r = n,
            n = void 0),
            ie.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }),
    ie._evalUrl = function(e) {
        return ie.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    ie.fn.extend({
        wrapAll: function(e) {
            if (ie.isFunction(e))
                return this.each(function(t) {
                    ie(this).wrapAll(e.call(this, t))
                });
            if (this[0]) {
                var t = ie(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType; )
                        e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(ie.isFunction(e) ? function(t) {
                ie(this).wrapInner(e.call(this, t))
            }
            : function() {
                var t = ie(this)
                  , n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            }
            )
        },
        wrap: function(e) {
            var t = ie.isFunction(e);
            return this.each(function(n) {
                ie(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ie.nodeName(this, "body") || ie(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    ie.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ne.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ie.css(e, "display"))
    }
    ,
    ie.expr.filters.visible = function(e) {
        return !ie.expr.filters.hidden(e)
    }
    ;
    var qt = /%20/g
      , zt = /\[\]$/
      , Gt = /\r?\n/g
      , Bt = /^(?:submit|button|image|reset|file)$/i
      , Zt = /^(?:input|select|textarea|keygen)/i;
    ie.param = function(e, t) {
        var n, r = [], i = function(e, t) {
            t = ie.isFunction(t) ? t() : null == t ? "" : t,
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        }
        ;
        if (void 0 === t && (t = ie.ajaxSettings && ie.ajaxSettings.traditional),
        ie.isArray(e) || e.jquery && !ie.isPlainObject(e))
            ie.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                U(n, e[n], t, i);
        return r.join("&").replace(qt, "+")
    }
    ,
    ie.fn.extend({
        serialize: function() {
            return ie.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ie.prop(this, "elements");
                return e ? ie.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ie(this).is(":disabled") && Zt.test(this.nodeName) && !Bt.test(e) && (this.checked || !Ye.test(e))
            }).map(function(e, t) {
                var n = ie(this).val();
                return null == n ? null : ie.isArray(n) ? ie.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Gt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Gt, "\r\n")
                }
            }).get()
        }
    }),
    ie.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || q()
    }
    : X;
    var Jt = 0
      , Qt = {}
      , Kt = ie.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", function() {
        for (var e in Qt)
            Qt[e](void 0, !0)
    }),
    ne.cors = !!Kt && "withCredentials"in Kt,
    Kt = ne.ajax = !!Kt,
    Kt && ie.ajaxTransport(function(e) {
        if (!e.crossDomain || ne.cors) {
            var t;
            return {
                send: function(n, r) {
                    var i, a = e.xhr(), o = ++Jt;
                    if (a.open(e.type, e.url, e.async, e.username, e.password),
                    e.xhrFields)
                        for (i in e.xhrFields)
                            a[i] = e.xhrFields[i];
                    e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType),
                    e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n)
                        void 0 !== n[i] && a.setRequestHeader(i, n[i] + "");
                    a.send(e.hasContent && e.data || null ),
                    t = function(n, i) {
                        var s, u, l;
                        if (t && (i || 4 === a.readyState))
                            if (delete Qt[o],
                            t = void 0,
                            a.onreadystatechange = ie.noop,
                            i)
                                4 !== a.readyState && a.abort();
                            else {
                                l = {},
                                s = a.status,
                                "string" == typeof a.responseText && (l.text = a.responseText);
                                try {
                                    u = a.statusText
                                } catch (c) {
                                    u = ""
                                }
                                s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = l.text ? 200 : 404
                            }
                        l && r(s, u, l, a.getAllResponseHeaders())
                    }
                    ,
                    e.async ? 4 === a.readyState ? setTimeout(t) : a.onreadystatechange = Qt[o] = t : t()
                },
                abort: function() {
                    t && t(void 0, !0)
                }
            }
        }
    }),
    ie.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return ie.globalEval(e),
                e
            }
        }
    }),
    ie.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET",
        e.global = !1)
    }),
    ie.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n = pe.head || ie("head")[0] || pe.documentElement;
            return {
                send: function(r, i) {
                    t = pe.createElement("script"),
                    t.async = !0,
                    e.scriptCharset && (t.charset = e.scriptCharset),
                    t.src = e.url,
                    t.onload = t.onreadystatechange = function(e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null ,
                        t.parentNode && t.parentNode.removeChild(t),
                        t = null ,
                        n || i(200, "success"))
                    }
                    ,
                    n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var en = []
      , tn = /(=)\?(?=&|$)|\?\?/;
    ie.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = en.pop() || ie.expando + "_" + Yt++;
            return this[e] = !0,
            e
        }
    }),
    ie.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, a, o, s = t.jsonp !== !1 && (tn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tn.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = ie.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
        s ? t[s] = t[s].replace(tn, "$1" + i) : t.jsonp !== !1 && (t.url += (Pt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
        t.converters["script json"] = function() {
            return o || ie.error(i + " was not called"),
            o[0]
        }
        ,
        t.dataTypes[0] = "json",
        a = e[i],
        e[i] = function() {
            o = arguments
        }
        ,
        r.always(function() {
            e[i] = a,
            t[i] && (t.jsonpCallback = n.jsonpCallback,
            en.push(i)),
            o && ie.isFunction(a) && a(o[0]),
            o = a = void 0
        }),
        "script") : void 0
    }),
    ie.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e)
            return null ;
        "boolean" == typeof t && (n = t,
        t = !1),
        t = t || pe;
        var r = de.exec(e)
          , i = !n && [];
        return r ? [t.createElement(r[1])] : (r = ie.buildFragment([e], t, i),
        i && i.length && ie(i).remove(),
        ie.merge([], r.childNodes))
    }
    ;
    var nn = ie.fn.load;
    ie.fn.load = function(e, t, n) {
        if ("string" != typeof e && nn)
            return nn.apply(this, arguments);
        var r, i, a, o = this, s = e.indexOf(" ");
        return s >= 0 && (r = ie.trim(e.slice(s, e.length)),
        e = e.slice(0, s)),
        ie.isFunction(t) ? (n = t,
        t = void 0) : t && "object" == typeof t && (a = "POST"),
        o.length > 0 && ie.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: t
        }).done(function(e) {
            i = arguments,
            o.html(r ? ie("<div>").append(ie.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            o.each(n, i || [e.responseText, t, e])
        }
        ),
        this
    }
    ,
    ie.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ie.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    ie.expr.filters.animated = function(e) {
        return ie.grep(ie.timers, function(t) {
            return e === t.elem
        }).length
    }
    ;
    var rn = e.document.documentElement;
    ie.offset = {
        setOffset: function(e, t, n) {
            var r, i, a, o, s, u, l, c = ie.css(e, "position"), d = ie(e), f = {};
            "static" === c && (e.style.position = "relative"),
            s = d.offset(),
            a = ie.css(e, "top"),
            u = ie.css(e, "left"),
            l = ("absolute" === c || "fixed" === c) && ie.inArray("auto", [a, u]) > -1,
            l ? (r = d.position(),
            o = r.top,
            i = r.left) : (o = parseFloat(a) || 0,
            i = parseFloat(u) || 0),
            ie.isFunction(t) && (t = t.call(e, n, s)),
            null != t.top && (f.top = t.top - s.top + o),
            null != t.left && (f.left = t.left - s.left + i),
            "using"in t ? t.using.call(e, f) : d.css(f)
        }
    },
    ie.fn.extend({
        offset: function(e) {
            if (arguments.length)
                return void 0 === e ? this : this.each(function(t) {
                    ie.offset.setOffset(this, e, t)
                });
            var t, n, r = {
                top: 0,
                left: 0
            }, i = this[0], a = i && i.ownerDocument;
            return a ? (t = a.documentElement,
            ie.contains(t, i) ? (typeof i.getBoundingClientRect !== _e && (r = i.getBoundingClientRect()),
            n = z(a),
            {
                top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : r) : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                }, r = this[0];
                return "fixed" === ie.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(),
                t = this.offset(),
                ie.nodeName(e[0], "html") || (n = e.offset()),
                n.top += ie.css(e[0], "borderTopWidth", !0),
                n.left += ie.css(e[0], "borderLeftWidth", !0)),
                {
                    top: t.top - n.top - ie.css(r, "marginTop", !0),
                    left: t.left - n.left - ie.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || rn; e && !ie.nodeName(e, "html") && "static" === ie.css(e, "position"); )
                    e = e.offsetParent;
                return e || rn
            })
        }
    }),
    ie.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = /Y/.test(t);
        ie.fn[e] = function(r) {
            return Ee(this, function(e, r, i) {
                var a = z(e);
                return void 0 === i ? a ? t in a ? a[t] : a.document.documentElement[r] : e[r] : void (a ? a.scrollTo(n ? ie(a).scrollLeft() : i, n ? i : ie(a).scrollTop()) : e[r] = i)
            }, e, r, arguments.length, null )
        }
    }),
    ie.each(["top", "left"], function(e, t) {
        ie.cssHooks[t] = k(ne.pixelPosition, function(e, n) {
            return n ? (n = tt(e, t),
            rt.test(n) ? ie(e).position()[t] + "px" : n) : void 0
        })
    }),
    ie.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        ie.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            ie.fn[r] = function(r, i) {
                var a = arguments.length && (n || "boolean" != typeof r)
                  , o = n || (r === !0 || i === !0 ? "margin" : "border");
                return Ee(this, function(t, n, r) {
                    var i;
                    return ie.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement,
                    Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? ie.css(t, n, o) : ie.style(t, n, r, o)
                }, t, a ? r : void 0, a, null )
            }
        })
    }),
    ie.fn.size = function() {
        return this.length
    }
    ,
    ie.fn.andSelf = ie.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return ie
    });
    var an = e.jQuery
      , on = e.$;
    return ie.noConflict = function(t) {
        return e.$ === ie && (e.$ = on),
        t && e.jQuery === ie && (e.jQuery = an),
        ie
    }
    ,
    typeof t === _e && (e.jQuery = e.$ = ie),
    ie
}),
!function(e) {
    function t(e) {
        var t = e.length
          , r = n.type(e);
        return "function" === r || n.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    if (!e.jQuery) {
        var n = function(e, t) {
            return new n.fn.init(e,t)
        }
        ;
        n.isWindow = function(e) {
            return null != e && e == e.window
        }
        ,
        n.type = function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? i[o.call(e)] || "object" : typeof e
        }
        ,
        n.isArray = Array.isArray || function(e) {
            return "array" === n.type(e)
        }
        ,
        n.isPlainObject = function(e) {
            var t;
            if (!e || "object" !== n.type(e) || e.nodeType || n.isWindow(e))
                return !1;
            try {
                if (e.constructor && !a.call(e, "constructor") && !a.call(e.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (r) {
                return !1
            }
            for (t in e)
                ;
            return void 0 === t || a.call(e, t)
        }
        ,
        n.each = function(e, n, r) {
            var i, a = 0, o = e.length, s = t(e);
            if (r) {
                if (s)
                    for (; o > a && (i = n.apply(e[a], r),
                    i !== !1); a++)
                        ;
                else
                    for (a in e)
                        if (i = n.apply(e[a], r),
                        i === !1)
                            break
            } else if (s)
                for (; o > a && (i = n.call(e[a], a, e[a]),
                i !== !1); a++)
                    ;
            else
                for (a in e)
                    if (i = n.call(e[a], a, e[a]),
                    i === !1)
                        break;
            return e
        }
        ,
        n.data = function(e, t, i) {
            if (void 0 === i) {
                var a = e[n.expando]
                  , o = a && r[a];
                if (void 0 === t)
                    return o;
                if (o && t in o)
                    return o[t]
            } else if (void 0 !== t) {
                var a = e[n.expando] || (e[n.expando] = ++n.uuid);
                return r[a] = r[a] || {},
                r[a][t] = i,
                i
            }
        }
        ,
        n.removeData = function(e, t) {
            var i = e[n.expando]
              , a = i && r[i];
            a && n.each(t, function(e, t) {
                delete a[t]
            })
        }
        ,
        n.extend = function() {
            var e, t, r, i, a, o, s = arguments[0] || {}, u = 1, l = arguments.length, c = !1;
            for ("boolean" == typeof s && (c = s,
            s = arguments[u] || {},
            u++),
            "object" != typeof s && "function" !== n.type(s) && (s = {}),
            u === l && (s = this,
            u--); l > u; u++)
                if (null != (a = arguments[u]))
                    for (i in a)
                        e = s[i],
                        r = a[i],
                        s !== r && (c && r && (n.isPlainObject(r) || (t = n.isArray(r))) ? (t ? (t = !1,
                        o = e && n.isArray(e) ? e : []) : o = e && n.isPlainObject(e) ? e : {},
                        s[i] = n.extend(c, o, r)) : void 0 !== r && (s[i] = r));
            return s
        }
        ,
        n.queue = function(e, r, i) {
            function a(e, n) {
                var r = n || [];
                return null != e && (t(Object(e)) ? !function(e, t) {
                    for (var n = +t.length, r = 0, i = e.length; n > r; )
                        e[i++] = t[r++];
                    if (n !== n)
                        for (; void 0 !== t[r]; )
                            e[i++] = t[r++];
                    return e.length = i,
                    e
                }(r, "string" == typeof e ? [e] : e) : [].push.call(r, e)),
                r
            }
            if (e) {
                r = (r || "fx") + "queue";
                var o = n.data(e, r);
                return i ? (!o || n.isArray(i) ? o = n.data(e, r, a(i)) : o.push(i),
                o) : o || []
            }
        }
        ,
        n.dequeue = function(e, t) {
            n.each(e.nodeType ? [e] : e, function(e, r) {
                t = t || "fx";
                var i = n.queue(r, t)
                  , a = i.shift();
                "inprogress" === a && (a = i.shift()),
                a && ("fx" === t && i.unshift("inprogress"),
                a.call(r, function() {
                    n.dequeue(r, t)
                }))
            })
        }
        ,
        n.fn = n.prototype = {
            init: function(e) {
                if (e.nodeType)
                    return this[0] = e,
                    this;
                throw new Error("Not a DOM node.")
            },
            offset: function() {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function() {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position; )
                        e = e.offsetParent;
                    return e || document
                }
                var t = this[0]
                  , e = e.apply(t)
                  , r = this.offset()
                  , i = /^(?:body|html)$/i.test(e.nodeName) ? {
                    top: 0,
                    left: 0
                } : n(e).offset();
                return r.top -= parseFloat(t.style.marginTop) || 0,
                r.left -= parseFloat(t.style.marginLeft) || 0,
                e.style && (i.top += parseFloat(e.style.borderTopWidth) || 0,
                i.left += parseFloat(e.style.borderLeftWidth) || 0),
                {
                    top: r.top - i.top,
                    left: r.left - i.left
                }
            }
        };
        var r = {};
        n.expando = "velocity" + (new Date).getTime(),
        n.uuid = 0;
        for (var i = {}, a = i.hasOwnProperty, o = i.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), u = 0; u < s.length; u++)
            i["[object " + s[u] + "]"] = s[u].toLowerCase();
        n.fn.init.prototype = n.fn,
        e.Velocity = {
            Utilities: n
        }
    }
}(window),
function(e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
}(function() {
    return function(e, t, n, r) {
        function i(e) {
            for (var t = -1, n = e ? e.length : 0, r = []; ++t < n; ) {
                var i = e[t];
                i && r.push(i)
            }
            return r
        }
        function a(e) {
            return m.isWrapped(e) ? e = [].slice.call(e) : m.isNode(e) && (e = [e]),
            e
        }
        function o(e) {
            var t = f.data(e, "velocity");
            return null === t ? r : t
        }
        function s(e) {
            return function(t) {
                return Math.round(t * e) * (1 / e)
            }
        }
        function u(e, n, r, i) {
            function a(e, t) {
                return 1 - 3 * t + 3 * e
            }
            function o(e, t) {
                return 3 * t - 6 * e
            }
            function s(e) {
                return 3 * e
            }
            function u(e, t, n) {
                return ((a(t, n) * e + o(t, n)) * e + s(t)) * e
            }
            function l(e, t, n) {
                return 3 * a(t, n) * e * e + 2 * o(t, n) * e + s(t)
            }
            function c(t, n) {
                for (var i = 0; m > i; ++i) {
                    var a = l(n, e, r);
                    if (0 === a)
                        return n;
                    var o = u(n, e, r) - t;
                    n -= o / a
                }
                return n
            }
            function d() {
                for (var t = 0; b > t; ++t)
                    _[t] = u(t * w, e, r)
            }
            function f(t, n, i) {
                var a, o, s = 0;
                do
                    o = n + (i - n) / 2,
                    a = u(o, e, r) - t,
                    a > 0 ? i = o : n = o;
                while (Math.abs(a) > y && ++s < v);return o
            }
            function h(t) {
                for (var n = 0, i = 1, a = b - 1; i != a && _[i] <= t; ++i)
                    n += w;
                --i;
                var o = (t - _[i]) / (_[i + 1] - _[i])
                  , s = n + o * w
                  , u = l(s, e, r);
                return u >= g ? c(t, s) : 0 == u ? s : f(t, n, n + w)
            }
            function p() {
                S = !0,
                (e != n || r != i) && d()
            }
            var m = 4
              , g = .001
              , y = 1e-7
              , v = 10
              , b = 11
              , w = 1 / (b - 1)
              , x = "Float32Array"in t;
            if (4 !== arguments.length)
                return !1;
            for (var T = 0; 4 > T; ++T)
                if ("number" != typeof arguments[T] || isNaN(arguments[T]) || !isFinite(arguments[T]))
                    return !1;
            e = Math.min(e, 1),
            r = Math.min(r, 1),
            e = Math.max(e, 0),
            r = Math.max(r, 0);
            var _ = x ? new Float32Array(b) : new Array(b)
              , S = !1
              , D = function(t) {
                return S || p(),
                e === n && r === i ? t : 0 === t ? 0 : 1 === t ? 1 : u(h(t), n, i)
            }
            ;
            D.getControlPoints = function() {
                return [{
                    x: e,
                    y: n
                }, {
                    x: r,
                    y: i
                }]
            }
            ;
            var k = "generateBezier(" + [e, n, r, i] + ")";
            return D.toString = function() {
                return k
            }
            ,
            D
        }
        function l(e, t) {
            var n = e;
            return m.isString(e) ? b.Easings[e] || (n = !1) : n = m.isArray(e) && 1 === e.length ? s.apply(null , e) : m.isArray(e) && 2 === e.length ? w.apply(null , e.concat([t])) : m.isArray(e) && 4 === e.length ? u.apply(null , e) : !1,
            n === !1 && (n = b.Easings[b.defaults.easing] ? b.defaults.easing : v),
            n
        }
        function c(e) {
            if (e) {
                var t = (new Date).getTime()
                  , n = b.State.calls.length;
                n > 1e4 && (b.State.calls = i(b.State.calls));
                for (var a = 0; n > a; a++)
                    if (b.State.calls[a]) {
                        var s = b.State.calls[a]
                          , u = s[0]
                          , l = s[2]
                          , h = s[3]
                          , p = !!h
                          , g = null ;
                        h || (h = b.State.calls[a][3] = t - 16);
                        for (var y = Math.min((t - h) / l.duration, 1), v = 0, w = u.length; w > v; v++) {
                            var T = u[v]
                              , S = T.element;
                            if (o(S)) {
                                var D = !1;
                                if (l.display !== r && null !== l.display && "none" !== l.display) {
                                    if ("flex" === l.display) {
                                        var k = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                        f.each(k, function(e, t) {
                                            x.setPropertyValue(S, "display", t)
                                        })
                                    }
                                    x.setPropertyValue(S, "display", l.display)
                                }
                                l.visibility !== r && "hidden" !== l.visibility && x.setPropertyValue(S, "visibility", l.visibility);
                                for (var C in T)
                                    if ("element" !== C) {
                                        var M, E = T[C], Y = m.isString(E.easing) ? b.Easings[E.easing] : E.easing;
                                        if (1 === y)
                                            M = E.endValue;
                                        else {
                                            var P = E.endValue - E.startValue;
                                            if (M = E.startValue + P * Y(y, l, P),
                                            !p && M === E.currentValue)
                                                continue
                                        }
                                        if (E.currentValue = M,
                                        "tween" === C)
                                            g = M;
                                        else {
                                            if (x.Hooks.registered[C]) {
                                                var O = x.Hooks.getRoot(C)
                                                  , N = o(S).rootPropertyValueCache[O];
                                                N && (E.rootPropertyValue = N)
                                            }
                                            var A = x.setPropertyValue(S, C, E.currentValue + (0 === parseFloat(M) ? "" : E.unitType), E.rootPropertyValue, E.scrollData);
                                            x.Hooks.registered[C] && (o(S).rootPropertyValueCache[O] = x.Normalizations.registered[O] ? x.Normalizations.registered[O]("extract", null , A[1]) : A[1]),
                                            "transform" === A[0] && (D = !0)
                                        }
                                    }
                                l.mobileHA && o(S).transformCache.translate3d === r && (o(S).transformCache.translate3d = "(0px, 0px, 0px)",
                                D = !0),
                                D && x.flushTransformCache(S)
                            }
                        }
                        l.display !== r && "none" !== l.display && (b.State.calls[a][2].display = !1),
                        l.visibility !== r && "hidden" !== l.visibility && (b.State.calls[a][2].visibility = !1),
                        l.progress && l.progress.call(s[1], s[1], y, Math.max(0, h + l.duration - t), h, g),
                        1 === y && d(a)
                    }
            }
            b.State.isTicking && _(c)
        }
        function d(e, t) {
            if (!b.State.calls[e])
                return !1;
            for (var n = b.State.calls[e][0], i = b.State.calls[e][1], a = b.State.calls[e][2], s = b.State.calls[e][4], u = !1, l = 0, c = n.length; c > l; l++) {
                var d = n[l].element;
                if (t || a.loop || ("none" === a.display && x.setPropertyValue(d, "display", a.display),
                "hidden" === a.visibility && x.setPropertyValue(d, "visibility", a.visibility)),
                a.loop !== !0 && (f.queue(d)[1] === r || !/\.velocityQueueEntryFlag/i.test(f.queue(d)[1])) && o(d)) {
                    o(d).isAnimating = !1,
                    o(d).rootPropertyValueCache = {};
                    var h = !1;
                    f.each(x.Lists.transforms3D, function(e, t) {
                        var n = /^scale/.test(t) ? 1 : 0
                          , i = o(d).transformCache[t];
                        o(d).transformCache[t] !== r && new RegExp("^\\(" + n + "[^.]").test(i) && (h = !0,
                        delete o(d).transformCache[t])
                    }),
                    a.mobileHA && (h = !0,
                    delete o(d).transformCache.translate3d),
                    h && x.flushTransformCache(d),
                    x.Values.removeClass(d, "velocity-animating")
                }
                if (!t && a.complete && !a.loop && l === c - 1)
                    try {
                        a.complete.call(i, i)
                    } catch (p) {
                        setTimeout(function() {
                            throw p
                        }, 1)
                    }
                s && a.loop !== !0 && s(i),
                o(d) && a.loop === !0 && !t && (f.each(o(d).tweensContainer, function(e, t) {
                    /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0,
                    t.startValue = 360),
                    /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0,
                    t.startValue = 100)
                }),
                b(d, "reverse", {
                    loop: !0,
                    delay: a.delay
                })),
                a.queue !== !1 && f.dequeue(d, a.queue)
            }
            b.State.calls[e] = !1;
            for (var m = 0, g = b.State.calls.length; g > m; m++)
                if (b.State.calls[m] !== !1) {
                    u = !0;
                    break
                }
            u === !1 && (b.State.isTicking = !1,
            delete b.State.calls,
            b.State.calls = [])
        }
        var f, h = function() {
            if (n.documentMode)
                return n.documentMode;
            for (var e = 7; e > 4; e--) {
                var t = n.createElement("div");
                if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->",
                t.getElementsByTagName("span").length)
                    return t = null ,
                    e
            }
            return r
        }(), p = function() {
            var e = 0;
            return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                var n, r = (new Date).getTime();
                return n = Math.max(0, 16 - (r - e)),
                e = r + n,
                setTimeout(function() {
                    t(r + n)
                }, n)
            }
        }(), m = {
            isString: function(e) {
                return "string" == typeof e
            },
            isArray: Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
            ,
            isFunction: function(e) {
                return "[object Function]" === Object.prototype.toString.call(e)
            },
            isNode: function(e) {
                return e && e.nodeType
            },
            isNodeList: function(e) {
                return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== r && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
            },
            isWrapped: function(e) {
                return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
            },
            isSVG: function(e) {
                return t.SVGElement && e instanceof t.SVGElement
            },
            isEmptyObject: function(e) {
                for (var t in e)
                    return !1;
                return !0
            }
        }, g = !1;
        if (e.fn && e.fn.jquery ? (f = e,
        g = !0) : f = t.Velocity.Utilities,
        8 >= h && !g)
            throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= h)
            return void (jQuery.fn.velocity = jQuery.fn.animate);
        var y = 400
          , v = "swing"
          , b = {
            State: {
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                isAndroid: /Android/i.test(navigator.userAgent),
                isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                isChrome: t.chrome,
                isFirefox: /Firefox/i.test(navigator.userAgent),
                prefixElement: n.createElement("div"),
                prefixMatches: {},
                scrollAnchor: null ,
                scrollPropertyLeft: null ,
                scrollPropertyTop: null ,
                isTicking: !1,
                calls: []
            },
            CSS: {},
            Utilities: f,
            Redirects: {},
            Easings: {},
            Promise: t.Promise,
            defaults: {
                queue: "",
                duration: y,
                easing: v,
                begin: r,
                complete: r,
                progress: r,
                display: r,
                visibility: r,
                loop: !1,
                delay: !1,
                mobileHA: !0,
                _cacheValues: !0
            },
            init: function(e) {
                f.data(e, "velocity", {
                    isSVG: m.isSVG(e),
                    isAnimating: !1,
                    computedStyle: null ,
                    tweensContainer: null ,
                    rootPropertyValueCache: {},
                    transformCache: {}
                })
            },
            hook: null ,
            mock: !1,
            version: {
                major: 1,
                minor: 2,
                patch: 2
            },
            debug: !1
        };
        t.pageYOffset !== r ? (b.State.scrollAnchor = t,
        b.State.scrollPropertyLeft = "pageXOffset",
        b.State.scrollPropertyTop = "pageYOffset") : (b.State.scrollAnchor = n.documentElement || n.body.parentNode || n.body,
        b.State.scrollPropertyLeft = "scrollLeft",
        b.State.scrollPropertyTop = "scrollTop");
        var w = function() {
            function e(e) {
                return -e.tension * e.x - e.friction * e.v
            }
            function t(t, n, r) {
                var i = {
                    x: t.x + r.dx * n,
                    v: t.v + r.dv * n,
                    tension: t.tension,
                    friction: t.friction
                };
                return {
                    dx: i.v,
                    dv: e(i)
                }
            }
            function n(n, r) {
                var i = {
                    dx: n.v,
                    dv: e(n)
                }
                  , a = t(n, .5 * r, i)
                  , o = t(n, .5 * r, a)
                  , s = t(n, r, o)
                  , u = 1 / 6 * (i.dx + 2 * (a.dx + o.dx) + s.dx)
                  , l = 1 / 6 * (i.dv + 2 * (a.dv + o.dv) + s.dv);
                return n.x = n.x + u * r,
                n.v = n.v + l * r,
                n
            }
            return function r(e, t, i) {
                var a, o, s, u = {
                    x: -1,
                    v: 0,
                    tension: null ,
                    friction: null
                }, l = [0], c = 0, d = 1e-4, f = .016;
                for (e = parseFloat(e) || 500,
                t = parseFloat(t) || 20,
                i = i || null ,
                u.tension = e,
                u.friction = t,
                a = null !== i,
                a ? (c = r(e, t),
                o = c / i * f) : o = f; s = n(s || u, o),
                l.push(1 + s.x),
                c += 16,
                Math.abs(s.x) > d && Math.abs(s.v) > d; )
                    ;
                return a ? function(e) {
                    return l[e * (l.length - 1) | 0]
                }
                : c
            }
        }();
        b.Easings = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            spring: function(e) {
                return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
            }
        },
        f.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function(e, t) {
            b.Easings[t[0]] = u.apply(null , t[1])
        });
        var x = b.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
            },
            Hooks: {
                templates: {
                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                    backgroundPosition: ["X Y", "0% 0%"],
                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                    perspectiveOrigin: ["X Y", "50% 50%"]
                },
                registered: {},
                register: function() {
                    for (var e = 0; e < x.Lists.colors.length; e++) {
                        var t = "color" === x.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                        x.Hooks.templates[x.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                    }
                    var n, r, i;
                    if (h)
                        for (n in x.Hooks.templates) {
                            r = x.Hooks.templates[n],
                            i = r[0].split(" ");
                            var a = r[1].match(x.RegEx.valueSplit);
                            "Color" === i[0] && (i.push(i.shift()),
                            a.push(a.shift()),
                            x.Hooks.templates[n] = [i.join(" "), a.join(" ")])
                        }
                    for (n in x.Hooks.templates) {
                        r = x.Hooks.templates[n],
                        i = r[0].split(" ");
                        for (var e in i) {
                            var o = n + i[e]
                              , s = e;
                            x.Hooks.registered[o] = [n, s]
                        }
                    }
                },
                getRoot: function(e) {
                    var t = x.Hooks.registered[e];
                    return t ? t[0] : e
                },
                cleanRootPropertyValue: function(e, t) {
                    return x.RegEx.valueUnwrap.test(t) && (t = t.match(x.RegEx.valueUnwrap)[1]),
                    x.Values.isCSSNullValue(t) && (t = x.Hooks.templates[e][1]),
                    t
                },
                extractValue: function(e, t) {
                    var n = x.Hooks.registered[e];
                    if (n) {
                        var r = n[0]
                          , i = n[1];
                        return t = x.Hooks.cleanRootPropertyValue(r, t),
                        t.toString().match(x.RegEx.valueSplit)[i]
                    }
                    return t
                },
                injectValue: function(e, t, n) {
                    var r = x.Hooks.registered[e];
                    if (r) {
                        var i, a, o = r[0], s = r[1];
                        return n = x.Hooks.cleanRootPropertyValue(o, n),
                        i = n.toString().match(x.RegEx.valueSplit),
                        i[s] = t,
                        a = i.join(" ")
                    }
                    return n
                }
            },
            Normalizations: {
                registered: {
                    clip: function(e, t, n) {
                        switch (e) {
                        case "name":
                            return "clip";
                        case "extract":
                            var r;
                            return x.RegEx.wrappedValueAlreadyExtracted.test(n) ? r = n : (r = n.toString().match(x.RegEx.valueUnwrap),
                            r = r ? r[1].replace(/,(\s+)?/g, " ") : n),
                            r;
                        case "inject":
                            return "rect(" + n + ")"
                        }
                    },
                    blur: function(e, t, n) {
                        switch (e) {
                        case "name":
                            return b.State.isFirefox ? "filter" : "-webkit-filter";
                        case "extract":
                            var r = parseFloat(n);
                            if (!r && 0 !== r) {
                                var i = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                r = i ? i[1] : 0
                            }
                            return r;
                        case "inject":
                            return parseFloat(n) ? "blur(" + n + ")" : "none"
                        }
                    },
                    opacity: function(e, t, n) {
                        if (8 >= h)
                            switch (e) {
                            case "name":
                                return "filter";
                            case "extract":
                                var r = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                return n = r ? r[1] / 100 : 1;
                            case "inject":
                                return t.style.zoom = 1,
                                parseFloat(n) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(n), 10) + ")"
                            }
                        else
                            switch (e) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return n;
                            case "inject":
                                return n
                            }
                    }
                },
                register: function() {
                    9 >= h || b.State.isGingerbread || (x.Lists.transformsBase = x.Lists.transformsBase.concat(x.Lists.transforms3D));
                    for (var e = 0; e < x.Lists.transformsBase.length; e++)
                        !function() {
                            var t = x.Lists.transformsBase[e];
                            x.Normalizations.registered[t] = function(e, n, i) {
                                switch (e) {
                                case "name":
                                    return "transform";
                                case "extract":
                                    return o(n) === r || o(n).transformCache[t] === r ? /^scale/i.test(t) ? 1 : 0 : o(n).transformCache[t].replace(/[()]/g, "");
                                case "inject":
                                    var a = !1;
                                    switch (t.substr(0, t.length - 1)) {
                                    case "translate":
                                        a = !/(%|px|em|rem|vw|vh|\d)$/i.test(i);
                                        break;
                                    case "scal":
                                    case "scale":
                                        b.State.isAndroid && o(n).transformCache[t] === r && 1 > i && (i = 1),
                                        a = !/(\d)$/i.test(i);
                                        break;
                                    case "skew":
                                        a = !/(deg|\d)$/i.test(i);
                                        break;
                                    case "rotate":
                                        a = !/(deg|\d)$/i.test(i)
                                    }
                                    return a || (o(n).transformCache[t] = "(" + i + ")"),
                                    o(n).transformCache[t]
                                }
                            }
                        }();
                    for (var e = 0; e < x.Lists.colors.length; e++)
                        !function() {
                            var t = x.Lists.colors[e];
                            x.Normalizations.registered[t] = function(e, n, i) {
                                switch (e) {
                                case "name":
                                    return t;
                                case "extract":
                                    var a;
                                    if (x.RegEx.wrappedValueAlreadyExtracted.test(i))
                                        a = i;
                                    else {
                                        var o, s = {
                                            black: "rgb(0, 0, 0)",
                                            blue: "rgb(0, 0, 255)",
                                            gray: "rgb(128, 128, 128)",
                                            green: "rgb(0, 128, 0)",
                                            red: "rgb(255, 0, 0)",
                                            white: "rgb(255, 255, 255)"
                                        };
                                        /^[A-z]+$/i.test(i) ? o = s[i] !== r ? s[i] : s.black : x.RegEx.isHex.test(i) ? o = "rgb(" + x.Values.hexToRgb(i).join(" ") + ")" : /^rgba?\(/i.test(i) || (o = s.black),
                                        a = (o || i).toString().match(x.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                    }
                                    return 8 >= h || 3 !== a.split(" ").length || (a += " 1"),
                                    a;
                                case "inject":
                                    return 8 >= h ? 4 === i.split(" ").length && (i = i.split(/\s+/).slice(0, 3).join(" ")) : 3 === i.split(" ").length && (i += " 1"),
                                    (8 >= h ? "rgb" : "rgba") + "(" + i.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                }
            },
            Names: {
                camelCase: function(e) {
                    return e.replace(/-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    })
                },
                SVGAttribute: function(e) {
                    var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (h || b.State.isAndroid && !b.State.isChrome) && (t += "|transform"),
                    new RegExp("^(" + t + ")$","i").test(e)
                },
                prefixCheck: function(e) {
                    if (b.State.prefixMatches[e])
                        return [b.State.prefixMatches[e], !0];
                    for (var t = ["", "Webkit", "Moz", "ms", "O"], n = 0, r = t.length; r > n; n++) {
                        var i;
                        if (i = 0 === n ? e : t[n] + e.replace(/^\w/, function(e) {
                            return e.toUpperCase()
                        }),
                        m.isString(b.State.prefixElement.style[i]))
                            return b.State.prefixMatches[e] = i,
                            [i, !0]
                    }
                    return [e, !1]
                }
            },
            Values: {
                hexToRgb: function(e) {
                    var t, n = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return e = e.replace(n, function(e, t, n, r) {
                        return t + t + n + n + r + r
                    }),
                    t = r.exec(e),
                    t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                },
                isCSSNullValue: function(e) {
                    return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                },
                getUnitType: function(e) {
                    return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                },
                getDisplayType: function(e) {
                    var t = e && e.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                },
                addClass: function(e, t) {
                    e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                },
                removeClass: function(e, t) {
                    e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)","gi"), " ")
                }
            },
            getPropertyValue: function(e, n, i, a) {
                function s(e, n) {
                    function i() {
                        l && x.setPropertyValue(e, "display", "none")
                    }
                    var u = 0;
                    if (8 >= h)
                        u = f.css(e, n);
                    else {
                        var l = !1;
                        if (/^(width|height)$/.test(n) && 0 === x.getPropertyValue(e, "display") && (l = !0,
                        x.setPropertyValue(e, "display", x.Values.getDisplayType(e))),
                        !a) {
                            if ("height" === n && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var c = e.offsetHeight - (parseFloat(x.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingBottom")) || 0);
                                return i(),
                                c
                            }
                            if ("width" === n && "border-box" !== x.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                var d = e.offsetWidth - (parseFloat(x.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(x.getPropertyValue(e, "paddingRight")) || 0);
                                return i(),
                                d
                            }
                        }
                        var p;
                        p = o(e) === r ? t.getComputedStyle(e, null ) : o(e).computedStyle ? o(e).computedStyle : o(e).computedStyle = t.getComputedStyle(e, null ),
                        "borderColor" === n && (n = "borderTopColor"),
                        u = 9 === h && "filter" === n ? p.getPropertyValue(n) : p[n],
                        ("" === u || null === u) && (u = e.style[n]),
                        i()
                    }
                    if ("auto" === u && /^(top|right|bottom|left)$/i.test(n)) {
                        var m = s(e, "position");
                        ("fixed" === m || "absolute" === m && /top|left/i.test(n)) && (u = f(e).position()[n] + "px")
                    }
                    return u
                }
                var u;
                if (x.Hooks.registered[n]) {
                    var l = n
                      , c = x.Hooks.getRoot(l);
                    i === r && (i = x.getPropertyValue(e, x.Names.prefixCheck(c)[0])),
                    x.Normalizations.registered[c] && (i = x.Normalizations.registered[c]("extract", e, i)),
                    u = x.Hooks.extractValue(l, i)
                } else if (x.Normalizations.registered[n]) {
                    var d, p;
                    d = x.Normalizations.registered[n]("name", e),
                    "transform" !== d && (p = s(e, x.Names.prefixCheck(d)[0]),
                    x.Values.isCSSNullValue(p) && x.Hooks.templates[n] && (p = x.Hooks.templates[n][1])),
                    u = x.Normalizations.registered[n]("extract", e, p)
                }
                if (!/^[\d-]/.test(u))
                    if (o(e) && o(e).isSVG && x.Names.SVGAttribute(n))
                        if (/^(height|width)$/i.test(n))
                            try {
                                u = e.getBBox()[n]
                            } catch (m) {
                                u = 0
                            }
                        else
                            u = e.getAttribute(n);
                    else
                        u = s(e, x.Names.prefixCheck(n)[0]);
                return x.Values.isCSSNullValue(u) && (u = 0),
                b.debug >= 2 && console.log("Get " + n + ": " + u),
                u
            },
            setPropertyValue: function(e, n, r, i, a) {
                var s = n;
                if ("scroll" === n)
                    a.container ? a.container["scroll" + a.direction] = r : "Left" === a.direction ? t.scrollTo(r, a.alternateValue) : t.scrollTo(a.alternateValue, r);
                else if (x.Normalizations.registered[n] && "transform" === x.Normalizations.registered[n]("name", e))
                    x.Normalizations.registered[n]("inject", e, r),
                    s = "transform",
                    r = o(e).transformCache[n];
                else {
                    if (x.Hooks.registered[n]) {
                        var u = n
                          , l = x.Hooks.getRoot(n);
                        i = i || x.getPropertyValue(e, l),
                        r = x.Hooks.injectValue(u, r, i),
                        n = l
                    }
                    if (x.Normalizations.registered[n] && (r = x.Normalizations.registered[n]("inject", e, r),
                    n = x.Normalizations.registered[n]("name", e)),
                    s = x.Names.prefixCheck(n)[0],
                    8 >= h)
                        try {
                            e.style[s] = r
                        } catch (c) {
                            b.debug && console.log("Browser does not support [" + r + "] for [" + s + "]")
                        }
                    else
                        o(e) && o(e).isSVG && x.Names.SVGAttribute(n) ? e.setAttribute(n, r) : e.style[s] = r;
                    b.debug >= 2 && console.log("Set " + n + " (" + s + "): " + r)
                }
                return [s, r]
            },
            flushTransformCache: function(e) {
                function t(t) {
                    return parseFloat(x.getPropertyValue(e, t))
                }
                var n = "";
                if ((h || b.State.isAndroid && !b.State.isChrome) && o(e).isSVG) {
                    var r = {
                        translate: [t("translateX"), t("translateY")],
                        skewX: [t("skewX")],
                        skewY: [t("skewY")],
                        scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                        rotate: [t("rotateZ"), 0, 0]
                    };
                    f.each(o(e).transformCache, function(e) {
                        /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"),
                        r[e] && (n += e + "(" + r[e].join(" ") + ") ",
                        delete r[e])
                    })
                } else {
                    var i, a;
                    f.each(o(e).transformCache, function(t) {
                        return i = o(e).transformCache[t],
                        "transformPerspective" === t ? (a = i,
                        !0) : (9 === h && "rotateZ" === t && (t = "rotate"),
                        void (n += t + i + " "))
                    }),
                    a && (n = "perspective" + a + " " + n)
                }
                x.setPropertyValue(e, "transform", n)
            }
        };
        x.Hooks.register(),
        x.Normalizations.register(),
        b.hook = function(e, t, n) {
            var i = r;
            return e = a(e),
            f.each(e, function(e, a) {
                if (o(a) === r && b.init(a),
                n === r)
                    i === r && (i = b.CSS.getPropertyValue(a, t));
                else {
                    var s = b.CSS.setPropertyValue(a, t, n);
                    "transform" === s[0] && b.CSS.flushTransformCache(a),
                    i = s
                }
            }),
            i
        }
        ;
        var T = function() {
            function e() {
                return s ? C.promise || null : u
            }
            function i() {
                function e() {
                    function e(e, t) {
                        var n = r
                          , i = r
                          , o = r;
                        return m.isArray(e) ? (n = e[0],
                        !m.isArray(e[1]) && /^[\d-]/.test(e[1]) || m.isFunction(e[1]) || x.RegEx.isHex.test(e[1]) ? o = e[1] : (m.isString(e[1]) && !x.RegEx.isHex.test(e[1]) || m.isArray(e[1])) && (i = t ? e[1] : l(e[1], s.duration),
                        e[2] !== r && (o = e[2]))) : n = e,
                        t || (i = i || s.easing),
                        m.isFunction(n) && (n = n.call(a, S, _)),
                        m.isFunction(o) && (o = o.call(a, S, _)),
                        [n || 0, i, o]
                    }
                    function d(e, t) {
                        var n, r;
                        return r = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                            return n = e,
                            ""
                        }),
                        n || (n = x.Values.getUnitType(e)),
                        [r, n]
                    }
                    function h() {
                        var e = {
                            myParent: a.parentNode || n.body,
                            position: x.getPropertyValue(a, "position"),
                            fontSize: x.getPropertyValue(a, "fontSize")
                        }
                          , r = e.position === A.lastPosition && e.myParent === A.lastParent
                          , i = e.fontSize === A.lastFontSize;
                        A.lastParent = e.myParent,
                        A.lastPosition = e.position,
                        A.lastFontSize = e.fontSize;
                        var s = 100
                          , u = {};
                        if (i && r)
                            u.emToPx = A.lastEmToPx,
                            u.percentToPxWidth = A.lastPercentToPxWidth,
                            u.percentToPxHeight = A.lastPercentToPxHeight;
                        else {
                            var l = o(a).isSVG ? n.createElementNS("http://www.w3.org/2000/svg", "rect") : n.createElement("div");
                            b.init(l),
                            e.myParent.appendChild(l),
                            f.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                                b.CSS.setPropertyValue(l, t, "hidden")
                            }),
                            b.CSS.setPropertyValue(l, "position", e.position),
                            b.CSS.setPropertyValue(l, "fontSize", e.fontSize),
                            b.CSS.setPropertyValue(l, "boxSizing", "content-box"),
                            f.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                                b.CSS.setPropertyValue(l, t, s + "%")
                            }),
                            b.CSS.setPropertyValue(l, "paddingLeft", s + "em"),
                            u.percentToPxWidth = A.lastPercentToPxWidth = (parseFloat(x.getPropertyValue(l, "width", null , !0)) || 1) / s,
                            u.percentToPxHeight = A.lastPercentToPxHeight = (parseFloat(x.getPropertyValue(l, "height", null , !0)) || 1) / s,
                            u.emToPx = A.lastEmToPx = (parseFloat(x.getPropertyValue(l, "paddingLeft")) || 1) / s,
                            e.myParent.removeChild(l)
                        }
                        return null === A.remToPx && (A.remToPx = parseFloat(x.getPropertyValue(n.body, "fontSize")) || 16),
                        null === A.vwToPx && (A.vwToPx = parseFloat(t.innerWidth) / 100,
                        A.vhToPx = parseFloat(t.innerHeight) / 100),
                        u.remToPx = A.remToPx,
                        u.vwToPx = A.vwToPx,
                        u.vhToPx = A.vhToPx,
                        b.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(u), a),
                        u
                    }
                    if (s.begin && 0 === S)
                        try {
                            s.begin.call(p, p)
                        } catch (y) {
                            setTimeout(function() {
                                throw y
                            }, 1)
                        }
                    if ("scroll" === M) {
                        var w, T, D, k = /^x$/i.test(s.axis) ? "Left" : "Top", E = parseFloat(s.offset) || 0;
                        s.container ? m.isWrapped(s.container) || m.isNode(s.container) ? (s.container = s.container[0] || s.container,
                        w = s.container["scroll" + k],
                        D = w + f(a).position()[k.toLowerCase()] + E) : s.container = null : (w = b.State.scrollAnchor[b.State["scrollProperty" + k]],
                        T = b.State.scrollAnchor[b.State["scrollProperty" + ("Left" === k ? "Top" : "Left")]],
                        D = f(a).offset()[k.toLowerCase()] + E),
                        u = {
                            scroll: {
                                rootPropertyValue: !1,
                                startValue: w,
                                currentValue: w,
                                endValue: D,
                                unitType: "",
                                easing: s.easing,
                                scrollData: {
                                    container: s.container,
                                    direction: k,
                                    alternateValue: T
                                }
                            },
                            element: a
                        },
                        b.debug && console.log("tweensContainer (scroll): ", u.scroll, a)
                    } else if ("reverse" === M) {
                        if (!o(a).tweensContainer)
                            return void f.dequeue(a, s.queue);
                        "none" === o(a).opts.display && (o(a).opts.display = "auto"),
                        "hidden" === o(a).opts.visibility && (o(a).opts.visibility = "visible"),
                        o(a).opts.loop = !1,
                        o(a).opts.begin = null ,
                        o(a).opts.complete = null ,
                        v.easing || delete s.easing,
                        v.duration || delete s.duration,
                        s = f.extend({}, o(a).opts, s);
                        var Y = f.extend(!0, {}, o(a).tweensContainer);
                        for (var P in Y)
                            if ("element" !== P) {
                                var O = Y[P].startValue;
                                Y[P].startValue = Y[P].currentValue = Y[P].endValue,
                                Y[P].endValue = O,
                                m.isEmptyObject(v) || (Y[P].easing = s.easing),
                                b.debug && console.log("reverse tweensContainer (" + P + "): " + JSON.stringify(Y[P]), a)
                            }
                        u = Y
                    } else if ("start" === M) {
                        var Y;
                        o(a).tweensContainer && o(a).isAnimating === !0 && (Y = o(a).tweensContainer),
                        f.each(g, function(t, n) {
                            if (RegExp("^" + x.Lists.colors.join("$|^") + "$").test(t)) {
                                var i = e(n, !0)
                                  , a = i[0]
                                  , o = i[1]
                                  , s = i[2];
                                if (x.RegEx.isHex.test(a)) {
                                    for (var u = ["Red", "Green", "Blue"], l = x.Values.hexToRgb(a), c = s ? x.Values.hexToRgb(s) : r, d = 0; d < u.length; d++) {
                                        var f = [l[d]];
                                        o && f.push(o),
                                        c !== r && f.push(c[d]),
                                        g[t + u[d]] = f
                                    }
                                    delete g[t]
                                }
                            }
                        });
                        for (var N in g) {
                            var I = e(g[N])
                              , L = I[0]
                              , H = I[1]
                              , $ = I[2];
                            N = x.Names.camelCase(N);
                            var j = x.Hooks.getRoot(N)
                              , W = !1;
                            if (o(a).isSVG || "tween" === j || x.Names.prefixCheck(j)[1] !== !1 || x.Normalizations.registered[j] !== r) {
                                (s.display !== r && null !== s.display && "none" !== s.display || s.visibility !== r && "hidden" !== s.visibility) && /opacity|filter/.test(N) && !$ && 0 !== L && ($ = 0),
                                s._cacheValues && Y && Y[N] ? ($ === r && ($ = Y[N].endValue + Y[N].unitType),
                                W = o(a).rootPropertyValueCache[j]) : x.Hooks.registered[N] ? $ === r ? (W = x.getPropertyValue(a, j),
                                $ = x.getPropertyValue(a, N, W)) : W = x.Hooks.templates[j][1] : $ === r && ($ = x.getPropertyValue(a, N));
                                var R, V, U, X = !1;
                                if (R = d(N, $),
                                $ = R[0],
                                U = R[1],
                                R = d(N, L),
                                L = R[0].replace(/^([+-\/*])=/, function(e, t) {
                                    return X = t,
                                    ""
                                }),
                                V = R[1],
                                $ = parseFloat($) || 0,
                                L = parseFloat(L) || 0,
                                "%" === V && (/^(fontSize|lineHeight)$/.test(N) ? (L /= 100,
                                V = "em") : /^scale/.test(N) ? (L /= 100,
                                V = "") : /(Red|Green|Blue)$/i.test(N) && (L = L / 100 * 255,
                                V = "")),
                                /[\/*]/.test(X))
                                    V = U;
                                else if (U !== V && 0 !== $)
                                    if (0 === L)
                                        V = U;
                                    else {
                                        i = i || h();
                                        var q = /margin|padding|left|right|width|text|word|letter/i.test(N) || /X$/.test(N) || "x" === N ? "x" : "y";
                                        switch (U) {
                                        case "%":
                                            $ *= "x" === q ? i.percentToPxWidth : i.percentToPxHeight;
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            $ *= i[U + "ToPx"]
                                        }
                                        switch (V) {
                                        case "%":
                                            $ *= 1 / ("x" === q ? i.percentToPxWidth : i.percentToPxHeight);
                                            break;
                                        case "px":
                                            break;
                                        default:
                                            $ *= 1 / i[V + "ToPx"]
                                        }
                                    }
                                switch (X) {
                                case "+":
                                    L = $ + L;
                                    break;
                                case "-":
                                    L = $ - L;
                                    break;
                                case "*":
                                    L = $ * L;
                                    break;
                                case "/":
                                    L = $ / L
                                }
                                u[N] = {
                                    rootPropertyValue: W,
                                    startValue: $,
                                    currentValue: $,
                                    endValue: L,
                                    unitType: V,
                                    easing: H
                                },
                                b.debug && console.log("tweensContainer (" + N + "): " + JSON.stringify(u[N]), a)
                            } else
                                b.debug && console.log("Skipping [" + j + "] due to a lack of browser support.")
                        }
                        u.element = a
                    }
                    u.element && (x.Values.addClass(a, "velocity-animating"),
                    F.push(u),
                    "" === s.queue && (o(a).tweensContainer = u,
                    o(a).opts = s),
                    o(a).isAnimating = !0,
                    S === _ - 1 ? (b.State.calls.push([F, p, s, null , C.resolver]),
                    b.State.isTicking === !1 && (b.State.isTicking = !0,
                    c())) : S++)
                }
                var i, a = this, s = f.extend({}, b.defaults, v), u = {};
                switch (o(a) === r && b.init(a),
                parseFloat(s.delay) && s.queue !== !1 && f.queue(a, s.queue, function(e) {
                    b.velocityQueueEntryFlag = !0,
                    o(a).delayTimer = {
                        setTimeout: setTimeout(e, parseFloat(s.delay)),
                        next: e
                    }
                }),
                s.duration.toString().toLowerCase()) {
                case "fast":
                    s.duration = 200;
                    break;
                case "normal":
                    s.duration = y;
                    break;
                case "slow":
                    s.duration = 600;
                    break;
                default:
                    s.duration = parseFloat(s.duration) || 1
                }
                b.mock !== !1 && (b.mock === !0 ? s.duration = s.delay = 1 : (s.duration *= parseFloat(b.mock) || 1,
                s.delay *= parseFloat(b.mock) || 1)),
                s.easing = l(s.easing, s.duration),
                s.begin && !m.isFunction(s.begin) && (s.begin = null ),
                s.progress && !m.isFunction(s.progress) && (s.progress = null ),
                s.complete && !m.isFunction(s.complete) && (s.complete = null ),
                s.display !== r && null !== s.display && (s.display = s.display.toString().toLowerCase(),
                "auto" === s.display && (s.display = b.CSS.Values.getDisplayType(a))),
                s.visibility !== r && null !== s.visibility && (s.visibility = s.visibility.toString().toLowerCase()),
                s.mobileHA = s.mobileHA && b.State.isMobile && !b.State.isGingerbread,
                s.queue === !1 ? s.delay ? setTimeout(e, s.delay) : e() : f.queue(a, s.queue, function(t, n) {
                    return n === !0 ? (C.promise && C.resolver(p),
                    !0) : (b.velocityQueueEntryFlag = !0,
                    void e(t))
                }),
                "" !== s.queue && "fx" !== s.queue || "inprogress" === f.queue(a)[0] || f.dequeue(a)
            }
            var s, u, h, p, g, v, w = arguments[0] && (arguments[0].p || f.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || m.isString(arguments[0].properties));
            if (m.isWrapped(this) ? (s = !1,
            h = 0,
            p = this,
            u = this) : (s = !0,
            h = 1,
            p = w ? arguments[0].elements || arguments[0].e : arguments[0]),
            p = a(p)) {
                w ? (g = arguments[0].properties || arguments[0].p,
                v = arguments[0].options || arguments[0].o) : (g = arguments[h],
                v = arguments[h + 1]);
                var _ = p.length
                  , S = 0;
                if (!/^(stop|finish|finishAll)$/i.test(g) && !f.isPlainObject(v)) {
                    var D = h + 1;
                    v = {};
                    for (var k = D; k < arguments.length; k++)
                        m.isArray(arguments[k]) || !/^(fast|normal|slow)$/i.test(arguments[k]) && !/^\d/.test(arguments[k]) ? m.isString(arguments[k]) || m.isArray(arguments[k]) ? v.easing = arguments[k] : m.isFunction(arguments[k]) && (v.complete = arguments[k]) : v.duration = arguments[k]
                }
                var C = {
                    promise: null ,
                    resolver: null ,
                    rejecter: null
                };
                s && b.Promise && (C.promise = new b.Promise(function(e, t) {
                    C.resolver = e,
                    C.rejecter = t
                }
                ));
                var M;
                switch (g) {
                case "scroll":
                    M = "scroll";
                    break;
                case "reverse":
                    M = "reverse";
                    break;
                case "finish":
                case "finishAll":
                case "stop":
                    f.each(p, function(e, t) {
                        o(t) && o(t).delayTimer && (clearTimeout(o(t).delayTimer.setTimeout),
                        o(t).delayTimer.next && o(t).delayTimer.next(),
                        delete o(t).delayTimer),
                        "finishAll" !== g || v !== !0 && !m.isString(v) || (f.each(f.queue(t, m.isString(v) ? v : ""), function(e, t) {
                            m.isFunction(t) && t()
                        }),
                        f.queue(t, m.isString(v) ? v : "", []))
                    });
                    var E = [];
                    return f.each(b.State.calls, function(e, t) {
                        t && f.each(t[1], function(n, i) {
                            var a = v === r ? "" : v;
                            return a === !0 || t[2].queue === a || v === r && t[2].queue === !1 ? void f.each(p, function(n, r) {
                                r === i && ((v === !0 || m.isString(v)) && (f.each(f.queue(r, m.isString(v) ? v : ""), function(e, t) {
                                    m.isFunction(t) && t(null , !0)
                                }),
                                f.queue(r, m.isString(v) ? v : "", [])),
                                "stop" === g ? (o(r) && o(r).tweensContainer && a !== !1 && f.each(o(r).tweensContainer, function(e, t) {
                                    t.endValue = t.currentValue
                                }),
                                E.push(e)) : ("finish" === g || "finishAll" === g) && (t[2].duration = 1))
                            }) : !0
                        })
                    }),
                    "stop" === g && (f.each(E, function(e, t) {
                        d(t, !0)
                    }),
                    C.promise && C.resolver(p)),
                    e();
                default:
                    if (!f.isPlainObject(g) || m.isEmptyObject(g)) {
                        if (m.isString(g) && b.Redirects[g]) {
                            var Y = f.extend({}, v)
                              , P = Y.duration
                              , O = Y.delay || 0;
                            return Y.backwards === !0 && (p = f.extend(!0, [], p).reverse()),
                            f.each(p, function(e, t) {
                                parseFloat(Y.stagger) ? Y.delay = O + parseFloat(Y.stagger) * e : m.isFunction(Y.stagger) && (Y.delay = O + Y.stagger.call(t, e, _)),
                                Y.drag && (Y.duration = parseFloat(P) || (/^(callout|transition)/.test(g) ? 1e3 : y),
                                Y.duration = Math.max(Y.duration * (Y.backwards ? 1 - e / _ : (e + 1) / _), .75 * Y.duration, 200)),
                                b.Redirects[g].call(t, t, Y || {}, e, _, p, C.promise ? C : r)
                            }),
                            e()
                        }
                        var N = "Velocity: First argument (" + g + ") was not a property map, a known action, or a registered redirect. Aborting.";
                        return C.promise ? C.rejecter(new Error(N)) : console.log(N),
                        e()
                    }
                    M = "start"
                }
                var A = {
                    lastParent: null ,
                    lastPosition: null ,
                    lastFontSize: null ,
                    lastPercentToPxWidth: null ,
                    lastPercentToPxHeight: null ,
                    lastEmToPx: null ,
                    remToPx: null ,
                    vwToPx: null ,
                    vhToPx: null
                }
                  , F = [];
                f.each(p, function(e, t) {
                    m.isNode(t) && i.call(t)
                });
                var I, Y = f.extend({}, b.defaults, v);
                if (Y.loop = parseInt(Y.loop),
                I = 2 * Y.loop - 1,
                Y.loop)
                    for (var L = 0; I > L; L++) {
                        var H = {
                            delay: Y.delay,
                            progress: Y.progress
                        };
                        L === I - 1 && (H.display = Y.display,
                        H.visibility = Y.visibility,
                        H.complete = Y.complete),
                        T(p, "reverse", H)
                    }
                return e()
            }
        }
        ;
        b = f.extend(T, b),
        b.animate = T;
        var _ = t.requestAnimationFrame || p;
        return b.State.isMobile || n.hidden === r || n.addEventListener("visibilitychange", function() {
            n.hidden ? (_ = function(e) {
                return setTimeout(function() {
                    e(!0)
                }, 16)
            }
            ,
            c()) : _ = t.requestAnimationFrame || p
        }),
        e.Velocity = b,
        e !== t && (e.fn.velocity = T,
        e.fn.velocity.defaults = b.defaults),
        f.each(["Down", "Up"], function(e, t) {
            b.Redirects["slide" + t] = function(e, n, i, a, o, s) {
                var u = f.extend({}, n)
                  , l = u.begin
                  , c = u.complete
                  , d = {
                    height: "",
                    marginTop: "",
                    marginBottom: "",
                    paddingTop: "",
                    paddingBottom: ""
                }
                  , h = {};
                u.display === r && (u.display = "Down" === t ? "inline" === b.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"),
                u.begin = function() {
                    l && l.call(o, o);
                    for (var n in d) {
                        h[n] = e.style[n];
                        var r = b.CSS.getPropertyValue(e, n);
                        d[n] = "Down" === t ? [r, 0] : [0, r]
                    }
                    h.overflow = e.style.overflow,
                    e.style.overflow = "hidden"
                }
                ,
                u.complete = function() {
                    for (var t in h)
                        e.style[t] = h[t];
                    c && c.call(o, o),
                    s && s.resolver(o)
                }
                ,
                b(e, d, u)
            }
        }),
        f.each(["In", "Out"], function(e, t) {
            b.Redirects["fade" + t] = function(e, n, i, a, o, s) {
                var u = f.extend({}, n)
                  , l = {
                    opacity: "In" === t ? 1 : 0
                }
                  , c = u.complete;
                u.complete = i !== a - 1 ? u.begin = null : function() {
                    c && c.call(o, o),
                    s && s.resolver(o)
                }
                ,
                u.display === r && (u.display = "In" === t ? "auto" : "none"),
                b(this, l, u)
            }
        }),
        b
    }(window.jQuery || window.Zepto || window, window, document)
}),
!function(e) {
    "function" == typeof require && "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(["velocity"], e) : e()
}(function() {
    return function(e, t, n, r) {
        function i(e, t) {
            var n = [];
            return e && t ? (o.each([e, t], function(e, t) {
                var r = [];
                o.each(t, function(e, t) {
                    for (; t.toString().length < 5; )
                        t = "0" + t;
                    r.push(t)
                }),
                n.push(r.join(""))
            }),
            parseFloat(n[0]) > parseFloat(n[1])) : !1
        }
        if (!e.Velocity || !e.Velocity.Utilities)
            return void (t.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
        var a = e.Velocity
          , o = a.Utilities
          , s = a.version
          , u = {
            major: 1,
            minor: 1,
            patch: 0
        };
        if (i(u, s)) {
            var l = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
            throw alert(l),
            new Error(l)
        }
        a.RegisterEffect = a.RegisterUI = function(e, t) {
            function n(e, t, n, r) {
                var i, s = 0;
                o.each(e.nodeType ? [e] : e, function(e, t) {
                    r && (n += e * r),
                    i = t.parentNode,
                    o.each(["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function(e, n) {
                        s += parseFloat(a.CSS.getPropertyValue(t, n))
                    })
                }),
                a.animate(i, {
                    height: ("In" === t ? "+" : "-") + "=" + s
                }, {
                    queue: !1,
                    easing: "ease-in-out",
                    duration: n * ("In" === t ? .6 : 1)
                })
            }
            return a.Redirects[e] = function(i, s, u, l, c, d) {
                function f() {
                    s.display !== r && "none" !== s.display || !/Out$/.test(e) || o.each(c.nodeType ? [c] : c, function(e, t) {
                        a.CSS.setPropertyValue(t, "display", "none")
                    }),
                    s.complete && s.complete.call(c, c),
                    d && d.resolver(c || i)
                }
                var h = u === l - 1;
                t.defaultDuration = "function" == typeof t.defaultDuration ? t.defaultDuration.call(c, c) : parseFloat(t.defaultDuration);
                for (var p = 0; p < t.calls.length; p++) {
                    var m = t.calls[p]
                      , g = m[0]
                      , y = s.duration || t.defaultDuration || 1e3
                      , v = m[1]
                      , b = m[2] || {}
                      , w = {};
                    if (w.duration = y * (v || 1),
                    w.queue = s.queue || "",
                    w.easing = b.easing || "ease",
                    w.delay = parseFloat(b.delay) || 0,
                    w._cacheValues = b._cacheValues || !0,
                    0 === p) {
                        if (w.delay += parseFloat(s.delay) || 0,
                        0 === u && (w.begin = function() {
                            s.begin && s.begin.call(c, c);
                            var t = e.match(/(In|Out)$/);
                            t && "In" === t[0] && g.opacity !== r && o.each(c.nodeType ? [c] : c, function(e, t) {
                                a.CSS.setPropertyValue(t, "opacity", 0)
                            }),
                            s.animateParentHeight && t && n(c, t[0], y + w.delay, s.stagger)
                        }
                        ),
                        null !== s.display)
                            if (s.display !== r && "none" !== s.display)
                                w.display = s.display;
                            else if (/In$/.test(e)) {
                                var x = a.CSS.Values.getDisplayType(i);
                                w.display = "inline" === x ? "inline-block" : x
                            }
                        s.visibility && "hidden" !== s.visibility && (w.visibility = s.visibility)
                    }
                    p === t.calls.length - 1 && (w.complete = function() {
                        if (t.reset) {
                            for (var e in t.reset) {
                                var n = t.reset[e];
                                a.CSS.Hooks.registered[e] !== r || "string" != typeof n && "number" != typeof n || (t.reset[e] = [t.reset[e], t.reset[e]])
                            }
                            var o = {
                                duration: 0,
                                queue: !1
                            };
                            h && (o.complete = f),
                            a.animate(i, t.reset, o)
                        } else
                            h && f()
                    }
                    ,
                    "hidden" === s.visibility && (w.visibility = s.visibility)),
                    a.animate(i, g, w)
                }
            }
            ,
            a
        }
        ,
        a.RegisterEffect.packagedEffects = {
            "callout.bounce": {
                defaultDuration: 550,
                calls: [[{
                    translateY: -30
                }, .25], [{
                    translateY: 0
                }, .125], [{
                    translateY: -15
                }, .125], [{
                    translateY: 0
                }, .25]]
            },
            "callout.shake": {
                defaultDuration: 800,
                calls: [[{
                    translateX: -11
                }, .125], [{
                    translateX: 11
                }, .125], [{
                    translateX: -11
                }, .125], [{
                    translateX: 11
                }, .125], [{
                    translateX: -11
                }, .125], [{
                    translateX: 11
                }, .125], [{
                    translateX: -11
                }, .125], [{
                    translateX: 0
                }, .125]]
            },
            "callout.flash": {
                defaultDuration: 1100,
                calls: [[{
                    opacity: [0, "easeInOutQuad", 1]
                }, .25], [{
                    opacity: [1, "easeInOutQuad"]
                }, .25], [{
                    opacity: [0, "easeInOutQuad"]
                }, .25], [{
                    opacity: [1, "easeInOutQuad"]
                }, .25]]
            },
            "callout.pulse": {
                defaultDuration: 825,
                calls: [[{
                    scaleX: 1.1,
                    scaleY: 1.1
                }, .5, {
                    easing: "easeInExpo"
                }], [{
                    scaleX: 1,
                    scaleY: 1
                }, .5]]
            },
            "callout.swing": {
                defaultDuration: 950,
                calls: [[{
                    rotateZ: 15
                }, .2], [{
                    rotateZ: -10
                }, .2], [{
                    rotateZ: 5
                }, .2], [{
                    rotateZ: -5
                }, .2], [{
                    rotateZ: 0
                }, .2]]
            },
            "callout.tada": {
                defaultDuration: 1e3,
                calls: [[{
                    scaleX: .9,
                    scaleY: .9,
                    rotateZ: -3
                }, .1], [{
                    scaleX: 1.1,
                    scaleY: 1.1,
                    rotateZ: 3
                }, .1], [{
                    scaleX: 1.1,
                    scaleY: 1.1,
                    rotateZ: -3
                }, .1], ["reverse", .125], ["reverse", .125], ["reverse", .125], ["reverse", .125], ["reverse", .125], [{
                    scaleX: 1,
                    scaleY: 1,
                    rotateZ: 0
                }, .2]]
            },
            "transition.fadeIn": {
                defaultDuration: 500,
                calls: [[{
                    opacity: [1, 0]
                }]]
            },
            "transition.fadeOut": {
                defaultDuration: 500,
                calls: [[{
                    opacity: [0, 1]
                }]]
            },
            "transition.flipXIn": {
                defaultDuration: 700,
                calls: [[{
                    opacity: [1, 0],
                    transformPerspective: [800, 800],
                    rotateY: [0, -55]
                }]],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipXOut": {
                defaultDuration: 700,
                calls: [[{
                    opacity: [0, 1],
                    transformPerspective: [800, 800],
                    rotateY: 55
                }]],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipYIn": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [1, 0],
                    transformPerspective: [800, 800],
                    rotateX: [0, -45]
                }]],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipYOut": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [0, 1],
                    transformPerspective: [800, 800],
                    rotateX: 25
                }]],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.flipBounceXIn": {
                defaultDuration: 900,
                calls: [[{
                    opacity: [.725, 0],
                    transformPerspective: [400, 400],
                    rotateY: [-10, 90]
                }, .5], [{
                    opacity: .8,
                    rotateY: 10
                }, .25], [{
                    opacity: 1,
                    rotateY: 0
                }, .25]],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceXOut": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [.9, 1],
                    transformPerspective: [400, 400],
                    rotateY: -10
                }, .5], [{
                    opacity: 0,
                    rotateY: 90
                }, .5]],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipBounceYIn": {
                defaultDuration: 850,
                calls: [[{
                    opacity: [.725, 0],
                    transformPerspective: [400, 400],
                    rotateX: [-10, 90]
                }, .5], [{
                    opacity: .8,
                    rotateX: 10
                }, .25], [{
                    opacity: 1,
                    rotateX: 0
                }, .25]],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceYOut": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [.9, 1],
                    transformPerspective: [400, 400],
                    rotateX: -15
                }, .5], [{
                    opacity: 0,
                    rotateX: 90
                }, .5]],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.swoopIn": {
                defaultDuration: 850,
                calls: [[{
                    opacity: [1, 0],
                    transformOriginX: ["100%", "50%"],
                    transformOriginY: ["100%", "100%"],
                    scaleX: [1, 0],
                    scaleY: [1, 0],
                    translateX: [0, -700],
                    translateZ: 0
                }]],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.swoopOut": {
                defaultDuration: 850,
                calls: [[{
                    opacity: [0, 1],
                    transformOriginX: ["50%", "100%"],
                    transformOriginY: ["100%", "100%"],
                    scaleX: 0,
                    scaleY: 0,
                    translateX: -700,
                    translateZ: 0
                }]],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 0
                }
            },
            "transition.whirlIn": {
                defaultDuration: 850,
                calls: [[{
                    opacity: [1, 0],
                    transformOriginX: ["50%", "50%"],
                    transformOriginY: ["50%", "50%"],
                    scaleX: [1, 0],
                    scaleY: [1, 0],
                    rotateY: [0, 160]
                }, 1, {
                    easing: "easeInOutSine"
                }]]
            },
            "transition.whirlOut": {
                defaultDuration: 750,
                calls: [[{
                    opacity: [0, "easeInOutQuint", 1],
                    transformOriginX: ["50%", "50%"],
                    transformOriginY: ["50%", "50%"],
                    scaleX: 0,
                    scaleY: 0,
                    rotateY: 160
                }, 1, {
                    easing: "swing"
                }]],
                reset: {
                    scaleX: 1,
                    scaleY: 1,
                    rotateY: 0
                }
            },
            "transition.shrinkIn": {
                defaultDuration: 750,
                calls: [[{
                    opacity: [1, 0],
                    transformOriginX: ["50%", "50%"],
                    transformOriginY: ["50%", "50%"],
                    scaleX: [1, 1.5],
                    scaleY: [1, 1.5],
                    translateZ: 0
                }]]
            },
            "transition.shrinkOut": {
                defaultDuration: 600,
                calls: [[{
                    opacity: [0, 1],
                    transformOriginX: ["50%", "50%"],
                    transformOriginY: ["50%", "50%"],
                    scaleX: 1.3,
                    scaleY: 1.3,
                    translateZ: 0
                }]],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.expandIn": {
                defaultDuration: 700,
                calls: [[{
                    opacity: [1, 0],
                    transformOriginX: ["50%", "50%"],
                    transformOriginY: ["50%", "50%"],
                    scaleX: [1, .625],
                    scaleY: [1, .625],
                    translateZ: 0
                }]]
            },
            "transition.expandOut": {
                defaultDuration: 700,
                calls: [[{
                    opacity: [0, 1],
                    transformOriginX: ["50%", "50%"],
                    transformOriginY: ["50%", "50%"],
                    scaleX: .5,
                    scaleY: .5,
                    translateZ: 0
                }]],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceIn": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [1, 0],
                    scaleX: [1.05, .3],
                    scaleY: [1.05, .3]
                }, .4], [{
                    scaleX: .9,
                    scaleY: .9,
                    translateZ: 0
                }, .2], [{
                    scaleX: 1,
                    scaleY: 1
                }, .5]]
            },
            "transition.bounceOut": {
                defaultDuration: 800,
                calls: [[{
                    scaleX: .95,
                    scaleY: .95
                }, .35], [{
                    scaleX: 1.1,
                    scaleY: 1.1,
                    translateZ: 0
                }, .35], [{
                    opacity: [0, 1],
                    scaleX: .3,
                    scaleY: .3
                }, .3]],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceUpIn": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [1, 0],
                    translateY: [-30, 1e3]
                }, .6, {
                    easing: "easeOutCirc"
                }], [{
                    translateY: 10
                }, .2], [{
                    translateY: 0
                }, .2]]
            },
            "transition.bounceUpOut": {
                defaultDuration: 1e3,
                calls: [[{
                    translateY: 20
                }, .2], [{
                    opacity: [0, "easeInCirc", 1],
                    translateY: -1e3
                }, .8]],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceDownIn": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [1, 0],
                    translateY: [30, -1e3]
                }, .6, {
                    easing: "easeOutCirc"
                }], [{
                    translateY: -10
                }, .2], [{
                    translateY: 0
                }, .2]]
            },
            "transition.bounceDownOut": {
                defaultDuration: 1e3,
                calls: [[{
                    translateY: -20
                }, .2], [{
                    opacity: [0, "easeInCirc", 1],
                    translateY: 1e3
                }, .8]],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceLeftIn": {
                defaultDuration: 750,
                calls: [[{
                    opacity: [1, 0],
                    translateX: [30, -1250]
                }, .6, {
                    easing: "easeOutCirc"
                }], [{
                    translateX: -10
                }, .2], [{
                    translateX: 0
                }, .2]]
            },
            "transition.bounceLeftOut": {
                defaultDuration: 750,
                calls: [[{
                    translateX: 30
                }, .2], [{
                    opacity: [0, "easeInCirc", 1],
                    translateX: -1250
                }, .8]],
                reset: {
                    translateX: 0
                }
            },
            "transition.bounceRightIn": {
                defaultDuration: 750,
                calls: [[{
                    opacity: [1, 0],
                    translateX: [-30, 1250]
                }, .6, {
                    easing: "easeOutCirc"
                }], [{
                    translateX: 10
                }, .2], [{
                    translateX: 0
                }, .2]]
            },
            "transition.bounceRightOut": {
                defaultDuration: 750,
                calls: [[{
                    translateX: -30
                }, .2], [{
                    opacity: [0, "easeInCirc", 1],
                    translateX: 1250
                }, .8]],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpIn": {
                defaultDuration: 900,
                calls: [[{
                    opacity: [1, 0],
                    translateY: [0, 20],
                    translateZ: 0
                }]]
            },
            "transition.slideUpOut": {
                defaultDuration: 900,
                calls: [[{
                    opacity: [0, 1],
                    translateY: -20,
                    translateZ: 0
                }]],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownIn": {
                defaultDuration: 900,
                calls: [[{
                    opacity: [1, 0],
                    translateY: [0, -20],
                    translateZ: 0
                }]]
            },
            "transition.slideDownOut": {
                defaultDuration: 900,
                calls: [[{
                    opacity: [0, 1],
                    translateY: 20,
                    translateZ: 0
                }]],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftIn": {
                defaultDuration: 1e3,
                calls: [[{
                    opacity: [1, 0],
                    translateX: [0, -20],
                    translateZ: 0
                }]]
            },
            "transition.slideLeftOut": {
                defaultDuration: 1050,
                calls: [[{
                    opacity: [0, 1],
                    translateX: -20,
                    translateZ: 0
                }]],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightIn": {
                defaultDuration: 1e3,
                calls: [[{
                    opacity: [1, 0],
                    translateX: [0, 20],
                    translateZ: 0
                }]]
            },
            "transition.slideRightOut": {
                defaultDuration: 1050,
                calls: [[{
                    opacity: [0, 1],
                    translateX: 20,
                    translateZ: 0
                }]],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpBigIn": {
                defaultDuration: 850,
                calls: [[{
                    opacity: [1, 0],
                    translateY: [0, 75],
                    translateZ: 0
                }]]
            },
            "transition.slideUpBigOut": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [0, 1],
                    translateY: -75,
                    translateZ: 0
                }]],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownBigIn": {
                defaultDuration: 850,
                calls: [[{
                    opacity: [1, 0],
                    translateY: [0, -75],
                    translateZ: 0
                }]]
            },
            "transition.slideDownBigOut": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [0, 1],
                    translateY: 75,
                    translateZ: 0
                }]],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftBigIn": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [1, 0],
                    translateX: [0, -75],
                    translateZ: 0
                }]]
            },
            "transition.slideLeftBigOut": {
                defaultDuration: 750,
                calls: [[{
                    opacity: [0, 1],
                    translateX: -75,
                    translateZ: 0
                }]],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightBigIn": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [1, 0],
                    translateX: [0, 75],
                    translateZ: 0
                }]]
            },
            "transition.slideRightBigOut": {
                defaultDuration: 750,
                calls: [[{
                    opacity: [0, 1],
                    translateX: 75,
                    translateZ: 0
                }]],
                reset: {
                    translateX: 0
                }
            },
            "transition.perspectiveUpIn": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [1, 0],
                    transformPerspective: [800, 800],
                    transformOriginX: [0, 0],
                    transformOriginY: ["100%", "100%"],
                    rotateX: [0, -180]
                }]],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveUpOut": {
                defaultDuration: 850,
                calls: [[{
                    opacity: [0, 1],
                    transformPerspective: [800, 800],
                    transformOriginX: [0, 0],
                    transformOriginY: ["100%", "100%"],
                    rotateX: -180
                }]],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveDownIn": {
                defaultDuration: 800,
                calls: [[{
                    opacity: [1, 0],
                    transformPerspective: [800, 800],
                    transformOriginX: [0, 0],
                    transformOriginY: [0, 0],
                    rotateX: [0, 180]
                }]],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveDownOut": {
                defaultDuration: 850,
                calls: [[{
                    opacity: [0, 1],
                    transformPerspective: [800, 800],
                    transformOriginX: [0, 0],
                    transformOriginY: [0, 0],
                    rotateX: 180
                }]],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveLeftIn": {
                defaultDuration: 950,
                calls: [[{
                    opacity: [1, 0],
                    transformPerspective: [2e3, 2e3],
                    transformOriginX: [0, 0],
                    transformOriginY: [0, 0],
                    rotateY: [0, -180]
                }]],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveLeftOut": {
                defaultDuration: 950,
                calls: [[{
                    opacity: [0, 1],
                    transformPerspective: [2e3, 2e3],
                    transformOriginX: [0, 0],
                    transformOriginY: [0, 0],
                    rotateY: -180
                }]],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            },
            "transition.perspectiveRightIn": {
                defaultDuration: 950,
                calls: [[{
                    opacity: [1, 0],
                    transformPerspective: [2e3, 2e3],
                    transformOriginX: ["100%", "100%"],
                    transformOriginY: [0, 0],
                    rotateY: [0, 180]
                }]],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveRightOut": {
                defaultDuration: 950,
                calls: [[{
                    opacity: [0, 1],
                    transformPerspective: [2e3, 2e3],
                    transformOriginX: ["100%", "100%"],
                    transformOriginY: [0, 0],
                    rotateY: 180
                }]],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            }
        };
        for (var c in a.RegisterEffect.packagedEffects)
            a.RegisterEffect(c, a.RegisterEffect.packagedEffects[c]);
        a.RunSequence = function(e) {
            var t = o.extend(!0, [], e);
            t.length > 1 && (o.each(t.reverse(), function(e, n) {
                var r = t[e + 1];
                if (r) {
                    var i = n.o || n.options
                      , s = r.o || r.options
                      , u = i && i.sequenceQueue === !1 ? "begin" : "complete"
                      , l = s && s[u]
                      , c = {};
                    c[u] = function() {
                        var e = r.e || r.elements
                          , t = e.nodeType ? [e] : e;
                        l && l.call(t, t),
                        a(n)
                    }
                    ,
                    r.o ? r.o = o.extend({}, s, c) : r.options = o.extend({}, s, c)
                }
            }),
            t.reverse()),
            a(t[0])
        }
    }(window.jQuery || window.Zepto || window, window, document)
}),
function(e, t) {
    var n = function(e, t, n) {
        var r;
        return function() {
            function i() {
                n || e.apply(a, o),
                r = null
            }
            var a = this
              , o = arguments;
            r ? clearTimeout(r) : n && e.apply(a, o),
            r = setTimeout(i, t || 100)
        }
    }
    ;
    jQuery.fn[t] = function(e) {
        return e ? this.bind("resize", n(e)) : this.trigger(t)
    }
}(jQuery, "smartresize"),
function() {
    "use strict";
    function e(t, r) {
        function i(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        }
        var a;
        if (r = r || {},
        this.trackingClick = !1,
        this.trackingClickStart = 0,
        this.targetElement = null ,
        this.touchStartX = 0,
        this.touchStartY = 0,
        this.lastTouchIdentifier = 0,
        this.touchBoundary = r.touchBoundary || 10,
        this.layer = t,
        this.tapDelay = r.tapDelay || 200,
        this.tapTimeout = r.tapTimeout || 700,
        !e.notNeeded(t)) {
            for (var o = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, u = 0, l = o.length; l > u; u++)
                s[o[u]] = i(s[o[u]], s);
            n && (t.addEventListener("mouseover", this.onMouse, !0),
            t.addEventListener("mousedown", this.onMouse, !0),
            t.addEventListener("mouseup", this.onMouse, !0)),
            t.addEventListener("click", this.onClick, !0),
            t.addEventListener("touchstart", this.onTouchStart, !1),
            t.addEventListener("touchmove", this.onTouchMove, !1),
            t.addEventListener("touchend", this.onTouchEnd, !1),
            t.addEventListener("touchcancel", this.onTouchCancel, !1),
            Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, n, r) {
                var i = Node.prototype.removeEventListener;
                "click" === e ? i.call(t, e, n.hijacked || n, r) : i.call(t, e, n, r)
            }
            ,
            t.addEventListener = function(e, n, r) {
                var i = Node.prototype.addEventListener;
                "click" === e ? i.call(t, e, n.hijacked || (n.hijacked = function(e) {
                    e.propagationStopped || n(e)
                }
                ), r) : i.call(t, e, n, r)
            }
            ),
            "function" == typeof t.onclick && (a = t.onclick,
            t.addEventListener("click", function(e) {
                a(e)
            }, !1),
            t.onclick = null )
        }
    }
    var t = navigator.userAgent.indexOf("Windows Phone") >= 0
      , n = navigator.userAgent.indexOf("Android") > 0 && !t
      , r = /iP(ad|hone|od)/.test(navigator.userAgent) && !t
      , i = r && /OS 4_\d(_\d)?/.test(navigator.userAgent)
      , a = r && /OS [6-7]_\d/.test(navigator.userAgent)
      , o = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function(e) {
        switch (e.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (e.disabled)
                return !0;
            break;
        case "input":
            if (r && "file" === e.type || e.disabled)
                return !0;
            break;
        case "label":
        case "iframe":
        case "video":
            return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }
    ,
    e.prototype.needsFocus = function(e) {
        switch (e.nodeName.toLowerCase()) {
        case "textarea":
            return !0;
        case "select":
            return !n;
        case "input":
            switch (e.type) {
            case "button":
            case "checkbox":
            case "file":
            case "image":
            case "radio":
            case "submit":
                return !1
            }
            return !e.disabled && !e.readOnly;
        default:
            return /\bneedsfocus\b/.test(e.className)
        }
    }
    ,
    e.prototype.sendClick = function(e, t) {
        var n, r;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(),
        r = t.changedTouches[0],
        n = document.createEvent("MouseEvents"),
        n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null ),
        n.forwardedTouchEvent = !0,
        e.dispatchEvent(n)
    }
    ,
    e.prototype.determineEventType = function(e) {
        return n && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
    }
    ,
    e.prototype.focus = function(e) {
        var t;
        r && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length,
        e.setSelectionRange(t, t)) : e.focus()
    }
    ,
    e.prototype.updateScrollParent = function(e) {
        var t, n;
        if (t = e.fastClickScrollParent,
        !t || !t.contains(e)) {
            n = e;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    t = n,
                    e.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }
    ,
    e.prototype.getTargetElementFromEventTarget = function(e) {
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }
    ,
    e.prototype.onTouchStart = function(e) {
        var t, n, a;
        if (e.targetTouches.length > 1)
            return !0;
        if (t = this.getTargetElementFromEventTarget(e.target),
        n = e.targetTouches[0],
        r) {
            if (a = window.getSelection(),
            a.rangeCount && !a.isCollapsed)
                return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier)
                    return e.preventDefault(),
                    !1;
                this.lastTouchIdentifier = n.identifier,
                this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0,
        this.trackingClickStart = e.timeStamp,
        this.targetElement = t,
        this.touchStartX = n.pageX,
        this.touchStartY = n.pageY,
        e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(),
        !0
    }
    ,
    e.prototype.touchHasMoved = function(e) {
        var t = e.changedTouches[0]
          , n = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n ? !0 : !1
    }
    ,
    e.prototype.onTouchMove = function(e) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1,
        this.targetElement = null ),
        !0) : !0
    }
    ,
    e.prototype.findControl = function(e) {
        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }
    ,
    e.prototype.onTouchEnd = function(e) {
        var t, o, s, u, l, c = this.targetElement;
        if (!this.trackingClick)
            return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay)
            return this.cancelNextClick = !0,
            !0;
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout)
            return !0;
        if (this.cancelNextClick = !1,
        this.lastClickTime = e.timeStamp,
        o = this.trackingClickStart,
        this.trackingClick = !1,
        this.trackingClickStart = 0,
        a && (l = e.changedTouches[0],
        c = document.elementFromPoint(l.pageX - window.pageXOffset, l.pageY - window.pageYOffset) || c,
        c.fastClickScrollParent = this.targetElement.fastClickScrollParent),
        s = c.tagName.toLowerCase(),
        "label" === s) {
            if (t = this.findControl(c)) {
                if (this.focus(c),
                n)
                    return !1;
                c = t
            }
        } else if (this.needsFocus(c))
            return e.timeStamp - o > 100 || r && window.top !== window && "input" === s ? (this.targetElement = null ,
            !1) : (this.focus(c),
            this.sendClick(c, e),
            r && "select" === s || (this.targetElement = null ,
            e.preventDefault()),
            !1);
        return r && !i && (u = c.fastClickScrollParent,
        u && u.fastClickLastScrollTop !== u.scrollTop) ? !0 : (this.needsClick(c) || (e.preventDefault(),
        this.sendClick(c, e)),
        !1)
    }
    ,
    e.prototype.onTouchCancel = function() {
        this.trackingClick = !1,
        this.targetElement = null
    }
    ,
    e.prototype.onMouse = function(e) {
        return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0,
        e.stopPropagation(),
        e.preventDefault(),
        !1) : !0 : !0
    }
    ,
    e.prototype.onClick = function(e) {
        var t;
        return this.trackingClick ? (this.targetElement = null ,
        this.trackingClick = !1,
        !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e),
        t || (this.targetElement = null ),
        t)
    }
    ,
    e.prototype.destroy = function() {
        var e = this.layer;
        n && (e.removeEventListener("mouseover", this.onMouse, !0),
        e.removeEventListener("mousedown", this.onMouse, !0),
        e.removeEventListener("mouseup", this.onMouse, !0)),
        e.removeEventListener("click", this.onClick, !0),
        e.removeEventListener("touchstart", this.onTouchStart, !1),
        e.removeEventListener("touchmove", this.onTouchMove, !1),
        e.removeEventListener("touchend", this.onTouchEnd, !1),
        e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }
    ,
    e.notNeeded = function(e) {
        var t, r, i, a;
        if ("undefined" == typeof window.ontouchstart)
            return !0;
        if (r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n)
                return !0;
            if (t = document.querySelector("meta[name=viewport]")) {
                if (-1 !== t.content.indexOf("user-scalable=no"))
                    return !0;
                if (r > 31 && document.documentElement.scrollWidth <= window.outerWidth)
                    return !0
            }
        }
        if (o && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),
        i[1] >= 10 && i[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== t.content.indexOf("user-scalable=no"))
                return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth)
                return !0
        }
        return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction ? !0 : (a = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1],
        a >= 27 && (t = document.querySelector("meta[name=viewport]"),
        t && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === e.style.touchAction || "manipulation" === e.style.touchAction ? !0 : !1)
    }
    ,
    e.attach = function(t, n) {
        return new e(t,n)
    }
    ,
    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return e
    }) : "undefined" != typeof module && module.exports ? (module.exports = e.attach,
    module.exports.FastClick = e) : window.FastClick = e
}(),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
    "use strict";
    function e() {
        return An.apply(null , arguments)
    }
    function t(e) {
        An = e
    }
    function n(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
    function r(e) {
        return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    }
    function i(e, t) {
        var n, r = [];
        for (n = 0; n < e.length; ++n)
            r.push(t(e[n], n));
        return r
    }
    function a(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    function o(e, t) {
        for (var n in t)
            a(t, n) && (e[n] = t[n]);
        return a(t, "toString") && (e.toString = t.toString),
        a(t, "valueOf") && (e.valueOf = t.valueOf),
        e
    }
    function s(e, t, n, r) {
        return Me(e, t, n, r, !0).utc()
    }
    function u() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null ,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }
    function l(e) {
        return null == e._pf && (e._pf = u()),
        e._pf
    }
    function c(e) {
        if (null == e._isValid) {
            var t = l(e);
            e._isValid = !(isNaN(e._d.getTime()) || !(t.overflow < 0) || t.empty || t.invalidMonth || t.invalidWeekday || t.nullInput || t.invalidFormat || t.userInvalidated),
            e._strict && (e._isValid = e._isValid && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour)
        }
        return e._isValid
    }
    function d(e) {
        var t = s(NaN);
        return null != e ? o(l(t), e) : l(t).userInvalidated = !0,
        t
    }
    function f(e, t) {
        var n, r, i;
        if ("undefined" != typeof t._isAMomentObject && (e._isAMomentObject = t._isAMomentObject),
        "undefined" != typeof t._i && (e._i = t._i),
        "undefined" != typeof t._f && (e._f = t._f),
        "undefined" != typeof t._l && (e._l = t._l),
        "undefined" != typeof t._strict && (e._strict = t._strict),
        "undefined" != typeof t._tzm && (e._tzm = t._tzm),
        "undefined" != typeof t._isUTC && (e._isUTC = t._isUTC),
        "undefined" != typeof t._offset && (e._offset = t._offset),
        "undefined" != typeof t._pf && (e._pf = l(t)),
        "undefined" != typeof t._locale && (e._locale = t._locale),
        In.length > 0)
            for (n in In)
                r = In[n],
                i = t[r],
                "undefined" != typeof i && (e[r] = i);
        return e
    }
    function h(t) {
        f(this, t),
        this._d = new Date(null != t._d ? t._d.getTime() : NaN),
        Ln === !1 && (Ln = !0,
        e.updateOffset(this),
        Ln = !1)
    }
    function p(e) {
        return e instanceof h || null != e && null != e._isAMomentObject
    }
    function m(e) {
        return 0 > e ? Math.ceil(e) : Math.floor(e)
    }
    function g(e) {
        var t = +e
          , n = 0;
        return 0 !== t && isFinite(t) && (n = m(t)),
        n
    }
    function y(e, t, n) {
        var r, i = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), o = 0;
        for (r = 0; i > r; r++)
            (n && e[r] !== t[r] || !n && g(e[r]) !== g(t[r])) && o++;
        return o + a
    }
    function v() {}
    function b(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }
    function w(e) {
        for (var t, n, r, i, a = 0; a < e.length; ) {
            for (i = b(e[a]).split("-"),
            t = i.length,
            n = b(e[a + 1]),
            n = n ? n.split("-") : null ; t > 0; ) {
                if (r = x(i.slice(0, t).join("-")))
                    return r;
                if (n && n.length >= t && y(i, n, !0) >= t - 1)
                    break;
                t--
            }
            a++
        }
        return null
    }
    function x(e) {
        var t = null ;
        if (!Hn[e] && "undefined" != typeof module && module && module.exports)
            try {
                t = Fn._abbr,
                require("./locale/" + e),
                T(t)
            } catch (n) {}
        return Hn[e]
    }
    function T(e, t) {
        var n;
        return e && (n = "undefined" == typeof t ? S(e) : _(e, t),
        n && (Fn = n)),
        Fn._abbr
    }
    function _(e, t) {
        return null !== t ? (t.abbr = e,
        Hn[e] = Hn[e] || new v,
        Hn[e].set(t),
        T(e),
        Hn[e]) : (delete Hn[e],
        null )
    }
    function S(e) {
        var t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr),
        !e)
            return Fn;
        if (!n(e)) {
            if (t = x(e))
                return t;
            e = [e]
        }
        return w(e)
    }
    function D(e, t) {
        var n = e.toLowerCase();
        $n[n] = $n[n + "s"] = $n[t] = e
    }
    function k(e) {
        return "string" == typeof e ? $n[e] || $n[e.toLowerCase()] : void 0
    }
    function C(e) {
        var t, n, r = {};
        for (n in e)
            a(e, n) && (t = k(n),
            t && (r[t] = e[n]));
        return r
    }
    function M(t, n) {
        return function(r) {
            return null != r ? (Y(this, t, r),
            e.updateOffset(this, n),
            this) : E(this, t)
        }
    }
    function E(e, t) {
        return e._d["get" + (e._isUTC ? "UTC" : "") + t]()
    }
    function Y(e, t, n) {
        return e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
    }
    function P(e, t) {
        var n;
        if ("object" == typeof e)
            for (n in e)
                this.set(n, e[n]);
        else if (e = k(e),
        "function" == typeof this[e])
            return this[e](t);
        return this
    }
    function O(e, t, n) {
        var r = "" + Math.abs(e)
          , i = t - r.length
          , a = e >= 0;
        return (a ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + r
    }
    function N(e, t, n, r) {
        var i = r;
        "string" == typeof r && (i = function() {
            return this[r]()
        }
        ),
        e && (Vn[e] = i),
        t && (Vn[t[0]] = function() {
            return O(i.apply(this, arguments), t[1], t[2]);
        }
        ),
        n && (Vn[n] = function() {
            return this.localeData().ordinal(i.apply(this, arguments), e)
        }
        )
    }
    function A(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }
    function F(e) {
        var t, n, r = e.match(jn);
        for (t = 0,
        n = r.length; n > t; t++)
            Vn[r[t]] ? r[t] = Vn[r[t]] : r[t] = A(r[t]);
        return function(i) {
            var a = "";
            for (t = 0; n > t; t++)
                a += r[t]instanceof Function ? r[t].call(i, e) : r[t];
            return a
        }
    }
    function I(e, t) {
        return e.isValid() ? (t = L(t, e.localeData()),
        Rn[t] = Rn[t] || F(t),
        Rn[t](e)) : e.localeData().invalidDate()
    }
    function L(e, t) {
        function n(e) {
            return t.longDateFormat(e) || e
        }
        var r = 5;
        for (Wn.lastIndex = 0; r >= 0 && Wn.test(e); )
            e = e.replace(Wn, n),
            Wn.lastIndex = 0,
            r -= 1;
        return e
    }
    function H(e) {
        return "function" == typeof e && "[object Function]" === Object.prototype.toString.call(e)
    }
    function $(e, t, n) {
        ir[e] = H(t) ? t : function(e) {
            return e && n ? n : t
        }
    }
    function j(e, t) {
        return a(ir, e) ? ir[e](t._strict, t._locale) : new RegExp(W(e))
    }
    function W(e) {
        return e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, r, i) {
            return t || n || r || i
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    function R(e, t) {
        var n, r = t;
        for ("string" == typeof e && (e = [e]),
        "number" == typeof t && (r = function(e, n) {
            n[t] = g(e)
        }
        ),
        n = 0; n < e.length; n++)
            ar[e[n]] = r
    }
    function V(e, t) {
        R(e, function(e, n, r, i) {
            r._w = r._w || {},
            t(e, r._w, r, i)
        })
    }
    function U(e, t, n) {
        null != t && a(ar, e) && ar[e](t, n._a, n, e)
    }
    function X(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
    }
    function q(e) {
        return this._months[e.month()]
    }
    function z(e) {
        return this._monthsShort[e.month()]
    }
    function G(e, t, n) {
        var r, i, a;
        for (this._monthsParse || (this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = []),
        r = 0; 12 > r; r++) {
            if (i = s([2e3, r]),
            n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp("^" + this.months(i, "").replace(".", "") + "$","i"),
            this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$","i")),
            n || this._monthsParse[r] || (a = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""),
            this._monthsParse[r] = new RegExp(a.replace(".", ""),"i")),
            n && "MMMM" === t && this._longMonthsParse[r].test(e))
                return r;
            if (n && "MMM" === t && this._shortMonthsParse[r].test(e))
                return r;
            if (!n && this._monthsParse[r].test(e))
                return r
        }
    }
    function B(e, t) {
        var n;
        return "string" == typeof t && (t = e.localeData().monthsParse(t),
        "number" != typeof t) ? e : (n = Math.min(e.date(), X(e.year(), t)),
        e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
        e)
    }
    function Z(t) {
        return null != t ? (B(this, t),
        e.updateOffset(this, !0),
        this) : E(this, "Month")
    }
    function J() {
        return X(this.year(), this.month())
    }
    function Q(e) {
        var t, n = e._a;
        return n && -2 === l(e).overflow && (t = n[sr] < 0 || n[sr] > 11 ? sr : n[ur] < 1 || n[ur] > X(n[or], n[sr]) ? ur : n[lr] < 0 || n[lr] > 24 || 24 === n[lr] && (0 !== n[cr] || 0 !== n[dr] || 0 !== n[fr]) ? lr : n[cr] < 0 || n[cr] > 59 ? cr : n[dr] < 0 || n[dr] > 59 ? dr : n[fr] < 0 || n[fr] > 999 ? fr : -1,
        l(e)._overflowDayOfYear && (or > t || t > ur) && (t = ur),
        l(e).overflow = t),
        e
    }
    function K(t) {
        e.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
    }
    function ee(e, t) {
        var n = !0;
        return o(function() {
            return n && (K(e + "\n" + (new Error).stack),
            n = !1),
            t.apply(this, arguments)
        }, t)
    }
    function te(e, t) {
        mr[e] || (K(t),
        mr[e] = !0)
    }
    function ne(e) {
        var t, n, r = e._i, i = gr.exec(r);
        if (i) {
            for (l(e).iso = !0,
            t = 0,
            n = yr.length; n > t; t++)
                if (yr[t][1].exec(r)) {
                    e._f = yr[t][0];
                    break
                }
            for (t = 0,
            n = vr.length; n > t; t++)
                if (vr[t][1].exec(r)) {
                    e._f += (i[6] || " ") + vr[t][0];
                    break
                }
            r.match(tr) && (e._f += "Z"),
            xe(e)
        } else
            e._isValid = !1
    }
    function re(t) {
        var n = br.exec(t._i);
        return null !== n ? void (t._d = new Date(+n[1])) : (ne(t),
        void (t._isValid === !1 && (delete t._isValid,
        e.createFromInputFallback(t))))
    }
    function ie(e, t, n, r, i, a, o) {
        var s = new Date(e,t,n,r,i,a,o);
        return 1970 > e && s.setFullYear(e),
        s
    }
    function ae(e) {
        var t = new Date(Date.UTC.apply(null , arguments));
        return 1970 > e && t.setUTCFullYear(e),
        t
    }
    function oe(e) {
        return se(e) ? 366 : 365
    }
    function se(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
    }
    function ue() {
        return se(this.year())
    }
    function le(e, t, n) {
        var r, i = n - t, a = n - e.day();
        return a > i && (a -= 7),
        i - 7 > a && (a += 7),
        r = Ee(e).add(a, "d"),
        {
            week: Math.ceil(r.dayOfYear() / 7),
            year: r.year()
        }
    }
    function ce(e) {
        return le(e, this._week.dow, this._week.doy).week
    }
    function de() {
        return this._week.dow
    }
    function fe() {
        return this._week.doy
    }
    function he(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
    }
    function pe(e) {
        var t = le(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
    }
    function me(e, t, n, r, i) {
        var a, o = 6 + i - r, s = ae(e, 0, 1 + o), u = s.getUTCDay();
        return i > u && (u += 7),
        n = null != n ? 1 * n : i,
        a = 1 + o + 7 * (t - 1) - u + n,
        {
            year: a > 0 ? e : e - 1,
            dayOfYear: a > 0 ? a : oe(e - 1) + a
        }
    }
    function ge(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
    }
    function ye(e, t, n) {
        return null != e ? e : null != t ? t : n
    }
    function ve(e) {
        var t = new Date;
        return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
    }
    function be(e) {
        var t, n, r, i, a = [];
        if (!e._d) {
            for (r = ve(e),
            e._w && null == e._a[ur] && null == e._a[sr] && we(e),
            e._dayOfYear && (i = ye(e._a[or], r[or]),
            e._dayOfYear > oe(i) && (l(e)._overflowDayOfYear = !0),
            n = ae(i, 0, e._dayOfYear),
            e._a[sr] = n.getUTCMonth(),
            e._a[ur] = n.getUTCDate()),
            t = 0; 3 > t && null == e._a[t]; ++t)
                e._a[t] = a[t] = r[t];
            for (; 7 > t; t++)
                e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            24 === e._a[lr] && 0 === e._a[cr] && 0 === e._a[dr] && 0 === e._a[fr] && (e._nextDay = !0,
            e._a[lr] = 0),
            e._d = (e._useUTC ? ae : ie).apply(null , a),
            null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            e._nextDay && (e._a[lr] = 24)
        }
    }
    function we(e) {
        var t, n, r, i, a, o, s;
        t = e._w,
        null != t.GG || null != t.W || null != t.E ? (a = 1,
        o = 4,
        n = ye(t.GG, e._a[or], le(Ee(), 1, 4).year),
        r = ye(t.W, 1),
        i = ye(t.E, 1)) : (a = e._locale._week.dow,
        o = e._locale._week.doy,
        n = ye(t.gg, e._a[or], le(Ee(), a, o).year),
        r = ye(t.w, 1),
        null != t.d ? (i = t.d,
        a > i && ++r) : i = null != t.e ? t.e + a : a),
        s = me(n, r, i, o, a),
        e._a[or] = s.year,
        e._dayOfYear = s.dayOfYear
    }
    function xe(t) {
        if (t._f === e.ISO_8601)
            return void ne(t);
        t._a = [],
        l(t).empty = !0;
        var n, r, i, a, o, s = "" + t._i, u = s.length, c = 0;
        for (i = L(t._f, t._locale).match(jn) || [],
        n = 0; n < i.length; n++)
            a = i[n],
            r = (s.match(j(a, t)) || [])[0],
            r && (o = s.substr(0, s.indexOf(r)),
            o.length > 0 && l(t).unusedInput.push(o),
            s = s.slice(s.indexOf(r) + r.length),
            c += r.length),
            Vn[a] ? (r ? l(t).empty = !1 : l(t).unusedTokens.push(a),
            U(a, r, t)) : t._strict && !r && l(t).unusedTokens.push(a);
        l(t).charsLeftOver = u - c,
        s.length > 0 && l(t).unusedInput.push(s),
        l(t).bigHour === !0 && t._a[lr] <= 12 && t._a[lr] > 0 && (l(t).bigHour = void 0),
        t._a[lr] = Te(t._locale, t._a[lr], t._meridiem),
        be(t),
        Q(t)
    }
    function Te(e, t, n) {
        var r;
        return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (r = e.isPM(n),
        r && 12 > t && (t += 12),
        r || 12 !== t || (t = 0),
        t) : t
    }
    function _e(e) {
        var t, n, r, i, a;
        if (0 === e._f.length)
            return l(e).invalidFormat = !0,
            void (e._d = new Date(NaN));
        for (i = 0; i < e._f.length; i++)
            a = 0,
            t = f({}, e),
            null != e._useUTC && (t._useUTC = e._useUTC),
            t._f = e._f[i],
            xe(t),
            c(t) && (a += l(t).charsLeftOver,
            a += 10 * l(t).unusedTokens.length,
            l(t).score = a,
            (null == r || r > a) && (r = a,
            n = t));
        o(e, n || t)
    }
    function Se(e) {
        if (!e._d) {
            var t = C(e._i);
            e._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond],
            be(e)
        }
    }
    function De(e) {
        var t = new h(Q(ke(e)));
        return t._nextDay && (t.add(1, "d"),
        t._nextDay = void 0),
        t
    }
    function ke(e) {
        var t = e._i
          , i = e._f;
        return e._locale = e._locale || S(e._l),
        null === t || void 0 === i && "" === t ? d({
            nullInput: !0
        }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)),
        p(t) ? new h(Q(t)) : (n(i) ? _e(e) : i ? xe(e) : r(t) ? e._d = t : Ce(e),
        e))
    }
    function Ce(t) {
        var a = t._i;
        void 0 === a ? t._d = new Date : r(a) ? t._d = new Date(+a) : "string" == typeof a ? re(t) : n(a) ? (t._a = i(a.slice(0), function(e) {
            return parseInt(e, 10)
        }),
        be(t)) : "object" == typeof a ? Se(t) : "number" == typeof a ? t._d = new Date(a) : e.createFromInputFallback(t)
    }
    function Me(e, t, n, r, i) {
        var a = {};
        return "boolean" == typeof n && (r = n,
        n = void 0),
        a._isAMomentObject = !0,
        a._useUTC = a._isUTC = i,
        a._l = n,
        a._i = e,
        a._f = t,
        a._strict = r,
        De(a)
    }
    function Ee(e, t, n, r) {
        return Me(e, t, n, r, !1)
    }
    function Ye(e, t) {
        var r, i;
        if (1 === t.length && n(t[0]) && (t = t[0]),
        !t.length)
            return Ee();
        for (r = t[0],
        i = 1; i < t.length; ++i)
            (!t[i].isValid() || t[i][e](r)) && (r = t[i]);
        return r
    }
    function Pe() {
        var e = [].slice.call(arguments, 0);
        return Ye("isBefore", e)
    }
    function Oe() {
        var e = [].slice.call(arguments, 0);
        return Ye("isAfter", e)
    }
    function Ne(e) {
        var t = C(e)
          , n = t.year || 0
          , r = t.quarter || 0
          , i = t.month || 0
          , a = t.week || 0
          , o = t.day || 0
          , s = t.hour || 0
          , u = t.minute || 0
          , l = t.second || 0
          , c = t.millisecond || 0;
        this._milliseconds = +c + 1e3 * l + 6e4 * u + 36e5 * s,
        this._days = +o + 7 * a,
        this._months = +i + 3 * r + 12 * n,
        this._data = {},
        this._locale = S(),
        this._bubble()
    }
    function Ae(e) {
        return e instanceof Ne
    }
    function Fe(e, t) {
        N(e, 0, 0, function() {
            var e = this.utcOffset()
              , n = "+";
            return 0 > e && (e = -e,
            n = "-"),
            n + O(~~(e / 60), 2) + t + O(~~e % 60, 2)
        })
    }
    function Ie(e) {
        var t = (e || "").match(tr) || []
          , n = t[t.length - 1] || []
          , r = (n + "").match(Sr) || ["-", 0, 0]
          , i = +(60 * r[1]) + g(r[2]);
        return "+" === r[0] ? i : -i
    }
    function Le(t, n) {
        var i, a;
        return n._isUTC ? (i = n.clone(),
        a = (p(t) || r(t) ? +t : +Ee(t)) - +i,
        i._d.setTime(+i._d + a),
        e.updateOffset(i, !1),
        i) : Ee(t).local()
    }
    function He(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
    }
    function $e(t, n) {
        var r, i = this._offset || 0;
        return null != t ? ("string" == typeof t && (t = Ie(t)),
        Math.abs(t) < 16 && (t = 60 * t),
        !this._isUTC && n && (r = He(this)),
        this._offset = t,
        this._isUTC = !0,
        null != r && this.add(r, "m"),
        i !== t && (!n || this._changeInProgress ? tt(this, Ze(t - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
        e.updateOffset(this, !0),
        this._changeInProgress = null )),
        this) : this._isUTC ? i : He(this)
    }
    function je(e, t) {
        return null != e ? ("string" != typeof e && (e = -e),
        this.utcOffset(e, t),
        this) : -this.utcOffset()
    }
    function We(e) {
        return this.utcOffset(0, e)
    }
    function Re(e) {
        return this._isUTC && (this.utcOffset(0, e),
        this._isUTC = !1,
        e && this.subtract(He(this), "m")),
        this
    }
    function Ve() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ie(this._i)),
        this
    }
    function Ue(e) {
        return e = e ? Ee(e).utcOffset() : 0,
        (this.utcOffset() - e) % 60 === 0
    }
    function Xe() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }
    function qe() {
        if ("undefined" != typeof this._isDSTShifted)
            return this._isDSTShifted;
        var e = {};
        if (f(e, this),
        e = ke(e),
        e._a) {
            var t = e._isUTC ? s(e._a) : Ee(e._a);
            this._isDSTShifted = this.isValid() && y(e._a, t.toArray()) > 0
        } else
            this._isDSTShifted = !1;
        return this._isDSTShifted
    }
    function ze() {
        return !this._isUTC
    }
    function Ge() {
        return this._isUTC
    }
    function Be() {
        return this._isUTC && 0 === this._offset
    }
    function Ze(e, t) {
        var n, r, i, o = e, s = null ;
        return Ae(e) ? o = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : "number" == typeof e ? (o = {},
        t ? o[t] = e : o.milliseconds = e) : (s = Dr.exec(e)) ? (n = "-" === s[1] ? -1 : 1,
        o = {
            y: 0,
            d: g(s[ur]) * n,
            h: g(s[lr]) * n,
            m: g(s[cr]) * n,
            s: g(s[dr]) * n,
            ms: g(s[fr]) * n
        }) : (s = kr.exec(e)) ? (n = "-" === s[1] ? -1 : 1,
        o = {
            y: Je(s[2], n),
            M: Je(s[3], n),
            d: Je(s[4], n),
            h: Je(s[5], n),
            m: Je(s[6], n),
            s: Je(s[7], n),
            w: Je(s[8], n)
        }) : null == o ? o = {} : "object" == typeof o && ("from"in o || "to"in o) && (i = Ke(Ee(o.from), Ee(o.to)),
        o = {},
        o.ms = i.milliseconds,
        o.M = i.months),
        r = new Ne(o),
        Ae(e) && a(e, "_locale") && (r._locale = e._locale),
        r
    }
    function Je(e, t) {
        var n = e && parseFloat(e.replace(",", "."));
        return (isNaN(n) ? 0 : n) * t
    }
    function Qe(e, t) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()),
        e.clone().add(n.months, "M").isAfter(t) && --n.months,
        n.milliseconds = +t - +e.clone().add(n.months, "M"),
        n
    }
    function Ke(e, t) {
        var n;
        return t = Le(t, e),
        e.isBefore(t) ? n = Qe(e, t) : (n = Qe(t, e),
        n.milliseconds = -n.milliseconds,
        n.months = -n.months),
        n
    }
    function et(e, t) {
        return function(n, r) {
            var i, a;
            return null === r || isNaN(+r) || (te(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."),
            a = n,
            n = r,
            r = a),
            n = "string" == typeof n ? +n : n,
            i = Ze(n, r),
            tt(this, i, e),
            this
        }
    }
    function tt(t, n, r, i) {
        var a = n._milliseconds
          , o = n._days
          , s = n._months;
        i = null == i ? !0 : i,
        a && t._d.setTime(+t._d + a * r),
        o && Y(t, "Date", E(t, "Date") + o * r),
        s && B(t, E(t, "Month") + s * r),
        i && e.updateOffset(t, o || s)
    }
    function nt(e, t) {
        var n = e || Ee()
          , r = Le(n, this).startOf("day")
          , i = this.diff(r, "days", !0)
          , a = -6 > i ? "sameElse" : -1 > i ? "lastWeek" : 0 > i ? "lastDay" : 1 > i ? "sameDay" : 2 > i ? "nextDay" : 7 > i ? "nextWeek" : "sameElse";
        return this.format(t && t[a] || this.localeData().calendar(a, this, Ee(n)))
    }
    function rt() {
        return new h(this)
    }
    function it(e, t) {
        var n;
        return t = k("undefined" != typeof t ? t : "millisecond"),
        "millisecond" === t ? (e = p(e) ? e : Ee(e),
        +this > +e) : (n = p(e) ? +e : +Ee(e),
        n < +this.clone().startOf(t))
    }
    function at(e, t) {
        var n;
        return t = k("undefined" != typeof t ? t : "millisecond"),
        "millisecond" === t ? (e = p(e) ? e : Ee(e),
        +e > +this) : (n = p(e) ? +e : +Ee(e),
        +this.clone().endOf(t) < n)
    }
    function ot(e, t, n) {
        return this.isAfter(e, n) && this.isBefore(t, n)
    }
    function st(e, t) {
        var n;
        return t = k(t || "millisecond"),
        "millisecond" === t ? (e = p(e) ? e : Ee(e),
        +this === +e) : (n = +Ee(e),
        +this.clone().startOf(t) <= n && n <= +this.clone().endOf(t))
    }
    function ut(e, t, n) {
        var r, i, a = Le(e, this), o = 6e4 * (a.utcOffset() - this.utcOffset());
        return t = k(t),
        "year" === t || "month" === t || "quarter" === t ? (i = lt(this, a),
        "quarter" === t ? i /= 3 : "year" === t && (i /= 12)) : (r = this - a,
        i = "second" === t ? r / 1e3 : "minute" === t ? r / 6e4 : "hour" === t ? r / 36e5 : "day" === t ? (r - o) / 864e5 : "week" === t ? (r - o) / 6048e5 : r),
        n ? i : m(i)
    }
    function lt(e, t) {
        var n, r, i = 12 * (t.year() - e.year()) + (t.month() - e.month()), a = e.clone().add(i, "months");
        return 0 > t - a ? (n = e.clone().add(i - 1, "months"),
        r = (t - a) / (a - n)) : (n = e.clone().add(i + 1, "months"),
        r = (t - a) / (n - a)),
        -(i + r)
    }
    function ct() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }
    function dt() {
        var e = this.clone().utc();
        return 0 < e.year() && e.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : I(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : I(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }
    function ft(t) {
        var n = I(this, t || e.defaultFormat);
        return this.localeData().postformat(n)
    }
    function ht(e, t) {
        return this.isValid() ? Ze({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }
    function pt(e) {
        return this.from(Ee(), e)
    }
    function mt(e, t) {
        return this.isValid() ? Ze({
            from: this,
            to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }
    function gt(e) {
        return this.to(Ee(), e)
    }
    function yt(e) {
        var t;
        return void 0 === e ? this._locale._abbr : (t = S(e),
        null != t && (this._locale = t),
        this)
    }
    function vt() {
        return this._locale
    }
    function bt(e) {
        switch (e = k(e)) {
        case "year":
            this.month(0);
        case "quarter":
        case "month":
            this.date(1);
        case "week":
        case "isoWeek":
        case "day":
            this.hours(0);
        case "hour":
            this.minutes(0);
        case "minute":
            this.seconds(0);
        case "second":
            this.milliseconds(0)
        }
        return "week" === e && this.weekday(0),
        "isoWeek" === e && this.isoWeekday(1),
        "quarter" === e && this.month(3 * Math.floor(this.month() / 3)),
        this
    }
    function wt(e) {
        return e = k(e),
        void 0 === e || "millisecond" === e ? this : this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms")
    }
    function xt() {
        return +this._d - 6e4 * (this._offset || 0)
    }
    function Tt() {
        return Math.floor(+this / 1e3)
    }
    function _t() {
        return this._offset ? new Date(+this) : this._d
    }
    function St() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
    }
    function Dt() {
        var e = this;
        return {
            years: e.year(),
            months: e.month(),
            date: e.date(),
            hours: e.hours(),
            minutes: e.minutes(),
            seconds: e.seconds(),
            milliseconds: e.milliseconds()
        }
    }
    function kt() {
        return c(this)
    }
    function Ct() {
        return o({}, l(this))
    }
    function Mt() {
        return l(this).overflow
    }
    function Et(e, t) {
        N(0, [e, e.length], 0, t)
    }
    function Yt(e, t, n) {
        return le(Ee([e, 11, 31 + t - n]), t, n).week
    }
    function Pt(e) {
        var t = le(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == e ? t : this.add(e - t, "y")
    }
    function Ot(e) {
        var t = le(this, 1, 4).year;
        return null == e ? t : this.add(e - t, "y")
    }
    function Nt() {
        return Yt(this.year(), 1, 4)
    }
    function At() {
        var e = this.localeData()._week;
        return Yt(this.year(), e.dow, e.doy)
    }
    function Ft(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    }
    function It(e, t) {
        return "string" != typeof e ? e : isNaN(e) ? (e = t.weekdaysParse(e),
        "number" == typeof e ? e : null ) : parseInt(e, 10)
    }
    function Lt(e) {
        return this._weekdays[e.day()]
    }
    function Ht(e) {
        return this._weekdaysShort[e.day()]
    }
    function $t(e) {
        return this._weekdaysMin[e.day()]
    }
    function jt(e) {
        var t, n, r;
        for (this._weekdaysParse = this._weekdaysParse || [],
        t = 0; 7 > t; t++)
            if (this._weekdaysParse[t] || (n = Ee([2e3, 1]).day(t),
            r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""),
            this._weekdaysParse[t] = new RegExp(r.replace(".", ""),"i")),
            this._weekdaysParse[t].test(e))
                return t
    }
    function Wt(e) {
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (e = It(e, this.localeData()),
        this.add(e - t, "d")) : t
    }
    function Rt(e) {
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, "d")
    }
    function Vt(e) {
        return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
    }
    function Ut(e, t) {
        N(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
    }
    function Xt(e, t) {
        return t._meridiemParse
    }
    function qt(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
    }
    function zt(e, t, n) {
        return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }
    function Gt(e, t) {
        t[fr] = g(1e3 * ("0." + e))
    }
    function Bt() {
        return this._isUTC ? "UTC" : ""
    }
    function Zt() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }
    function Jt(e) {
        return Ee(1e3 * e)
    }
    function Qt() {
        return Ee.apply(null , arguments).parseZone()
    }
    function Kt(e, t, n) {
        var r = this._calendar[e];
        return "function" == typeof r ? r.call(t, n) : r
    }
    function en(e) {
        var t = this._longDateFormat[e]
          , n = this._longDateFormat[e.toUpperCase()];
        return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
            return e.slice(1)
        }),
        this._longDateFormat[e])
    }
    function tn() {
        return this._invalidDate
    }
    function nn(e) {
        return this._ordinal.replace("%d", e)
    }
    function rn(e) {
        return e
    }
    function an(e, t, n, r) {
        var i = this._relativeTime[n];
        return "function" == typeof i ? i(e, t, n, r) : i.replace(/%d/i, e)
    }
    function on(e, t) {
        var n = this._relativeTime[e > 0 ? "future" : "past"];
        return "function" == typeof n ? n(t) : n.replace(/%s/i, t)
    }
    function sn(e) {
        var t, n;
        for (n in e)
            t = e[n],
            "function" == typeof t ? this[n] = t : this["_" + n] = t;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }
    function un(e, t, n, r) {
        var i = S()
          , a = s().set(r, t);
        return i[n](a, e)
    }
    function ln(e, t, n, r, i) {
        if ("number" == typeof e && (t = e,
        e = void 0),
        e = e || "",
        null != t)
            return un(e, t, n, i);
        var a, o = [];
        for (a = 0; r > a; a++)
            o[a] = un(e, a, n, i);
        return o
    }
    function cn(e, t) {
        return ln(e, t, "months", 12, "month")
    }
    function dn(e, t) {
        return ln(e, t, "monthsShort", 12, "month")
    }
    function fn(e, t) {
        return ln(e, t, "weekdays", 7, "day")
    }
    function hn(e, t) {
        return ln(e, t, "weekdaysShort", 7, "day")
    }
    function pn(e, t) {
        return ln(e, t, "weekdaysMin", 7, "day")
    }
    function mn() {
        var e = this._data;
        return this._milliseconds = Br(this._milliseconds),
        this._days = Br(this._days),
        this._months = Br(this._months),
        e.milliseconds = Br(e.milliseconds),
        e.seconds = Br(e.seconds),
        e.minutes = Br(e.minutes),
        e.hours = Br(e.hours),
        e.months = Br(e.months),
        e.years = Br(e.years),
        this
    }
    function gn(e, t, n, r) {
        var i = Ze(t, n);
        return e._milliseconds += r * i._milliseconds,
        e._days += r * i._days,
        e._months += r * i._months,
        e._bubble()
    }
    function yn(e, t) {
        return gn(this, e, t, 1)
    }
    function vn(e, t) {
        return gn(this, e, t, -1)
    }
    function bn(e) {
        return 0 > e ? Math.floor(e) : Math.ceil(e)
    }
    function wn() {
        var e, t, n, r, i, a = this._milliseconds, o = this._days, s = this._months, u = this._data;
        return a >= 0 && o >= 0 && s >= 0 || 0 >= a && 0 >= o && 0 >= s || (a += 864e5 * bn(Tn(s) + o),
        o = 0,
        s = 0),
        u.milliseconds = a % 1e3,
        e = m(a / 1e3),
        u.seconds = e % 60,
        t = m(e / 60),
        u.minutes = t % 60,
        n = m(t / 60),
        u.hours = n % 24,
        o += m(n / 24),
        i = m(xn(o)),
        s += i,
        o -= bn(Tn(i)),
        r = m(s / 12),
        s %= 12,
        u.days = o,
        u.months = s,
        u.years = r,
        this
    }
    function xn(e) {
        return 4800 * e / 146097
    }
    function Tn(e) {
        return 146097 * e / 4800
    }
    function _n(e) {
        var t, n, r = this._milliseconds;
        if (e = k(e),
        "month" === e || "year" === e)
            return t = this._days + r / 864e5,
            n = this._months + xn(t),
            "month" === e ? n : n / 12;
        switch (t = this._days + Math.round(Tn(this._months)),
        e) {
        case "week":
            return t / 7 + r / 6048e5;
        case "day":
            return t + r / 864e5;
        case "hour":
            return 24 * t + r / 36e5;
        case "minute":
            return 1440 * t + r / 6e4;
        case "second":
            return 86400 * t + r / 1e3;
        case "millisecond":
            return Math.floor(864e5 * t) + r;
        default:
            throw new Error("Unknown unit " + e)
        }
    }
    function Sn() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12)
    }
    function Dn(e) {
        return function() {
            return this.as(e)
        }
    }
    function kn(e) {
        return e = k(e),
        this[e + "s"]()
    }
    function Cn(e) {
        return function() {
            return this._data[e]
        }
    }
    function Mn() {
        return m(this.days() / 7)
    }
    function En(e, t, n, r, i) {
        return i.relativeTime(t || 1, !!n, e, r)
    }
    function Yn(e, t, n) {
        var r = Ze(e).abs()
          , i = di(r.as("s"))
          , a = di(r.as("m"))
          , o = di(r.as("h"))
          , s = di(r.as("d"))
          , u = di(r.as("M"))
          , l = di(r.as("y"))
          , c = i < fi.s && ["s", i] || 1 === a && ["m"] || a < fi.m && ["mm", a] || 1 === o && ["h"] || o < fi.h && ["hh", o] || 1 === s && ["d"] || s < fi.d && ["dd", s] || 1 === u && ["M"] || u < fi.M && ["MM", u] || 1 === l && ["y"] || ["yy", l];
        return c[2] = t,
        c[3] = +e > 0,
        c[4] = n,
        En.apply(null , c)
    }
    function Pn(e, t) {
        return void 0 === fi[e] ? !1 : void 0 === t ? fi[e] : (fi[e] = t,
        !0)
    }
    function On(e) {
        var t = this.localeData()
          , n = Yn(this, !e, t);
        return e && (n = t.pastFuture(+this, n)),
        t.postformat(n)
    }
    function Nn() {
        var e, t, n, r = hi(this._milliseconds) / 1e3, i = hi(this._days), a = hi(this._months);
        e = m(r / 60),
        t = m(e / 60),
        r %= 60,
        e %= 60,
        n = m(a / 12),
        a %= 12;
        var o = n
          , s = a
          , u = i
          , l = t
          , c = e
          , d = r
          , f = this.asSeconds();
        return f ? (0 > f ? "-" : "") + "P" + (o ? o + "Y" : "") + (s ? s + "M" : "") + (u ? u + "D" : "") + (l || c || d ? "T" : "") + (l ? l + "H" : "") + (c ? c + "M" : "") + (d ? d + "S" : "") : "P0D"
    }
    var An, Fn, In = e.momentProperties = [], Ln = !1, Hn = {}, $n = {}, jn = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Wn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Rn = {}, Vn = {}, Un = /\d/, Xn = /\d\d/, qn = /\d{3}/, zn = /\d{4}/, Gn = /[+-]?\d{6}/, Bn = /\d\d?/, Zn = /\d{1,3}/, Jn = /\d{1,4}/, Qn = /[+-]?\d{1,6}/, Kn = /\d+/, er = /[+-]?\d+/, tr = /Z|[+-]\d\d:?\d\d/gi, nr = /[+-]?\d+(\.\d{1,3})?/, rr = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, ir = {}, ar = {}, or = 0, sr = 1, ur = 2, lr = 3, cr = 4, dr = 5, fr = 6;
    N("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }),
    N("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e)
    }),
    N("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e)
    }),
    D("month", "M"),
    $("M", Bn),
    $("MM", Bn, Xn),
    $("MMM", rr),
    $("MMMM", rr),
    R(["M", "MM"], function(e, t) {
        t[sr] = g(e) - 1
    }),
    R(["MMM", "MMMM"], function(e, t, n, r) {
        var i = n._locale.monthsParse(e, r, n._strict);
        null != i ? t[sr] = i : l(n).invalidMonth = e
    });
    var hr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
      , pr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
      , mr = {};
    e.suppressDeprecationWarnings = !1;
    var gr = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
      , yr = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]]
      , vr = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]]
      , br = /^\/?Date\((\-?\d+)/i;
    e.createFromInputFallback = ee("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }),
    N(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }),
    N(0, ["YYYY", 4], 0, "year"),
    N(0, ["YYYYY", 5], 0, "year"),
    N(0, ["YYYYYY", 6, !0], 0, "year"),
    D("year", "y"),
    $("Y", er),
    $("YY", Bn, Xn),
    $("YYYY", Jn, zn),
    $("YYYYY", Qn, Gn),
    $("YYYYYY", Qn, Gn),
    R(["YYYYY", "YYYYYY"], or),
    R("YYYY", function(t, n) {
        n[or] = 2 === t.length ? e.parseTwoDigitYear(t) : g(t)
    }),
    R("YY", function(t, n) {
        n[or] = e.parseTwoDigitYear(t)
    }),
    e.parseTwoDigitYear = function(e) {
        return g(e) + (g(e) > 68 ? 1900 : 2e3)
    }
    ;
    var wr = M("FullYear", !1);
    N("w", ["ww", 2], "wo", "week"),
    N("W", ["WW", 2], "Wo", "isoWeek"),
    D("week", "w"),
    D("isoWeek", "W"),
    $("w", Bn),
    $("ww", Bn, Xn),
    $("W", Bn),
    $("WW", Bn, Xn),
    V(["w", "ww", "W", "WW"], function(e, t, n, r) {
        t[r.substr(0, 1)] = g(e)
    });
    var xr = {
        dow: 0,
        doy: 6
    };
    N("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    D("dayOfYear", "DDD"),
    $("DDD", Zn),
    $("DDDD", qn),
    R(["DDD", "DDDD"], function(e, t, n) {
        n._dayOfYear = g(e)
    }),
    e.ISO_8601 = function() {}
    ;
    var Tr = ee("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
        var e = Ee.apply(null , arguments);
        return this > e ? this : e
    })
      , _r = ee("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
        var e = Ee.apply(null , arguments);
        return e > this ? this : e
    });
    Fe("Z", ":"),
    Fe("ZZ", ""),
    $("Z", tr),
    $("ZZ", tr),
    R(["Z", "ZZ"], function(e, t, n) {
        n._useUTC = !0,
        n._tzm = Ie(e)
    });
    var Sr = /([\+\-]|\d\d)/gi;
    e.updateOffset = function() {}
    ;
    var Dr = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/
      , kr = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    Ze.fn = Ne.prototype;
    var Cr = et(1, "add")
      , Mr = et(-1, "subtract");
    e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var Er = ee("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return void 0 === e ? this.localeData() : this.locale(e)
    });
    N(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }),
    N(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }),
    Et("gggg", "weekYear"),
    Et("ggggg", "weekYear"),
    Et("GGGG", "isoWeekYear"),
    Et("GGGGG", "isoWeekYear"),
    D("weekYear", "gg"),
    D("isoWeekYear", "GG"),
    $("G", er),
    $("g", er),
    $("GG", Bn, Xn),
    $("gg", Bn, Xn),
    $("GGGG", Jn, zn),
    $("gggg", Jn, zn),
    $("GGGGG", Qn, Gn),
    $("ggggg", Qn, Gn),
    V(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, r) {
        t[r.substr(0, 2)] = g(e)
    }),
    V(["gg", "GG"], function(t, n, r, i) {
        n[i] = e.parseTwoDigitYear(t)
    }),
    N("Q", 0, 0, "quarter"),
    D("quarter", "Q"),
    $("Q", Un),
    R("Q", function(e, t) {
        t[sr] = 3 * (g(e) - 1)
    }),
    N("D", ["DD", 2], "Do", "date"),
    D("date", "D"),
    $("D", Bn),
    $("DD", Bn, Xn),
    $("Do", function(e, t) {
        return e ? t._ordinalParse : t._ordinalParseLenient
    }),
    R(["D", "DD"], ur),
    R("Do", function(e, t) {
        t[ur] = g(e.match(Bn)[0], 10)
    });
    var Yr = M("Date", !0);
    N("d", 0, "do", "day"),
    N("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e)
    }),
    N("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e)
    }),
    N("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e)
    }),
    N("e", 0, 0, "weekday"),
    N("E", 0, 0, "isoWeekday"),
    D("day", "d"),
    D("weekday", "e"),
    D("isoWeekday", "E"),
    $("d", Bn),
    $("e", Bn),
    $("E", Bn),
    $("dd", rr),
    $("ddd", rr),
    $("dddd", rr),
    V(["dd", "ddd", "dddd"], function(e, t, n) {
        var r = n._locale.weekdaysParse(e);
        null != r ? t.d = r : l(n).invalidWeekday = e
    }),
    V(["d", "e", "E"], function(e, t, n, r) {
        t[r] = g(e)
    });
    var Pr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
      , Or = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
      , Nr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    N("H", ["HH", 2], 0, "hour"),
    N("h", ["hh", 2], 0, function() {
        return this.hours() % 12 || 12
    }),
    Ut("a", !0),
    Ut("A", !1),
    D("hour", "h"),
    $("a", Xt),
    $("A", Xt),
    $("H", Bn),
    $("h", Bn),
    $("HH", Bn, Xn),
    $("hh", Bn, Xn),
    R(["H", "HH"], lr),
    R(["a", "A"], function(e, t, n) {
        n._isPm = n._locale.isPM(e),
        n._meridiem = e
    }),
    R(["h", "hh"], function(e, t, n) {
        t[lr] = g(e),
        l(n).bigHour = !0
    });
    var Ar = /[ap]\.?m?\.?/i
      , Fr = M("Hours", !0);
    N("m", ["mm", 2], 0, "minute"),
    D("minute", "m"),
    $("m", Bn),
    $("mm", Bn, Xn),
    R(["m", "mm"], cr);
    var Ir = M("Minutes", !1);
    N("s", ["ss", 2], 0, "second"),
    D("second", "s"),
    $("s", Bn),
    $("ss", Bn, Xn),
    R(["s", "ss"], dr);
    var Lr = M("Seconds", !1);
    N("S", 0, 0, function() {
        return ~~(this.millisecond() / 100)
    }),
    N(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10)
    }),
    N(0, ["SSS", 3], 0, "millisecond"),
    N(0, ["SSSS", 4], 0, function() {
        return 10 * this.millisecond()
    }),
    N(0, ["SSSSS", 5], 0, function() {
        return 100 * this.millisecond()
    }),
    N(0, ["SSSSSS", 6], 0, function() {
        return 1e3 * this.millisecond()
    }),
    N(0, ["SSSSSSS", 7], 0, function() {
        return 1e4 * this.millisecond()
    }),
    N(0, ["SSSSSSSS", 8], 0, function() {
        return 1e5 * this.millisecond()
    }),
    N(0, ["SSSSSSSSS", 9], 0, function() {
        return 1e6 * this.millisecond()
    }),
    D("millisecond", "ms"),
    $("S", Zn, Un),
    $("SS", Zn, Xn),
    $("SSS", Zn, qn);
    var Hr;
    for (Hr = "SSSS"; Hr.length <= 9; Hr += "S")
        $(Hr, Kn);
    for (Hr = "S"; Hr.length <= 9; Hr += "S")
        R(Hr, Gt);
    var $r = M("Milliseconds", !1);
    N("z", 0, 0, "zoneAbbr"),
    N("zz", 0, 0, "zoneName");
    var jr = h.prototype;
    jr.add = Cr,
    jr.calendar = nt,
    jr.clone = rt,
    jr.diff = ut,
    jr.endOf = wt,
    jr.format = ft,
    jr.from = ht,
    jr.fromNow = pt,
    jr.to = mt,
    jr.toNow = gt,
    jr.get = P,
    jr.invalidAt = Mt,
    jr.isAfter = it,
    jr.isBefore = at,
    jr.isBetween = ot,
    jr.isSame = st,
    jr.isValid = kt,
    jr.lang = Er,
    jr.locale = yt,
    jr.localeData = vt,
    jr.max = _r,
    jr.min = Tr,
    jr.parsingFlags = Ct,
    jr.set = P,
    jr.startOf = bt,
    jr.subtract = Mr,
    jr.toArray = St,
    jr.toObject = Dt,
    jr.toDate = _t,
    jr.toISOString = dt,
    jr.toJSON = dt,
    jr.toString = ct,
    jr.unix = Tt,
    jr.valueOf = xt,
    jr.year = wr,
    jr.isLeapYear = ue,
    jr.weekYear = Pt,
    jr.isoWeekYear = Ot,
    jr.quarter = jr.quarters = Ft,
    jr.month = Z,
    jr.daysInMonth = J,
    jr.week = jr.weeks = he,
    jr.isoWeek = jr.isoWeeks = pe,
    jr.weeksInYear = At,
    jr.isoWeeksInYear = Nt,
    jr.date = Yr,
    jr.day = jr.days = Wt,
    jr.weekday = Rt,
    jr.isoWeekday = Vt,
    jr.dayOfYear = ge,
    jr.hour = jr.hours = Fr,
    jr.minute = jr.minutes = Ir,
    jr.second = jr.seconds = Lr,
    jr.millisecond = jr.milliseconds = $r,
    jr.utcOffset = $e,
    jr.utc = We,
    jr.local = Re,
    jr.parseZone = Ve,
    jr.hasAlignedHourOffset = Ue,
    jr.isDST = Xe,
    jr.isDSTShifted = qe,
    jr.isLocal = ze,
    jr.isUtcOffset = Ge,
    jr.isUtc = Be,
    jr.isUTC = Be,
    jr.zoneAbbr = Bt,
    jr.zoneName = Zt,
    jr.dates = ee("dates accessor is deprecated. Use date instead.", Yr),
    jr.months = ee("months accessor is deprecated. Use month instead", Z),
    jr.years = ee("years accessor is deprecated. Use year instead", wr),
    jr.zone = ee("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", je);
    var Wr = jr
      , Rr = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }
      , Vr = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }
      , Ur = "Invalid date"
      , Xr = "%d"
      , qr = /\d{1,2}/
      , zr = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }
      , Gr = v.prototype;
    Gr._calendar = Rr,
    Gr.calendar = Kt,
    Gr._longDateFormat = Vr,
    Gr.longDateFormat = en,
    Gr._invalidDate = Ur,
    Gr.invalidDate = tn,
    Gr._ordinal = Xr,
    Gr.ordinal = nn,
    Gr._ordinalParse = qr,
    Gr.preparse = rn,
    Gr.postformat = rn,
    Gr._relativeTime = zr,
    Gr.relativeTime = an,
    Gr.pastFuture = on,
    Gr.set = sn,
    Gr.months = q,
    Gr._months = hr,
    Gr.monthsShort = z,
    Gr._monthsShort = pr,
    Gr.monthsParse = G,
    Gr.week = ce,
    Gr._week = xr,
    Gr.firstDayOfYear = fe,
    Gr.firstDayOfWeek = de,
    Gr.weekdays = Lt,
    Gr._weekdays = Pr,
    Gr.weekdaysMin = $t,
    Gr._weekdaysMin = Nr,
    Gr.weekdaysShort = Ht,
    Gr._weekdaysShort = Or,
    Gr.weekdaysParse = jt,
    Gr.isPM = qt,
    Gr._meridiemParse = Ar,
    Gr.meridiem = zt,
    T("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10
              , n = 1 === g(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
            return e + n
        }
    }),
    e.lang = ee("moment.lang is deprecated. Use moment.locale instead.", T),
    e.langData = ee("moment.langData is deprecated. Use moment.localeData instead.", S);
    var Br = Math.abs
      , Zr = Dn("ms")
      , Jr = Dn("s")
      , Qr = Dn("m")
      , Kr = Dn("h")
      , ei = Dn("d")
      , ti = Dn("w")
      , ni = Dn("M")
      , ri = Dn("y")
      , ii = Cn("milliseconds")
      , ai = Cn("seconds")
      , oi = Cn("minutes")
      , si = Cn("hours")
      , ui = Cn("days")
      , li = Cn("months")
      , ci = Cn("years")
      , di = Math.round
      , fi = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }
      , hi = Math.abs
      , pi = Ne.prototype;
    pi.abs = mn,
    pi.add = yn,
    pi.subtract = vn,
    pi.as = _n,
    pi.asMilliseconds = Zr,
    pi.asSeconds = Jr,
    pi.asMinutes = Qr,
    pi.asHours = Kr,
    pi.asDays = ei,
    pi.asWeeks = ti,
    pi.asMonths = ni,
    pi.asYears = ri,
    pi.valueOf = Sn,
    pi._bubble = wn,
    pi.get = kn,
    pi.milliseconds = ii,
    pi.seconds = ai,
    pi.minutes = oi,
    pi.hours = si,
    pi.days = ui,
    pi.weeks = Mn,
    pi.months = li,
    pi.years = ci,
    pi.humanize = On,
    pi.toISOString = Nn,
    pi.toString = Nn,
    pi.toJSON = Nn,
    pi.locale = yt,
    pi.localeData = vt,
    pi.toIsoString = ee("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Nn),
    pi.lang = Er,
    N("X", 0, 0, "unix"),
    N("x", 0, 0, "valueOf"),
    $("x", er),
    $("X", nr),
    R("X", function(e, t, n) {
        n._d = new Date(1e3 * parseFloat(e, 10))
    }),
    R("x", function(e, t, n) {
        n._d = new Date(g(e))
    }),
    e.version = "2.10.6",
    t(Ee),
    e.fn = Wr,
    e.min = Pe,
    e.max = Oe,
    e.utc = s,
    e.unix = Jt,
    e.months = cn,
    e.isDate = r,
    e.locale = T,
    e.invalid = d,
    e.duration = Ze,
    e.isMoment = p,
    e.weekdays = fn,
    e.parseZone = Qt,
    e.localeData = S,
    e.isDuration = Ae,
    e.monthsShort = dn,
    e.weekdaysMin = pn,
    e.defineLocale = _,
    e.weekdaysShort = hn,
    e.normalizeUnits = k,
    e.relativeTimeThreshold = Pn;
    var mi = e;
    return mi
}),
!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self),
        t.chrono = e()
    }
}(function() {
    var e;
    return function t(e, n, r) {
        function i(o, s) {
            if (!n[o]) {
                if (!e[o]) {
                    var u = "function" == typeof require && require;
                    if (!s && u)
                        return u(o, !0);
                    if (a)
                        return a(o, !0);
                    var l = new Error("Cannot find module '" + o + "'");
                    throw l.code = "MODULE_NOT_FOUND",
                    l
                }
                var c = n[o] = {
                    exports: {}
                };
                e[o][0].call(c.exports, function(t) {
                    var n = e[o][1][t];
                    return i(n ? n : t)
                }, c, c.exports, t, e, n, r)
            }
            return n[o].exports
        }
        for (var a = "function" == typeof require && require, o = 0; o < r.length; o++)
            i(r[o]);
        return i
    }({
        1: [function(t, n, r) {
            !function(t, i) {
                "object" == typeof r && "undefined" != typeof n ? n.exports = i() : "function" == typeof e && e.amd ? e(i) : t.moment = i()
            }(this, function() {
                "use strict";
                function e() {
                    return In.apply(null , arguments)
                }
                function r(e) {
                    In = e
                }
                function i(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                function a(e) {
                    return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
                }
                function o(e, t) {
                    var n, r = [];
                    for (n = 0; n < e.length; ++n)
                        r.push(t(e[n], n));
                    return r
                }
                function s(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                function u(e, t) {
                    for (var n in t)
                        s(t, n) && (e[n] = t[n]);
                    return s(t, "toString") && (e.toString = t.toString),
                    s(t, "valueOf") && (e.valueOf = t.valueOf),
                    e
                }
                function l(e, t, n, r) {
                    return Ye(e, t, n, r, !0).utc()
                }
                function c() {
                    return {
                        empty: !1,
                        unusedTokens: [],
                        unusedInput: [],
                        overflow: -2,
                        charsLeftOver: 0,
                        nullInput: !1,
                        invalidMonth: null ,
                        invalidFormat: !1,
                        userInvalidated: !1,
                        iso: !1
                    }
                }
                function d(e) {
                    return null == e._pf && (e._pf = c()),
                    e._pf
                }
                function f(e) {
                    if (null == e._isValid) {
                        var t = d(e);
                        e._isValid = !(isNaN(e._d.getTime()) || !(t.overflow < 0) || t.empty || t.invalidMonth || t.invalidWeekday || t.nullInput || t.invalidFormat || t.userInvalidated),
                        e._strict && (e._isValid = e._isValid && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour)
                    }
                    return e._isValid
                }
                function h(e) {
                    var t = l(NaN);
                    return null != e ? u(d(t), e) : d(t).userInvalidated = !0,
                    t
                }
                function p(e, t) {
                    var n, r, i;
                    if ("undefined" != typeof t._isAMomentObject && (e._isAMomentObject = t._isAMomentObject),
                    "undefined" != typeof t._i && (e._i = t._i),
                    "undefined" != typeof t._f && (e._f = t._f),
                    "undefined" != typeof t._l && (e._l = t._l),
                    "undefined" != typeof t._strict && (e._strict = t._strict),
                    "undefined" != typeof t._tzm && (e._tzm = t._tzm),
                    "undefined" != typeof t._isUTC && (e._isUTC = t._isUTC),
                    "undefined" != typeof t._offset && (e._offset = t._offset),
                    "undefined" != typeof t._pf && (e._pf = d(t)),
                    "undefined" != typeof t._locale && (e._locale = t._locale),
                    Hn.length > 0)
                        for (n in Hn)
                            r = Hn[n],
                            i = t[r],
                            "undefined" != typeof i && (e[r] = i);
                    return e
                }
                function m(t) {
                    p(this, t),
                    this._d = new Date(null != t._d ? t._d.getTime() : NaN),
                    $n === !1 && ($n = !0,
                    e.updateOffset(this),
                    $n = !1)
                }
                function g(e) {
                    return e instanceof m || null != e && null != e._isAMomentObject
                }
                function y(e) {
                    return 0 > e ? Math.ceil(e) : Math.floor(e)
                }
                function v(e) {
                    var t = +e
                      , n = 0;
                    return 0 !== t && isFinite(t) && (n = y(t)),
                    n
                }
                function b(e, t, n) {
                    var r, i = Math.min(e.length, t.length), a = Math.abs(e.length - t.length), o = 0;
                    for (r = 0; i > r; r++)
                        (n && e[r] !== t[r] || !n && v(e[r]) !== v(t[r])) && o++;
                    return o + a
                }
                function w() {}
                function x(e) {
                    return e ? e.toLowerCase().replace("_", "-") : e
                }
                function T(e) {
                    for (var t, n, r, i, a = 0; a < e.length; ) {
                        for (i = x(e[a]).split("-"),
                        t = i.length,
                        n = x(e[a + 1]),
                        n = n ? n.split("-") : null ; t > 0; ) {
                            if (r = _(i.slice(0, t).join("-")))
                                return r;
                            if (n && n.length >= t && b(i, n, !0) >= t - 1)
                                break;
                            t--
                        }
                        a++
                    }
                    return null
                }
                function _(e) {
                    var r = null ;
                    if (!jn[e] && "undefined" != typeof n && n && n.exports)
                        try {
                            r = Ln._abbr,
                            t("./locale/" + e),
                            S(r)
                        } catch (i) {}
                    return jn[e]
                }
                function S(e, t) {
                    var n;
                    return e && (n = "undefined" == typeof t ? k(e) : D(e, t),
                    n && (Ln = n)),
                    Ln._abbr
                }
                function D(e, t) {
                    return null !== t ? (t.abbr = e,
                    jn[e] = jn[e] || new w,
                    jn[e].set(t),
                    S(e),
                    jn[e]) : (delete jn[e],
                    null )
                }
                function k(e) {
                    var t;
                    if (e && e._locale && e._locale._abbr && (e = e._locale._abbr),
                    !e)
                        return Ln;
                    if (!i(e)) {
                        if (t = _(e))
                            return t;
                        e = [e]
                    }
                    return T(e)
                }
                function C(e, t) {
                    var n = e.toLowerCase();
                    Wn[n] = Wn[n + "s"] = Wn[t] = e
                }
                function M(e) {
                    return "string" == typeof e ? Wn[e] || Wn[e.toLowerCase()] : void 0
                }
                function E(e) {
                    var t, n, r = {};
                    for (n in e)
                        s(e, n) && (t = M(n),
                        t && (r[t] = e[n]));
                    return r
                }
                function Y(t, n) {
                    return function(r) {
                        return null != r ? (O(this, t, r),
                        e.updateOffset(this, n),
                        this) : P(this, t)
                    }
                }
                function P(e, t) {
                    return e._d["get" + (e._isUTC ? "UTC" : "") + t]()
                }
                function O(e, t, n) {
                    return e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
                }
                function N(e, t) {
                    var n;
                    if ("object" == typeof e)
                        for (n in e)
                            this.set(n, e[n]);
                    else if (e = M(e),
                    "function" == typeof this[e])
                        return this[e](t);
                    return this
                }
                function A(e, t, n) {
                    var r = "" + Math.abs(e)
                      , i = t - r.length
                      , a = e >= 0;
                    return (a ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, i)).toString().substr(1) + r
                }
                function F(e, t, n, r) {
                    var i = r;
                    "string" == typeof r && (i = function() {
                        return this[r]()
                    }
                    ),
                    e && (Xn[e] = i),
                    t && (Xn[t[0]] = function() {
                        return A(i.apply(this, arguments), t[1], t[2])
                    }
                    ),
                    n && (Xn[n] = function() {
                        return this.localeData().ordinal(i.apply(this, arguments), e)
                    }
                    )
                }
                function I(e) {
                    return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
                }
                function L(e) {
                    var t, n, r = e.match(Rn);
                    for (t = 0,
                    n = r.length; n > t; t++)
                        Xn[r[t]] ? r[t] = Xn[r[t]] : r[t] = I(r[t]);
                    return function(i) {
                        var a = "";
                        for (t = 0; n > t; t++)
                            a += r[t]instanceof Function ? r[t].call(i, e) : r[t];
                        return a
                    }
                }
                function H(e, t) {
                    return e.isValid() ? (t = $(t, e.localeData()),
                    Un[t] = Un[t] || L(t),
                    Un[t](e)) : e.localeData().invalidDate()
                }
                function $(e, t) {
                    function n(e) {
                        return t.longDateFormat(e) || e
                    }
                    var r = 5;
                    for (Vn.lastIndex = 0; r >= 0 && Vn.test(e); )
                        e = e.replace(Vn, n),
                        Vn.lastIndex = 0,
                        r -= 1;
                    return e
                }
                function j(e) {
                    return "function" == typeof e && "[object Function]" === Object.prototype.toString.call(e)
                }
                function W(e, t, n) {
                    or[e] = j(t) ? t : function(e) {
                        return e && n ? n : t
                    }
                }
                function R(e, t) {
                    return s(or, e) ? or[e](t._strict, t._locale) : new RegExp(V(e))
                }
                function V(e) {
                    return e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, r, i) {
                        return t || n || r || i
                    }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                }
                function U(e, t) {
                    var n, r = t;
                    for ("string" == typeof e && (e = [e]),
                    "number" == typeof t && (r = function(e, n) {
                        n[t] = v(e)
                    }
                    ),
                    n = 0; n < e.length; n++)
                        sr[e[n]] = r
                }
                function X(e, t) {
                    U(e, function(e, n, r, i) {
                        r._w = r._w || {},
                        t(e, r._w, r, i)
                    })
                }
                function q(e, t, n) {
                    null != t && s(sr, e) && sr[e](t, n._a, n, e)
                }
                function z(e, t) {
                    return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
                }
                function G(e) {
                    return this._months[e.month()]
                }
                function B(e) {
                    return this._monthsShort[e.month()]
                }
                function Z(e, t, n) {
                    var r, i, a;
                    for (this._monthsParse || (this._monthsParse = [],
                    this._longMonthsParse = [],
                    this._shortMonthsParse = []),
                    r = 0; 12 > r; r++) {
                        if (i = l([2e3, r]),
                        n && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp("^" + this.months(i, "").replace(".", "") + "$","i"),
                        this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(i, "").replace(".", "") + "$","i")),
                        n || this._monthsParse[r] || (a = "^" + this.months(i, "") + "|^" + this.monthsShort(i, ""),
                        this._monthsParse[r] = new RegExp(a.replace(".", ""),"i")),
                        n && "MMMM" === t && this._longMonthsParse[r].test(e))
                            return r;
                        if (n && "MMM" === t && this._shortMonthsParse[r].test(e))
                            return r;
                        if (!n && this._monthsParse[r].test(e))
                            return r
                    }
                }
                function J(e, t) {
                    var n;
                    return "string" == typeof t && (t = e.localeData().monthsParse(t),
                    "number" != typeof t) ? e : (n = Math.min(e.date(), z(e.year(), t)),
                    e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
                    e)
                }
                function Q(t) {
                    return null != t ? (J(this, t),
                    e.updateOffset(this, !0),
                    this) : P(this, "Month")
                }
                function K() {
                    return z(this.year(), this.month())
                }
                function ee(e) {
                    var t, n = e._a;
                    return n && -2 === d(e).overflow && (t = n[lr] < 0 || n[lr] > 11 ? lr : n[cr] < 1 || n[cr] > z(n[ur], n[lr]) ? cr : n[dr] < 0 || n[dr] > 24 || 24 === n[dr] && (0 !== n[fr] || 0 !== n[hr] || 0 !== n[pr]) ? dr : n[fr] < 0 || n[fr] > 59 ? fr : n[hr] < 0 || n[hr] > 59 ? hr : n[pr] < 0 || n[pr] > 999 ? pr : -1,
                    d(e)._overflowDayOfYear && (ur > t || t > cr) && (t = cr),
                    d(e).overflow = t),
                    e
                }
                function te(t) {
                    e.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
                }
                function ne(e, t) {
                    var n = !0;
                    return u(function() {
                        return n && (te(e + "\n" + (new Error).stack),
                        n = !1),
                        t.apply(this, arguments)
                    }, t)
                }
                function re(e, t) {
                    yr[e] || (te(t),
                    yr[e] = !0)
                }
                function ie(e) {
                    var t, n, r = e._i, i = vr.exec(r);
                    if (i) {
                        for (d(e).iso = !0,
                        t = 0,
                        n = br.length; n > t; t++)
                            if (br[t][1].exec(r)) {
                                e._f = br[t][0];
                                break
                            }
                        for (t = 0,
                        n = wr.length; n > t; t++)
                            if (wr[t][1].exec(r)) {
                                e._f += (i[6] || " ") + wr[t][0];
                                break
                            }
                        r.match(rr) && (e._f += "Z"),
                        _e(e)
                    } else
                        e._isValid = !1
                }
                function ae(t) {
                    var n = xr.exec(t._i);
                    return null !== n ? void (t._d = new Date(+n[1])) : (ie(t),
                    void (t._isValid === !1 && (delete t._isValid,
                    e.createFromInputFallback(t))))
                }
                function oe(e, t, n, r, i, a, o) {
                    var s = new Date(e,t,n,r,i,a,o);
                    return 1970 > e && s.setFullYear(e),
                    s
                }
                function se(e) {
                    var t = new Date(Date.UTC.apply(null , arguments));
                    return 1970 > e && t.setUTCFullYear(e),
                    t
                }
                function ue(e) {
                    return le(e) ? 366 : 365
                }
                function le(e) {
                    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
                }
                function ce() {
                    return le(this.year())
                }
                function de(e, t, n) {
                    var r, i = n - t, a = n - e.day();
                    return a > i && (a -= 7),
                    i - 7 > a && (a += 7),
                    r = Pe(e).add(a, "d"),
                    {
                        week: Math.ceil(r.dayOfYear() / 7),
                        year: r.year()
                    }
                }
                function fe(e) {
                    return de(e, this._week.dow, this._week.doy).week
                }
                function he() {
                    return this._week.dow
                }
                function pe() {
                    return this._week.doy
                }
                function me(e) {
                    var t = this.localeData().week(this);
                    return null == e ? t : this.add(7 * (e - t), "d")
                }
                function ge(e) {
                    var t = de(this, 1, 4).week;
                    return null == e ? t : this.add(7 * (e - t), "d")
                }
                function ye(e, t, n, r, i) {
                    var a, o = 6 + i - r, s = se(e, 0, 1 + o), u = s.getUTCDay();
                    return i > u && (u += 7),
                    n = null != n ? 1 * n : i,
                    a = 1 + o + 7 * (t - 1) - u + n,
                    {
                        year: a > 0 ? e : e - 1,
                        dayOfYear: a > 0 ? a : ue(e - 1) + a
                    }
                }
                function ve(e) {
                    var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
                    return null == e ? t : this.add(e - t, "d")
                }
                function be(e, t, n) {
                    return null != e ? e : null != t ? t : n
                }
                function we(e) {
                    var t = new Date;
                    return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]
                }
                function xe(e) {
                    var t, n, r, i, a = [];
                    if (!e._d) {
                        for (r = we(e),
                        e._w && null == e._a[cr] && null == e._a[lr] && Te(e),
                        e._dayOfYear && (i = be(e._a[ur], r[ur]),
                        e._dayOfYear > ue(i) && (d(e)._overflowDayOfYear = !0),
                        n = se(i, 0, e._dayOfYear),
                        e._a[lr] = n.getUTCMonth(),
                        e._a[cr] = n.getUTCDate()),
                        t = 0; 3 > t && null == e._a[t]; ++t)
                            e._a[t] = a[t] = r[t];
                        for (; 7 > t; t++)
                            e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
                        24 === e._a[dr] && 0 === e._a[fr] && 0 === e._a[hr] && 0 === e._a[pr] && (e._nextDay = !0,
                        e._a[dr] = 0),
                        e._d = (e._useUTC ? se : oe).apply(null , a),
                        null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
                        e._nextDay && (e._a[dr] = 24)
                    }
                }
                function Te(e) {
                    var t, n, r, i, a, o, s;
                    t = e._w,
                    null != t.GG || null != t.W || null != t.E ? (a = 1,
                    o = 4,
                    n = be(t.GG, e._a[ur], de(Pe(), 1, 4).year),
                    r = be(t.W, 1),
                    i = be(t.E, 1)) : (a = e._locale._week.dow,
                    o = e._locale._week.doy,
                    n = be(t.gg, e._a[ur], de(Pe(), a, o).year),
                    r = be(t.w, 1),
                    null != t.d ? (i = t.d,
                    a > i && ++r) : i = null != t.e ? t.e + a : a),
                    s = ye(n, r, i, o, a),
                    e._a[ur] = s.year,
                    e._dayOfYear = s.dayOfYear
                }
                function _e(t) {
                    if (t._f === e.ISO_8601)
                        return void ie(t);
                    t._a = [],
                    d(t).empty = !0;
                    var n, r, i, a, o, s = "" + t._i, u = s.length, l = 0;
                    for (i = $(t._f, t._locale).match(Rn) || [],
                    n = 0; n < i.length; n++)
                        a = i[n],
                        r = (s.match(R(a, t)) || [])[0],
                        r && (o = s.substr(0, s.indexOf(r)),
                        o.length > 0 && d(t).unusedInput.push(o),
                        s = s.slice(s.indexOf(r) + r.length),
                        l += r.length),
                        Xn[a] ? (r ? d(t).empty = !1 : d(t).unusedTokens.push(a),
                        q(a, r, t)) : t._strict && !r && d(t).unusedTokens.push(a);
                    d(t).charsLeftOver = u - l,
                    s.length > 0 && d(t).unusedInput.push(s),
                    d(t).bigHour === !0 && t._a[dr] <= 12 && t._a[dr] > 0 && (d(t).bigHour = void 0),
                    t._a[dr] = Se(t._locale, t._a[dr], t._meridiem),
                    xe(t),
                    ee(t)
                }
                function Se(e, t, n) {
                    var r;
                    return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (r = e.isPM(n),
                    r && 12 > t && (t += 12),
                    r || 12 !== t || (t = 0),
                    t) : t
                }
                function De(e) {
                    var t, n, r, i, a;
                    if (0 === e._f.length)
                        return d(e).invalidFormat = !0,
                        void (e._d = new Date(NaN));
                    for (i = 0; i < e._f.length; i++)
                        a = 0,
                        t = p({}, e),
                        null != e._useUTC && (t._useUTC = e._useUTC),
                        t._f = e._f[i],
                        _e(t),
                        f(t) && (a += d(t).charsLeftOver,
                        a += 10 * d(t).unusedTokens.length,
                        d(t).score = a,
                        (null == r || r > a) && (r = a,
                        n = t));
                    u(e, n || t)
                }
                function ke(e) {
                    if (!e._d) {
                        var t = E(e._i);
                        e._a = [t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond],
                        xe(e)
                    }
                }
                function Ce(e) {
                    var t = new m(ee(Me(e)));
                    return t._nextDay && (t.add(1, "d"),
                    t._nextDay = void 0),
                    t
                }
                function Me(e) {
                    var t = e._i
                      , n = e._f;
                    return e._locale = e._locale || k(e._l),
                    null === t || void 0 === n && "" === t ? h({
                        nullInput: !0
                    }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)),
                    g(t) ? new m(ee(t)) : (i(n) ? De(e) : n ? _e(e) : a(t) ? e._d = t : Ee(e),
                    e))
                }
                function Ee(t) {
                    var n = t._i;
                    void 0 === n ? t._d = new Date : a(n) ? t._d = new Date(+n) : "string" == typeof n ? ae(t) : i(n) ? (t._a = o(n.slice(0), function(e) {
                        return parseInt(e, 10)
                    }),
                    xe(t)) : "object" == typeof n ? ke(t) : "number" == typeof n ? t._d = new Date(n) : e.createFromInputFallback(t)
                }
                function Ye(e, t, n, r, i) {
                    var a = {};
                    return "boolean" == typeof n && (r = n,
                    n = void 0),
                    a._isAMomentObject = !0,
                    a._useUTC = a._isUTC = i,
                    a._l = n,
                    a._i = e,
                    a._f = t,
                    a._strict = r,
                    Ce(a)
                }
                function Pe(e, t, n, r) {
                    return Ye(e, t, n, r, !1)
                }
                function Oe(e, t) {
                    var n, r;
                    if (1 === t.length && i(t[0]) && (t = t[0]),
                    !t.length)
                        return Pe();
                    for (n = t[0],
                    r = 1; r < t.length; ++r)
                        (!t[r].isValid() || t[r][e](n)) && (n = t[r]);
                    return n
                }
                function Ne() {
                    var e = [].slice.call(arguments, 0);
                    return Oe("isBefore", e)
                }
                function Ae() {
                    var e = [].slice.call(arguments, 0);
                    return Oe("isAfter", e)
                }
                function Fe(e) {
                    var t = E(e)
                      , n = t.year || 0
                      , r = t.quarter || 0
                      , i = t.month || 0
                      , a = t.week || 0
                      , o = t.day || 0
                      , s = t.hour || 0
                      , u = t.minute || 0
                      , l = t.second || 0
                      , c = t.millisecond || 0;
                    this._milliseconds = +c + 1e3 * l + 6e4 * u + 36e5 * s,
                    this._days = +o + 7 * a,
                    this._months = +i + 3 * r + 12 * n,
                    this._data = {},
                    this._locale = k(),
                    this._bubble()
                }
                function Ie(e) {
                    return e instanceof Fe
                }
                function Le(e, t) {
                    F(e, 0, 0, function() {
                        var e = this.utcOffset()
                          , n = "+";
                        return 0 > e && (e = -e,
                        n = "-"),
                        n + A(~~(e / 60), 2) + t + A(~~e % 60, 2)
                    })
                }
                function He(e) {
                    var t = (e || "").match(rr) || []
                      , n = t[t.length - 1] || []
                      , r = (n + "").match(kr) || ["-", 0, 0]
                      , i = +(60 * r[1]) + v(r[2]);
                    return "+" === r[0] ? i : -i
                }
                function $e(t, n) {
                    var r, i;
                    return n._isUTC ? (r = n.clone(),
                    i = (g(t) || a(t) ? +t : +Pe(t)) - +r,
                    r._d.setTime(+r._d + i),
                    e.updateOffset(r, !1),
                    r) : Pe(t).local()
                }
                function je(e) {
                    return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
                }
                function We(t, n) {
                    var r, i = this._offset || 0;
                    return null != t ? ("string" == typeof t && (t = He(t)),
                    Math.abs(t) < 16 && (t = 60 * t),
                    !this._isUTC && n && (r = je(this)),
                    this._offset = t,
                    this._isUTC = !0,
                    null != r && this.add(r, "m"),
                    i !== t && (!n || this._changeInProgress ? rt(this, Qe(t - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
                    e.updateOffset(this, !0),
                    this._changeInProgress = null )),
                    this) : this._isUTC ? i : je(this)
                }
                function Re(e, t) {
                    return null != e ? ("string" != typeof e && (e = -e),
                    this.utcOffset(e, t),
                    this) : -this.utcOffset()
                }
                function Ve(e) {
                    return this.utcOffset(0, e)
                }
                function Ue(e) {
                    return this._isUTC && (this.utcOffset(0, e),
                    this._isUTC = !1,
                    e && this.subtract(je(this), "m")),
                    this
                }
                function Xe() {
                    return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(He(this._i)),
                    this
                }
                function qe(e) {
                    return e = e ? Pe(e).utcOffset() : 0,
                    (this.utcOffset() - e) % 60 === 0
                }
                function ze() {
                    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
                }
                function Ge() {
                    if ("undefined" != typeof this._isDSTShifted)
                        return this._isDSTShifted;
                    var e = {};
                    if (p(e, this),
                    e = Me(e),
                    e._a) {
                        var t = e._isUTC ? l(e._a) : Pe(e._a);
                        this._isDSTShifted = this.isValid() && b(e._a, t.toArray()) > 0
                    } else
                        this._isDSTShifted = !1;
                    return this._isDSTShifted
                }
                function Be() {
                    return !this._isUTC
                }
                function Ze() {
                    return this._isUTC
                }
                function Je() {
                    return this._isUTC && 0 === this._offset
                }
                function Qe(e, t) {
                    var n, r, i, a = e, o = null ;
                    return Ie(e) ? a = {
                        ms: e._milliseconds,
                        d: e._days,
                        M: e._months
                    } : "number" == typeof e ? (a = {},
                    t ? a[t] = e : a.milliseconds = e) : (o = Cr.exec(e)) ? (n = "-" === o[1] ? -1 : 1,
                    a = {
                        y: 0,
                        d: v(o[cr]) * n,
                        h: v(o[dr]) * n,
                        m: v(o[fr]) * n,
                        s: v(o[hr]) * n,
                        ms: v(o[pr]) * n
                    }) : (o = Mr.exec(e)) ? (n = "-" === o[1] ? -1 : 1,
                    a = {
                        y: Ke(o[2], n),
                        M: Ke(o[3], n),
                        d: Ke(o[4], n),
                        h: Ke(o[5], n),
                        m: Ke(o[6], n),
                        s: Ke(o[7], n),
                        w: Ke(o[8], n)
                    }) : null == a ? a = {} : "object" == typeof a && ("from"in a || "to"in a) && (i = tt(Pe(a.from), Pe(a.to)),
                    a = {},
                    a.ms = i.milliseconds,
                    a.M = i.months),
                    r = new Fe(a),
                    Ie(e) && s(e, "_locale") && (r._locale = e._locale),
                    r
                }
                function Ke(e, t) {
                    var n = e && parseFloat(e.replace(",", "."));
                    return (isNaN(n) ? 0 : n) * t
                }
                function et(e, t) {
                    var n = {
                        milliseconds: 0,
                        months: 0
                    };
                    return n.months = t.month() - e.month() + 12 * (t.year() - e.year()),
                    e.clone().add(n.months, "M").isAfter(t) && --n.months,
                    n.milliseconds = +t - +e.clone().add(n.months, "M"),
                    n
                }
                function tt(e, t) {
                    var n;
                    return t = $e(t, e),
                    e.isBefore(t) ? n = et(e, t) : (n = et(t, e),
                    n.milliseconds = -n.milliseconds,
                    n.months = -n.months),
                    n
                }
                function nt(e, t) {
                    return function(n, r) {
                        var i, a;
                        return null === r || isNaN(+r) || (re(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."),
                        a = n,
                        n = r,
                        r = a),
                        n = "string" == typeof n ? +n : n,
                        i = Qe(n, r),
                        rt(this, i, e),
                        this
                    }
                }
                function rt(t, n, r, i) {
                    var a = n._milliseconds
                      , o = n._days
                      , s = n._months;
                    i = null == i ? !0 : i,
                    a && t._d.setTime(+t._d + a * r),
                    o && O(t, "Date", P(t, "Date") + o * r),
                    s && J(t, P(t, "Month") + s * r),
                    i && e.updateOffset(t, o || s)
                }
                function it(e, t) {
                    var n = e || Pe()
                      , r = $e(n, this).startOf("day")
                      , i = this.diff(r, "days", !0)
                      , a = -6 > i ? "sameElse" : -1 > i ? "lastWeek" : 0 > i ? "lastDay" : 1 > i ? "sameDay" : 2 > i ? "nextDay" : 7 > i ? "nextWeek" : "sameElse";
                    return this.format(t && t[a] || this.localeData().calendar(a, this, Pe(n)))
                }
                function at() {
                    return new m(this)
                }
                function ot(e, t) {
                    var n;
                    return t = M("undefined" != typeof t ? t : "millisecond"),
                    "millisecond" === t ? (e = g(e) ? e : Pe(e),
                    +this > +e) : (n = g(e) ? +e : +Pe(e),
                    n < +this.clone().startOf(t))
                }
                function st(e, t) {
                    var n;
                    return t = M("undefined" != typeof t ? t : "millisecond"),
                    "millisecond" === t ? (e = g(e) ? e : Pe(e),
                    +e > +this) : (n = g(e) ? +e : +Pe(e),
                    +this.clone().endOf(t) < n)
                }
                function ut(e, t, n) {
                    return this.isAfter(e, n) && this.isBefore(t, n)
                }
                function lt(e, t) {
                    var n;
                    return t = M(t || "millisecond"),
                    "millisecond" === t ? (e = g(e) ? e : Pe(e),
                    +this === +e) : (n = +Pe(e),
                    +this.clone().startOf(t) <= n && n <= +this.clone().endOf(t))
                }
                function ct(e, t, n) {
                    var r, i, a = $e(e, this), o = 6e4 * (a.utcOffset() - this.utcOffset());
                    return t = M(t),
                    "year" === t || "month" === t || "quarter" === t ? (i = dt(this, a),
                    "quarter" === t ? i /= 3 : "year" === t && (i /= 12)) : (r = this - a,
                    i = "second" === t ? r / 1e3 : "minute" === t ? r / 6e4 : "hour" === t ? r / 36e5 : "day" === t ? (r - o) / 864e5 : "week" === t ? (r - o) / 6048e5 : r),
                    n ? i : y(i)
                }
                function dt(e, t) {
                    var n, r, i = 12 * (t.year() - e.year()) + (t.month() - e.month()), a = e.clone().add(i, "months");
                    return 0 > t - a ? (n = e.clone().add(i - 1, "months"),
                    r = (t - a) / (a - n)) : (n = e.clone().add(i + 1, "months"),
                    r = (t - a) / (n - a)),
                    -(i + r)
                }
                function ft() {
                    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                }
                function ht() {
                    var e = this.clone().utc();
                    return 0 < e.year() && e.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : H(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : H(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                }
                function pt(t) {
                    var n = H(this, t || e.defaultFormat);
                    return this.localeData().postformat(n)
                }
                function mt(e, t) {
                    return this.isValid() ? Qe({
                        to: this,
                        from: e
                    }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
                }
                function gt(e) {
                    return this.from(Pe(), e)
                }
                function yt(e, t) {
                    return this.isValid() ? Qe({
                        from: this,
                        to: e
                    }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
                }
                function vt(e) {
                    return this.to(Pe(), e)
                }
                function bt(e) {
                    var t;
                    return void 0 === e ? this._locale._abbr : (t = k(e),
                    null != t && (this._locale = t),
                    this)
                }
                function wt() {
                    return this._locale
                }
                function xt(e) {
                    switch (e = M(e)) {
                    case "year":
                        this.month(0);
                    case "quarter":
                    case "month":
                        this.date(1);
                    case "week":
                    case "isoWeek":
                    case "day":
                        this.hours(0);
                    case "hour":
                        this.minutes(0);
                    case "minute":
                        this.seconds(0);
                    case "second":
                        this.milliseconds(0)
                    }
                    return "week" === e && this.weekday(0),
                    "isoWeek" === e && this.isoWeekday(1),
                    "quarter" === e && this.month(3 * Math.floor(this.month() / 3)),
                    this
                }
                function Tt(e) {
                    return e = M(e),
                    void 0 === e || "millisecond" === e ? this : this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms")
                }
                function _t() {
                    return +this._d - 6e4 * (this._offset || 0)
                }
                function St() {
                    return Math.floor(+this / 1e3)
                }
                function Dt() {
                    return this._offset ? new Date(+this) : this._d
                }
                function kt() {
                    var e = this;
                    return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
                }
                function Ct() {
                    var e = this;
                    return {
                        years: e.year(),
                        months: e.month(),
                        date: e.date(),
                        hours: e.hours(),
                        minutes: e.minutes(),
                        seconds: e.seconds(),
                        milliseconds: e.milliseconds()
                    }
                }
                function Mt() {
                    return f(this)
                }
                function Et() {
                    return u({}, d(this))
                }
                function Yt() {
                    return d(this).overflow
                }
                function Pt(e, t) {
                    F(0, [e, e.length], 0, t)
                }
                function Ot(e, t, n) {
                    return de(Pe([e, 11, 31 + t - n]), t, n).week
                }
                function Nt(e) {
                    var t = de(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
                    return null == e ? t : this.add(e - t, "y")
                }
                function At(e) {
                    var t = de(this, 1, 4).year;
                    return null == e ? t : this.add(e - t, "y")
                }
                function Ft() {
                    return Ot(this.year(), 1, 4)
                }
                function It() {
                    var e = this.localeData()._week;
                    return Ot(this.year(), e.dow, e.doy)
                }
                function Lt(e) {
                    return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
                }
                function Ht(e, t) {
                    return "string" != typeof e ? e : isNaN(e) ? (e = t.weekdaysParse(e),
                    "number" == typeof e ? e : null ) : parseInt(e, 10)
                }
                function $t(e) {
                    return this._weekdays[e.day()]
                }
                function jt(e) {
                    return this._weekdaysShort[e.day()]
                }
                function Wt(e) {
                    return this._weekdaysMin[e.day()]
                }
                function Rt(e) {
                    var t, n, r;
                    for (this._weekdaysParse = this._weekdaysParse || [],
                    t = 0; 7 > t; t++)
                        if (this._weekdaysParse[t] || (n = Pe([2e3, 1]).day(t),
                        r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""),
                        this._weekdaysParse[t] = new RegExp(r.replace(".", ""),"i")),
                        this._weekdaysParse[t].test(e))
                            return t
                }
                function Vt(e) {
                    var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                    return null != e ? (e = Ht(e, this.localeData()),
                    this.add(e - t, "d")) : t
                }
                function Ut(e) {
                    var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
                    return null == e ? t : this.add(e - t, "d")
                }
                function Xt(e) {
                    return null == e ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7)
                }
                function qt(e, t) {
                    F(e, 0, 0, function() {
                        return this.localeData().meridiem(this.hours(), this.minutes(), t)
                    })
                }
                function zt(e, t) {
                    return t._meridiemParse
                }
                function Gt(e) {
                    return "p" === (e + "").toLowerCase().charAt(0)
                }
                function Bt(e, t, n) {
                    return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
                }
                function Zt(e, t) {
                    t[pr] = v(1e3 * ("0." + e))
                }
                function Jt() {
                    return this._isUTC ? "UTC" : ""
                }
                function Qt() {
                    return this._isUTC ? "Coordinated Universal Time" : ""
                }
                function Kt(e) {
                    return Pe(1e3 * e)
                }
                function en() {
                    return Pe.apply(null , arguments).parseZone()
                }
                function tn(e, t, n) {
                    var r = this._calendar[e];
                    return "function" == typeof r ? r.call(t, n) : r
                }
                function nn(e) {
                    var t = this._longDateFormat[e]
                      , n = this._longDateFormat[e.toUpperCase()];
                    return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
                        return e.slice(1)
                    }),
                    this._longDateFormat[e])
                }
                function rn() {
                    return this._invalidDate
                }
                function an(e) {
                    return this._ordinal.replace("%d", e)
                }
                function on(e) {
                    return e
                }
                function sn(e, t, n, r) {
                    var i = this._relativeTime[n];
                    return "function" == typeof i ? i(e, t, n, r) : i.replace(/%d/i, e)
                }
                function un(e, t) {
                    var n = this._relativeTime[e > 0 ? "future" : "past"];
                    return "function" == typeof n ? n(t) : n.replace(/%s/i, t)
                }
                function ln(e) {
                    var t, n;
                    for (n in e)
                        t = e[n],
                        "function" == typeof t ? this[n] = t : this["_" + n] = t;
                    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
                }
                function cn(e, t, n, r) {
                    var i = k()
                      , a = l().set(r, t);
                    return i[n](a, e)
                }
                function dn(e, t, n, r, i) {
                    if ("number" == typeof e && (t = e,
                    e = void 0),
                    e = e || "",
                    null != t)
                        return cn(e, t, n, i);
                    var a, o = [];
                    for (a = 0; r > a; a++)
                        o[a] = cn(e, a, n, i);
                    return o
                }
                function fn(e, t) {
                    return dn(e, t, "months", 12, "month")
                }
                function hn(e, t) {
                    return dn(e, t, "monthsShort", 12, "month")
                }
                function pn(e, t) {
                    return dn(e, t, "weekdays", 7, "day")
                }
                function mn(e, t) {
                    return dn(e, t, "weekdaysShort", 7, "day")
                }
                function gn(e, t) {
                    return dn(e, t, "weekdaysMin", 7, "day")
                }
                function yn() {
                    var e = this._data;
                    return this._milliseconds = Jr(this._milliseconds),
                    this._days = Jr(this._days),
                    this._months = Jr(this._months),
                    e.milliseconds = Jr(e.milliseconds),
                    e.seconds = Jr(e.seconds),
                    e.minutes = Jr(e.minutes),
                    e.hours = Jr(e.hours),
                    e.months = Jr(e.months),
                    e.years = Jr(e.years),
                    this
                }
                function vn(e, t, n, r) {
                    var i = Qe(t, n);
                    return e._milliseconds += r * i._milliseconds,
                    e._days += r * i._days,
                    e._months += r * i._months,
                    e._bubble()
                }
                function bn(e, t) {
                    return vn(this, e, t, 1)
                }
                function wn(e, t) {
                    return vn(this, e, t, -1)
                }
                function xn(e) {
                    return 0 > e ? Math.floor(e) : Math.ceil(e)
                }
                function Tn() {
                    var e, t, n, r, i, a = this._milliseconds, o = this._days, s = this._months, u = this._data;
                    return a >= 0 && o >= 0 && s >= 0 || 0 >= a && 0 >= o && 0 >= s || (a += 864e5 * xn(Sn(s) + o),
                    o = 0,
                    s = 0),
                    u.milliseconds = a % 1e3,
                    e = y(a / 1e3),
                    u.seconds = e % 60,
                    t = y(e / 60),
                    u.minutes = t % 60,
                    n = y(t / 60),
                    u.hours = n % 24,
                    o += y(n / 24),
                    i = y(_n(o)),
                    s += i,
                    o -= xn(Sn(i)),
                    r = y(s / 12),
                    s %= 12,
                    u.days = o,
                    u.months = s,
                    u.years = r,
                    this
                }
                function _n(e) {
                    return 4800 * e / 146097
                }
                function Sn(e) {
                    return 146097 * e / 4800
                }
                function Dn(e) {
                    var t, n, r = this._milliseconds;
                    if (e = M(e),
                    "month" === e || "year" === e)
                        return t = this._days + r / 864e5,
                        n = this._months + _n(t),
                        "month" === e ? n : n / 12;
                    switch (t = this._days + Math.round(Sn(this._months)),
                    e) {
                    case "week":
                        return t / 7 + r / 6048e5;
                    case "day":
                        return t + r / 864e5;
                    case "hour":
                        return 24 * t + r / 36e5;
                    case "minute":
                        return 1440 * t + r / 6e4;
                    case "second":
                        return 86400 * t + r / 1e3;
                    case "millisecond":
                        return Math.floor(864e5 * t) + r;
                    default:
                        throw new Error("Unknown unit " + e)
                    }
                }
                function kn() {
                    return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * v(this._months / 12)
                }
                function Cn(e) {
                    return function() {
                        return this.as(e)
                    }
                }
                function Mn(e) {
                    return e = M(e),
                    this[e + "s"]()
                }
                function En(e) {
                    return function() {
                        return this._data[e]
                    }
                }
                function Yn() {
                    return y(this.days() / 7)
                }
                function Pn(e, t, n, r, i) {
                    return i.relativeTime(t || 1, !!n, e, r)
                }
                function On(e, t, n) {
                    var r = Qe(e).abs()
                      , i = hi(r.as("s"))
                      , a = hi(r.as("m"))
                      , o = hi(r.as("h"))
                      , s = hi(r.as("d"))
                      , u = hi(r.as("M"))
                      , l = hi(r.as("y"))
                      , c = i < pi.s && ["s", i] || 1 === a && ["m"] || a < pi.m && ["mm", a] || 1 === o && ["h"] || o < pi.h && ["hh", o] || 1 === s && ["d"] || s < pi.d && ["dd", s] || 1 === u && ["M"] || u < pi.M && ["MM", u] || 1 === l && ["y"] || ["yy", l];
                    return c[2] = t,
                    c[3] = +e > 0,
                    c[4] = n,
                    Pn.apply(null , c)
                }
                function Nn(e, t) {
                    return void 0 === pi[e] ? !1 : void 0 === t ? pi[e] : (pi[e] = t,
                    !0)
                }
                function An(e) {
                    var t = this.localeData()
                      , n = On(this, !e, t);
                    return e && (n = t.pastFuture(+this, n)),
                    t.postformat(n)
                }
                function Fn() {
                    var e, t, n, r = mi(this._milliseconds) / 1e3, i = mi(this._days), a = mi(this._months);
                    e = y(r / 60),
                    t = y(e / 60),
                    r %= 60,
                    e %= 60,
                    n = y(a / 12),
                    a %= 12;
                    var o = n
                      , s = a
                      , u = i
                      , l = t
                      , c = e
                      , d = r
                      , f = this.asSeconds();
                    return f ? (0 > f ? "-" : "") + "P" + (o ? o + "Y" : "") + (s ? s + "M" : "") + (u ? u + "D" : "") + (l || c || d ? "T" : "") + (l ? l + "H" : "") + (c ? c + "M" : "") + (d ? d + "S" : "") : "P0D"
                }
                var In, Ln, Hn = e.momentProperties = [], $n = !1, jn = {}, Wn = {}, Rn = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Vn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Un = {}, Xn = {}, qn = /\d/, zn = /\d\d/, Gn = /\d{3}/, Bn = /\d{4}/, Zn = /[+-]?\d{6}/, Jn = /\d\d?/, Qn = /\d{1,3}/, Kn = /\d{1,4}/, er = /[+-]?\d{1,6}/, tr = /\d+/, nr = /[+-]?\d+/, rr = /Z|[+-]\d\d:?\d\d/gi, ir = /[+-]?\d+(\.\d{1,3})?/, ar = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, or = {}, sr = {}, ur = 0, lr = 1, cr = 2, dr = 3, fr = 4, hr = 5, pr = 6;
                F("M", ["MM", 2], "Mo", function() {
                    return this.month() + 1
                }),
                F("MMM", 0, 0, function(e) {
                    return this.localeData().monthsShort(this, e)
                }),
                F("MMMM", 0, 0, function(e) {
                    return this.localeData().months(this, e)
                }),
                C("month", "M"),
                W("M", Jn),
                W("MM", Jn, zn),
                W("MMM", ar),
                W("MMMM", ar),
                U(["M", "MM"], function(e, t) {
                    t[lr] = v(e) - 1
                }),
                U(["MMM", "MMMM"], function(e, t, n, r) {
                    var i = n._locale.monthsParse(e, r, n._strict);
                    null != i ? t[lr] = i : d(n).invalidMonth = e
                });
                var mr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
                  , gr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
                  , yr = {};
                e.suppressDeprecationWarnings = !1;
                var vr = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
                  , br = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]]
                  , wr = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]]
                  , xr = /^\/?Date\((\-?\d+)/i;
                e.createFromInputFallback = ne("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
                    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
                }),
                F(0, ["YY", 2], 0, function() {
                    return this.year() % 100
                }),
                F(0, ["YYYY", 4], 0, "year"),
                F(0, ["YYYYY", 5], 0, "year"),
                F(0, ["YYYYYY", 6, !0], 0, "year"),
                C("year", "y"),
                W("Y", nr),
                W("YY", Jn, zn),
                W("YYYY", Kn, Bn),
                W("YYYYY", er, Zn),
                W("YYYYYY", er, Zn),
                U(["YYYYY", "YYYYYY"], ur),
                U("YYYY", function(t, n) {
                    n[ur] = 2 === t.length ? e.parseTwoDigitYear(t) : v(t)
                }),
                U("YY", function(t, n) {
                    n[ur] = e.parseTwoDigitYear(t)
                }),
                e.parseTwoDigitYear = function(e) {
                    return v(e) + (v(e) > 68 ? 1900 : 2e3)
                }
                ;
                var Tr = Y("FullYear", !1);
                F("w", ["ww", 2], "wo", "week"),
                F("W", ["WW", 2], "Wo", "isoWeek"),
                C("week", "w"),
                C("isoWeek", "W"),
                W("w", Jn),
                W("ww", Jn, zn),
                W("W", Jn),
                W("WW", Jn, zn),
                X(["w", "ww", "W", "WW"], function(e, t, n, r) {
                    t[r.substr(0, 1)] = v(e)
                });
                var _r = {
                    dow: 0,
                    doy: 6
                };
                F("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
                C("dayOfYear", "DDD"),
                W("DDD", Qn),
                W("DDDD", Gn),
                U(["DDD", "DDDD"], function(e, t, n) {
                    n._dayOfYear = v(e)
                }),
                e.ISO_8601 = function() {}
                ;
                var Sr = ne("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
                    var e = Pe.apply(null , arguments);
                    return this > e ? this : e
                })
                  , Dr = ne("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
                    var e = Pe.apply(null , arguments);
                    return e > this ? this : e
                });
                Le("Z", ":"),
                Le("ZZ", ""),
                W("Z", rr),
                W("ZZ", rr),
                U(["Z", "ZZ"], function(e, t, n) {
                    n._useUTC = !0,
                    n._tzm = He(e)
                });
                var kr = /([\+\-]|\d\d)/gi;
                e.updateOffset = function() {}
                ;
                var Cr = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/
                  , Mr = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
                Qe.fn = Fe.prototype;
                var Er = nt(1, "add")
                  , Yr = nt(-1, "subtract");
                e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
                var Pr = ne("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
                    return void 0 === e ? this.localeData() : this.locale(e)
                });
                F(0, ["gg", 2], 0, function() {
                    return this.weekYear() % 100
                }),
                F(0, ["GG", 2], 0, function() {
                    return this.isoWeekYear() % 100
                }),
                Pt("gggg", "weekYear"),
                Pt("ggggg", "weekYear"),
                Pt("GGGG", "isoWeekYear"),
                Pt("GGGGG", "isoWeekYear"),
                C("weekYear", "gg"),
                C("isoWeekYear", "GG"),
                W("G", nr),
                W("g", nr),
                W("GG", Jn, zn),
                W("gg", Jn, zn),
                W("GGGG", Kn, Bn),
                W("gggg", Kn, Bn),
                W("GGGGG", er, Zn),
                W("ggggg", er, Zn),
                X(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, r) {
                    t[r.substr(0, 2)] = v(e)
                }),
                X(["gg", "GG"], function(t, n, r, i) {
                    n[i] = e.parseTwoDigitYear(t)
                }),
                F("Q", 0, 0, "quarter"),
                C("quarter", "Q"),
                W("Q", qn),
                U("Q", function(e, t) {
                    t[lr] = 3 * (v(e) - 1)
                }),
                F("D", ["DD", 2], "Do", "date"),
                C("date", "D"),
                W("D", Jn),
                W("DD", Jn, zn),
                W("Do", function(e, t) {
                    return e ? t._ordinalParse : t._ordinalParseLenient
                }),
                U(["D", "DD"], cr),
                U("Do", function(e, t) {
                    t[cr] = v(e.match(Jn)[0], 10)
                });
                var Or = Y("Date", !0);
                F("d", 0, "do", "day"),
                F("dd", 0, 0, function(e) {
                    return this.localeData().weekdaysMin(this, e)
                }),
                F("ddd", 0, 0, function(e) {
                    return this.localeData().weekdaysShort(this, e)
                }),
                F("dddd", 0, 0, function(e) {
                    return this.localeData().weekdays(this, e)
                }),
                F("e", 0, 0, "weekday"),
                F("E", 0, 0, "isoWeekday"),
                C("day", "d"),
                C("weekday", "e"),
                C("isoWeekday", "E"),
                W("d", Jn),
                W("e", Jn),
                W("E", Jn),
                W("dd", ar),
                W("ddd", ar),
                W("dddd", ar),
                X(["dd", "ddd", "dddd"], function(e, t, n) {
                    var r = n._locale.weekdaysParse(e);
                    null != r ? t.d = r : d(n).invalidWeekday = e
                }),
                X(["d", "e", "E"], function(e, t, n, r) {
                    t[r] = v(e)
                });
                var Nr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
                  , Ar = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
                  , Fr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
                F("H", ["HH", 2], 0, "hour"),
                F("h", ["hh", 2], 0, function() {
                    return this.hours() % 12 || 12
                }),
                qt("a", !0),
                qt("A", !1),
                C("hour", "h"),
                W("a", zt),
                W("A", zt),
                W("H", Jn),
                W("h", Jn),
                W("HH", Jn, zn),
                W("hh", Jn, zn),
                U(["H", "HH"], dr),
                U(["a", "A"], function(e, t, n) {
                    n._isPm = n._locale.isPM(e),
                    n._meridiem = e
                }),
                U(["h", "hh"], function(e, t, n) {
                    t[dr] = v(e),
                    d(n).bigHour = !0
                });
                var Ir = /[ap]\.?m?\.?/i
                  , Lr = Y("Hours", !0);
                F("m", ["mm", 2], 0, "minute"),
                C("minute", "m"),
                W("m", Jn),
                W("mm", Jn, zn),
                U(["m", "mm"], fr);
                var Hr = Y("Minutes", !1);
                F("s", ["ss", 2], 0, "second"),
                C("second", "s"),
                W("s", Jn),
                W("ss", Jn, zn),
                U(["s", "ss"], hr);
                var $r = Y("Seconds", !1);
                F("S", 0, 0, function() {
                    return ~~(this.millisecond() / 100)
                }),
                F(0, ["SS", 2], 0, function() {
                    return ~~(this.millisecond() / 10)
                }),
                F(0, ["SSS", 3], 0, "millisecond"),
                F(0, ["SSSS", 4], 0, function() {
                    return 10 * this.millisecond()
                }),
                F(0, ["SSSSS", 5], 0, function() {
                    return 100 * this.millisecond()
                }),
                F(0, ["SSSSSS", 6], 0, function() {
                    return 1e3 * this.millisecond()
                }),
                F(0, ["SSSSSSS", 7], 0, function() {
                    return 1e4 * this.millisecond()
                }),
                F(0, ["SSSSSSSS", 8], 0, function() {
                    return 1e5 * this.millisecond()
                }),
                F(0, ["SSSSSSSSS", 9], 0, function() {
                    return 1e6 * this.millisecond()
                }),
                C("millisecond", "ms"),
                W("S", Qn, qn),
                W("SS", Qn, zn),
                W("SSS", Qn, Gn);
                var jr;
                for (jr = "SSSS"; jr.length <= 9; jr += "S")
                    W(jr, tr);
                for (jr = "S"; jr.length <= 9; jr += "S")
                    U(jr, Zt);
                var Wr = Y("Milliseconds", !1);
                F("z", 0, 0, "zoneAbbr"),
                F("zz", 0, 0, "zoneName");
                var Rr = m.prototype;
                Rr.add = Er,
                Rr.calendar = it,
                Rr.clone = at,
                Rr.diff = ct,
                Rr.endOf = Tt,
                Rr.format = pt,
                Rr.from = mt,
                Rr.fromNow = gt,
                Rr.to = yt,
                Rr.toNow = vt,
                Rr.get = N,
                Rr.invalidAt = Yt,
                Rr.isAfter = ot,
                Rr.isBefore = st,
                Rr.isBetween = ut,
                Rr.isSame = lt,
                Rr.isValid = Mt,
                Rr.lang = Pr,
                Rr.locale = bt,
                Rr.localeData = wt,
                Rr.max = Dr,
                Rr.min = Sr,
                Rr.parsingFlags = Et,
                Rr.set = N,
                Rr.startOf = xt,
                Rr.subtract = Yr,
                Rr.toArray = kt,
                Rr.toObject = Ct,
                Rr.toDate = Dt,
                Rr.toISOString = ht,
                Rr.toJSON = ht,
                Rr.toString = ft,
                Rr.unix = St,
                Rr.valueOf = _t,
                Rr.year = Tr,
                Rr.isLeapYear = ce,
                Rr.weekYear = Nt,
                Rr.isoWeekYear = At,
                Rr.quarter = Rr.quarters = Lt,
                Rr.month = Q,
                Rr.daysInMonth = K,
                Rr.week = Rr.weeks = me,
                Rr.isoWeek = Rr.isoWeeks = ge,
                Rr.weeksInYear = It,
                Rr.isoWeeksInYear = Ft,
                Rr.date = Or,
                Rr.day = Rr.days = Vt,
                Rr.weekday = Ut,
                Rr.isoWeekday = Xt,
                Rr.dayOfYear = ve,
                Rr.hour = Rr.hours = Lr,
                Rr.minute = Rr.minutes = Hr,
                Rr.second = Rr.seconds = $r,
                Rr.millisecond = Rr.milliseconds = Wr,
                Rr.utcOffset = We,
                Rr.utc = Ve,
                Rr.local = Ue,
                Rr.parseZone = Xe,
                Rr.hasAlignedHourOffset = qe,
                Rr.isDST = ze,
                Rr.isDSTShifted = Ge,
                Rr.isLocal = Be,
                Rr.isUtcOffset = Ze,
                Rr.isUtc = Je,
                Rr.isUTC = Je,
                Rr.zoneAbbr = Jt,
                Rr.zoneName = Qt,
                Rr.dates = ne("dates accessor is deprecated. Use date instead.", Or),
                Rr.months = ne("months accessor is deprecated. Use month instead", Q),
                Rr.years = ne("years accessor is deprecated. Use year instead", Tr),
                Rr.zone = ne("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Re);
                var Vr = Rr
                  , Ur = {
                    sameDay: "[Today at] LT",
                    nextDay: "[Tomorrow at] LT",
                    nextWeek: "dddd [at] LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[Last] dddd [at] LT",
                    sameElse: "L"
                }
                  , Xr = {
                    LTS: "h:mm:ss A",
                    LT: "h:mm A",
                    L: "MM/DD/YYYY",
                    LL: "MMMM D, YYYY",
                    LLL: "MMMM D, YYYY h:mm A",
                    LLLL: "dddd, MMMM D, YYYY h:mm A"
                }
                  , qr = "Invalid date"
                  , zr = "%d"
                  , Gr = /\d{1,2}/
                  , Br = {
                    future: "in %s",
                    past: "%s ago",
                    s: "a few seconds",
                    m: "a minute",
                    mm: "%d minutes",
                    h: "an hour",
                    hh: "%d hours",
                    d: "a day",
                    dd: "%d days",
                    M: "a month",
                    MM: "%d months",
                    y: "a year",
                    yy: "%d years"
                }
                  , Zr = w.prototype;
                Zr._calendar = Ur,
                Zr.calendar = tn,
                Zr._longDateFormat = Xr,
                Zr.longDateFormat = nn,
                Zr._invalidDate = qr,
                Zr.invalidDate = rn,
                Zr._ordinal = zr,
                Zr.ordinal = an,
                Zr._ordinalParse = Gr,
                Zr.preparse = on,
                Zr.postformat = on,
                Zr._relativeTime = Br,
                Zr.relativeTime = sn,
                Zr.pastFuture = un,
                Zr.set = ln,
                Zr.months = G,
                Zr._months = mr,
                Zr.monthsShort = B,
                Zr._monthsShort = gr,
                Zr.monthsParse = Z,
                Zr.week = fe,
                Zr._week = _r,
                Zr.firstDayOfYear = pe,
                Zr.firstDayOfWeek = he,
                Zr.weekdays = $t,
                Zr._weekdays = Nr,
                Zr.weekdaysMin = Wt,
                Zr._weekdaysMin = Fr,
                Zr.weekdaysShort = jt,
                Zr._weekdaysShort = Ar,
                Zr.weekdaysParse = Rt,
                Zr.isPM = Gt,
                Zr._meridiemParse = Ir,
                Zr.meridiem = Bt,
                S("en", {
                    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
                    ordinal: function(e) {
                        var t = e % 10
                          , n = 1 === v(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
                        return e + n
                    }
                }),
                e.lang = ne("moment.lang is deprecated. Use moment.locale instead.", S),
                e.langData = ne("moment.langData is deprecated. Use moment.localeData instead.", k);
                var Jr = Math.abs
                  , Qr = Cn("ms")
                  , Kr = Cn("s")
                  , ei = Cn("m")
                  , ti = Cn("h")
                  , ni = Cn("d")
                  , ri = Cn("w")
                  , ii = Cn("M")
                  , ai = Cn("y")
                  , oi = En("milliseconds")
                  , si = En("seconds")
                  , ui = En("minutes")
                  , li = En("hours")
                  , ci = En("days")
                  , di = En("months")
                  , fi = En("years")
                  , hi = Math.round
                  , pi = {
                    s: 45,
                    m: 45,
                    h: 22,
                    d: 26,
                    M: 11
                }
                  , mi = Math.abs
                  , gi = Fe.prototype;
                gi.abs = yn,
                gi.add = bn,
                gi.subtract = wn,
                gi.as = Dn,
                gi.asMilliseconds = Qr,
                gi.asSeconds = Kr,
                gi.asMinutes = ei,
                gi.asHours = ti,
                gi.asDays = ni,
                gi.asWeeks = ri,
                gi.asMonths = ii,
                gi.asYears = ai,
                gi.valueOf = kn,
                gi._bubble = Tn,
                gi.get = Mn,
                gi.milliseconds = oi,
                gi.seconds = si,
                gi.minutes = ui,
                gi.hours = li,
                gi.days = ci,
                gi.weeks = Yn,
                gi.months = di,
                gi.years = fi,
                gi.humanize = An,
                gi.toISOString = Fn,
                gi.toString = Fn,
                gi.toJSON = Fn,
                gi.locale = bt,
                gi.localeData = wt,
                gi.toIsoString = ne("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Fn),
                gi.lang = Pr,
                F("X", 0, 0, "unix"),
                F("x", 0, 0, "valueOf"),
                W("x", nr),
                W("X", ir),
                U("X", function(e, t, n) {
                    n._d = new Date(1e3 * parseFloat(e, 10))
                }),
                U("x", function(e, t, n) {
                    n._d = new Date(v(e))
                }),
                e.version = "2.10.6",
                r(Pe),
                e.fn = Vr,
                e.min = Ne,
                e.max = Ae,
                e.utc = l,
                e.unix = Kt,
                e.months = fn,
                e.isDate = a,
                e.locale = S,
                e.invalid = h,
                e.duration = Qe,
                e.isMoment = g,
                e.weekdays = pn,
                e.parseZone = en,
                e.localeData = k,
                e.isDuration = Ie,
                e.monthsShort = hn,
                e.weekdaysMin = gn,
                e.defineLocale = D,
                e.weekdaysShort = mn,
                e.normalizeUnits = M,
                e.relativeTimeThreshold = Nn;
                var yi = e;
                return yi
            })
        }
        , {}],
        2: [function(e, t, n) {
            var r = n.options = e("./options");
            n.Parser = e("./parsers/parser").Parser,
            n.Refiner = e("./refiners/refiner").Filter,
            n.Filter = e("./refiners/refiner").Filter,
            n.ParsedResult = e("./result").ParsedResult,
            n.ParsedComponents = e("./result").ParsedComponents;
            var i = function(e) {
                e = e || n.options.strictOption(),
                this.option = e,
                this.parsers = new Object(e.parsers),
                this.refiners = new Object(e.refiners)
            }
            ;
            i.prototype.parse = function(e, t, n) {
                t = t || new Date,
                n = n || {};
                var r = [];
                return this.parsers.forEach(function(i) {
                    var a = i.execute(e, t, n);
                    r = r.concat(a)
                }),
                r.sort(function(e, t) {
                    return e.index - t.index
                }),
                this.refiners.forEach(function(t) {
                    r = t.refine(e, r, n)
                }),
                r
            }
            ,
            i.prototype.parseDate = function(e, t, n) {
                var r = this.parse(e, t, n);
                return r.length > 0 ? r[0].start.date() : null
            }
            ,
            n.Chrono = i,
            n.strict = new i(r.strictOption()),
            n.casual = new i(r.casualOption()),
            n.parse = function() {
                return n.casual.parse.apply(n.casual, arguments)
            }
            ,
            n.parseDate = function() {
                return n.casual.parseDate.apply(n.casual, arguments)
            }
        }
        , {
            "./options": 3,
            "./parsers/parser": 16,
            "./refiners/refiner": 24,
            "./result": 25
        }],
        3: [function(e, t, n) {
            var r = e("./parsers/EN/ENISOFormatParser").Parser
              , i = e("./parsers/EN/ENDateFormatParser").Parser
              , a = e("./parsers/EN/ENDeadlineFormatParser").Parser
              , o = e("./parsers/EN/ENMonthNameLittleEndianParser").Parser
              , s = e("./parsers/EN/ENMonthNameMiddleEndianParser").Parser
              , u = e("./parsers/EN/ENSlashDateFormatParser").Parser
              , l = e("./parsers/EN/ENTimeAgoFormatParser").Parser
              , c = e("./parsers/EN/ENTimeExpressionParser").Parser
              , d = e("./parsers/EN/ENWeekdayParser").Parser
              , f = e("./parsers/EN/ENCasualDateParser").Parser
              , h = e("./refiners/EN/ENMergeDateTimeRefiner").Refiner
              , p = e("./refiners/EN/ENMergeDateRangeRefiner").Refiner
              , m = e("./parsers/JP/JPStandardParser").Parser
              , g = e("./parsers/JP/JPCasualDateParser").Parser
              , y = e("./refiners/JP/JPMergeDateRangeRefiner").Refiner
              , v = e("./refiners/OverlapRemovalRefiner").Refiner
              , b = e("./refiners/ExtractTimezoneOffsetRefiner").Refiner
              , w = e("./refiners/ExtractTimezoneAbbrRefiner").Refiner
              , x = e("./refiners/UnlikelyFormatFilter").Refiner;
            n.strictOption = function() {
                return {
                    parsers: [new r, new i, new a, new o, new s, new u, new l, new c, new m],
                    refiners: [new v, new h, new p, new y, new b, new w, new x]
                }
            }
            ,
            n.casualOption = function() {
                var e = n.strictOption();
                return e.parsers.unshift(new f),
                e.parsers.unshift(new d),
                e.parsers.unshift(new g),
                e
            }
        }
        , {
            "./parsers/EN/ENCasualDateParser": 4,
            "./parsers/EN/ENDateFormatParser": 5,
            "./parsers/EN/ENDeadlineFormatParser": 6,
            "./parsers/EN/ENISOFormatParser": 7,
            "./parsers/EN/ENMonthNameLittleEndianParser": 8,
            "./parsers/EN/ENMonthNameMiddleEndianParser": 9,
            "./parsers/EN/ENSlashDateFormatParser": 10,
            "./parsers/EN/ENTimeAgoFormatParser": 11,
            "./parsers/EN/ENTimeExpressionParser": 12,
            "./parsers/EN/ENWeekdayParser": 13,
            "./parsers/JP/JPCasualDateParser": 14,
            "./parsers/JP/JPStandardParser": 15,
            "./refiners/EN/ENMergeDateRangeRefiner": 17,
            "./refiners/EN/ENMergeDateTimeRefiner": 18,
            "./refiners/ExtractTimezoneAbbrRefiner": 19,
            "./refiners/ExtractTimezoneOffsetRefiner": 20,
            "./refiners/JP/JPMergeDateRangeRefiner": 21,
            "./refiners/OverlapRemovalRefiner": 22,
            "./refiners/UnlikelyFormatFilter": 23
        }],
        4: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = /(today|tonight|tomorrow|tmr|yesterday|last\s*night|this\s*(morning|afternoon|evening))(?=\W|$)/i;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    var o = n.index
                      , e = n[0]
                      , s = new a({
                        index: o,
                        text: e,
                        ref: t
                    })
                      , u = r(t)
                      , l = u.clone()
                      , c = e.toLowerCase();
                    if ("tonight" == c)
                        s.start.imply("hour", 22),
                        s.start.imply("meridiem", 1);
                    else if ("tomorrow" == c || "tmr" == c)
                        u.hour() > 4 && l.add(1, "day");
                    else if ("yesterday" == c)
                        l.add(-1, "day");
                    else if (c.match(/last\s*night/))
                        s.start.imply("hour", 0),
                        u.hour() > 6 && l.add(-1, "day");
                    else if (c.match("this")) {
                        var d = n[2].toLowerCase();
                        "afternoon" == d ? s.start.imply("hour", 15) : "evening" == d ? s.start.imply("hour", 18) : "morning" == d && s.start.imply("hour", 6)
                    }
                    return s.start.assign("day", l.date()),
                    s.start.assign("month", l.month() + 1),
                    s.start.assign("year", l.year()),
                    s.tags.ENCasualDateParser = !0,
                    s
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        5: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = new RegExp("(\\W|^)([0-9]{4})[\\-\\.]([0-9]{1,2})[\\-\\.]([0-9]{1,2})(?=\\W|$)","i")
              , s = 2
              , u = 3
              , l = 4;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    var e = n[0].substr(n[1])
                      , o = n.index + n[1].length
                      , c = new a({
                        text: e,
                        index: o,
                        ref: t
                    });
                    return c.start.assign("year", parseInt(n[s])),
                    c.start.assign("month", parseInt(n[u])),
                    c.start.assign("day", parseInt(n[l])),
                    r(c.start.get("month")) > 12 || r(c.start.get("month")) < 1 || r(c.start.get("day")) > 31 || r(c.start.get("day")) < 1 ? null : (c.tags.ENDateFormatParser = !0,
                    c)
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        6: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = /(\W|^)(within|in)\s*([0-9]+|an?)\s*(minutes?|hours?|days?)\s*(?=(?:\W|$))/i;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    var o = n.index + n[1].length
                      , e = n[0];
                    e = n[0].substr(n[1].length, n[0].length - n[1].length);
                    var s = new a({
                        index: o,
                        text: e,
                        ref: t
                    })
                      , u = n[3];
                    u = "a" === u || "an" === u ? 1 : parseInt(u);
                    var l = r(t);
                    return n[4].match(/day/) ? (l.add(u, "d"),
                    s.start.assign("year", l.year()),
                    s.start.assign("month", l.month() + 1),
                    s.start.assign("day", l.date()),
                    s) : (n[4].match(/hour/) ? l.add(u, "hour") : n[4].match(/minute/) && l.add(u, "minute"),
                    s.start.imply("year", l.year()),
                    s.start.imply("month", l.month() + 1),
                    s.start.imply("day", l.date()),
                    s.start.assign("hour", l.hour()),
                    s.start.assign("minute", l.minute()),
                    s.tags.ENDeadlineFormatParser = !0,
                    s)
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        7: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = new RegExp("(\\W|^)([0-9]{4})\\-([0-9]{1,2})\\-([0-9]{1,2})(?:T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\\.(\\d{1,4}))?)?(?:Z|([+-]\\d{2}):?(\\d{2})?)?)?(?=\\W|$)","i")
              , s = 2
              , u = 3
              , l = 4
              , c = 5
              , d = 6
              , f = 7
              , h = 8
              , p = 9
              , m = 10;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    var e = n[0].substr(n[1])
                      , o = n.index + n[1].length
                      , g = new a({
                        text: e,
                        index: o,
                        ref: t
                    });
                    if (g.start.assign("year", parseInt(n[s])),
                    g.start.assign("month", parseInt(n[u])),
                    g.start.assign("day", parseInt(n[l])),
                    r(g.start.get("month")) > 12 || r(g.start.get("month")) < 1 || r(g.start.get("day")) > 31 || r(g.start.get("day")) < 1)
                        return null ;
                    if (null != n[c])
                        if (g.start.assign("hour", parseInt(n[c])),
                        g.start.assign("minute", parseInt(n[d])),
                        null != n[f] && g.start.assign("second", parseInt(n[f])),
                        null != n[h] && g.start.assign("millisecond", parseInt(n[h])),
                        null == n[p])
                            g.start.assign("timezoneOffset", 0);
                        else {
                            var y = 0
                              , v = parseInt(n[p]);
                            null != n[m] && (y = parseInt(n[m]));
                            var b = 60 * v;
                            0 > b ? b -= y : b += y,
                            g.start.assign("timezoneOffset", b)
                        }
                    return g.tags.ENISOFormatParser = !0,
                    g
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        8: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = e("../../utils/EN")
              , s = new RegExp("(\\W|^)(?:(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\\s*,?\\s*)?([0-9]{1,2})(?:st|nd|rd|th)?(?:\\s*(?:to|\\-|until|through|till|\\s)\\s*([0-9]{1,2})(?:st|nd|rd|th)?)?\\s*(?:of)?\\s*(Jan(?:uary|\\.)?|Feb(?:ruary|\\.)?|Mar(?:ch|\\.)?|Apr(?:il|\\.)?|May|Jun(?:e|\\.)?|Jul(?:y|\\.)?|Aug(?:ust|\\.)?|Sep(?:tember|\\.)?|Oct(?:ober|\\.)?|Nov(?:ember|\\.)?|Dec(?:ember|\\.)?)(?:(\\s*[0-9]{2,4}(?![^\\s]\\d))(\\s*BE)?)?(?=\\W|$)","i")
              , u = 2
              , l = 3
              , c = 4
              , d = 5
              , f = 6
              , h = 7;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return s
                }
                ,
                this.extract = function(e, t, n, i) {
                    var s = new a({
                        text: n[0].substr(n[1].length, n[0].length - n[1].length),
                        index: n.index + n[1].length,
                        ref: t
                    })
                      , p = r(t)
                      , m = n[d];
                    m = o.MONTH_OFFSET[m.toLowerCase()];
                    var g = n[l];
                    g = parseInt(g);
                    var y = null ;
                    if (n[f] && (y = n[f],
                    y = parseInt(y),
                    n[h] ? y -= 543 : 100 > y && (y += 2e3)),
                    p.month(m - 1),
                    p.date(g),
                    y)
                        p.year(y),
                        s.start.assign("day", p.date()),
                        s.start.assign("month", p.month() + 1),
                        s.start.assign("year", p.year());
                    else {
                        p.year(r(t).year());
                        var v = p.clone().add(1, "y")
                          , b = p.clone().add(-1, "y");
                        Math.abs(v.diff(r(t))) < Math.abs(p.diff(r(t))) ? p = v : Math.abs(b.diff(r(t))) < Math.abs(p.diff(r(t))) && (p = b),
                        s.start.assign("day", p.date()),
                        s.start.assign("month", p.month() + 1),
                        s.start.imply("year", p.year())
                    }
                    if (n[u]) {
                        var w = n[u];
                        w = o.WEEKDAY_OFFSET[w.toLowerCase()],
                        s.start.assign("weekday", w)
                    }
                    return n[c] && (s.end = s.start.clone(),
                    s.end.assign("day", parseInt(n[c]))),
                    s.tags.ENMonthNameLittleEndianParser = !0,
                    s
                }
            }
        }
        , {
            "../../result": 25,
            "../../utils/EN": 26,
            "../parser": 16,
            moment: 1
        }],
        9: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = {
                sunday: 0,
                sun: 0,
                monday: 1,
                mon: 1,
                tuesday: 2,
                tue: 2,
                wednesday: 3,
                wed: 3,
                thursday: 4,
                thur: 4,
                thu: 4,
                friday: 5,
                fri: 5,
                saturday: 6,
                sat: 6
            }
              , s = /(\W|^)((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun\.?|Mon\.?|Tue\.?|Wed\.?|Thu\.?|Fri\.?|Sat\.?)\s*,?\s*)?(Jan\.?|January|Feb\.?|February|Mar\.?|March|Apr\.?|April|May\.?|Jun\.?|June|Jul\.?|July|Aug\.?|August|Sep\.?|Sept\.?|September|Oct\.?|October|Nov\.?|November|Dec\.?|December)\s*(([0-9]{1,2})(st|nd|rd|th)?\s*(to|\-)\s*)?([0-9]{1,2})(st|nd|rd|th)?(,)?(\s*[0-9]{4})(\s*BE)?(\W|$)/i
              , u = /(\W|^)((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun\.?|Mon\.?|Tue\.?|Wed\.?|Thu\.?|Fri\.?|Sat\.?)\s*,?\s*)?(Jan\.?|January|Feb\.?|February|Mar\.?|March|Apr\.?|April|May\.?|Jun\.?|June|Jul\.?|July|Aug\.?|August|Sep\.?|Sept\.?|September|Oct\.?|October|Nov\.?|November|Dec\.?|December)\s*(([0-9]{1,2})(st|nd|rd|th)?\s*(to|\-)\s*)?([0-9]{1,2})(st|nd|rd|th)?([^0-9]|$)/i;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return u
                }
                ,
                this.extract = function(e, t, n, i) {
                    var l = new a
                      , c = []
                      , d = null
                      , f = ""
                      , h = n.index;
                    e = e.substr(h);
                    var n = e.match(s);
                    if (n && 0 == e.indexOf(n[0])) {
                        var e = n[0];
                        if (e = e.substring(n[1].length, n[0].length - n[14].length),
                        h += n[1].length,
                        f = e,
                        e = e.replace(n[2], ""),
                        e = e.replace(n[4], n[4] + " "),
                        n[5] && (e = e.replace(n[5], "")),
                        n[10] && (e = e.replace(n[10], "")),
                        n[11] && (e = e.replace(",", " ")),
                        n[13]) {
                            var p = n[12];
                            p = " " + (parseInt(p) - 543),
                            e = e.replace(n[13], ""),
                            e = e.replace(n[12], p)
                        }
                        if (e = e.replace(n[9], parseInt(n[9]) + ""),
                        d = r(e, "MMMM DD YYYY"),
                        !d)
                            return null ;
                        l.start.assign("day", d.date()),
                        l.start.assign("month", d.month() + 1),
                        l.start.assign("year", d.year())
                    } else {
                        if (n = e.match(u),
                        !n)
                            return null ;
                        var e = n[0];
                        if (e = e.substring(n[1].length, n[0].length - n[11].length),
                        h += n[1].length,
                        f = e,
                        e = e.replace(n[2], ""),
                        e = e.replace(n[4], n[4] + " "),
                        n[4] && (e = e.replace(n[5], "")),
                        d = r(e, "MMMM DD"),
                        !d)
                            return null ;
                        c.push("year"),
                        d.year(r(t).year());
                        var m = d.clone().add(1, "year")
                          , g = d.clone().add(-1, "year");
                        Math.abs(m.diff(r(t))) < Math.abs(d.diff(r(t))) ? d = m : Math.abs(g.diff(r(t))) < Math.abs(d.diff(r(t))) && (d = g),
                        l.start.assign("day", d.date()),
                        l.start.assign("month", d.month() + 1),
                        l.start.imply("year", d.year())
                    }
                    if (n[3] && l.start.assign("weekday", o[n[3].toLowerCase()]),
                    n[5]) {
                        var y = parseInt(n[9])
                          , v = parseInt(n[6]);
                        l.end = l.start.clone(),
                        l.start.assign("day", v),
                        l.end.assign("day", y);
                        var b = d.clone();
                        d.date(v),
                        b.date(y)
                    }
                    return l.index = h,
                    l.text = f,
                    l.ref = t,
                    l.tags.ENMonthNameMiddleEndianParser = !0,
                    l
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        10: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = /(\W|^)(sun(?:day)?|mon(?:day)|tue(?:sday)|wed(?:nesday)|thu(?:rsday)|fri(?:day)|sat(?:urday))?\s*\,?\s*([0-9]{1,2})[\/\.\-]([0-9]{1,2})([\/\.\-]([0-9]{4}|[0-9]{2}))?(\W|$)/i
              , s = {
                sunday: 0,
                sun: 0,
                monday: 1,
                mon: 1,
                tuesday: 2,
                wednesday: 3,
                wed: 3,
                thursday: 4,
                thur: 4,
                friday: 5,
                fri: 5,
                saturday: 6,
                sat: 6
            };
            n.Parser = function(e) {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    if ("/" != n[1] && "/" != n[7]) {
                        var o = n.index + n[1].length
                          , e = n[0].substr(n[1].length, n[0].length - n[7].length)
                          , u = new a({
                            text: e,
                            index: o,
                            ref: t
                        });
                        if (!e.match(/^\d.\d$/) && (n[6] || !(n[0].indexOf("/") < 0))) {
                            var l = null
                              , c = n[6] || r(t).year() + ""
                              , d = n[3]
                              , f = n[4];
                            if (d = parseInt(d),
                            f = parseInt(f),
                            c = parseInt(c),
                            (1 > d || d > 12) && d > 12) {
                                if (!(f >= 1 && 12 >= f && d >= 13 && 31 >= d))
                                    return null ;
                                var h = d;
                                d = f,
                                f = h
                            }
                            return 1 > f || f > 31 ? null : (100 > c && (c > 50 ? c = c + 2500 - 543 : c += 2e3),
                            e = d + "/" + f + "/" + c,
                            l = r(e, "M/D/YYYY"),
                            l && l.date() == f && l.month() == d - 1 ? (u.start.assign("day", l.date()),
                            u.start.assign("month", l.month() + 1),
                            u.start.assign("year", l.year()),
                            n[2] && u.start.assign("weekday", s[n[2].toLowerCase()]),
                            u.tags.ENSlashDateFormatParser = !0,
                            u) : null )
                        }
                    }
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        11: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = /(\W|^)(?:within\s*)?([0-9]+|an?)\s*(minutes?|hours?|days?)\s*ago(?=(?:\W|$))/i;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    if (n.index > 0 && e[n.index - 1].match(/\w/))
                        return null ;
                    var e = n[0];
                    e = n[0].substr(n[1].length, n[0].length - n[1].length),
                    index = n.index + n[1].length;
                    var o = new a({
                        index: index,
                        text: e,
                        ref: t
                    })
                      , s = n[2];
                    s = "a" === s || "an" === s ? 1 : parseInt(s);
                    var u = r(t);
                    return n[3].match(/day/) ? (impliedComponents = [],
                    u.add(-s, "d"),
                    o.start.assign("day", u.date()),
                    o.start.assign("month", u.month() + 1),
                    o.start.assign("year", u.year()),
                    o) : (n[3].match(/hour/) ? u.add(-s, "hour") : n[3].match(/minute/) && u.add(-s, "minute"),
                    o.start.imply("day", u.date()),
                    o.start.imply("month", u.month() + 1),
                    o.start.imply("year", u.year()),
                    o.start.assign("hour", u.hour()),
                    o.start.assign("minute", u.minute()),
                    o.tags.ENTimeAgoFormatParser = !0,
                    o)
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        12: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = new RegExp("(^|\\s|T)(?:(?:at|from)\\s*)?(\\d{1,4}|noon|midnight)(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:(?:\\.|\\:|\\：)(\\d{1,2}))?)?(?:\\s*(AM|PM|A\\.M\\.|P\\.M\\.))?(?=\\W|$)","i")
              , s = new RegExp("^\\s*(\\-|\\~|\\〜|to|\\?)\\s*(\\d{1,4})(?:(?:\\.|\\:|\\：)(\\d{1,2})(?:(?:\\.|\\:|\\：)(\\d{1,2}))?)?(?:\\s*(AM|PM|A\\.M\\.|P\\.M\\.))?(?=\\W|$)","i")
              , u = 2
              , l = 3
              , c = 4
              , d = 5;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    if (n.index > 0 && e[n.index - 1].match(/\w/))
                        return null ;
                    var o = r(t)
                      , f = new a;
                    f.ref = t,
                    f.index = n.index + n[1].length,
                    f.text = n[0].substring(n[1].length),
                    f.tags.ENTimeExpressionParser = !0,
                    f.start.imply("day", o.date()),
                    f.start.imply("month", o.month() + 1),
                    f.start.imply("year", o.year());
                    var h = 0
                      , p = 0
                      , m = -1;
                    if (null != n[c]) {
                        var g = parseInt(n[c]);
                        if (g >= 60)
                            return null ;
                        f.start.assign("second", g)
                    }
                    if ("noon" == n[u].toLowerCase() ? (m = 1,
                    h = 12) : "midnight" == n[u].toLowerCase() ? (m = 0,
                    h = 0) : h = parseInt(n[u]),
                    null != n[l] ? p = parseInt(n[l]) : h > 100 && (p = h % 100,
                    h = parseInt(h / 100)),
                    p >= 60)
                        return null ;
                    if (h > 24)
                        return null ;
                    if (h >= 12 && (m = 1),
                    null != n[d]) {
                        if (h > 12)
                            return null ;
                        var y = n[d].replace(/\./g, "").toLowerCase();
                        "am" == y && (m = 0,
                        12 == h && (h = 0)),
                        "pm" == y && (m = 1,
                        12 != h && (h += 12))
                    }
                    if (f.start.assign("hour", h),
                    f.start.assign("minute", p),
                    m >= 0 && f.start.assign("meridiem", m),
                    n = s.exec(e.substring(f.index + f.text.length)),
                    !n)
                        return f.text.match(/^\d+$/) ? null : f;
                    if (n[0].match(/^\s*(\+|\-)\d{3,4}$/))
                        return f;
                    null == f.end && (f.end = f.start.clone());
                    var h = 0
                      , p = 0
                      , m = -1;
                    if (null != n[c]) {
                        var g = parseInt(n[c]);
                        if (g >= 60)
                            return null ;
                        f.end.assign("second", g)
                    }
                    if (h = parseInt(n[2]),
                    null != n[l]) {
                        if (p = parseInt(n[l]),
                        p >= 60)
                            return f
                    } else
                        h > 100 && (p = h % 100,
                        h = parseInt(h / 100));
                    if (p >= 60)
                        return null ;
                    if (h > 24)
                        return null ;
                    if (h >= 12 && (m = 1),
                    null != n[d]) {
                        if (h > 12)
                            return null ;
                        "am" == n[d].replace(".", "").toLowerCase() && (m = 0,
                        12 == h && (h = 0,
                        f.end.isCertain("day") || f.end.imply("day", f.end.get("day") + 1))),
                        "pm" == n[d].replace(".", "").toLowerCase() && (m = 1,
                        12 != h && (h += 12)),
                        f.start.isCertain("meridiem") || (0 == m ? (f.start.imply("meridiem", 0),
                        12 == f.start.get("hour") && f.start.assign("hour", 0)) : (f.start.imply("meridiem", 1),
                        12 != f.start.get("hour") && f.start.assign("hour", f.start.get("hour") + 12)))
                    }
                    return h >= 12 && (m = 1),
                    f.text = f.text + n[0],
                    f.end.assign("hour", h),
                    f.end.assign("minute", p),
                    m >= 0 && f.end.assign("meridiem", m),
                    f
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        13: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = new RegExp("(\\W|^)(?:(?:\\,|\\(|\\（)\\s*)?(?:(this|last|next)\\s*)?(Sunday|Sun|Monday|Mon|Tuesday|Tues|Tue|Wednesday|Wed|Thursday|Thurs|Thur|Friday|Fri|Saturday|Sat)(?:\\s*(?:\\,|\\)|\\）))?(?:\\s*(this|last|next)\\s*week)?(?=\\W|$)","i")
              , s = {
                sunday: 0,
                sun: 0,
                monday: 1,
                mon: 1,
                tuesday: 2,
                tues: 2,
                tue: 2,
                wednesday: 3,
                wed: 3,
                thursday: 4,
                thurs: 4,
                thur: 4,
                thu: 4,
                friday: 5,
                fri: 5,
                saturday: 6,
                sat: 6
            }
              , u = 2
              , l = 3
              , c = 4;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    var o = n.index + n[1].length
                      , e = n[0].substr(n[1].length, n[0].length - n[1].length)
                      , d = new a({
                        index: o,
                        text: e,
                        ref: t
                    })
                      , f = n[l].toLowerCase()
                      , h = s[f];
                    if (void 0 === h)
                        return null ;
                    var p = r(t)
                      , m = n[u]
                      , g = n[c];
                    if (m || g) {
                        var y = m || g;
                        y = y.toLowerCase(),
                        "last" == y ? p.day(h - 7) : "next" == y ? p.day(h + 7) : "this" == y && p.day(h)
                    } else {
                        var v = p.day();
                        Math.abs(h - 7 - v) < Math.abs(h - v) ? p.day(h - 7) : Math.abs(h + 7 - v) < Math.abs(h - v) ? p.day(h + 7) : p.day(h)
                    }
                    return d.start.assign("weekday", h),
                    d.start.imply("day", p.date()),
                    d.start.imply("month", p.month() + 1),
                    d.start.imply("year", p.year()),
                    d
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        14: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = /今日|当日|昨日|明日|今夜|今夕|今晩|今朝/i;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return o
                }
                ,
                this.extract = function(e, t, n, i) {
                    var o = n.index
                      , e = n[0]
                      , s = new a({
                        index: o,
                        text: e,
                        ref: t
                    })
                      , u = r(t)
                      , l = u.clone();
                    return "今夜" == e || "今夕" == e || "今晩" == e ? (s.start.imply("hour", 22),
                    s.start.imply("meridiem", 1)) : "明日" == e ? u.hour() > 4 && l.add(1, "day") : "昨日" == e ? l.add(-1, "day") : e.match("今朝") && (s.start.imply("hour", 6),
                    s.start.imply("meridiem", 0)),
                    s.start.assign("day", l.date()),
                    s.start.assign("month", l.month() + 1),
                    s.start.assign("year", l.year()),
                    s.tags.JPCasualDateParser = !0,
                    s
                }
            }
        }
        , {
            "../../result": 25,
            "../parser": 16,
            moment: 1
        }],
        15: [function(e, t, n) {
            var r = e("moment")
              , i = e("../parser").Parser
              , a = e("../../result").ParsedResult
              , o = e("../../utils/JP")
              , s = /(?:(同|((昭和|平成)?([0-9０-９]{2,4})))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i
              , u = 2
              , l = 3
              , c = 4
              , d = 5
              , f = 6;
            n.Parser = function() {
                i.call(this),
                this.pattern = function() {
                    return s
                }
                ,
                this.extract = function(e, t, n, i) {
                    var s = r(t)
                      , h = new a({
                        text: n[0],
                        index: n.index,
                        ref: t
                    })
                      , p = n[d];
                    p = o.toHankaku(p),
                    p = parseInt(p);
                    var m = n[f];
                    if (m = o.toHankaku(m),
                    m = parseInt(m),
                    s.set("date", m),
                    s.set("month", p - 1),
                    h.start.assign("day", s.date()),
                    h.start.assign("month", s.month() + 1),
                    n[u])
                        if (n[u].match("同年"))
                            h.start.assign("year", s.year());
                        else {
                            var g = n[c];
                            g = o.toHankaku(g),
                            g = parseInt(g),
                            "平成" == n[l] ? g += 1988 : "昭和" == n[l] && (g += 1925),
                            h.start.assign("year", g)
                        }
                    else {
                        s.year(r(t).year());
                        var y = s.clone().add(1, "y")
                          , v = s.clone().add(-1, "y");
                        Math.abs(y.diff(r(t))) < Math.abs(s.diff(r(t))) ? s = y : Math.abs(v.diff(r(t))) < Math.abs(s.diff(r(t))) && (s = v),
                        h.start.assign("day", s.date()),
                        h.start.assign("month", s.month() + 1),
                        h.start.imply("year", s.year())
                    }
                    return h.tags.JPStandardParser = !0,
                    h
                }
            }
        }
        , {
            "../../result": 25,
            "../../utils/JP": 27,
            "../parser": 16,
            moment: 1
        }],
        16: [function(e, t, n) {
            function r() {
                this.pattern = function() {
                    return /./i
                }
                ,
                this.extract = function(e, t, n, r) {
                    return null
                }
                ,
                this.execute = function(e, t, n) {
                    for (var r = [], i = this.pattern(), a = e, o = i.exec(a); o; ) {
                        o.index += e.length - a.length;
                        var s = this.extract(e, t, o, n);
                        s ? (a = e.substring(s.index + s.text.length),
                        r.push(s)) : a = e.substring(o.index + 1),
                        o = i.exec(a)
                    }
                    return this.refiners && this.refiners.forEach(function() {
                        r = refiner.refine(r, e, options)
                    }),
                    r
                }
            }
            n.Parser = r
        }
        , {}],
        17: [function(e, t, n) {
            var r = e("../refiner").Refiner;
            n.Refiner = function() {
                r.call(this),
                this.pattern = function() {
                    return /^\s*(to|\-)\s*$/i
                }
                ,
                this.refine = function(e, t, n) {
                    if (t.length < 2)
                        return t;
                    for (var r = [], i = null , a = null , o = 1; o < t.length; o++)
                        i = t[o],
                        a = t[o - 1],
                        a.end || i.end || !this.isAbleToMerge(e, a, i) || (a = this.mergeResult(e, a, i),
                        i = null ,
                        o += 1),
                        r.push(a);
                    return null != i && r.push(i),
                    r
                }
                ,
                this.isAbleToMerge = function(e, t, n) {
                    var r = t.index + t.text.length
                      , i = n.index
                      , a = e.substring(r, i);
                    return a.match(this.pattern())
                }
                ,
                this.mergeResult = function(e, t, n) {
                    for (var r in n.start.knownValues)
                        t.start.isCertain(r) || t.start.assign(r, n.start.get(r));
                    for (var r in t.start.knownValues)
                        n.start.isCertain(r) || n.start.assign(r, t.start.get(r));
                    if (t.start.date().getTime() > n.start.date()) {
                        var i = n;
                        n = t,
                        t = i
                    }
                    t.end = n.start;
                    for (var a in n.tags)
                        t.tags[a] = !0;
                    var o = Math.min(t.index, n.index)
                      , s = Math.max(t.index + t.text.length, n.index + n.text.length);
                    return t.index = o,
                    t.text = e.substring(o, s),
                    t.tags[this.constructor.name] = !0,
                    t
                }
            }
        }
        , {
            "../refiner": 24
        }],
        18: [function(e, t, n) {
            function r(e) {
                return !e.start.isCertain("hour")
            }
            function i(e) {
                return !e.start.isCertain("month") && !e.start.isCertain("weekday")
            }
            function a(e, t, n) {
                var r = e.substring(t.index + t.text.length, n.index);
                return r.match(u)
            }
            function o(e, t, n) {
                var r = t.start
                  , i = n.start
                  , a = r.clone();
                if (a.assign("hour", i.get("hour")),
                a.assign("minute", i.get("minute")),
                a.assign("second", i.get("second")),
                i.isCertain("meridiem") ? a.assign("meridiem", i.get("meridiem")) : void 0 !== i.get("meridiem") && a.imply("meridiem", i.get("meridiem")),
                1 == a.get("meridiem") && a.get("hour") < 12 && a.assign("hour", a.get("hour") + 12),
                t.start = a,
                null != t.end || null != n.end) {
                    var o = null == t.end ? t.start : t.end
                      , s = null == n.end ? n.start : n.end
                      , u = o.clone();
                    u.assign("hour", s.get("hour")),
                    u.assign("minute", s.get("minute")),
                    u.assign("second", s.get("second")),
                    s.isCertain("meridiem") ? u.assign("meridiem", s.get("meridiem")) : null != i.get("meridiem") && u.imply("meridiem", s.get("meridiem")),
                    t.end = u
                }
                var l = Math.min(t.index, n.index)
                  , c = Math.max(t.index + t.text.length, n.index + n.text.length);
                t.index = l,
                t.text = e.substring(l, c);
                for (var d in n.tags)
                    t.tags[d] = !0;
                return t.tags.ENMergeDateAndTimeRefiner = !0,
                t
            }
            var s = (e("../../result").ParsedComponents,
            e("../refiner").Refiner)
              , u = new RegExp("^\\s*(T|at|on|of|,|-)?\\s*$");
            n.Refiner = function() {
                s.call(this),
                this.refine = function(e, t, n) {
                    if (t.length < 2)
                        return t;
                    for (var s = [], u = null , l = null , c = 1; c < t.length; c++)
                        u = t[c],
                        l = t[c - 1],
                        r(l) && i(u) && a(e, l, u) ? (l = o(e, l, u),
                        u = null ,
                        c += 1) : r(u) && i(l) && a(e, l, u) && (l = o(e, u, l),
                        u = null ,
                        c += 1),
                        s.push(l);
                    return null != u && s.push(u),
                    s
                }
            }
        }
        , {
            "../../result": 25,
            "../refiner": 24
        }],
        19: [function(e, t, n) {
            var r = e("./refiner").Refiner
              , i = {}
              , a = new RegExp("^\\s*\\(?([A-Z]{1,4})\\)?(?=\\W|$)","i");
            n.Refiner = function() {
                r.call(this),
                this.refine = function(e, t, n) {
                    return t.forEach(function(t) {
                        var n = a.exec(e.substring(t.index + t.text.length));
                        if (n) {
                            var r = n[1];
                            if (void 0 === i[r])
                                return;
                            var o = i[r];
                            t.start.isCertain("timezoneOffset") || t.start.assign("timezoneOffset", o),
                            null == t.end || t.end.isCertain("timezoneOffset") || t.end.assign("timezoneOffset", o),
                            t.text += n[0],
                            t.tags.ExtractTimezoneAbbrRefiner = !0
                        }
                    }),
                    t
                }
            }
            ,
            i = {
                A: 60,
                ACDT: 630,
                ACST: 570,
                ADT: -180,
                AEDT: 660,
                AEST: 600,
                AFT: 270,
                AKDT: -480,
                AKST: -540,
                ALMT: 360,
                AMST: -180,
                AMT: -240,
                ANAST: 720,
                ANAT: 720,
                AQTT: 300,
                ART: -180,
                AST: -240,
                AWDT: 540,
                AWST: 480,
                AZOST: 0,
                AZOT: -60,
                AZST: 300,
                AZT: 240,
                B: 120,
                BNT: 480,
                BOT: -240,
                BRST: -120,
                BRT: -180,
                BST: 60,
                BTT: 360,
                C: 180,
                CAST: 480,
                CAT: 120,
                CCT: 390,
                CDT: -300,
                CEST: 120,
                CET: 60,
                CHADT: 825,
                CHAST: 765,
                CKT: -600,
                CLST: -180,
                CLT: -240,
                COT: -300,
                CST: -360,
                CVT: -60,
                CXT: 420,
                ChST: 600,
                D: 240,
                DAVT: 420,
                E: 300,
                EASST: -300,
                EAST: -360,
                EAT: 180,
                ECT: -300,
                EDT: -240,
                EEST: 180,
                EET: 120,
                EGST: 0,
                EGT: -60,
                EST: -300,
                ET: -300,
                F: 360,
                FJST: 780,
                FJT: 720,
                FKST: -180,
                FKT: -240,
                FNT: -120,
                G: 420,
                GALT: -360,
                GAMT: -540,
                GET: 240,
                GFT: -180,
                GILT: 720,
                GMT: 0,
                GST: 240,
                GYT: -240,
                H: 480,
                HAA: -180,
                HAC: -300,
                HADT: -540,
                HAE: -240,
                HAP: -420,
                HAR: -360,
                HAST: -600,
                HAT: -90,
                HAY: -480,
                HKT: 480,
                HLV: -210,
                HNA: -240,
                HNC: -360,
                HNE: -300,
                HNP: -480,
                HNR: -420,
                HNT: -150,
                HNY: -540,
                HOVT: 420,
                I: 540,
                ICT: 420,
                IDT: 180,
                IOT: 360,
                IRDT: 270,
                IRKST: 540,
                IRKT: 540,
                IRST: 210,
                IST: 60,
                JST: 540,
                K: 600,
                KGT: 360,
                KRAST: 480,
                KRAT: 480,
                KST: 540,
                KUYT: 240,
                L: 660,
                LHDT: 660,
                LHST: 630,
                LINT: 840,
                M: 720,
                MAGST: 720,
                MAGT: 720,
                MART: -510,
                MAWT: 300,
                MDT: -360,
                MESZ: 120,
                MEZ: 60,
                MHT: 720,
                MMT: 390,
                MSD: 240,
                MSK: 240,
                MST: -420,
                MUT: 240,
                MVT: 300,
                MYT: 480,
                N: -60,
                NCT: 660,
                NDT: -90,
                NFT: 690,
                NOVST: 420,
                NOVT: 360,
                NPT: 345,
                NST: -150,
                NUT: -660,
                NZDT: 780,
                NZST: 720,
                O: -120,
                OMSST: 420,
                OMST: 420,
                P: -180,
                PDT: -420,
                PET: -300,
                PETST: 720,
                PETT: 720,
                PGT: 600,
                PHOT: 780,
                PHT: 480,
                PKT: 300,
                PMDT: -120,
                PMST: -180,
                PONT: 660,
                PST: -480,
                PT: -480,
                PWT: 540,
                PYST: -180,
                PYT: -240,
                Q: -240,
                R: -300,
                RET: 240,
                S: -360,
                SAMT: 240,
                SAST: 120,
                SBT: 660,
                SCT: 240,
                SGT: 480,
                SRT: -180,
                SST: -660,
                T: -420,
                TAHT: -600,
                TFT: 300,
                TJT: 300,
                TKT: 780,
                TLT: 540,
                TMT: 300,
                TVT: 720,
                U: -480,
                ULAT: 480,
                UTC: 0,
                UYST: -120,
                UYT: -180,
                UZT: 300,
                V: -540,
                VET: -210,
                VLAST: 660,
                VLAT: 660,
                VUT: 660,
                W: -600,
                WAST: 120,
                WAT: 60,
                WEST: 60,
                WESZ: 60,
                WET: 0,
                WEZ: 0,
                WFT: 720,
                WGST: -120,
                WGT: -180,
                WIB: 420,
                WIT: 540,
                WITA: 480,
                WST: 780,
                WT: 0,
                X: -660,
                Y: -720,
                YAKST: 600,
                YAKT: 600,
                YAPT: 600,
                YEKST: 360,
                YEKT: 360,
                Z: 0
            }
        }
        , {
            "./refiner": 24
        }],
        20: [function(e, t, n) {
            var r = e("./refiner").Refiner
              , i = new RegExp("^\\s*(GMT|UTC)?(\\+|\\-)(\\d{1,2}):?(\\d{2})","i")
              , a = 2
              , o = 3
              , s = 4;
            n.Refiner = function() {
                r.call(this),
                this.refine = function(e, t, n) {
                    return t.forEach(function(t) {
                        if (!t.start.isCertain("timezoneOffset")) {
                            var n = i.exec(e.substring(t.index + t.text.length));
                            if (n) {
                                var r = parseInt(n[o])
                                  , u = parseInt(n[s])
                                  , l = 60 * r + u;
                                "-" === n[a] && (l = -l),
                                null != t.end && t.end.assign("timezoneOffset", l),
                                t.start.assign("timezoneOffset", l),
                                t.text += n[0],
                                t.tags.ExtractTimezoneOffsetRefiner = !0
                            }
                        }
                    }),
                    t
                }
            }
        }
        , {
            "./refiner": 24
        }],
        21: [function(e, t, n) {
            var r = e("../EN/ENMergeDateRangeRefiner").Refiner;
            n.Refiner = function() {
                r.call(this),
                this.pattern = function() {
                    return /^\s*(から|ー)\s*$/i
                }
            }
        }
        , {
            "../EN/ENMergeDateRangeRefiner": 17
        }],
        22: [function(e, t, n) {
            var r = e("./refiner").Refiner;
            n.Refiner = function() {
                r.call(this),
                this.refine = function(e, t, n) {
                    if (t.length < 2)
                        return t;
                    for (var r = [], i = t[0], a = 1; a < t.length; a++) {
                        var o = t[a];
                        o.index < i.index + i.text.length ? o.text.length > i.text.length && (i = o) : (r.push(i),
                        i = o)
                    }
                    return null != i && r.push(i),
                    r
                }
            }
        }
        , {
            "./refiner": 24
        }],
        23: [function(e, t, n) {
            var r = e("./refiner").Filter;
            n.Refiner = function() {
                r.call(this),
                this.isValid = function(e, t, n) {
                    return t.text.replace(" ", "").match(/^\d*(\.\d*)?$/) ? !1 : !0
                }
            }
        }
        , {
            "./refiner": 24
        }],
        24: [function(e, t, n) {
            n.Refiner = function() {
                this.refine = function(e, t, n) {
                    return t
                }
            }
            ,
            n.Filter = function() {
                n.Refiner.call(this),
                this.isValid = function(e, t, n) {
                    return !0
                }
                ,
                this.refine = function(e, t, n) {
                    for (var r = [], i = 0; i < t.length; i++) {
                        var a = t[i];
                        this.isValid(e, a, n) && r.push(a)
                    }
                    return r
                }
            }
        }
        , {}],
        25: [function(e, t, n) {
            function r(e) {
                e = e || {},
                this.ref = e.ref,
                this.index = e.index,
                this.text = e.text,
                this.tags = e.tags || {},
                this.start = new i(e.start,e.ref),
                e.end && (this.end = new i(e.end,e.ref))
            }
            function i(e, t) {
                if (this.knownValues = {},
                this.impliedValues = {},
                e)
                    for (key in e)
                        this.knownValues[key] = e[key];
                t && (t = a(t),
                this.imply("day", t.date()),
                this.imply("month", t.month() + 1),
                this.imply("year", t.year())),
                this.imply("hour", 12),
                this.imply("minute", 0),
                this.imply("second", 0),
                this.imply("millisecond", 0)
            }
            var a = e("moment");
            r.prototype.clone = function() {
                var e = new r(this);
                e.tags = JSON.parse(JSON.stringify(this.tags)),
                e.start = this.start.clone(),
                this.end && (e.end = this.end.clone())
            }
            ,
            i.prototype.clone = function() {
                var e = new i;
                return e.knownValues = JSON.parse(JSON.stringify(this.knownValues)),
                e.impliedValues = JSON.parse(JSON.stringify(this.impliedValues)),
                e
            }
            ,
            i.prototype.get = function(e, t) {
                return e in this.knownValues ? this.knownValues[e] : e in this.impliedValues ? this.impliedValues[e] : void 0
            }
            ,
            i.prototype.assign = function(e, t) {
                this.knownValues[e] = t,
                delete this.impliedValues[e]
            }
            ,
            i.prototype.imply = function(e, t) {
                e in this.knownValues || (this.impliedValues[e] = t)
            }
            ,
            i.prototype.isCertain = function(e) {
                return e in this.knownValues
            }
            ,
            i.prototype.date = function() {
                var e = a();
                e.set("year", this.get("year")),
                e.set("month", this.get("month") - 1),
                e.set("date", this.get("day")),
                e.set("hour", this.get("hour")),
                e.set("minute", this.get("minute")),
                e.set("second", this.get("second")),
                e.set("millisecond", this.get("millisecond"));
                var t = e.utcOffset()
                  , n = this.isCertain("timezoneOffset") ? this.get("timezoneOffset") : t
                  , r = n - t;
                return e.add(-r, "minutes"),
                e.toDate()
            }
            ,
            n.ParsedComponents = i,
            n.ParsedResult = r
        }
        , {
            moment: 1
        }],
        26: [function(e, t, n) {
            n.WEEKDAY_OFFSET = {
                sunday: 0,
                sun: 0,
                monday: 1,
                mon: 1,
                tuesday: 2,
                tue: 2,
                wednesday: 3,
                wed: 3,
                thursday: 4,
                thur: 4,
                thu: 4,
                friday: 5,
                fri: 5,
                saturday: 6,
                sat: 6
            },
            n.MONTH_OFFSET = {
                january: 1,
                jan: 1,
                "jan.": 1,
                february: 2,
                feb: 2,
                "feb.": 2,
                march: 3,
                mar: 3,
                "mar.": 3,
                april: 4,
                apr: 4,
                "apr.": 4,
                may: 5,
                june: 6,
                jun: 6,
                "jun.": 6,
                july: 7,
                jul: 7,
                "jul.": 7,
                august: 8,
                aug: 8,
                "aug.": 8,
                september: 9,
                sep: 9,
                "sep.": 9,
                sept: 9,
                "sept.": 9,
                october: 10,
                oct: 10,
                "oct.": 10,
                november: 11,
                nov: 11,
                "nov.": 11,
                december: 12,
                dec: 12,
                "dec.": 12
            }
        }
        , {}],
        27: [function(e, t, n) {
            n.toHankaku = function(e, t) {
                function n(t) {
                    return e(t).replace(/\u2019/g, "'").replace(/\u201D/g, '"').replace(/\u3000/g, " ").replace(/\uFFE5/g, "¥").replace(/[\uFF01\uFF03-\uFF06\uFF08\uFF09\uFF0C-\uFF19\uFF1C-\uFF1F\uFF21-\uFF3B\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5E]/g, r)
                }
                function r(e) {
                    return t(e.charCodeAt(0) - 65248)
                }
                return n
            }(String, String.fromCharCode),
            n.toZenkaku = function(e, t) {
                function n(t) {
                    return e(t).replace(/\u0020/g, "　").replace(/\u0022/g, "”").replace(/\u0027/g, "’").replace(/\u00A5/g, "￥").replace(/[!#-&(),-9\u003C-?A-[\u005D_a-{}~]/g, r)
                }
                function r(e) {
                    return t(e.charCodeAt(0) + 65248)
                }
                return n
            }(String, String.fromCharCode)
        }
        , {}]
    }, {}, [2])(2)
});
var stateHandler = {
    supported: function() {
        return "function" == typeof history.pushState
    },
    replace: function(e) {
        history.replaceState({
            title: e,
            slug: location.pathname.replace("/", "")
        }, null , null )
    },
    push: function(e) {
        history.pushState(e, null , e.url),
        document.title = e.title
    },
    onPop: function(e) {
        window.onpopstate = function(t) {
            null != t.state && (document.title = t.state.title,
            e(t))
        }
    }
}
  , globalAnimSpeed = 1.2;
$.Velocity.mock = globalAnimSpeed,
registerTransition("custom.slideUpIn", {
    translateY: [0, 10]
}),
registerTransition("custom.slideDownOut", {
    translateY: [10, 0]
});
var aniDuration = 550
  , aniEase = [.075, .82, .165, 1]
  , aniEaseOut = [.6, .04, .98, .335];
$(window).smartresize(function() {
    Filters.resizeBackground()
});
var Filters = function() {
    var e = $(".filter-overlay-bg")
      , t = $(".filter-overlay-nav")
      , n = t.find("li")
      , r = $(".nav-num")
      , i = r.children(".nav-num-inner")
      , a = r.children(".nav-open-bracket")
      , o = r.children(".nav-close-bracket")
      , s = Math.sqrt(Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))
      , u = function() {
        e.css({
            width: s,
            height: s
        })
    }
      , l = function() {
        newDiameterValue = Math.sqrt(Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2)),
        s < newDiameterValue && (s = newDiameterValue),
        e.css({
            width: s,
            height: s
        })
    }
      , c = function(r) {
        var u = r.pageX - s / 2
          , l = r.pageY - s / 2;
        e.css({
            left: u,
            top: l
        }),
        i.each(function() {
            $(this).data("count", parseInt($(this).html(), 10)),
            $(this).html("000")
        });
        var c = [{
            elements: e,
            properties: {
                translateZ: 0,
                scaleX: [2, 0],
                scaleY: [2, 0]
            },
            options: {
                duration: 650,
                easing: [.25, .46, .45, .94],
                complete: function() {
                    t.addClass("active")
                }
            }
        }, {
            elements: n,
            properties: "custom.slideUpIn",
            options: {
                duration: 300,
                stagger: 40,
                drag: !0
            }
        }, {
            elements: t,
            properties: {
                opacity: 1,
                display: "block"
            },
            options: {
                sequenceQueue: !1
            }
        }, {
            elements: a,
            properties: {
                translateZ: 0,
                translateX: [0]
            },
            options: {
                easing: [.075, .82, .165, 1],
                duration: 200
            }
        }, {
            elements: o,
            properties: {
                translateZ: 0,
                translateX: [0, -15]
            },
            options: {
                easing: [.075, .82, .165, 1],
                sequenceQueue: !1,
                duration: 200
            }
        }, {
            elements: i,
            properties: {
                opacity: 1
            },
            options: {
                complete: function() {
                    i.each(function() {
                        f($(this))
                    })
                }
            }
        }];
        $.Velocity.RunSequence(c)
    }
      , d = function(r) {
        var s = [{
            elements: n.get().reverse(),
            properties: "custom.slideDownOut",
            options: {
                duration: 300,
                stagger: 40,
                drag: !0
            }
        }, {
            elements: e,
            properties: {
                opacity: 0,
                complete: function() {
                    t.removeClass("active")
                }
            }
        }, {
            elements: e,
            properties: {
                scaleX: [0, 2],
                scaleY: [0, 2],
                opacity: 1
            },
            options: {
                duration: 0
            }
        }, {
            elements: a,
            properties: {
                translateZ: 0,
                translateX: [15]
            },
            options: {
                duration: 0
            }
        }, {
            elements: o,
            properties: {
                translateZ: 0,
                translateX: [-15]
            },
            options: {
                duration: 0
            }
        }, {
            elements: i,
            properties: {
                opacity: 0
            },
            options: {
                duration: 0,
                complete: function() {
                    i.each(function() {
                        $(this).html($(this).data("count"))
                    })
                }
            }
        }];
        $.Velocity.RunSequence(s)
    }
      , f = function(e) {
        var t = parseInt(e.html(), 10);
        0 !== e.data("count") && (e.html(h(++t, 3)),
        t !== e.data("count") && setTimeout(function() {
            f(e)
        }, 100))
    }
      , h = function(e, t) {
        for (var n = e.toString(); n.length < t; )
            n = "0" + n;
        return n
    }
    ;
    return {
        init: u,
        resizeBackground: l,
        animShow: c,
        animHide: d
    }
}()
  , Sidebar = function() {
    var e = $(".event-info")
      , t = $(".left-align-wrapper")
      , n = e.children()
      , r = 300
      , i = function() {
        var i = [{
            elements: n,
            properties: {
                opacity: 0
            },
            options: {
                duration: 0
            }
        }];
        $(window).width() > 1200 && i.push({
            elements: t,
            properties: {
                paddingRight: "30%"
            },
            options: {
                easing: [.075, .82, .165, 1]
            }
        }),
        i.push({
            elements: e,
            properties: {
                translateX: ["0%", "100%"]
            },
            options: {
                sequenceQueue: !1,
                easing: [.075, .82, .165, 1]
            }
        }, {
            elements: n,
            properties: "custom.slideUpIn",
            options: {
                duration: r,
                stagger: 120,
                drag: !0,
                complete: function() {
                    e.addClass("event-info--open"),
                    t.addClass("event-info--open")
                }
            }
        }),
        $.Velocity.RunSequence(i)
    }
      , a = function(n) {
        var r = [{
            elements: t,
            properties: {
                padding: 0
            },
            options: {
                easing: [.075, .82, .165, 1]
            }
        }, {
            elements: e,
            properties: {
                translateX: ["100%"]
            },
            options: {
                sequenceQueue: !1,
                easing: [.075, .82, .165, 1],
                complete: function() {
                    e.removeClass("event-info--open").scrollTop(0),
                    $(".event--active").removeClass("event--active"),
                    n && n.addClass("event--active")
                }
            }
        }];
        $.Velocity.RunSequence(r)
    }
      , o = function() {
        return e.hasClass("event-info--open") ? !0 : !1
    }
      , s = function() {
        return e.hasClass("velocity-animating") || e.children().hasClass("velocity-animating") ? !0 : !1
    }
    ;
    return {
        animOpen: i,
        animClose: a,
        isOpen: o,
        isAnimating: s
    }
}();
$(function() {
    function e() {
        var e, t = document.createElement("fakeelement"), n = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        };
        for (e in n)
            if (void 0 !== t.style[e])
                return n[e]
    }
    FastClick.attach(document.body),
    Filters.init();
    var t = $("header")
      , n = e();
    $(".js-menu-toggle").on("click", function(e) {
        e.preventDefault(),
        t.hasClass("hidden-nav-open") ? (t.removeClass("hidden-nav-open"),
        t.removeClass("reveal-items")) : (t.addClass("hidden-nav-open"),
        t.addClass("expand-menu"),
        t.addClass("reveal-items"))
    }),
    $(".hidden-nav nav ul li").last().on(n, function(e) {
        t.hasClass("hidden-nav-open") || t.removeClass("expand-menu")
    }),
    siteTitleFun($(".js-site-title"));
    var r = $(".event")
      , i = $(".js-close-sidebar")
      , a = $(".filter");
    $(".event.event--active").length && changeEventInfo($(".event.event--active"), r),
    i.on("click touch", function(e) {
        e.preventDefault(),
        console.log(location.pathname.split("/")[1]),
        stateHandler.push({
            url: "/" + location.pathname.split("/")[1],
            title: "Jordan Whitney Martin",
            eventId: null
        }),
        Sidebar.animClose()
    }),
    r.on("click touch", function(e) {
        e.preventDefault(),
        changeEventInfo($(this), r)
    }),
    $(window).keydown(function(e) {
        if ($eventItem = $(".event.event--active").length ? $(".event.event--active") : $(".event:first"),
        eventItemIndex = r.index($eventItem),
        40 === e.which) {
            var t = eventItemIndex < r.length - 1 ? eventItemIndex + 1 : 0;
            changeEventInfo($(r[t]), r)
        } else if (38 === e.which) {
            var t = eventItemIndex > 0 ? eventItemIndex - 1 : r.length - 1;
            changeEventInfo($(r[t]), r)
        }
    }),
    $(window).on("popstate", function(e) {
        e.originalEvent.state && e.originalEvent.state.eventId ? changeEventInfo($("#" + e.originalEvent.state.eventId), r, !0) : Sidebar.animClose()
    }),
    a.on("click touch", function(e) {
        e.preventDefault(),
        Sidebar.isOpen() ? (Sidebar.animClose(),
        setTimeout(function() {
            Filters.animShow(e)
        }, 300 * globalAnimSpeed)) : Filters.animShow(e)
    }),
    $(".js-filter-overlay-nav").on("click touch", "li a", function(e) {
        e.preventDefault(),
        window.location = $(this).attr("href")
    }),
    $(".js-filter-overlay-bg").on("click touch", function(e) {
        e.preventDefault(),
        Filters.animHide()
    }),
    $(".js-filter-nav-close").on("click touch", function(e) {
        e.preventDefault(),
        Filters.animHide()
    })
}),
$("form :input").focus(function() {
    $("label[for='" + this.id + "']").addClass("label-focus")
}),
$("form :input").blur(function() {
    $("label").removeClass("label-focus")
}),
$(function() {
    $(".js-color-scheme-select").each(function() {
        var e = [];
        $(this).find("option").each(function() {
            e.push({
                id: $(this).attr("value"),
                colors: $(this).text().split("/")
            })
        });
        var t = new colorSchemeSelect({
            schemes: e,
            defaultText: $(this).data("defaultText")
        })
          , n = t.build();
        n.on("click", ".cs-color-scheme-select-option", function(e) {
            e.preventDefault();
            var t = $(this).data("colorSchemeId");
            a.val(t).trigger("change"),
            n.removeClass("open")
        }),
        $(this).before(n);
        var r = $('<div class="cs-color-scheme-select-input"></div>')
          , i = t.buildScheme(e[0], "cs-color-scheme-fake-input");
        i.on("click", function(e) {
            e.stopPropagation(),
            e.preventDefault(),
            n.addClass("open")
        }),
        $("body").on("click", function(e) {
            n.removeClass("open")
        }),
        r.append(i);
        var a = $('<input type="hidden" name="' + $(this).attr("name") + '" value="' + $(this).val() + '">');
        a.on("change", function(n) {
            var r = findInArrayByKey(e, "id", $(this).val())
              , a = t.buildScheme(r);
            i.html(a.html())
        }),
        r.append(a),
        a.trigger("change"),
        $(this).replaceWith(r)
    })
});
var colorSchemeSelect = function(e) {
    var t = this;
    t.options = e,
    t.optionWidth = null ,
    t.build = function() {
        for (var e = t.options.schemes, n = $('<div class="cs-color-scheme-select"></div>'), r = 0, i = e.length; i > r; r++)
            n.append(t.buildOption(e[r]));
        return n
    }
    ,
    t.buildOption = function(e) {
        return t.buildScheme(e)
    }
    ,
    t.buildScheme = function(e, n) {
        n = n ? n : "cs-color-scheme-select-option";
        var r = $('<div class="' + n + '"></div>').data("colorSchemeId", e.id);
        if (0 == e.id)
            r.addClass("cs-color-scheme-select-default").html(t.options.defaultText);
        else
            for (var i = 0, a = e.colors.length; a > i; i++)
                r.append(t.buildColor(e.colors[i]));
        return r
    }
    ,
    t.buildColor = function(e) {
        return $('<div class="cs-color-scheme-select-option-color" style="background-color: ' + e + '">' + e + "</div>")
    }
    ,
    t.buildDefault = function() {
        return $('<div class="cs-color-scheme-select-default">' + t.options.defaultText + "</div>").data("colorSchemeId", 0)
    }
    ,
    t.getOptionWidth = function(e) {
        var t = e.css({
            position: "absolute",
            left: "-999em"
        }).appendTo($("body")).outerWidth(!0);
        return e.remove(),
        t
    }
}
;
$(function() {
    $(".js-icon-select").each(function() {
        new iconSelect({
            $elem: $(this)
        })
    })
});
var iconSelect = function(e) {
    var t = this;
    t.$elem = e.$elem,
    t.options = e,
    t.optionWidth = null ,
    t.icons = [],
    t.selectedIcons = [],
    t.$newElem = $('<div class="cs-icon-select-input"></div>'),
    t.$hiddenInput = $('<input type="hidden" name="' + t.$elem.attr("name") + '" value="' + t.$elem.val() + '">'),
    t.$elem.find("option").each(function() {
        t.icons.push({
            id: $(this).attr("value"),
            title: $(this).text(),
            svg: $(this).data("iconSvg")
        })
    }),
    t.setup = function() {
        t.$dropdown = t.buildDropdown(),
        t.$dropdown.on("click", ".cs-icon-select-option", function(e) {
            e.preventDefault(),
            t.addToSelectedIcons($(this).data("iconId")),
            t.$dropdown.removeClass("open")
        }),
        t.$elem.before(t.$dropdown),
        t.$fakeInput = t.buildFakeInput(),
        t.$fakeInput.on("click", ".cs-add-btn", function(e) {
            e.preventDefault(),
            t.$dropdown.addClass("open")
        }),
        t.$fakeInput.on("click", ".cs-selected-icon", function(e) {
            e.preventDefault(),
            t.removeFromSelectedIcons($(".cs-selected-icon").index($(this)))
        }),
        t.$newElem.append(t.$fakeInput),
        t.$newElem.append(t.$hiddenInput);
        for (var e = t.$elem.data("iconIds") ? (t.$elem.data("iconIds") + "").split(",") : [], n = 0, r = e.length; r > n; n++)
            t.addToSelectedIcons(e[n]);
        t.$elem.replaceWith(t.$newElem)
    }
    ,
    t.addToSelectedIcons = function(e) {
        t.selectedIcons.push(t.findInArrayByKey(t.icons, "id", e)[0]),
        t.updateSelectedIcons()
    }
    ,
    t.removeFromSelectedIcons = function(e) {
        t.selectedIcons.splice(e, 1),
        t.updateSelectedIcons()
    }
    ,
    t.updateSelectedIcons = function() {
        t.$fakeInput.html(t.buildFakeInput().html()),
        t.$hiddenInput.val(t.getSelectedIds().join(","))
    }
    ,
    t.getSelectedIds = function() {
        for (var e = [], n = 0, r = t.selectedIcons.length; r > n; n++)
            e.push(t.selectedIcons[n].id);
        return e
    }
    ,
    t.buildDropdown = function() {
        for (var e = t.icons, n = $('<div class="cs-icon-select"></div>'), r = 0, i = e.length; i > r; r++)
            n.append(t.buildIcon(e[r]));
        return n
    }
    ,
    t.buildIcon = function(e, n) {
        n = n ? n : "cs-icon-select-option";
        var r = $('<div class="' + n + '"></div>').data("iconId", e.id);
        return 0 == e.id ? r.addClass("cs-icon-select-default").html(t.options.defaultText) : r.append(e.svg),
        r
    }
    ,
    t.buildFakeInput = function() {
        var e = $('<div class="cs-icon-fake-input"></div>');
        if (t.selectedIcons.length)
            for (var n = 0, r = t.selectedIcons.length; r > n; n++)
                e.append('<a href="#" class="cs-selected-icon">' + t.selectedIcons[n].svg + "</a>");
        return e.append('<a class="cs-add-btn" href="#">+</a>'),
        e
    }
    ,
    t.buildDefault = function() {
        return $('<div class="cs-icon-select-default">' + t.options.defaultText + "</div>").data("iconId", 0)
    }
    ,
    t.getOptionWidth = function(e) {
        var t = e.css({
            position: "absolute",
            left: "-999em"
        }).appendTo($("body")).outerWidth(!0);
        return e.remove(),
        t
    }
    ,
    t.findInArrayByKey = function(e, t, n) {
        n = n.split(",");
        for (var r = [], i = 0, a = n.length; a > i; i++) {
            var o = $.grep(e, function(e) {
                return e[t] == n[i]
            });
            o.length && r.push(o[0])
        }
        return r
    }
    ,
    t.setup()
}
  , decodeEntities = function() {
    function e(e) {
        return e && "string" == typeof e && (e = e.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, ""),
        e = e.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, ""),
        t.innerHTML = e,
        e = t.textContent,
        t.textContent = ""),
        e
    }
    var t = document.createElement("div");
    return e
}();
$(function() {
    var e = new DateTimeInput($("#time_end"),{
        showEnd: !1
    });
    new DateTimeInput($("#time_start"),{
        callback: function(t) {
            t.cronoResult && (t.cronoResult.end && e.crono(t.getDateTime("end")),
            t.options.useAsRefDateFor && e.setRefDate(new Date(t.getDateTime())))
        }
    })
});
var DateTimeInput = function(e, t) {
    var n = {
        blankStateMsg: "Type a date and type in any format",
        showEnd: !0,
        use: "start",
        callback: null ,
        userFormat: "DD MMM YYYY, h:mma",
        hiddenFormat: "YYYY-MM-DD HH:mm:ss",
        refDate: null
    }
      , r = this;
    r.options = $.extend({}, n, t),
    r.cronoResult = null ,
    r.$tooltip = $('<div class="input-tooltip"></div>'),
    r.$hiddenInput = e.clone().attr("id", "").attr("type", "hidden"),
    r.setRefDate = function(e) {
        r.options.refDate = e
    }
    ,
    r.crono = function(t) {
        var n = e.val();
        t && (n = t);
        var i = chrono.parse(n, r.options.refDate);
        r.cronoResult = i && i[0] ? i[0] : null ,
        r.updateHiddenField(),
        r.refreshTooltip(),
        r.options.callback && r.options.callback(r),
        t && r.refreshUserInput()
    }
    ,
    r.getDateTime = function(e) {
        return e = e || r.options.use,
        r.cronoResult[e] ? moment(r.cronoResult[e].date()).format(r.options.hiddenFormat) : null
    }
    ,
    r.updateHiddenField = function() {
        r.cronoResult && r.getDateTime() && r.$hiddenInput.val(r.getDateTime())
    }
    ,
    r.sendTo = function() {
        r.cronoResult && (r.options.sendStartTo && r.cronoResult.start && r.options.sendStartTo.crono(r.getDateTime("start")),
        r.options.sendEndTo && r.cronoResult.end && r.options.sendEndTo.crono(r.getDateTime("end")),
        r.options.useAsRefDateFor && r.options.useAsRefDateFor.setRefDate(new Date(r.getDateTime())))
    }
    ,
    r.refreshUserInput = function() {
        r.$hiddenInput.val() && e.val(moment(r.$hiddenInput.val()).format(r.options.userFormat))
    }
    ,
    r.refreshTooltip = function() {
        var e = r.cronoResult ? parseCronoResult(r.cronoResult, r.options.showEnd) : r.options.blankStateMsg;
        r.$tooltip.text(e)
    }
    ,
    r.$hiddenInput.insertAfter(e),
    e.parent().append(r.$tooltip),
    r.crono(),
    r.refreshUserInput(),
    e.on("focus", function(e) {
        "none" === r.$tooltip.css("display") && r.$tooltip.fadeIn(100)
    }),
    e.on("blur", function(e) {
        r.refreshUserInput(),
        "block" === r.$tooltip.css("display") && r.$tooltip.fadeOut(100)
    }),
    e.on("keyup", function(e) {
        r.crono()
    })
}
  , parseCronoResult = function(e, t) {
    var n = {
        start: e.start.impliedValues,
        end: e.end ? e.end.impliedValues : null
    };
    for (var r in e.start.knownValues)
        n.start[r] = e.start.knownValues[r];
    if (n.end)
        for (var r in e.end.knownValues)
            n.end[r] = e.end.knownValues[r];
    var i = moment(e.start.date()).format("ddd DD MMM YYYY, h:mma");
    if (n.end && t) {
        var a = moment(e.end.date()).format("h:mma");
        if (n.end.month !== n.start.month || n.end.day !== n.start.day) {
            var o = moment(e.end.date()).format("ddd DD MMM");
            n.end.year !== n.start.year && (o += " YYYY"),
            a = o += ", " + a
        }
        i += " — " + a
    }
    return i
}
;
