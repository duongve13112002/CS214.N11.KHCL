! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.tf = e.tf || {})
}(this, function(exports) {
	"use strict";

	function isMobile() {
		var e = navigator.userAgent || navigator.vendor || window.opera;
		return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
	}

	function doc(e) {
		return function() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t]
		}
	}

	function assertArgumentIsTensor(e, t, r) {
		assert(e instanceof Tensor, "Argument '" + t + "' passed to '" + r + "' must be a Tensor, but got " + typeof e + ".")
	}

	function assertArgumentsAreTensors(e, t) {
		for (var r in e) ! function(r) {
			var n = e[r];
			Array.isArray(n) ? n.forEach(function(e, n) {
				assertArgumentIsTensor(e, r + "[" + n + "]", t)
			}) : assertArgumentIsTensor(n, r, t)
		}(r)
	}

	function shuffle(e) {
		for (var t = e.length, r = 0, n = 0; t > 0;) n = Math.random() * t | 0, r = e[--t], e[t] = e[n], e[n] = r
	}

	function clamp(e, t, r) {
		return Math.max(e, Math.min(t, r))
	}

	function randUniform(e, t) {
		return Math.random() * (t - e) + e
	}

	function distSquared(e, t) {
		for (var r = 0, n = 0; n < e.length; n++) {
			var a = Number(e[n]) - Number(t[n]);
			r += a * a
		}
		return r
	}

	function assert(e, t) {
		if (!e) throw new Error(t)
	}

	function assertShapesMatch(e, t, r) {
		void 0 === r && (r = ""), assert(arraysEqual(e, t), r + " Shapes " + e + " and " + t + " must match")
	}

	function assertTypesMatch(e, t) {
		assert(e.dtype === t.dtype, " The dtypes of the first(" + e.dtype + ") and second(" + t.dtype + ") input must match")
	}

	function flatten(e, t) {
		if (void 0 === t && (t = []), Array.isArray(e))
			for (var r = 0; r < e.length; ++r) flatten(e[r], t);
		else t.push(e);
		return t
	}

	function inferShape(e) {
		if (isTypedArray(e)) return [e.length];
		if (!Array.isArray(e)) return [];
		for (var t = []; e instanceof Array;) t.push(e.length), e = e[0];
		return t
	}

	function sizeFromShape(e) {
		if (0 === e.length) return 1;
		for (var t = e[0], r = 1; r < e.length; r++) t *= e[r];
		return t
	}

	function isScalarShape(e) {
		return 0 === e.length
	}

	function arraysEqual(e, t) {
		if (e.length !== t.length) return !1;
		for (var r = 0; r < e.length; r++)
			if (e[r] !== t[r]) return !1;
		return !0
	}

	function isInt(e) {
		return e % 1 == 0
	}

	function tanh(e) {
		if (null != Math.tanh) return Math.tanh(e);
		if (e === 1 / 0) return 1;
		if (e === -1 / 0) return -1;
		var t = Math.exp(2 * e);
		return (t - 1) / (t + 1)
	}

	function sizeToSquarishShape(e) {
		for (var t = Math.floor(Math.sqrt(e)); t > 1; --t)
			if (e % t == 0) return [t, e / t];
		return [1, e]
	}

	function createShuffledIndices(e) {
		for (var t = new Uint32Array(e), r = 0; r < e; ++r) t[r] = r;
		return shuffle(t), t
	}

	function rightPad(e, t) {
		return t <= e.length ? e : e + " ".repeat(t - e.length)
	}

	function repeatedTry(e, t, r) {
		return void 0 === t && (t = function(e) {
			return 0
		}), new Promise(function(n, a) {
			var o = 0,
				i = function() {
					if (e()) n();
					else {
						var s = t(++o);
						null != r && o >= r ? a() : setTimeout(i, s)
					}
				};
			i()
		})
	}

	function getQueryParams(e) {
		var t = {};
		return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g, function(e) {
			for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
			return decodeParam(t, r[0], r[1]), r.join("=")
		}), t
	}

	function decodeParam(e, t, r) {
		e[decodeURIComponent(t)] = decodeURIComponent(r || "")
	}

	function inferFromImplicitShape(e, t) {
		for (var r = 1, n = -1, a = 0; a < e.length; ++a)
			if (e[a] > 0) r *= e[a];
			else if (-1 === e[a]) {
			if (-1 !== n) throw Error("Shapes can only have 1 implicit size. Found - 1 at dim " + n + " and dim " + a);
			n = a
		} else if (e[a] <= 0) throw Error("Shapes can not be <= 0. Found " + e[a] + " at dim " + a);
		if (-1 === n) {
			if (t > 0 && t !== r) throw Error("Size(" + t + ") must match the product of shape " + e);
			return e
		}
		if (t % r != 0) throw Error("The implicit shape can't be a fractional number. Got " + t + " / " + r);
		var o = e.slice();
		return o[n] = t / r, o
	}

	function squeezeShape(e, t) {
		for (var r = [], n = [], a = 0, o = 0; o < e.length; ++o) {
			if (null != t) {
				if (t[a] === o && e[o] > 1) throw new Error("Can't squeeze axis " + o + " since its dim '" + e[o] + "' is not 1");
				(null == t[a] || t[a] > o) && 1 === e[o] && (r.push(e[o]), n.push(o)), t[a] <= o && a++
			}
			e[o] > 1 && (r.push(e[o]), n.push(o))
		}
		return {
			newShape: r,
			keptDims: n
		}
	}

	function getTypedArrayFromDType(e, t) {
		var r = null;
		if (null == e || "float32" === e) r = new Float32Array(t);
		else if ("int32" === e) r = new Int32Array(t);
		else {
			if ("bool" !== e) throw new Error("Unknown data type " + e);
			r = new Uint8Array(t)
		}
		return r
	}

	function isTensorInList(e, t) {
		for (var r = 0; r < t.length; r++)
			if (t[r].id === e.id) return !0;
		return !1
	}

	function checkForNaN(e, t, r) {
		if ("float32" === t)
			for (var n = 0; n < e.length; n++)
				if (isNaN(e[n])) throw Error("The result of the '" + r + "' has NaNs.")
	}

	function flattenNameArrayMap(e, t) {
		var r = [];
		if (e instanceof Tensor) r.push(e);
		else
			for (var n = e, a = 0; a < t.length; a++) r.push(n[t[a]]);
		return r
	}

	function unflattenToNameArrayMap(e, t) {
		if (e.length !== t.length) throw new Error("Cannot unflatten Tensor[], keys and arrays are not of same length.");
		for (var r = {}, n = 0; n < e.length; n++) r[e[n]] = t[n];
		return r
	}

	function hasEncodingLoss(e, t) {
		return "float32" !== t && (("int32" !== t || "float32" === e) && ("bool" !== t || "bool" !== e))
	}

	function copyTypedArray(e, t) {
		if (null == t || "float32" === t) return new Float32Array(e);
		if ("int32" === t) return new Int32Array(e);
		if ("bool" === t) {
			for (var r = new Uint8Array(e.length), n = 0; n < r.length; ++n) 0 !== Math.round(e[n]) && (r[n] = 1);
			return r
		}
		throw new Error("Unknown data type " + t)
	}

	function isTypedArray(e) {
		return e instanceof Float32Array || e instanceof Int32Array || e instanceof Uint8Array
	}

	function bytesPerElement(e) {
		if ("float32" === e || "int32" === e) return 4;
		if ("bool" === e) return 1;
		throw new Error("Unknown dtype " + e)
	}

	function isFunction(e) {
		return !!(e && e.constructor && e.call && e.apply)
	}

	function getTensorsInContainer(e) {
		var t = [];
		return walkTensorContainer(e, t, new Set), t
	}

	function walkTensorContainer(e, t, r) {
		if (null != e)
			if (e instanceof Tensor) t.push(e);
			else if (isIterable(e)) {
			var n = e;
			for (var a in n) {
				var o = n[a];
				r.has(o) || (r.add(o), walkTensorContainer(o, t, r))
			}
		}
	}

	function isIterable(e) {
		return Array.isArray(e) || "object" == typeof e
	}

	function tensorToString(e, t) {
		var r = e.dataSync(),
			n = computeMaxSizePerColumn(e),
			a = subTensorToString(r, e.shape, e.strides, n),
			o = ["Tensor"];
		return t && (o.push("  dtype: " + e.dtype), o.push("  rank: " + e.rank), o.push("  shape: [" + e.shape + "]"), o.push("  values:")), o.push(a.map(function(e) {
			return "    " + e
		}).join("\n")), o.join("\n")
	}

	function computeMaxSizePerColumn(e) {
		var t = e.dataSync(),
			r = e.size,
			n = e.strides[e.strides.length - 1],
			a = new Array(n).fill(0);
		if (e.rank > 1)
			for (var o = 0; o < r / n; o++)
				for (var i = o * n, s = 0; s < n; s++) a[s] = Math.max(a[s], valToString(t[i + s], 0).length);
		return a
	}

	function valToString(e, t) {
		return rightPad(parseFloat(e.toFixed(FORMAT_NUM_SIG_DIGITS)).toString(), t)
	}

	function subTensorToString(e, t, r, n, a) {
		void 0 === a && (a = !0);
		var o = t[0],
			i = t.length;
		if (0 === i) return [e[0].toString()];
		if (1 === i) {
			if (o > FORMAT_LIMIT_NUM_VALS) {
				var s = Array.from(e.subarray(0, FORMAT_NUM_FIRST_LAST_VALS)),
					u = Array.from(e.subarray(o - FORMAT_NUM_FIRST_LAST_VALS, o));
				return ["[" + s.map(function(e, t) {
					return valToString(e, n[t])
				}).join(", ") + ", ..., " + u.map(function(e, t) {
					return valToString(e, n[o - FORMAT_NUM_FIRST_LAST_VALS + t])
				}).join(", ") + "]"]
			}
			return ["[" + Array.from(e).map(function(e, t) {
				return valToString(e, n[t])
			}).join(", ") + "]"]
		}
		var l = t.slice(1),
			c = r.slice(1),
			p = r[0],
			d = [];
		if (o > FORMAT_LIMIT_NUM_VALS) {
			for (y = 0; y < FORMAT_NUM_FIRST_LAST_VALS; y++) {
				f = (h = y * p) + p;
				d.push.apply(d, subTensorToString(e.subarray(h, f), l, c, n, !1))
			}
			d.push("...");
			for (y = o - FORMAT_NUM_FIRST_LAST_VALS; y < o; y++) {
				f = (h = y * p) + p;
				d.push.apply(d, subTensorToString(e.subarray(h, f), l, c, n, y === o - 1))
			}
		} else
			for (y = 0; y < o; y++) {
				var h = y * p,
					f = h + p;
				d.push.apply(d, subTensorToString(e.subarray(h, f), l, c, n, y === o - 1))
			}
		var m = 2 === i ? "," : "";
		d[0] = "[" + d[0] + m;
		for (y = 1; y < d.length - 1; y++) d[y] = " " + d[y] + m;
		for (var g = ",\n", y = 2; y < i; y++) g += "\n";
		return d[d.length - 1] = " " + d[d.length - 1] + "]" + (a ? "" : g), d
	}

	function axesAreInnerMostDims(e, t) {
		for (var r = 0; r < e.length; ++r)
			if (e[e.length - r - 1] !== t - 1 - r) return !1;
		return !0
	}

	function combineLocations(e, t, r) {
		for (var n = e.length + t.length, a = [], o = 0, i = 0, s = 0; s < n; s++) - 1 === r.indexOf(s) ? a.push(e[o++]) : a.push(t[i++]);
		return a
	}

	function computeOutAndReduceShapes(e, t) {
		for (var r = [], n = e.length, a = 0; a < n; a++) - 1 === t.indexOf(a) && r.push(e[a]);
		return [r, t.map(function(t) {
			return e[t]
		})]
	}

	function expandShapeToKeepDim(e, t) {
		return combineLocations(e, t.map(function(e) {
			return 1
		}), t)
	}

	function parseAxisParam(e, t) {
		var r = t.length;
		return e = null == e ? t.map(function(e, t) {
			return t
		}) : [].concat(e), assert(e.every(function(e) {
			return e >= -r && e < r
		}), "All values in axis param must be in range [-" + r + ", " + r + ") but got axis " + e), assert(e.every(function(e) {
			return isInt(e)
		}), "All values in axis param must be integers but got axis " + e), e.map(function(e) {
			return e < 0 ? r + e : e
		})
	}

	function assertAxesAreInnerMostDims(e, t, r) {
		assert(axesAreInnerMostDims(t, r), e + " supports only inner-most axes for now. Got axes " + t + " and rank-" + r + " input.")
	}

	function getAxesPermutation(e, t) {
		if (axesAreInnerMostDims(e, t)) return null;
		for (var r = [], n = 0; n < t; ++n) - 1 === e.indexOf(n) && r.push(n);
		return e.forEach(function(e) {
			return r.push(e)
		}), r
	}

	function getUndoAxesPermutation(e) {
		return e.map(function(e, t) {
			return [t, e]
		}).sort(function(e, t) {
			return e[1] - t[1]
		}).map(function(e) {
			return e[0]
		})
	}

	function getInnerMostAxes(e, t) {
		for (var r = [], n = t - e; n < t; ++n) r.push(n);
		return r
	}

	function assertParams(e, t, r) {
		var n = e.length,
			a = t.length;
		assert(e.length === t.length, "Error in concat" + n + "D: rank of x1 (" + n + ") and x2 (" + a + ") must be the same."), assert(r >= 0 && r < n, "Error in concat" + n + "D: axis must be between 0 and " + (n - 1) + ".");
		for (var o = 0; o < n; o++) assert(o === r || e[o] === t[o], "Error in concat" + n + "D: Shape (" + e + ") does not match (" + t + ") along the non-concatenated axis " + o + ".")
	}

	function computeOutShape(e, t, r) {
		assert(e.length === t.length, "x1 and x2 should have the same rank.");
		var n = e.slice();
		return n[r] += t[r], n
	}

	function computeGradientSliceShapes(e, t) {
		return {
			aBegin: [0, 0],
			aSize: e,
			bBegin: [0, e[1]],
			bSize: t
		}
	}

	function operation(e, t, r) {
		var n = r.value;
		return r.value = function() {
			for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
			return tidy(t, function() {
				return n.apply(void 0, e)
			})
		}, r
	}

	function concat2Tensors(e, t, r) {
		assertParams(e.shape, t.shape, r);
		var n = computeOutShape(e.shape, t.shape, r),
			a = e.as2D(-1, sizeFromShape(e.shape.slice(r))),
			o = t.as2D(-1, sizeFromShape(t.shape.slice(r))),
			i = computeGradientSliceShapes(a.shape, o.shape),
			s = i.aBegin,
			u = i.aSize,
			l = i.bBegin,
			c = i.bSize;
		return ENV.engine.runKernel(function(e) {
			return e.concat(a, o)
		}, {
			a: a,
			b: o
		}, function(e) {
			return {
				a: function() {
					return e.slice(s, u)
				},
				b: function() {
					return e.slice(l, c)
				}
			}
		}).reshape(n)
	}

	function createCommonjsModule(e, t) {
		return t = {
			exports: {}
		}, e(t, t.exports), t.exports
	}

	function makeZerosTypedArray(e, t) {
		if (null == t || "float32" === t) return new Float32Array(e);
		if ("int32" === t) return new Int32Array(e);
		if ("bool" === t) return new Uint8Array(e);
		throw new Error("Unknown data type $ {dtype}")
	}

	function makeOnesTypedArray(e, t) {
		for (var r = makeZerosTypedArray(e, t), n = 0; n < r.length; n++) r[n] = 1;
		return r
	}

	function toTypedArray(e, t) {
		return noConversionNeeded(e, t) ? e : (Array.isArray(e) && (e = flatten(e)), copyTypedArray(e, t))
	}

	function noConversionNeeded(e, t) {
		return e instanceof Float32Array && "float32" === t || e instanceof Int32Array && "int32" === t || e instanceof Uint8Array && "bool" === t
	}

	function getBroadcastDims(e, t) {
		for (var r = e.length, n = [], a = 0; a < r; a++) {
			var o = r - 1 - a,
				i = e[o] || 1;
			(t[t.length - 1 - a] || 1) > 1 && 1 === i && n.unshift(o)
		}
		return n
	}

	function getReductionAxes(e, t) {
		for (var r = [], n = 0; n < t.length; n++) {
			var a = e[e.length - n - 1],
				o = t.length - n - 1,
				i = t[o];
			(null == a || 1 === a && i > 1) && r.unshift(o)
		}
		return r
	}

	function broadcastDimsAreOuter(e) {
		for (var t = 0; t < e.length; t++)
			if (e[t] !== t) return !1;
		return !0
	}

	function assertAndGetBroadcastShape(e, t) {
		for (var r = [], n = "Operands could not be broadcast together with shapes " + e + " and " + t + ".", a = Math.max(e.length, t.length), o = 0; o < a; o++) {
			var i = e[e.length - o - 1] || 1,
				s = t[t.length - o - 1] || 1;
			if (i > 1 && s > 1 && i !== s) throw Error(n);
			r.unshift(Math.max(i, s))
		}
		return r
	}

	function batchnormReshape4D(e) {
		return null == e ? null : 0 === e.rank ? e.as1D() : 1 === e.rank ? e : 2 === e.rank ? e.as4D(1, 1, e.shape[0], e.shape[1]) : 3 === e.rank ? e.as4D(1, e.shape[0], e.shape[1], e.shape[2]) : e
	}

	function upcastType(e, t) {
		return upcastTypeMap[e][t]
	}

	function sumOutType(e) {
		return upcastType(e, "int32")
	}

	function computePool2DInfo(e, t, r, n, a, o) {
		void 0 === o && (o = "channelsLast");
		var i, s = parseTupleParam(t),
			u = s[0],
			l = s[1];
		if ("channelsLast" === o) i = [u, l, e[3], e[3]];
		else {
			if ("channelsFirst" !== o) throw new Error("Unknown dataFormat " + o);
			i = [u, l, e[1], e[1]]
		}
		return computeConv2DInfo(e, i, r, 1, n, a, !1, o)
	}

	function computeConv2DInfo(e, t, r, n, a, o, i, s) {
		void 0 === i && (i = !1), void 0 === s && (s = "channelsLast");
		var u = [-1, -1, -1, -1],
			l = u[0],
			c = u[1],
			p = u[2],
			d = u[3];
		if ("channelsLast" === s) l = e[0], c = e[1], p = e[2], d = e[3];
		else {
			if ("channelsFirst" !== s) throw new Error("Unknown dataFormat " + s);
			l = e[0], d = e[1], c = e[2], p = e[3]
		}
		var h, f = t[0],
			m = t[1],
			g = t[3],
			y = parseTupleParam(r),
			v = y[0],
			b = y[1],
			x = parseTupleParam(n),
			w = x[0],
			_ = x[1],
			S = getPadAndOutInfo(a, c, p, v, b, getEffectiveFilterSize(f, w), getEffectiveFilterSize(m, _), o),
			N = S.padInfo,
			A = S.outHeight,
			E = S.outWidth,
			T = i ? g * d : g;
		return "channelsFirst" === s ? h = [l, T, A, E] : "channelsLast" === s && (h = [l, A, E, T]), {
			batchSize: l,
			dataFormat: s,
			inHeight: c,
			inWidth: p,
			inChannels: d,
			outHeight: A,
			outWidth: E,
			outChannels: T,
			padInfo: N,
			strideHeight: v,
			strideWidth: b,
			filterHeight: f,
			filterWidth: m,
			dilationHeight: w,
			dilationWidth: _,
			inShape: e,
			outShape: h,
			filterShape: t
		}
	}

	function computeOutputShape3D(e, t, r, n, a, o) {
		null == a && (a = computeDefaultPad(e, t, n));
		var i = e[0],
			s = e[1],
			u = conditionalRound((i - t + 2 * a) / n + 1, o);
		assert(isInt(u), "The output # of rows (" + u + ") must be an integer. Change the stride and/or zero pad parameters");
		var l = conditionalRound((s - t + 2 * a) / n + 1, o);
		return assert(isInt(l), "The output # of columns (" + l + ") must be an integer. Change the stride and/or zero pad parameters"), [u, l, r]
	}

	function computeDefaultPad(e, t, r, n) {
		void 0 === n && (n = 1);
		var a = getEffectiveFilterSize(t, n);
		return Math.floor((e[0] * (r - 1) - r + a) / 2)
	}

	function parseTupleParam(e) {
		return "number" == typeof e ? [e, e] : e
	}

	function getEffectiveFilterSize(e, t) {
		return t <= 1 ? e : e + (e - 1) * (t - 1)
	}

	function getPadAndOutInfo(e, t, r, n, a, o, i, s) {
		var u, l, c;
		if ("number" == typeof e) {
			u = {
				top: e,
				bottom: e,
				left: e,
				right: e,
				type: 0 === e ? "VALID" : "NUMBER"
			};
			var p = computeOutputShape3D([t, r, 1], o, 1, n, e, s);
			l = p[0], c = p[1]
		} else if ("same" === e) {
			var d = ((l = Math.ceil(t / n)) - 1) * n + o - t,
				h = ((c = Math.ceil(r / a)) - 1) * a + i - r,
				f = Math.floor(d / 2),
				m = d - f,
				g = Math.floor(h / 2);
			u = {
				top: f,
				bottom: m,
				left: g,
				right: h - g,
				type: "SAME"
			}
		} else {
			if ("valid" !== e) throw Error("Unknown padding parameter: " + e);
			u = {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				type: "VALID"
			}, l = Math.ceil((t - o + 1) / n), c = Math.ceil((r - i + 1) / a)
		}
		return {
			padInfo: u,
			outHeight: l,
			outWidth: c
		}
	}

	function conditionalRound(e, t) {
		if (!t) return e;
		switch (t) {
			case "round":
				return Math.round(e);
			case "ceil":
				return Math.ceil(e);
			case "floor":
				return Math.floor(e);
			default:
				throw new Error("Unknown roundingMode " + t)
		}
	}

	function parseTupleParam$1(e) {
		return "number" == typeof e ? [e, e] : e
	}

	function tupleValuesAreOne(e) {
		var t = parseTupleParam$1(e),
			r = t[0],
			n = t[1];
		return 1 === r && 1 === n
	}

	function eitherStridesOrDilationsAreOne(e, t) {
		return tupleValuesAreOne(e) || tupleValuesAreOne(t)
	}

	function depthwiseConv2dDerInput(e, t, r, n) {
		var a = t,
			o = !1;
		3 === t.rank && (o = !0, a = t.as4D(1, t.shape[0], t.shape[1], t.shape[2]));
		var i = ENV.engine.runKernel(function(e) {
			return e.depthwiseConv2DDerInput(a, r, n)
		}, {
			dy4D: a
		});
		return o ? i.as3D(i.shape[1], i.shape[2], i.shape[3]) : i
	}

	function depthwiseConv2dDerFilter(e, t, r, n) {
		var a = e;
		3 === e.rank && (a = e.as4D(1, e.shape[0], e.shape[1], e.shape[2]));
		var o = t;
		return 3 === o.rank && (o = t.as4D(1, t.shape[0], t.shape[1], t.shape[2])), ENV.engine.runKernel(function(e) {
			return e.depthwiseConv2DDerFilter(a, o, n)
		}, {
			x4D: a,
			dy4D: o
		})
	}

	function normImpl(e, t, r) {
		if (void 0 === r && (r = null), 0 === e.rank) return e.abs();
		if (1 !== e.rank && null === r) return normImpl(e.reshape([-1]), t, r);
		if (1 === e.rank || "number" == typeof r || r instanceof Array && 1 === r.length) {
			if (1 === t) return e.abs().sum(r);
			if (t === 1 / 0) return e.abs().max(r);
			if (t === -1 / 0) return e.abs().min(r);
			if ("euclidean" === t || 2 === t) return e.abs().pow(scalar(2, "int32")).sum(r).sqrt();
			throw new Error("Error in norm: invalid ord value: " + t)
		}
		if (r instanceof Array && 2 === r.length) {
			if (1 === t) return e.abs().sum(r[0]).max(r[1] - 1);
			if (t === 1 / 0) return e.abs().sum(r[1]).max(r[0]);
			if (t === -1 / 0) return e.abs().sum(r[1]).min(r[0]);
			if ("fro" === t || "euclidean" === t) return e.square().sum(r).sqrt();
			throw new Error("Error in norm: invalid ord value: " + t)
		}
		throw new Error("Error in norm: invalid axis: " + r)
	}

	function assertParamsValid(e, t, r) {
		assert(e.rank === t.length, "Error in slice" + e.rank + "D: Length of begin " + t + " must match the rank of the array (" + e.rank + ")."), assert(e.rank === r.length, "Error in slice" + e.rank + "D: Length of size " + r + " must match the rank of the array (" + e.rank + ").");
		for (var n = 0; n < e.rank; ++n) assert(t[n] + r[n] <= e.shape[n], "Error in slice" + e.rank + "D: begin[" + n + "] + size[" + n + "] (" + (t[n] + r[n]) + ") would overflow input.shape[" + n + "] (" + e.shape[n] + ")")
	}

	function getStridedSlicedInfo(e, t, r, n, a, o) {
		void 0 === a && (a = 0), void 0 === o && (o = 0);
		for (var i = [], s = [], u = 0; u < e.length; u++) i[u] = startForAxis(a, t, n, e, u), s[u] = stopForAxis(o, r, n, e, u);
		var l = new Array(e.length).fill(0);
		return l = l.map(function(e, t) {
			for (var r = 0, a = i[t]; !(n[t] > 0 ? a >= s[t] : a <= s[t]); a += n[t]) r += 1;
			return r
		}), [i, l]
	}

	function startForAxis(e, t, r, n, a) {
		var o = t[a];
		e & 1 << a && (o = r[a] > 0 ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER);
		var i = n[a];
		return o < 0 && (o += i), o = clamp(0, o, i - 1)
	}

	function stopForAxis(e, t, r, n, a) {
		var o = t[a];
		e & 1 << a && (o = r[a] > 0 ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER);
		var i = n[a];
		return o < 0 && (o += i), o = r[a] > 0 ? clamp(0, o, i) : clamp(-1, o, i - 1)
	}

	function computeStrides(e) {
		var t = e.length;
		if (t < 2) return [];
		var r = new Array(t - 1);
		r[t - 2] = e[t - 1];
		for (var n = t - 3; n >= 0; --n) r[n] = r[n + 1] * e[n + 1];
		return r
	}

	function checkGrads(e) {
		if (e.filter(function(e) {
				return null == e
			}).length > 0) throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that\n    the f you passed encloses all operations that lead from x to y.")
	}

	function getFilteredNodesXToY(e, t, r) {
		for (var n = {}, a = {}, o = 0; o < t.length; o++) n[t[o].id] = !0;
		for (o = 0; o < e.length; o++) {
			d = (m = e[o]).inputs;
			for (var i in d) {
				for (var s = d[i], u = !1, l = 0; l < t.length; l++)
					if (n[s.id]) {
						n[m.output.id] = !0, u = !0, a[m.id] = !0;
						break
					} if (u) break
			}
		}
		var c = {};
		c[r.id] = !0;
		for (var p = {}, o = e.length - 1; o >= 0; o--) {
			var d = (m = e[o]).inputs,
				h = [];
			h.push(m.output);
			for (l = 0; l < h.length; l++)
				if (c[h[l].id]) {
					for (var i in d) c[d[i].id] = !0, p[m.id] = !0;
					break
				}
		}
		for (var f = [], o = 0; o < e.length; o++) {
			var m = e[o];
			if (a[m.id] && p[m.id]) {
				var g = {};
				for (var i in m.inputs) {
					var y = m.inputs[i];
					n[y.id] && (g[i] = y)
				}
				var v = Object.assign({}, m);
				v.inputs = g, v.output = m.output, f.push(v)
			}
		}
		return f
	}

	function backpropagateGradients(e, t) {
		for (var r = t.length - 1; r >= 0; r--) {
			var n = t[r],
				a = e[n.output.id];
			if (null == n.gradient) throw new Error("Cannot compute gradient: gradient function not found for " + n.name + ".");
			var o = n.gradient(a);
			for (var i in n.inputs) {
				if (!(i in o)) throw new Error("Cannot backprop through input " + i + ". Available gradients found: " + Object.keys(o) + ".");
				var s = o[i](),
					u = n.inputs[i];
				if (!arraysEqual(s.shape, u.shape)) throw new Error("Error in gradient for op " + n.name + ". The gradient of input '" + i + "' has shape '" + s.shape + "', which does not match the shape of the input '" + u.shape + "'");
				if (null == e[u.id]) e[u.id] = s;
				else {
					var l = e[u.id];
					e[u.id] = l.add(s), l.dispose()
				}
			}
		}
	}

	function hasExtension(e, t) {
		return null != e.getExtension(t)
	}

	function getWebGLRenderingContext(e) {
		if (0 === e || !ENV.get("IS_BROWSER")) throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");
		var t = document.createElement("canvas");
		return 1 === e ? t.getContext("webgl") || t.getContext("experimental-webgl") : t.getContext("webgl2")
	}

	function loseContext(e) {
		if (null != e) {
			var t = e.getExtension("WEBGL_lose_context");
			if (null == t) throw new Error("Extension WEBGL_lose_context not supported on this browser.");
			t.loseContext()
		}
	}

	function isWebGLVersionEnabled(e) {
		var t = getWebGLRenderingContext(e);
		return null != t && (loseContext(t), !0)
	}

	function getWebGLDisjointQueryTimerVersion(e) {
		if (0 === e) return 0;
		var t, r = getWebGLRenderingContext(e);
		return t = hasExtension(r, "EXT_disjoint_timer_query_webgl2") && 2 === e ? 2 : hasExtension(r, "EXT_disjoint_timer_query") ? 1 : 0, null != r && loseContext(r), t
	}

	function isFloatTextureReadPixelsEnabled(e) {
		if (0 === e) return !1;
		var t = getWebGLRenderingContext(e);
		if (1 === e) {
			if (!hasExtension(t, "OES_texture_float")) return !1
		} else if (!hasExtension(t, "EXT_color_buffer_float")) return !1;
		var r = t.createFramebuffer(),
			n = t.createTexture();
		t.bindTexture(t.TEXTURE_2D, n);
		var a = 2 === e ? t.RGBA32F : t.RGBA;
		t.texImage2D(t.TEXTURE_2D, 0, a, 1, 1, 0, t.RGBA, t.FLOAT, null), t.bindFramebuffer(t.FRAMEBUFFER, r), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, n, 0);
		var o = t.checkFramebufferStatus(t.FRAMEBUFFER) === t.FRAMEBUFFER_COMPLETE;
		t.readPixels(0, 0, 1, 1, t.RGBA, t.FLOAT, new Float32Array(4));
		var i = t.getError() === t.NO_ERROR;
		return loseContext(t), o && i
	}

	function isWebGLGetBufferSubDataAsyncExtensionEnabled(e) {
		if (e > 0) return !1;
		if (2 !== e) return !1;
		var t = getWebGLRenderingContext(e),
			r = hasExtension(t, "WEBGL_get_buffer_sub_data_async");
		return loseContext(t), r
	}

	function getFeaturesFromURL() {
		var e = {};
		if ("undefined" == typeof window || void 0 === window.location) return e;
		var t = getQueryParams(window.location.search);
		if (TENSORFLOWJS_FLAGS_PREFIX in t) {
			var r = {};
			t[TENSORFLOWJS_FLAGS_PREFIX].split(",").forEach(function(e) {
				var t = e.split(":"),
					n = t[0],
					a = t[1];
				r[n] = a
			}), URL_PROPERTIES.forEach(function(t) {
				t.name in r && (console.log("Setting feature override from URL " + t.name + ": " + r[t.name]), t.type === Type.NUMBER ? e[t.name] = +r[t.name] : t.type === Type.BOOLEAN ? e[t.name] = "true" === r[t.name] : t.type === Type.STRING ? e[t.name] = r[t.name] : console.warn("Unknown URL param: " + t.name + "."))
			})
		}
		return e
	}

	function getGlobalNamespace() {
		var e;
		if ("undefined" != typeof window) e = window;
		else {
			if ("undefined" == typeof global) throw new Error("Could not find a global object");
			e = global
		}
		return e
	}

	function getOrMakeEnvironment() {
		var e = getGlobalNamespace();
		return e.ENV = e.ENV || new Environment(getFeaturesFromURL()), e.ENV
	}

	function computeOptimalWindowSize(e) {
		return e <= PARALLELIZE_THRESHOLD ? e : nearestDivisor(e, Math.floor(Math.sqrt(e)))
	}

	function nearestDivisor(e, t) {
		for (var r = t; r < e; ++r)
			if (e % r == 0) return r;
		return e
	}

	function castTensor(e, t, r) {
		if (!hasEncodingLoss(e.dtype, t)) return Tensor.make(e.shape, {
			dataId: e.dataId
		}, t);
		if ("int32" === t) return r.int(e);
		if ("bool" === t) return r.notEqual(e, ArrayOps.scalar(0, e.dtype));
		throw new Error("Error in Cast: unknown dtype argument (" + t + ")")
	}

	function reshapeTensor(e, t) {
		return Tensor.make(t, {
			dataId: e.dataId
		}, e.dtype)
	}

	function getUnpackedMatrixTextureShapeWidthHeight(e, t) {
		return [t, e]
	}

	function getUnpackedArraySizeFromMatrixSize(e, t) {
		return e * t
	}

	function getColorMatrixTextureShapeWidthHeight(e, t) {
		return [4 * t, e]
	}

	function getMatrixSizeFromUnpackedArraySize(e, t) {
		if (e % t != 0) throw new Error("unpackedSize (" + e + ") must be a multiple of " + t);
		return e / t
	}

	function encodeMatrixToUnpackedArray(e, t, r) {
		var n = getUnpackedArraySizeFromMatrixSize(e.length, r);
		if (t.length < n) throw new Error("unpackedArray length (" + t.length + ") must be >= " + n);
		for (var a = 0, o = 0; o < e.length; ++o) t[a] = e[o], a += r
	}

	function encodeFloatArray(e) {
		for (var t = new Uint8Array(4 * e.length), r = 0; r < t.length; r += 4) ! function(r) {
			var n = e[r / 4];
			if (isNaN(n)) return t[r] = BYTE_NAN_VALUE, t[r + 1] = BYTE_NAN_VALUE, t[r + 2] = BYTE_NAN_VALUE, t[r + 3] = BYTE_NAN_VALUE, "continue";
			var a = (n - FLOAT_MIN) / FLOAT_RANGE,
				o = FLOAT_POWERS.map(function(e) {
					return e * a
				}).map(function(e) {
					return Math.floor(e % 1 * 255)
				});
			t[r] = Math.floor(a), t[r + 1] = o[0], t[r + 2] = o[1], t[r + 3] = o[2]
		}(r);
		return t
	}

	function decodeToFloatArray(e) {
		for (var t = new Float32Array(e.length / 4), r = 0; r < e.length; r += 4) ! function(r) {
			if (e[r] === BYTE_NAN_VALUE && e[r + 1] === BYTE_NAN_VALUE && e[r + 2] === BYTE_NAN_VALUE && e[r + 3] === BYTE_NAN_VALUE) return t[r / 4] = NaN, "continue";
			var n = 0;
			FLOAT_DELTAS.forEach(function(t, a) {
				n += t * e[r + a]
			});
			var a = n * FLOAT_RANGE + FLOAT_MIN;
			t[r / 4] = a
		}(r);
		return t
	}

	function decodeMatrixFromUnpackedArray(e, t, r) {
		var n = getMatrixSizeFromUnpackedArraySize(e.length, r);
		if (t.length < n) throw new Error("matrix length (" + t.length + ") must be >= " + n);
		for (var a = 0, o = 0; o < e.length; o += r) t[a++] = e[o]
	}

	function decodeMatrixFromUnpackedColorRGBAArray(e, t, r) {
		var n = e.length * r / 4;
		if (t.length < n) throw new Error("matrix length (" + t.length + ") must be >= " + n);
		for (var a = 0, o = 0; o < e.length; o += 4)
			for (var i = 0; i < r; i++) t[a++] = e[o + i]
	}

	function getPackedMatrixTextureShapeWidthHeight(e, t) {
		return [Math.ceil(t / 2), Math.ceil(e / 2)]
	}

	function getPackedRGBAArraySizeFromMatrixShape(e, t) {
		var r = getPackedMatrixTextureShapeWidthHeight(e, t);
		return r[0] * r[1] * 4
	}

	function encodeMatrixToPackedRGBA(e, t, r, n) {
		var a = getPackedRGBAArraySizeFromMatrixShape(t, r);
		if (n.length < a) throw new Error("packedRGBA length (" + n.length + ") must be >= " + a);
		for (var o = getPackedMatrixTextureShapeWidthHeight(t, r), i = o[0], s = o[1], u = r % 2 == 1, l = t % 2 == 1, c = Math.floor(r / 2), p = Math.floor(t / 2), d = u ? 4 : 0, h = r, f = 0, m = 0; m < p; ++m) {
			for (var g = 2 * m * r, y = 0; y < c; ++y) {
				v = g + 2 * y;
				n[f] = e[v], n[f + 1] = e[v + 1], n[f + 2] = e[v + h], n[f + 3] = e[v + h + 1], f += 4
			}
			f += d
		}
		if (u)
			for (var v = r - 1, f = 4 * (i - 1), b = 2 * r, d = 4 * i, m = 0; m < p; ++m) n[f] = e[v], n[f + 2] = e[v + r], v += b, f += d;
		if (l)
			for (var v = (t - 1) * r, f = (s - 1) * i * 4, y = 0; y < c; ++y) n[f++] = e[v++], n[f++] = e[v++], f += 2;
		return u && l && (n[n.length - 4] = e[e.length - 1]), n
	}

	function decodeMatrixFromPackedRGBA(e, t, r, n) {
		var a = t * r;
		if (a < n.length) throw new Error("matrix length (" + n.length + ") must be >= " + a);
		for (var o = r % 2 == 1, i = t % 2 == 1, s = Math.floor(r / 2), u = Math.floor(t / 2), l = getPackedMatrixTextureShapeWidthHeight(t, r), c = l[0], p = l[1], d = o ? 4 : 0, h = r + (o ? 1 : 0), f = 0, m = 0, g = r, y = 0; y < u; ++y) {
			for (b = 0; b < s; ++b) n[m++] = e[f++], n[m++] = e[f++], n[g++] = e[f++], n[g++] = e[f++];
			f += d, m += h, g += h
		}
		if (o)
			for (var f = 4 * (c - 1), v = r - 1, d = 4 * c, h = 2 * r, y = 0; y < u; ++y) n[v] = e[f], n[v + r] = e[f + 2], f += d, v += h;
		if (i)
			for (var f = (p - 1) * c * 4, v = (t - 1) * r, b = 0; b < s; ++b) n[v++] = e[f++], n[v++] = e[f++], f += 2;
		return o && i && (n[n.length - 1] = e[e.length - 4]), n
	}

	function makeShader(e, t, r, n) {
		var a = getSampleSnippet(),
			o = getSetOutputSnippet(),
			i = e.map(function(e) {
				return "uniform sampler2D " + e.name + ";"
			}).join("\n"),
			s = e.map(function(e) {
				return getInputSamplingSnippet(e, t, n)
			}).join("\n"),
			u = t.texShape,
			l = getOutputSamplingSnippet(t.logicalShape, u);
		return [SHADER_PREFIX, a, o, i, l, s, r].join("\n")
	}

	function getSampleSnippet() {
		return ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED") ? FLOAT_TEXTURE_SAMPLE_SNIPPET : UNSIGNED_BYTE_TEXTURE_SAMPLE_SNIPPET
	}

	function getSetOutputSnippet() {
		return ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED") ? FLOAT_TEXTURE_SETOUTPUT_SNIPPET : UNSIGNED_BYTE_TEXTURE_SETOUTPUT_SNIPPET
	}

	function getSamplerFromInInfo(e) {
		var t = e.shapeInfo.logicalShape;
		switch (t.length) {
			case 0:
				return getSamplerScalar(e);
			case 1:
				return getSampler1D(e);
			case 2:
				return getSampler2D(e);
			case 3:
				return getSampler3D(e);
			case 4:
				return getSampler4D(e);
			case 5:
				return getSampler5D(e);
			default:
				throw new Error(t.length + "-D input sampling is not yet supported")
		}
	}

	function getInputSamplingSnippet(e, t, r) {
		var n = getSamplerFlat(e);
		return n += getSamplerFromInInfo(e), (r || arraysEqual(e.shapeInfo.logicalShape, t.logicalShape)) && (n += getSamplerAtOutputCoords(e, t, r)), n
	}

	function getOutputSamplingSnippet(e, t) {
		switch (e.length) {
			case 0:
				return "\n    int getOutputCoords() {\n      return 0;\n    }\n  ";
			case 1:
				return getOutput1DCoords(e, t);
			case 2:
				return getOutput2DCoords(e, t);
			case 3:
				return getOutput3DCoords(e, t);
			case 4:
				return getOutput4DCoords(e, t);
			case 5:
				return getOutput5DCoords(e, t);
			default:
				throw new Error(e.length + "-D output sampling is not yet supported")
		}
	}

	function getOutputScalarCoords() {
		return "\n    int getOutputCoords() {\n      return 0;\n    }\n  "
	}

	function getOutput1DCoords(e, t) {
		return 1 === t[0] ? "\n      int getOutputCoords() {\n        return int(resultUV.x * " + t[1] + ".0);\n      }\n    " : 1 === t[1] ? "\n      int getOutputCoords() {\n        return int(resultUV.y * " + t[0] + ".0);\n      }\n    " : "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + t[0] + ", " + t[1] + "));\n      return resTexRC.x * " + t[1] + " + resTexRC.y;\n    }\n  "
	}

	function getOutput3DCoords(e, t) {
		var r = e[1] * e[2],
			n = e[2];
		return "\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + t[0] + ", " + t[1] + "));\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n      int r = index / " + r + ";\n      index -= r * " + r + ";\n      int c = index / " + n + ";\n      int d = index - c * " + n + ";\n      return ivec3(r, c, d);\n    }\n  "
	}

	function getOutput4DCoords(e, t) {
		var r = e[3],
			n = e[2] * r,
			a = e[1] * n;
		return "\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(" + t[0] + ", " + t[1] + "));\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n\n      int r = index / " + a + ";\n      index -= r * " + a + ";\n\n      int c = index / " + n + ";\n      index -= c * " + n + ";\n\n      int d = index / " + r + ";\n      int d2 = index - d * " + r + ";\n\n      return ivec4(r, c, d, d2);\n    }\n  "
	}

	function getOutput5DCoords(e, t) {
		var r = e[4],
			n = e[3] * r,
			a = e[2] * n,
			o = e[1] * a;
		return "\n    ivec5 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx * vec2(" + t[0] + ",\n                             " + t[1] + "));\n\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n\n      int r = index / " + o + ";\n      index -= r * " + o + ";\n\n      int c = index / " + a + ";\n      index -= c * " + a + ";\n\n      int d = index / " + n + ";\n      index -= d * " + n + ";\n\n      int d2 = index  / " + r + ";\n      int d3 = index - d2 * " + r + ";\n\n      ivec5 outShape = ivec5(r, c, d, d2, d3);\n      return outShape;\n    }\n  "
	}

	function getOutput2DCoords(e, t) {
		return arraysEqual(e, t) ? "\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(" + t[0] + ", " + t[1] + "));\n      }\n    " : 1 === e[1] ? "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + t[0] + ", " + t[1] + "));\n        int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    " : 1 === e[0] ? "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + t[0] + ", " + t[1] + "));\n        int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n        return ivec2(0, index);\n      }\n    " : "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + t[0] + ", " + t[1] + "));\n      int index = resTexRC.x * " + t[1] + " + resTexRC.y;\n      int r = index / " + e[1] + ";\n      int c = index - r * " + e[1] + ";\n      return ivec2(r, c);\n    }\n  "
	}

	function getSamplerScalar(e) {
		var t = e.name;
		return "\n    float " + ("get" + t.charAt(0).toUpperCase() + t.slice(1)) + "() {\n      return sampleTexture(" + t + ", halfCR);\n    }\n  "
	}

	function getSampler1D(e) {
		var t = e.name,
			r = "get" + t.charAt(0).toUpperCase() + t.slice(1);
		return "\n    float " + r + "(int index) {\n      return " + r + "Flat(index);\n    }\n  "
	}

	function getSampler2D(e) {
		var t = e.shapeInfo.logicalShape,
			r = e.shapeInfo.texShape,
			n = e.name,
			a = "get" + n.charAt(0).toUpperCase() + n.slice(1),
			o = r[0],
			i = r[1];
		if (arraysEqual(t, r)) return "\n    float " + a + "(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(" + i + ".0, " + o + ".0);\n      return sampleTexture(" + n + ", uv);\n    }\n  ";
		var s = squeezeShape(t),
			u = s.newShape,
			l = s.keptDims,
			c = u;
		if (c.length < t.length) {
			var p = ["row", "col"];
			return "\n      " + getSamplerFromInInfo(squeezeInputInfo(e, c)) + "\n      float " + a + "(int row, int col) {\n        return " + a + "(" + getSqueezedParams(p, l) + ");\n      }\n    "
		}
		return 1 === i ? "\n    float " + a + "(int row, int col) {\n      int index = row * " + t[1] + " + col;\n      vec2 uv = vec2(0.5, (float(index) + 0.5) / " + o + ".0);\n      return sampleTexture(" + n + ", uv);\n    }\n  " : 1 === o ? "\n    float " + a + "(int row, int col) {\n      int index = row * " + t[1] + " + col;\n      vec2 uv = vec2((float(index) + 0.5) / " + i + ".0, 0.5);\n      return sampleTexture(" + n + ", uv);\n    }\n  " : "\n  float " + a + "(int row, int col) {\n    vec2 uv = UVfrom2D(" + o + ", " + i + ", " + t[1] + ", row, col);\n    return sampleTexture(" + n + ", uv);\n  }\n"
	}

	function getSampler3D(e) {
		var t = e.shapeInfo.texShape,
			r = e.shapeInfo.logicalShape,
			n = e.name,
			a = "get" + n.charAt(0).toUpperCase() + n.slice(1),
			o = t[0],
			i = t[1],
			s = r[1] * r[2],
			u = r[2],
			l = squeezeShape(r),
			c = l.newShape,
			p = l.keptDims,
			d = c;
		if (d.length < r.length) {
			var h = ["row", "col", "depth"];
			return "\n        " + getSamplerFromInInfo(squeezeInputInfo(e, d)) + "\n        float " + a + "(int row, int col, int depth) {\n          return " + a + "(" + getSqueezedParams(h, p) + ");\n        }\n      "
		}
		return i === s ? "\n        float " + a + "(int row, int col, int depth) {\n          int texR = row;\n          int texC = col * " + u + " + depth;\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(" + i + ".0, " + o + ".0);\n          return sampleTexture(" + n + ", uv);\n        }\n      " : i === u ? "\n    float " + a + "(int row, int col, int depth) {\n      int texR = row * " + r[1] + " + col;\n      int texC = depth;\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + i + ".0, " + o + ".0);\n      return sampleTexture(" + n + ", uv);\n    }\n  " : "\n      float " + a + "(int row, int col, int depth) {\n        vec2 uv = UVfrom3D(\n            " + o + ", " + i + ", " + s + ", " + u + ", row, col, depth);\n        return sampleTexture(" + n + ", uv);\n      }\n  "
	}

	function getSampler4D(e) {
		var t = e.shapeInfo.logicalShape,
			r = e.shapeInfo.texShape,
			n = e.name,
			a = "get" + n.charAt(0).toUpperCase() + n.slice(1),
			o = r[0],
			i = r[1],
			s = t[3],
			u = t[2] * s,
			l = t[1] * u,
			c = squeezeShape(t),
			p = c.newShape,
			d = c.keptDims;
		if (p.length < t.length) {
			var h = ["row", "col", "depth", "depth2"];
			return "\n      " + getSamplerFromInInfo(squeezeInputInfo(e, p)) + "\n      float " + a + "(int row, int col, int depth, int depth2) {\n        return " + a + "(" + getSqueezedParams(h, d) + ");\n      }\n    "
		}
		return i === l ? "\n      float " + a + "(int row, int col, int depth, int depth2) {\n        int texR = row;\n        int texC = col * " + u + " + depth * " + s + " + depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + i + ".0, " + o + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : i === s ? "\n      float " + a + "(int row, int col, int depth, int depth2) {\n        int texR = row * " + t[1] * t[2] + " + col * " + t[2] + " + depth;\n        int texC = depth2;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + i + ".0, " + o + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : "\n    float " + a + "(int row, int col, int depth, int depth2) {\n      vec2 uv = UVfrom4D(" + o + ", " + i + ", " + l + ", " + u + ",\n          " + s + ", row, col, depth, depth2);\n      return sampleTexture(" + n + ", uv);\n    }\n  "
	}

	function getSampler5D(e) {
		var t = e.shapeInfo.logicalShape,
			r = e.shapeInfo.texShape,
			n = e.name,
			a = "get" + n.charAt(0).toUpperCase() + n.slice(1),
			o = r[0],
			i = r[1],
			s = t[4],
			u = t[3] * s,
			l = t[2] * u,
			c = t[1] * l,
			p = squeezeShape(t),
			d = p.newShape,
			h = p.keptDims;
		if (d.length < t.length) {
			var f = ["row", "col", "depth", "depth2", "depth3"];
			return "\n      " + getSamplerFromInInfo(squeezeInputInfo(e, d)) + "\n      float " + a + "(int row, int col, int depth, int depth2, int depth3) {\n        return " + a + "(" + getSqueezedParams(f, h) + ");\n      }\n    "
		}
		return i === c ? "\n      float " + a + "(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row;\n        int texC = col * " + l + " + depth * " + u + " +\n                   depth2 * " + s + " + depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + i + ".0, " + o + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : i === s ? "\n      float " + a + "(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row * " + t[1] * t[2] + " + col * " + t[2] + " +\n                   depth * " + t[3] + " + depth2;\n        int texC = depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + i + ".0, " + o + ".0);\n        return sampleTexture(" + n + ", uv);\n      }\n    " : "\n    float " + a + "(int row, int col, int depth, int depth2, int depth3) {\n      vec2 uv = UVfrom5D(" + o + ", " + i + ", " + c + ", " + l + ",\n          " + u + ", " + s + ", row, col, depth, depth2, depth3);\n      return sampleTexture(" + n + ", uv);\n    }\n  "
	}

	function getSamplerFlat(e) {
		var t = e.name,
			r = e.shapeInfo.texShape,
			n = "get" + t.charAt(0).toUpperCase() + t.slice(1) + "Flat",
			a = r[0],
			o = r[1];
		return 1 === o && 1 === a ? "\n      float " + n + "(int index) {\n        return sampleTexture(" + t + ", halfCR);\n      }\n    " : 1 === o ? "\n      float " + n + "(int index) {\n        vec2 uv = vec2(0.5, (float(index) + 0.5) / " + a + ".0);\n        return sampleTexture(" + t + ", uv);\n      }\n    " : 1 === a ? "\n      float " + n + "(int index) {\n        vec2 uv = vec2((float(index) + 0.5) / " + o + ".0, 0.5);\n        return sampleTexture(" + t + ", uv);\n      }\n    " : "\n    float " + n + "(int index) {\n      vec2 uv = UVfrom1D(" + a + ", " + o + ", index);\n      return sampleTexture(" + t + ", uv);\n    }\n  "
	}

	function getBroadcastOutputCoordsSampler(e, t, r, n) {
		var a = e.shapeInfo.logicalShape.length,
			o = t.logicalShape.length,
			i = "int";
		2 === o ? i = "ivec2" : 3 === o ? i = "ivec3" : 4 === o && (i = "ivec4");
		var s, u = getBroadcastDims(e.shapeInfo.logicalShape, t.logicalShape),
			l = o - a;
		s = 0 === a ? "" : o < 2 && u.length >= 1 ? "coords = 0;" : u.map(function(e) {
			return "coords[" + (e + l) + "] = 0;"
		}).join("\n");
		var c = "";
		return c = o < 2 && a > 0 ? "coords" : e.shapeInfo.logicalShape.map(function(e, t) {
			return "coords[" + (t + l) + "]"
		}).join(", "), "\n    float " + n + "() {\n      " + i + " coords = getOutputCoords();\n      " + s + "\n      return get" + r + "(" + c + ");\n    }\n  "
	}

	function getSamplerAtOutputCoords(e, t, r) {
		var n = e.shapeInfo.texShape,
			a = e.name,
			o = a.charAt(0).toUpperCase() + a.slice(1),
			i = "get" + o + "AtOutCoords",
			s = getBroadcastDims(e.shapeInfo.logicalShape, t.logicalShape),
			u = e.shapeInfo.logicalShape.length,
			l = t.logicalShape.length,
			c = r && (l > u || s.length > 0),
			p = broadcastDimsAreOuter(s);
		if (c && !p) return getBroadcastOutputCoordsSampler(e, t, o, i);
		var d = t.texShape;
		if (arraysEqual(n, d)) return "\n      float " + i + "() {\n        return sampleTexture(" + a + ", resultUV);\n      }\n    ";
		var h = sizeFromShape(n),
			f = "";
		return c && p && (f = "\n        int mainPart = index / " + h + ";\n        index -= mainPart * " + h + ";\n      "), "\n    float " + i + "() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + d[0] + ", " + d[1] + "));\n      int index = resTexRC.x * " + d[1] + " + resTexRC.y;\n      " + f + "\n      int texR = index / " + n[1] + ";\n      int texC = index - texR * " + n[1] + ";\n      vec2 uv = (vec2(texC, texR) + halfCR) /\n                 vec2(" + n[1] + ".0, " + n[0] + ".0);\n\n      return sampleTexture(" + a + ", uv);\n    }\n  "
	}

	function getCoordsDataType(e) {
		if (e <= 1) return "int";
		if (2 === e) return "ivec2";
		if (3 === e) return "ivec3";
		if (4 === e) return "ivec4";
		if (5 === e) return "ivec5";
		throw Error("GPU for rank " + e + " is not yet supported")
	}

	function squeezeInputInfo(e, t) {
		var r = JSON.parse(JSON.stringify(e));
		return r.shapeInfo.logicalShape = t, r
	}

	function getSqueezedParams(e, t) {
		return t.map(function(t) {
			return e[t]
		}).join(", ")
	}

	function getCoords(e, t) {
		if (1 === e) return "" + t;
		if (2 === e) return t + ".x, " + t + ".y";
		if (3 === e) return t + ".x, " + t + ".y, " + t + ".z";
		if (4 === e) return t + ".x, " + t + ".y, " + t + ".z, " + t + ".w";
		throw Error("Cumulative sum for rank " + e + " is not yet supported")
	}

	function getFinalCoord(e, t) {
		if (1 === e) return "" + t;
		if (2 === e) return t + ".y";
		if (3 === e) return t + ".z";
		if (4 === e) return t + ".w";
		throw Error("Cumulative sum for rank " + e + " is not yet supported")
	}

	function getSourceCoords(e, t) {
		var r = e.length;
		if (r > 4) throw Error("Gather for rank " + r + " is not yet supported");
		if (1 === r) return "int(getIndices(resRC))";
		for (var n = ["resRC.x", "resRC.y", "resRC.z", "resRC.w"], a = [], o = 0; o < e.length; o++) o === t ? a.push("int(getIndices(" + n[o] + "))") : a.push("" + n[o]);
		return a.join()
	}

	function createWebGLRenderingContext(e) {
		var t = document.createElement("canvas");
		return t.width = 1, t.height = 1, createWebGLRenderingContextFromCanvas(t, e)
	}

	function createWebGLRenderingContextFromCanvas(e, t) {
		var r, n = ENV.get("WEBGL_VERSION");
		if (2 === n ? r = e.getContext("webgl2", t) : 1 === n && (r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t)), 0 === n || null == r) throw new Error("This browser does not support WebGL.");
		return r
	}

	function callAndCheck(e, t) {
		var r = t();
		return checkWebGLError(e), r
	}

	function enableDebugWebGLErrorChecking(e) {
		webGLDebugErrorCheckingEnabled = e
	}

	function checkWebGLError(e) {
		if (webGLDebugErrorCheckingEnabled) {
			var t = e.getError();
			if (t !== e.NO_ERROR) throw new Error("WebGL Error: " + getWebGLErrorMessage(e, t))
		}
	}

	function getWebGLErrorMessage(e, t) {
		switch (t) {
			case e.NO_ERROR:
				return "NO_ERROR";
			case e.INVALID_ENUM:
				return "INVALID_ENUM";
			case e.INVALID_VALUE:
				return "INVALID_VALUE";
			case e.INVALID_OPERATION:
				return "INVALID_OPERATION";
			case e.INVALID_FRAMEBUFFER_OPERATION:
				return "INVALID_FRAMEBUFFER_OPERATION";
			case e.OUT_OF_MEMORY:
				return "OUT_OF_MEMORY";
			case e.CONTEXT_LOST_WEBGL:
				return "CONTEXT_LOST_WEBGL";
			default:
				return "Unknown error code " + t
		}
	}

	function getExtensionOrThrow(e, t) {
		return throwIfNull(e, function() {
			return e.getExtension(t)
		}, 'Extension "' + t + '" not supported on this browser.')
	}

	function createVertexShader(e, t) {
		var r = throwIfNull(e, function() {
			return e.createShader(e.VERTEX_SHADER)
		}, "Unable to create vertex WebGLShader.");
		if (callAndCheck(e, function() {
				return e.shaderSource(r, t)
			}), callAndCheck(e, function() {
				return e.compileShader(r)
			}), !1 === e.getShaderParameter(r, e.COMPILE_STATUS)) throw console.log(e.getShaderInfoLog(r)), new Error("Failed to compile vertex shader.");
		return r
	}

	function createFragmentShader(e, t) {
		var r = throwIfNull(e, function() {
			return e.createShader(e.FRAGMENT_SHADER)
		}, "Unable to create fragment WebGLShader.");
		if (callAndCheck(e, function() {
				return e.shaderSource(r, t)
			}), callAndCheck(e, function() {
				return e.compileShader(r)
			}), !1 === e.getShaderParameter(r, e.COMPILE_STATUS)) throw logShaderSourceAndInfoLog(t, e.getShaderInfoLog(r)), new Error("Failed to compile fragment shader.");
		return r
	}

	function logShaderSourceAndInfoLog(e, t) {
		var r = lineNumberRegex.exec(t);
		if (null == r) return console.log("Couldn't parse line number in error: " + t), void console.log(e);
		for (var n = +r[1], a = e.split("\n"), o = a.length.toString().length + 2, i = a.map(function(e, t) {
				return rightPad((t + 1).toString(), o) + e
			}), s = 0, u = 0; u < i.length; u++) s = Math.max(i[u].length, s);
		var l = i.slice(0, n - 1),
			c = i.slice(n - 1, n),
			p = i.slice(n);
		console.log(l.join("\n")), console.log(t.split("\n")[0]), console.log("%c " + rightPad(c[0], s), "border:1px solid red; background-color:#e3d2d2; color:#a61717"), console.log(p.join("\n"))
	}

	function createProgram(e) {
		return throwIfNull(e, function() {
			return e.createProgram()
		}, "Unable to create WebGLProgram.")
	}

	function linkProgram(e, t) {
		if (callAndCheck(e, function() {
				return e.linkProgram(t)
			}), !1 === e.getProgramParameter(t, e.LINK_STATUS)) throw console.log(e.getProgramInfoLog(t)), new Error("Failed to link vertex and fragment shaders.")
	}

	function validateProgram(e, t) {
		if (callAndCheck(e, function() {
				return e.validateProgram(t)
			}), !1 === e.getProgramParameter(t, e.VALIDATE_STATUS)) throw console.log(e.getProgramInfoLog(t)), new Error("Shader program validation failed.")
	}

	function createStaticVertexBuffer(e, t) {
		var r = throwIfNull(e, function() {
			return e.createBuffer()
		}, "Unable to create WebGLBuffer");
		return callAndCheck(e, function() {
			return e.bindBuffer(e.ARRAY_BUFFER, r)
		}), callAndCheck(e, function() {
			return e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW)
		}), r
	}

	function createStaticIndexBuffer(e, t) {
		var r = throwIfNull(e, function() {
			return e.createBuffer()
		}, "Unable to create WebGLBuffer");
		return callAndCheck(e, function() {
			return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, r)
		}), callAndCheck(e, function() {
			return e.bufferData(e.ELEMENT_ARRAY_BUFFER, t, e.STATIC_DRAW)
		}), r
	}

	function queryMaxTextureSize(e) {
		return null != MAX_TEXTURE_SIZE ? MAX_TEXTURE_SIZE : MAX_TEXTURE_SIZE = callAndCheck(e, function() {
			return e.getParameter(e.MAX_TEXTURE_SIZE)
		})
	}

	function getChannelsPerTexture() {
		return ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED") && 2 === ENV.get("WEBGL_VERSION") ? 1 : 4
	}

	function createTexture(e) {
		return throwIfNull(e, function() {
			return e.createTexture()
		}, "Unable to create WebGLTexture.")
	}

	function validateTextureSize(e, t, r) {
		var n = queryMaxTextureSize(e);
		if (t <= 0 || r <= 0) {
			a = "[" + t + "x" + r + "]";
			throw new Error("Requested texture size " + a + " is invalid.")
		}
		if (t > n || r > n) {
			var a = "[" + t + "x" + r + "]",
				o = "[" + n + "x" + n + "]";
			throw new Error("Requested texture size " + a + " greater than WebGL maximum on this browser / GPU " + o + ".")
		}
	}

	function createFramebuffer(e) {
		return throwIfNull(e, function() {
			return e.createFramebuffer()
		}, "Unable to create WebGLFramebuffer.")
	}

	function bindVertexBufferToProgramAttribute(e, t, r, n, a, o, i) {
		var s = e.getAttribLocation(t, r);
		return -1 !== s && (callAndCheck(e, function() {
			return e.bindBuffer(e.ARRAY_BUFFER, n)
		}), callAndCheck(e, function() {
			return e.vertexAttribPointer(s, a, e.FLOAT, !1, o, i)
		}), callAndCheck(e, function() {
			return e.enableVertexAttribArray(s)
		}), !0)
	}

	function bindTextureUnit(e, t, r) {
		validateTextureUnit(e, r), callAndCheck(e, function() {
			return e.activeTexture(e.TEXTURE0 + r)
		}), callAndCheck(e, function() {
			return e.bindTexture(e.TEXTURE_2D, t)
		})
	}

	function unbindTextureUnit(e, t) {
		validateTextureUnit(e, t), callAndCheck(e, function() {
			return e.activeTexture(e.TEXTURE0 + t)
		}), callAndCheck(e, function() {
			return e.bindTexture(e.TEXTURE_2D, null)
		})
	}

	function getProgramUniformLocationOrThrow(e, t, r) {
		return throwIfNull(e, function() {
			return e.getUniformLocation(t, r)
		}, 'uniform "' + r + '" not present in program.')
	}

	function getProgramUniformLocation(e, t, r) {
		return e.getUniformLocation(t, r)
	}

	function bindTextureToProgramUniformSampler(e, t, r, n, a) {
		callAndCheck(e, function() {
			return bindTextureUnit(e, r, a)
		}), callAndCheck(e, function() {
			return e.uniform1i(n, a)
		})
	}

	function bindCanvasToFramebuffer(e) {
		callAndCheck(e, function() {
			return e.bindFramebuffer(e.FRAMEBUFFER, null)
		}), callAndCheck(e, function() {
			return e.viewport(0, 0, e.canvas.width, e.canvas.height)
		}), callAndCheck(e, function() {
			return e.scissor(0, 0, e.canvas.width, e.canvas.height)
		})
	}

	function bindColorTextureToFramebuffer(e, t, r) {
		callAndCheck(e, function() {
			return e.bindFramebuffer(e.FRAMEBUFFER, r)
		}), callAndCheck(e, function() {
			return e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0)
		})
	}

	function unbindColorTextureFromFramebuffer(e, t) {
		callAndCheck(e, function() {
			return e.bindFramebuffer(e.FRAMEBUFFER, t)
		}), callAndCheck(e, function() {
			return e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, null, 0)
		})
	}

	function validateFramebuffer(e) {
		var t = e.checkFramebufferStatus(e.FRAMEBUFFER);
		if (t !== e.FRAMEBUFFER_COMPLETE) throw new Error("Error binding framebuffer: " + getFramebufferErrorMessage(e, t))
	}

	function getFramebufferErrorMessage(e, t) {
		switch (t) {
			case e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
				return "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
			case e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
				return "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
			case e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
				return "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
			case e.FRAMEBUFFER_UNSUPPORTED:
				return "FRAMEBUFFER_UNSUPPORTED";
			default:
				return "unknown error " + t
		}
	}

	function throwIfNull(e, t, r) {
		var n = callAndCheck(e, function() {
			return t()
		});
		if (null == n) throw new Error(r);
		return n
	}

	function validateTextureUnit(e, t) {
		var r = e.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1,
			n = t + e.TEXTURE0;
		if (n < e.TEXTURE0 || n > r) {
			var a = "[gl.TEXTURE0, gl.TEXTURE" + r + "]";
			throw new Error("textureUnit must be in " + a + ".")
		}
	}

	function getTextureShapeFromLogicalShape(e, t) {
		2 !== t.length && (t = squeezeShape(t).newShape);
		var r = queryMaxTextureSize(e),
			n = sizeFromShape(t);
		return t.length <= 1 && n <= r ? [n, 1] : 2 === t.length && t[0] <= r && t[1] <= r ? t : 3 === t.length && t[0] <= r && t[1] * t[2] <= r ? [t[0], t[1] * t[2]] : 4 === t.length && t[0] <= r && t[1] * t[2] * t[3] <= r ? [t[0], t[1] * t[2] * t[3]] : sizeToSquarishShape(n)
	}

	function getWebGLContextAttributes() {
		return {
			alpha: !1,
			antialias: !1,
			premultipliedAlpha: !1,
			preserveDrawingBuffer: !1,
			depth: !1,
			stencil: !1,
			failIfMajorPerformanceCaveat: !0
		}
	}

	function createWebGLContext(e) {
		var t, r = getWebGLContextAttributes();
		return t = null != e ? createWebGLRenderingContextFromCanvas(e, r) : createWebGLRenderingContext(r), callAndCheck(t, function() {
			return t.disable(t.DEPTH_TEST)
		}), callAndCheck(t, function() {
			return t.disable(t.STENCIL_TEST)
		}), callAndCheck(t, function() {
			return t.disable(t.BLEND)
		}), callAndCheck(t, function() {
			return t.disable(t.DITHER)
		}), callAndCheck(t, function() {
			return t.disable(t.POLYGON_OFFSET_FILL)
		}), callAndCheck(t, function() {
			return t.disable(t.SAMPLE_COVERAGE)
		}), callAndCheck(t, function() {
			return t.enable(t.SCISSOR_TEST)
		}), callAndCheck(t, function() {
			return t.enable(t.CULL_FACE)
		}), callAndCheck(t, function() {
			return t.cullFace(t.BACK)
		}), t
	}

	function createVertexShader$1(e) {
		return createVertexShader(e, "\n    precision highp float;\n    attribute vec3 clipSpacePos;\n    attribute vec2 uv;\n    varying vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }")
	}

	function createVertexBuffer(e) {
		return createStaticVertexBuffer(e, new Float32Array([-1, 1, 0, 0, 1, -1, -1, 0, 0, 0, 1, 1, 0, 1, 1, 1, -1, 0, 1, 0]))
	}

	function createIndexBuffer(e) {
		return createStaticIndexBuffer(e, new Uint16Array([0, 1, 2, 2, 1, 3]))
	}

	function getTextureInternalFormat(e, t) {
		return ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED") && 2 === ENV.get("WEBGL_VERSION") ? 4 === t ? e.RGBA32F : e.R32F : e.RGBA
	}

	function getTextureFormat(e, t) {
		return ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED") && 2 === ENV.get("WEBGL_VERSION") ? 4 === t ? e.RGBA : e.RED : e.RGBA
	}

	function getTextureType(e) {
		return ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED") ? e.FLOAT : e.UNSIGNED_BYTE
	}

	function createAndConfigureTexture(e, t, r, n) {
		validateTextureSize(e, t, r);
		var a = createTexture(e),
			o = e.TEXTURE_2D,
			i = getTextureInternalFormat(e, n),
			s = getTextureFormat(e, n);
		return callAndCheck(e, function() {
			return e.bindTexture(o, a)
		}), callAndCheck(e, function() {
			return e.texParameteri(o, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE)
		}), callAndCheck(e, function() {
			return e.texParameteri(o, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE)
		}), callAndCheck(e, function() {
			return e.texParameteri(o, e.TEXTURE_MIN_FILTER, e.NEAREST)
		}), callAndCheck(e, function() {
			return e.texParameteri(o, e.TEXTURE_MAG_FILTER, e.NEAREST)
		}), callAndCheck(e, function() {
			return e.texImage2D(o, 0, i, t, r, 0, s, getTextureType(e), null)
		}), callAndCheck(e, function() {
			return e.bindTexture(e.TEXTURE_2D, null)
		}), a
	}

	function createMatrixTexture(e, t, r) {
		var n = getUnpackedMatrixTextureShapeWidthHeight(t, r);
		return createAndConfigureTexture(e, n[0], n[1], 1)
	}

	function createColorMatrixTexture(e, t, r) {
		var n = getColorMatrixTextureShapeWidthHeight(t, r);
		return createAndConfigureTexture(e, n[0], n[1], 4)
	}

	function createPackedMatrixTexture(e, t, r) {
		var n = getPackedMatrixTextureShapeWidthHeight(t, r);
		return createAndConfigureTexture(e, n[0], n[1], 4)
	}

	function bindVertexProgramAttributeStreams(e, t, r) {
		return callAndCheck(e, function() {
			return e.bindBuffer(e.ARRAY_BUFFER, r)
		}), bindVertexBufferToProgramAttribute(e, t, "clipSpacePos", r, 3, 20, 0) && bindVertexBufferToProgramAttribute(e, t, "uv", r, 2, 20, 12)
	}

	function uploadPixelDataToTexture(e, t, r) {
		callAndCheck(e, function() {
			return e.bindTexture(e.TEXTURE_2D, t)
		}), callAndCheck(e, function() {
			return e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, r)
		}), callAndCheck(e, function() {
			return e.bindTexture(e.TEXTURE_2D, null)
		})
	}

	function uploadDataToTexture(e, t, r, n, a, o) {
		var i = getTextureFormat(e, o);
		validateTextureSize(e, r, n), callAndCheck(e, function() {
			return e.bindTexture(e.TEXTURE_2D, t)
		}), callAndCheck(e, function() {
			return e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r, n, i, getTextureType(e), a)
		}), callAndCheck(e, function() {
			return e.bindTexture(e.TEXTURE_2D, null)
		})
	}

	function uploadMatrixToTexture(e, t, r, n, a, o) {
		var i, s = getUnpackedMatrixTextureShapeWidthHeight(r, n),
			u = s[0],
			l = s[1];
		if (ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED")) {
			var c = 1 === o ? getChannelsPerTexture() : o;
			1 === c ? i = a : encodeMatrixToUnpackedArray(a, i = new Float32Array(getUnpackedArraySizeFromMatrixSize(a.length, c)), c)
		} else i = encodeFloatArray(a);
		uploadDataToTexture(e, t, u, l, i, o)
	}

	function uploadMatrixToPackedTexture(e, t, r, n, a) {
		var o = getPackedMatrixTextureShapeWidthHeight(r, n),
			i = o[0],
			s = o[1],
			u = new Float32Array(getPackedRGBAArraySizeFromMatrixShape(r, n));
		encodeMatrixToPackedRGBA(a, r, n, u);
		uploadDataToTexture(e, t, i, s, u, 4)
	}

	function getDownloadTargetArrayBuffer(e, t, r) {
		var n = ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED"),
			a = e * t * r;
		return n ? (null == floatDownloadBuffer || floatDownloadBuffer.length < a) && (floatDownloadBuffer = new Float32Array(a)) : (null == byteDownloadBuffer || byteDownloadBuffer.length < a) && (byteDownloadBuffer = new Uint8Array(a)), (n ? floatDownloadBuffer : byteDownloadBuffer).subarray(0, a)
	}

	function decodeDownloadTargetArrayBuffer(e, t, r, n) {
		if (ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED")) {
			var a = new Float32Array(t * r);
			return decodeMatrixFromUnpackedArray(e, a, n), a
		}
		return decodeToFloatArray(e)
	}

	function downloadMatrixFromOutputTextureAsync(e, t, r, n) {
		return __awaiter$3(this, void 0, void 0, function() {
			var a, o, i, s, u;
			return __generator$3(this, function(l) {
				switch (l.label) {
					case 0:
						return a = e, o = 4, i = getDownloadTargetArrayBuffer(r, n, o), s = i instanceof Float32Array ? 4 * i.length : i, u = e.createBuffer(), callAndCheck(e, function() {
							return e.bindBuffer(a.PIXEL_PACK_BUFFER, u)
						}), callAndCheck(e, function() {
							return e.bufferData(a.PIXEL_PACK_BUFFER, s, e.STATIC_DRAW)
						}), callAndCheck(e, function() {
							return a.readPixels(0, 0, n, r, e.RGBA, getTextureType(e), 0)
						}), [4, t.getBufferSubDataAsync(a.PIXEL_PACK_BUFFER, 0, i)];
					case 1:
						return l.sent(), [2, decodeDownloadTargetArrayBuffer(i, r, n, o)]
				}
			})
		})
	}

	function downloadMatrixFromOutputTexture(e, t, r) {
		var n = getUnpackedMatrixTextureShapeWidthHeight(t, r),
			a = n[0],
			o = n[1],
			i = getDownloadTargetArrayBuffer(t, r, 4);
		return callAndCheck(e, function() {
			return e.readPixels(0, 0, a, o, e.RGBA, getTextureType(e), i)
		}), decodeDownloadTargetArrayBuffer(i, t, r, 4)
	}

	function downloadMatrixFromRGBAColorTexture(e, t, r, n) {
		var a = t * r * 4,
			o = new Uint8Array(a);
		callAndCheck(e, function() {
			return e.readPixels(0, 0, r, t, e.RGBA, e.UNSIGNED_BYTE, o)
		});
		for (var i = new Float32Array(a), s = 0; s < o.length; s++) i[s] = o[s];
		var u = new Float32Array(t * r * n);
		return decodeMatrixFromUnpackedColorRGBAArray(i, u, n), u
	}

	function downloadMatrixFromPackedOutputTexture(e, t, r) {
		var n = getPackedMatrixTextureShapeWidthHeight(t, r),
			a = n[0],
			o = n[1],
			i = new Float32Array(getPackedRGBAArraySizeFromMatrixShape(t, r));
		callAndCheck(e, function() {
			return e.readPixels(0, 0, a, o, e.RGBA, getTextureType(e), i)
		});
		var s = new Float32Array(t * r);
		return decodeMatrixFromPackedRGBA(i, t, r, s)
	}

	function binSearchLastTrue(e) {
		for (var t = 0, r = e.length - 1, n = -1; t <= r;) {
			var a = t + r >> 1;
			e[a]() ? (n = a, t = a + 1) : r = a - 1
		}
		return n
	}

	function shouldUploadNaNUniform() {
		return !ENV.get("WEBGL_FLOAT_TEXTURE_ENABLED")
	}

	function compileProgram(e, t, r, n) {
		for (var a = t.userCode, o = r.map(function(e, r) {
				var n = {
					logicalShape: e.tensor.shape,
					texShape: e.texData.texShape
				};
				return {
					name: t.variableNames[r],
					shapeInfo: n
				}
			}), i = o.map(function(e) {
				return e.shapeInfo
			}), s = {
				logicalShape: n.tensor.shape,
				texShape: n.texData.texShape
			}, u = makeShader(o, s, a, !0 === t.supportsBroadcasting), l = e.createProgram(u), c = {}, p = 0; p < t.variableNames.length; p++) {
			var d = t.variableNames[p];
			c[d] = e.getUniformLocation(l, d)
		}
		if (shouldUploadNaNUniform()) {
			c[NAN_UNIFORM_NAME] = e.getUniformLocation(l, NAN_UNIFORM_NAME, !1)
		}
		return {
			program: t,
			source: u,
			webGLProgram: l,
			uniformLocations: c,
			gpgpu: e,
			inShapeInfos: i,
			outShapeInfo: s
		}
	}

	function validateBinaryAndProgram(e, t) {
		if (e.length !== t.length) throw Error("Binary was compiled with " + e.length + " inputs, but was executed with " + t.length + " inputs");
		e.forEach(function(e, r) {
			var n = e.logicalShape,
				a = e.texShape,
				o = t[r].tensor.shape,
				i = t[r].texData.texShape;
			if (!arraysEqual(n, o)) throw Error("Binary was compiled with different shapes than the current args. Shapes " + n + " and " + o + " must match");
			if (!arraysEqual(a, i)) throw Error("Binary was compiled with different texture shapes than the current args. Shape " + a + " and " + i + " must match")
		})
	}

	function runProgram(e, t, r, n) {
		validateBinaryAndProgram(e.inShapeInfos, t), validateBinaryAndProgram([e.outShapeInfo], [r]);
		var a = r.texData.texture,
			o = r.texData.texShape,
			i = e.gpgpu;
		i.setOutputMatrixTexture(a, o[0], o[1]), i.setProgram(e.webGLProgram), t.forEach(function(t, r) {
			var n = t.texData.texture,
				a = e.program.variableNames[r],
				o = e.uniformLocations[a];
			i.setInputMatrixTexture(n, o, r)
		}), shouldUploadNaNUniform() && i.gl.uniform1f(e.uniformLocations[NAN_UNIFORM_NAME], NaN), null != n && n(i, e.webGLProgram), i.executeProgram()
	}

	function makeShaderKey(e, t, r) {
		var n = "";
		t.concat(r).forEach(function(e) {
			n += e.tensor.shape + "_" + e.texData.texShape
		});
		var a = e.userCode,
			o = (!0 === e.supportsBroadcasting).toString(),
			i = e.constructor.name;
		return i += "_" + o + "_" + n + "_" + a
	}

	function getCoords$1(e) {
		if (1 === e) return "sourceLoc";
		if (2 === e) return "sourceLoc.x, sourceLoc.y";
		if (3 === e) return "sourceLoc.x, sourceLoc.y, sourceLoc.z";
		if (4 === e) return "sourceLoc.x, sourceLoc.y, sourceLoc.z, sourceLoc.w";
		throw Error("Slicing for rank " + e + " is not yet supported")
	}

	function getKeyFromTextureShape(e, t) {
		return e[0] + "_" + e[1] + "_" + t
	}

	function getSourceCoords$1(e) {
		var t = e.length;
		if (t > 5) throw Error("Tile for rank " + t + " is not yet supported");
		if (1 === t) return "imod(resRC, " + e[0] + ")";
		for (var r = ["resRC.x", "resRC.y", "resRC.z", "resRC.w", "resRC.u"], n = [], a = 0; a < e.length; a++) n.push("imod(" + r[a] + ", " + e[a] + ")");
		return n.join()
	}

	function getSwitchedCoords(e) {
		var t = e.length;
		if (t > 5) throw Error("Transpose for rank " + t + " is not yet supported");
		for (var r = ["resRC.x", "resRC.y", "resRC.z", "resRC.w", "resRC.u"], n = new Array(t), a = 0; a < e.length; a++) n[e[a]] = r[a];
		return n.join()
	}

	function STEP(e) {
		return void 0 === e && (e = 0), CHECK_NAN_SNIPPET$1 + "\n    return x > 0.0 ? 1.0 : float(" + e + ");\n  "
	}

	function float32ToTypedArray(e, t) {
		if ("float32" === t) return e;
		if ("int32" === t || "bool" === t) {
			for (var r = "int32" === t ? new Int32Array(e.length) : new Uint8Array(e.length), n = 0; n < r.length; ++n) r[n] = Math.round(e[n]);
			return r
		}
		throw new Error("Unknown dtype " + t)
	}

	function typedArrayToFloat32(e, t) {
		return e instanceof Float32Array ? e : new Float32Array(e)
	}

	function encodeWeights(e) {
		return __awaiter$7(this, void 0, void 0, function() {
			var t, r, n, a, o;
			return __generator$7(this, function(i) {
				switch (i.label) {
					case 0:
						t = [], r = [];
						for (n in e) {
							if ("float32" !== (a = e[n]).dtype && "int32" !== a.dtype && "bool" !== a.dtype) throw new Error("Unsupported dtype in weight '" + n + "': " + a.dtype);
							t.push({
								name: n,
								shape: a.shape,
								dtype: a.dtype
							}), r.push(a.data())
						}
						return [4, Promise.all(r)];
					case 1:
						return o = i.sent(), [2, {
							data: concatenateTypedArrays(o),
							specs: t
						}]
				}
			})
		})
	}

	function decodeWeights(e, t) {
		for (var r = {}, n = 0, a = 0, o = t; a < o.length; a++) {
			var i = o[a],
				s = i.name,
				u = i.dtype,
				l = i.shape;
			if (null != i.quantization) throw new Error("decodeWeights does not support quantization yet, but encountered weight '" + s + " with quantization.'");
			var c = sizeFromShape(l),
				p = void 0;
			if ("float32" === u) p = ArrayOps.tensor(new Float32Array(e, n, c), l, "float32");
			else if ("int32" === u) p = ArrayOps.tensor(new Int32Array(e, n, c), l, "int32");
			else {
				if ("bool" !== u) throw new Error("Unsupported dtype in weight '" + s + "': " + u);
				p = ArrayOps.tensor(new Uint8Array(e, n, c), l, "bool")
			}
			r[s] = p, n += c * DTYPE_VALUE_SIZE_MAP[u]
		}
		return r
	}

	function concatenateTypedArrays(e) {
		if (null === e) throw new Error("Invalid input value: " + JSON.stringify(e));
		var t = 0;
		e.forEach(function(e) {
			if (e instanceof Float32Array || e instanceof Int32Array) t += 4 * e.length;
			else {
				if (!(e instanceof Uint8Array)) throw new Error("Unsupported TypedArray subtype: " + e.constructor.name);
				t += e.length
			}
		});
		var r = new Uint8Array(t),
			n = 0;
		return e.forEach(function(e) {
			r.set(new Uint8Array(e.buffer), n), e instanceof Float32Array || e instanceof Int32Array ? n += 4 * e.length : n += e.length
		}), r.buffer
	}

	function stringByteLength(e) {
		return new Blob([e]).size
	}

	function arrayBufferToBase64String(e) {
		return btoa(String.fromCharCode.apply(null, new Uint8Array(e)))
	}

	function base64StringToArrayBuffer(e) {
		for (var t = atob(e), r = new Uint8Array(t.length), n = 0; n < t.length; ++n) r.set([t.charCodeAt(n)], n);
		return r.buffer
	}

	function concatenateArrayBuffers(e) {
		var t = 0;
		e.forEach(function(e) {
			t += e.byteLength
		});
		var r = new Uint8Array(t),
			n = 0;
		return e.forEach(function(e) {
			r.set(new Uint8Array(e), n), n += e.byteLength
		}), r.buffer
	}

	function basename(e) {
		for (e = e.trim(); e.endsWith("/");) e = e.slice(0, e.length - 1);
		var t = e.split("/");
		return t[t.length - 1]
	}

	function getModelArtifactsInfoForJSON(e) {
		if (e.modelTopology instanceof ArrayBuffer) throw new Error("Expected JSON model topology, received ArrayBuffer.");
		return {
			dateSaved: new Date,
			modelTopologyType: "JSON",
			modelTopologyBytes: null == e.modelTopology ? 0 : stringByteLength(JSON.stringify(e.modelTopology)),
			weightSpecsBytes: null == e.weightSpecs ? 0 : stringByteLength(JSON.stringify(e.weightSpecs)),
			weightDataBytes: null == e.weightData ? 0 : e.weightData.byteLength
		}
	}

	function parseURL(e) {
		if (-1 === e.indexOf(URL_SCHEME_SUFFIX)) throw new Error("The url string provided does not contain a scheme. Supported schemes are: " + ModelStoreManagerRegistry.getSchemes().join(","));
		return {
			scheme: e.split(URL_SCHEME_SUFFIX)[0],
			path: e.split(URL_SCHEME_SUFFIX)[1]
		}
	}

	function cloneModelInternal(e, t, r) {
		return void 0 === r && (r = !1), __awaiter$8(this, void 0, void 0, function() {
			var n, a, o, i, s, u, l, c, p;
			return __generator$8(this, function(d) {
				switch (d.label) {
					case 0:
						return assert(e !== t, "Old path and new path are the same: '" + e + "'"), n = IORouterRegistry.getLoadHandlers(e), assert(n.length > 0, "Copying failed because no load handler is found for source URL " + e + "."), assert(n.length < 2, "Copying failed because more than one (" + n.length + ") load handlers for source URL " + e + "."), a = n[0], o = IORouterRegistry.getSaveHandlers(t), assert(o.length > 0, "Copying failed because no save handler is found for destination URL " + t + "."), assert(o.length < 2, "Copying failed because more than one (" + n.length + ") save handlers for destination URL " + t + "."), i = o[0], s = parseURL(e).scheme, u = parseURL(e).path, l = s === parseURL(e).scheme, [4, a.load()];
					case 1:
						return c = d.sent(), r && l ? [4, ModelStoreManagerRegistry.getManager(s).removeModel(u)] : [3, 3];
					case 2:
						d.sent(), d.label = 3;
					case 3:
						return [4, i.save(c)];
					case 4:
						return p = d.sent(), !r || l ? [3, 6] : [4, ModelStoreManagerRegistry.getManager(s).removeModel(u)];
					case 5:
						d.sent(), d.label = 6;
					case 6:
						return [2, p.modelArtifactsInfo]
				}
			})
		})
	}

	function getIndexedDBFactory() {
		if (!ENV.get("IS_BROWSER")) throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");
		var e = window,
			t = e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB || e.shimIndexedDB;
		if (null == t) throw new Error("The current browser does not appear to support IndexedDB.");
		return t
	}

	function setUpDatabase(e) {
		var t = e.result;
		t.createObjectStore(MODEL_STORE_NAME, {
			keyPath: "modelPath"
		}), t.createObjectStore(INFO_STORE_NAME, {
			keyPath: "modelPath"
		})
	}

	function browserIndexedDB(e) {
		return new BrowserIndexedDB(e)
	}

	function maybeStripScheme(e) {
		return e.startsWith(BrowserIndexedDB.URL_SCHEME) ? e.slice(BrowserIndexedDB.URL_SCHEME.length) : e
	}

	function getModelKeys(e) {
		return {
			info: [PATH_PREFIX, e, INFO_SUFFIX].join(PATH_SEPARATOR),
			topology: [PATH_PREFIX, e, MODEL_TOPOLOGY_SUFFIX].join(PATH_SEPARATOR),
			weightSpecs: [PATH_PREFIX, e, WEIGHT_SPECS_SUFFIX].join(PATH_SEPARATOR),
			weightData: [PATH_PREFIX, e, WEIGHT_DATA_SUFFIX].join(PATH_SEPARATOR)
		}
	}

	function getModelPathFromKey(e) {
		var t = e.split(PATH_SEPARATOR);
		if (t.length < 3) throw new Error("Invalid key format: " + e);
		return t.slice(1, t.length - 1).join(PATH_SEPARATOR)
	}

	function maybeStripScheme$1(e) {
		return e.startsWith(BrowserLocalStorage.URL_SCHEME) ? e.slice(BrowserLocalStorage.URL_SCHEME.length) : e
	}

	function browserLocalStorage(e) {
		return new BrowserLocalStorage(e)
	}

	function browserDownloads(e) {
		return void 0 === e && (e = "model"), new BrowserDownloads(e)
	}

	function browserFiles(e) {
		return new BrowserFiles(e)
	}

	function loadWeightsAsArrayBuffer(e, t) {
		return __awaiter$12(this, void 0, void 0, function() {
			var r, n, a;
			return __generator$12(this, function(o) {
				switch (o.label) {
					case 0:
						return r = e.map(function(e) {
							return fetch(e, t)
						}), [4, Promise.all(r)];
					case 1:
						return n = o.sent(), [4, Promise.all(n.map(function(e) {
							return e.arrayBuffer()
						}))];
					case 2:
						return a = o.sent(), [2, a]
				}
			})
		})
	}

	function loadWeights(e, t, r, n) {
		return void 0 === t && (t = ""), __awaiter$12(this, void 0, void 0, function() {
			var a, o, i, s, u, l, c, p, d, h;
			return __generator$12(this, function(f) {
				switch (f.label) {
					case 0:
						if (a = e.map(function() {
								return !1
							}), o = {}, i = null != r ? r.map(function() {
								return !1
							}) : [], s = [], e.forEach(function(e, t) {
								var n = 0;
								e.weights.forEach(function(e) {
									var u = "quantization" in e ? e.quantization.dtype : e.dtype,
										l = DTYPE_VALUE_SIZE_MAP[u] * sizeFromShape(e.shape),
										c = function() {
											a[t] = !0, null == o[t] && (o[t] = []), o[t].push({
												manifestEntry: e,
												groupOffset: n,
												sizeBytes: l
											})
										};
									null != r ? r.forEach(function(t, r) {
										t === e.name && (c(), i[r] = !0)
									}) : c(), s.push(e.name), n += l
								})
							}), !i.every(function(e) {
								return e
							})) throw u = r.filter(function(e, t) {
							return !i[t]
						}), new Error("Could not find weights in manifest with names: " + u.join(", ") + ". \nManifest JSON has weights with names: " + s.join(", ") + ".");
						return l = a.reduce(function(e, t, r) {
							return t && e.push(r), e
						}, []), c = [], l.forEach(function(r) {
							e[r].paths.forEach(function(e) {
								var r = t + (t.endsWith("/") ? "" : "/") + e;
								c.push(r)
							})
						}), [4, loadWeightsAsArrayBuffer(c, n)];
					case 1:
						return p = f.sent(), d = {}, h = 0, l.forEach(function(t) {
							for (var r = e[t].paths.length, n = 0, a = 0; a < r; a++) n += p[h + a].byteLength;
							for (var i = new ArrayBuffer(n), s = new Uint8Array(i), u = 0, l = 0; l < r; l++) {
								var c = new Uint8Array(p[h + l]);
								s.set(c, u), u += c.byteLength
							}
							o[t].forEach(function(e) {
								var t, r = i.slice(e.groupOffset, e.groupOffset + e.sizeBytes),
									n = e.manifestEntry.dtype;
								if ("quantization" in e.manifestEntry) {
									var a = e.manifestEntry.quantization;
									if ("uint8" !== a.dtype && "uint16" !== a.dtype) throw new Error("Weight " + e.manifestEntry.name + " has unknown quantization dtype " + a.dtype + ".");
									var o = "uint8" === a.dtype ? new Uint8Array(r) : new Uint16Array(r);
									if ("float32" === n) t = Float32Array.from(o, function(e) {
										return e * a.scale + a.min
									});
									else {
										if ("int32" !== n) throw new Error("Weight " + e.manifestEntry.name + " has a dtype not supported by quantization: " + n);
										t = Int32Array.from(o, function(e) {
											return Math.round(e * a.scale + a.min)
										})
									}
								} else if ("float32" === n) t = new Float32Array(r);
								else {
									if ("int32" !== n) throw new Error("Weight " + e.manifestEntry.name + " has unknown dtype " + n + ".");
									t = new Int32Array(r)
								}
								var s = e.manifestEntry.name;
								if (null != d[s]) throw new Error("Duplicate weight with name " + s + ". Please make sure weights names are unique in the manifest JSON.");
								d[s] = tensor(t, e.manifestEntry.shape, e.manifestEntry.dtype)
							}), h += r
						}), [2, d]
				}
			})
		})
	}

	function browserHTTPRequest(e, t) {
		return new BrowserHTTPRequest(e, t)
	}

	function expectArraysClose(e, t, r) {
		if (void 0 === r && (r = TEST_EPSILON), e instanceof Tensor || t instanceof Tensor) {
			if (e instanceof Tensor && t instanceof Tensor) {
				if (e.dtype !== t.dtype) throw new Error("Arrays are of different type actual: " + e.dtype + " vs expected: " + t.dtype + ".");
				if (!arraysEqual(e.shape, t.shape)) throw new Error("Arrays are of different shape actual: " + e.shape + " vs expected: " + t.shape + ".")
			}
		} else {
			var n = e.constructor.name,
				a = t.constructor.name;
			if (n !== a) throw new Error("Arrays are of different type actual: " + n + " vs expected: " + a)
		}
		var o, i;
		if (o = e instanceof Tensor ? e.dataSync() : e, i = t instanceof Tensor ? t.dataSync() : t, o.length !== i.length) throw new Error("Arrays have different lengths actual: " + o.length + " vs expected: " + i.length + ".\nActual:   " + o + ".\nExpected: " + i + ".");
		for (var s = 0; s < i.length; ++s) {
			var u = o[s],
				l = i[s];
			if (!areClose(u, Number(l), r)) throw new Error("Arrays differ: actual[" + s + "] = " + u + ", expected[" + s + "] = " + l + ".\nActual:   " + o + ".\nExpected: " + i + ".")
		}
	}

	function expectPromiseToFail(e, t) {
		e().then(function() {
			return t.fail()
		}, function() {
			return t()
		})
	}

	function expectArraysEqual(e, t) {
		return expectArraysClose(e, t, 0)
	}

	function expectNumbersClose(e, t, r) {
		if (void 0 === r && (r = TEST_EPSILON), !areClose(e, t, r)) throw new Error("Numbers differ: actual === " + e + ", expected === " + t)
	}

	function areClose(e, t, r) {
		return !(!isNaN(e) || !isNaN(t)) || !(isNaN(e) || isNaN(t) || Math.abs(e - t) > r)
	}

	function expectValuesInRange(e, t, r) {
		var n;
		n = e instanceof Tensor ? e.dataSync() : e;
		for (var a = 0; a < n.length; a++)
			if (n[a] < t || n[a] > r) throw new Error("Value out of range:" + n[a] + " low: " + t + ", high: " + r)
	}

	function pyListRepeat(e, t) {
		if (Array.isArray(e)) {
			for (var r = [], n = 0; n < t; n++) r = r.concat(e);
			return r
		}
		return (r = new Array(t)).fill(e), r
	}

	function assert$1(e, t) {
		if (!e) throw new AssertionError(t)
	}

	function count(e, t) {
		for (var r = 0, n = 0, a = e; n < a.length; n++) a[n] === t && r++;
		return r
	}

	function singletonOrArray(e) {
		return 1 === e.length ? e[0] : e
	}

	function toList(e) {
		return Array.isArray(e) ? e : [e]
	}

	function isArrayOfShapes(e) {
		return Array.isArray(e) && Array.isArray(e[0])
	}

	function normalizeShapeList(e) {
		return 0 === e.length ? [] : Array.isArray(e[0]) ? e : [e]
	}

	function toSnakeCase(e) {
		var t = e.replace(/(.)([A-Z][a-z0-9]+)/g, "$1_$2").replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
		return "_" !== t[0] ? t : "private" + t
	}

	function toCamelCase(e) {
		return e.length <= 1 ? e : -1 === e.indexOf("_") ? e : e.replace(/[_]+(\w|$)/g, function(e, t) {
			return t.toUpperCase()
		})
	}

	function serializeKerasObject(e) {
		return null === e || void 0 === e ? null : {
			className: e.getClassName(),
			config: e.getConfig()
		}
	}

	function deserializeKerasObject(e, t, r, n) {
		if (void 0 === t && (t = {}), void 0 === r && (r = {}), void 0 === n && (n = "object"), "string" == typeof e) {
			var a = e,
				o = void 0;
			if (a in r) o = r[a];
			else if (a in _GLOBAL_CUSTOM_OBJECTS) o = _GLOBAL_CUSTOM_OBJECTS[a];
			else if (null == (o = t[a])) throw new ValueError("Unknown " + n + ": " + e);
			return o
		}
		var i = e;
		if (null == i.className || null == i.config) throw new ValueError(n + ": Improper config format: " + JSON.stringify(i) + ".\n'className' and 'config' must set.");
		var s = i.className,
			u = void 0,
			l = void 0;
		if (s in r ? (u = (_ = r.get(s))[0], l = _[1]) : s in _GLOBAL_CUSTOM_OBJECTS ? (u = (S = _GLOBAL_CUSTOM_OBJECTS.className)[0], l = S[1]) : s in t && (u = (N = t[s])[0], l = N[1]), null == u) throw new ValueError("Unknown " + n + ": " + s);
		if (null != l) {
			for (var c = {}, p = 0, d = Object.keys(_GLOBAL_CUSTOM_OBJECTS); p < d.length; p++) c[x = d[p]] = _GLOBAL_CUSTOM_OBJECTS[x];
			for (var h = 0, f = Object.keys(r); h < f.length; h++) c[x = f[h]] = r[x];
			i.config.customObjects = c;
			for (var m = __assign({}, _GLOBAL_CUSTOM_OBJECTS), g = 0, y = Object.keys(r); g < y.length; g++) {
				x = y[g];
				_GLOBAL_CUSTOM_OBJECTS[x] = r[x]
			}
			w = l(u, i.config);
			return _GLOBAL_CUSTOM_OBJECTS = __assign({}, m), w
		}
		for (var m = __assign({}, _GLOBAL_CUSTOM_OBJECTS), v = 0, b = Object.keys(r); v < b.length; v++) {
			var x = b[v];
			_GLOBAL_CUSTOM_OBJECTS[x] = r[x]
		}
		var w = new u(i.config);
		return _GLOBAL_CUSTOM_OBJECTS = __assign({}, m), w;
		var _, S, N
	}

	function getExactlyOneTensor(e) {
		var t;
		if (Array.isArray(e)) {
			if (1 !== e.length) throw new ValueError("Expected Tensor length to be 1; got " + e.length);
			t = e[0]
		} else t = e;
		return t
	}

	function getExactlyOneShape(e) {
		if (Array.isArray(e) && Array.isArray(e[0])) {
			if (1 === e.length) return (e = e)[0];
			throw new ValueError("Expected exactly 1 Shape; got " + e.length)
		}
		return e
	}

	function numberCompare(e, t) {
		return e < t ? -1 : e > t ? 1 : 0
	}

	function reverseNumberCompare(e, t) {
		return -1 * numberCompare(e, t)
	}

	function stringToDType(e) {
		switch (e) {
			case "float32":
				return "float32";
			default:
				throw new ValueError("Invalid dtype: " + e)
		}
	}

	function unique(e) {
		if (null == e) return e;
		for (var t = [], r = 0, n = e; r < n.length; r++) {
			var a = n[r]; - 1 === t.indexOf(a) && t.push(a)
		}
		return t
	}

	function isObjectEmpty(e) {
		if (null == e) throw new ValueError("Invalid value in obj: " + JSON.stringify(e));
		for (var t in e)
			if (e.hasOwnProperty(t)) return !1;
		return !0
	}

	function checkStringTypeUnionValue(e, t, r) {
		if (null != r && e.indexOf(r) < 0) throw new ValueError(r + " is not a valid " + t + ".  Valid values are " + e + " or null/undefined.")
	}

	function checkDataFormat(e) {
		checkStringTypeUnionValue(VALID_DATA_FORMAT_VALUES, "DataFormat", e)
	}

	function checkPaddingMode(e) {
		checkStringTypeUnionValue(VALID_PADDING_MODE_VALUES, "PaddingMode", e)
	}

	function checkPoolMode(e) {
		checkStringTypeUnionValue(VALID_POOL_MODE_VALUES, "PoolMode", e)
	}

	function nameScope(e, t) {
		_nameScopeStack.push(e);
		try {
			var r = t();
			return _nameScopeStack.pop(), r
		} catch (e) {
			throw _nameScopeStack.pop(), e
		}
	}

	function currentNameScopePrefix() {
		return 0 === _nameScopeStack.length ? "" : _nameScopeStack.join(_nameScopeDivider) + _nameScopeDivider
	}

	function getScopedTensorName(e) {
		if (!isValidTensorName(e)) throw new Error("Not a valid tensor name: '" + e + "'");
		return currentNameScopePrefix() + e
	}

	function getUniqueTensorName(e) {
		if (!isValidTensorName(e)) throw new Error("Not a valid tensor name: '" + e + "'");
		nameMap.has(e) || nameMap.set(e, 0);
		var t = nameMap.get(e);
		if (nameMap.set(e, nameMap.get(e) + 1), t > 0) {
			var r = e + "_" + t;
			return nameMap.set(r, 1), r
		}
		return e
	}

	function isValidTensorName(e) {
		return !!e.match(tensorNameRegex)
	}

	function isInteger(e) {
		return e === parseInt(e.toString(), 10)
	}

	function arrayProd(e, t, r) {
		null == t && (t = 0), null == r && (r = e.length);
		for (var n = 1, a = t; a < r; ++a) n *= e[a];
		return n
	}

	function toArray1D(e) {
		return e = Array.isArray(e) ? new Float32Array(e) : e, tensor1d(e)
	}

	function min$1(e) {
		return min(toArray1D(e)).dataSync()[0]
	}

	function max$1(e) {
		return max(toArray1D(e)).dataSync()[0]
	}

	function range$1(e, t) {
		if (t < e) throw new ValueError("end (" + t + ") < begin (" + e + ") is forbidden.");
		for (var r = [], n = e; n < t; ++n) r.push(n);
		return r
	}

	function getNextUniqueTensorId() {
		return _nextUniqueTensorId++
	}

	function checkShapesMatch(e, t) {
		if (e.shape.toString() !== t.shape.toString()) throw new Error("Shape mismatch: " + JSON.stringify(e.shape) + " vs. " + JSON.stringify(t.shape))
	}

	function batchGetValue(e) {
		return e.map(function(e) {
			return e.read()
		})
	}

	function batchSetValue(e) {
		e.map(function(e) {
			e[0].write(e[1])
		})
	}

	function epsilon() {
		return _epsilon
	}

	function imageDataFormat() {
		return "channelsLast"
	}

	function getScalar(e, t) {
		return void 0 === t && (t = DEFAULT_DTYPE), null == scalarCache[t][e] && (scalarCache[t][e] = scalar(e, t), keep(scalarCache[t][e])), scalarCache[t][e]
	}

	function shape(e) {
		return e.shape
	}

	function intShape(e) {
		return e.shape
	}

	function dtype(e) {
		return e instanceof Tensor ? DEFAULT_DTYPE : e.dtype
	}

	function cast$1(e, t) {
		return e.asType(t)
	}

	function expandDims$1(e, t) {
		void 0 === t && (t = -1);
		var r = shape(e).slice();
		return t < 0 && (t = r.length + t + 1), r.splice(t, 0, 1), e.reshape(r)
	}

	function repeat(e, t) {
		return tidy(function() {
			if (2 !== e.shape.length) throw new ValueError("repeat() expects a rank-2 tensor, but received a rank-" + e.shape.length + " tensor.");
			return tile$1(expandDims$1(e, 1), [1, t, 1])
		})
	}

	function flatten$1(e) {
		var t = [arrayProd(e.shape)];
		return e.reshape(t)
	}

	function batchFlatten(e) {
		if (e.rank <= 1) throw new ValueError("batchFlatten requires a minimum rank of 2. Got rank: " + e.rank + ".");
		var t = [e.shape[0], arrayProd(e.shape, 1)];
		return e.reshape(t)
	}

	function sliceAlongFirstAxis(e, t, r) {
		return tidy(function() {
			switch (e.rank) {
				case 1:
					return slice1d(e, t, r);
				case 2:
					return slice2d(e, [t, 0], [r, e.shape[1]]);
				case 3:
					return slice3d(e, [t, 0, 0], [r, e.shape[1], e.shape[2]]);
				case 4:
					return slice4d(e, [t, 0, 0, 0], [r, e.shape[1], e.shape[2], e.shape[3]]);
				default:
					throw new ValueError("sliceAlongFirstAxis() received an unsupported tensor rank: " + e.rank)
			}
		})
	}

	function sliceAlongLastAxis(e, t, r) {
		return tidy(function() {
			switch (e.rank) {
				case 1:
					return slice1d(e, t, r);
				case 2:
					return slice2d(e, [0, t], [e.shape[0], r]);
				case 3:
					return slice3d(e, [0, 0, t], [e.shape[0], e.shape[1], r]);
				case 4:
					return slice4d(e, [0, 0, 0, t], [e.shape[0], e.shape[1], e.shape[2], r]);
				default:
					throw new ValueError("sliceAlongLastAxis() received an unsupported tensor rank: " + e.rank)
			}
		})
	}

	function sliceAlongAxis(e, t, r, n) {
		return tidy(function() {
			switch (e.rank) {
				case 1:
					return slice1d(e, t, r);
				case 2:
					switch (n) {
						case 1:
							return sliceAlongFirstAxis(e, t, r);
						case 2:
							return sliceAlongLastAxis(e, t, r);
						default:
							throw new ValueError("The axis is not within the rank of the tensor " + n)
					}
					case 3:
						switch (n) {
							case 1:
								return sliceAlongFirstAxis(e, t, r);
							case 2:
								return slice3d(e, [0, t, 0], [e.shape[0], r, e.shape[2]]);
							case 3:
								return sliceAlongLastAxis(e, t, r);
							default:
								throw new ValueError("The axis is not within the rank of the tensor " + n)
						}
						case 4:
							switch (n) {
								case 1:
									return sliceAlongFirstAxis(e, t, r);
								case 2:
									return slice4d(e, [0, t, 0, 0], [e.shape[0], r, e.shape[2], e.shape[3]]);
								case 3:
									return slice4d(e, [0, 0, t, 0], [e.shape[0], e.shape[1], r, e.shape[3]]);
								case 4:
									return sliceAlongLastAxis(e, t, r);
								default:
									throw new ValueError("The axis is not within the rank of the tensor " + n)
							}
							default:
								throw new ValueError("sliceAlongLastAxis() received an unsupported tensor rank: " + e.rank)
			}
		})
	}

	function concatenate(e, t) {
		void 0 === t && (t = -1);
		var r;
		return t < 0 && (t = 0 !== (r = e[0].rank) ? r : 0), t === e[0].rank && (t = -1), concat(e, t)
	}

	function concatAlongFirstAxis(e, t) {
		switch (e.rank) {
			case 1:
				return concat1d([e, t]);
			case 2:
				return concat2d([e, t], 0);
			case 3:
				return concat3d([e, t], 0);
			case 4:
				return concat4d([e, t], 0);
			default:
				throw new ValueError("concatAlongFirstAxis() received an unsupported tensor rank: " + e.rank)
		}
	}

	function tile$1(e, t) {
		if (Array.isArray(t) || (t = [t]), e.rank !== t.length) throw new ValueError("The length of input n (" + t.length + ") does not match the number of dimensions in input x (" + e.rank + ")");
		return tile(e, t)
	}

	function identity(e) {
		return e.clone()
	}

	function scalarTimesArray(e, t) {
		return mul(e, t)
	}

	function scalarPlusArray(e, t) {
		return add(e, t)
	}

	function randomNormal$1(e, t, r, n, a) {
		return void 0 === t && (t = 0), void 0 === r && (r = 1), randomNormal(e, t, r, n, a)
	}

	function dot$1(e, t) {
		if (2 !== t.rank) throw new NotImplementedError("dot support for y other than rank 2 is not yet implemented: y shape = " + shape);
		if (2 === e.rank) return matMul(e, t);
		if (3 === e.rank) {
			var r = e.shape[0],
				n = e.shape[1],
				a = e.shape[2];
			return e = e.reshape([r * n, a]), matMul(e, t).reshape([r, n, t.shape[1]])
		}
		throw new NotImplementedError("dot support for x of rank " + e.rank + " is not yet implemented: x shape = " + shape)
	}

	function gather$1(e, t, r) {
		return tidy(function() {
			return t = Array.isArray(t) ? tensor1d(t, "int32") : t.toInt(), gather(e, t, r)
		})
	}

	function square$1(e) {
		return mulStrict(e, e)
	}

	function biasAdd(e, t, r) {
		return tidy(function() {
			if (null == r && (r = imageDataFormat()), checkDataFormat(r), 1 !== t.rank && t.rank !== e.rank) throw new ValueError("Unexpected bias dimensions: " + t.rank + "; expected it to be 1 or " + e.rank);
			var n, a = t.shape;
			if (5 === e.rank) "channelsFirst" === r ? n = 1 === a.length ? e.add(t.reshape([1, a[0], 1, 1, 1])) : e.add(t.reshape([1, a[3], a[0], a[1], a[2]])) : "channelsLast" === r && (n = 1 === a.length ? e.add(t.reshape([1, 1, 1, 1, a[0]])) : e.add(t.reshape([1].concat(a))));
			else if (4 === e.rank) "channelsFirst" === r ? n = 1 === a.length ? e.add(t.reshape([1, a[0], 1, 1])) : e.add(t.reshape([1, a[2], a[0], a[1]])) : "channelsLast" === r && (n = 1 === a.length ? e.add(t.reshape([1, 1, 1, a[0]])) : e.add(t.reshape([1].concat(a))));
			else if (3 === e.rank) "channelsFirst" === r ? n = 1 === a.length ? e.add(t.reshape([1, a[0], 1])) : e.add(t.reshape([1, a[1], a[0]])) : "channelsLast" === r && (n = 1 === a.length ? e.add(t.reshape([1, 1, a[0]])) : e.add(t.reshape([1].concat(a))));
			else {
				if (!(e.rank < 3)) throw new ValueError("Unsupported input rank by biasAdd: " + e.rank);
				n = e.add(t)
			}
			return n
		})
	}

	function elu$1(e, t) {
		if (void 0 === t && (t = 1), 1 !== t) throw new NotImplementedError("Support for alpha values other than 1 (" + t + ") is not implemented yet.");
		return elu(e)
	}

	function softsign(e) {
		return tidy(function() {
			return div(e, add(getScalar(1), abs(e)))
		})
	}

	function dropout(e, t, r, n) {
		return tidy(function() {
			if (null != r && !arraysEqual(e.shape, r)) throw new NotImplementedError("Non-default noise shape is not implemented yet: " + JSON.stringify(r));
			if (null != n) throw new NotImplementedError("seed is not implemented for dropout yet.");
			var a = step(add(neg(t), randomUniform(e.shape, 0, 1, "float32")));
			return a = mul(div(getScalar(1), sub(getScalar(1), t)), a), mul(e, a)
		})
	}

	function nameScope$1(e, t) {
		return nameScope(e, t)
	}

	function floatx() {
		return "float32"
	}

	function getUid(e) {
		return void 0 === e && (e = ""), e in _uidPrefixes || (_uidPrefixes[e] = 0), _uidPrefixes[e] += 1, e + _uidPrefixes[e].toString()
	}

	function hardSigmoid(e) {
		return tidy(function() {
			var t = scalarPlusArray(getScalar(.5), scalarTimesArray(getScalar(.2), e));
			return clipByValue(t, 0, 1)
		})
	}

	function inTrainPhase(e, t, r) {
		return void 0 === r && (r = !1), r ? e() : t()
	}

	function calcL2Norms(e, t) {
		return tidy(function() {
			return sqrt(sum(square$1(e), t, !0))
		})
	}

	function serializeConstraint(e) {
		return serializeKerasObject(e)
	}

	function deserializeConstraint(e, t) {
		return void 0 === t && (t = {}), deserializeKerasObject(e, SerializationMap.getMap().classNameMap, t, "constraint")
	}

	function getConstraint(e) {
		return null == e ? null : "string" == typeof e ? deserializeConstraint({
			className: e in CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP ? CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP[e] : e,
			config: {}
		}) : e instanceof Constraint ? e : deserializeConstraint(e)
	}

	function deserialize(e, t) {
		return void 0 === t && (t = {}), deserializeKerasObject(e, SerializationMap.getMap().classNameMap, t, "layer")
	}

	function isArrayItemInputOrOutputName(e, t, r) {
		return ("inboundNodes" === e || "outputLayers" === e || "inputLayers" === e) && 0 === t && "string" == typeof r
	}

	function convertPythonicToTs(e, t) {
		if (null === e) return null;
		if ("string" == typeof e) return toCamelCase(e);
		if ("number" == typeof e || "boolean" == typeof e) return e;
		if (e instanceof Array) {
			for (var r = [], n = e.length, a = 0; a < n; ++a) {
				var o = e[a];
				isArrayItemInputOrOutputName(t, a, o) ? r.push(o) : r.push(convertPythonicToTs(o, t))
			}
			return r
		}
		for (var i = {}, s = 0, u = Object.keys(e); s < u.length; s++) {
			var l = u[s],
				c = e[l];
			if ("name" === l && "string" == typeof c) i[l] = c;
			else {
				var p = toCamelCase(l);
				i[p] = convertPythonicToTs(c, p)
			}
		}
		return i
	}

	function convertTsToPythonic(e, t) {
		if (null === e || void 0 === e) return null;
		if ("string" == typeof e) return toSnakeCase(e);
		if ("number" == typeof e || "boolean" == typeof e) return e;
		if (e instanceof Array) {
			for (var r = [], n = e.length, a = 0; a < n; ++a) {
				var o = e[a];
				isArrayItemInputOrOutputName(t, a, o) ? r.push(o) : r.push(convertTsToPythonic(o, t))
			}
			return r
		}
		for (var i = {}, s = 0, u = Object.keys(e); s < u.length; s++) {
			var l = u[s],
				c = e[l],
				p = toSnakeCase(l);
			i[p] = "name" !== l && "className" !== l || "string" != typeof c ? convertTsToPythonic(c, l) : c
		}
		return i
	}

	function collectInputShape(e) {
		for (var t = [], r = 0, n = e = toList(e); r < n.length; r++) {
			var a = n[r];
			t.push(intShape(a))
		}
		return singletonOrArray(t)
	}

	function guessOutputDType(e) {
		return "float32"
	}

	function Input(e) {
		if (null == e.batchShape && null == e.shape) throw new Error("Please provide to Input either a `shape` or a `batchShape` argument. Note that `shape` does not include the batch dimension.");
		if (null != e.batchShape && null != e.shape) throw new ValueError("Please provide either a `shape` or `batchShape` argument to Input, but not both.");
		var t = e.batchShape;
		null != e.shape && null == t && (t = [null].concat(e.shape));
		var r = e.dtype;
		return null == r && (r = floatx()), new InputLayer({
			batchInputShape: t,
			name: e.name,
			dtype: r,
			sparse: e.sparse
		}).inboundNodes[0].outputTensors[0]
	}

	function getSourceInputs(e, t, r) {
		if ((null == t || null != r && r > 0) && (t = e.sourceLayer, r = e.nodeIndex), 0 === t.inboundNodes.length) return [e];
		var n = t.inboundNodes[r];
		if (0 === n.inboundLayers.length) return n.inputTensors;
		for (var a = [], o = 0; o < n.inboundLayers.length; o++)
			for (var i = 0, s = getSourceInputs(n.inputTensors[o], n.inboundLayers[o], n.nodeIndices[o]); i < s.length; i++) {
				var u = s[i]; - 1 === a.indexOf(u) && a.push(u)
			}
		return a
	}

	function loadTensor(e, t, r) {
		var n = stringToDType(e);
		return Tensor.make(t, {
			values: 0 === t.length ? r : flatten(r)
		}, n)
	}

	function preprocessWeightsForLoading(e, t, r, n) {
		if (!r.startsWith("2.")) throw new ValueError("Unsupported Keras version in weights being loaded: " + r);
		return t
	}

	function loadWeightsFromNamedTensorMap(e, t) {
		for (var r = {}, n = 0, a = 0, o = t; a < o.length; a++)
			for (var i = 0, s = o[a].weights; i < s.length; i++) {
				var u = s[i];
				if (null != r[u.originalName]) throw new ValueError("Duplicate weight name: " + u.originalName);
				r[u.originalName] = u, n++
			}
		var l = [];
		for (var c in e) l.push([r[c], e[c]]), delete r[c];
		var p = [];
		for (var d in r) p.push(d);
		if (p.length > 0) throw new ValueError(p.length + " of " + n + " weights are not set: " + p);
		batchSetValue(l)
	}

	function loadWeightsFromJson(e, t, r) {
		void 0 === r && (r = !1);
		for (var n = e.keras_version, a = e.backend, o = t.map(function(e) {
				return e.name
			}), i = {}, s = 0, u = t; s < u.length; s++) null != (b = u[s]).name && (null == i[b.name] && (i[b.name] = []), i[b.name].push(b));
		for (var l = e.weights, c = [], p = 0; p < o.length; ++p) {
			var d = o[p],
				h = l[d];
			null == h && (h = []);
			for (var f = [], m = 0; m < h.length; ++m) {
				var g = h[m];
				f.push(new LayerVariable(loadTensor(g.dtype, g.shape, g.value)))
			}
			for (var y = 0, v = i[d]; y < v.length; y++) {
				var b = v[y],
					x = b.weights;
				if ((f = preprocessWeightsForLoading(b, f, n, a)).length !== x.length) {
					if (!r) throw new ValueError("Layer #" + p + ' (named "' + b.name + '") expects ' + x.length + " weight(s), but the saved weights have " + f.length + " element(s).");
					console.warn("Skipping loading of weights of layer " + b.name + " due to mismatch in number of weights: (" + f.length + " vs " + x.length + ").")
				}
				for (var w = 0; w < f.length; ++w) !r || arraysEqual(x[w].shape, f[w].shape) ? c.push([x[w], f[w].read()]) : console.warn("Skipping loading of weights for layer " + b.name + " due to mismatch in shape (" + x[w].shape + " vs " + f[w].shape + ")")
			}
		}
		batchSetValue(c)
	}

	function resolveScalarsInLogs(e) {
		return __awaiter$14(this, void 0, void 0, function() {
			var t, r, n, a, o, i, s;
			return __generator$14(this, function(u) {
				switch (u.label) {
					case 0:
						if (null == e) return [2];
						t = [], r = [];
						for (n in e) "number" != typeof(a = e[n]) && (o = a, t.push(o.data()), r.push(n));
						return [4, Promise.all(t)];
					case 1:
						for (i = u.sent(), s = 0; s < i.length; ++s) e[r[s]] = i[s][0];
						return [2]
				}
			})
		})
	}

	function disposeTensorsInLogs(e) {
		if (null != e)
			for (var t in e) {
				var r = e[t];
				"number" != typeof r && r.dispose()
			}
	}

	function standardizeCallbacks(e) {
		return null == e ? null : e instanceof Callback ? [e] : Array.isArray(e) && e[0] instanceof Callback ? e : toList(e).map(function(e) {
			return new CustomCallback(e)
		})
	}

	function l2Normalize(e, t) {
		return tidy(function() {
			var r = sum(square$1(e), t, !0),
				n = scalarTimesArray(scalar(epsilon$1()), onesLike(e)),
				a = sqrt(maximum(r, n));
			return div(e, a)
		})
	}

	function meanSquaredError(e, t) {
		return tidy(function() {
			return mean(square$1(sub(t, e)), -1)
		})
	}

	function meanAbsoluteError(e, t) {
		return tidy(function() {
			return mean(abs(sub(t, e)), -1)
		})
	}

	function meanAbsolutePercentageError(e, t) {
		return tidy(function() {
			var r = sub(e, t),
				n = clipByValue(abs(e), epsilon$1(), Number.MAX_VALUE),
				a = abs(div(r, n));
			return scalarTimesArray(getScalar(100), mean(a, -1))
		})
	}

	function meanSquaredLogarithmicError(e, t) {
		return tidy(function() {
			var r = getScalar(1),
				n = clipByValue(t, epsilon$1(), Number.MAX_VALUE),
				a = log(scalarPlusArray(r, n)),
				o = clipByValue(e, epsilon$1(), Number.MAX_VALUE),
				i = log(scalarPlusArray(r, o));
			return mean(square$1(sub(a, i)), -1)
		})
	}

	function squaredHinge(e, t) {
		return tidy(function() {
			var r = getScalar(0),
				n = getScalar(1),
				a = maximum(r, sub(n, mul(e, t)));
			return mean(square$1(a), -1)
		})
	}

	function hinge(e, t) {
		return tidy(function() {
			var r = getScalar(0),
				n = getScalar(1),
				a = maximum(r, sub(n, mul(e, t)));
			return mean(a, -1)
		})
	}

	function categoricalHinge(e, t) {
		return tidy(function() {
			var r = getScalar(0),
				n = getScalar(1),
				a = sum(mul(e, t), -1),
				o = max(mul(sub(n, e), t), -1);
			return maximum(r, scalarPlusArray(n, sub(o, a)))
		})
	}

	function logcosh(e, t) {
		return tidy(function() {
			var r = getScalar(Math.log(2)),
				n = sub(t, e),
				a = sub(add(n, softplus(scalarTimesArray(getScalar(-2), n))), r);
			return mean(a, -1)
		})
	}

	function categoricalCrossentropy(e, t, r) {
		return void 0 === r && (r = !1), tidy(function() {
			if (r) t = softmax(t);
			else {
				var n = sum(t, shape(t).length - 1, !0);
				t = div(t, n)
			}
			return t = clipByValue(t, epsilon$1(), 1 - epsilon$1()), neg(sum(mul(e.toFloat(), log(t)), shape(t).length - 1))
		})
	}

	function sparseCategoricalCrossentropy(e, t, r) {
		return void 0 === r && (r = !1), tidy(function() {
			var n = floor(flatten$1(e)).toInt(),
				a = shape(t);
			return categoricalCrossentropy(oneHot(n, a[a.length - 1]).reshape(a), t, r)
		})
	}

	function sigmoidCrossEntropyWithLogits(e, t) {
		return tidy(function() {
			var r = maximum(t, zerosLike(t)),
				n = mul(t, e),
				a = log(add(getScalar(1), exp(neg(abs(t)))));
			return add(sub(r, n), a)
		})
	}

	function binaryCrossentropy(e, t) {
		return tidy(function() {
			var r;
			return r = clipByValue(t, epsilon$1(), 1 - epsilon$1()), r = log(div(r, sub(onesLike(r), r))), mean(sigmoidCrossEntropyWithLogits(e, r), -1)
		})
	}

	function kullbackLeiblerDivergence(e, t) {
		return tidy(function() {
			var r = clipByValue(e, epsilon$1(), 1),
				n = clipByValue(t, epsilon$1(), 1);
			return sum(mul(e, log(div(r, n))), -1)
		})
	}

	function poisson(e, t) {
		return tidy(function() {
			var r = log(scalarPlusArray(getScalar(epsilon$1()), t));
			return mean(sub(t, mul(e, r)), -1)
		})
	}

	function cosineProximity(e, t) {
		return tidy(function() {
			var r = l2Normalize(e, -1),
				n = l2Normalize(t, -1),
				a = mul(r, n);
			return neg(sum(a, -1))
		})
	}

	function get(e) {
		var t = {
			meanSquaredError: meanSquaredError,
			meanAbsoluteError: meanAbsoluteError,
			meanAbsolutePercentageError: meanAbsolutePercentageError,
			meanSquaredLogarithmicError: meanSquaredLogarithmicError,
			squaredHinge: squaredHinge,
			hinge: hinge,
			categoricalHinge: categoricalHinge,
			logcosh: logcosh,
			categoricalCrossentropy: categoricalCrossentropy,
			sparseCategoricalCrossentropy: sparseCategoricalCrossentropy,
			binaryCrossentropy: binaryCrossentropy,
			kullbackLeiblerDivergence: kullbackLeiblerDivergence,
			poisson: poisson,
			cosineProximity: cosineProximity
		};
		if ("string" == typeof e) {
			if (e in t) return t[e];
			throw new ValueError("Unknown loss " + e)
		}
		return e
	}

	function binaryAccuracy(e, t) {
		return tidy(function() {
			var r = scalarTimesArray(getScalar(.5), onesLike(t)),
				n = cast$1(greater(t, r), e.dtype);
			return mean(equal(e, n), -1)
		})
	}

	function categoricalAccuracy(e, t) {
		return tidy(function() {
			return cast$1(equal(argMax(e, -1), argMax(t, -1)), "float32")
		})
	}

	function binaryCrossentropy$1(e, t) {
		return binaryCrossentropy(e, t)
	}

	function sparseCategoricalAccuracy(e, t) {
		throw new NotImplementedError
	}

	function get$1(e) {
		var t = {
			binaryAccuracy: binaryAccuracy,
			categoricalAccuracy: categoricalAccuracy,
			categoricalCrossentropy: categoricalCrossentropy$1,
			sparseCategoricalCrossentropy: sparseCategoricalCrossentropy$1,
			mse: mse$1,
			MSE: MSE$1,
			mae: mae$1,
			MAE: MAE$1,
			mape: mape$1,
			MAPE: MAPE$1,
			cosine: cosine$1
		};
		if ("string" == typeof e && e in t) return t[e];
		if ("string" != typeof e && null != e) return e;
		throw new ValueError("Unknown metric " + e)
	}

	function getOptimizer(e) {
		var t = {
			Adagrad: function() {
				return train.adagrad(.01)
			},
			Adam: function() {
				return train.adam(.001, .9, .999, epsilon$1())
			},
			RMSProp: function() {
				return train.rmsprop(.001, .9, null, epsilon$1())
			},
			SGD: function() {
				return train.sgd(.01)
			}
		};
		if (t.adagrad = t.Adagrad, t.adam = t.Adam, t.rmsprop = t.RMSProp, t.sgd = t.SGD, e in t) return t[e]();
		throw new ValueError("Unknown Optimizer " + e)
	}

	function assertFeedCompatibility(e, t) {
		if (null != e.dtype && e.dtype !== t.dtype) throw new ValueError("The dtype of the feed (" + t.dtype + ") is incompatible with that of the key '" + e.name + "' (" + e.dtype + ").");
		if (null != e.shape) {
			if (e.shape.length !== t.shape.length) throw new ValueError("The rank of feed (" + t.shape.length + ") does not match the rank of the key (" + e.shape.length + ").");
			for (var r = 0; r < e.shape.length; ++r)
				if (null != e.shape[r] && e.shape[r] !== t.shape[r]) throw new ValueError("The " + r + "-th dimension of the feed (" + t.shape[r] + ") is incompatible with that of the key (" + e.shape[r] + ").")
		}
	}

	function execute(e, t, r) {
		for (var n = Array.isArray(e), a = n ? e : [e], o = [], i = new FeedDict(t), s = 0, u = a; s < u.length; s++) {
			var l = u[s];
			o.push(executeInternal(l, i, r))
		}
		return n ? o : o[0]
	}

	function executeInternal(e, t, r) {
		if (t.hasKey(e)) return t.getValue(e);
		if (e.sourceLayer instanceof InputLayer) throw new ValueError("Missing a feed value for SymbolicTensor from InputLayer '" + InputLayer.name + "'");
		for (var n = [], a = 0, o = e.inputs; a < o.length; a++) {
			var i = executeInternal(o[a], t, r);
			n.push(i)
		}
		var s = e.sourceLayer.apply(n, r);
		Array.isArray(s) || (s = [s]);
		for (var u = getNodeOutputs(e), l = Array.isArray(u) ? u : [u], c = 0; c < l.length; ++c) t.add(l[c], s[c]);
		return 1 === s.length ? s[0] : s[e.outputTensorIndex]
	}

	function getNodeOutputs(e) {
		var t;
		if (1 === e.sourceLayer.inboundNodes.length) t = e.sourceLayer.output;
		else {
			for (var r = null, n = 0; n < e.sourceLayer.inboundNodes.length; ++n)
				for (var a = 0, o = e.sourceLayer.inboundNodes[n].outputTensors; a < o.length; a++)
					if (o[a].id === e.id) {
						r = n;
						break
					} t = e.sourceLayer.getOutputAt(r)
		}
		return t
	}

	function isDataTensor(e) {
		return e instanceof Tensor
	}

	function isDataArray(e) {
		return Array.isArray(e)
	}

	function isDataDict(e) {
		return !isDataTensor(e) && !isDataArray(e)
	}

	function standardizeInputData(e, t, r, n, a) {
		if (void 0 === n && (n = !0), void 0 === a && (a = ""), null == t || 0 === t.length) {
			if (null != e) {
				var o = !1;
				if (isDataArray(e) && e.length > 0) o = !0;
				else if (isDataDict(e)) {
					for (var i in e)
						if (e.hasOwnProperty(i)) {
							o = !0;
							break
						}
				} else o = !0;
				if (o) throw new ValueError("Error when checking model " + a + " expected no data, but got " + e)
			}
			return []
		}
		if (null == e) return t.map(function(e) {
			return null
		});
		var s;
		if (isDataDict(e)) {
			e = e, s = [];
			for (var u = 0, l = t; u < l.length; u++) {
				var c = l[u];
				if (null == e[c]) throw new ValueError('No data provided for "' + c + '". Need data for each key in: ' + t);
				s.push(e[c])
			}
		} else if (isDataArray(e)) {
			if ((e = e).length !== t.length) throw new ValueError("Error when checking model " + a + ": the Array of Tensors that you are passing to your model is not the size the model expected. Expected to see " + t.length + " Tensor(s), but instead got the following list of Tensor(s): " + e);
			s = e
		} else {
			if (e = e, t.length > 1) throw new ValueError("The model " + a + " expects " + t.length + " Tensor(s), but only received one Tensor. Found: Tensor with shape " + e.shape);
			s = [e]
		}
		for (p = 0; p < t.length; ++p) 1 === (d = s[p]).shape.length && (s[p] = expandDims$1(d, 1));
		if (null != r)
			for (var p = 0; p < t.length; ++p)
				if (null != r[p]) {
					var d = s[p];
					if (d.shape.length !== r[p].length) throw new ValueError("Error when checking " + a + ": expected " + t[p] + " to have " + r[p].length + " dimension(s). but got array with shape " + d.shape);
					for (var h = 0; h < r[p].length; ++h)
						if (0 !== h || n) {
							var f = d.shape[h],
								m = r[p][h];
							if (null != m && m >= 0 && f !== m) throw new ValueError("Error when checking " + a + ": expected " + t[p] + " to have shape [" + r[p] + "], but got array with shape [" + d.shape + "].")
						}
				} return s
	}

	function checkArrayLengths(e, t, r) {
		var n = unique(e.map(function(e) {
			return e.shape[0]
		}));
		n.sort();
		var a = unique(t.map(function(e) {
			return e.shape[0]
		}));
		if (a.sort(), n.length > 1) throw new ValueError("All input Tensors (x) should have the same number of samples. Got array shapes: " + JSON.stringify(e.map(function(e) {
			return e.shape
		})));
		if (a.length > 1) throw new ValueError("All target Tensors (y) should have the same number of samples. Got array shapes: " + JSON.stringify(t.map(function(e) {
			return e.shape
		})));
		if (n.length > 0 && a.length > 0 && !arraysEqual(n, a)) throw new ValueError("Input Tensors should have the same number of samples as target Tensors. Found " + n[0] + " input sample(s) and " + a[0] + " target sample(s).")
	}

	function checkLossAndTargetCompatibility(e, t, r) {
		for (var n = [meanSquaredError, binaryCrossentropy, categoricalCrossentropy], a = 0; a < e.length; ++a) {
			var o = e[a],
				i = t[a],
				s = r[a];
			if (null != i) {
				if (i === categoricalCrossentropy && 1 === o.shape[o.shape.length - 1]) throw new ValueError("You are passing a target array of shape " + o.shape + " while using a loss 'categorical_crossentropy'. 'categorical_crossentropy'expects targets to be binary matrices (1s and 0s) of shape [samples, classes].");
				if (-1 !== n.indexOf(i))
					for (var u = o.shape.slice(1), l = s.slice(1), c = 0; c < u.length; ++c) {
						var p = u[c],
							d = l[c];
						if (null != d && p !== d) throw new ValueError("A target Tensor with shape " + o.shape + " was passed for an output of shape " + s + ", while using a loss function that expects targets to have the same shape as the output.")
					}
			}
		}
	}

	function makeBatches(e, t) {
		for (var r = [], n = 0, a = null; n < e;)(a = n + t) >= e && (a = e), r.push([n, a]), n = a;
		return r
	}

	function sliceArrays(e, t, r) {
		return null == e ? [null] : Array.isArray(e) ? e.map(function(e) {
			return sliceAlongFirstAxis(e, t, r - t)
		}) : sliceAlongFirstAxis(e, t, r - t)
	}

	function sliceArraysByIndices(e, t) {
		return tidy(function() {
			return null == e ? null : Array.isArray(e) ? e.map(function(e) {
				return sliceArraysByIndices(e, t)
			}) : gather$1(e, "int32" === t.dtype ? t : t.toInt())
		})
	}

	function checkInputData(e, t, r, n, a) {
		void 0 === n && (n = !0), void 0 === a && (a = "");
		var o;
		if (Array.isArray(e)) {
			if (e.length !== t.length) throw new ValueError("Error when checking model " + a + ": the Array of Tensors that you are passing to your model is not the size the the model expected. Expected to see " + t.length + " Tensor(s), but instead got " + e.length + " Tensors(s).");
			o = e
		} else {
			if (t.length > 1) throw new ValueError("The model expects " + t.length + " " + a + " Tensors, but only received one Tensor. Found: array with shape " + JSON.stringify(e.shape) + ".");
			o = [e]
		}
		if (null != r)
			for (var i = 0; i < t.length; ++i)
				if (null != r[i]) {
					var s = o[i];
					if (s.shape.length !== r[i].length) throw new ValueError("Error when checking " + a + ": expected " + t[i] + " to have " + r[i].length + " dimension(s), but got array with shape " + JSON.stringify(s.shape));
					for (var u = 0; u < r[i].length; ++u)
						if (0 !== u || n) {
							var l = s.shape[u],
								c = r[i][u];
							if (null != c && c !== l) throw new ValueError("Error when checking " + a + ": expected " + t[i] + " to have shape " + JSON.stringify(r[i]) + " but got array with shape " + JSON.stringify(s.shape) + ".")
						}
				}
	}

	function collectMetrics(e, t) {
		if (null == e || Array.isArray(e) && 0 === e.length) return t.map(function(e) {
			return []
		});
		if (Array.isArray(e)) return t.map(function(t) {
			return e
		});
		if (null != e) {
			for (var r = [], n = 0, a = t; n < a.length; n++) {
				var o = a[n],
					i = e.hasOwnProperty(o) ? e[o] : [];
				Array.isArray(i) || (i = [i]), r.push(i)
			}
			return r
		}
		throw new TypeError("Type of metrics argument not understood. Expected an Array or Object, found: " + e)
	}

	function checkFanMode(e) {
		checkStringTypeUnionValue(VALID_FAN_MODE_VALUES, "FanMode", e)
	}

	function checkDistribution(e) {
		checkStringTypeUnionValue(VALID_DISTRIBUTION_VALUES, "Distribution", e)
	}

	function computeFans(e, t) {
		void 0 === t && (t = "channelsLast");
		var r, n;
		if (checkDataFormat(t), 2 === e.length) r = e[0], n = e[1];
		else if (-1 !== [3, 4, 5].indexOf(e.length)) {
			if ("channelsFirst" === t) {
				a = arrayProd(e, 2);
				r = e[1] * a, n = e[0] * a
			} else if ("channelsLast" === t) {
				var a = arrayProd(e, 0, e.length - 2);
				r = e[e.length - 2] * a, n = e[e.length - 1] * a
			}
		} else {
			var o = arrayProd(e);
			r = Math.sqrt(o), n = Math.sqrt(o)
		}
		return [r, n]
	}

	function deserializeInitializer(e, t) {
		return void 0 === t && (t = {}), deserializeKerasObject(e, SerializationMap.getMap().classNameMap, t, "initializer")
	}

	function serializeInitializer(e) {
		return serializeKerasObject(e)
	}

	function getInitializer(e) {
		if ("string" == typeof e) {
			var t = e in INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ? INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[e] : e;
			return "GlorotUniform" === t ? new GlorotUniform : "GlorotNormal" === t ? new GlorotNormal : "HeNormal" === t ? new HeNormal : "LeCunNormal" === t ? new LeCunNormal : deserializeInitializer({
				className: t,
				config: {}
			})
		}
		return e instanceof Initializer ? e : deserializeInitializer(e)
	}

	function serializeActivation(e) {
		return e.getClassName()
	}

	function deserializeActivation(e, t) {
		return void 0 === t && (t = {}), deserializeKerasObject(e, SerializationMap.getMap().classNameMap, t, "activation")
	}

	function getActivation(e) {
		if (null == e) return deserializeActivation(t = {
			className: "linear",
			config: {}
		});
		if ("string" == typeof e) {
			var t = {
				className: e,
				config: {}
			};
			return deserializeActivation(t)
		}
		return e instanceof Activation ? e : deserializeActivation(e)
	}

	function l1(e) {
		return new L1L2({
			l1: null != e ? e.l1 : null,
			l2: 0
		})
	}

	function l2(e) {
		return new L1L2({
			l2: null != e ? e.l2 : null,
			l1: 0
		})
	}

	function serializeRegularizer(e) {
		return serializeKerasObject(e)
	}

	function deserializeRegularizer(e, t) {
		return void 0 === t && (t = {}), deserializeKerasObject(e, SerializationMap.getMap().classNameMap, t, "regularizer")
	}

	function getRegularizer(e) {
		return null == e ? null : "string" == typeof e ? deserializeRegularizer({
			className: e in REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ? REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[e] : e,
			config: {}
		}) : e instanceof Regularizer ? e : deserializeRegularizer(e)
	}

	function normalizeArray(e, t, r) {
		if ("number" == typeof e) return pyListRepeat(e, t);
		if (e.length !== t) throw new ValueError("The " + r + " argument must be a tuple of " + t + " integers. Received: " + e.length + " elements.");
		for (var n = 0; n < t; ++n) {
			var a = e[n];
			if (!isInteger(a)) throw new ValueError("The " + r + " argument must be a tuple of " + t + " integers. Received: " + JSON.stringify(e) + " including a non-integer number " + a)
		}
		return e
	}

	function convOutputLength(e, t, r, n, a) {
		if (void 0 === a && (a = 1), null == e) return e;
		var o, i = t + (t - 1) * (a - 1);
		return o = "same" === r ? e : e - i + 1, Math.floor((o + n - 1) / n)
	}

	function deconvLength(e, t, r, n) {
		if (null == e) return null;
		if ("valid" === n) e = e * t + max$1([r - t, 0]);
		else {
			if ("same" !== n) throw new ValueError("Unsupport padding mode: " + n + ".");
			e *= t
		}
		return e
	}

	function preprocessConv2DInput(e, t) {
		return tidy(function() {
			return checkDataFormat(t), "channelsFirst" === t ? transpose(e, [0, 2, 3, 1]) : e
		})
	}

	function conv1dWithBias(e, t, r, n, a, o, i) {
		return void 0 === n && (n = 1), void 0 === a && (a = "valid"), void 0 === i && (i = 1), tidy(function() {
			if (null == o && (o = imageDataFormat()), checkDataFormat(o), 3 !== e.shape.length) throw new ValueError("The input of a conv1dWithBias operation should be 3, but is " + e.shape.length + " instead.");
			if (3 !== t.shape.length) throw new ValueError("The kernel for a conv1dWithBias operation should be 3, but is " + t.shape.length + " instead");
			if (null != r && 1 !== r.shape.length) throw new ValueError("The bias for a conv1dWithBias operation should be 1, but is " + t.shape.length + " instead");
			if ("channelsFirst" === o && (e = transpose(e, [0, 2, 1])), "causal" === a) throw new NotImplementedError("The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.");
			var s = conv1d(e, t, n, "same" === a ? "same" : "valid", "NWC", i);
			return null != r && (s = biasAdd(s, r)), s
		})
	}

	function conv2dWithBias(e, t, r, n, a, o, i) {
		return void 0 === n && (n = [1, 1]), void 0 === a && (a = "valid"), tidy(function() {
			if (null == o && (o = imageDataFormat()), checkDataFormat(o), 3 !== e.rank && 4 !== e.rank) throw new ValueError("conv2dWithBias expects input to be of rank 3 or 4, but received " + e.rank + ".");
			if (3 !== t.rank && 4 !== t.rank) throw new ValueError("conv2dWithBias expects kernel to be of rank 3 or 4, but received " + e.rank + ".");
			var s = preprocessConv2DInput(e, o);
			if ("causal" === a) throw new NotImplementedError("The support for CAUSAL padding mode in conv1dWithBias is not implemented yet.");
			return s = conv2d(s, t, n, "same" === a ? "same" : "valid", "NHWC", i), null != r && (s = biasAdd(s, r)), "channelsFirst" === o && (s = transpose(s, [0, 3, 1, 2])), s
		})
	}

	function depthwiseConv2d$1(e, t, r, n, a, o) {
		return void 0 === r && (r = [1, 1]), void 0 === n && (n = "valid"), tidy(function() {
			null == a && (a = imageDataFormat()), checkDataFormat(a);
			var i = preprocessConv2DInput(e, a);
			if (4 !== e.rank) throw new ValueError("Input for depthwiseConv2d is required to be 4-D, but is instead " + e.rank + "-D");
			if (4 !== t.rank) throw new ValueError("depthwiseKernel is required to be 4-D, but is instead " + t.rank + "-D");
			return i = depthwiseConv2d(i, t, r, "same" === n ? "same" : "valid", "NHWC", o), "channelsFirst" === a && (i = transpose(i, [0, 3, 1, 2])), i
		})
	}

	function batchNormalization$1(e, t, r, n, a, o) {
		void 0 === o && (o = .001);
		var i;
		if (2 === e.rank) i = batchNormalization2d(e, t, r, o, a, n);
		else if (3 === e.rank) i = batchNormalization3d(e, t, r, o, a, n);
		else {
			if (4 !== e.rank) throw new NotImplementedError("batchNormalization is not implememnted for array of rank " + e.rank + " yet");
			i = batchNormalization4d(e, t, r, o, a, n)
		}
		return i
	}

	function regularNormalizeBatchInTraining(e, t, r, n, a) {
		return void 0 === a && (a = .001), tidy(function() {
			var o = moments(e, n),
				i = o.mean,
				s = o.variance;
			return [batchNormalization$1(e, i, s, r, t, a), i, s]
		})
	}

	function broadcastNormalizeBatchInTraining(e, t, r, n, a) {
		return void 0 === a && (a = .001), tidy(function() {
			for (var o = moments(e, n), i = o.mean, s = o.variance, u = [], l = 0, c = range$1(0, e.rank); l < c.length; l++) {
				var p = c[l]; - 1 !== n.indexOf(p) ? u.push(1) : u.push(e.shape[p])
			}
			var d = i.reshape(u),
				h = s.reshape(u),
				f = null == t ? null : t.reshape(u),
				m = null == r ? null : r.reshape(u);
			return [batchNormalization$1(e, d, h, m, f, a), i, s]
		})
	}

	function normalizeBatchInTraining(e, t, r, n, a) {
		return void 0 === a && (a = .001), arraysEqual(n.slice().sort(), range$1(0, e.rank - 1)) ? regularNormalizeBatchInTraining(e, t, r, n, a) : broadcastNormalizeBatchInTraining(e, t, r, n, a)
	}

	function spatial2dPadding(e, t, r) {
		return tidy(function() {
			if (4 !== e.rank) throw new ValueError("temporalPadding expects input tensor to be 4-D, but received a " + e.rank + "-D tensor.");
			if (null == t && (t = [
					[1, 1],
					[1, 1]
				]), 2 !== t.length || 2 !== t[0].length || 2 !== t[1].length) throw new ValueError("spatial2dPadding expects `padding` to be an Array of two Arrays, each of which is an Array of two integers.");
			if (null == r && (r = imageDataFormat()), "channelsLast" !== r && "channelsFirst" !== r) throw new ValueError("Unknown data format: " + r + ". Supported data formats are 'channelsLast' and 'channelsFirst.");
			var n;
			return n = "channelsFirst" === r ? [
				[0, 0],
				[0, 0], t[0], t[1]
			] : [
				[0, 0], t[0], t[1],
				[0, 0]
			], pad(e, n)
		})
	}

	function pool2d(e, t, r, n, a, o) {
		return tidy(function() {
			checkDataFormat(a), checkPoolMode(o), checkPaddingMode(n), null == r && (r = [1, 1]), null == n && (n = "valid"), null == a && (a = imageDataFormat()), null == o && (o = "max"), e = preprocessConv2DInput(e, a);
			var i, s = "same" === n ? "same" : "valid";
			return i = "max" === o ? maxPool(e, t, r, s) : avgPool(e, t, r, s), "channelsFirst" === a && (i = transpose(i, [0, 3, 1, 2])), i
		})
	}

	function rnn(e, t, r, n, a, o, i, s) {
		void 0 === n && (n = !1), void 0 === i && (i = !1);
		var u = t.shape.length;
		if (u < 3) throw new ValueError("Input should be at least 3D, but is " + u + "D.");
		var l = [1, 0].concat(range$1(2, u));
		if (t = transpose(t, l), null != a) throw new NotImplementedError("The rnn() function of the deeplearn.js backend does not support masking yet.");
		if (null != o) throw new NotImplementedError("The rnn() functoin of the deeplearn.js backend does not support constants yet.");
		i && console.warn("Backend rnn(): the unroll = true option is not applicable to the imperative deeplearn.js backend."), n && (t = reverse(t, 0));
		for (var c, p, d = r, h = t.shape[0], f = 0; f < h; ++f) {
			var m = sliceAlongFirstAxis(t, f, 1),
				g = e(m = m.reshape(m.shape.slice(1)), d);
			p = g[0], c = 0 === f ? p.reshape([1].concat(p.shape)) : concatAlongFirstAxis(c, p.reshape([1].concat(p.shape))), d = g[1]
		}
		return [p, transpose(c, [1, 0].concat(range$1(2, c.shape.length))), d]
	}

	function checkBidirectionalMergeMode(e) {
		checkStringTypeUnionValue(VALID_BIDIRECTIONAL_MERGE_MODES, "BidirectionalMergeMode", e)
	}

	function loadModelInternal(e) {
		return __awaiter$16(this, void 0, void 0, function() {
			var t;
			return __generator$16(this, function(r) {
				if ("string" == typeof e) {
					if (0 === (t = getLoadHandlers(e)).length) t.push(browserHTTPRequest(e));
					else if (t.length > 1) throw new ValueError("Found more than one (" + t.length + ") load handlers for URL '" + e + "'");
					e = t[0]
				}
				return [2, loadModelFromIOHandler(e)]
			})
		})
	}

	function loadModelFromIOHandler(e, t) {
		return __awaiter$16(this, void 0, void 0, function() {
			var r, n, a, o, i;
			return __generator$16(this, function(s) {
				switch (s.label) {
					case 0:
						if (null == e.load) throw new ValueError("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");
						return [4, e.load()];
					case 1:
						if (r = s.sent(), null != (n = r.modelTopology).model_config && (n = n.model_config), a = deserialize(convertPythonicToTs(n), t), null != r.weightData) {
							if (null == r.weightSpecs) throw new ValueError("Model artifacts contains weight data, but not weight specs. Therefore loading of weights cannot proceed.");
							o = !1, i = !0, a.loadWeights(decodeWeights(r.weightData, r.weightSpecs), o, i)
						}
						return [2, a]
				}
			})
		})
	}

	function hasOwnProperty(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}

	function Url() {
		this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
	}

	function urlParse(e, t, r) {
		if (e && util$1.isObject(e) && e instanceof Url) return e;
		var n = new Url;
		return n.parse(e, t, r), n
	}

	function urlFormat(e) {
		return util$1.isString(e) && (e = urlParse(e)), e instanceof Url ? e.format() : Url.prototype.format.call(e)
	}

	function asPromise(e, t) {
		for (var r = new Array(arguments.length - 1), n = 0, a = 2, o = !0; a < arguments.length;) r[n++] = arguments[a++];
		return new Promise(function(a, i) {
			r[n] = function(e) {
				if (o)
					if (o = !1, e) i(e);
					else {
						for (var t = new Array(arguments.length - 1), r = 0; r < t.length;) t[r++] = arguments[r];
						a.apply(null, t)
					}
			};
			try {
				e.apply(t || null, r)
			} catch (e) {
				o && (o = !1, i(e))
			}
		})
	}

	function EventEmitter() {
		this._listeners = {}
	}

	function factory(e) {
		return "undefined" != typeof Float32Array ? function() {
			function t(e, t, r) {
				o[0] = e, t[r] = i[0], t[r + 1] = i[1], t[r + 2] = i[2], t[r + 3] = i[3]
			}

			function r(e, t, r) {
				o[0] = e, t[r] = i[3], t[r + 1] = i[2], t[r + 2] = i[1], t[r + 3] = i[0]
			}

			function n(e, t) {
				return i[0] = e[t], i[1] = e[t + 1], i[2] = e[t + 2], i[3] = e[t + 3], o[0]
			}

			function a(e, t) {
				return i[3] = e[t], i[2] = e[t + 1], i[1] = e[t + 2], i[0] = e[t + 3], o[0]
			}
			var o = new Float32Array([-0]),
				i = new Uint8Array(o.buffer),
				s = 128 === i[3];
			e.writeFloatLE = s ? t : r, e.writeFloatBE = s ? r : t, e.readFloatLE = s ? n : a, e.readFloatBE = s ? a : n
		}() : function() {
			function t(e, t, r, n) {
				var a = t < 0 ? 1 : 0;
				if (a && (t = -t), 0 === t) e(1 / t > 0 ? 0 : 2147483648, r, n);
				else if (isNaN(t)) e(2143289344, r, n);
				else if (t > 3.4028234663852886e38) e((a << 31 | 2139095040) >>> 0, r, n);
				else if (t < 1.1754943508222875e-38) e((a << 31 | Math.round(t / 1.401298464324817e-45)) >>> 0, r, n);
				else {
					var o = Math.floor(Math.log(t) / Math.LN2);
					e((a << 31 | o + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -o) * 8388608)) >>> 0, r, n)
				}
			}

			function r(e, t, r) {
				var n = e(t, r),
					a = 2 * (n >> 31) + 1,
					o = n >>> 23 & 255,
					i = 8388607 & n;
				return 255 === o ? i ? NaN : a * (1 / 0) : 0 === o ? 1.401298464324817e-45 * a * i : a * Math.pow(2, o - 150) * (i + 8388608)
			}
			e.writeFloatLE = t.bind(null, writeUintLE), e.writeFloatBE = t.bind(null, writeUintBE), e.readFloatLE = r.bind(null, readUintLE), e.readFloatBE = r.bind(null, readUintBE)
		}(), "undefined" != typeof Float64Array ? function() {
			function t(e, t, r) {
				o[0] = e, t[r] = i[0], t[r + 1] = i[1], t[r + 2] = i[2], t[r + 3] = i[3], t[r + 4] = i[4], t[r + 5] = i[5], t[r + 6] = i[6], t[r + 7] = i[7]
			}

			function r(e, t, r) {
				o[0] = e, t[r] = i[7], t[r + 1] = i[6], t[r + 2] = i[5], t[r + 3] = i[4], t[r + 4] = i[3], t[r + 5] = i[2], t[r + 6] = i[1], t[r + 7] = i[0]
			}

			function n(e, t) {
				return i[0] = e[t], i[1] = e[t + 1], i[2] = e[t + 2], i[3] = e[t + 3], i[4] = e[t + 4], i[5] = e[t + 5], i[6] = e[t + 6], i[7] = e[t + 7], o[0]
			}

			function a(e, t) {
				return i[7] = e[t], i[6] = e[t + 1], i[5] = e[t + 2], i[4] = e[t + 3], i[3] = e[t + 4], i[2] = e[t + 5], i[1] = e[t + 6], i[0] = e[t + 7], o[0]
			}
			var o = new Float64Array([-0]),
				i = new Uint8Array(o.buffer),
				s = 128 === i[7];
			e.writeDoubleLE = s ? t : r, e.writeDoubleBE = s ? r : t, e.readDoubleLE = s ? n : a, e.readDoubleBE = s ? a : n
		}() : function() {
			function t(e, t, r, n, a, o) {
				var i = n < 0 ? 1 : 0;
				if (i && (n = -n), 0 === n) e(0, a, o + t), e(1 / n > 0 ? 0 : 2147483648, a, o + r);
				else if (isNaN(n)) e(0, a, o + t), e(2146959360, a, o + r);
				else if (n > 1.7976931348623157e308) e(0, a, o + t), e((i << 31 | 2146435072) >>> 0, a, o + r);
				else {
					var s;
					if (n < 2.2250738585072014e-308) e((s = n / 5e-324) >>> 0, a, o + t), e((i << 31 | s / 4294967296) >>> 0, a, o + r);
					else {
						var u = Math.floor(Math.log(n) / Math.LN2);
						1024 === u && (u = 1023), e(4503599627370496 * (s = n * Math.pow(2, -u)) >>> 0, a, o + t), e((i << 31 | u + 1023 << 20 | 1048576 * s & 1048575) >>> 0, a, o + r)
					}
				}
			}

			function r(e, t, r, n, a) {
				var o = e(n, a + t),
					i = e(n, a + r),
					s = 2 * (i >> 31) + 1,
					u = i >>> 20 & 2047,
					l = 4294967296 * (1048575 & i) + o;
				return 2047 === u ? l ? NaN : s * (1 / 0) : 0 === u ? 5e-324 * s * l : s * Math.pow(2, u - 1075) * (l + 4503599627370496)
			}
			e.writeDoubleLE = t.bind(null, writeUintLE, 0, 4), e.writeDoubleBE = t.bind(null, writeUintBE, 4, 0), e.readDoubleLE = r.bind(null, readUintLE, 0, 4), e.readDoubleBE = r.bind(null, readUintBE, 4, 0)
		}(), e
	}

	function writeUintLE(e, t, r) {
		t[r] = 255 & e, t[r + 1] = e >>> 8 & 255, t[r + 2] = e >>> 16 & 255, t[r + 3] = e >>> 24
	}

	function writeUintBE(e, t, r) {
		t[r] = e >>> 24, t[r + 1] = e >>> 16 & 255, t[r + 2] = e >>> 8 & 255, t[r + 3] = 255 & e
	}

	function readUintLE(e, t) {
		return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0
	}

	function readUintBE(e, t) {
		return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0
	}

	function inquire(moduleName) {
		try {
			var mod = eval("quire".replace(/^/, "re"))(moduleName);
			if (mod && (mod.length || Object.keys(mod).length)) return mod
		} catch (e) {}
		return null
	}

	function pool(e, t, r) {
		var n = r || 8192,
			a = n >>> 1,
			o = null,
			i = n;
		return function(r) {
			if (r < 1 || r > a) return e(r);
			i + r > n && (o = e(n), i = 0);
			var s = t.call(o, i, i += r);
			return 7 & i && (i = 1 + (7 | i)), s
		}
	}

	function LongBits(e, t) {
		this.lo = e >>> 0, this.hi = t >>> 0
	}

	function Op(e, t, r) {
		this.fn = e, this.len = t, this.next = void 0, this.val = r
	}

	function noop() {}

	function State(e) {
		this.head = e.head, this.tail = e.tail, this.len = e.len, this.next = e.states
	}

	function Writer() {
		this.len = 0, this.head = new Op(noop, 0, 0), this.tail = this.head, this.states = null
	}

	function writeByte(e, t, r) {
		t[r] = 255 & e
	}

	function writeVarint32(e, t, r) {
		for (; e > 127;) t[r++] = 127 & e | 128, e >>>= 7;
		t[r] = e
	}

	function VarintOp(e, t) {
		this.len = e, this.next = void 0, this.val = t
	}

	function writeVarint64(e, t, r) {
		for (; e.hi;) t[r++] = 127 & e.lo | 128, e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0, e.hi >>>= 7;
		for (; e.lo > 127;) t[r++] = 127 & e.lo | 128, e.lo = e.lo >>> 7;
		t[r++] = e.lo
	}

	function writeFixed32(e, t, r) {
		t[r] = 255 & e, t[r + 1] = e >>> 8 & 255, t[r + 2] = e >>> 16 & 255, t[r + 3] = e >>> 24
	}

	function BufferWriter$1() {
		writer.call(this)
	}

	function writeStringBuffer(e, t, r) {
		e.length < 40 ? minimal.utf8.write(e, t, r) : t.utf8Write(e, r)
	}

	function indexOutOfRange(e, t) {
		return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len)
	}

	function Reader(e) {
		this.buf = e, this.pos = 0, this.len = e.length
	}

	function readLongVarint() {
		var e = new LongBits$2(0, 0),
			t = 0;
		if (!(this.len - this.pos > 4)) {
			for (; t < 3; ++t) {
				if (this.pos >= this.len) throw indexOutOfRange(this);
				if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e
			}
			return e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0, e
		}
		for (; t < 4; ++t)
			if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0, this.buf[this.pos++] < 128) return e;
		if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0, e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return e;
		if (t = 0, this.len - this.pos > 4) {
			for (; t < 5; ++t)
				if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e
		} else
			for (; t < 5; ++t) {
				if (this.pos >= this.len) throw indexOutOfRange(this);
				if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0, this.buf[this.pos++] < 128) return e
			}
		throw Error("invalid varint encoding")
	}

	function readFixed32_end(e, t) {
		return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0
	}

	function readFixed64() {
		if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
		return new LongBits$2(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4))
	}

	function BufferReader$1(e) {
		reader.call(this, e)
	}

	function Service(e, t, r) {
		if ("function" != typeof e) throw TypeError("rpcImpl must be a function");
		minimal.EventEmitter.call(this), this.rpcImpl = e, this.requestDelimited = Boolean(t), this.responseDelimited = Boolean(r)
	}

	function getParamValue(e, t, r, n) {
		var a = t.params[e];
		if (a && void 0 !== a.inputIndex) {
			if ("tensor" === a.type) return getTensor(t.inputNames[a.inputIndex], r, n);
			if ("tensors" === a.type) return (0 === a.inputIndex ? 0 === a.inputParamLength ? t.inputNames : t.inputNames.slice(a.inputIndex, -a.inputParamLength) : t.inputNames.splice(a.inputIndex)).map(function(e) {
				return getTensor(e, r, n)
			});
			var o = Array.prototype.slice.call(getTensor(t.inputNames.slice(a.inputIndex)[0], r, n).dataSync());
			return "number" === a.type ? o[0] : o
		}
		return a && a.value
	}

	function getTensor(e, t, r) {
		var n = parseNodeName(e),
			a = n[0],
			o = n[1],
			i = r.currentContextIds.find(function(e) {
				return !!t[getNodeNameWithContextId(a, e)]
			});
		return void 0 !== i ? t[getNodeNameWithContextId(a, i)][o] : void 0
	}

	function getNodeNameAndIndex(e, t) {
		var r = parseNodeName(e),
			n = r[0],
			a = r[1];
		return [getNodeNameWithContextId(n, t && t.currentContextId), a]
	}

	function getNodeNameWithContextId(e, t) {
		return t ? e + "-" + t : e
	}

	function parseNodeName(e) {
		var t = e.lastIndexOf(":");
		return -1 === t ? [e, 0] : [e.substring(0, t), Number(e.substring(t + 1))]
	}

	function split$1(e, t) {
		for (var r = [], n = 0; n < e.length; n += t) r.push(e.slice(n, n + t));
		return r
	}

	function executeOp$2(e, t, r) {
		return __awaiter$17(this, void 0, void 0, function() {
			var n, a, o, i, s, u, l, c;
			return __generator$17(this, function(p) {
				switch (p.label) {
					case 0:
						switch (n = e.op) {
							case "loopCond":
								return [3, 1];
							case "switch":
								return [3, 2];
							case "merge":
								return [3, 4];
							case "enter":
								return [3, 5];
							case "exit":
								return [3, 6];
							case "nextIteration":
								return [3, 7]
						}
						return [3, 8];
					case 1:
						return [2, [getParamValue("pred", e, t, r)]];
					case 2:
						return a = getParamValue("pred", e, t, r), o = getParamValue("data", e, t, r), [4, a.data()];
					case 3:
						return [2, p.sent()[0] ? [void 0, o] : [o, void 0]];
					case 4:
						return i = e.inputNames.find(function(e) {
							return void 0 !== getTensor(e, t, r)
						}), [2, i ? [getTensor(i, t, r)] : void 0];
					case 5:
						return s = getParamValue("frameName", e, t, r), u = getParamValue("tensor", e, t, r), r.enterFrame(s), [2, [u]];
					case 6:
						return l = getParamValue("tensor", e, t, r), r.exitFrame(), [2, [l]];
					case 7:
						return c = getParamValue("tensor", e, t, r), r.nextIteration(), [2, [c]];
					case 8:
						throw TypeError("Node type " + e.op + " is not implemented")
				}
			})
		})
	}

	function executeOp$13(e, t, r) {
		switch (e.category) {
			case "arithmetic":
				return executeOp(e, t, r);
			case "basic_math":
				return executeOp$1(e, t, r);
			case "control":
				return executeOp$2(e, t, r);
			case "convolution":
				return executeOp$3(e, t, r);
			case "creation":
				return executeOp$4(e, t, r);
			case "image":
				return executeOp$6(e, t, r);
			case "graph":
				return executeOp$5(e, t, r);
			case "logical":
				return executeOp$7(e, t, r);
			case "matrices":
				return executeOp$8(e, t, r);
			case "normalization":
				return executeOp$9(e, t, r);
			case "reduction":
				return executeOp$10(e, t, r);
			case "slice_join":
				return executeOp$11(e, t, r);
			case "transformation":
				return executeOp$12(e, t, r);
			default:
				throw TypeError("Node type " + e.op + " is not implemented")
		}
	}

	function loadFrozenModel(e, t, r) {
		return __awaiter$19(this, void 0, void 0, function() {
			var n;
			return __generator$19(this, function(a) {
				switch (a.label) {
					case 0:
						return n = new FrozenModel(e, t, r), [4, n.load()];
					case 1:
						return a.sent(), [2, n]
				}
			})
		})
	}
	var util = Object.freeze({
			assertArgumentsAreTensors: assertArgumentsAreTensors,
			shuffle: shuffle,
			clamp: clamp,
			randUniform: randUniform,
			distSquared: distSquared,
			assert: assert,
			assertShapesMatch: assertShapesMatch,
			assertTypesMatch: assertTypesMatch,
			flatten: flatten,
			inferShape: inferShape,
			sizeFromShape: sizeFromShape,
			isScalarShape: isScalarShape,
			arraysEqual: arraysEqual,
			isInt: isInt,
			tanh: tanh,
			sizeToSquarishShape: sizeToSquarishShape,
			createShuffledIndices: createShuffledIndices,
			rightPad: rightPad,
			repeatedTry: repeatedTry,
			getQueryParams: getQueryParams,
			inferFromImplicitShape: inferFromImplicitShape,
			squeezeShape: squeezeShape,
			getTypedArrayFromDType: getTypedArrayFromDType,
			isTensorInList: isTensorInList,
			checkForNaN: checkForNaN,
			flattenNameArrayMap: flattenNameArrayMap,
			unflattenToNameArrayMap: unflattenToNameArrayMap,
			hasEncodingLoss: hasEncodingLoss,
			copyTypedArray: copyTypedArray,
			isTypedArray: isTypedArray,
			bytesPerElement: bytesPerElement,
			isFunction: isFunction,
			getTensorsInContainer: getTensorsInContainer
		}),
		FORMAT_LIMIT_NUM_VALS = 20,
		FORMAT_NUM_FIRST_LAST_VALS = 3,
		FORMAT_NUM_SIG_DIGITS = 7,
		__decorate = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		ConcatOps = function() {
			function e() {}
			return e.concat1d = function(t) {
				return e.concat(t, 0)
			}, e.concat2d = function(t, r) {
				return e.concat(t, r)
			}, e.concat3d = function(t, r) {
				return e.concat(t, r)
			}, e.concat4d = function(t, r) {
				return e.concat(t, r)
			}, e.concat = function(e, t) {
				void 0 === t && (t = 0), assert(e.length >= 1, "Pass at least one tensor to concat"), assertArgumentsAreTensors({
					tensors: e
				}, "concat");
				var r = e[0];
				if (1 === e.length) return r;
				for (var n = parseAxisParam(t, r.shape), a = 1; a < e.length; ++a) r = concat2Tensors(r, e[a], n[0]);
				return r
			}, __decorate([doc(), operation], e, "concat", null), e
		}(),
		commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		alea = createCommonjsModule(function(e) {
			! function(e, t, r) {
				function n(e) {
					var t = this,
						r = i();
					t.next = function() {
						var e = 2091639 * t.s0 + 2.3283064365386963e-10 * t.c;
						return t.s0 = t.s1, t.s1 = t.s2, t.s2 = e - (t.c = 0 | e)
					}, t.c = 1, t.s0 = r(" "), t.s1 = r(" "), t.s2 = r(" "), t.s0 -= r(e), t.s0 < 0 && (t.s0 += 1), t.s1 -= r(e), t.s1 < 0 && (t.s1 += 1), t.s2 -= r(e), t.s2 < 0 && (t.s2 += 1), r = null
				}

				function a(e, t) {
					return t.c = e.c, t.s0 = e.s0, t.s1 = e.s1, t.s2 = e.s2, t
				}

				function o(e, t) {
					var r = new n(e),
						o = t && t.state,
						i = r.next;
					return i.int32 = function() {
						return 4294967296 * r.next() | 0
					}, i.double = function() {
						return i() + 1.1102230246251565e-16 * (2097152 * i() | 0)
					}, i.quick = i, o && ("object" == typeof o && a(o, r), i.state = function() {
						return a(r, {})
					}), i
				}

				function i() {
					var e = 4022871197;
					return function(t) {
						t = t.toString();
						for (var r = 0; r < t.length; r++) {
							var n = .02519603282416938 * (e += t.charCodeAt(r));
							n -= e = n >>> 0, e = (n *= e) >>> 0, e += 4294967296 * (n -= e)
						}
						return 2.3283064365386963e-10 * (e >>> 0)
					}
				}
				t && t.exports ? t.exports = o : r && r.amd ? r(function() {
					return o
				}) : this.alea = o
			}(0, e, !1)
		}),
		xor128 = createCommonjsModule(function(e) {
			! function(e, t, r) {
				function n(e) {
					var t = this,
						r = "";
					t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.next = function() {
						var e = t.x ^ t.x << 11;
						return t.x = t.y, t.y = t.z, t.z = t.w, t.w ^= t.w >>> 19 ^ e ^ e >>> 8
					}, e === (0 | e) ? t.x = e : r += e;
					for (var n = 0; n < r.length + 64; n++) t.x ^= 0 | r.charCodeAt(n), t.next()
				}

				function a(e, t) {
					return t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t
				}

				function o(e, t) {
					var r = new n(e),
						o = t && t.state,
						i = function() {
							return (r.next() >>> 0) / 4294967296
						};
					return i.double = function() {
						do {
							var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
						} while (0 === e);
						return e
					}, i.int32 = r.next, i.quick = i, o && ("object" == typeof o && a(o, r), i.state = function() {
						return a(r, {})
					}), i
				}
				t && t.exports ? t.exports = o : r && r.amd ? r(function() {
					return o
				}) : this.xor128 = o
			}(0, e, !1)
		}),
		xorwow = createCommonjsModule(function(e) {
			! function(e, t, r) {
				function n(e) {
					var t = this,
						r = "";
					t.next = function() {
						var e = t.x ^ t.x >>> 2;
						return t.x = t.y, t.y = t.z, t.z = t.w, t.w = t.v, (t.d = t.d + 362437 | 0) + (t.v = t.v ^ t.v << 4 ^ e ^ e << 1) | 0
					}, t.x = 0, t.y = 0, t.z = 0, t.w = 0, t.v = 0, e === (0 | e) ? t.x = e : r += e;
					for (var n = 0; n < r.length + 64; n++) t.x ^= 0 | r.charCodeAt(n), n == r.length && (t.d = t.x << 10 ^ t.x >>> 4), t.next()
				}

				function a(e, t) {
					return t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t.v = e.v, t.d = e.d, t
				}

				function o(e, t) {
					var r = new n(e),
						o = t && t.state,
						i = function() {
							return (r.next() >>> 0) / 4294967296
						};
					return i.double = function() {
						do {
							var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
						} while (0 === e);
						return e
					}, i.int32 = r.next, i.quick = i, o && ("object" == typeof o && a(o, r), i.state = function() {
						return a(r, {})
					}), i
				}
				t && t.exports ? t.exports = o : r && r.amd ? r(function() {
					return o
				}) : this.xorwow = o
			}(0, e, !1)
		}),
		xorshift7 = createCommonjsModule(function(e) {
			! function(e, t, r) {
				function n(e) {
					var t = this;
					t.next = function() {
							var e, r, n = t.x,
								a = t.i;
							return e = n[a], e ^= e >>> 7, r = e ^ e << 24, e = n[a + 1 & 7], r ^= e ^ e >>> 10, e = n[a + 3 & 7], r ^= e ^ e >>> 3, e = n[a + 4 & 7], r ^= e ^ e << 7, e = n[a + 7 & 7], e ^= e << 13, r ^= e ^ e << 9, n[a] = r, t.i = a + 1 & 7, r
						},
						function(e, t) {
							var r, n = [];
							if (t === (0 | t)) n[0] = t;
							else
								for (t = "" + t, r = 0; r < t.length; ++r) n[7 & r] = n[7 & r] << 15 ^ t.charCodeAt(r) + n[r + 1 & 7] << 13;
							for (; n.length < 8;) n.push(0);
							for (r = 0; r < 8 && 0 === n[r]; ++r);
							for (8 == r ? n[7] = -1 : n[r], e.x = n, e.i = 0, r = 256; r > 0; --r) e.next()
						}(t, e)
				}

				function a(e, t) {
					return t.x = e.x.slice(), t.i = e.i, t
				}

				function o(e, t) {
					null == e && (e = +new Date);
					var r = new n(e),
						o = t && t.state,
						i = function() {
							return (r.next() >>> 0) / 4294967296
						};
					return i.double = function() {
						do {
							var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
						} while (0 === e);
						return e
					}, i.int32 = r.next, i.quick = i, o && (o.x && a(o, r), i.state = function() {
						return a(r, {})
					}), i
				}
				t && t.exports ? t.exports = o : r && r.amd ? r(function() {
					return o
				}) : this.xorshift7 = o
			}(0, e, !1)
		}),
		xor4096 = createCommonjsModule(function(e) {
			! function(e, t, r) {
				function n(e) {
					var t = this;
					t.next = function() {
							var e, r, n = t.w,
								a = t.X,
								o = t.i;
							return t.w = n = n + 1640531527 | 0, r = a[o + 34 & 127], e = a[o = o + 1 & 127], r ^= r << 13, e ^= e << 17, r ^= r >>> 15, e ^= e >>> 12, r = a[o] = r ^ e, t.i = o, r + (n ^ n >>> 16) | 0
						},
						function(e, t) {
							var r, n, a, o, i, s = [],
								u = 128;
							for (t === (0 | t) ? (n = t, t = null) : (t += "\0", n = 0, u = Math.max(u, t.length)), a = 0, o = -32; o < u; ++o) t && (n ^= t.charCodeAt((o + 32) % t.length)), 0 === o && (i = n), n ^= n << 10, n ^= n >>> 15, n ^= n << 4, n ^= n >>> 13, o >= 0 && (i = i + 1640531527 | 0, a = 0 == (r = s[127 & o] ^= n + i) ? a + 1 : 0);
							for (a >= 128 && (s[127 & (t && t.length || 0)] = -1), a = 127, o = 512; o > 0; --o) n = s[a + 34 & 127], r = s[a = a + 1 & 127], n ^= n << 13, r ^= r << 17, n ^= n >>> 15, r ^= r >>> 12, s[a] = n ^ r;
							e.w = i, e.X = s, e.i = a
						}(t, e)
				}

				function a(e, t) {
					return t.i = e.i, t.w = e.w, t.X = e.X.slice(), t
				}

				function o(e, t) {
					null == e && (e = +new Date);
					var r = new n(e),
						o = t && t.state,
						i = function() {
							return (r.next() >>> 0) / 4294967296
						};
					return i.double = function() {
						do {
							var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
						} while (0 === e);
						return e
					}, i.int32 = r.next, i.quick = i, o && (o.X && a(o, r), i.state = function() {
						return a(r, {})
					}), i
				}
				t && t.exports ? t.exports = o : r && r.amd ? r(function() {
					return o
				}) : this.xor4096 = o
			}(0, e, !1)
		}),
		tychei = createCommonjsModule(function(e) {
			! function(e, t, r) {
				function n(e) {
					var t = this,
						r = "";
					t.next = function() {
						var e = t.b,
							r = t.c,
							n = t.d,
							a = t.a;
						return e = e << 25 ^ e >>> 7 ^ r, r = r - n | 0, n = n << 24 ^ n >>> 8 ^ a, a = a - e | 0, t.b = e = e << 20 ^ e >>> 12 ^ r, t.c = r = r - n | 0, t.d = n << 16 ^ r >>> 16 ^ a, t.a = a - e | 0
					}, t.a = 0, t.b = 0, t.c = -1640531527, t.d = 1367130551, e === Math.floor(e) ? (t.a = e / 4294967296 | 0, t.b = 0 | e) : r += e;
					for (var n = 0; n < r.length + 20; n++) t.b ^= 0 | r.charCodeAt(n), t.next()
				}

				function a(e, t) {
					return t.a = e.a, t.b = e.b, t.c = e.c, t.d = e.d, t
				}

				function o(e, t) {
					var r = new n(e),
						o = t && t.state,
						i = function() {
							return (r.next() >>> 0) / 4294967296
						};
					return i.double = function() {
						do {
							var e = ((r.next() >>> 11) + (r.next() >>> 0) / 4294967296) / (1 << 21)
						} while (0 === e);
						return e
					}, i.int32 = r.next, i.quick = i, o && ("object" == typeof o && a(o, r), i.state = function() {
						return a(r, {})
					}), i
				}
				t && t.exports ? t.exports = o : r && r.amd ? r(function() {
					return o
				}) : this.tychei = o
			}(0, e, !1)
		}),
		seedrandom = createCommonjsModule(function(e) {
			! function(t, r) {
				function n(e, n, c) {
					var p = [],
						v = s(i((n = 1 == n ? {
							entropy: !0
						} : n || {}).entropy ? [e, l(t)] : null == e ? u() : e, 3), p),
						b = new a(p),
						x = function() {
							for (var e = b.g(h), t = m, r = 0; e < g;) e = (e + r) * d, t *= d, r = b.g(1);
							for (; e >= y;) e /= 2, t /= 2, r >>>= 1;
							return (e + r) / t
						};
					return x.int32 = function() {
						return 0 | b.g(4)
					}, x.quick = function() {
						return b.g(4) / 4294967296
					}, x.double = x, s(l(b.S), t), (n.pass || c || function(e, t, n, a) {
						return a && (a.S && o(a, b), e.state = function() {
							return o(b, {})
						}), n ? (r[f] = e, t) : e
					})(x, v, "global" in n ? n.global : this == r, n.state)
				}

				function a(e) {
					var t, r = e.length,
						n = this,
						a = 0,
						o = n.i = n.j = 0,
						i = n.S = [];
					for (r || (e = [r++]); a < d;) i[a] = a++;
					for (a = 0; a < d; a++) i[a] = i[o = v & o + e[a % r] + (t = i[a])], i[o] = t;
					(n.g = function(e) {
						for (var t, r = 0, a = n.i, o = n.j, i = n.S; e--;) t = i[a = v & a + 1], r = r * d + i[v & (i[a] = i[o = v & o + t]) + (i[o] = t)];
						return n.i = a, n.j = o, r
					})(d)
				}

				function o(e, t) {
					return t.i = e.i, t.j = e.j, t.S = e.S.slice(), t
				}

				function i(e, t) {
					var r, n = [],
						a = typeof e;
					if (t && "object" == a)
						for (r in e) try {
							n.push(i(e[r], t - 1))
						} catch (e) {}
					return n.length ? n : "string" == a ? e : e + "\0"
				}

				function s(e, t) {
					for (var r, n = e + "", a = 0; a < n.length;) t[v & a] = v & (r ^= 19 * t[v & a]) + n.charCodeAt(a++);
					return l(t)
				}

				function u() {
					try {
						var e;
						return c && (e = c.randomBytes) ? e = e(d) : (e = new Uint8Array(d), (p.crypto || p.msCrypto).getRandomValues(e)), l(e)
					} catch (e) {
						var r = p.navigator,
							n = r && r.plugins;
						return [+new Date, p, n, p.screen, l(t)]
					}
				}

				function l(e) {
					return String.fromCharCode.apply(0, e)
				}
				var c, p = this,
					d = 256,
					h = 6,
					f = "random",
					m = r.pow(d, h),
					g = r.pow(2, 52),
					y = 2 * g,
					v = d - 1;
				if (r["seed" + f] = n, s(r.random(), t), e.exports) {
					e.exports = n;
					try {
						c = require("crypto")
					} catch (e) {}
				}
			}([], Math)
		});
	seedrandom.alea = alea, seedrandom.xor128 = xor128, seedrandom.xorwow = xorwow, seedrandom.xorshift7 = xorshift7, seedrandom.xor4096 = xor4096, seedrandom.tychei = tychei;
	var seedrandom$1 = seedrandom,
		seedrandom_1 = seedrandom$1.alea,
		MPRandGauss = function() {
			function e(e, t, r, n, a) {
				this.mean = e, this.stdDev = t, this.dtype = r, this.nextVal = NaN, this.truncated = n, this.truncated && (this.upper = this.mean + 2 * this.stdDev, this.lower = this.mean - 2 * this.stdDev);
				var o = a || Math.random();
				this.random = seedrandom_1(o.toString())
			}
			return e.prototype.nextValue = function() {
				if (!isNaN(this.nextVal)) {
					var e = this.nextVal;
					return this.nextVal = NaN, e
				}
				for (var t, r, n = !1; !n;) {
					var a = void 0,
						o = void 0,
						i = void 0;
					do {
						i = (a = 2 * this.random() - 1) * a + (o = 2 * this.random() - 1) * o
					} while (i >= 1 || 0 === i);
					var s = Math.sqrt(-2 * Math.log(i) / i);
					t = this.mean + this.stdDev * a * s, r = this.mean + this.stdDev * o * s, this.truncated && !this.isValidTruncated(t) || (n = !0)
				}
				return this.truncated && !this.isValidTruncated(r) || (this.nextVal = this.convertValue(r)), this.convertValue(t)
			}, e.prototype.convertValue = function(e) {
				return null == this.dtype || "float32" === this.dtype ? e : Math.round(e)
			}, e.prototype.isValidTruncated = function(e) {
				return e <= this.upper && e >= this.lower
			}, e
		}(),
		__decorate$1 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		ReductionOps = function() {
			function e() {}
			return e.logSumExp = function(e, t, r) {
				void 0 === t && (t = null), void 0 === r && (r = !1), assertArgumentsAreTensors({
					x: e
				}, "logSumExp");
				var n = parseAxisParam(t, e.shape),
					a = e.max(n, !0),
					o = e.sub(a).exp().sum(n).log(),
					i = a.reshape(o.shape).add(o);
				if (r) {
					var s = expandShapeToKeepDim(i.shape, n);
					return i.reshape(s)
				}
				return i
			}, e.sum = function(e, t, r) {
				void 0 === t && (t = null), void 0 === r && (r = !1), assertArgumentsAreTensors({
					x: e
				}, "sum"), "bool" === e.dtype && (e = e.toInt());
				var n = parseAxisParam(t, e.shape);
				return customGrad(function(e) {
					var t = getAxesPermutation(n, e.rank),
						a = n,
						o = e;
					null != t && (o = e.transpose(t), a = getInnerMostAxes(a.length, e.rank));
					var i = ENV.engine.runKernel(function(e) {
						return e.sum(o, a)
					}, {
						permutedX: o
					});
					if (r) {
						var s = expandShapeToKeepDim(i.shape, n);
						i = i.reshape(s)
					}
					return {
						value: i,
						gradFunc: function(t) {
							var r = e.shape.slice();
							return n.forEach(function(e) {
								r[e] = 1
							}), t.reshape(r).mul(ones(e.shape, "float32"))
						}
					}
				})(e)
			}, e.mean = function(e, t, r) {
				void 0 === t && (t = null), void 0 === r && (r = !1), assertArgumentsAreTensors({
					x: e
				}, "mean");
				var n = parseAxisParam(t, e.shape),
					a = sizeFromShape(computeOutAndReduceShapes(e.shape, n)[1]);
				return customGrad(function(e) {
					var o = scalar(a);
					return {
						value: (o.dtype === e.dtype ? e : e.cast(o.dtype)).div(o).sum(t, r),
						gradFunc: function(t) {
							var r = e.shape.slice();
							return n.forEach(function(e) {
								r[e] = 1
							}), t.reshape(r).mul(ones(e.shape, "float32")).div(o)
						}
					}
				})(e)
			}, e.min = function(e, t, r) {
				void 0 === t && (t = null), void 0 === r && (r = !1), assertArgumentsAreTensors({
					x: e
				}, "min");
				var n = parseAxisParam(t, e.shape),
					a = n,
					o = getAxesPermutation(a, e.rank);
				null != o && (e = e.transpose(o), a = getInnerMostAxes(a.length, e.rank));
				var i = ENV.engine.runKernel(function(t) {
					return t.min(e, a)
				}, {
					x: e
				});
				if (r) {
					var s = expandShapeToKeepDim(i.shape, n);
					return i.reshape(s)
				}
				return i
			}, e.max = function(e, t, r) {
				void 0 === t && (t = null), void 0 === r && (r = !1), assertArgumentsAreTensors({
					x: e
				}, "max");
				var n = parseAxisParam(t, e.shape),
					a = n,
					o = getAxesPermutation(a, e.rank);
				null != o && (e = e.transpose(o), a = getInnerMostAxes(a.length, e.rank));
				var i = ENV.engine.runKernel(function(t) {
					return t.max(e, a)
				}, {
					x: e
				});
				if (r) {
					var s = expandShapeToKeepDim(i.shape, n);
					return i.reshape(s)
				}
				return i
			}, e.argMin = function(e, t) {
				void 0 === t && (t = 0), assertArgumentsAreTensors({
					x: e
				}, "argMin"), null == t && (t = 0);
				var r = parseAxisParam(t, e.shape),
					n = getAxesPermutation(r, e.rank);
				return null != n && (e = e.transpose(n), r = getInnerMostAxes(r.length, e.rank)), ENV.engine.runKernel(function(t) {
					return t.argMin(e, r[0])
				}, {
					x: e
				})
			}, e.argMax = function(e, t) {
				void 0 === t && (t = 0), assertArgumentsAreTensors({
					x: e
				}, "argMax"), null == t && (t = 0);
				var r = parseAxisParam(t, e.shape),
					n = getAxesPermutation(r, e.rank);
				return null != n && (e = e.transpose(n), r = getInnerMostAxes(r.length, e.rank)), ENV.engine.runKernel(function(t) {
					return t.argMax(e, r[0])
				}, {
					x: e
				})
			}, e.moments = function(e, t, r) {
				void 0 === t && (t = null), void 0 === r && (r = !1), assertArgumentsAreTensors({
					x: e
				}, "moments");
				var n = parseAxisParam(t, e.shape),
					a = e.mean(n, r),
					o = a.shape;
				return r || (o = expandShapeToKeepDim(a.shape, n)), {
					mean: a,
					variance: e.toFloat().sub(a.reshape(o)).square().mean(n, r)
				}
			}, e.unsortedSegmentSum = function(e, t, r, n) {
				void 0 === n && (n = 0), assertArgumentsAreTensors({
					x: e,
					segmentIds: t
				}, "unsortedSegmentSum"), assert("int32" === t.dtype, "Segment Ids must be of dtype `int32`"), n = parseAxisParam(n, e.shape)[0];
				for (var a = [], o = t.shape[0], i = [], s = 0; s < e.shape.length; s++) s === n ? i.push(o) : i.push(1);
				for (var u = reshape(t, i), s = 0; s < r; s++) {
					var l = scalar(s, "int32"),
						c = equal(l, u).asType("float32").mul(e).sum(n);
					a.push(c)
				}
				return stack(a, n)
			}, __decorate$1([doc(), operation], e, "logSumExp", null), __decorate$1([doc(), operation], e, "sum", null), __decorate$1([doc(), operation], e, "mean", null), __decorate$1([doc(), operation], e, "min", null), __decorate$1([doc(), operation], e, "max", null), __decorate$1([doc(), operation], e, "argMin", null), __decorate$1([doc(), operation], e, "argMax", null), __decorate$1([doc(), operation], e, "moments", null), __decorate$1([doc(), operation], e, "unsortedSegmentSum", null), e
		}(),
		__decorate$2 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		__awaiter = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		ArrayOps = function() {
			function e() {}
			return e.tensor = function(e, t, r) {
				void 0 === r && (r = "float32");
				var n = inferShape(e);
				return null != t && 1 !== n.length && assertShapesMatch(t, n, "Error creating a new Tensor. Inferred shape (" + n + ") does not match the provided shape (" + t + "). "), isTypedArray(e) || Array.isArray(e) || (e = [e]), t = t || n, Tensor.make(t, {
					values: toTypedArray(e, r)
				}, r)
			}, e.scalar = function(t, r) {
				if (void 0 === r && (r = "float32"), isTypedArray(t) || Array.isArray(t)) throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean)");
				return e.tensor(t, [], r)
			}, e.tensor1d = function(t, r) {
				void 0 === r && (r = "float32");
				var n = inferShape(t);
				if (1 !== n.length) throw new Error("tensor1d() requires values to be a flat/TypedArray");
				return e.tensor(t, n, r)
			}, e.tensor2d = function(t, r, n) {
				if (void 0 === n && (n = "float32"), null != r && 2 !== r.length) throw new Error("tensor2d() requires shape to have two numbers");
				var a = inferShape(t);
				if (2 !== a.length && 1 !== a.length) throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");
				if (1 === a.length && null == r) throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");
				return r = r || a, e.tensor(t, r, n)
			}, e.tensor3d = function(t, r, n) {
				if (void 0 === n && (n = "float32"), null != r && 3 !== r.length) throw new Error("tensor3d() requires shape to have three numbers");
				var a = inferShape(t);
				if (3 !== a.length && 1 !== a.length) throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");
				if (1 === a.length && null == r) throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");
				return r = r || a, e.tensor(t, r, n)
			}, e.tensor4d = function(t, r, n) {
				if (void 0 === n && (n = "float32"), null != r && 4 !== r.length) throw new Error("tensor4d() requires shape to have four numbers");
				var a = inferShape(t);
				if (4 !== a.length && 1 !== a.length) throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");
				if (1 === a.length && null == r) throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");
				return r = r || a, e.tensor(t, r, n)
			}, e.tensor5d = function(t, r, n) {
				if (void 0 === n && (n = "float32"), null != r && 5 !== r.length) throw new Error("tensor5d() requires shape to have five numbers");
				var a = inferShape(t);
				if (5 !== a.length && 1 !== a.length) throw new Error("tensor5d() requires values to be            number[][][][][] or flat/TypedArray");
				if (1 === a.length && null == r) throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");
				return r = r || a, e.tensor(t, r, n)
			}, e.ones = function(e, t) {
				void 0 === t && (t = "float32");
				var r = makeOnesTypedArray(sizeFromShape(e), t);
				return Tensor.make(e, {
					values: r
				}, t)
			}, e.zeros = function(e, t) {
				void 0 === t && (t = "float32");
				var r = makeZerosTypedArray(sizeFromShape(e), t);
				return Tensor.make(e, {
					values: r
				}, t)
			}, e.fill = function(e, t, r) {
				void 0 === r && (r = "float32");
				var n = getTypedArrayFromDType(r, sizeFromShape(e));
				return n.fill(t), Tensor.make(e, {
					values: n
				}, r)
			}, e.onesLike = function(t) {
				return assertArgumentsAreTensors({
					x: t
				}, "onesLike"), e.ones(t.shape, t.dtype)
			}, e.zerosLike = function(t) {
				return assertArgumentsAreTensors({
					x: t
				}, "zerosLike"), e.zeros(t.shape, t.dtype)
			}, e.clone = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "clone");
				return ENV.engine.runKernel(function(t) {
					return Tensor.make(e.shape, {
						dataId: e.dataId
					}, e.dtype)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return e.toFloat()
						}
					}
				})
			}, e.eye = function(t, r, n, a) {
				void 0 === a && (a = "float32"), null == r && (r = t);
				for (var o = e.buffer([t, r], a), i = t <= r ? t : r, s = 0; s < i; ++s) o.set(1, s, s);
				var u = o.toTensor().as2D(t, r);
				if (null == n) return u;
				if (1 === n.length) return e.tile(e.expandDims(u, 0), [n[0], 1, 1]);
				if (2 === n.length) return e.tile(e.expandDims(e.expandDims(u, 0), 0), [n[0], n[1], 1, 1]);
				throw new Error("eye() currently supports only 1D and 2D batchShapes, but received " + n.length + "D.")
			}, e.randomNormal = function(t, r, n, a, o) {
				if (void 0 === r && (r = 0), void 0 === n && (n = 1), null != a && "bool" === a) throw new Error("Unsupported data type " + a);
				for (var i = new MPRandGauss(r, n, a, !1, o), s = e.buffer(t, a), u = 0; u < s.values.length; u++) s.values[u] = i.nextValue();
				return s.toTensor()
			}, e.truncatedNormal = function(t, r, n, a, o) {
				if (void 0 === r && (r = 0), void 0 === n && (n = 1), null != a && "bool" === a) throw new Error("Unsupported data type " + a);
				for (var i = new MPRandGauss(r, n, a, !0, o), s = e.buffer(t, a), u = 0; u < s.values.length; u++) s.values[u] = i.nextValue();
				return s.toTensor()
			}, e.randomUniform = function(t, r, n, a) {
				void 0 === r && (r = 0), void 0 === n && (n = 1), void 0 === a && (a = "float32");
				for (var o = e.buffer(t, a), i = 0; i < o.values.length; i++) o.values[i] = randUniform(r, n);
				return o.toTensor()
			}, e.rand = function(e, t, r) {
				var n = sizeFromShape(e),
					a = null;
				if (null == r || "float32" === r) a = new Float32Array(n);
				else if ("int32" === r) a = new Int32Array(n);
				else {
					if ("bool" !== r) throw new Error("Unknown data type " + r);
					a = new Uint8Array(n)
				}
				for (var o = 0; o < n; o++) a[o] = t();
				return Tensor.make(e, {
					values: a
				}, r)
			}, e.multinomial = function(e, t, r, n) {
				void 0 === n && (n = !1), assertArgumentsAreTensors({
					logits: e
				}, "multinomial");
				var a = e.size,
					o = e.rank;
				if (a < 2) throw new Error("Error in multinomial: you need at least 2 outcomes, but got " + a + ".");
				if (o > 2) throw new Error("Rank of probabilities must be 1 or 2, but is " + o);
				r = r || Math.random();
				var i = 1 === o ? e.as2D(1, -1) : e,
					s = ENV.engine.runKernel(function(e) {
						return e.multinomial(i, n, t, r)
					}, {
						logits2D: i
					});
				return 1 === o ? s.as1D() : s
			}, e.oneHot = function(e, t, r, n) {
				if (void 0 === r && (r = 1), void 0 === n && (n = 0), assert("int32" === e.dtype, "Indices must be of dtype `int32`"), t < 2) throw new Error("Error in oneHot: depth must be >=2, but it is " + t);
				return ENV.engine.runKernel(function(a) {
					return a.oneHot(e, t, r, n)
				}, {
					indices: e
				})
			}, e.fromPixels = function(e, t) {
				if (void 0 === t && (t = 3), t > 4) throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");
				return ENV.engine.fromPixels(e, t)
			}, e.toPixels = function(e, t) {
				return __awaiter(this, void 0, void 0, function() {
					var r, n, a, o, i, s, u, l, c, p, d, h, f, m, g, y, v, b, x;
					return __generator(this, function(w) {
						switch (w.label) {
							case 0:
								if (assertArgumentsAreTensors({
										img: e
									}, "toPixels"), 2 !== e.rank && 3 !== e.rank) throw new Error("toPixels only supports rank 2 or 3 tensors, got rank " + e.rank + ".");
								if (r = e.shape.slice(0, 2), n = r[0], a = r[1], (o = 2 === e.rank ? 1 : e.shape[2]) > 4 || 2 === o) throw new Error("toPixels only supports depth of size 1, 3 or 4 but got " + o);
								return i = e.min(), s = e.max(), [4, i.data()];
							case 1:
								return u = w.sent()[0], [4, s.data()];
							case 2:
								if (l = w.sent()[0], i.dispose(), s.dispose(), "float32" === e.dtype) {
									if (u < 0 || l > 1) throw new Error("Tensor values for a float32 Tensor must be in the range [0 - 1] but got range [" + u + " - " + l + "].")
								} else {
									if ("int32" !== e.dtype) throw new Error("Unsupported type for toPixels: " + e.dtype + ". Please use float32 or int32 tensors.");
									if (u < 0 || l > 255) throw new Error("Tensor values for a int32 Tensor must be in the range [0 - 255] but got range [" + u + " - " + l + "].")
								}
								return [4, e.data()];
							case 3:
								for (c = w.sent(), p = "float32" === e.dtype ? 255 : 1, d = new Uint8ClampedArray(a * n * 4), h = 0; h < n * a; ++h) f = void 0, m = void 0, g = void 0, y = void 0, 1 === o ? (f = c[h] * p, m = c[h] * p, g = c[h] * p, y = 255) : 3 === o ? (f = c[3 * h] * p, m = c[3 * h + 1] * p, g = c[3 * h + 2] * p, y = 255) : 4 === o && (f = c[4 * h] * p, m = c[4 * h + 1] * p, g = c[4 * h + 2] * p, y = c[4 * h + 3] * p), d[(v = 4 * h) + 0] = Math.round(f), d[v + 1] = Math.round(m), d[v + 2] = Math.round(g), d[v + 3] = Math.round(y);
								return null != t && (t.width = a, t.height = n, b = t.getContext("2d"), x = new ImageData(d, a, n), b.putImageData(x, 0, 0)), [2, d]
						}
					})
				})
			}, e.reshape = function(e, t) {
				assertArgumentsAreTensors({
					x: e
				}, "reshape"), t = inferFromImplicitShape(t, e.size), assert(e.size === sizeFromShape(t), "new shape and old shape must have the same number of elements.");
				return ENV.engine.runKernel(function(r) {
					return r.reshape(e, t)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.reshape(e.shape)
						}
					}
				})
			}, e.squeeze = function(t, r) {
				return assertArgumentsAreTensors({
					x: t
				}, "squeeze"), e.reshape(t, squeezeShape(t.shape, r).newShape)
			}, e.cast = function(e, t) {
				assertArgumentsAreTensors({
					x: e
				}, "cast");
				return ENV.engine.runKernel(function(r) {
					return r.cast(e, t)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return e.clone()
						}
					}
				})
			}, e.tile = function(t, r) {
				assertArgumentsAreTensors({
					x: t
				}, "tile"), assert(t.rank === r.length, "Error in transpose: rank of input " + t.rank + " must match length of reps " + r + ".");
				return ENV.engine.runKernel(function(e) {
					return e.tile(t, r)
				}, {
					x: t
				}, function(n) {
					return {
						x: function() {
							var a = e.zerosLike(t);
							if (1 === t.rank)
								for (o = 0; o < r[0]; ++o) a = a.add(n.slice([o * t.shape[0]], [t.shape[0]]));
							else if (2 === t.rank)
								for (o = 0; o < r[0]; ++o)
									for (i = 0; i < r[1]; ++i) a = a.add(n.slice([o * t.shape[0], i * t.shape[1]], [t.shape[0], t.shape[1]]));
							else if (3 === t.rank)
								for (o = 0; o < r[0]; ++o)
									for (i = 0; i < r[1]; ++i)
										for (s = 0; s < r[2]; ++s) a = a.add(n.slice([o * t.shape[0], i * t.shape[1], s * t.shape[2]], [t.shape[0], t.shape[1], t.shape[2]]));
							else {
								if (4 !== t.rank) throw new Error("Gradient for tile operation is not implemented for rank-" + t.rank + " tensors yet.");
								for (var o = 0; o < r[0]; ++o)
									for (var i = 0; i < r[1]; ++i)
										for (var s = 0; s < r[2]; ++s)
											for (var u = 0; u < r[3]; ++u) a = a.add(n.slice([o * t.shape[0], i * t.shape[1], s * t.shape[2], u * t.shape[3]], [t.shape[0], t.shape[1], t.shape[2], t.shape[3]]))
							}
							return a
						}
					}
				})
			}, e.gather = function(e, t, r) {
				void 0 === r && (r = 0), assertArgumentsAreTensors({
					x: e,
					indices: t
				}, "gather"), assert("int32" === t.dtype, "Indices must be of dtype `int32`"), r = parseAxisParam(r, e.shape)[0];
				return ENV.engine.runKernel(function(n) {
					return n.gather(e, t, r)
				}, {
					x: e
				}, function(n) {
					return {
						x: function() {
							return ReductionOps.unsortedSegmentSum(n, t, e.shape[r], r)
						}
					}
				})
			}, e.pad1d = function(t, r, n) {
				return void 0 === n && (n = 0), assert(2 === r.length, "Invalid number of paddings. Must be length of 2."), e.pad(t, [r], n)
			}, e.pad2d = function(t, r, n) {
				return void 0 === n && (n = 0), assert(2 === r.length && 2 === r[0].length && 2 === r[1].length, "Invalid number of paddings. Must be length of 2 each."), e.pad(t, r, n)
			}, e.pad3d = function(t, r, n) {
				return void 0 === n && (n = 0), assert(3 === r.length && 2 === r[0].length && 2 === r[1].length && 2 === r[2].length, "Invalid number of paddings. Must be length of 2 each."), e.pad(t, r, n)
			}, e.pad4d = function(t, r, n) {
				return void 0 === n && (n = 0), assert(4 === r.length && 2 === r[0].length && 2 === r[1].length && 2 === r[2].length && 2 === r[3].length, "Invalid number of paddings. Must be length of 2 each."), e.pad(t, r, n)
			}, e.pad = function(e, t, r) {
				if (void 0 === r && (r = 0), assertArgumentsAreTensors({
						x: e
					}, "pad"), 0 === e.rank) throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");
				var n = t.map(function(e) {
					return e[0]
				});
				return ENV.engine.runKernel(function(n) {
					return n.pad(e, t, r)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.slice(n, e.shape)
						}
					}
				})
			}, e.stack = function(e, t) {
				if (void 0 === t && (t = 0), assertArgumentsAreTensors({
						tensors: e
					}, "stack"), assert(e.length >= 1, "Pass at least one tensor to tf.stack"), 1 === e.length) return e[0].expandDims(t);
				var r = e[0].rank,
					n = e[0].shape,
					a = e[0].dtype;
				assert(t <= r, "Axis must be <= rank of the tensor"), e.forEach(function(e) {
					assertShapesMatch(n, e.shape, "All tensors passed to stack must have matching shapes")
				}), e.forEach(function(e) {
					assert(a === e.dtype, "All tensors passed to stack must have matching dtypes")
				});
				var o = e.map(function(e) {
					return e.expandDims(t)
				});
				return ConcatOps.concat(o, t)
			}, e.unstack = function(e, t) {
				void 0 === t && (t = 0);
				for (var r = e.shape[t], n = Array(e.rank - 1).fill(0), a = 0, o = 0; o < e.rank; o++) o !== t && (n[a] = e.shape[o], a++);
				var i;
				i = Array(r).fill(1);
				var s = Array(e.rank).fill(0),
					u = e.shape.slice();
				return i.map(function(r) {
					u[t] = r;
					var a = e.slice(s, u);
					return s[t] += r, a.reshape(n)
				})
			}, e.split = function(e, t, r) {
				void 0 === r && (r = 0), assertArgumentsAreTensors({
					x: e
				}, "split"), r = parseAxisParam(r, e.shape)[0];
				var n;
				"number" == typeof t ? (assert(e.shape[r] % t == 0, "Number of splits must evenly divide the axis."), n = Array(t).fill(e.shape[r] / t)) : (assert(e.shape[r] === t.reduce(function(e, t) {
					return e + t
				}), "The sum of sizes must match the size of the axis dimension."), n = t);
				var a = Array(e.rank).fill(0),
					o = e.shape.slice();
				return n.map(function(t) {
					o[r] = t;
					var n = e.slice(a, o);
					return a[r] += t, n
				})
			}, e.cumsum = function(e, t, r, n) {
				void 0 === t && (t = 0), void 0 === r && (r = !1), void 0 === n && (n = !1), assertArgumentsAreTensors({
					x: e
				}, "cumsum");
				var a = getAxesPermutation([t |= 0], e.rank),
					o = e;
				null != a && (o = e.transpose(a));
				var i = getInnerMostAxes(1, e.rank)[0],
					s = ENV.engine.runKernel(function(e) {
						return e.cumsum(o, i, r, n)
					}, {
						permutedX: o
					}, function(e) {
						return {
							permutedX: function() {
								return e.cumsum(t, r, !n)
							}
						}
					});
				return null != a && (s = s.transpose(a)), s
			}, e.expandDims = function(t, r) {
				void 0 === r && (r = 0), assertArgumentsAreTensors({
					x: t
				}, "expandDims"), assert(r <= t.rank, "Axis must be <= rank of the tensor");
				var n = t.shape.slice();
				return n.splice(r, 0, 1), e.reshape(t, n)
			}, e.linspace = function(t, r, n) {
				if (0 === n) throw new Error("Cannot request zero samples");
				var a = (r - t) / (n - 1),
					o = makeZerosTypedArray(n, "float32");
				o[0] = t;
				for (var i = 1; i < o.length; i++) o[i] = o[i - 1] + a;
				return e.tensor1d(o, "float32")
			}, e.range = function(t, r, n, a) {
				if (void 0 === n && (n = 1), void 0 === a && (a = "float32"), 0 === n) throw new Error("Cannot have a step of zero");
				var o = t === r,
					i = t < r && n < 0,
					s = r < t && n > 1;
				if (o || i || s) return e.zeros([0], a);
				var u = makeZerosTypedArray(Math.abs(Math.ceil((r - t) / n)), a);
				r < t && 1 === n && (n = -1), u[0] = t;
				for (var l = 1; l < u.length; l++) u[l] = u[l - 1] + n;
				return e.tensor1d(u, a)
			}, e.buffer = function(e, t, r) {
				return void 0 === t && (t = "float32"), new TensorBuffer(e, t, r)
			}, e.print = function(e, t) {
				void 0 === t && (t = !1), console.log(tensorToString(e, t))
			}, __decorate$2([doc()], e, "tensor", null), __decorate$2([doc()], e, "scalar", null), __decorate$2([doc()], e, "tensor1d", null), __decorate$2([doc()], e, "tensor2d", null), __decorate$2([doc()], e, "tensor3d", null), __decorate$2([doc()], e, "tensor4d", null), __decorate$2([doc()], e, "tensor5d", null), __decorate$2([doc(), operation], e, "ones", null), __decorate$2([doc(), operation], e, "zeros", null), __decorate$2([doc(), operation], e, "fill", null), __decorate$2([doc(), operation], e, "onesLike", null), __decorate$2([doc(), operation], e, "zerosLike", null), __decorate$2([doc(), operation], e, "clone", null), __decorate$2([doc(), operation], e, "eye", null), __decorate$2([doc(), operation], e, "randomNormal", null), __decorate$2([doc(), operation], e, "truncatedNormal", null), __decorate$2([doc(), operation], e, "randomUniform", null), __decorate$2([operation], e, "rand", null), __decorate$2([operation], e, "multinomial", null), __decorate$2([doc(), operation], e, "oneHot", null), __decorate$2([doc(), operation], e, "fromPixels", null), __decorate$2([doc()], e, "toPixels", null), __decorate$2([doc(), operation], e, "reshape", null), __decorate$2([doc()], e, "squeeze", null), __decorate$2([doc(), operation], e, "cast", null), __decorate$2([doc(), operation], e, "tile", null), __decorate$2([doc(), operation], e, "gather", null), __decorate$2([doc(), operation], e, "pad", null), __decorate$2([doc(), operation], e, "stack", null), __decorate$2([doc(), operation], e, "unstack", null), __decorate$2([doc(), operation], e, "split", null), __decorate$2([doc()], e, "cumsum", null), __decorate$2([doc(), operation], e, "expandDims", null), __decorate$2([operation, doc()], e, "linspace", null), __decorate$2([operation, doc()], e, "range", null), __decorate$2([doc()], e, "buffer", null), __decorate$2([doc()], e, "print", null), e
		}(),
		__decorate$3 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		BatchNormOps = function() {
			function e() {}
			return e.batchNormalization2d = function(t, r, n, a, o, i) {
				return void 0 === a && (a = .001), assert(2 === t.rank, "Error in batchNormalization3D: x must be rank 3 but got rank " + t.rank + "."), assert(2 === r.rank || 1 === r.rank, "Error in batchNormalization2D: mean must be rank 2 or rank 1 but got rank " + r.rank + "."), assert(2 === n.rank || 1 === n.rank, "Error in batchNormalization2D: variance must be rank 2 or rank 1 but got rank " + n.rank + "."), null != o && assert(2 === o.rank || 1 === o.rank, "Error in batchNormalization2D: scale must be rank 2 or rank 1 but got rank " + o.rank + "."), null != i && assert(2 === i.rank || 1 === i.rank, "Error in batchNormalization2D: offset must be rank 2 or rank 1 but got rank " + i.rank + "."), e.batchNormalization(t, r, n, a, o, i)
			}, e.batchNormalization3d = function(t, r, n, a, o, i) {
				return void 0 === a && (a = .001), assert(3 === t.rank, "Error in batchNormalization3D: x must be rank 3 but got rank " + t.rank + "."), assert(3 === r.rank || 1 === r.rank, "Error in batchNormalization3D: mean must be rank 3 or rank 1 but got rank " + r.rank + "."), assert(3 === n.rank || 1 === n.rank, "Error in batchNormalization3D: variance must be rank 3 or rank 1 but got rank " + n.rank + "."), null != o && assert(3 === o.rank || 1 === o.rank, "Error in batchNormalization3D: scale must be rank 3 or rank 1 but got rank " + o.rank + "."), null != i && assert(3 === i.rank || 1 === i.rank, "Error in batchNormalization3D: offset must be rank 3 or rank 1 but got rank " + i.rank + "."), e.batchNormalization(t, r, n, a, o, i)
			}, e.batchNormalization4d = function(t, r, n, a, o, i) {
				return void 0 === a && (a = .001), assert(4 === t.rank, "Error in batchNormalization4D: x must be rank 4 but got rank " + t.rank + "."), assert(4 === r.rank || 1 === r.rank, "Error in batchNormalization4D: mean must be rank 4 or rank 1 but got rank " + r.rank + "."), assert(4 === n.rank || 1 === n.rank, "Error in batchNormalization4D: variance must be rank 4 or rank 1 but got rank " + n.rank + "."), null != o && assert(4 === o.rank || 1 === o.rank, "Error in batchNormalization4D: scale must be rank 4 or rank 1 but got rank " + o.rank + "."), null != i && assert(4 === i.rank || 1 === i.rank, "Error in batchNormalization4D: offset must be rank 4 or rank 1 but got rank " + i.rank + "."), e.batchNormalization(t, r, n, a, o, i)
			}, e.batchNormalization = function(e, t, r, n, a, o) {
				void 0 === n && (n = .001), assertArgumentsAreTensors({
					x: e,
					mean: t,
					variance: r
				}, "batchNormalization"), null != a && assertArgumentsAreTensors({
					scale: a
				}, "batchNormalization"), null != o && assertArgumentsAreTensors({
					offset: o
				}, "batchNormalization"), assert(t.rank === r.rank, "Batch normalization gradient requires mean and variance to have equal ranks."), assert(null == o || t.rank === o.rank, "Batch normalization gradient requires mean and offset to have equal ranks."), assert(null == a || t.rank === a.rank, "Batch normalization gradient requires mean and scale to have equal ranks.");
				var i;
				i = 0 === e.rank || 1 === e.rank ? e.as4D(1, 1, 1, e.size) : 2 === e.rank ? e.as4D(1, 1, e.shape[0], e.shape[1]) : 3 === e.rank ? e.as4D(1, e.shape[0], e.shape[1], e.shape[2]) : e;
				return ENV.engine.runKernel(function(e) {
					return e.batchNormalization(i, batchnormReshape4D(t), batchnormReshape4D(r), n, batchnormReshape4D(a), batchnormReshape4D(o))
				}, {
					x: e,
					mean: t,
					variance: r,
					scale: a,
					offset: o
				}, function(o) {
					var s = null == a ? ArrayOps.scalar(1) : a,
						u = getReductionAxes(t.shape, i.shape),
						l = [];
					if (1 === t.rank) {
						for (var c = 0; c < i.shape.length - 1; ++c) l.push(i.shape[c]);
						l.push(1)
					}
					var p = e.sub(t),
						d = o.mul(s),
						h = rsqrt(r.add(ArrayOps.scalar(n))),
						f = h.mul(h).mul(h).mul(ArrayOps.scalar(-.5));
					return {
						x: function() {
							return 1 === t.rank ? o.mul(ArrayOps.tile(h.as4D(1, 1, 1, t.shape[0]), l)).mul(s).reshape(e.shape) : o.mul(h).mul(s).reshape(e.shape)
						},
						mean: function() {
							var e = h.mul(ArrayOps.scalar(-1)).mul(d);
							return 1 === t.rank && (e = e.sum(u)), e.reshape(t.shape)
						},
						variance: function() {
							var e = f.mul(p).mul(d);
							return 1 === t.rank && (e = e.sum(u)), e.reshape(t.shape)
						},
						scale: function() {
							var e = p.mul(h),
								r = o.mul(e);
							return 1 === t.rank && (r = r.sum(u)), r.reshape(t.shape)
						},
						offset: function() {
							var e = o;
							return 1 === t.rank && (e = e.sum(u)), e.reshape(t.shape)
						}
					}
				}).reshape(e.shape)
			}, __decorate$3([operation], e, "batchNormalization2d", null), __decorate$3([operation], e, "batchNormalization3d", null), __decorate$3([operation], e, "batchNormalization4d", null), __decorate$3([doc()], e, "batchNormalization", null), e
		}(),
		DType;
	! function(e) {
		e.float32 = "float32", e.int32 = "int32", e.bool = "bool"
	}(DType || (DType = {})),
	function(e) {
		e.R0 = "R0", e.R1 = "R1", e.R2 = "R2", e.R3 = "R3", e.R4 = "R4", e.R5 = "R5"
	}(exports.Rank || (exports.Rank = {}));
	var UpcastInt32AndMap;
	! function(e) {
		e.float32 = "float32", e.int32 = "int32", e.bool = "int32"
	}(UpcastInt32AndMap || (UpcastInt32AndMap = {}));
	var UpcastBoolAndMap;
	! function(e) {
		e.float32 = "float32", e.int32 = "int32", e.bool = "bool"
	}(UpcastBoolAndMap || (UpcastBoolAndMap = {}));
	var UpcastFloat32AndMap;
	! function(e) {
		e.float32 = "float32", e.int32 = "float32", e.bool = "float32"
	}(UpcastFloat32AndMap || (UpcastFloat32AndMap = {}));
	var upcastTypeMap = {
			float32: UpcastFloat32AndMap,
			int32: UpcastInt32AndMap,
			bool: UpcastBoolAndMap
		},
		__decorate$4 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		BinaryOps = function() {
			function e() {}
			return e.add = function(e, t) {
				assertArgumentsAreTensors({
					a: e,
					b: t
				}, "add"), assertTypesMatch(e, t);
				var r = assertAndGetBroadcastShape(e.shape, t.shape);
				return ENV.engine.runKernel(function(r) {
					return r.add(e, t)
				}, {
					a: e,
					b: t
				}, function(n) {
					return {
						a: function() {
							var t = n,
								a = getReductionAxes(e.shape, r);
							return a.length > 0 && (t = t.sum(a)), t.reshape(e.shape)
						},
						b: function() {
							var e = n,
								a = getReductionAxes(t.shape, r);
							return a.length > 0 && (e = e.sum(a)), e.reshape(t.shape)
						}
					}
				})
			}, e.addStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in addStrict: "), e.add(t)
			}, e.sub = function(e, t) {
				assertArgumentsAreTensors({
					a: e,
					b: t
				}, "sub"), assertTypesMatch(e, t);
				var r = assertAndGetBroadcastShape(e.shape, t.shape);
				return ENV.engine.runKernel(function(r) {
					return r.subtract(e, t)
				}, {
					a: e,
					b: t
				}, function(n) {
					return {
						a: function() {
							var t = n,
								a = getReductionAxes(e.shape, r);
							return a.length > 0 && (t = t.sum(a)), t.reshape(e.shape)
						},
						b: function() {
							var e = n,
								a = getReductionAxes(t.shape, r);
							return a.length > 0 && (e = e.sum(a)), e.neg().reshape(t.shape)
						}
					}
				})
			}, e.subStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in subStrict: "), e.sub(t)
			}, e.pow = function(e, t) {
				assertArgumentsAreTensors({
					base: e,
					exp: t
				}, "pow");
				var r = assertAndGetBroadcastShape(e.shape, t.shape);
				e = e.cast(upcastType(e.dtype, t.dtype)), t = t.cast(upcastType(e.dtype, t.dtype));
				return ENV.engine.runKernel(function(r, n) {
					return n(r.pow(e, t))
				}, {
					base: e,
					exp: t
				}, function(n, a) {
					var o = a[0];
					return {
						base: function() {
							var a = n.mul(t.toFloat().mul(o.div(e))),
								i = getReductionAxes(e.shape, r);
							return i.length > 0 && (a = a.sum(i)), a.reshape(e.shape)
						},
						exp: function() {
							var a = n.mul(o.mul(e.log()).toFloat()),
								i = getReductionAxes(t.shape, r);
							return i.length > 0 && (a = a.sum(i)), a.reshape(t.shape)
						}
					}
				})
			}, e.powStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in powStrict: "), e.pow(t)
			}, e.mul = function(e, t) {
				assertArgumentsAreTensors({
					a: e,
					b: t
				}, "mul"), assertTypesMatch(e, t);
				var r = assertAndGetBroadcastShape(e.shape, t.shape);
				return ENV.engine.runKernel(function(r) {
					return r.multiply(e, t)
				}, {
					a: e,
					b: t
				}, function(n) {
					return {
						a: function() {
							var a = n.mul(t.toFloat()),
								o = getReductionAxes(e.shape, r);
							return o.length > 0 ? a.sum(o).reshape(e.shape) : a
						},
						b: function() {
							var a = n.mul(e.toFloat()),
								o = getReductionAxes(t.shape, r);
							return o.length > 0 ? a.sum(o).reshape(t.shape) : a
						}
					}
				})
			}, e.mulStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in multiplyStrict: "), e.mul(t)
			}, e.div = function(t, r) {
				assertArgumentsAreTensors({
					a: t,
					b: r
				}, "div"), assertTypesMatch(t, r);
				var n;
				if ("int32" === t.dtype && "int32" === r.dtype) return e.floorDiv(t, r);
				n = function(e) {
					return e.realDivide(t, r)
				};
				var a = assertAndGetBroadcastShape(t.shape, r.shape);
				return ENV.engine.runKernel(n, {
					a: t,
					b: r
				}, function(e) {
					return {
						a: function() {
							var n = e.div(r.toFloat()),
								o = getReductionAxes(t.shape, a);
							return o.length > 0 ? n.sum(o).reshape(t.shape) : n
						},
						b: function() {
							var n = e.mul(t.toFloat()),
								o = getReductionAxes(r.shape, a);
							o.length > 0 && (n = n.sum(o).reshape(r.shape));
							var i = r.square();
							return n.div(i.toFloat()).neg()
						}
					}
				})
			}, e.floorDiv = function(e, t) {
				assertArgumentsAreTensors({
					a: e,
					b: t
				}, "floorDiv"), assertTypesMatch(e, t);
				var r = assertAndGetBroadcastShape(e.shape, t.shape);
				return ENV.engine.runKernel(function(r) {
					return r.floorDiv(e, t)
				}, {
					a: e,
					b: t
				}, function(n) {
					return {
						a: function() {
							var a = n.div(t.toFloat()),
								o = getReductionAxes(e.shape, r);
							return o.length > 0 ? a.sum(o).reshape(e.shape) : a
						},
						b: function() {
							var a = n.mul(e.toFloat()),
								o = getReductionAxes(t.shape, r);
							o.length > 0 && (a = a.sum(o).reshape(t.shape));
							var i = t.square();
							return a.div(i.toFloat()).neg()
						}
					}
				})
			}, e.divStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in divideStrict: "), e.div(t)
			}, e.mod = function(e, t) {
				assertArgumentsAreTensors({
					a: e,
					b: t
				}, "mod"), assertTypesMatch(e, t);
				var r = assertAndGetBroadcastShape(e.shape, t.shape);
				return ENV.engine.runKernel(function(r) {
					return r.mod(e, t)
				}, {
					a: e,
					b: t
				}, function(n) {
					return {
						a: function() {
							var t = getReductionAxes(e.shape, r);
							return t.length > 0 ? n.sum(t).reshape(e.shape) : n
						},
						b: function() {
							var a = n.mul(e.div(t).floor().neg()),
								o = getReductionAxes(t.shape, r);
							return o.length > 0 ? a.sum(o).reshape(t.shape) : a
						}
					}
				})
			}, e.modStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in modStrict: "), e.mod(t)
			}, e.minimum = function(e, t) {
				assertArgumentsAreTensors({
					a: e,
					b: t
				}, "minimum"), assertTypesMatch(e, t), "bool" === e.dtype && (e = e.toInt()), "bool" === t.dtype && (t = t.toInt()), assertAndGetBroadcastShape(e.shape, t.shape);
				return ENV.engine.runKernel(function(r) {
					return r.minimum(e, t)
				}, {
					a: e,
					b: t
				}, function(r) {
					return {
						a: function() {
							return r.mul(e.lessEqual(t).toFloat())
						},
						b: function() {
							return r.mul(e.greater(t).toFloat())
						}
					}
				})
			}, e.minimumStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in minimumStrict: "), e.minimum(t)
			}, e.maximum = function(e, t) {
				assertArgumentsAreTensors({
					a: e,
					b: t
				}, "maximum"), assertTypesMatch(e, t), "bool" === e.dtype && (e = e.toInt()), "bool" === t.dtype && (t = t.toInt()), assertAndGetBroadcastShape(e.shape, t.shape);
				return ENV.engine.runKernel(function(r) {
					return r.maximum(e, t)
				}, {
					a: e,
					b: t
				}, function(r) {
					return {
						a: function() {
							return r.mul(e.greaterEqual(t).toFloat())
						},
						b: function() {
							return r.mul(e.less(t).toFloat())
						}
					}
				})
			}, e.maximumStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in minimumStrict: "), e.maximum(t)
			}, e.squaredDifference = function(e, t) {
				assertArgumentsAreTensors({
					a: e,
					b: t
				}, "squaredDifference"), assertTypesMatch(e, t), assertAndGetBroadcastShape(e.shape, t.shape);
				return ENV.engine.runKernel(function(r) {
					return r.squaredDifference(e, t)
				}, {
					a: e,
					b: t
				}, function(r) {
					var n = scalar(2);
					return {
						a: function() {
							return r.mul(e.sub(t).mul(n))
						},
						b: function() {
							return r.mul(t.sub(e).mul(n))
						}
					}
				})
			}, e.squaredDifferenceStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in squaredDifferenceStrict: "), e.squaredDifference(t)
			}, e.atan2 = function(t, r) {
				assertArgumentsAreTensors({
					a: t,
					b: r
				}, "atan2"), assertTypesMatch(t, r);
				var n = assertAndGetBroadcastShape(t.shape, r.shape);
				return ENV.engine.runKernel(function(e) {
					return e.atan2(t, r)
				}, {
					a: t,
					b: r
				}, function(a) {
					return {
						a: function() {
							var o = e.add(square(t), square(r)),
								i = a.mul(r.div(o)),
								s = getReductionAxes(t.shape, n);
							return s.length > 0 && (i = i.sum(s)), i.reshape(t.shape)
						},
						b: function() {
							var o = e.add(square(t), square(r)),
								i = neg(a.mul(t.div(o))),
								s = getReductionAxes(r.shape, n);
							return s.length > 0 && (i = i.sum(s)), i.reshape(r.shape)
						}
					}
				})
			}, __decorate$4([doc(), operation], e, "add", null), __decorate$4([operation], e, "addStrict", null), __decorate$4([doc(), operation], e, "sub", null), __decorate$4([operation], e, "subStrict", null), __decorate$4([doc(), operation], e, "pow", null), __decorate$4([operation], e, "powStrict", null), __decorate$4([doc(), operation], e, "mul", null), __decorate$4([operation], e, "mulStrict", null), __decorate$4([doc(), operation], e, "div", null), __decorate$4([doc(), operation], e, "floorDiv", null), __decorate$4([operation], e, "divStrict", null), __decorate$4([doc(), operation], e, "mod", null), __decorate$4([operation], e, "modStrict", null), __decorate$4([doc(), operation], e, "minimum", null), __decorate$4([operation], e, "minimumStrict", null), __decorate$4([doc(), operation], e, "maximum", null), __decorate$4([operation], e, "maximumStrict", null), __decorate$4([doc(), operation], e, "squaredDifference", null), __decorate$4([operation], e, "squaredDifferenceStrict", null), __decorate$4([operation], e, "atan2", null), e
		}(),
		__decorate$5 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		CompareOps = function() {
			function e() {}
			return e.notEqual = function(e, t) {
				return assertArgumentsAreTensors({
					a: e,
					b: t
				}, "notEqual"), assertTypesMatch(e, t), assertAndGetBroadcastShape(e.shape, t.shape), ENV.engine.runKernel(function(r) {
					return r.notEqual(e, t)
				}, {
					a: e,
					b: t
				})
			}, e.notEqualStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in notEqualStrict: "), e.notEqual(t)
			}, e.less = function(e, t) {
				return assertArgumentsAreTensors({
					a: e,
					b: t
				}, "less"), assertTypesMatch(e, t), assertAndGetBroadcastShape(e.shape, t.shape), ENV.engine.runKernel(function(r) {
					return r.less(e, t)
				}, {
					a: e,
					b: t
				})
			}, e.lessStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in lessStrict: "), e.less(t)
			}, e.equal = function(e, t) {
				return assertArgumentsAreTensors({
					a: e,
					b: t
				}, "equal"), assertTypesMatch(e, t), assertAndGetBroadcastShape(e.shape, t.shape), ENV.engine.runKernel(function(r) {
					return r.equal(e, t)
				}, {
					a: e,
					b: t
				})
			}, e.equalStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in equalStrict: "), e.equal(t)
			}, e.lessEqual = function(e, t) {
				return assertArgumentsAreTensors({
					a: e,
					b: t
				}, "lessEqual"), assertTypesMatch(e, t), assertAndGetBroadcastShape(e.shape, t.shape), ENV.engine.runKernel(function(r) {
					return r.lessEqual(e, t)
				}, {
					a: e,
					b: t
				})
			}, e.lessEqualStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in lessEqualStrict: "), e.lessEqual(t)
			}, e.greater = function(e, t) {
				return assertArgumentsAreTensors({
					a: e,
					b: t
				}, "greater"), assertTypesMatch(e, t), assertAndGetBroadcastShape(e.shape, t.shape), ENV.engine.runKernel(function(r) {
					return r.greater(e, t)
				}, {
					a: e,
					b: t
				})
			}, e.greaterStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in greaterStrict: "), e.greater(t)
			}, e.greaterEqual = function(e, t) {
				return assertArgumentsAreTensors({
					a: e,
					b: t
				}, "greaterEqual"), assertTypesMatch(e, t), assertAndGetBroadcastShape(e.shape, t.shape), ENV.engine.runKernel(function(r) {
					return r.greaterEqual(e, t)
				}, {
					a: e,
					b: t
				})
			}, e.greaterEqualStrict = function(e, t) {
				return assertShapesMatch(e.shape, t.shape, "Error in greaterEqualStrict: "), e.greaterEqual(t)
			}, __decorate$5([doc(), operation], e, "notEqual", null), __decorate$5([operation], e, "notEqualStrict", null), __decorate$5([doc(), operation], e, "less", null), __decorate$5([operation], e, "lessStrict", null), __decorate$5([doc(), operation], e, "equal", null), __decorate$5([operation], e, "equalStrict", null), __decorate$5([doc(), operation], e, "lessEqual", null), __decorate$5([operation], e, "lessEqualStrict", null), __decorate$5([doc(), operation], e, "greater", null), __decorate$5([operation], e, "greaterStrict", null), __decorate$5([doc(), operation], e, "greaterEqual", null), __decorate$5([operation], e, "greaterEqualStrict", null), e
		}(),
		__decorate$6 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		ConvOps = function() {
			function e() {}
			return e.conv1d = function(t, r, n, a, o, i, s) {
				void 0 === o && (o = "NWC"), void 0 === i && (i = 1), assertArgumentsAreTensors({
					x: t,
					filter: r
				}, "conv1d");
				var u = t,
					l = !1;
				2 === t.rank && (l = !0, u = t.as3D(1, t.shape[0], t.shape[1])), assert(3 === u.rank, "Error in conv1d: input must be rank 3, but got rank " + u.rank + "."), assert(3 === r.rank, "Error in conv1d: filter must be rank 3, but got rank " + r.rank + "."), null != s && assert(isInt(a), "Error in conv1d: pad must be an integer when using, dimRoundingMode " + s + " but got pad " + a + "."), assert(u.shape[2] === r.shape[1], "Error in conv1d: depth of input (" + u.shape[2] + ") must match input depth for filter " + r.shape[1] + "."), assert(eitherStridesOrDilationsAreOne(n, i), "Error in conv1D: Either stride or dilation must be 1. Got stride " + n + " and dilation '" + i + "'"), assert("NWC" === o, "Error in conv1d: got dataFormat of " + o + " but only NWC is currently supported.");
				var c = r.as4D(1, r.shape[0], r.shape[1], r.shape[2]),
					p = u.as4D(u.shape[0], 1, u.shape[1], u.shape[2]),
					d = [1, n],
					h = [1, i],
					f = e.conv2d(p, c, d, a, "NHWC", h, s);
				return l ? f.as2D(f.shape[2], f.shape[3]) : f.as3D(f.shape[0], f.shape[2], f.shape[3])
			}, e.conv2d = function(t, r, n, a, o, i, s) {
				void 0 === o && (o = "NHWC"), void 0 === i && (i = [1, 1]), assertArgumentsAreTensors({
					x: t,
					filter: r
				}, "conv2d");
				var u = t,
					l = !1;
				3 === t.rank && (l = !0, u = t.as4D(1, t.shape[0], t.shape[1], t.shape[2])), assert(4 === u.rank, "Error in conv2d: input must be rank 4, but got rank " + u.rank + "."), assert(4 === r.rank, "Error in conv2d: filter must be rank 4, but got rank " + r.rank + "."), null != s && assert(isInt(a), "Error in conv2d: pad must be an integer when using, dimRoundingMode " + s + " but got pad " + a + "."), assert(u.shape[3] === r.shape[2], "Error in conv2d: depth of input (" + u.shape[3] + ") must match input depth for filter " + r.shape[2] + "."), assert(eitherStridesOrDilationsAreOne(n, i), "Error in conv2D: Either strides or dilations must be 1. Got strides " + n + " and dilations '" + i + "'"), assert("NHWC" === o, "Error in conv2d: got dataFormat of " + o + " but only NHWC is currently supported.");
				var c = computeConv2DInfo(u.shape, r.shape, n, i, a, s),
					p = ENV.engine.runKernel(function(e) {
						return e.conv2d(u, r, c)
					}, {
						x: u,
						filter: r
					}, function(t) {
						return assert(tupleValuesAreOne(i), "Error in gradient of conv2D: dilation rates greater than 1 are notyet supported in gradients. Got dilations '" + i + "'"), {
							x: function() {
								return e.conv2dDerInput(u.shape, t, r, n, a)
							},
							filter: function() {
								return e.conv2dDerFilter(u, t, r.shape, n, a)
							}
						}
					});
				return l ? p.as3D(p.shape[1], p.shape[2], p.shape[3]) : p
			}, e.conv2dDerInput = function(e, t, r, n, a, o) {
				assertArgumentsAreTensors({
					dy: t,
					filter: r
				}, "conv2dDerInput"), assert(e.length === t.rank, "Length of inShape (" + e.length + ") and rank of dy (" + t.rank + ") must match");
				var i = e,
					s = t,
					u = !1;
				3 === t.rank && (u = !0, s = t.as4D(1, t.shape[0], t.shape[1], t.shape[2]), i = [1, e[0], e[1], e[2]]);
				var l = i[3],
					c = s.shape[3];
				assert(4 === i.length, "Error in conv2dDerInput: inShape must be length 4, but got length " + i.length + "."), assert(4 === s.rank, "Error in conv2dDerInput: dy must be rank 4, but got rank " + s.rank), assert(4 === r.rank, "Error in conv2dDerInput: filter must be rank 4, but got rank " + r.rank), assert(l === r.shape[2], "Error in conv2dDerInput: depth of input (" + l + ") must match input depth for filter " + r.shape[2] + "."), assert(c === r.shape[3], "Error in conv2dDerInput: depth of output (" + c + ") must match output depth for filter " + r.shape[3] + "."), null != o && assert(isInt(a), "Error in conv2dDerInput: pad must be an integer when using, dimRoundingMode " + o + " but got pad " + a + ".");
				var p = computeConv2DInfo(i, r.shape, n, 1, a, o),
					d = ENV.engine.runKernel(function(e) {
						return e.conv2dDerInput(s, r, p)
					}, {
						dy4D: s
					});
				return u ? d.as3D(d.shape[1], d.shape[2], d.shape[3]) : d
			}, e.conv2dDerFilter = function(e, t, r, n, a, o) {
				assertArgumentsAreTensors({
					x: e,
					dy: t
				}, "conv2dDerFilter");
				var i = e;
				3 === e.rank && (i = e.as4D(1, e.shape[0], e.shape[1], e.shape[2]));
				var s = t;
				3 === s.rank && (s = t.as4D(1, t.shape[0], t.shape[1], t.shape[2])), assert(4 === i.rank, "Error in conv2dDerFilter: input must be rank 4, but got shape " + i.shape + "."), assert(4 === s.rank, "Error in conv2dDerFilter: dy must be rank 4, but got shape " + s.shape + "."), assert(4 === r.length, "Error in conv2dDerFilter: filterShape must be length 4, but got " + r + "."), assert(i.shape[3] === r[2], "Error in conv2dDerFilter: depth of input " + i.shape[3] + ") must match input depth in filter (" + r[2] + "."), assert(s.shape[3] === r[3], "Error in conv2dDerFilter: depth of dy (" + s.shape[3] + ") must match output depth for filter (" + r[3] + ")."), null != o && assert(isInt(a), "Error in conv2dDerFilter: pad must be an integer when using, dimRoundingMode " + o + " but got pad " + a + ".");
				var u = computeConv2DInfo(i.shape, r, n, 1, a, o);
				return ENV.engine.runKernel(function(e) {
					return e.conv2dDerFilter(i, s, u)
				}, {
					x4D: i,
					dy4D: s
				})
			}, e.conv2dTranspose = function(t, r, n, a, o, i) {
				return assertArgumentsAreTensors({
					x: t,
					filter: r
				}, "conv2dTranspose"), e.conv2dDerInput(n, t, r, a, o, i)
			}, e.depthwiseConv2d = function(e, t, r, n, a, o, i) {
				void 0 === a && (a = "NHWC"), void 0 === o && (o = [1, 1]), assertArgumentsAreTensors({
					x: e,
					filter: t
				}, "depthwiseConv2d");
				var s = e,
					u = !1;
				3 === e.rank && (u = !0, s = e.as4D(1, e.shape[0], e.shape[1], e.shape[2])), assert(4 === s.rank, "Error in depthwiseConv2d: input must be rank 4, but got rank " + s.rank + "."), assert(4 === t.rank, "Error in depthwiseConv2d: filter must be rank 4, but got rank " + t.rank + "."), assert(s.shape[3] === t.shape[2], "Error in depthwiseConv2d: number of input channels (" + s.shape[3] + ") must match the inChannels dimension in filter " + t.shape[2] + "."), null == o && (o = [1, 1]), assert(eitherStridesOrDilationsAreOne(r, o), "Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides " + r + " and dilations '" + o + "'"), null != i && assert(isInt(n), "Error in depthwiseConv2d: pad must be an integer when using, dimRoundingMode " + i + " but got pad " + n + ".");
				var l = computeConv2DInfo(s.shape, t.shape, r, o, n, i, !0),
					c = ENV.engine.runKernel(function(e) {
						return e.depthwiseConv2D(s, t, l)
					}, {
						x: s,
						filter: t
					}, function(e) {
						return assert(tupleValuesAreOne(o), "Error in gradient of depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '" + o + "'"), {
							x: function() {
								return depthwiseConv2dDerInput(s.shape, e, t, l)
							},
							filter: function() {
								return depthwiseConv2dDerFilter(s, e, t.shape, l)
							}
						}
					});
				return u ? c.as3D(c.shape[1], c.shape[2], c.shape[3]) : c
			}, e.separableConv2d = function(t, r, n, a, o, i, s) {
				void 0 === i && (i = [1, 1]), void 0 === s && (s = "NHWC"), assertArgumentsAreTensors({
					x: t,
					depthwiseFilter: r,
					pointwiseFilter: n
				}, "separableConv2d");
				var u = t,
					l = !1;
				if (3 === t.rank && (l = !0, u = t.as4D(1, t.shape[0], t.shape[1], t.shape[2])), "NCHW" === s) throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");
				assert(4 === u.rank, "Error in separableConv2d: input must be rank 4, but got rank " + u.rank + "."), assert(4 === r.rank, "Error in separableConv2d: depthwise filter must be rank 4, but got rank " + r.rank + "."), assert(4 === n.rank, "Error in separableConv2d: pointwise filter must be rank 4, but got rank " + r.rank + "."), assert(1 === n.shape[0], "Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got " + n.shape[0] + "."), assert(1 === n.shape[1], "Error in separableConv2d: the second dimension of pointwise filter  must be 1, but got " + n.shape[1] + ".");
				var c = r.shape[2],
					p = r.shape[3];
				assert(n.shape[2] === c * p, "Error in separableConv2d: the third dimension of pointwise filter must be " + c * p + ", but got " + n.shape[2] + ".");
				var d = e.depthwiseConv2d(u, r, a, o, s, i),
					h = e.conv2d(d, n, 1, "valid", s);
				return l ? h.as3D(h.shape[1], h.shape[2], h.shape[3]) : h
			}, __decorate$6([doc(), operation], e, "conv1d", null), __decorate$6([doc(), operation], e, "conv2d", null), __decorate$6([operation], e, "conv2dDerInput", null), __decorate$6([operation], e, "conv2dDerFilter", null), __decorate$6([doc(), operation], e, "conv2dTranspose", null), __decorate$6([doc(), operation], e, "depthwiseConv2d", null), __decorate$6([doc(), operation], e, "separableConv2d", null), e
		}(),
		__decorate$7 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		ImageOps = function() {
			function e() {}
			return e.resizeBilinear = function(e, t, r) {
				void 0 === r && (r = !1), assertArgumentsAreTensors({
					images: e
				}, "resizeBilinear"), assert(3 === e.rank || 4 === e.rank, "Error in resizeBilinear: x must be rank 3 or 4, but got rank " + e.rank + "."), assert(2 === t.length, "Error in resizeBilinear: new shape must 2D, but got shape " + t + ".");
				var n = e,
					a = !1;
				3 === e.rank && (a = !0, n = e.as4D(1, e.shape[0], e.shape[1], e.shape[2]));
				var o = t[0],
					i = t[1],
					s = ENV.engine.runKernel(function(e, t) {
						return e.resizeBilinear(n, o, i, r)
					}, {
						batchImages: n
					}, function(e, t) {
						return {
							batchImages: function() {
								return ENV.engine.runKernel(function(t) {
									return t.resizeBilinearBackprop(e, n, r)
								}, {})
							}
						}
					});
				return a ? s.as3D(s.shape[1], s.shape[2], s.shape[3]) : s
			}, e.resizeNearestNeighbor = function(e, t, r) {
				void 0 === r && (r = !1), assertArgumentsAreTensors({
					images: e
				}, "resizeNearestNeighbor"), assert(3 === e.rank || 4 === e.rank, "Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank " + e.rank + "."), assert(2 === t.length, "Error in resizeNearestNeighbor: new shape must 2D, but got shape " + t + "."), assert("float32" === e.dtype || "int32" === e.dtype, "`images` must have `int32` or `float32` as dtype");
				var n = e,
					a = !1;
				3 === e.rank && (a = !0, n = e.as4D(1, e.shape[0], e.shape[1], e.shape[2]));
				var o = t[0],
					i = t[1],
					s = ENV.engine.runKernel(function(e) {
						return e.resizeNearestNeighbor(n, o, i, r)
					}, {
						batchImages: n
					});
				return a ? s.as3D(s.shape[1], s.shape[2], s.shape[3]) : s
			}, __decorate$7([doc(), operation], e, "resizeBilinear", null), __decorate$7([doc(), operation], e, "resizeNearestNeighbor", null), e
		}(),
		__decorate$8 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		Tracking = function() {
			function e() {}
			return e.tidy = function(e, t, r) {
				void 0 === r && (r = !1);
				var n = null;
				if (null == t) {
					if ("function" != typeof e) throw new Error("Please provide a function to tidy()");
					t = e
				} else {
					if ("string" != typeof e && !(e instanceof String)) throw new Error("When calling with two arguments, the first argument to tidy() must be a string");
					if ("function" != typeof t) throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");
					n = e
				}
				ENV.engine.startScope(n, r);
				var a = t();
				return a instanceof Promise && console.error("Cannot return a Promise inside of tidy."), ENV.engine.endScope(a, r), a
			}, e.dispose = function(e) {
				getTensorsInContainer(e).forEach(function(e) {
					return e.dispose()
				})
			}, e.keep = function(e) {
				return ENV.engine.keep(e)
			}, e.time = function(e) {
				return ENV.engine.time(e)
			}, __decorate$8([doc()], e, "tidy", null), __decorate$8([doc()], e, "dispose", null), __decorate$8([doc()], e, "keep", null), __decorate$8([doc()], e, "time", null), e
		}(),
		__decorate$9 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		LinalgOps = function() {
			function e() {}
			return e.gramSchmidt = function(e) {
				var t;
				if (Array.isArray(e)) {
					t = !1, assert(null != e && e.length > 0, "Gram-Schmidt process: input must not be null, undefined, or empty");
					for (var r = e[0].shape[0], n = 1; n < e.length; ++n) assert(e[n].shape[0] === r, "Gram-Schmidt: Non-unique lengths found in the input vectors: (" + e[n].shape[0] + " vs. " + r + ")")
				} else t = !0, e = split(e, e.shape[0], 0).map(function(e) {
					return squeeze(e, [0])
				});
				assert(e.length <= e[0].shape[0], "Gram-Schmidt: Number of vectors (" + e.length + ") exceeds number of dimensions (" + e[0].shape[0] + ").");
				for (var a = [], o = e, n = 0; n < e.length; ++n) ! function(e) {
					a.push(Tracking.tidy(function() {
						var t = o[e];
						if (e > 0)
							for (var r = 0; r < e; ++r) {
								var n = sum(a[r].mulStrict(t)).mul(a[r]);
								t = t.sub(n)
							}
						return t.div(norm(t, "euclidean"))
					}))
				}(n);
				return t ? stack(a, 0) : a
			}, __decorate$9([doc(), operation], e, "gramSchmidt", null), e
		}(),
		__decorate$10 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		LogicalOps = function() {
			function e() {}
			return e.logicalNot = function(e) {
				return assertArgumentsAreTensors({
					x: e
				}, "logicalNot"), assert("bool" === e.dtype, "Error Array must be of type bool."), ENV.engine.runKernel(function(t) {
					return t.logicalNot(e)
				}, {
					x: e
				})
			}, e.logicalAnd = function(e, t) {
				return assertArgumentsAreTensors({
					a: e,
					b: t
				}, "logicalAnd"), assert("bool" === e.dtype && "bool" === t.dtype, "Error Array must be of type bool."), assertAndGetBroadcastShape(e.shape, t.shape), ENV.engine.runKernel(function(r) {
					return r.logicalAnd(e, t)
				}, {
					a: e,
					b: t
				})
			}, e.logicalOr = function(e, t) {
				return assertArgumentsAreTensors({
					a: e,
					b: t
				}, "logicalOr"), assert("bool" === e.dtype && "bool" === t.dtype, "Error Array must be of type bool."), assertAndGetBroadcastShape(e.shape, t.shape), ENV.engine.runKernel(function(r) {
					return r.logicalOr(e, t)
				}, {
					a: e,
					b: t
				})
			}, e.logicalXor = function(t, r) {
				return assertArgumentsAreTensors({
					a: t,
					b: r
				}, "logicalXor"), assert("bool" === t.dtype && "bool" === r.dtype, "Error Array must be of type bool."), assertAndGetBroadcastShape(t.shape, r.shape), e.logicalOr(t, r).logicalAnd(e.logicalAnd(t, r).logicalNot())
			}, e.where = function(e, t, r) {
				assertArgumentsAreTensors({
					condition: e,
					a: t,
					b: r
				}, "where"), assert("bool" === e.dtype, "Error Condition must be of type bool."), assertShapesMatch(t.shape, r.shape, "Error in where: "), 1 === e.rank ? assert(e.shape[0] === t.shape[0], "The first dimension of `a` must match the size of `condition`.") : assertShapesMatch(e.shape, r.shape, "Error in where: ");
				var n = upcastType(t.dtype, r.dtype);
				return ENV.engine.runKernel(function(a) {
					return a.where(e, t, r, n)
				}, {
					condition: e,
					a: t,
					b: r
				})
			}, __decorate$10([doc(), operation], e, "logicalNot", null), __decorate$10([doc(), operation], e, "logicalAnd", null), __decorate$10([doc(), operation], e, "logicalOr", null), __decorate$10([doc(), operation], e, "logicalXor", null), __decorate$10([doc(), operation], e, "where", null), e
		}(),
		__decorate$11 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		};
	! function(e) {
		e[e.NONE = 0] = "NONE", e[e.MEAN = 1] = "MEAN", e[e.SUM = 2] = "SUM", e[e.SUM_BY_NONZERO_WEIGHTS = 3] = "SUM_BY_NONZERO_WEIGHTS"
	}(exports.Reduction || (exports.Reduction = {}));
	var LossOps = function() {
			function e() {}
			return e.computeWeightedLoss = function(e, t, r) {
				void 0 === r && (r = exports.Reduction.SUM_BY_NONZERO_WEIGHTS), assertArgumentsAreTensors({
					losses: e
				}, "computeWeightedLoss"), null != t && assertArgumentsAreTensors({
					weights: t
				}, "computeWeightedLoss");
				var n = null == t ? e : e.mul(t);
				if (r === exports.Reduction.NONE) return n;
				if (r === exports.Reduction.SUM) return n.sum();
				if (r === exports.Reduction.MEAN) return null == t ? n.mean() : n.sum().div(t.sum());
				if (r === exports.Reduction.SUM_BY_NONZERO_WEIGHTS) {
					if (null == t) return n.sum().div(scalar(e.size));
					var a = t.notEqual(scalar(0)).sum().toFloat();
					return n.sum().div(a)
				}
				throw Error("Unknown reduction: " + r)
			}, e.absoluteDifference = function(t, r, n, a) {
				void 0 === a && (a = exports.Reduction.SUM_BY_NONZERO_WEIGHTS), assertArgumentsAreTensors({
					labels: t,
					predictions: r
				}, "absoluteDifference"), null != n && assertArgumentsAreTensors({
					weights: n
				}, "absoluteDifference"), assertShapesMatch(t.shape, r.shape, "Error in absoluteDifference: ");
				var o = t.sub(r).abs();
				return e.computeWeightedLoss(o, n, a)
			}, e.meanSquaredError = function(t, r, n, a) {
				void 0 === a && (a = exports.Reduction.SUM_BY_NONZERO_WEIGHTS), assertArgumentsAreTensors({
					labels: t,
					predictions: r
				}, "meanSquaredError"), null != n && assertArgumentsAreTensors({
					weights: n
				}, "meanSquaredError"), assertShapesMatch(t.shape, r.shape, "Error in meanSquaredError: ");
				var o = t.squaredDifference(r);
				return e.computeWeightedLoss(o, n, a)
			}, e.cosineDistance = function(t, r, n, a, o) {
				void 0 === o && (o = exports.Reduction.SUM_BY_NONZERO_WEIGHTS), assertArgumentsAreTensors({
					labels: t,
					predictions: r
				}, "cosineDistance"), null != a && assertArgumentsAreTensors({
					weights: a
				}, "cosineDistance"), assertShapesMatch(t.shape, r.shape, "Error in cosineDistance: ");
				var i = scalar(1).sub(t.mul(r).sum(n, !0));
				return e.computeWeightedLoss(i, a, o)
			}, e.hingeLoss = function(t, r, n, a) {
				void 0 === a && (a = exports.Reduction.SUM_BY_NONZERO_WEIGHTS), assertArgumentsAreTensors({
					labels: t,
					predictions: r
				}, "hingeLoss"), null != n && assertArgumentsAreTensors({
					weights: n
				}, "hingeLoss"), assertShapesMatch(t.shape, r.shape, "Error in hingeLoss: ");
				var o = scalar(1);
				t = scalar(2).mul(t).sub(o);
				var i = o.sub(t.mul(r)).relu();
				return e.computeWeightedLoss(i, n, a)
			}, e.logLoss = function(t, r, n, a, o) {
				void 0 === a && (a = 1e-7), void 0 === o && (o = exports.Reduction.SUM_BY_NONZERO_WEIGHTS), assertArgumentsAreTensors({
					labels: t,
					predictions: r
				}, "logLoss"), null != n && assertArgumentsAreTensors({
					weights: n
				}, "logLoss"), assertShapesMatch(t.shape, r.shape, "Error in logLoss: ");
				var i = scalar(1),
					s = scalar(a),
					u = t.mul(r.add(s).log()).neg().sub(i.sub(t).mul(i.sub(r).add(s).log()));
				return e.computeWeightedLoss(u, n, o)
			}, e.huberLoss = function(t, r, n, a, o) {
				void 0 === a && (a = 1), void 0 === o && (o = exports.Reduction.SUM_BY_NONZERO_WEIGHTS), assertArgumentsAreTensors({
					labels: t,
					predictions: r
				}, "huberLoss"), null != n && assertArgumentsAreTensors({
					weights: n
				}, "huberLoss"), assertShapesMatch(t.shape, r.shape, "Error in huberLoss: ");
				var i = scalar(a),
					s = r.sub(t).abs(),
					u = minimum(s, i),
					l = s.sub(u),
					c = scalar(.5).mul(u.square()).add(i.mul(l));
				return e.computeWeightedLoss(c, n, o)
			}, __decorate$11([doc(), operation], e, "computeWeightedLoss", null), __decorate$11([doc(), operation], e, "absoluteDifference", null), __decorate$11([doc(), operation], e, "meanSquaredError", null), __decorate$11([doc(), operation], e, "cosineDistance", null), __decorate$11([doc(), operation], e, "hingeLoss", null), __decorate$11([doc(), operation], e, "logLoss", null), __decorate$11([doc(), operation], e, "huberLoss", null), e
		}(),
		__decorate$12 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		LRNOps = function() {
			function e() {}
			return e.localResponseNormalization = function(e, t, r, n, a) {
				void 0 === t && (t = 5), void 0 === r && (r = 1), void 0 === n && (n = 1), void 0 === a && (a = .5), assertArgumentsAreTensors({
					x: e
				}, "localResponseNormalization"), assert(4 === e.rank || 3 === e.rank, "Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank " + e.rank + "."), assert(isInt(t), "Error in localResponseNormalization: depthRadius must be an integer\n                     but got depthRadius " + t + ".");
				var o = e,
					i = !1;
				3 === e.rank && (i = !0, o = e.as4D(1, e.shape[0], e.shape[1], e.shape[2]));
				var s = ENV.engine.runKernel(function(e) {
					return e.localResponseNormalization4D(o, t, r, n, a)
				}, {
					x4D: o
				});
				return i ? s.as3D(s.shape[1], s.shape[2], s.shape[3]) : s
			}, __decorate$12([doc(), operation], e, "localResponseNormalization", null), e
		}(),
		__decorate$13 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		LSTMOps = function() {
			function e() {}
			return e.multiRNNCell = function(e, t, r, n) {
				assertArgumentsAreTensors({
					data: t,
					c: r,
					h: n
				}, "multiRNNCell");
				for (var a = t, o = [], i = 0; i < e.length; i++) {
					var s = e[i](a, r[i], n[i]);
					o.push(s[0]), o.push(s[1]), a = s[1]
				}
				for (var u = [], l = [], i = 0; i < o.length; i += 2) u.push(o[i]), l.push(o[i + 1]);
				return [u, l]
			}, e.basicLSTMCell = function(e, t, r, n, a, o) {
				assertArgumentsAreTensors({
					forgetBias: e,
					lstmKernel: t,
					lstmBias: r,
					data: n,
					c: a,
					h: o
				}, "basicLSTMCell");
				var i = n.concat(o, 1).matMul(t).add(r),
					s = i.shape[0],
					u = i.shape[1] / 4,
					l = [s, u],
					c = i.slice([0, 0], l),
					p = i.slice([0, u], l),
					d = i.slice([0, 2 * u], l),
					h = i.slice([0, 3 * u], l),
					f = c.sigmoid().mulStrict(p.tanh()).addStrict(a.mulStrict(e.add(d).sigmoid()));
				return [f, f.tanh().mulStrict(h.sigmoid())]
			}, __decorate$13([doc(), operation], e, "multiRNNCell", null), __decorate$13([doc(), operation], e, "basicLSTMCell", null), e
		}(),
		__decorate$14 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		MatmulOps = function() {
			function e() {}
			return e.matMul = function(e, t, r, n) {
				void 0 === r && (r = !1), void 0 === n && (n = !1), assertArgumentsAreTensors({
					a: e,
					b: t
				}, "matMul");
				var a = r ? e.shape[0] : e.shape[1],
					o = n ? t.shape[1] : t.shape[0];
				assert(2 === e.rank && 2 === t.rank, "Error in matMul: inputs must be rank 2, got ranks " + e.rank + " and " + t.rank + "."), assert(a === o, "Error in matMul: inner shapes (" + a + ") and (" + o + ") of Tensors with shapes " + e.shape + " and " + t.shape + " and transposeA=" + r + " and transposeB=" + n + " must match.");
				return ENV.engine.runKernel(function(a) {
					return a.matMul(e, t, r, n)
				}, {
					a: e,
					b: t
				}, function(a) {
					return r || n ? !r && n ? {
						a: function() {
							return a.matMul(t.toFloat(), !1, !1)
						},
						b: function() {
							return a.matMul(e.toFloat(), !0, !1)
						}
					} : r && !n ? {
						a: function() {
							return t.toFloat().matMul(a, !1, !0)
						},
						b: function() {
							return e.toFloat().matMul(a, !1, !1)
						}
					} : {
						a: function() {
							return t.toFloat().matMul(a, !0, !0)
						},
						b: function() {
							return a.matMul(e.toFloat(), !0, !0)
						}
					} : {
						a: function() {
							return a.matMul(t.toFloat(), !1, !0)
						},
						b: function() {
							return e.toFloat().matMul(a, !0, !1)
						}
					}
				})
			}, e.vectorTimesMatrix = function(e, t) {
				return assert(1 === e.rank, "Error in vectorTimesMatrix: first input must be rank 1, but got rank " + e.rank + "."), assert(2 === t.rank, "Error in vectorTimesMatrix: second input must be rank 2, but got rank " + t.rank + "."), assert(e.size === t.shape[0], "Error in vectorTimesMatrix: size of vector (" + e.size + ") must match first dimension of matrix (" + t.shape[0] + ")"), e.as2D(1, -1).matMul(t).as1D()
			}, e.matrixTimesVector = function(e, t) {
				return assert(1 === t.rank, "Error in matrixTimesVector: second input must rank 1, but got rank " + t.rank + "."), assert(2 === e.rank, "Error in matrixTimesVector: first input must be a rank 2, but got rank " + e.rank + "."), assert(t.size === e.shape[1], "Error in matrixTimesVector: size of first rank 1 input " + t.size + " must match inner dimension of second rank 2 input, but got shape " + e.shape + "."), e.matMul(t.as2D(-1, 1)).as1D()
			}, e.dotProduct = function(e, t) {
				return assert(1 === e.rank && 1 === t.rank, "Error in dotProduct: inputs must be rank 1, but got ranks " + e.rank + " and " + t.rank + "."), assert(e.size === t.size, "Error in dotProduct: size of inputs (" + e.size + ") and (" + t.size + ") must match."), e.as2D(1, -1).matMul(t.as2D(-1, 1)).asScalar()
			}, e.outerProduct = function(e, t) {
				return assert(1 === e.rank && 1 === t.rank, "Error in outerProduct: inputs must be rank 1, but got ranks " + e.rank + " and " + t.rank + "."), e.as2D(-1, 1).matMul(t.as2D(1, -1))
			}, e.dot = function(e, t) {
				assert(!(1 !== e.rank && 2 !== e.rank || 1 !== t.rank && 2 !== t.rank), "Error in dot: inputs must all be rank 1 or 2, but got ranks " + e.rank + " and " + t.rank + ".");
				var r = 1 === e.rank ? e.size : e.shape[1],
					n = 1 === t.rank ? t.size : t.shape[0];
				return assert(r === n, "Error in dot: inner dimensions of inputs must match, but got " + r + " and " + n + "."), 1 === e.rank && 1 === t.rank ? e.as2D(1, -1).matMul(t.as2D(-1, 1)).asScalar() : 1 === e.rank && 2 === t.rank ? e.as2D(1, -1).matMul(t.as2D(t.shape[0], t.shape[1])).as1D() : 2 === e.rank && 1 === t.rank ? e.matMul(t.as2D(-1, 1)).as1D() : e.matMul(t.as2D(t.shape[0], t.shape[1]))
			}, __decorate$14([doc(), operation], e, "matMul", null), __decorate$14([operation], e, "vectorTimesMatrix", null), __decorate$14([operation], e, "matrixTimesVector", null), __decorate$14([operation], e, "dotProduct", null), __decorate$14([doc(), operation], e, "outerProduct", null), __decorate$14([doc(), operation], e, "dot", null), e
		}(),
		__decorate$15 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		MovingAverageOps = function() {
			function e() {}
			return e.movingAverage = function(e, t, r, n, a) {
				void 0 === a && (a = !0), assertArgumentsAreTensors({
					v: e,
					x: t
				}, "movingAverage"), assertTypesMatch(e, t), assert(arraysEqual(e.shape, t.shape), "Shape mismatch in v and x");
				var o = ArrayOps.scalar(1);
				r = "number" == typeof r ? ArrayOps.scalar(r) : r;
				var i = o.sub(r),
					s = t.sub(e).mul(i);
				return a && (assert(null != n, "When using zeroDebias: true, step is required."), n = "number" == typeof n ? ArrayOps.scalar(n) : n, s = s.div(o.sub(BinaryOps.pow(r, n)))), e.add(s)
			}, __decorate$15([doc(), operation], e, "movingAverage", null), e
		}(),
		__decorate$16 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		NormOps = function() {
			function e() {}
			return e.norm = function(e, t, r, n) {
				void 0 === t && (t = "euclidean"), void 0 === r && (r = null), void 0 === n && (n = !1), assertArgumentsAreTensors({
					x: e
				}, "norm");
				var a = normImpl(e, t, r),
					o = a.shape;
				if (n) {
					var i = parseAxisParam(r, e.shape);
					o = expandShapeToKeepDim(a.shape, i)
				}
				return a.reshape(o)
			}, __decorate$16([doc(), operation], e, "norm", null), e
		}(),
		__decorate$17 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		PoolOps = function() {
			function e() {}
			return e.maxPool = function(t, r, n, a, o) {
				assertArgumentsAreTensors({
					x: t
				}, "maxPool");
				var i = t,
					s = !1;
				3 === t.rank && (s = !0, i = t.as4D(1, t.shape[0], t.shape[1], t.shape[2])), assert(4 === i.rank, "Error in maxPool: input must be rank 4 but got rank " + i.rank + "."), null != o && assert(isInt(a), "Error in maxPool: pad must be an integer when using, dimRoundingMode " + o + " but got pad " + a + ".");
				var u = computePool2DInfo(i.shape, r, n, a, o),
					l = ENV.engine.runKernel(function(e, t) {
						return t(e.maxPool(i, u))
					}, {
						x: i
					}, function(t, o) {
						var s = o[0];
						return {
							x: function() {
								return e.maxPoolBackprop(t, i, s, r, n, a)
							}
						}
					});
				return s ? l.as3D(l.shape[1], l.shape[2], l.shape[3]) : l
			}, e.maxPoolBackprop = function(e, t, r, n, a, o, i) {
				assertArgumentsAreTensors({
					dy: e,
					input: t,
					output: r
				}, "maxPoolBackprop"), assert(t.rank === e.rank, "Rank of input (" + t.rank + ") does not match rank of dy (" + e.rank + ")"), assert(4 === e.rank, "Error in maxPoolBackprop: dy must be rank 4 but got rank " + e.rank + "."), assert(4 === t.rank, "Error in maxPoolBackprop: input must be rank 4 but got rank " + t.rank + "."), null != i && assert(isInt(o), "Error in maxPoolBackprop: pad must be an integer when using, dimRoundingMode " + i + " but got pad " + o + ".");
				var s = computePool2DInfo(t.shape, n, a, o, i);
				return ENV.engine.runKernel(function(n) {
					return n.maxPoolBackprop(e, t, r, s)
				}, {
					dy: e,
					input: t
				})
			}, e.avgPool = function(t, r, n, a, o) {
				assertArgumentsAreTensors({
					x: t
				}, "avgPool"), assert("float32" === t.dtype, "The input dtype to avgPool must be float32");
				var i = t,
					s = !1;
				3 === t.rank && (s = !0, i = t.as4D(1, t.shape[0], t.shape[1], t.shape[2])), assert(4 === i.rank, "Error in avgPool: x must be rank 4 but got rank " + i.rank + "."), null != o && assert(isInt(a), "Error in avgPool: pad must be an integer when using, dimRoundingMode " + o + " but got pad " + a + ".");
				var u = computePool2DInfo(i.shape, r, n, a),
					l = ENV.engine.runKernel(function(e) {
						return e.avgPool(i, u)
					}, {
						x: i
					}, function(t) {
						return {
							x: function() {
								return e.avgPoolBackprop(t, i, r, n, a)
							}
						}
					});
				return l = l.cast(t.dtype), s ? l.as3D(l.shape[1], l.shape[2], l.shape[3]) : l
			}, e.avgPoolBackprop = function(e, t, r, n, a) {
				assertArgumentsAreTensors({
					dy: e,
					input: t
				}, "avgPoolBackprop"), assert(t.rank === e.rank, "Rank of input (" + t.rank + ") does not match rank of dy (" + e.rank + ")");
				var o = t,
					i = e,
					s = !1;
				3 === t.rank && (s = !0, o = t.as4D(1, t.shape[0], t.shape[1], t.shape[2]), i = e.as4D(1, e.shape[0], e.shape[1], e.shape[2])), assert(4 === i.rank, "Error in avgPoolBackprop: dy must be rank 4 but got rank " + i.rank + "."), assert(4 === o.rank, "Error in avgPoolBackprop: input must be rank 4 but got rank " + o.rank + ".");
				var u = computePool2DInfo(o.shape, r, n, a),
					l = ENV.engine.runKernel(function(e) {
						return e.avgPoolBackprop(i, o, u)
					}, {
						dy4D: i,
						input4D: o
					});
				return s ? l.as3D(l.shape[1], l.shape[2], l.shape[3]) : l
			}, __decorate$17([doc(), operation], e, "maxPool", null), __decorate$17([operation], e, "maxPoolBackprop", null), __decorate$17([doc(), operation], e, "avgPool", null), __decorate$17([operation], e, "avgPoolBackprop", null), e
		}(),
		__decorate$18 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		ReverseOps = function() {
			function e() {}
			return e.reverse1d = function(t) {
				return assert(1 === t.rank, "Error in reverse1D: x must be rank 1 but got\n             rank " + t.rank + "."), e.reverse(t, 0)
			}, e.reverse2d = function(t, r) {
				return assert(2 === t.rank, "Error in reverse2D: x must be rank 2 but got\n             rank " + t.rank + "."), e.reverse(t, r)
			}, e.reverse3d = function(t, r) {
				return assert(3 === t.rank, "Error in reverse3D: x must be rank 3 but got\n             rank " + t.rank + "."), e.reverse(t, r)
			}, e.reverse4d = function(t, r) {
				return assert(4 === t.rank, "Error in reverse4D: x must be rank 4 but got\n             rank " + t.rank + "."), e.reverse(t, r)
			}, e.reverse = function(e, t) {
				if (assertArgumentsAreTensors({
						x: e
					}, "reverse"), 0 === e.rank) return e.clone();
				var r = parseAxisParam(t, e.shape);
				return ENV.engine.runKernel(function(t) {
					return t.reverse(e, r)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return e.reverse(r)
						}
					}
				}).reshapeAs(e)
			}, __decorate$18([doc(), operation], e, "reverse", null), e
		}(),
		__decorate$19 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		SliceOps = function() {
			function e() {}
			return e.slice1d = function(t, r, n) {
				return assert(1 === t.rank, "slice1d expects a rank-1 tensor, but got a rank-" + t.rank + " tensor"), e.slice(t, [r], [n])
			}, e.slice2d = function(t, r, n) {
				return assert(2 === t.rank, "slice1d expects a rank-2 tensor, but got a rank-" + t.rank + " tensor"), e.slice(t, r, n)
			}, e.slice3d = function(t, r, n) {
				return assert(3 === t.rank, "slice1d expects a rank-3 tensor, but got a rank-" + t.rank + " tensor"), e.slice(t, r, n)
			}, e.slice4d = function(t, r, n) {
				return assert(4 === t.rank, "slice1d expects a rank-4 tensor, but got a rank-" + t.rank + " tensor"), e.slice(t, r, n)
			}, e.slice = function(e, t, r) {
				if (assertArgumentsAreTensors({
						x: e
					}, "slice"), 0 === e.rank) throw new Error("Slicing scalar is not possible");
				var n;
				n = "number" == typeof t ? [t].concat(new Array(e.rank - 1).fill(0)) : t.length < e.rank ? t.concat(new Array(e.rank - t.length).fill(0)) : t;
				var a;
				a = null == r ? new Array(e.rank).fill(-1) : "number" == typeof r ? [r].concat(new Array(e.rank - 1).fill(-1)) : r.length < e.rank ? r.concat(new Array(e.rank - r.length).fill(-1)) : r, a = a.map(function(t, r) {
					return t >= 0 ? t : (assert(-1 === t, "Bad value in size"), e.shape[r] - n[r])
				}), assertParamsValid(e, n, a);
				var o = e.shape;
				return ENV.engine.runKernel(function(t) {
					return t.slice(e, n, a)
				}, {
					x: e
				}, function(e) {
					for (var t = [], r = 0; r < e.rank; r++) t.push([n[r], o[r] - n[r] - a[r]]);
					return {
						x: function() {
							return e.pad(t)
						}
					}
				})
			}, __decorate$19([doc(), operation], e, "slice", null), e
		}(),
		__decorate$20 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		SoftmaxOps = function() {
			function e() {}
			return e.softmax = function(e, t) {
				if (void 0 === t && (t = -1), assertArgumentsAreTensors({
						logits: e
					}, "softmax"), -1 === t && (t = e.rank - 1), t !== e.rank - 1) throw Error("Softmax along a non-last dimension is not yet supported. Logits was rank " + e.rank + " and dim was " + t);
				return customGrad(function(e) {
					var r = e.logSumExp([t], !0),
						n = e.toFloat().sub(r).exp();
					return {
						value: n,
						gradFunc: function(e) {
							var r = e.mul(n);
							return r.sub(r.sum([t], !0).mul(n))
						}
					}
				})(e)
			}, e.softmaxCrossEntropy = function(e, t, r) {
				if (void 0 === r && (r = -1), assertArgumentsAreTensors({
						labels: e,
						logits: t
					}, "softmaxCrossEntropy"), assertShapesMatch(e.shape, t.shape, "Error in softmaxCrossEntropy: "), -1 === r && (r = t.rank - 1), r !== t.rank - 1) throw Error("Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank " + t.rank + " and dim was " + r);
				return customGrad(function(e, t) {
					var n = t.softmax(r);
					return {
						value: scalar(1e-5).add(n).log().mul(e).neg().sum([r]),
						gradFunc: function(t) {
							var a = expandShapeToKeepDim(t.shape, [r]);
							return [t.reshape(a).mul(e.toFloat().sub(n)), t.reshape(a).mul(n.sub(e.toFloat()))]
						}
					}
				})(e, t)
			}, __decorate$20([doc(), operation], e, "softmax", null), __decorate$20([doc(), operation], e, "softmaxCrossEntropy", null), e
		}(),
		__decorate$21 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		StridedSliceOps = function() {
			function e() {}
			return e.stridedSlice = function(e, t, r, n, a, o) {
				return void 0 === a && (a = 0), void 0 === o && (o = 0), assertArgumentsAreTensors({
					x: e
				}, "stridedSlice"), ENV.engine.runKernel(function(i) {
					return i.stridedSlice(e, t, r, n, a, o)
				}, {
					x: e
				})
			}, __decorate$21([doc(), operation], e, "stridedSlice", null), e
		}(),
		__decorate$22 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		TransposeOps = function() {
			function e() {}
			return e.transpose = function(e, t) {
				if (assertArgumentsAreTensors({
						x: e
					}, "transpose"), null == t && (t = e.shape.map(function(e, t) {
						return t
					}).reverse()), assert(e.rank === t.length, "Error in transpose: rank of input " + e.rank + " must match length of perm " + t + "."), t.forEach(function(r) {
						assert(r >= 0 && r < e.rank, "All entries in 'perm' must be between 0 and " + (e.rank - 1) + " but got " + t)
					}), e.rank <= 1) return e.clone();
				return ENV.engine.runKernel(function(r) {
					return r.transpose(e, t)
				}, {
					x: e
				}, function(e) {
					var r = getUndoAxesPermutation(t);
					return {
						x: function() {
							return e.transpose(r)
						}
					}
				})
			}, __decorate$22([doc(), operation], e, "transpose", null), e
		}(),
		SELU_SCALEALPHA = 1.7580993408473768,
		SELU_SCALE = 1.0507009873554805,
		__decorate$23 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		UnaryOps = function() {
			function e() {}
			return e.neg = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "neg");
				return ENV.engine.runKernel(function(t) {
					return t.neg(e)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return e.neg()
						}
					}
				})
			}, e.ceil = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "ceil");
				return ENV.engine.runKernel(function(t) {
					return t.ceil(e)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return zerosLike(e)
						}
					}
				})
			}, e.floor = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "floor");
				return ENV.engine.runKernel(function(t) {
					return t.floor(e)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return zerosLike(e)
						}
					}
				})
			}, e.sign = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "sign");
				return ENV.engine.runKernel(function(t) {
					return t.sign(e)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return zerosLike(e)
						}
					}
				})
			}, e.round = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "round");
				return ENV.engine.runKernel(function(t) {
					return t.round(e)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return zerosLike(e)
						}
					}
				})
			}, e.exp = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "exp");
				return ENV.engine.runKernel(function(t, r) {
					return r(t.exp(e))
				}, {
					x: e
				}, function(e, t) {
					var r = t[0];
					return {
						x: function() {
							return e.mulStrict(r)
						}
					}
				})
			}, e.expm1 = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "expm1");
				return ENV.engine.runKernel(function(t) {
					return t.expm1(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.mulStrict(e.exp())
						}
					}
				})
			}, e.log = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "log");
				return ENV.engine.runKernel(function(t) {
					return t.log(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.divStrict(e.toFloat())
						}
					}
				})
			}, e.log1p = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "log1p");
				return ENV.engine.runKernel(function(t) {
					return t.log1p(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.divStrict(e.add(scalar(1)))
						}
					}
				})
			}, e.sqrt = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "sqrt");
				return ENV.engine.runKernel(function(t) {
					return t.sqrt(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.divStrict(e.toFloat().sqrt().mul(scalar(2)))
						}
					}
				})
			}, e.rsqrt = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "rsqrt");
				return ENV.engine.runKernel(function(t) {
					return t.rsqrt(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.divStrict(e.pow(scalar(1.5)).mul(scalar(2))).neg()
						}
					}
				})
			}, e.square = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "square");
				return ENV.engine.runKernel(function(t) {
					return t.square(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.mulStrict(e.toFloat().mul(scalar(2)))
						}
					}
				})
			}, e.reciprocal = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "reciprocal");
				return ENV.engine.runKernel(function(t) {
					return t.reciprocal(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.divStrict(e.square().neg())
						}
					}
				})
			}, e.abs = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "abs");
				return ENV.engine.runKernel(function(t) {
					return t.abs(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.mulStrict(e.toFloat().step(-1))
						}
					}
				})
			}, e.clipByValue = function(e, t, r) {
				assertArgumentsAreTensors({
					x: e
				}, "clipByValue"), assert(t <= r, "Error in clip: min (" + t + ") must be less than or equal to max (" + r + ").");
				return ENV.engine.runKernel(function(n) {
					return n.clip(e, t, r)
				}, {
					x: e
				}, function(n) {
					return {
						x: function() {
							return n.where(e.greaterEqual(scalar(t)).logicalAnd(e.lessEqual(scalar(r))), zerosLike(n))
						}
					}
				})
			}, e.relu = function(e) {
				if (assertArgumentsAreTensors({
						x: e
					}, "relu"), "bool" === e.dtype) return e.toInt();
				return ENV.engine.runKernel(function(t) {
					return t.relu(e)
				}, {
					x: e
				}, function(t) {
					var r = e.step();
					return {
						x: function() {
							return t.mulStrict(r.toFloat())
						}
					}
				})
			}, e.elu = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "elu");
				return ENV.engine.runKernel(function(t, r) {
					return r(t.elu(e))
				}, {
					x: e
				}, function(e, t) {
					var r = t[0];
					return {
						x: function() {
							return ENV.engine.runKernel(function(t) {
								return t.eluDer(e, r)
							}, {
								dy: e,
								y: r
							})
						}
					}
				})
			}, e.selu = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "selu");
				return ENV.engine.runKernel(function(t) {
					return t.selu(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							var r = e.greater(scalar(0)),
								n = scalar(SELU_SCALEALPHA),
								a = scalar(SELU_SCALE),
								o = t.mul(a),
								i = t.mul(n).mul(e.toFloat().exp());
							return where(r, o, i)
						}
					}
				})
			}, e.leakyRelu = function(e, t) {
				return void 0 === t && (t = .2), assertArgumentsAreTensors({
					x: e
				}, "leakyRelu"), maximum(scalar(t).mul(e), e)
			}, e.prelu = function(e, t) {
				assertArgumentsAreTensors({
					x: e,
					alpha: t
				}, "prelu");
				var r = scalar(0);
				return maximum(r, e).add(t.mul(minimum(r, e)))
			}, e.sigmoid = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "sigmoid");
				return ENV.engine.runKernel(function(t, r) {
					return r(t.sigmoid(e))
				}, {
					x: e
				}, function(e, t) {
					var r = t[0];
					return {
						x: function() {
							return e.mulStrict(r.mul(scalar(1).sub(r)))
						}
					}
				})
			}, e.logSigmoid = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "logSigmoid");
				return ENV.engine.runKernel(function(t) {
					return t.softplus(e.neg()).neg()
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.mulStrict(e.neg().sigmoid())
						}
					}
				})
			}, e.softplus = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "softplus");
				return ENV.engine.runKernel(function(t) {
					return t.softplus(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.mulStrict(e.sigmoid())
						}
					}
				})
			}, e.sin = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "sin");
				return ENV.engine.runKernel(function(t) {
					return t.sin(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return e.toFloat().cos().mulStrict(t)
						}
					}
				})
			}, e.cos = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "cos");
				return ENV.engine.runKernel(function(t) {
					return t.cos(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return e.toFloat().sin().neg().mulStrict(t)
						}
					}
				})
			}, e.tan = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "tan");
				return ENV.engine.runKernel(function(t) {
					return t.tan(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.divStrict(e.cos().square())
						}
					}
				})
			}, e.asin = function(t) {
				assertArgumentsAreTensors({
					x: t
				}, "asin");
				return ENV.engine.runKernel(function(e) {
					return e.asin(t)
				}, {
					x: t
				}, function(r) {
					return {
						x: function() {
							return r.divStrict(e.sqrt(scalar(1).sub(t.toFloat().square())))
						}
					}
				})
			}, e.acos = function(t) {
				assertArgumentsAreTensors({
					x: t
				}, "acos");
				return ENV.engine.runKernel(function(e) {
					return e.acos(t)
				}, {
					x: t
				}, function(r) {
					return {
						x: function() {
							return r.divStrict(e.sqrt(scalar(1).sub(t.toFloat().square()))).neg()
						}
					}
				})
			}, e.atan = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "atan");
				return ENV.engine.runKernel(function(t) {
					return t.atan(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.divStrict(scalar(1).add(e.toFloat().square()))
						}
					}
				})
			}, e.sinh = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "sinh");
				return ENV.engine.runKernel(function(t) {
					return t.sinh(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return e.toFloat().cosh().mulStrict(t)
						}
					}
				})
			}, e.cosh = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "cosh");
				return ENV.engine.runKernel(function(t) {
					return t.cosh(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return e.toFloat().sinh().mulStrict(t)
						}
					}
				})
			}, e.tanh = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "tanh");
				return ENV.engine.runKernel(function(t, r) {
					return r(t.tanh(e))
				}, {
					x: e
				}, function(e, t) {
					var r = t[0];
					return {
						x: function() {
							return scalar(1).sub(r.square()).mulStrict(e)
						}
					}
				})
			}, e.asinh = function(t) {
				assertArgumentsAreTensors({
					x: t
				}, "asinh");
				return ENV.engine.runKernel(function(e) {
					return e.asinh(t)
				}, {
					x: t
				}, function(r) {
					return {
						x: function() {
							return r.divStrict(e.sqrt(scalar(1).add(t.toFloat().square())))
						}
					}
				})
			}, e.acosh = function(t) {
				assertArgumentsAreTensors({
					x: t
				}, "acosh");
				return ENV.engine.runKernel(function(e) {
					return e.acosh(t)
				}, {
					x: t
				}, function(r) {
					return {
						x: function() {
							return r.divStrict(e.sqrt(t.toFloat().square().sub(scalar(1))))
						}
					}
				})
			}, e.atanh = function(e) {
				assertArgumentsAreTensors({
					x: e
				}, "atanh");
				return ENV.engine.runKernel(function(t) {
					return t.atanh(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.divStrict(scalar(1).sub(e.toFloat().square()))
						}
					}
				})
			}, e.erf = function(e) {
				assert("int32" === e.dtype || "float32" === e.dtype, "Input dtype must be `int32` or `float32`."), "int32" === e.dtype && (e = e.toFloat());
				return ENV.engine.runKernel(function(t) {
					return t.erf(e)
				}, {
					x: e
				}, function(t) {
					return {
						x: function() {
							return t.mulStrict(scalar(2 / Math.sqrt(Math.PI)).mul(e.square().neg().exp()))
						}
					}
				})
			}, e.step = function(e, t) {
				void 0 === t && (t = 0), assertArgumentsAreTensors({
					x: e
				}, "step");
				return ENV.engine.runKernel(function(r) {
					return r.step(e, t)
				}, {
					x: e
				}, function(e) {
					return {
						x: function() {
							return zerosLike(e)
						}
					}
				})
			}, __decorate$23([doc(), operation], e, "neg", null), __decorate$23([doc(), operation], e, "ceil", null), __decorate$23([doc(), operation], e, "floor", null), __decorate$23([doc(), operation], e, "sign", null), __decorate$23([doc(), operation], e, "round", null), __decorate$23([doc(), operation], e, "exp", null), __decorate$23([doc(), operation], e, "expm1", null), __decorate$23([doc(), operation], e, "log", null), __decorate$23([doc(), operation], e, "log1p", null), __decorate$23([doc(), operation], e, "sqrt", null), __decorate$23([doc(), operation], e, "rsqrt", null), __decorate$23([doc(), operation], e, "square", null), __decorate$23([doc(), operation], e, "reciprocal", null), __decorate$23([doc(), operation], e, "abs", null), __decorate$23([doc(), operation], e, "clipByValue", null), __decorate$23([doc(), operation], e, "relu", null), __decorate$23([doc(), operation], e, "elu", null), __decorate$23([doc(), operation], e, "selu", null), __decorate$23([doc(), operation], e, "leakyRelu", null), __decorate$23([doc(), operation], e, "prelu", null), __decorate$23([doc(), operation], e, "sigmoid", null), __decorate$23([doc(), operation], e, "logSigmoid", null), __decorate$23([doc(), operation], e, "softplus", null), __decorate$23([doc(), operation], e, "sin", null), __decorate$23([doc(), operation], e, "cos", null), __decorate$23([doc(), operation], e, "tan", null), __decorate$23([doc(), operation], e, "asin", null), __decorate$23([doc(), operation], e, "acos", null), __decorate$23([doc(), operation], e, "atan", null), __decorate$23([doc(), operation], e, "sinh", null), __decorate$23([doc(), operation], e, "cosh", null), __decorate$23([doc(), operation], e, "tanh", null), __decorate$23([doc(), operation], e, "asinh", null), __decorate$23([doc(), operation], e, "acosh", null), __decorate$23([doc(), operation], e, "atanh", null), __decorate$23([doc(), operation], e, "erf", null), __decorate$23([doc(), operation], e, "step", null), e
		}(),
		batchNormalization = BatchNormOps.batchNormalization,
		batchNormalization2d = BatchNormOps.batchNormalization2d,
		batchNormalization3d = BatchNormOps.batchNormalization3d,
		batchNormalization4d = BatchNormOps.batchNormalization4d,
		concat = ConcatOps.concat,
		concat1d = ConcatOps.concat1d,
		concat2d = ConcatOps.concat2d,
		concat3d = ConcatOps.concat3d,
		concat4d = ConcatOps.concat4d,
		conv1d = ConvOps.conv1d,
		conv2d = ConvOps.conv2d,
		conv2dTranspose = ConvOps.conv2dTranspose,
		depthwiseConv2d = ConvOps.depthwiseConv2d,
		separableConv2d = ConvOps.separableConv2d,
		matMul = MatmulOps.matMul,
		matrixTimesVector = MatmulOps.matrixTimesVector,
		outerProduct = MatmulOps.outerProduct,
		vectorTimesMatrix = MatmulOps.vectorTimesMatrix,
		dot = MatmulOps.dot,
		avgPool = PoolOps.avgPool,
		maxPool = PoolOps.maxPool,
		transpose = TransposeOps.transpose,
		reverse = ReverseOps.reverse,
		reverse1d = ReverseOps.reverse1d,
		reverse2d = ReverseOps.reverse2d,
		reverse3d = ReverseOps.reverse3d,
		reverse4d = ReverseOps.reverse4d,
		slice = SliceOps.slice,
		slice1d = SliceOps.slice1d,
		slice2d = SliceOps.slice2d,
		slice3d = SliceOps.slice3d,
		slice4d = SliceOps.slice4d,
		stridedSlice = StridedSliceOps.stridedSlice,
		argMax = ReductionOps.argMax,
		argMin = ReductionOps.argMin,
		logSumExp = ReductionOps.logSumExp,
		max = ReductionOps.max,
		mean = ReductionOps.mean,
		min = ReductionOps.min,
		moments = ReductionOps.moments,
		sum = ReductionOps.sum,
		unsortedSegmentSum = ReductionOps.unsortedSegmentSum,
		equal = CompareOps.equal,
		equalStrict = CompareOps.equalStrict,
		greater = CompareOps.greater,
		greaterStrict = CompareOps.greaterStrict,
		greaterEqual = CompareOps.greaterEqual,
		greaterEqualStrict = CompareOps.greaterEqualStrict,
		less = CompareOps.less,
		lessStrict = CompareOps.lessStrict,
		lessEqual = CompareOps.lessEqual,
		lessEqualStrict = CompareOps.lessEqualStrict,
		notEqual = CompareOps.notEqual,
		notEqualStrict = CompareOps.notEqualStrict,
		logicalNot = LogicalOps.logicalNot,
		logicalAnd = LogicalOps.logicalAnd,
		logicalOr = LogicalOps.logicalOr,
		logicalXor = LogicalOps.logicalXor,
		where = LogicalOps.where,
		abs = UnaryOps.abs,
		acos = UnaryOps.acos,
		acosh = UnaryOps.acosh,
		asin = UnaryOps.asin,
		asinh = UnaryOps.asinh,
		atan = UnaryOps.atan,
		atanh = UnaryOps.atanh,
		ceil = UnaryOps.ceil,
		clipByValue = UnaryOps.clipByValue,
		cos = UnaryOps.cos,
		cosh = UnaryOps.cosh,
		elu = UnaryOps.elu,
		exp = UnaryOps.exp,
		expm1 = UnaryOps.expm1,
		floor = UnaryOps.floor,
		sign = UnaryOps.sign,
		leakyRelu = UnaryOps.leakyRelu,
		log = UnaryOps.log,
		log1p = UnaryOps.log1p,
		logSigmoid = UnaryOps.logSigmoid,
		neg = UnaryOps.neg,
		prelu = UnaryOps.prelu,
		relu = UnaryOps.relu,
		reciprocal = UnaryOps.reciprocal,
		round = UnaryOps.round,
		selu = UnaryOps.selu,
		sigmoid = UnaryOps.sigmoid,
		sin = UnaryOps.sin,
		sinh = UnaryOps.sinh,
		softplus = UnaryOps.softplus,
		sqrt = UnaryOps.sqrt,
		rsqrt = UnaryOps.rsqrt,
		square = UnaryOps.square,
		step = UnaryOps.step,
		tan = UnaryOps.tan,
		tanh$1 = UnaryOps.tanh,
		erf = UnaryOps.erf,
		add = BinaryOps.add,
		addStrict = BinaryOps.addStrict,
		atan2 = BinaryOps.atan2,
		div = BinaryOps.div,
		floorDiv = BinaryOps.floorDiv,
		divStrict = BinaryOps.divStrict,
		maximum = BinaryOps.maximum,
		maximumStrict = BinaryOps.maximumStrict,
		minimum = BinaryOps.minimum,
		minimumStrict = BinaryOps.minimumStrict,
		mod = BinaryOps.mod,
		modStrict = BinaryOps.modStrict,
		mul = BinaryOps.mul,
		mulStrict = BinaryOps.mulStrict,
		pow = BinaryOps.pow,
		powStrict = BinaryOps.powStrict,
		sub = BinaryOps.sub,
		subStrict = BinaryOps.subStrict,
		squaredDifference = BinaryOps.squaredDifference,
		squaredDifferenceStrict = BinaryOps.squaredDifferenceStrict,
		norm = NormOps.norm,
		cast = ArrayOps.cast,
		clone = ArrayOps.clone,
		fromPixels = ArrayOps.fromPixels,
		toPixels = ArrayOps.toPixels,
		ones = ArrayOps.ones,
		onesLike = ArrayOps.onesLike,
		zeros = ArrayOps.zeros,
		zerosLike = ArrayOps.zerosLike,
		eye = ArrayOps.eye,
		rand = ArrayOps.rand,
		randomNormal = ArrayOps.randomNormal,
		truncatedNormal = ArrayOps.truncatedNormal,
		randomUniform = ArrayOps.randomUniform,
		multinomial = ArrayOps.multinomial,
		reshape = ArrayOps.reshape,
		squeeze = ArrayOps.squeeze,
		tile = ArrayOps.tile,
		gather = ArrayOps.gather,
		oneHot = ArrayOps.oneHot,
		linspace = ArrayOps.linspace,
		range = ArrayOps.range,
		buffer = ArrayOps.buffer,
		fill = ArrayOps.fill,
		tensor = ArrayOps.tensor,
		scalar = ArrayOps.scalar,
		tensor1d = ArrayOps.tensor1d,
		tensor2d = ArrayOps.tensor2d,
		tensor3d = ArrayOps.tensor3d,
		tensor4d = ArrayOps.tensor4d,
		tensor5d = ArrayOps.tensor5d,
		print = ArrayOps.print,
		expandDims = ArrayOps.expandDims,
		stack = ArrayOps.stack,
		unstack = ArrayOps.unstack,
		split = ArrayOps.split,
		cumsum = ArrayOps.cumsum,
		pad = ArrayOps.pad,
		pad1d = ArrayOps.pad1d,
		pad2d = ArrayOps.pad2d,
		pad3d = ArrayOps.pad3d,
		pad4d = ArrayOps.pad4d,
		movingAverage = MovingAverageOps.movingAverage,
		basicLSTMCell = LSTMOps.basicLSTMCell,
		multiRNNCell = LSTMOps.multiRNNCell,
		softmax = SoftmaxOps.softmax,
		localResponseNormalization = LRNOps.localResponseNormalization,
		linalg = LinalgOps,
		losses = {
			absoluteDifference: LossOps.absoluteDifference,
			computeWeightedLoss: LossOps.computeWeightedLoss,
			cosineDistance: LossOps.cosineDistance,
			hingeLoss: LossOps.hingeLoss,
			huberLoss: LossOps.huberLoss,
			logLoss: LossOps.logLoss,
			meanSquaredError: LossOps.meanSquaredError,
			softmaxCrossEntropy: SoftmaxOps.softmaxCrossEntropy
		},
		image = {
			resizeBilinear: ImageOps.resizeBilinear,
			resizeNearestNeighbor: ImageOps.resizeNearestNeighbor
		},
		__extends = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$24 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		__awaiter$1 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$1 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		TensorBuffer = function() {
			function e(e, t, r) {
				if (this.dtype = t, null != r) {
					var n = r.length,
						a = sizeFromShape(e);
					assert(n === a, "Length of values '" + n + "' does not match the size inferred by the shape '" + a + "'")
				}
				this.shape = e.slice(), this.values = r || getTypedArrayFromDType(t, sizeFromShape(e)), this.strides = computeStrides(e), this.size = sizeFromShape(e)
			}
			return e.prototype.set = function(e) {
				for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
				0 === t.length && (t = [0]), assert(t.length === this.rank, "The number of provided coordinates (" + t.length + ") must match the rank (" + this.rank + ")");
				var n = this.locToIndex(t);
				this.values[n] = e
			}, e.prototype.get = function() {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				0 === e.length && (e = [0]);
				for (var r = e[e.length - 1], n = 0; n < e.length - 1; ++n) r += this.strides[n] * e[n];
				return this.values[r]
			}, e.prototype.locToIndex = function(e) {
				if (0 === this.rank) return 0;
				if (1 === this.rank) return e[0];
				for (var t = e[e.length - 1], r = 0; r < e.length - 1; ++r) t += this.strides[r] * e[r];
				return t
			}, e.prototype.indexToLoc = function(e) {
				if (0 === this.rank) return [];
				if (1 === this.rank) return [e];
				for (var t = new Array(this.shape.length), r = 0; r < t.length - 1; ++r) t[r] = Math.floor(e / this.strides[r]), e -= t[r] * this.strides[r];
				return t[t.length - 1] = e, t
			}, Object.defineProperty(e.prototype, "rank", {
				get: function() {
					return this.shape.length
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.toTensor = function() {
				return Tensor.make(this.shape, {
					values: this.values
				}, this.dtype)
			}, __decorate$24([doc()], e.prototype, "set", null), __decorate$24([doc()], e.prototype, "get", null), __decorate$24([doc()], e.prototype, "toTensor", null), e = __decorate$24([doc()], e)
		}(),
		Tensor = function() {
			function e(e, r, n, a) {
				this.isDisposedInternal = !1, this.size = sizeFromShape(e), null != n && assert(this.size === n.length, "Constructing tensor of shape (" + this.size + ") should match the length of values (" + n.length + ")"), this.shape = e.slice(), this.dtype = r || "float32", this.strides = computeStrides(e), this.dataId = null != a ? a : {}, this.id = t.nextId++, this.rankType = this.rank < 5 ? this.rank.toString() : "higher", ENV.engine.registerTensor(this), null != n && ENV.engine.write(this.dataId, n)
			}
			return t = e, e.make = function(e, r, n) {
				return new t(e, n, r.values, r.dataId)
			}, e.prototype.flatten = function() {
				return this.throwIfDisposed(), this.as1D()
			}, e.prototype.asScalar = function() {
				return this.throwIfDisposed(), assert(1 === this.size, "The array must have only 1 element."), this.reshape([])
			}, e.prototype.as1D = function() {
				return this.throwIfDisposed(), this.reshape([this.size])
			}, e.prototype.as2D = function(e, t) {
				return this.throwIfDisposed(), this.reshape([e, t])
			}, e.prototype.as3D = function(e, t, r) {
				return this.throwIfDisposed(), this.reshape([e, t, r])
			}, e.prototype.as4D = function(e, t, r, n) {
				return this.throwIfDisposed(), this.reshape([e, t, r, n])
			}, e.prototype.asType = function(e) {
				return this.throwIfDisposed(), cast(this, e)
			}, Object.defineProperty(e.prototype, "rank", {
				get: function() {
					return this.shape.length
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.get = function() {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				assert(e.length === this.rank, "Number of coordinates in get() must match the rank of the tensor"), this.throwIfDisposed(), 0 === e.length && (e = [0]);
				for (var r = e[e.length - 1], n = 0; n < e.length - 1; ++n) r += this.strides[n] * e[n];
				return this.dataSync()[r]
			}, e.prototype.buffer = function() {
				return buffer(this.shape, this.dtype, this.dataSync())
			}, e.prototype.data = function() {
				return __awaiter$1(this, void 0, void 0, function() {
					return __generator$1(this, function(e) {
						return this.throwIfDisposed(), [2, ENV.engine.read(this.dataId)]
					})
				})
			}, e.prototype.dataSync = function() {
				return this.throwIfDisposed(), ENV.engine.readSync(this.dataId)
			}, e.prototype.dispose = function() {
				this.isDisposed || (ENV.engine.disposeTensor(this), this.isDisposedInternal = !0)
			}, Object.defineProperty(e.prototype, "isDisposed", {
				get: function() {
					return this.isDisposedInternal
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.throwIfDisposed = function() {
				if (this.isDisposed) throw new Error("Tensor is disposed.")
			}, e.prototype.toFloat = function() {
				return this.asType("float32")
			}, e.prototype.toInt = function() {
				return this.asType("int32")
			}, e.prototype.toBool = function() {
				return this.asType("bool")
			}, e.prototype.print = function(e) {
				return void 0 === e && (e = !1), print(this, e)
			}, e.prototype.reshape = function(e) {
				return this.throwIfDisposed(), reshape(this, e)
			}, e.prototype.reshapeAs = function(e) {
				return this.throwIfDisposed(), this.reshape(e.shape)
			}, e.prototype.expandDims = function(e) {
				return void 0 === e && (e = 0), expandDims(this, e)
			}, e.prototype.cumsum = function(e, t, r) {
				return void 0 === e && (e = 0), void 0 === t && (t = !1), void 0 === r && (r = !1), cumsum(this, e, t, r)
			}, e.prototype.squeeze = function(e) {
				return this.throwIfDisposed(), squeeze(this, e)
			}, e.prototype.clone = function() {
				return this.throwIfDisposed(), clone(this)
			}, e.prototype.toString = function(e) {
				return void 0 === e && (e = !1), tensorToString(this, e)
			}, e.prototype.tile = function(e) {
				return this.throwIfDisposed(), tile(this, e)
			}, e.prototype.gather = function(e, t) {
				return void 0 === t && (t = 0), this.throwIfDisposed(), gather(this, e, t)
			}, e.prototype.matMul = function(e, t, r) {
				return void 0 === t && (t = !1), void 0 === r && (r = !1), this.throwIfDisposed(), matMul(this, e, t, r)
			}, e.prototype.dot = function(e) {
				return this.throwIfDisposed(), dot(this, e)
			}, e.prototype.norm = function(e, t, r) {
				return void 0 === e && (e = "euclidean"), void 0 === t && (t = null), void 0 === r && (r = !1), this.throwIfDisposed(), norm(this, e, t, r)
			}, e.prototype.slice = function(e, t) {
				return this.throwIfDisposed(), slice(this, e, t)
			}, e.prototype.reverse = function(e) {
				return this.throwIfDisposed(), reverse(this, e)
			}, e.prototype.concat = function(e, t) {
				return void 0 === t && (t = 0), this.throwIfDisposed(), concat([this, e], t)
			}, e.prototype.stack = function(e, t) {
				return void 0 === t && (t = 0), stack([this, e], t)
			}, e.prototype.unstack = function(e, t) {
				return void 0 === t && (t = 0), unstack(this, t)
			}, e.prototype.pad = function(e, t) {
				return void 0 === t && (t = 0), pad(this, e, t)
			}, e.prototype.batchNormalization = function(e, t, r, n, a) {
				return void 0 === r && (r = .001), this.throwIfDisposed(), batchNormalization(this, e, t, r, n, a)
			}, e.prototype.logSumExp = function(e, t) {
				return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), logSumExp(this, e, t)
			}, e.prototype.sum = function(e, t) {
				return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), sum(this, e, t)
			}, e.prototype.mean = function(e, t) {
				return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), mean(this, e, t)
			}, e.prototype.min = function(e, t) {
				return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), min(this, e, t)
			}, e.prototype.max = function(e, t) {
				return void 0 === e && (e = null), void 0 === t && (t = !1), this.throwIfDisposed(), max(this, e, t)
			}, e.prototype.argMin = function(e) {
				return void 0 === e && (e = null), this.throwIfDisposed(), argMin(this, e)
			}, e.prototype.argMax = function(e) {
				return void 0 === e && (e = null), this.throwIfDisposed(), argMax(this, e)
			}, e.prototype.cast = function(e) {
				return this.throwIfDisposed(), cast(this, e)
			}, e.prototype.add = function(e) {
				return this.throwIfDisposed(), add(this, e)
			}, e.prototype.addStrict = function(e) {
				return this.throwIfDisposed(), addStrict(this, e)
			}, e.prototype.sub = function(e) {
				return this.throwIfDisposed(), sub(this, e)
			}, e.prototype.subStrict = function(e) {
				return this.throwIfDisposed(), subStrict(this, e)
			}, e.prototype.pow = function(e) {
				return this.throwIfDisposed(), pow(this, e)
			}, e.prototype.powStrict = function(e) {
				return this.throwIfDisposed(), powStrict(this, e)
			}, e.prototype.mul = function(e) {
				return this.throwIfDisposed(), mul(this, e)
			}, e.prototype.mulStrict = function(e) {
				return this.throwIfDisposed(), mulStrict(this, e)
			}, e.prototype.div = function(e) {
				return this.throwIfDisposed(), div(this, e)
			}, e.prototype.floorDiv = function(e) {
				return this.throwIfDisposed(), floorDiv(this, e)
			}, e.prototype.divStrict = function(e) {
				return this.throwIfDisposed(), divStrict(this, e)
			}, e.prototype.minimum = function(e) {
				return this.throwIfDisposed(), minimum(this, e)
			}, e.prototype.minimumStrict = function(e) {
				return this.throwIfDisposed(), minimumStrict(this, e)
			}, e.prototype.maximum = function(e) {
				return this.throwIfDisposed(), maximum(this, e)
			}, e.prototype.maximumStrict = function(e) {
				return this.throwIfDisposed(), maximumStrict(this, e)
			}, e.prototype.mod = function(e) {
				return this.throwIfDisposed(), mod(this, e)
			}, e.prototype.modStrict = function(e) {
				return this.throwIfDisposed(), modStrict(this, e)
			}, e.prototype.squaredDifference = function(e) {
				return this.throwIfDisposed(), squaredDifference(this, e)
			}, e.prototype.squaredDifferenceStrict = function(e) {
				return this.throwIfDisposed(), squaredDifferenceStrict(this, e)
			}, e.prototype.transpose = function(e) {
				return this.throwIfDisposed(), transpose(this, e)
			}, e.prototype.notEqual = function(e) {
				return this.throwIfDisposed(), notEqual(this, e)
			}, e.prototype.notEqualStrict = function(e) {
				return this.throwIfDisposed(), notEqualStrict(this, e)
			}, e.prototype.less = function(e) {
				return this.throwIfDisposed(), less(this, e)
			}, e.prototype.lessStrict = function(e) {
				return this.throwIfDisposed(), lessStrict(this, e)
			}, e.prototype.equal = function(e) {
				return this.throwIfDisposed(), equal(this, e)
			}, e.prototype.equalStrict = function(e) {
				return this.throwIfDisposed(), equalStrict(this, e)
			}, e.prototype.lessEqual = function(e) {
				return this.throwIfDisposed(), lessEqual(this, e)
			}, e.prototype.lessEqualStrict = function(e) {
				return this.throwIfDisposed(), lessEqualStrict(this, e)
			}, e.prototype.greater = function(e) {
				return this.throwIfDisposed(), greater(this, e)
			}, e.prototype.greaterStrict = function(e) {
				return this.throwIfDisposed(), greaterStrict(this, e)
			}, e.prototype.greaterEqual = function(e) {
				return this.throwIfDisposed(), greaterEqual(this, e)
			}, e.prototype.greaterEqualStrict = function(e) {
				return this.throwIfDisposed(), greaterEqualStrict(this, e)
			}, e.prototype.logicalAnd = function(e) {
				return this.throwIfDisposed(), logicalAnd(this, e)
			}, e.prototype.logicalOr = function(e) {
				return this.throwIfDisposed(), logicalOr(this, e)
			}, e.prototype.logicalNot = function() {
				return this.throwIfDisposed(), logicalNot(this)
			}, e.prototype.logicalXor = function(e) {
				return this.throwIfDisposed(), logicalXor(this, e)
			}, e.prototype.where = function(e, t) {
				return this.throwIfDisposed(), where(e, this, t)
			}, e.prototype.neg = function() {
				return this.throwIfDisposed(), neg(this)
			}, e.prototype.ceil = function() {
				return this.throwIfDisposed(), ceil(this)
			}, e.prototype.floor = function() {
				return this.throwIfDisposed(), floor(this)
			}, e.prototype.sign = function() {
				return this.throwIfDisposed(), sign(this)
			}, e.prototype.exp = function() {
				return this.throwIfDisposed(), exp(this)
			}, e.prototype.expm1 = function() {
				return this.throwIfDisposed(), expm1(this)
			}, e.prototype.log = function() {
				return this.throwIfDisposed(), log(this)
			}, e.prototype.log1p = function() {
				return this.throwIfDisposed(), log1p(this)
			}, e.prototype.sqrt = function() {
				return this.throwIfDisposed(), sqrt(this)
			}, e.prototype.rsqrt = function() {
				return this.throwIfDisposed(), rsqrt(this)
			}, e.prototype.square = function() {
				return this.throwIfDisposed(), square(this)
			}, e.prototype.reciprocal = function() {
				return this.throwIfDisposed(), reciprocal(this)
			}, e.prototype.abs = function() {
				return this.throwIfDisposed(), abs(this)
			}, e.prototype.clipByValue = function(e, t) {
				return this.throwIfDisposed(), clipByValue(this, e, t)
			}, e.prototype.relu = function() {
				return this.throwIfDisposed(), relu(this)
			}, e.prototype.elu = function() {
				return this.throwIfDisposed(), elu(this)
			}, e.prototype.selu = function() {
				return this.throwIfDisposed(), selu(this)
			}, e.prototype.leakyRelu = function(e) {
				return void 0 === e && (e = .2), this.throwIfDisposed(), leakyRelu(this, e)
			}, e.prototype.prelu = function(e) {
				return this.throwIfDisposed(), prelu(this, e)
			}, e.prototype.sigmoid = function() {
				return this.throwIfDisposed(), sigmoid(this)
			}, e.prototype.logSigmoid = function() {
				return this.throwIfDisposed(), logSigmoid(this)
			}, e.prototype.softplus = function() {
				return this.throwIfDisposed(), softplus(this)
			}, e.prototype.sin = function() {
				return this.throwIfDisposed(), sin(this)
			}, e.prototype.cos = function() {
				return this.throwIfDisposed(), cos(this)
			}, e.prototype.tan = function() {
				return this.throwIfDisposed(), tan(this)
			}, e.prototype.asin = function() {
				return this.throwIfDisposed(), asin(this)
			}, e.prototype.acos = function() {
				return this.throwIfDisposed(), acos(this)
			}, e.prototype.atan = function() {
				return this.throwIfDisposed(), atan(this)
			}, e.prototype.sinh = function() {
				return this.throwIfDisposed(), sinh(this)
			}, e.prototype.cosh = function() {
				return this.throwIfDisposed(), cosh(this)
			}, e.prototype.tanh = function() {
				return this.throwIfDisposed(), tanh$1(this)
			}, e.prototype.asinh = function() {
				return this.throwIfDisposed(), asinh(this)
			}, e.prototype.acosh = function() {
				return this.throwIfDisposed(), acosh(this)
			}, e.prototype.atanh = function() {
				return this.throwIfDisposed(), atanh(this)
			}, e.prototype.erf = function() {
				return this.throwIfDisposed(), erf(this)
			}, e.prototype.round = function() {
				return this.throwIfDisposed(), round(this)
			}, e.prototype.step = function(e) {
				return void 0 === e && (e = 0), this.throwIfDisposed(), step(this, e)
			}, e.prototype.softmax = function(e) {
				return void 0 === e && (e = -1), this.throwIfDisposed(), softmax(this, e)
			}, e.prototype.resizeBilinear = function(e, t) {
				return void 0 === t && (t = !1), this.throwIfDisposed(), image.resizeBilinear(this, e, t)
			}, e.prototype.resizeNearestNeighbor = function(e, t) {
				return void 0 === t && (t = !1), this.throwIfDisposed(), image.resizeNearestNeighbor(this, e, t)
			}, e.prototype.conv1d = function(e, t, r, n, a, o) {
				return void 0 === n && (n = "NWC"), void 0 === a && (a = 1), this.throwIfDisposed(), conv1d(this, e, t, r, n, a, o)
			}, e.prototype.conv2d = function(e, t, r, n, a, o) {
				return void 0 === n && (n = "NHWC"), void 0 === a && (a = [1, 1]), this.throwIfDisposed(), conv2d(this, e, t, r, n, a, o)
			}, e.prototype.conv2dTranspose = function(e, t, r, n, a) {
				return this.throwIfDisposed(), conv2dTranspose(this, e, t, r, n, a)
			}, e.prototype.depthwiseConv2D = function(e, t, r, n, a, o) {
				return void 0 === n && (n = "NHWC"), void 0 === a && (a = [1, 1]), this.throwIfDisposed(), depthwiseConv2d(this, e, t, r, n, a, o)
			}, e.prototype.avgPool = function(e, t, r, n) {
				return this.throwIfDisposed(), avgPool(this, e, t, r, n)
			}, e.prototype.maxPool = function(e, t, r, n) {
				return this.throwIfDisposed(), maxPool(this, e, t, r, n)
			}, e.prototype.localResponseNormalization = function(e, t, r, n) {
				return void 0 === e && (e = 5), void 0 === t && (t = 1), void 0 === r && (r = 1), void 0 === n && (n = .5), localResponseNormalization(this, e, t, r, n)
			}, e.prototype.variable = function(e, t, r) {
				return void 0 === e && (e = !0), this.throwIfDisposed(), Variable.variable(this, e, t, r)
			}, e.prototype.unsortedSegmentSum = function(e, t, r) {
				return void 0 === r && (r = 0), this.throwIfDisposed(), unsortedSegmentSum(this, e, t, r)
			}, e.nextId = 0, __decorate$24([doc()], e.prototype, "flatten", null), __decorate$24([doc()], e.prototype, "asScalar", null), __decorate$24([doc()], e.prototype, "as1D", null), __decorate$24([doc()], e.prototype, "as2D", null), __decorate$24([doc()], e.prototype, "as3D", null), __decorate$24([doc()], e.prototype, "as4D", null), __decorate$24([doc()], e.prototype, "asType", null), __decorate$24([doc()], e.prototype, "buffer", null), __decorate$24([doc()], e.prototype, "data", null), __decorate$24([doc()], e.prototype, "dataSync", null), __decorate$24([doc()], e.prototype, "dispose", null), __decorate$24([doc()], e.prototype, "toFloat", null), __decorate$24([doc()], e.prototype, "toInt", null), __decorate$24([doc()], e.prototype, "toBool", null), __decorate$24([doc()], e.prototype, "print", null), __decorate$24([doc()], e.prototype, "reshape", null), __decorate$24([doc()], e.prototype, "reshapeAs", null), __decorate$24([doc()], e.prototype, "expandDims", null), __decorate$24([doc()], e.prototype, "cumsum", null), __decorate$24([doc()], e.prototype, "squeeze", null), __decorate$24([doc()], e.prototype, "clone", null), __decorate$24([doc()], e.prototype, "toString", null), e = t = __decorate$24([doc()], e);
			var t
		}(),
		Variable = function(e) {
			function t(t, n, a) {
				void 0 === n && (n = !0);
				var o = e.call(this, t.shape, t.dtype, null, t.dataId) || this;
				return o.trainable = n, o.name = a, null == o.name && (o.name = r.nextVarId.toString(), r.nextVarId++), ENV.engine.registerVariable(o), o
			}
			return __extends(t, e), r = t, t.variable = function(e, t, n, a) {
				return void 0 === t && (t = !0), null != a && a !== e.dtype && (e = e.asType(a)), new r(e, t, n)
			}, t.prototype.assign = function(e) {
				if (e.dtype !== this.dtype) throw new Error("dtype of the new value (" + e.dtype + ") and previous value (" + this.dtype + ") must match");
				if (!arraysEqual(e.shape, this.shape)) throw new Error("shape of the new value (" + e.shape + ") and previous value (" + this.shape + ") must match");
				ENV.engine.disposeTensor(this), this.dataId = e.dataId, ENV.engine.registerTensor(this)
			}, t.nextVarId = 0, __decorate$24([doc()], t.prototype, "assign", null), __decorate$24([doc()], t, "variable", null), t = r = __decorate$24([doc()], t);
			var r
		}(Tensor),
		variable = Variable.variable,
		__decorate$25 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		Gradients = function() {
			function e() {}
			return e.gradScope = function(e, t) {
				return tidy(e, t, !0)
			}, e.grad = function(e) {
				return assert(isFunction(e), "The f passed in grad(f) must be a function"),
					function(t, r) {
						return assert(t instanceof Tensor, "The x passed in grad(f)(x) must be a tensor"), assert(null == r || r instanceof Tensor, "The dy passed in grad(f)(x, dy) must be a tensor"), tidy(function() {
							var n = ENV.engine.gradients(function() {
									return e(t)
								}, [t], r),
								a = n.value,
								o = n.grads;
							return null != r && assertShapesMatch(a.shape, r.shape, "The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"), checkGrads(o), o[0]
						})
					}
			}, e.grads = function(e) {
				return assert(isFunction(e), "The f passed in grads(f) must be a function"),
					function(t, r) {
						return assert(Array.isArray(t) && t.every(function(e) {
							return e instanceof Tensor
						}), "The args passed in grads(f)(args) must be an array of tensors"), assert(null == r || r instanceof Tensor, "The dy passed in grads(f)(args, dy) must be a tensor"), tidy(function() {
							var n = ENV.engine.gradients(function() {
									return e.apply(void 0, t)
								}, t, r),
								a = n.value,
								o = n.grads;
							return null != r && assertShapesMatch(a.shape, r.shape, "The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"), checkGrads(o), o
						})
					}
			}, e.valueAndGrad = function(e) {
				return assert(isFunction(e), "The f passed in valueAndGrad(f) must be a function"),
					function(t, r) {
						assert(t instanceof Tensor, "The x passed in valueAndGrad(f)(x) must be a tensor"), assert(null == r || r instanceof Tensor, "The dy passed in valueAndGrad(f)(x, dy) must be a tensor");
						var n = ENV.engine.gradients(function() {
								return e(t)
							}, [t], r),
							a = n.grads,
							o = n.value;
						return checkGrads(a), {
							grad: a[0],
							value: o
						}
					}
			}, e.valueAndGrads = function(e) {
				return assert(isFunction(e), "The f passed in valueAndGrads(f) must be a function"),
					function(t, r) {
						assert(Array.isArray(t) && t.every(function(e) {
							return e instanceof Tensor
						}), "The args passed in valueAndGrads(f)(args) must be array of tensors"), assert(null == r || r instanceof Tensor, "The dy passed in valueAndGrads(f)(args, dy) must be a tensor");
						var n = ENV.engine.gradients(function() {
							return e.apply(void 0, t)
						}, t, r);
						return null != r && assertShapesMatch(n.value.shape, r.shape, "The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"), checkGrads(n.grads), n
					}
			}, e.variableGrads = function(e, t) {
				if (assert(isFunction(e), "The f passed in variableGrads(f) must be a function"), assert(null == t || Array.isArray(t) && t.every(function(e) {
						return e instanceof Variable
					}), "The varList passed in variableGrads(f, varList) must be an array of variables"), null == t) {
					t = [];
					for (var r in ENV.engine.registeredVariables) t.push(ENV.engine.registeredVariables[r])
				}
				var n = t.length;
				assert((t = t.filter(function(e) {
					return e.trainable
				})).length > 0, "variableGrads() expects at least one of the input variables to be trainable, but none of the " + n + " variables is trainable.");
				var a = ENV.engine.gradients(e, t, null, !0),
					o = a.value,
					i = a.grads;
				assert(i.some(function(e) {
					return null != e
				}), "Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."), assert(0 === o.rank, "The f passed in variableGrads(f) must return a scalar, but it returned a rank-" + o.rank + " tensor");
				var s = {};
				return t.forEach(function(e, t) {
					null != i[t] && (s[e.name] = i[t])
				}), {
					value: o,
					grads: s
				}
			}, e.customGrad = function(e) {
				return ENV.engine.customGrad(e)
			}, __decorate$25([doc()], e, "grad", null), __decorate$25([doc()], e, "grads", null), __decorate$25([doc()], e, "valueAndGrad", null), __decorate$25([doc()], e, "valueAndGrads", null), __decorate$25([doc()], e, "variableGrads", null), __decorate$25([doc()], e, "customGrad", null), e
		}(),
		tidy = Tracking.tidy,
		keep = Tracking.keep,
		dispose = Tracking.dispose,
		time = Tracking.time,
		grad = Gradients.grad,
		valueAndGrad = Gradients.valueAndGrad,
		grads = Gradients.grads,
		valueAndGrads = Gradients.valueAndGrads,
		variableGrads = Gradients.variableGrads,
		customGrad = Gradients.customGrad,
		Profiler = function() {
			function e(e, t) {
				this.backendTimer = e, this.logger = t, null == t && (this.logger = new Logger)
			}
			return e.prototype.profileKernel = function(e, t) {
				var r, n = this,
					a = this.backendTimer.time(function() {
						r = t()
					}),
					o = r.dataSync();
				return checkForNaN(o, r.dtype, e), a.then(function(t) {
					n.logger.logKernelProfile(e, r, o, t.kernelMs)
				}), r
			}, e
		}(),
		Logger = function() {
			function e() {}
			return e.prototype.logKernelProfile = function(e, t, r, n) {
				var a = rightPad(n + "ms", 9),
					o = rightPad(e, 25),
					i = t.rank,
					s = t.size,
					u = rightPad(t.shape.toString(), 14);
				console.log("%c" + o + "\t%c" + a + "\t%c" + i + "D " + u + "\t%c" + s, "font-weight:bold", "color:red", "color:blue", "color: orange")
			}, e
		}(),
		__awaiter$2 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$2 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		Engine = function() {
			function e(e, t) {
				this.backend = e, this.safeMode = t, this.registeredVariables = {}, this.refCounter = new WeakMap, this.nextTapeNodeId = 0, this.numBytes = 0, this.numTensors = 0, this.numDataBuffers = 0, this.gradientScopeCount = 0, this.customGradientDepth = 0, this.keepTensors = new Set, this.activeScope = {
					track: []
				}, this.scopeStack = [this.activeScope], this.profiler = new Profiler(e)
			}
			return e.prototype.runKernel = function(e, t, r) {
				var n, a = this,
					o = [],
					i = function(e) {
						return o.push(e), e
					},
					s = this.activeScope.name;
				if (this.customGradientDepth++, n = ENV.get("DEBUG") ? this.profiler.profileKernel(s, function() {
						return e(a.backend, i)
					}) : e(this.backend, i), this.customGradientDepth--, this.shouldRecord()) {
					var u = {
						id: this.nextTapeNodeId++,
						name: s,
						inputs: t,
						output: n
					};
					null != r && (u.gradient = function(e) {
						return r(e, o)
					}), this.activeTape.push(u)
				}
				return n
			}, e.prototype.registerTensor = function(e) {
				var t = this.refCounter.has(e.dataId) ? this.refCounter.get(e.dataId) : 0;
				this.numTensors++, 0 === t && (this.numDataBuffers++, this.numBytes += sizeFromShape(e.shape) * bytesPerElement(e.dtype), this.backend.register(e.dataId, e.shape, e.dtype)), this.refCounter.set(e.dataId, t + 1), e instanceof Variable || this.track(e)
			}, e.prototype.registerVariable = function(e) {
				if (null != this.registeredVariables[e.name]) throw new Error("Variable with name " + e.name + " was already registered");
				this.registeredVariables[e.name] = e
			}, e.prototype.disposeTensor = function(e) {
				if (this.refCounter.has(e.dataId)) {
					this.numTensors--;
					var t = this.refCounter.get(e.dataId);
					t <= 1 ? (this.refCounter.delete(e.dataId), this.backend.disposeData(e.dataId), this.numDataBuffers--, this.numBytes -= sizeFromShape(e.shape) * bytesPerElement(e.dtype)) : this.refCounter.set(e.dataId, t - 1)
				}
			}, e.prototype.disposeVariables = function() {
				for (var e in this.registeredVariables) {
					var t = this.registeredVariables[e];
					this.disposeTensor(t), delete this.registeredVariables[e]
				}
			}, e.prototype.memory = function() {
				var e = this.backend.memory();
				return e.numTensors = this.numTensors, e.numDataBuffers = this.numDataBuffers, e.numBytes = this.numBytes, e
			}, e.prototype.shouldRecord = function() {
				return null != this.activeTape && 0 === this.customGradientDepth
			}, e.prototype.addTapeNode = function(e, t, r) {
				var n = {};
				e.forEach(function(e, t) {
					n[t] = e
				});
				var a = {
					id: this.nextTapeNodeId++,
					name: this.activeScope.name,
					inputs: n,
					output: t,
					gradient: function(e) {
						var t = {};
						return r(e).forEach(function(e, r) {
							t[r] = function() {
								return e
							}
						}), t
					}
				};
				this.activeTape.push(a)
			}, e.prototype.keep = function(e) {
				if (1 === this.scopeStack.length && ENV.engine.safeMode) throw new Error("Safe mode is ON. Enclose all tensor operations inside tf.tidy(): tf.tidy(() => {...}) to avoid memory leaks.");
				return this.keepTensors.add(e.id), e
			}, e.prototype.startScope = function(e, t) {
				void 0 === t && (t = !1), t && 0 === this.gradientScopeCount && (this.activeTape = []), t && this.gradientScopeCount++;
				var r = {
					track: []
				};
				e && (r.name = e), this.scopeStack.push(r), this.activeScope = r
			}, e.prototype.endScope = function(e, t) {
				var r = this;
				void 0 === t && (t = !1), t && 0 === --this.gradientScopeCount && (this.activeTape = null);
				var n = new Set(this.keepTensors),
					a = getTensorsInContainer(e);
				a.forEach(function(e) {
					return n.add(e.id)
				});
				for (var o = 0; o < this.activeScope.track.length; o++) {
					var i = this.activeScope.track[o];
					n.has(i.id) || (null != this.activeTape ? a.push(i) : i.dispose())
				}
				var s = this.scopeStack.pop();
				this.activeScope = 0 === this.scopeStack.length ? {
					track: []
				} : this.scopeStack[this.scopeStack.length - 1], a.forEach(function(e) {
					!r.keepTensors.has(e.id) && isTensorInList(e, s.track) && r.track(e)
				})
			}, e.prototype.gradients = function(e, t, r, n) {
				var a = this;
				return void 0 === n && (n = !1), assert(t.length > 0, "gradients() received an empty list of xs."), tidy("gradients", function() {
					var o = e();
					assert(o instanceof Tensor, "The result y returned by f() must be a tensor.");
					var i = getFilteredNodesXToY(a.activeTape, t, o);
					if (!n && 0 === i.length && t.length > 0) throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");
					var s = {};
					return s[o.id] = null == r ? ones(o.shape) : r, backpropagateGradients(s, i), {
						value: o,
						grads: t.map(function(e) {
							return s[e.id]
						})
					}
				}, !0)
			}, e.prototype.customGrad = function(e) {
				var t = this;
				return assert(isFunction(e), "The f passed in customGrad(f) must be a function."),
					function() {
						for (var r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
						assert(r.every(function(e) {
							return e instanceof Tensor
						}), "The args passed in customGrad(f)(x1, x2,...) must all be tensors"), t.customGradientDepth++;
						var a, o = tidy(e.name, function() {
							var t = e.apply(void 0, r),
								n = t.value,
								o = t.gradFunc;
							return assert(n instanceof Tensor, "The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"), assert(isFunction(o), "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."), a = o, n
						}, !0);
						if (t.customGradientDepth--, t.shouldRecord()) {
							t.addTapeNode(r, o, function(e) {
								var t = a(e),
									n = Array.isArray(t) ? t : [t];
								return assert(n.length === r.length, "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."), assert(n.every(function(e) {
									return e instanceof Tensor
								}), "The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors."), n
							})
						}
						return o
					}
			}, e.prototype.write = function(e, t) {
				this.backend.write(e, t)
			}, e.prototype.readSync = function(e) {
				return this.backend.readSync(e)
			}, e.prototype.read = function(e) {
				return this.backend.read(e)
			}, e.prototype.fromPixels = function(e, t) {
				return this.backend.fromPixels(e, t)
			}, e.prototype.time = function(e) {
				return __awaiter$2(this, void 0, void 0, function() {
					var t, r;
					return __generator$2(this, function(n) {
						switch (n.label) {
							case 0:
								return t = performance.now(), [4, this.backend.time(e)];
							case 1:
								return r = n.sent(), r.wallMs = performance.now() - t, [2, r]
						}
					})
				})
			}, e.prototype.track = function(e) {
				if (1 === this.scopeStack.length && this.safeMode) throw new Error("Safe mode is ON. Enclose all tensor operations inside tf.tidy(): tf.tidy(() => {op();...}); to avoid memory leaks.");
				return this.activeScope.track.push(e), e
			}, e
		}(),
		__decorate$26 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		Type;
	! function(e) {
		e[e.NUMBER = 0] = "NUMBER", e[e.BOOLEAN = 1] = "BOOLEAN", e[e.STRING = 2] = "STRING"
	}(Type || (Type = {}));
	var URL_PROPERTIES = [{
			name: "DEBUG",
			type: Type.BOOLEAN
		}, {
			name: "IS_BROWSER",
			type: Type.BOOLEAN
		}, {
			name: "WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",
			type: Type.NUMBER
		}, {
			name: "WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",
			type: Type.BOOLEAN
		}, {
			name: "WEBGL_VERSION",
			type: Type.NUMBER
		}, {
			name: "WEBGL_FLOAT_TEXTURE_ENABLED",
			type: Type.BOOLEAN
		}, {
			name: "WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED",
			type: Type.BOOLEAN
		}, {
			name: "BACKEND",
			type: Type.STRING
		}],
		Environment = function() {
			function e(e) {
				this.features = {}, this.registry = {}, null != e && (this.features = e), this.get("DEBUG") && console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")
			}
			return e.setBackend = function(e, t) {
				if (void 0 === t && (t = !1), !(e in ENV.registry)) throw new Error("Backend type '" + e + "' not found in registry");
				ENV.initBackend(e, t)
			}, e.getBackend = function() {
				return ENV.initDefaultBackend(), ENV.currentBackend
			}, e.disposeVariables = function() {
				ENV.engine.disposeVariables()
			}, e.memory = function() {
				return ENV.engine.memory()
			}, e.prototype.get = function(e) {
				return e in this.features ? this.features[e] : (this.features[e] = this.evaluateFeature(e), this.features[e])
			}, e.prototype.set = function(e, t) {
				this.features[e] = t
			}, e.prototype.getBestBackendType = function() {
				var e = this;
				if (0 === Object.keys(this.registry).length) throw new Error("No backend found in registry.");
				return Object.keys(this.registry).map(function(t) {
					return {
						name: t,
						entry: e.registry[t]
					}
				}).sort(function(e, t) {
					return t.entry.priority - e.entry.priority
				})[0].name
			}, e.prototype.evaluateFeature = function(e) {
				if ("DEBUG" === e) return !1;
				if ("IS_BROWSER" === e) return "undefined" != typeof window;
				if ("IS_NODE" === e) return "undefined" != typeof process && void 0 !== process.versions.node;
				if ("BACKEND" === e) return this.getBestBackendType();
				if ("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION" === e) {
					var t = this.get("WEBGL_VERSION");
					return 0 === t ? 0 : getWebGLDisjointQueryTimerVersion(t)
				}
				if ("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE" === e) return this.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") > 0 && !isMobile();
				if ("WEBGL_VERSION" === e) return isWebGLVersionEnabled(2) ? 2 : isWebGLVersionEnabled(1) ? 1 : 0;
				if ("WEBGL_FLOAT_TEXTURE_ENABLED" === e) return isFloatTextureReadPixelsEnabled(this.get("WEBGL_VERSION"));
				if ("WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED" === e) return isWebGLGetBufferSubDataAsyncExtensionEnabled(this.get("WEBGL_VERSION"));
				throw new Error("Unknown feature " + e + ".")
			}, e.prototype.setFeatures = function(e) {
				this.features = e
			}, e.prototype.reset = function() {
				this.features = getFeaturesFromURL(), null != this.globalEngine && (this.globalEngine = null)
			}, e.prototype.initBackend = function(e, t) {
				void 0 === t && (t = !1), this.currentBackend = e;
				var r = ENV.findBackend(e);
				this.globalEngine = new Engine(r, t)
			}, e.prototype.findBackend = function(e) {
				return e in this.registry ? this.registry[e].backend : null
			}, e.prototype.registerBackend = function(e, t, r) {
				void 0 === r && (r = 1), e in this.registry && console.warn(e + " backend was already registered");
				try {
					var n = t();
					return this.registry[e] = {
						backend: n,
						priority: r
					}, !0
				} catch (t) {
					return console.warn("Registration of backend " + e + " failed"), console.warn(t.stack || t.message), !1
				}
			}, e.prototype.removeBackend = function(e) {
				if (!(e in this.registry)) throw new Error(e + " backend not found in registry");
				this.registry[e].backend.dispose(), delete this.registry[e]
			}, Object.defineProperty(e.prototype, "engine", {
				get: function() {
					return this.initDefaultBackend(), this.globalEngine
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.initDefaultBackend = function() {
				null == this.globalEngine && this.initBackend(ENV.get("BACKEND"), !1)
			}, __decorate$26([doc()], e, "setBackend", null), __decorate$26([doc()], e, "getBackend", null), __decorate$26([doc()], e, "disposeVariables", null), __decorate$26([doc()], e, "memory", null), e
		}(),
		TENSORFLOWJS_FLAGS_PREFIX = "tfjsflags",
		ENV = getOrMakeEnvironment(),
		environment = Object.freeze({
			get Type() {
				return Type
			},
			URL_PROPERTIES: URL_PROPERTIES,
			Environment: Environment,
			ENV: ENV
		}),
		PARALLELIZE_THRESHOLD = 30,
		ArgMinMaxProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["A"];
				var n = e.windowSize,
					a = e.batchSize,
					o = e.inSize,
					i = Math.ceil(o / n);
				r || this.variableNames.push("bestIndicesA"), this.outputShape = [a, i];
				var s = "max" === t ? ">" : "<",
					u = r ? "inOffset + i;" : "round(getBestIndicesA(batch, inOffset + i));";
				this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * " + n + ";\n\n        int bestIndex = 0;\n        float bestValue = getA(batch, inOffset);\n\n        for (int i = 0; i < " + n + "; i++) {\n          int inIdx = " + u + ";\n          float candidate = getA(batch, inIdx);\n          if (candidate " + s + " bestValue) {\n            bestValue = candidate;\n            bestIndex = inIdx;\n          }\n        }\n        setOutput(float(bestIndex));\n      }\n    "
			}
		}(),
		AvgPool2DBackpropProgram = function() {
			return function(e) {
				this.variableNames = ["dy"], this.outputShape = e.inShape;
				var t = e.filterHeight,
					r = e.filterWidth,
					n = e.strideHeight,
					a = e.strideWidth,
					o = t - 1 - e.padInfo.top,
					i = r - 1 - e.padInfo.left,
					s = 1 / (t * r);
				this.userCode = "\n      const ivec2 pads = ivec2(" + o + ", " + i + ");\n      const float avgMultiplier = float(" + s + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + t + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + n + ".0;\n\n          if (dyR < 0.0 || dyR >= " + e.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < " + r + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + a + ".0;\n\n            if (dyC < 0.0 || dyC >= " + e.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n\n            dotProd += dyValue * avgMultiplier;\n          }\n        }\n        setOutput(dotProd);\n      }\n    "
			}
		}(),
		BatchNormProgram = function() {
			return function(e, t, r, n, a, o) {
				this.outputShape = [], this.supportsBroadcasting = !0, this.variableNames = ["x", "mean", "variance"], assertAndGetBroadcastShape(e, t), assertAndGetBroadcastShape(e, r);
				var i = "0.0";
				null != n && (assertAndGetBroadcastShape(e, n), this.variableNames.push("offset"), i = "getOffsetAtOutCoords()");
				var s = "1.0";
				null != a && (assertAndGetBroadcastShape(e, a), this.variableNames.push("scale"), s = "getScaleAtOutCoords()"), this.outputShape = e, this.userCode = "\n      void main() {\n        float x = getXAtOutCoords();\n        float mean = getMeanAtOutCoords();\n        float variance = getVarianceAtOutCoords();\n        float offset = " + i + ";\n        float scale = " + s + ";\n        float inv = scale * inversesqrt(variance + float(" + o + "));\n        setOutput((x - mean) * inv + offset);\n      }\n    "
			}
		}(),
		CHECK_NAN_SNIPPET = "\n  if (isNaN(a)) return a;\n  if (isNaN(b)) return b;\n",
		ADD = "return a + b;",
		SUB = "return a - b;",
		MUL = "return a * b;",
		DIV = "return a / b;",
		INT_DIV = "\n  float resultSign = sign(a) * sign(b);\n  int ia = round(a);\n  int ib = round(b);\n  int result = ia / ib;\n  int amodb = ia - ib * result;\n\n  if (resultSign < 0.0 && amodb != 0) {\n    result -= 1;\n  }\n  return float(result);\n",
		POW = "\n  return (round(mod(b, 2.0)) == 0 || round(mod(b, 2.0)) == 2) ?\n      pow(abs(a), b) : sign(a) * pow(abs(a), b);\n",
		SQUARED_DIFFERENCE = "return (a - b) * (a - b);",
		EQUAL = "return float(a == b);",
		NOT_EQUAL = "return float(a != b);",
		LESS = "return float(a < b);",
		LESS_EQUAL = "return float(a <= b);",
		GREATER = "return float(a > b);",
		GREATER_EQUAL = "return float(a >= b);",
		LOGICAL_AND = "return float(a >= 1.0 && b >= 1.0);",
		LOGICAL_OR = "return float(a >= 1.0 || b >= 1.0);",
		MAX = CHECK_NAN_SNIPPET + "\n  return max(a, b);\n",
		MIN = CHECK_NAN_SNIPPET + "\n  return min(a, b);\n",
		MOD = "return mod(a, b);",
		ATAN2 = CHECK_NAN_SNIPPET + "\n  return atan(a, b);\n",
		ELU_DER = "return (b >= 1.0) ? a : a * (b + 1.0);",
		BinaryOpProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["A", "B"], this.supportsBroadcasting = !0, this.outputShape = assertAndGetBroadcastShape(t, r), this.userCode = "\n      float binaryOperation(float a, float b) {\n        " + e + "\n      }\n\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        setOutput(binaryOperation(a, b));\n      }\n    "
			}
		}(),
		ClipProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["A"], this.outputShape = e;
				var n = t.toFixed(20),
					a = r.toFixed(20);
				this.userCode = "\n      void main() {\n        float value = getAAtOutCoords();\n        if (isNaN(value)) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, " + n + ", " + a + "));\n      }\n    "
			}
		}(),
		ConcatProgram = function() {
			return function(e, t) {
				this.variableNames = ["A", "B"], this.outputShape = [], this.outputShape = computeOutShape(e, t, 1), this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int yR = coords.x;\n        int yC = coords.y;\n\n        float value = 0.0;\n        if (yC < " + e[1] + ") {\n          value = getA(yR, yC);\n        } else {\n          yC -= " + e[1] + ";\n          value = getB(yR, yC);\n        }\n\n        setOutput(value);\n      }\n    "
			}
		}(),
		Conv2DDerFilterProgram = function() {
			return function(e) {
				this.variableNames = ["x", "dy"], this.outputShape = e.filterShape;
				var t = e.strideHeight,
					r = e.strideWidth,
					n = e.padInfo.top,
					a = e.padInfo.left;
				this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int d2 = coords.w;\n\n        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int b = 0; b < " + e.batchSize + "; b++) {\n          for (int yR = 0; yR < " + e.outHeight + "; yR++) {\n            int xR = wR + yR * " + t + " - " + n + ";\n\n            if (xR < 0 || xR >= " + e.inHeight + ") {\n              continue;\n            }\n\n            for (int yC = 0; yC < " + e.outWidth + "; yC++) {\n              int xC = wC + yC * " + r + " - " + a + ";\n\n              if (xC < 0 || xC >= " + e.inWidth + ") {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    "
			}
		}(),
		Conv2DDerInputProgram = function() {
			return function(e) {
				this.variableNames = ["dy", "W"], this.outputShape = e.inShape;
				var t = e.filterHeight,
					r = e.filterWidth,
					n = e.strideHeight,
					a = e.strideWidth,
					o = t - 1 - e.padInfo.top,
					i = r - 1 - e.padInfo.left;
				this.userCode = "\n      const ivec2 pads = ivec2(" + o + ", " + i + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + t + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + n + ".0;\n\n          if (dyR < 0.0 || dyR >= " + e.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = " + t + " - 1 - wR;\n\n          for (int wC = 0; wC < " + r + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + a + ".0;\n\n            if (dyC < 0.0 || dyC >= " + e.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = " + r + " - 1 - wC;\n\n            for (int d2 = 0; d2 < " + e.outChannels + "; d2++) {\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, d2);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    "
			}
		}(),
		DepthwiseConv2DDerFilterProgram = function() {
			return function(e) {
				this.variableNames = ["x", "dy"], this.outputShape = e.filterShape;
				var t = e.strideHeight,
					r = e.strideWidth,
					n = e.padInfo.top,
					a = e.padInfo.left,
					o = e.outChannels / e.inChannels;
				this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int dm = coords.w;\n        int d2 = d1 * " + o + " + dm;\n\n        float dotProd = 0.0;\n\n        // TODO: Vec4 over the batch size\n        for (int b = 0; b < " + e.batchSize + "; b++) {\n          for (int yR = 0; yR < " + e.outHeight + "; yR++) {\n            int xR = wR + yR * " + t + " - " + n + ";\n\n            if (xR < 0 || xR >= " + e.inHeight + ") {\n              continue;\n            }\n\n            for (int yC = 0; yC < " + e.outWidth + "; yC++) {\n              int xC = wC + yC * " + r + " - " + a + ";\n\n              if (xC < 0 || xC >= " + e.inWidth + ") {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    "
			}
		}(),
		DepthwiseConv2DDerInputProgram = function() {
			return function(e) {
				this.variableNames = ["dy", "W"], this.outputShape = e.inShape;
				var t = e.filterHeight,
					r = e.filterWidth,
					n = e.strideHeight,
					a = e.strideWidth,
					o = t - 1 - e.padInfo.top,
					i = r - 1 - e.padInfo.left,
					s = e.outChannels / e.inChannels;
				this.userCode = "\n      const ivec2 pads = ivec2(" + o + ", " + i + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        float dotProd = 0.0;\n\n        for (int wR = 0; wR < " + t + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + n + ".0;\n\n          if (dyR < 0.0 || dyR >= " + e.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = " + t + " - 1 - wR;\n\n          for (int wC = 0; wC < " + r + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + a + ".0;\n\n            if (dyC < 0.0 || dyC >= " + e.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = " + r + " - 1 - wC;\n\n            // TODO: Vec4 over the channelMul\n            for (int dm = 0; dm < " + s + "; dm++) {\n              int d2 = d1 * " + s + " + dm;\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, dm);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    "
			}
		}(),
		Conv2DProgram = function() {
			return function(e) {
				this.variableNames = ["x", "W"], this.outputShape = e.outShape;
				var t = e.padInfo.top,
					r = e.padInfo.left,
					n = e.strideHeight,
					a = e.strideWidth,
					o = e.dilationHeight,
					i = e.dilationWidth,
					s = e.filterHeight,
					u = e.filterWidth,
					l = 4 * Math.floor(e.inChannels / 4),
					c = e.inChannels % 4;
				this.userCode = "\n      const ivec2 strides = ivec2(" + n + ", " + a + ");\n      const ivec2 pads = ivec2(" + t + ", " + r + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d2 = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + s + "; wR++) {\n          int xR = xRCorner + wR * " + o + ";\n\n          if (xR < 0 || xR >= " + e.inHeight + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + u + "; wC++) {\n            int xC = xCCorner + wC * " + i + ";\n\n            if (xC < 0 || xC >= " + e.inWidth + ") {\n              continue;\n            }\n\n            for (int d1 = 0; d1 < " + l + "; d1 += 4) {\n              vec4 xValues = vec4(\n                getX(batch, xR, xC, d1),\n                getX(batch, xR, xC, d1 + 1),\n                getX(batch, xR, xC, d1 + 2),\n                getX(batch, xR, xC, d1 + 3)\n              );\n              vec4 wValues = vec4(\n                getW(wR, wC, d1, d2),\n                getW(wR, wC, d1 + 1, d2),\n                getW(wR, wC, d1 + 2, d2),\n                getW(wR, wC, d1 + 3, d2)\n              );\n\n              dotProd += dot(xValues, wValues);\n            }\n\n            if (" + (1 === c) + ") {\n              dotProd +=\n                getX(batch, xR, xC, " + l + ") *\n                getW(wR, wC, " + l + ", d2);\n            } else if (" + (2 === c) + ") {\n              vec2 xValues = vec2(\n                getX(batch, xR, xC, " + l + "),\n                getX(batch, xR, xC, " + l + " + 1)\n              );\n              vec2 wValues = vec2(\n                getW(wR, wC, " + l + ", d2),\n                getW(wR, wC, " + l + " + 1, d2)\n              );\n              dotProd += dot(xValues, wValues);\n            } else if (" + (3 === c) + ") {\n              vec3 xValues = vec3(\n                getX(batch, xR, xC, " + l + "),\n                getX(batch, xR, xC, " + l + " + 1),\n                getX(batch, xR, xC, " + l + " + 2)\n              );\n              vec3 wValues = vec3(\n                getW(wR, wC, " + l + ", d2),\n                getW(wR, wC, " + l + " + 1, d2),\n                getW(wR, wC, " + l + " + 2, d2)\n              );\n              dotProd += dot(xValues, wValues);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    "
			}
		}(),
		DepthwiseConv2DProgram = function() {
			return function(e) {
				this.variableNames = ["x", "W"], this.outputShape = e.outShape;
				var t = e.inHeight,
					r = e.inWidth,
					n = e.padInfo.top,
					a = e.padInfo.left,
					o = e.strideHeight,
					i = e.strideWidth,
					s = e.dilationHeight,
					u = e.dilationWidth,
					l = e.filterHeight,
					c = e.filterWidth,
					p = e.outChannels / e.inChannels;
				this.userCode = "\n      const ivec2 strides = ivec2(" + o + ", " + i + ");\n      const ivec2 pads = ivec2(" + n + ", " + a + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2 / " + p + ";\n        int q = d2 - d1 * " + p + ";\n\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        // TODO(dsmilkov): Flatten the two for loops and vec4 the operations.\n        for (int wR = 0; wR < " + l + "; wR++) {\n          int xR = xRCorner + wR * " + s + ";\n\n          if (xR < 0 || xR >= " + t + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + c + "; wC++) {\n            int xC = xCCorner + wC * " + u + ";\n\n            if (xC < 0 || xC >= " + r + ") {\n              continue;\n            }\n\n            float xVal = getX(batch, xR, xC, d1);\n            float wVal = getW(wR, wC, d1, q);\n            dotProd += xVal * wVal;\n          }\n        }\n        setOutput(dotProd);\n      }\n    "
			}
		}(),
		TextureType;
	! function(e) {
		e[e.FLOAT = 0] = "FLOAT", e[e.UNSIGNED_BYTE = 1] = "UNSIGNED_BYTE"
	}(TextureType || (TextureType = {}));
	var FLOAT_MAX = 2e4,
		FLOAT_MIN = -FLOAT_MAX,
		FLOAT_RANGE = (FLOAT_MAX - FLOAT_MIN) / 255,
		FLOAT_DELTAS = [1, 1 / 255, 1 / 65025, 1 / 16581375],
		FLOAT_POWERS = [1, 255, 65025],
		BYTE_NAN_VALUE = 0,
		SAMPLE_1D_SNIPPET = "\nvec2 UVfrom1D(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
		SAMPLE_2D_SNIPPET = "\nvec2 UVfrom2D(int texNumR, int texNumC, int numC, int row, int col) {\n  int index = row * numC + col;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
		SAMPLE_3D_SNIPPET = "\nvec2 UVfrom3D(int texNumR, int texNumC, int stride0,\n    int stride1, int row, int col, int depth) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
		SAMPLE_4D_SNIPPET = "\nvec2 UVfrom4D(int texNumR, int texNumC, int stride0,\n    int stride1, int stride2, int row, int col, int depth,\n    int depth2) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + depth * stride2 + depth2;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
		SAMPLE_5D_SNIPPET = "\nvec2 UVfrom5D(int texNumR, int texNumC, int stride0,\n    int stride1, int stride2, int stride3, int row, int col, int depth,\n    int depth2, int depth3) {\n  // Explicitly use integer operations as dot() only works on floats.\n  int index = row * stride0 + col * stride1 + \n              depth * stride2 + depth2 * stride3 + depth3;\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n",
		UNSIGNED_BYTE_TEXTURE_SAMPLE_SNIPPET = "\n  uniform float NaN;\n\n  const vec4 floatDeltas = vec4(\n      1.0,\n      1.0 / 255.0,\n      1.0 / (255.0 * 255.0),\n      1.0 / (255.0 * 255.0 * 255.0)\n  );\n  const float minValue = " + FLOAT_MIN + ".0;\n  const float maxValue = " + FLOAT_MAX + ".0;\n  const float range = (maxValue - minValue) / 255.0;\n  const vec2 dotRange = vec2(1.0, range);\n\n  float sampleTexture(sampler2D textureSampler, vec2 uv) {\n    vec4 sampleValue = texture2D(textureSampler, uv);\n    if (all(equal(sampleValue, vec4(" + BYTE_NAN_VALUE + ")))) {\n      return NaN;\n    }\n\n    vec4 encValue = floor(sampleValue * 255.0 + 0.5);\n    float decodedValue = dot(encValue, floatDeltas);\n    return dot(vec2(minValue, decodedValue), dotRange);\n  }\n",
		UNSIGNED_BYTE_TEXTURE_SETOUTPUT_SNIPPET = "\n  const vec4 floatPowers = vec4(\n    1.0,\n    255.0,\n    255.0 * 255.0,\n    255.0 * 255.0 * 255.0\n  );\n  const vec2 recipRange = vec2(1.0/range);\n  const vec2 recipRange255 = vec2(1.0/(maxValue - minValue));\n\n  void setOutput(float decodedValue) {\n    if (isNaN(decodedValue)) {\n      gl_FragColor = vec4(" + BYTE_NAN_VALUE + ");\n      return;\n    }\n\n    float a = dot(vec2(decodedValue, -minValue), recipRange);\n    float b = fract(a) * 255.0;\n    float c = fract(b) * 255.0;\n    float d = fract(c) * 255.0;\n    gl_FragColor = floor(vec4(a, b, c, d)) / 255.0;\n\n    // TODO(dsmilkov): Version above gets better accuracy but probably slower\n    // than the version below. Benchmark to determine if the accuracy is worth\n    // the cost.\n\n    // float normValue = dot(vec2(decodedValue, -minValue), recipRange255);\n    // vec4 f = normValue * floatPowers;\n    // gl_FragColor = floor(fract(f) * 255.0) / 255.0;\n  }\n",
		FLOAT_TEXTURE_SAMPLE_SNIPPET = "\n  float sampleTexture(sampler2D textureSampler, vec2 uv) {\n    return texture2D(textureSampler, uv).r;\n  }\n",
		FLOAT_TEXTURE_SETOUTPUT_SNIPPET = "\n  void setOutput(float val) {\n    gl_FragColor = vec4(val, 0, 0, 0);\n  }\n",
		SHADER_PREFIX = "\n  precision highp float;\n  precision highp int;\n  varying vec2 resultUV;\n  const vec2 halfCR = vec2(0.5, 0.5);\n\n  struct ivec5\n  {\n    int x;\n    int y;\n    int z;\n    int w;\n    int u;\n  };\n\n  bool isNaN(float val) {\n    float v1 = val * val;\n    float v2 = val * val;\n    return v1 == v2 ? false : true;\n  }\n\n  bool hasNaN(vec4 values) {\n    vec4 v1 = values * values;\n    vec4 v2 = values * values;\n    return any(notEqual(v1, v2));\n  }\n\n  float getNaN(vec4 values) {\n    return dot(vec4(1), values);\n  }\n\n  int round(float value) {\n    return int(floor(value + 0.5));\n  }\n\n  int imod(int x, int y) {\n    return x - y * (x / y);\n  }\n\n  //Based on the work of Dave Hoskins\n  //https://www.shadertoy.com/view/4djSRW\n  #define HASHSCALE1 443.8975\n  float random(float seed){\n    vec2 p = resultUV * seed;\n    vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);\n    p3 += dot(p3, p3.yzx + 19.19);\n    return fract((p3.x + p3.y) * p3.z);\n  }\n\n  " + SAMPLE_1D_SNIPPET + "\n  " + SAMPLE_2D_SNIPPET + "\n  " + SAMPLE_3D_SNIPPET + "\n  " + SAMPLE_4D_SNIPPET + "\n  " + SAMPLE_5D_SNIPPET + "\n",
		CumSumProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["x"], this.outputShape = e;
				var n = e.length,
					a = e[e.length - 1],
					o = r ? "<" : ">";
				this.userCode = "\n      int getIndex(int i) {\n        " + (r ? "return " + a + " -i - 1;" : "return i;") + "\n      }\n\n      void main() {\n        " + getCoordsDataType(n) + " coords = getOutputCoords();\n        int end = " + getFinalCoord(n, "coords") + ";\n        float val = 0.0;\n        for (int i = " + a + " - 1; i >= 0; i -= 1) {\n          int idx = getIndex(i);\n          if (idx " + o + " end) {\n            continue;\n          }\n          if (idx == end && " + t + ") {\n            continue;\n          }\n          " + getFinalCoord(n, "coords") + " = idx;\n          val += getX(" + getCoords(n, "coords") + ");\n        }\n        setOutput(val);\n      }\n    "
			}
		}(),
		FromPixelsProgram = function() {
			return function(e) {
				this.variableNames = ["A"];
				var t = e[0],
					r = e[1];
				this.outputShape = e, this.userCode = "\n      void main() {\n        ivec3 coords = getOutputCoords();\n        int texR = coords[0];\n        int texC = coords[1];\n        int depth = coords[2];\n        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + r + ".0, " + t + ".0);\n\n        vec4 values = texture2D(A, uv);\n        float value;\n        if (depth == 0) {\n          value = values.r;\n        } else if (depth == 1) {\n          value = values.g;\n        } else if (depth == 2) {\n          value = values.b;\n        } else if (depth == 3) {\n          value = values.a;\n        }\n\n        setOutput(floor(value * 255.0 + 0.5));\n      }\n    "
			}
		}(),
		GatherProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["A", "indices"];
				var n = e.slice();
				n[r] = t, this.outputShape = n, this.rank = n.length;
				var a = getCoordsDataType(this.rank),
					o = getSourceCoords(e, r);
				this.userCode = "\n      void main() {\n        " + a + " resRC = getOutputCoords();\n        setOutput(getA(" + o + "));\n      }\n    "
			}
		}(),
		MAX_TEXTURE_SIZE = null,
		webGLDebugErrorCheckingEnabled = !1,
		lineNumberRegex = /ERROR: [0-9]+:([0-9]+):/g,
		webgl_util = Object.freeze({
			createWebGLRenderingContext: createWebGLRenderingContext,
			createWebGLRenderingContextFromCanvas: createWebGLRenderingContextFromCanvas,
			callAndCheck: callAndCheck,
			enableDebugWebGLErrorChecking: enableDebugWebGLErrorChecking,
			checkWebGLError: checkWebGLError,
			getWebGLErrorMessage: getWebGLErrorMessage,
			getExtensionOrThrow: getExtensionOrThrow,
			createVertexShader: createVertexShader,
			createFragmentShader: createFragmentShader,
			createProgram: createProgram,
			linkProgram: linkProgram,
			validateProgram: validateProgram,
			createStaticVertexBuffer: createStaticVertexBuffer,
			createStaticIndexBuffer: createStaticIndexBuffer,
			queryMaxTextureSize: queryMaxTextureSize,
			getChannelsPerTexture: getChannelsPerTexture,
			createTexture: createTexture,
			validateTextureSize: validateTextureSize,
			createFramebuffer: createFramebuffer,
			bindVertexBufferToProgramAttribute: bindVertexBufferToProgramAttribute,
			bindTextureUnit: bindTextureUnit,
			unbindTextureUnit: unbindTextureUnit,
			getProgramUniformLocationOrThrow: getProgramUniformLocationOrThrow,
			getProgramUniformLocation: getProgramUniformLocation,
			bindTextureToProgramUniformSampler: bindTextureToProgramUniformSampler,
			bindCanvasToFramebuffer: bindCanvasToFramebuffer,
			bindColorTextureToFramebuffer: bindColorTextureToFramebuffer,
			unbindColorTextureFromFramebuffer: unbindColorTextureFromFramebuffer,
			validateFramebuffer: validateFramebuffer,
			getFramebufferErrorMessage: getFramebufferErrorMessage,
			getTextureShapeFromLogicalShape: getTextureShapeFromLogicalShape
		}),
		__awaiter$3 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$3 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		floatDownloadBuffer = null,
		byteDownloadBuffer = null,
		gpgpu_util = Object.freeze({
			getWebGLContextAttributes: getWebGLContextAttributes,
			createWebGLContext: createWebGLContext,
			createVertexShader: createVertexShader$1,
			createVertexBuffer: createVertexBuffer,
			createIndexBuffer: createIndexBuffer,
			createMatrixTexture: createMatrixTexture,
			createColorMatrixTexture: createColorMatrixTexture,
			createPackedMatrixTexture: createPackedMatrixTexture,
			bindVertexProgramAttributeStreams: bindVertexProgramAttributeStreams,
			uploadPixelDataToTexture: uploadPixelDataToTexture,
			uploadMatrixToTexture: uploadMatrixToTexture,
			uploadMatrixToPackedTexture: uploadMatrixToPackedTexture,
			downloadMatrixFromOutputTextureAsync: downloadMatrixFromOutputTextureAsync,
			downloadMatrixFromOutputTexture: downloadMatrixFromOutputTexture,
			downloadMatrixFromRGBAColorTexture: downloadMatrixFromRGBAColorTexture,
			downloadMatrixFromPackedOutputTexture: downloadMatrixFromPackedOutputTexture
		}),
		__awaiter$4 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$4 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		GPGPUContext = function() {
			function e(e) {
				this.outputTexture = null, this.program = null, this.disposed = !1, this.autoDebugValidate = !1, this.vertexAttrsAreBound = !1, this.itemsToPoll = [], this.gl = null != e ? e : createWebGLContext(), 1 === ENV.get("WEBGL_VERSION") ? (this.textureFloatExtension = getExtensionOrThrow(this.gl, "OES_texture_float"), this.colorBufferFloatExtension = this.gl.getExtension("WEBGL_color_buffer_float")) : this.colorBufferFloatExtension = getExtensionOrThrow(this.gl, "EXT_color_buffer_float"), this.loseContextExtension = getExtensionOrThrow(this.gl, "WEBGL_lose_context"), ENV.get("WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED") && (this.getBufferSubDataAsyncExtension = this.gl.getExtension("WEBGL_get_buffer_sub_data_async")), this.vertexBuffer = createVertexBuffer(this.gl), this.indexBuffer = createIndexBuffer(this.gl), this.framebuffer = createFramebuffer(this.gl)
			}
			return e.prototype.dispose = function() {
				var e = this;
				if (!this.disposed) {
					null != this.program && console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."), null != this.outputTexture && console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");
					var t = this.gl;
					callAndCheck(t, function() {
						return t.finish()
					}), callAndCheck(t, function() {
						return t.bindFramebuffer(t.FRAMEBUFFER, null)
					}), callAndCheck(t, function() {
						return t.deleteFramebuffer(e.framebuffer)
					}), callAndCheck(t, function() {
						return t.bindBuffer(t.ARRAY_BUFFER, null)
					}), callAndCheck(t, function() {
						return t.deleteBuffer(e.vertexBuffer)
					}), callAndCheck(t, function() {
						return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null)
					}), callAndCheck(t, function() {
						return t.deleteBuffer(e.indexBuffer)
					}), this.loseContextExtension.loseContext(), this.disposed = !0
				}
			}, e.prototype.enableAutomaticDebugValidation = function(e) {
				this.autoDebugValidate = e, enableDebugWebGLErrorChecking(e)
			}, e.prototype.createMatrixTexture = function(e, t) {
				return this.throwIfDisposed(), createMatrixTexture(this.gl, e, t)
			}, e.prototype.uploadPixelDataToTexture = function(e, t) {
				this.throwIfDisposed(), uploadPixelDataToTexture(this.gl, e, t)
			}, e.prototype.createPackedMatrixTexture = function(e, t) {
				return this.throwIfDisposed(), createPackedMatrixTexture(this.gl, e, t)
			}, e.prototype.deleteMatrixTexture = function(e) {
				var t = this;
				this.throwIfDisposed(), this.outputTexture === e && (unbindColorTextureFromFramebuffer(this.gl, this.framebuffer), this.outputTexture = null), callAndCheck(this.gl, function() {
					return t.gl.deleteTexture(e)
				})
			}, e.prototype.uploadMatrixToTexture = function(e, t, r, n) {
				this.throwIfDisposed();
				return uploadMatrixToTexture(this.gl, e, t, r, n, 1)
			}, e.prototype.uploadMatrixToPackedTexture = function(e, t, r, n) {
				return this.throwIfDisposed(), uploadMatrixToPackedTexture(this.gl, e, t, r, n)
			}, e.prototype.downloadMatrixFromTexture = function(e, t, r) {
				var n = this;
				return this.downloadMatrixDriver(e, function() {
					return downloadMatrixFromOutputTexture(n.gl, t, r)
				})
			}, e.prototype.downloadMatrixFromTextureAsync = function(e, t, r) {
				return __awaiter$4(this, void 0, void 0, function() {
					var n = this;
					return __generator$4(this, function(a) {
						if (null == this.getBufferSubDataAsyncExtension) throw new Error("Cannot download matrix from output texture asynchronously, WEBGL_get_buffer_sub_data_async is not enabled.");
						return [2, this.downloadMatrixDriverAsync(e, function() {
							return downloadMatrixFromOutputTextureAsync(n.gl, n.getBufferSubDataAsyncExtension, t, r)
						})]
					})
				})
			}, e.prototype.downloadMatrixFromRGBAColorTexture = function(e, t, r, n) {
				var a = this;
				return this.downloadMatrixDriver(e, function() {
					return downloadMatrixFromRGBAColorTexture(a.gl, t, r, n)
				})
			}, e.prototype.downloadMatrixFromPackedTexture = function(e, t, r) {
				var n = this;
				return this.downloadMatrixDriver(e, function() {
					return downloadMatrixFromPackedOutputTexture(n.gl, t, r)
				})
			}, e.prototype.createProgram = function(e) {
				this.throwIfDisposed();
				var t = this.gl,
					r = createFragmentShader(t, e),
					n = createVertexShader$1(t),
					a = createProgram(t);
				return callAndCheck(t, function() {
					return t.attachShader(a, n)
				}), callAndCheck(t, function() {
					return t.attachShader(a, r)
				}), linkProgram(t, a), this.autoDebugValidate && validateProgram(t, a), this.vertexAttrsAreBound || (this.setProgram(a), this.vertexAttrsAreBound = bindVertexProgramAttributeStreams(t, this.program, this.vertexBuffer)), a
			}, e.prototype.deleteProgram = function(e) {
				var t = this;
				this.throwIfDisposed(), e === this.program && (this.program = null), null != e && callAndCheck(this.gl, function() {
					return t.gl.deleteProgram(e)
				})
			}, e.prototype.setProgram = function(e) {
				var t = this;
				this.throwIfDisposed(), this.program = e, null != this.program && this.autoDebugValidate && validateProgram(this.gl, this.program), callAndCheck(this.gl, function() {
					return t.gl.useProgram(e)
				})
			}, e.prototype.getUniformLocation = function(e, t, r) {
				return void 0 === r && (r = !0), this.throwIfDisposed(), r ? getProgramUniformLocationOrThrow(this.gl, e, t) : getProgramUniformLocation(this.gl, e, t)
			}, e.prototype.getAttributeLocation = function(e, t) {
				var r = this;
				return this.throwIfDisposed(), callAndCheck(this.gl, function() {
					return r.gl.getAttribLocation(e, t)
				})
			}, e.prototype.getUniformLocationNoThrow = function(e, t) {
				return this.throwIfDisposed(), this.gl.getUniformLocation(e, t)
			}, e.prototype.setInputMatrixTexture = function(e, t, r) {
				this.throwIfDisposed(), this.throwIfNoProgram(), bindTextureToProgramUniformSampler(this.gl, this.program, e, t, r)
			}, e.prototype.setOutputMatrixTexture = function(e, t, r) {
				this.setOutputMatrixTextureDriver(e, r, t)
			}, e.prototype.setOutputPackedMatrixTexture = function(e, t, r) {
				this.throwIfDisposed();
				var n = getPackedMatrixTextureShapeWidthHeight(t, r),
					a = n[0],
					o = n[1];
				this.setOutputMatrixTextureDriver(e, a, o)
			}, e.prototype.setOutputMatrixWriteRegion = function(e, t, r, n) {
				this.setOutputMatrixWriteRegionDriver(r, e, n, t)
			}, e.prototype.setOutputPackedMatrixWriteRegion = function(e, t, r, n) {
				throw new Error("setOutputPackedMatrixWriteRegion not implemented.")
			}, e.prototype.debugValidate = function() {
				null != this.program && validateProgram(this.gl, this.program), validateFramebuffer(this.gl)
			}, e.prototype.executeProgram = function() {
				this.throwIfDisposed(), this.throwIfNoProgram();
				var e = this.gl;
				this.autoDebugValidate && this.debugValidate(), callAndCheck(e, function() {
					return e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0)
				})
			}, e.prototype.blockUntilAllProgramsCompleted = function() {
				var e = this;
				this.throwIfDisposed(), callAndCheck(this.gl, function() {
					return e.gl.finish()
				})
			}, e.prototype.getQueryTimerExtension = function() {
				return null == this.disjointQueryTimerExtension && (this.disjointQueryTimerExtension = getExtensionOrThrow(this.gl, 2 === ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") ? "EXT_disjoint_timer_query_webgl2" : "EXT_disjoint_timer_query")), this.disjointQueryTimerExtension
			}, e.prototype.getQueryTimerExtensionWebGL2 = function() {
				return this.getQueryTimerExtension()
			}, e.prototype.getQueryTimerExtensionWebGL1 = function() {
				return this.getQueryTimerExtension()
			}, e.prototype.runQuery = function(e) {
				var t = this.beginQuery();
				return e(), this.endQuery(), this.pollQueryTime(t)
			}, e.prototype.beginQuery = function() {
				if (2 === ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")) {
					var e = this.gl,
						t = this.getQueryTimerExtensionWebGL2(),
						r = e.createQuery();
					return e.beginQuery(t.TIME_ELAPSED_EXT, r), r
				}
				var n = this.getQueryTimerExtensionWebGL1(),
					a = n.createQueryEXT();
				return n.beginQueryEXT(n.TIME_ELAPSED_EXT, a), a
			}, e.prototype.endQuery = function() {
				if (2 !== ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")) {
					var e = this.getQueryTimerExtensionWebGL1();
					e.endQueryEXT(e.TIME_ELAPSED_EXT)
				} else {
					var t = this.gl,
						r = this.getQueryTimerExtensionWebGL2();
					t.endQuery(r.TIME_ELAPSED_EXT)
				}
			}, e.prototype.isQueryAvailable = function(e, t) {
				if (0 === t) return !0;
				if (2 === t) {
					var r = this.gl,
						n = this.getQueryTimerExtensionWebGL2(),
						a = r.getQueryParameter(e, r.QUERY_RESULT_AVAILABLE);
					return null == this.disjoint && (this.disjoint = this.gl.getParameter(n.GPU_DISJOINT_EXT)), a && !this.disjoint
				}
				a = (n = this.getQueryTimerExtensionWebGL1()).getQueryObjectEXT(e, n.QUERY_RESULT_AVAILABLE_EXT);
				return null == this.disjoint && (this.disjoint = this.gl.getParameter(n.GPU_DISJOINT_EXT)), a && !this.disjoint
			}, e.prototype.pollQueryTime = function(e) {
				var t = this;
				return new Promise(function(r) {
					var n = ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION");
					t.addItemToPoll(function() {
						return t.isQueryAvailable(e, n)
					}, function() {
						return r(t.getQueryTime(e, n))
					})
				})
			}, e.prototype.pollItems = function() {
				for (var e = binSearchLastTrue(this.itemsToPoll.map(function(e) {
						return e.isDoneFn
					})), t = 0; t <= e; ++t)(0, this.itemsToPoll[t].resolveFn)();
				this.itemsToPoll = this.itemsToPoll.slice(e + 1)
			}, e.prototype.addItemToPoll = function(e, t) {
				var r = this;
				this.itemsToPoll.push({
					isDoneFn: e,
					resolveFn: t
				}), this.itemsToPoll.length > 1 || repeatedTry(function() {
					return r.pollItems(), 0 === r.itemsToPoll.length
				})
			}, e.prototype.getQueryTime = function(e, t) {
				if (0 === t) return null;
				if (2 === t) {
					var r = this.gl;
					return (a = r.getQueryParameter(e, r.QUERY_RESULT)) / 1e6
				}
				var n = this.getQueryTimerExtensionWebGL1(),
					a = n.getQueryObjectEXT(e, n.QUERY_RESULT_EXT);
				return a / 1e6
			}, e.prototype.downloadMatrixDriverSetup = function(e) {
				this.throwIfDisposed(), bindColorTextureToFramebuffer(this.gl, e, this.framebuffer), this.autoDebugValidate && validateFramebuffer(this.gl)
			}, e.prototype.downloadMatrixDriverTeardown = function() {
				null != this.outputTexture ? (bindColorTextureToFramebuffer(this.gl, this.outputTexture, this.framebuffer), this.autoDebugValidate && validateFramebuffer(this.gl)) : unbindColorTextureFromFramebuffer(this.gl, this.framebuffer)
			}, e.prototype.downloadMatrixDriver = function(e, t) {
				this.downloadMatrixDriverSetup(e);
				var r = t();
				return this.downloadMatrixDriverTeardown(), r
			}, e.prototype.downloadMatrixDriverAsync = function(e, t) {
				return __awaiter$4(this, void 0, void 0, function() {
					var r;
					return __generator$4(this, function(n) {
						switch (n.label) {
							case 0:
								return this.downloadMatrixDriverSetup(e), [4, t()];
							case 1:
								return r = n.sent(), this.downloadMatrixDriverTeardown(), [2, r]
						}
					})
				})
			}, e.prototype.setOutputMatrixTextureDriver = function(e, t, r) {
				this.throwIfDisposed();
				var n = this.gl;
				bindColorTextureToFramebuffer(n, e, this.framebuffer), this.autoDebugValidate && validateFramebuffer(n), this.outputTexture = e, callAndCheck(n, function() {
					return n.viewport(0, 0, t, r)
				}), callAndCheck(n, function() {
					return n.scissor(0, 0, t, r)
				})
			}, e.prototype.setOutputMatrixWriteRegionDriver = function(e, t, r, n) {
				var a = this;
				this.throwIfDisposed(), callAndCheck(this.gl, function() {
					return a.gl.scissor(e, t, r, n)
				})
			}, e.prototype.throwIfDisposed = function() {
				if (this.disposed) throw new Error("Attempted to use disposed GPGPUContext.")
			}, e.prototype.throwIfNoProgram = function() {
				if (null == this.program) throw new Error("No GPU program is currently set.")
			}, e
		}(),
		NAN_UNIFORM_NAME = "NaN",
		WhereProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["c", "a", "b"], this.outputShape = t;
				var n, a;
				if (r > 4) throw Error("Where for rank " + r + " is not yet supported");
				if (1 === r) a = "resRC", n = "resRC";
				else {
					for (var o = ["resRC.x", "resRC.y", "resRC.z", "resRC.w"], i = [], s = [], u = 0; u < t.length; u++) s.push("" + o[u]), u < e && i.push("" + o[u]);
					n = i.join(), a = s.join()
				}
				var l = getCoordsDataType(r);
				this.userCode = "\n      void main() {\n        " + l + " resRC = getOutputCoords();\n        float cVal = getC(" + n + ");\n        if (cVal >= 1.0) {\n          setOutput(getA(" + a + "));\n        } else {\n          setOutput(getB(" + a + "));\n        }\n      }\n    "
			}
		}(),
		LRNProgram = function() {
			return function(e, t, r, n, a) {
				this.variableNames = ["x"], this.outputShape = [];
				var o = t,
					i = e[3] - 1;
				this.outputShape = e;
				var s, u = "float(" + r + ") + float(" + n + ") * sum";
				s = .5 === a ? "inversesqrt(" + u + ")" : 1 === a ? "1.0/(" + u + ")" : "exp(log(" + u + ") * float(-" + a + "));", this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n        int d = coords[3];\n        float x = getX(b, r, c, d);\n        float sum = 0.0;\n        for (int j = -" + o + "; j <= " + o + "; j++) {\n          int idx = d + j;\n          if (idx >= 0 && idx <=  " + i + ") {\n            float z = getX(b, r, c, idx);\n            sum += z * z;\n          }\n        }\n        float val = x * " + s + ";\n        setOutput(val);\n      }\n    "
			}
		}(),
		MaxPool2DBackpropProgram = function() {
			return function(e) {
				this.variableNames = ["dy", "maxPos"], this.outputShape = e.inShape;
				var t = e.filterHeight,
					r = e.filterWidth,
					n = e.strideHeight,
					a = e.strideWidth,
					o = t - 1 - e.padInfo.top,
					i = r - 1 - e.padInfo.left,
					s = t * r - 1;
				this.userCode = "\n      const ivec2 pads = ivec2(" + o + ", " + i + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n\n        ivec2 dyRCCorner = coords.yz - pads;\n        int dyRCorner = dyRCCorner.x;\n        int dyCCorner = dyRCCorner.y;\n\n        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + t + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + n + ".0;\n\n          if (dyR < 0.0 || dyR >= " + e.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          for (int wC = 0; wC < " + r + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + a + ".0;\n\n            if (dyC < 0.0 || dyC >= " + e.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            float dyValue = getDy(b, idyR, idyC, d);\n            int maxPosValue = " + s + " - int(getMaxPos(b, idyR, idyC, d));\n\n            // Get the current value, check it against the value from the\n            // position matrix.\n            int curPosValue = wR * " + r + " + wC;\n            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);\n\n            dotProd += dyValue * mask;\n          }\n        }\n        setOutput(dotProd);\n      }\n    "
			}
		}(),
		MatMulProgram = function() {
			return function(e, t, r, n) {
				void 0 === r && (r = !1), void 0 === n && (n = !1), this.variableNames = ["matrixA", "matrixB"];
				var a = r ? e[1] : e[0],
					o = n ? t[0] : t[1],
					i = r ? e[0] : e[1];
				this.outputShape = [a, o];
				var s = function(e, t) {
						return r ? t + " + " + e + ", aRow" : "aRow, " + t + " + " + e
					},
					u = function(e, t) {
						return n ? "bCol, " + t + " + " + e : t + " + " + e + ", bCol"
					},
					l = 4 * Math.floor(i / 4),
					c = i % 4;
				this.userCode = " float dotARowBCol(int aRow, int bCol) {\n      float result = 0.0;\n      for (int i = 0; i < " + l + "; i += 4) {\n        vec4 a = vec4(\n          getMatrixA(" + s(0, "i") + "),\n          getMatrixA(" + s(1, "i") + "),\n          getMatrixA(" + s(2, "i") + "),\n          getMatrixA(" + s(3, "i") + ")\n        );\n        vec4 b = vec4(\n          getMatrixB(" + u(0, "i") + "),\n          getMatrixB(" + u(1, "i") + "),\n          getMatrixB(" + u(2, "i") + "),\n          getMatrixB(" + u(3, "i") + ")\n        );\n\n        result += dot(a, b);\n      }\n\n      if (" + (1 === c) + ") {\n        result += getMatrixA(" + s(0, l) + ") *\n          getMatrixB(" + u(0, l) + ");\n      } else if (" + (2 === c) + ") {\n        vec2 a = vec2(\n          getMatrixA(" + s(0, l) + "),\n          getMatrixA(" + s(1, l) + ")\n        );\n        vec2 b = vec2(\n          getMatrixB(" + u(0, l) + "),\n          getMatrixB(" + u(1, l) + ")\n        );\n        result += dot(a, b);\n      } else if (" + (3 === c) + ") {\n        vec3 a = vec3(\n          getMatrixA(" + s(0, l) + "),\n          getMatrixA(" + s(1, l) + "),\n          getMatrixA(" + s(2, l) + ")\n        );\n        vec3 b = vec3(\n          getMatrixB(" + u(0, l) + "),\n          getMatrixB(" + u(1, l) + "),\n          getMatrixB(" + u(2, l) + ")\n        );\n        result += dot(a, b);\n      }\n\n      return result;\n    }\n\n    void main() {\n      ivec2 resRC = getOutputCoords();\n      setOutput(dotARowBCol(resRC.x, resRC.y));\n    }\n    "
			}
		}(),
		MultinomialProgram = function() {
			function e(e, t, r) {
				this.variableNames = ["probs"], this.outputShape = [e, r], this.userCode = "\n      uniform float seed;\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n\n        float r = random(seed);\n        float cdf = 0.0;\n\n        for (int i = 0; i < " + (t - 1) + "; i++) {\n          cdf += getProbs(batch, i);\n\n          if (r < cdf) {\n            setOutput(float(i));\n            return;\n          }\n        }\n\n        // If no other event happened, last event happened.\n        setOutput(float(" + (t - 1) + "));\n      }\n    "
			}
			return e.prototype.getCustomSetupFunc = function(e) {
				var t = this;
				return function(r, n) {
					null == t.seedLoc && (t.seedLoc = r.getUniformLocation(n, "seed")), r.gl.uniform1f(t.seedLoc, e)
				}
			}, e
		}(),
		OneHotProgram = function() {
			return function(e, t, r, n) {
				this.variableNames = ["indices"], this.outputShape = [e, t], this.userCode = "\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int index = round(getIndices(coords.x));\n        setOutput(mix(float(" + n + "), float(" + r + "),\n                      float(index == coords.y)));\n      }\n    "
			}
		}(),
		PadProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["x"], this.outputShape = t.map(function(t, r) {
					return t[0] + e[r] + t[1]
				});
				var n = e.length,
					a = getCoordsDataType(n),
					o = t.map(function(e) {
						return e[0]
					}).join(","),
					i = t.map(function(t, r) {
						return t[0] + e[r]
					}).join(","),
					s = ["coords[0]", "coords[1]", "coords[2]", "coords[3]"].slice(0, n);
				this.userCode = 1 !== n ? "\n      " + a + " start = " + a + "(" + o + ");\n      " + a + " end = " + a + "(" + i + ");\n\n      void main() {\n        " + a + " outC = getOutputCoords();\n        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {\n          setOutput(float(" + r + "));\n        } else {\n          " + a + " coords = outC - start;\n          setOutput(getX(" + s + "));\n        }\n      }\n    " : "\n        int start = " + o + ";\n        int end = " + i + ";\n\n        void main() {\n          int outC = getOutputCoords();\n          if (outC < start || outC >= end) {\n            setOutput(float(" + r + "));\n          } else {\n            setOutput(getX(outC - start));\n          }\n        }\n      "
			}
		}(),
		Pool2DProgram = function() {
			return function(e, t, r) {
				if (this.variableNames = ["x"], "avg" === t && r) throw new Error("Cannot compute positions for average pool.");
				var n = e.filterHeight,
					a = e.filterWidth,
					o = e.strideHeight,
					i = e.strideWidth,
					s = e.padInfo.top,
					u = e.padInfo.left;
				this.outputShape = e.outShape;
				var l = "avg" === t,
					c = "0.0";
				if (l || (c = "-1.0 / 0.0"), r) this.userCode = "\n        const ivec2 strides = ivec2(" + o + ", " + i + ");\n        const ivec2 pads = ivec2(" + s + ", " + u + ");\n\n        void main() {\n          ivec4 coords = getOutputCoords();\n          int batch = coords[0];\n          int d = coords[3];\n\n          ivec2 xRCCorner = coords.yz * strides - pads;\n          int xRCorner = xRCCorner.x;\n          int xCCorner = xRCCorner.y;\n\n          // max/min x(?, ?, d) to get y(yR, yC, d).\n          // ? = to be determined\n          float minMaxValue = 0.0;\n          float minMaxValueFound = 0.0;\n          int minMaxPosition = 0;\n          float avgValue = 0.0;\n\n          for (int wR = 0; wR < " + n + "; wR++) {\n            int xR = xRCorner + wR;\n\n            if (xR < 0 || xR >= " + e.inHeight + ") {\n              continue;\n            }\n\n            for (int wC = 0; wC < " + a + "; wC++) {\n              int xC = xCCorner + wC;\n\n              if (xC < 0 || xC >= " + e.inWidth + ") {\n                continue;\n              }\n\n              float value = getX(batch, xR, xC, d);\n\n              // If a min / max value has already been found, use it. If not,\n              // use the current value.\n              float currMinMaxValue = mix(\n                  value, minMaxValue, minMaxValueFound);\n              if (value >= currMinMaxValue) {\n                minMaxValue = value;\n                minMaxValueFound = 1.0;\n                minMaxPosition = wR * " + a + " + wC;\n              }\n            }\n          }\n          setOutput(float(minMaxPosition));\n        }\n      ";
				else {
					var p = t + "(" + t + "(" + t + "(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";
					"avg" === t && (p = "avgValue / count");
					var d = 4 * Math.floor(a / 4),
						h = a % 4,
						f = "\n      if (" + l + ") {\n        avgValue += dot(values, ones);\n      } else {\n        minMaxValue = max(values, minMaxValue);\n      }\n    ";
					this.userCode = "\n      const ivec2 strides = ivec2(" + o + ", " + i + ");\n      const ivec2 pads = ivec2(" + s + ", " + u + ");\n      const float initializationValue = " + c + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float count = 0.0;\n\n      float getValue(int batch, int xR, int xC, int d) {\n        if (xC < 0 || xC >= " + e.inWidth + ") {\n          return initializationValue;\n        }\n        count += 1.0;\n        return getX(batch, xR, xC, d);\n      }\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d = coords[3];\n\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        // max/min x(?, ?, d) to get y(yR, yC, d).\n        // ? = to be determined\n        vec4 minMaxValue = vec4(" + c + ");\n        float avgValue = 0.0;\n        count = 0.0;\n\n        for (int wR = 0; wR < " + n + "; wR++) {\n          int xR = xRCorner + wR;\n\n          if (xR < 0 || xR >= " + e.inHeight + ") {\n            continue;\n          }\n\n          for (int wC = 0; wC < " + d + "; wC += 4) {\n            int xC = xCCorner + wC;\n\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              getValue(batch, xR, xC + 2, d),\n              getValue(batch, xR, xC + 3, d)\n            );\n\n            " + f + "\n          }\n\n          int xC = xCCorner + " + d + ";\n          if (" + (1 === h) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              initializationValue,\n              initializationValue,\n              initializationValue\n            );\n\n            " + f + "\n          } else if (" + (2 === h) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              initializationValue,\n              initializationValue\n            );\n\n            " + f + "\n          } else if (" + (3 === h) + ") {\n            vec4 values = vec4(\n              getValue(batch, xR, xC, d),\n              getValue(batch, xR, xC + 1, d),\n              getValue(batch, xR, xC + 2, d),\n              initializationValue\n            );\n\n            " + f + "\n          }\n        }\n        setOutput(" + p + ");\n      }\n    "
				}
			}
		}(),
		ReduceProgram = function() {
			return function(e, t) {
				this.variableNames = ["x"];
				var r = e.windowSize,
					n = e.batchSize,
					a = e.inSize,
					o = Math.ceil(a / r);
				this.outputShape = [n, o];
				var i = "sum" === t,
					s = "0.0";
				i || (s = "min" === t ? "1.0 / 0.0" : "-1.0 / 0.0");
				var u = "min" === t ? "min" : "max",
					l = t + "(" + t + "(" + t + "(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])";
				"sum" === t && (l = "sumValue");
				var c = 4 * Math.floor(r / 4),
					p = r % 4,
					d = "\n      if (" + i + ") {\n        sumValue += dot(values, ones);\n      } else {\n        minMaxValue = " + u + "(values, minMaxValue);\n      }\n    ",
					h = "";
				a % r > 0 && (h = "\n        if (inIdx < 0 || inIdx >= " + a + ") {\n          return initializationValue;\n        }\n      "), this.userCode = "\n      const float initializationValue = " + s + ";\n      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);\n\n      float getValue(int batch, int inIdx) {\n        " + h + "\n        return getX(batch, inIdx);\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        int batch = coords[0];\n        int outIdx = coords[1];\n        int inOffset = outIdx * " + r + ";\n\n        vec4 minMaxValue = vec4(" + s + ");\n        float sumValue = 0.0;\n\n        for (int i = 0; i < " + c + "; i += 4) {\n          int inIdx = inOffset + i;\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            getValue(batch, inIdx + 3)\n          );\n\n          " + d + "\n        }\n\n        int inIdx = inOffset + " + c + ";\n        if (" + (1 === p) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            initializationValue,\n            initializationValue,\n            initializationValue\n          );\n          " + d + "\n        } else if (" + (2 === p) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            initializationValue,\n            initializationValue\n          );\n          " + d + "\n        } else if (" + (3 === p) + ") {\n          vec4 values = vec4(\n            getValue(batch, inIdx),\n            getValue(batch, inIdx + 1),\n            getValue(batch, inIdx + 2),\n            initializationValue\n          );\n          " + d + "\n        }\n        setOutput(" + l + ");\n      }\n    "
			}
		}(),
		ResizeBilinearBackpropProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["dy"], this.outputShape = [], this.outputShape = t.shape;
				var n = t.shape,
					a = n[1],
					o = n[2],
					i = e.shape,
					s = i[1],
					u = i[2],
					l = [r && s > 1 ? a - 1 : a, r && u > 1 ? o - 1 : o],
					c = [r && s > 1 ? s - 1 : s, r && u > 1 ? u - 1 : u],
					p = l[0] / c[0],
					d = l[1] / c[1],
					h = 1 / p,
					f = 1 / d,
					m = 2 * Math.ceil(h) + 2,
					g = 2 * Math.ceil(f) + 2;
				this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        int r = coords[1];\n        int c = coords[2];\n\n        float accumulator = 0.0;\n\n        const float heightScale = float(" + p + ");\n        const float widthScale = float(" + d + ");\n\n        const float invHeightScale = float(" + h + ");\n        const float invWidthScale = float(" + f + ");\n\n        const int winHeight = int(" + m + ");\n        const int winWidth = int(" + g + ");\n\n        // Compute bounds for where in dy we will look\n        float startRLerp = floor(float(r) * invHeightScale);\n        int startDyR = int(startRLerp - float(winHeight / 2));\n\n        float startCLerp = floor(float(c) * invWidthScale);\n        int startDyC = int(startCLerp - float(winWidth / 2));\n\n        // Loop over dy\n        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {\n          int dyR = dyROffset + startDyR;\n\n          // Guard against the window exceeding the bounds of dy\n          if (dyR < 0 || dyR >= " + s + ") {\n            continue;\n          }\n\n          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {\n            int dyC = dyCOffset + startDyC;\n\n            // Guard against the window exceeding the bounds of dy\n            if (dyC < 0 || dyC >= " + u + ") {\n              continue;\n            }\n\n            float dxR = float(dyR) * heightScale;\n            int topDxRIndex = int(floor(dxR));\n            int bottomDxRIndex = int(min(ceil(dxR), " + (a - 1) + ".0));\n            float dxRLerp = dxR - float(topDxRIndex);\n            float inverseDxRLerp = 1.0 - dxRLerp;\n\n            float dxC = float(dyC) * widthScale;\n            int leftDxCIndex = int(floor(dxC));\n            int rightDxCIndex = int(min(ceil(dxC), " + (o - 1) + ".0));\n            float dxCLerp = dxC - float(leftDxCIndex);\n            float inverseDxCLerp = 1.0 - dxCLerp;\n\n            if (r == topDxRIndex && c == leftDxCIndex) {\n              // topLeft\n              accumulator +=\n                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;\n            }\n\n            if (r == topDxRIndex && c == rightDxCIndex) {\n              // topRight\n              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == leftDxCIndex) {\n              // bottomLeft\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;\n            }\n\n            if (r == bottomDxRIndex && c == rightDxCIndex) {\n              // bottomRight\n              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;\n            }\n          }\n        }\n        // End loop over dy\n\n        setOutput(accumulator);\n      }\n    "
			}
		}(),
		ResizeBilinearProgram = function() {
			return function(e, t, r, n) {
				this.variableNames = ["A"], this.outputShape = [];
				var a = e[0],
					o = e[1],
					i = e[2],
					s = e[3];
				this.outputShape = [a, t, r, s];
				var u = [n && t > 1 ? o - 1 : o, n && r > 1 ? i - 1 : i],
					l = [n && t > 1 ? t - 1 : t, n && r > 1 ? r - 1 : r];
				this.userCode = "\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          " + u[0] / l[0] + ",\n          " + u[1] / l[1] + ");\n      const vec2 inputShapeRC = vec2(" + o + ".0, " + i + ".0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the four integer indices.\n        ivec2 sourceFloorRC = ivec2(sourceFracIndexRC);\n        ivec2 sourceCeilRC = ivec2(\n          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));\n\n        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);\n        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);\n        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);\n        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);\n\n        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);\n\n        float top = topLeft + (topRight - topLeft) * fracRC.y;\n        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;\n        float newValue = top + (bottom - top) * fracRC.x;\n\n        setOutput(newValue);\n      }\n    "
			}
		}(),
		ResizeNearestNeighborProgram = function() {
			return function(e, t, r, n) {
				this.variableNames = ["A"], this.outputShape = [];
				var a = e[0],
					o = e[1],
					i = e[2],
					s = e[3];
				this.outputShape = [a, t, r, s];
				var u = n ? [o - 1, i - 1] : [o, i],
					l = n ? [t - 1, r - 1] : [t, r],
					c = n ? "0.5" : "0.0";
				this.userCode = "\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          " + u[0] / l[0] + ",\n          " + u[1] / l[1] + ");\n      const vec2 inputShapeRC = vec2(" + o + ".0, " + i + ".0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the coordinators of nearest neighbor point.\n        ivec2 sourceNearestRC = ivec2(\n          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + " + c + ")));\n\n        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);\n\n        setOutput(newValue);\n      }\n    "
			}
		}(),
		ReverseProgram = function() {
			return function(e, t) {
				this.variableNames = ["x"];
				var r = e.length;
				if (r > 4) throw new Error("WebGL backend: Reverse of rank-" + r + " tensor is not yet supported");
				if (this.outputShape = e, 1 !== r) {
					var n = function(r) {
							return -1 !== t.indexOf(r) && 1 !== e[r] ? e[r] + " - coords[" + r + "] - 1" : "coords[" + r + "]"
						},
						a = e.map(function(e, t) {
							return n(t)
						}).join(","),
						o = getCoordsDataType(r);
					this.userCode = "\n      void main() {\n        " + o + " coords = getOutputCoords();\n        setOutput(getX(" + a + "));\n      }\n    "
				} else this.userCode = "\n        void main() {\n          int coord = getOutputCoords();\n          setOutput(getX(" + e[0] + " - coord - 1));\n        }\n      "
			}
		}(),
		SliceProgram = function() {
			function e(e) {
				this.variableNames = ["source"], this.outputShape = e, this.rank = e.length;
				var t = getCoordsDataType(this.rank),
					r = getCoords$1(this.rank);
				this.userCode = "\n      uniform " + t + " start;\n\n      void main() {\n        " + t + " sourceLoc = start + getOutputCoords();\n        setOutput(getSource(" + r + "));\n      }\n    "
			}
			return e.prototype.getCustomSetupFunc = function(e) {
				var t = this;
				if (e.length !== this.rank) throw Error("The rank (" + this.rank + ") of the program must match the length of start (" + e.length + ")");
				return function(r, n) {
					if (null != t.startLoc || (t.startLoc = r.getUniformLocationNoThrow(n, "start"), null != t.startLoc))
						if (1 === t.rank) r.gl.uniform1i(t.startLoc, e[0]);
						else if (2 === t.rank) r.gl.uniform2i(t.startLoc, e[0], e[1]);
					else if (3 === t.rank) r.gl.uniform3i(t.startLoc, e[0], e[1], e[2]);
					else {
						if (4 !== t.rank) throw Error("Slicing for rank " + t.rank + " is not yet supported");
						r.gl.uniform4i(t.startLoc, e[0], e[1], e[2], e[3])
					}
				}
			}, e
		}(),
		StridedSliceProgram = function() {
			return function(e, t, r) {
				this.variableNames = ["x"], this.outputShape = r, this.rank = r.length;
				var n = getCoordsDataType(this.rank),
					a = "";
				a = 1 === this.rank ? "coords * strides + begin" : r.map(function(e, t) {
					return "coords[" + t + "] * strides[" + t + "] + begin[" + t + "]"
				}).join(","), this.userCode = "\n      " + n + " begin = " + n + "(" + e + ");\n      " + n + " strides = " + n + "(" + t + ");\n\n      void main() {\n        " + n + " coords = getOutputCoords();\n        setOutput(getX(" + a + "));\n      }\n    "
			}
		}(),
		TextureManager = function() {
			function e(e) {
				this.gpgpu = e, this.numUsedTextures = 0, this.numFreeTextures = 0, this.freeTextures = {}, this.logEnabled = !1, this.usedTextures = {}
			}
			return e.prototype.acquireTexture = function(e, t) {
				void 0 === t && (t = TextureType.FLOAT);
				var r = getKeyFromTextureShape(e, t);
				if (r in this.freeTextures || (this.freeTextures[r] = []), r in this.usedTextures || (this.usedTextures[r] = []), this.freeTextures[r].length > 0) {
					this.numFreeTextures--, this.numUsedTextures++, this.log();
					var n = this.freeTextures[r].shift();
					return this.usedTextures[r].push(n), n
				}
				this.numUsedTextures++, this.log();
				var a = this.gpgpu.createMatrixTexture(e[0], e[1]);
				return this.usedTextures[r].push(a), a
			}, e.prototype.releaseTexture = function(e, t, r) {
				void 0 === r && (r = TextureType.FLOAT);
				var n = getKeyFromTextureShape(t, r);
				n in this.freeTextures || (this.freeTextures[n] = []), this.freeTextures[n].push(e), this.numFreeTextures++, this.numUsedTextures--;
				var a = this.usedTextures[n],
					o = a.indexOf(e);
				if (o < 0) throw new Error("Cannot release a texture that was never provided by this texture manager");
				a.splice(o, 1), this.log()
			}, e.prototype.log = function() {
				if (this.logEnabled) {
					var e = this.numFreeTextures + this.numUsedTextures;
					console.log("Free/Used", this.numFreeTextures + " / " + this.numUsedTextures, "(" + e + ")")
				}
			}, e.prototype.getNumUsedTextures = function() {
				return this.numUsedTextures
			}, e.prototype.getNumFreeTextures = function() {
				return this.numFreeTextures
			}, e.prototype.dispose = function() {
				var e = this;
				if (null != this.freeTextures) {
					for (var t in this.freeTextures) this.freeTextures[t].forEach(function(t) {
						e.gpgpu.deleteMatrixTexture(t)
					});
					for (var t in this.usedTextures) this.usedTextures[t].forEach(function(t) {
						e.gpgpu.deleteMatrixTexture(t)
					});
					this.freeTextures = null, this.usedTextures = null, this.numUsedTextures = 0, this.numFreeTextures = 0
				}
			}, e
		}(),
		TileProgram = function() {
			return function(e, t) {
				this.variableNames = ["A"];
				for (var r = new Array(e.length), n = 0; n < r.length; n++) r[n] = e[n] * t[n];
				this.outputShape = r, this.rank = r.length;
				var a = getCoordsDataType(this.rank),
					o = getSourceCoords$1(e);
				this.userCode = "\n      void main() {\n        " + a + " resRC = getOutputCoords();\n        setOutput(getA(" + o + "));\n      }\n    "
			}
		}(),
		TransposeProgram = function() {
			return function(e, t) {
				this.variableNames = ["A"];
				for (var r = new Array(e.length), n = 0; n < r.length; n++) r[n] = e[t[n]];
				this.outputShape = r, this.rank = r.length;
				var a = getCoordsDataType(this.rank),
					o = getSwitchedCoords(t);
				this.userCode = "\n    void main() {\n      " + a + " resRC = getOutputCoords();\n      setOutput(getA(" + o + "));\n    }\n    "
			}
		}(),
		ERF_P = .3275911,
		ERF_A1 = .254829592,
		ERF_A2 = -.284496736,
		ERF_A3 = 1.421413741,
		ERF_A4 = -1.453152027,
		ERF_A5 = 1.061405429,
		UnaryOpProgram = function() {
			return function(e, t) {
				this.variableNames = ["A"], this.outputShape = e, this.userCode = "\n      float unaryOperation(float x) {\n        " + t + "\n      }\n\n      void main() {\n        float x = getAAtOutCoords();\n        float y = unaryOperation(x);\n\n        setOutput(y);\n      }\n    "
			}
		}(),
		CHECK_NAN_SNIPPET$1 = "if (isNaN(x)) return x;",
		ABS = "return abs(x);",
		RELU = CHECK_NAN_SNIPPET$1 + "\n  return (x < 0.0) ? 0.0 : x;\n",
		ELU = "return (x >= 0.0) ? x : (exp(x) - 1.0);",
		SELU = "\n  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.\n  // see: https://arxiv.org/abs/1706.02515\n  float scaleAlpha = " + SELU_SCALEALPHA + ";\n  float scale = " + SELU_SCALE + ";\n  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);\n",
		NEG = "return -x;",
		CEIL = "return ceil(x);",
		FLOOR = "return floor(x);",
		SIGN = "\n  if (isNaN(x)) { return 0.0; }\n  return sign(x);\n",
		ROUND = "\n  // OpenGL ES does not support round function.\n  // The algorithm is based on banker's rounding.\n  float base = floor(x);\n  if ((x - base) < 0.5) {\n    return floor(x);\n  } else if ((x - base) > 0.5) {\n    return ceil(x);\n  } else {\n    if (mod(base, 2.0) == 0.0) {\n      return base;\n    } else {\n      return base + 1.0;\n    }\n  }\n",
		EXP = "return exp(x);",
		EXPM1 = "return exp(x) - 1.0;",
		LOG = "return log(x);",
		LOG1P = "return log(1.0 + x);",
		SQRT = "return sqrt(x);",
		RSQRT = "return inversesqrt(x);",
		SIGMOID = "return 1.0 / (1.0 + exp(-1.0 * x));",
		SOFTPLUS = "\n  float epsilon = 1.1920928955078125e-7;\n  float threshold = log(epsilon) + 2.0;\n\n  bool too_large = x > -threshold;\n  bool too_small = x < threshold;\n\n  float result;\n  float exp_x = exp(x);\n\n  if (too_large){\n    result = x;\n  }\n  else if (too_small){\n    result = exp_x;\n  }\n  else{\n    result = log(exp_x + 1.0);\n  }\n  return result;\n",
		SIN = "return sin(x);",
		COS = "return cos(x);",
		TAN = "return tan(x);",
		ASIN = "return asin(x);",
		ACOS = "return acos(x);",
		ATAN = CHECK_NAN_SNIPPET$1 + "\n  return atan(x);\n",
		SINH = "\n  float e2x = exp(x);\n  return (e2x - 1.0 / e2x) / 2.0;\n",
		COSH = "\n  float e2x = exp(-x);\n  return (e2x + 1.0 / e2x) / 2.0;\n",
		TANH = "\n  float e2x = exp(-2.0 * abs(x));\n  return sign(x) * (1.0 - e2x) / (1.0 + e2x);\n",
		ASINH = "return log(x + sqrt(x * x + 1.0));",
		ACOSH = "return log(x + sqrt(x * x - 1.0));",
		ATANH = "return (log(1.0 + x) - log(1.0 - x)) / 2.0;",
		ERF = '\n  // Error function is calculated approximately with elementary function.\n  // See "Handbook of Mathematical Functions with Formulas,\n  // Graphs, and Mathematical Tables", Abramowitz and Stegun.\n  float p = ' + ERF_P + ";\n  float a1 = " + ERF_A1 + ";\n  float a2 = " + ERF_A2 + ";\n  float a3 = " + ERF_A3 + ";\n  float a4 = " + ERF_A4 + ";\n  float a5 = " + ERF_A5 + ";\n\n  float t = 1.0 / (1.0 + p * x);\n  return 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x);\n",
		SQUARE = "return x * x;",
		RECIPROCAL = "return 1.0 / x;",
		LOGICAL_NOT = "return float(!(x >= 1.0));",
		TO_INT = "return float(int(x));",
		__awaiter$5 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$5 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		BEFORE_PAGING_CONSTANT = 300,
		MathBackendWebGL = function() {
			function e(e, t) {
				if (void 0 === t && (t = !0), this.gpgpu = e, this.delayedStorage = t, this.texData = new WeakMap, this.pendingRead = new WeakMap, this.pendingDisposal = new WeakSet, this.lruDataGPU = [], this.numBytesInGPU = 0, this.uploadWaitMs = 0, this.downloadWaitMs = 0, this.binaryCache = {}, this.disposed = !1, ENV.get("WEBGL_VERSION") < 1) throw new Error("WebGL is not supported on this device");
				ENV.get("IS_BROWSER") && (this.canvas = document.createElement("canvas")), null == e ? (this.gpgpu = new GPGPUContext(createWebGLContext(this.canvas)), this.gpgpuCreatedLocally = !0) : this.gpgpuCreatedLocally = !1, this.NUM_BYTES_BEFORE_PAGING = window.screen.height * window.screen.width * window.devicePixelRatio * BEFORE_PAGING_CONSTANT, this.textureManager = new TextureManager(this.gpgpu)
			}
			return e.prototype.register = function(e, t, r) {
				if (this.texData.has(e)) throw new Error("Data buffer is already registered");
				this.texData.set(e, {
					shape: t,
					dtype: r,
					values: null,
					texture: null,
					texShape: null,
					texType: TextureType.FLOAT
				})
			}, e.prototype.fromPixels = function(e, t) {
				if (null == e) throw new Error("MathBackendWebGL.writePixels(): pixels can not be null");
				var r = [e.height, e.width],
					n = [e.height, e.width, t];
				if (e instanceof HTMLVideoElement) {
					if (null == this.fromPixelsCanvas) {
						if (!ENV.get("IS_BROWSER")) throw new Error("Can't read pixels from HTMLImageElement outside the browser.");
						if ("complete" !== document.readyState) throw new Error("The DOM is not ready yet. Please call tf.fromPixels() once the DOM is ready. One way to do that is to add an event listener for `DOMContentLoaded` on the document object");
						this.fromPixelsCanvas = document.createElement("canvas")
					}
					this.fromPixelsCanvas.width = e.width, this.fromPixelsCanvas.height = e.height, this.fromPixelsCanvas.getContext("2d").drawImage(e, 0, 0, e.width, e.height), e = this.fromPixelsCanvas
				}
				var a = Tensor.make(r, {}, "int32");
				this.texData.get(a.dataId).texType = TextureType.UNSIGNED_BYTE, this.gpgpu.uploadPixelDataToTexture(this.getTexture(a.dataId), e);
				var o = new FromPixelsProgram(n),
					i = this.compileAndRun(o, [a]);
				return a.dispose(), i
			}, e.prototype.write = function(e, t) {
				if (null == t) throw new Error("MathBackendWebGL.write(): values can not be null");
				this.throwIfNoData(e);
				var r = this.texData.get(e),
					n = r.texture,
					a = r.texShape,
					o = r.texType;
				null != n && (this.releaseTexture(e, n, a, o), r.texture = null, r.texShape = null), r.values = t, this.delayedStorage || this.uploadToGPU(e)
			}, e.prototype.readSync = function(e) {
				this.throwIfNoData(e);
				var t = this.texData.get(e),
					r = t.texture,
					n = t.values,
					a = t.texShape;
				if (null != n) return this.cacheOnCPU(e), n;
				var o, i = null != this.activeTimers;
				i && (o = performance.now());
				var s = this.gpgpu.downloadMatrixFromTexture(r, a[0], a[1]);
				return i && (this.downloadWaitMs += performance.now() - o), this.cacheOnCPU(e, s), t.values
			}, e.prototype.read = function(e) {
				return __awaiter$5(this, void 0, void 0, function() {
					var t, r, n, a, o, i, s, u;
					return __generator$5(this, function(l) {
						switch (l.label) {
							case 0:
								return this.pendingRead.has(e) ? (t = this.pendingRead.get(e), [2, new Promise(function(e) {
									return t.push(e)
								})]) : (this.throwIfNoData(e), r = this.texData.get(e), n = r.texture, a = r.values, o = r.texShape, null != a ? (this.cacheOnCPU(e), [2, a]) : ENV.get("WEBGL_GET_BUFFER_SUB_DATA_ASYNC_EXTENSION_ENABLED") ? [4, this.gpgpu.downloadMatrixFromTextureAsync(n, o[0], o[1])] : [3, 2]);
							case 1:
								return i = l.sent(), this.cacheOnCPU(e, i), [2, r.values];
							case 2:
								return 0 === ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") ? [2, this.readSync(e)] : (this.pendingRead.set(e, []), [4, this.gpgpu.runQuery(function() {})]);
							case 3:
								return l.sent(), s = this.pendingRead.get(e), this.pendingRead.delete(e), u = this.readSync(e), s.forEach(function(e) {
									return e(u)
								}), this.pendingDisposal.has(e) && (this.pendingDisposal.delete(e), this.disposeData(e)), [2, u]
						}
					})
				})
			}, e.prototype.time = function(e) {
				return __awaiter$5(this, void 0, void 0, function() {
					var t, r, n, a, o, i;
					return __generator$5(this, function(s) {
						switch (s.label) {
							case 0:
								return t = this.activeTimers, r = [], n = !1, null == this.programTimersStack ? (this.programTimersStack = r, n = !0) : this.activeTimers.push(r), this.activeTimers = r, e(), a = flatten(this.activeTimers), this.activeTimers = t, n && (this.programTimersStack = null), [4, Promise.all(a).then(function(e) {
									var t = 0;
									return e.forEach(function(e) {
										return t += e
									}), t
								})];
							case 1:
								return o = s.sent(), i = {
									uploadWaitMs: this.uploadWaitMs,
									downloadWaitMs: this.downloadWaitMs,
									kernelMs: o,
									wallMs: null
								}, this.uploadWaitMs = 0, this.downloadWaitMs = 0, [2, i]
						}
					})
				})
			}, e.prototype.memory = function() {
				return {
					unreliable: !1,
					numBytesInGPU: this.numBytesInGPU
				}
			}, e.prototype.startTimer = function() {
				return ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") > 0 ? this.gpgpu.beginQuery() : {
					startMs: performance.now(),
					endMs: null
				}
			}, e.prototype.endTimer = function(e) {
				return ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") > 0 ? (this.gpgpu.endQuery(), e) : (e.endMs = performance.now(), e)
			}, e.prototype.getQueryTime = function(e) {
				return __awaiter$5(this, void 0, void 0, function() {
					var t;
					return __generator$5(this, function(r) {
						return ENV.get("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION") > 0 ? [2, this.gpgpu.pollQueryTime(e)] : (t = e, [2, t.endMs - t.startMs])
					})
				})
			}, e.prototype.disposeData = function(e) {
				if (!this.pendingDisposal.has(e))
					if (this.pendingRead.has(e)) this.pendingDisposal.add(e);
					else if (this.texData.has(e)) {
					var t = this.texData.get(e),
						r = t.texture,
						n = t.texShape,
						a = t.texType;
					null != r && this.releaseTexture(e, r, n, a), this.texData.delete(e)
				}
			}, e.prototype.getTexture = function(e) {
				return this.uploadToGPU(e), this.texData.get(e).texture
			}, e.prototype.getGPGPUContext = function() {
				return this.gpgpu
			}, e.prototype.getCanvas = function() {
				return this.canvas
			}, e.prototype.slice = function(e, t, r) {
				var n = new SliceProgram(r),
					a = n.getCustomSetupFunc(t);
				return this.compileAndRun(n, [e], null, a)
			}, e.prototype.stridedSlice = function(e, t, r, n, a, o) {
				var i = getStridedSlicedInfo(e.shape, t, r, n, a, o),
					s = i[0],
					u = i[1];
				if (u.some(function(e) {
						return 0 === e
					})) return tensor([], u);
				var l = new StridedSliceProgram(s, n, u);
				return this.compileAndRun(l, [e])
			}, e.prototype.reverse = function(e, t) {
				var r = new ReverseProgram(e.shape, t);
				return this.compileAndRun(r, [e])
			}, e.prototype.concat = function(e, t) {
				var r = new ConcatProgram(e.shape, t.shape);
				return this.compileAndRun(r, [e, t])
			}, e.prototype.neg = function(e) {
				var t = new UnaryOpProgram(e.shape, NEG);
				return this.compileAndRun(t, [e])
			}, e.prototype.matMul = function(e, t, r, n) {
				var a = new MatMulProgram(e.shape, t.shape, r, n);
				return this.compileAndRun(a, [e, t])
			}, e.prototype.multiply = function(e, t) {
				var r = new BinaryOpProgram(MUL, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, upcastType(e.dtype, t.dtype));
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.batchNormalization = function(e, t, r, n, a, o) {
				var i = [e, t, r],
					s = null;
				null != o && (s = o.shape, i.push(o));
				var u = null;
				null != a && (u = a.shape, i.push(a));
				var l = new BatchNormProgram(e.shape, t.shape, r.shape, s, u, n);
				return this.compileAndRun(l, i)
			}, e.prototype.localResponseNormalization4D = function(e, t, r, n, a) {
				var o = new LRNProgram(e.shape, t, r, n, a);
				return this.compileAndRun(o, [e])
			}, e.prototype.tile = function(e, t) {
				var r = new TileProgram(e.shape, t);
				return this.compileAndRun(r, [e])
			}, e.prototype.pad = function(e, t, r) {
				var n = new PadProgram(e.shape, t, r);
				return this.compileAndRun(n, [e])
			}, e.prototype.transpose = function(e, t) {
				var r = new TransposeProgram(e.shape, t);
				return this.compileAndRun(r, [e])
			}, e.prototype.gather = function(e, t, r) {
				var n = new GatherProgram(e.shape, t.size, r);
				return this.compileAndRun(n, [e, t])
			}, e.prototype.reduce = function(e, t, r) {
				var n = e.shape[0],
					a = e.shape[1],
					o = computeOptimalWindowSize(a),
					i = new ReduceProgram({
						windowSize: o,
						inSize: a,
						batchSize: n
					}, t),
					s = i.outputShape,
					u = s[0],
					l = s[1],
					c = this.makeOutputArray([u, l], r);
				return this.compileAndRun(i, [e], c), 1 === c.shape[1] ? c : this.reduce(c, t, r)
			}, e.prototype.argReduce = function(e, t, r) {
				void 0 === r && (r = null);
				var n = e.shape[0],
					a = e.shape[1];
				null != r && (n = r.shape[0], a = r.shape[1]);
				var o = computeOptimalWindowSize(a),
					i = new ArgMinMaxProgram({
						windowSize: o,
						inSize: a,
						batchSize: n
					}, t, null == r),
					s = i.outputShape,
					u = s[0],
					l = s[1],
					c = this.makeOutputArray([u, l], "int32"),
					p = [e];
				return null != r && p.push(r), this.compileAndRun(i, p, c), 1 === c.shape[1] ? c : this.argReduce(e, t, c)
			}, e.prototype.sum = function(e, t) {
				assertAxesAreInnerMostDims("sum", t, e.rank);
				var r = computeOutAndReduceShapes(e.shape, t),
					n = r[0],
					a = sizeFromShape(r[1]),
					o = e.as2D(-1, a),
					i = sumOutType(e.dtype);
				return this.reduce(o, "sum", i).reshape(n)
			}, e.prototype.argMin = function(e, t) {
				var r = [t];
				assertAxesAreInnerMostDims("argMin", r, e.rank);
				var n = computeOutAndReduceShapes(e.shape, r),
					a = n[0],
					o = sizeFromShape(n[1]),
					i = e.as2D(-1, o);
				return this.argReduce(i, "min").reshape(a)
			}, e.prototype.argMax = function(e, t) {
				var r = [t];
				assertAxesAreInnerMostDims("argMax", r, e.rank);
				var n = computeOutAndReduceShapes(e.shape, r),
					a = n[0],
					o = sizeFromShape(n[1]),
					i = e.as2D(-1, o);
				return this.argReduce(i, "max").reshape(a)
			}, e.prototype.cumsum = function(e, t, r, n) {
				if (t !== e.rank - 1) throw new Error("WebGL cumsum shader expects an inner-most axis=" + (e.rank - 1) + " but got axis=" + t);
				var a = new CumSumProgram(e.shape, r, n);
				return this.compileAndRun(a, [e])
			}, e.prototype.equal = function(e, t) {
				var r = new BinaryOpProgram(EQUAL, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "bool");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.notEqual = function(e, t) {
				var r = new BinaryOpProgram(NOT_EQUAL, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "bool");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.less = function(e, t) {
				var r = new BinaryOpProgram(LESS, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "bool");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.lessEqual = function(e, t) {
				var r = new BinaryOpProgram(LESS_EQUAL, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "bool");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.greater = function(e, t) {
				var r = new BinaryOpProgram(GREATER, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "bool");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.greaterEqual = function(e, t) {
				var r = new BinaryOpProgram(GREATER_EQUAL, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "bool");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.logicalNot = function(e) {
				var t = new UnaryOpProgram(e.shape, LOGICAL_NOT);
				return this.compileAndRun(t, [e])
			}, e.prototype.logicalAnd = function(e, t) {
				var r = new BinaryOpProgram(LOGICAL_AND, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "bool");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.logicalOr = function(e, t) {
				var r = new BinaryOpProgram(LOGICAL_OR, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "bool");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.where = function(e, t, r, n) {
				var a = new WhereProgram(e.rank, t.shape, t.rank),
					o = this.makeOutputArray(a.outputShape, n);
				return this.compileAndRun(a, [e, t, r], o)
			}, e.prototype.topKValues = function(e, t) {
				throw new Error("topKValues GPU not yet implemented!")
			}, e.prototype.topKIndices = function(e, t) {
				throw new Error("topKIndices GPU not yet implemented!")
			}, e.prototype.min = function(e, t) {
				assertAxesAreInnerMostDims("min", t, e.rank);
				var r = computeOutAndReduceShapes(e.shape, t),
					n = r[0],
					a = sizeFromShape(r[1]),
					o = e.as2D(-1, a);
				return this.reduce(o, "min", o.dtype).reshape(n)
			}, e.prototype.minimum = function(e, t) {
				var r = new BinaryOpProgram(MIN, e.shape, t.shape);
				return this.compileAndRun(r, [e, t])
			}, e.prototype.mod = function(e, t) {
				var r = new BinaryOpProgram(MOD, e.shape, t.shape);
				return this.compileAndRun(r, [e, t])
			}, e.prototype.max = function(e, t) {
				assertAxesAreInnerMostDims("max", t, e.rank);
				var r = computeOutAndReduceShapes(e.shape, t),
					n = r[0],
					a = sizeFromShape(r[1]),
					o = e.as2D(-1, a);
				return this.reduce(o, "max", o.dtype).reshape(n)
			}, e.prototype.maximum = function(e, t) {
				var r = new BinaryOpProgram(MAX, e.shape, t.shape);
				return this.compileAndRun(r, [e, t])
			}, e.prototype.squaredDifference = function(e, t) {
				var r = new BinaryOpProgram(SQUARED_DIFFERENCE, e.shape, t.shape);
				return this.compileAndRun(r, [e, t])
			}, e.prototype.realDivide = function(e, t) {
				var r = new BinaryOpProgram(DIV, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "float32");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.floorDiv = function(e, t) {
				var r = new BinaryOpProgram(INT_DIV, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, "int32");
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.add = function(e, t) {
				var r = new BinaryOpProgram(ADD, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, upcastType(e.dtype, t.dtype));
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.subtract = function(e, t) {
				var r = new BinaryOpProgram(SUB, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, upcastType(e.dtype, t.dtype));
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.pow = function(e, t) {
				var r = new BinaryOpProgram(POW, e.shape, t.shape),
					n = this.makeOutputArray(r.outputShape, upcastType(e.dtype, t.dtype));
				return this.compileAndRun(r, [e, t], n)
			}, e.prototype.ceil = function(e) {
				var t = new UnaryOpProgram(e.shape, CEIL);
				return this.compileAndRun(t, [e])
			}, e.prototype.floor = function(e) {
				var t = new UnaryOpProgram(e.shape, FLOOR);
				return this.compileAndRun(t, [e])
			}, e.prototype.sign = function(e) {
				var t = new UnaryOpProgram(e.shape, SIGN);
				return this.compileAndRun(t, [e])
			}, e.prototype.round = function(e) {
				var t = new UnaryOpProgram(e.shape, ROUND);
				return this.compileAndRun(t, [e])
			}, e.prototype.exp = function(e) {
				var t = new UnaryOpProgram(e.shape, EXP);
				return this.compileAndRun(t, [e])
			}, e.prototype.expm1 = function(e) {
				var t = new UnaryOpProgram(e.shape, EXPM1);
				return this.compileAndRun(t, [e])
			}, e.prototype.log = function(e) {
				var t = new UnaryOpProgram(e.shape, LOG);
				return this.compileAndRun(t, [e])
			}, e.prototype.log1p = function(e) {
				var t = new UnaryOpProgram(e.shape, LOG1P);
				return this.compileAndRun(t, [e])
			}, e.prototype.sqrt = function(e) {
				var t = new UnaryOpProgram(e.shape, SQRT);
				return this.compileAndRun(t, [e])
			}, e.prototype.rsqrt = function(e) {
				var t = new UnaryOpProgram(e.shape, RSQRT);
				return this.compileAndRun(t, [e])
			}, e.prototype.square = function(e) {
				var t = new UnaryOpProgram(e.shape, SQUARE);
				return this.compileAndRun(t, [e])
			}, e.prototype.reciprocal = function(e) {
				var t = new UnaryOpProgram(e.shape, RECIPROCAL);
				return this.compileAndRun(t, [e])
			}, e.prototype.relu = function(e) {
				var t = new UnaryOpProgram(e.shape, RELU);
				return this.compileAndRun(t, [e])
			}, e.prototype.elu = function(e) {
				var t = new UnaryOpProgram(e.shape, ELU);
				return this.compileAndRun(t, [e])
			}, e.prototype.eluDer = function(e, t) {
				var r = new BinaryOpProgram(ELU_DER, e.shape, t.shape);
				return this.compileAndRun(r, [e, t])
			}, e.prototype.selu = function(e) {
				var t = new UnaryOpProgram(e.shape, SELU);
				return this.compileAndRun(t, [e])
			}, e.prototype.int = function(e) {
				var t = new UnaryOpProgram(e.shape, TO_INT),
					r = this.makeOutputArray(t.outputShape, "int32");
				return this.compileAndRun(t, [e], r)
			}, e.prototype.clip = function(e, t, r) {
				var n = new ClipProgram(e.shape, t, r);
				return this.compileAndRun(n, [e])
			}, e.prototype.abs = function(e) {
				var t = new UnaryOpProgram(e.shape, ABS);
				return this.compileAndRun(t, [e])
			}, e.prototype.sigmoid = function(e) {
				var t = new UnaryOpProgram(e.shape, SIGMOID);
				return this.compileAndRun(t, [e])
			}, e.prototype.softplus = function(e) {
				var t = new UnaryOpProgram(e.shape, SOFTPLUS);
				return this.compileAndRun(t, [e])
			}, e.prototype.sin = function(e) {
				var t = new UnaryOpProgram(e.shape, SIN);
				return this.compileAndRun(t, [e])
			}, e.prototype.cos = function(e) {
				var t = new UnaryOpProgram(e.shape, COS);
				return this.compileAndRun(t, [e])
			}, e.prototype.tan = function(e) {
				var t = new UnaryOpProgram(e.shape, TAN);
				return this.compileAndRun(t, [e])
			}, e.prototype.asin = function(e) {
				var t = new UnaryOpProgram(e.shape, ASIN);
				return this.compileAndRun(t, [e])
			}, e.prototype.acos = function(e) {
				var t = new UnaryOpProgram(e.shape, ACOS);
				return this.compileAndRun(t, [e])
			}, e.prototype.atan = function(e) {
				var t = new UnaryOpProgram(e.shape, ATAN);
				return this.compileAndRun(t, [e])
			}, e.prototype.atan2 = function(e, t) {
				var r = new BinaryOpProgram(ATAN2, e.shape, t.shape);
				return this.compileAndRun(r, [e, t])
			}, e.prototype.sinh = function(e) {
				var t = new UnaryOpProgram(e.shape, SINH);
				return this.compileAndRun(t, [e])
			}, e.prototype.cosh = function(e) {
				var t = new UnaryOpProgram(e.shape, COSH);
				return this.compileAndRun(t, [e])
			}, e.prototype.tanh = function(e) {
				var t = new UnaryOpProgram(e.shape, TANH);
				return this.compileAndRun(t, [e])
			}, e.prototype.asinh = function(e) {
				var t = new UnaryOpProgram(e.shape, ASINH);
				return this.compileAndRun(t, [e])
			}, e.prototype.acosh = function(e) {
				var t = new UnaryOpProgram(e.shape, ACOSH);
				return this.compileAndRun(t, [e])
			}, e.prototype.atanh = function(e) {
				var t = new UnaryOpProgram(e.shape, ATANH);
				return this.compileAndRun(t, [e])
			}, e.prototype.erf = function(e) {
				var t = new UnaryOpProgram(e.shape, ERF);
				return this.compileAndRun(t, [e])
			}, e.prototype.step = function(e, t) {
				var r = new UnaryOpProgram(e.shape, STEP(t));
				return this.compileAndRun(r, [e])
			}, e.prototype.conv2d = function(e, t, r) {
				var n = new Conv2DProgram(r);
				return this.compileAndRun(n, [e, t])
			}, e.prototype.conv2dDerInput = function(e, t, r) {
				var n = new Conv2DDerInputProgram(r);
				return this.compileAndRun(n, [e, t])
			}, e.prototype.conv2dDerFilter = function(e, t, r) {
				var n = new Conv2DDerFilterProgram(r);
				return this.compileAndRun(n, [e, t])
			}, e.prototype.depthwiseConv2D = function(e, t, r) {
				var n = new DepthwiseConv2DProgram(r);
				return this.compileAndRun(n, [e, t])
			}, e.prototype.depthwiseConv2DDerInput = function(e, t, r) {
				var n = new DepthwiseConv2DDerInputProgram(r);
				return this.compileAndRun(n, [e, t])
			}, e.prototype.depthwiseConv2DDerFilter = function(e, t, r) {
				var n = new DepthwiseConv2DDerFilterProgram(r);
				return this.compileAndRun(n, [e, t])
			}, e.prototype.maxPool = function(e, t) {
				var r = new Pool2DProgram(t, "max", !1),
					n = this.makeOutputArray(r.outputShape, e.dtype);
				return this.compileAndRun(r, [e], n)
			}, e.prototype.avgPool = function(e, t) {
				var r = new Pool2DProgram(t, "avg", !1),
					n = this.makeOutputArray(r.outputShape, "float32");
				return this.compileAndRun(r, [e], n)
			}, e.prototype.maxPoolBackprop = function(e, t, r, n) {
				var a = new Pool2DProgram(n, "max", !0),
					o = this.compileAndRun(a, [t]),
					i = new MaxPool2DBackpropProgram(n),
					s = this.makeOutputArray(i.outputShape, t.dtype),
					u = this.compileAndRun(i, [e, o], s);
				return o.dispose(), u
			}, e.prototype.avgPoolBackprop = function(e, t, r) {
				var n = new AvgPool2DBackpropProgram(r),
					a = this.makeOutputArray(n.outputShape, t.dtype);
				return this.compileAndRun(n, [e], a)
			}, e.prototype.cast = function(e, t) {
				return castTensor(e, t, this)
			}, e.prototype.reshape = function(e, t) {
				return reshapeTensor(e, t)
			}, e.prototype.resizeBilinear = function(e, t, r, n) {
				var a = new ResizeBilinearProgram(e.shape, t, r, n);
				return this.compileAndRun(a, [e])
			}, e.prototype.resizeBilinearBackprop = function(e, t, r) {
				var n = new ResizeBilinearBackpropProgram(e, t, r);
				return this.compileAndRun(n, [e])
			}, e.prototype.resizeNearestNeighbor = function(e, t, r, n) {
				var a = new ResizeNearestNeighborProgram(e.shape, t, r, n);
				return this.compileAndRun(a, [e])
			}, e.prototype.multinomial = function(e, t, r, n) {
				var a = t ? e : softmax(e),
					o = a.shape[0],
					i = a.shape[1],
					s = new MultinomialProgram(o, i, r),
					u = this.makeOutputArray(s.outputShape, "int32"),
					l = s.getCustomSetupFunc(n);
				return this.compileAndRun(s, [a], u, l)
			}, e.prototype.oneHot = function(e, t, r, n) {
				var a = new OneHotProgram(e.size, t, r, n);
				return this.compileAndRun(a, [e])
			}, e.prototype.makeOutputArray = function(e, t) {
				return Tensor.make(e, {}, t)
			}, e.prototype.compileAndRun = function(e, t, r, n) {
				var a = this;
				null == r && (r = this.makeOutputArray(e.outputShape, t[0].dtype));
				var o = t.map(function(e) {
					return a.uploadToGPU(e.dataId), {
						tensor: e,
						texData: a.texData.get(e.dataId)
					}
				});
				this.uploadToGPU(r.dataId);
				var i, s = {
						tensor: r,
						texData: this.texData.get(r.dataId)
					},
					u = makeShaderKey(e, o, s),
					l = this.getAndSaveBinary(u, function() {
						return compileProgram(a.gpgpu, e, o, s)
					}),
					c = null != this.activeTimers;
				if (c && (i = this.startTimer()), runProgram(l, o, s, n), this.numBytesInGPU > this.NUM_BYTES_BEFORE_PAGING)
					for (var p = this.numBytesInGPU - this.NUM_BYTES_BEFORE_PAGING; p > 0;) {
						var d = this.lruDataGPU.shift(),
							h = this.texData.get(d),
							f = h.shape,
							m = h.dtype;
						p -= this.computeBytes(f, m), this.read(d)
					}
				return c && (i = this.endTimer(i), this.activeTimers.push(this.getQueryTime(i))), r
			}, e.prototype.getAndSaveBinary = function(e, t) {
				return e in this.binaryCache || (this.binaryCache[e] = t()), this.binaryCache[e]
			}, e.prototype.getTextureManager = function() {
				return this.textureManager
			}, e.prototype.dispose = function() {
				if (!this.disposed) {
					for (var e in this.binaryCache) this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram);
					this.textureManager.dispose(), this.canvas.remove(), null != this.fromPixelsCanvas && this.fromPixelsCanvas.remove(), this.gpgpuCreatedLocally && this.gpgpu.dispose(), this.disposed = !0
				}
			}, e.prototype.throwIfNoData = function(e) {
				if (!this.texData.has(e)) throw new Error("WebGL backend: No data found for this tensor. Did you change your backend in the middle of the program? New backends can't use Tensors created with previous backends")
			}, e.prototype.uploadToGPU = function(e) {
				this.throwIfNoData(e);
				var t = this.texData.get(e),
					r = t.shape,
					n = t.values,
					a = t.texture,
					o = (t.dtype, t.texType);
				if (null != a) return this.lruDataGPU.splice(this.lruDataGPU.indexOf(e), 1), void this.lruDataGPU.push(e);
				var i, s = null != this.activeTimers;
				s && (i = performance.now());
				var u = getTextureShapeFromLogicalShape(this.gpgpu.gl, r);
				t.texShape = u;
				var l = this.acquireTexture(e, u, o);
				t.texture = l, null != n && (this.gpgpu.uploadMatrixToTexture(l, u[0], u[1], typedArrayToFloat32(n)), t.values = null, s && (this.uploadWaitMs += performance.now() - i))
			}, e.prototype.cacheOnCPU = function(e, t) {
				var r = this.delayedStorage,
					n = this.texData.get(e),
					a = n.texture,
					o = n.texShape,
					i = n.dtype,
					s = n.texType;
				r && null != a && (this.releaseTexture(e, a, o, s), n.texture = null, n.texShape = null), null != t && (n.values = float32ToTypedArray(t, i))
			}, e.prototype.releaseTexture = function(e, t, r, n) {
				var a = this.texData.get(e),
					o = a.shape,
					i = a.dtype,
					s = this.lruDataGPU.indexOf(e);
				s >= 0 && this.lruDataGPU.splice(s, 1), this.numBytesInGPU -= this.computeBytes(o, i), this.textureManager.releaseTexture(t, r, n)
			}, e.prototype.acquireTexture = function(e, t, r) {
				var n = this.texData.get(e),
					a = n.shape,
					o = n.dtype;
				return this.lruDataGPU.push(e), this.numBytesInGPU += this.computeBytes(a, o), this.textureManager.acquireTexture(t, r)
			}, e.prototype.computeBytes = function(e, t) {
				return sizeFromShape(e) * bytesPerElement(t)
			}, e
		}();
	ENV.get("IS_BROWSER") && ENV.registerBackend("webgl", function() {
		return new MathBackendWebGL
	}, 2);
	var __awaiter$6 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$6 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		MathBackendCPU = function() {
			function e() {
				this.data = new WeakMap, this.firstUse = !0, ENV.get("IS_BROWSER") && (this.canvas = document.createElement("canvas"))
			}
			return e.prototype.register = function(e, t, r) {
				if (this.firstUse && (this.firstUse = !1, ENV.get("IS_NODE") && console.warn("\n============================\nHi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.\n============================\n")), this.data.has(e)) throw new Error("Data buffer is already registered");
				this.data.set(e, null)
			}, e.prototype.write = function(e, t) {
				if (null == t) throw new Error("MathBackendCPU.write(): values can not be null");
				this.throwIfNoData(e), this.data.set(e, t)
			}, e.prototype.fromPixels = function(e, t) {
				if (null == e) throw new Error("MathBackendCPU.writePixels(): pixels can not be null");
				var r;
				if (e instanceof ImageData) r = e.data;
				else if (e instanceof HTMLCanvasElement) r = e.getContext("2d").getImageData(0, 0, e.width, e.height).data;
				else {
					if (!(e instanceof HTMLImageElement || e instanceof HTMLVideoElement)) throw new Error("pixels is of unknown type: " + e.constructor.name);
					if (null == this.canvas) throw new Error("Can't read pixels from HTMLImageElement outside the browser.");
					this.canvas.width = e.width, this.canvas.height = e.height, this.canvas.getContext("2d").drawImage(e, 0, 0, e.width, e.height), r = this.canvas.getContext("2d").getImageData(0, 0, e.width, e.height).data
				}
				var n;
				if (4 === t) n = new Int32Array(r);
				else {
					var a = e.width * e.height;
					n = new Int32Array(a * t);
					for (var o = 0; o < a; o++)
						for (var i = 0; i < t; ++i) n[o * t + i] = r[4 * o + i]
				}
				var s = [e.height, e.width, t];
				return tensor3d(n, s, "int32")
			}, e.prototype.read = function(e) {
				return __awaiter$6(this, void 0, void 0, function() {
					return __generator$6(this, function(t) {
						return [2, this.readSync(e)]
					})
				})
			}, e.prototype.readSync = function(e) {
				return this.throwIfNoData(e), this.data.get(e)
			}, e.prototype.disposeData = function(e) {
				this.data.has(e) && this.data.delete(e)
			}, e.prototype.time = function(e) {
				return __awaiter$6(this, void 0, void 0, function() {
					var t, r;
					return __generator$6(this, function(n) {
						return t = performance.now(), e(), r = performance.now() - t, [2, {
							kernelMs: r
						}]
					})
				})
			}, e.prototype.memory = function() {
				return {
					unreliable: !0
				}
			}, e.prototype.throwIfNoData = function(e) {
				if (!this.data.has(e)) throw new Error("CPU backend: No data found for this tensor. Did you change your backend in the middle of the program? New backends can't use Tensors created with previous backends")
			}, e.prototype.slice = function(e, t, r) {
				for (var n = buffer(r, e.dtype), a = 0; a < n.size; ++a) {
					var o = n.indexToLoc(a),
						i = o.map(function(e, r) {
							return e + t[r]
						});
					n.set.apply(n, [e.get.apply(e, i)].concat(o))
				}
				return n.toTensor()
			}, e.prototype.stridedSlice = function(e, t, r, n, a, o) {
				var i = getStridedSlicedInfo(e.shape, t, r, n, a, o),
					s = i[0],
					u = i[1];
				if (u.some(function(e) {
						return 0 === e
					})) return tensor([], u);
				for (var l = buffer(u, e.dtype), c = 0; c < l.size; c++) {
					for (var p = l.indexToLoc(c), d = new Array(p.length), h = 0; h < d.length; h++) d[h] = p[h] * n[h] + s[h];
					l.set.apply(l, [e.get.apply(e, d)].concat(p))
				}
				return l.toTensor()
			}, e.prototype.reverse = function(e, t) {
				for (var r = buffer(e.shape, e.dtype), n = e.buffer(), a = 0; a < r.size; a++) ! function(a) {
					var o = r.indexToLoc(a),
						i = o.slice();
					t.forEach(function(t) {
						return i[t] = e.shape[t] - 1 - i[t]
					}), r.set.apply(r, [n.get.apply(n, i)].concat(o))
				}(a);
				return r.toTensor()
			}, e.prototype.concat = function(e, t) {
				var r = computeOutShape(e.shape, t.shape, 1),
					n = buffer(r, e.dtype);
				if (1 === e.shape[0] && 1 === t.shape[0]) {
					var a = e.dataSync(),
						o = t.dataSync(),
						i = n.values;
					return i.set(a, 0), i.set(o, e.size), n.toTensor()
				}
				for (var s = 0; s < r[0]; ++s) {
					for (u = 0; u < e.shape[1]; ++u) n.set(e.get(s, u), s, u);
					for (var u = 0; u < t.shape[1]; ++u) n.set(t.get(s, u), s, u + e.shape[1])
				}
				return n.toTensor()
			}, e.prototype.neg = function(e) {
				return this.multiply(scalar(-1), e)
			}, e.prototype.add = function(e, t) {
				return this.broadcastedBinaryOp(e, t, upcastType(e.dtype, t.dtype), function(e, t) {
					return e + t
				})
			}, e.prototype.subtract = function(e, t) {
				return this.broadcastedBinaryOp(e, t, upcastType(e.dtype, t.dtype), function(e, t) {
					return e - t
				})
			}, e.prototype.pow = function(e, t) {
				return this.broadcastedBinaryOp(e, t, e.dtype, function(e, t) {
					return Math.pow(e, t)
				})
			}, e.prototype.matMul = function(e, t, r, n) {
				for (var a = r ? e.shape[0] : e.shape[1], o = r ? e.shape[1] : e.shape[0], i = n ? t.shape[0] : t.shape[1], s = e.dataSync(), u = t.dataSync(), l = r ? [1, e.strides[0]] : [e.strides[0], 1], c = l[0], p = l[1], d = n ? [t.strides[0], 1] : [1, t.strides[0]], h = d[0], f = d[1], m = o * c, g = i * h, y = new Float32Array(o * i), v = 0, b = 0; b < m; b += c)
					for (var x = 0; x < g; x += h) {
						for (var w = b, _ = x, S = 0, N = 0; N < a; ++N) S += s[w] * u[_], w += p, _ += f;
						y[v++] = S
					}
				return tensor2d(y, [o, i])
			}, e.prototype.multiply = function(e, t) {
				return this.broadcastedBinaryOp(e, t, upcastType(e.dtype, t.dtype), function(e, t) {
					return e * t
				})
			}, e.prototype.realDivide = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "float32", function(e, t) {
					return e / t
				})
			}, e.prototype.floorDiv = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "int32", function(e, t) {
					return Math.floor(e / t)
				})
			}, e.prototype.sum = function(e, t) {
				assertAxesAreInnerMostDims("sum", t, e.rank);
				for (var r = computeOutAndReduceShapes(e.shape, t), n = r[0], a = r[1], o = upcastType(e.dtype, "int32"), i = zeros(n, o), s = sizeFromShape(a), u = i.dataSync(), l = e.dataSync(), c = 0; c < u.length; ++c) {
					for (var p = c * s, d = 0, h = 0; h < s; ++h) d += l[p + h];
					u[c] = d
				}
				return i
			}, e.prototype.argMin = function(e, t) {
				var r = [t];
				assertAxesAreInnerMostDims("argMin", r, e.rank);
				for (var n = computeOutAndReduceShapes(e.shape, r), a = n[0], o = n[1], i = zeros(a, "int32"), s = sizeFromShape(o), u = i.dataSync(), l = e.dataSync(), c = 0; c < u.length; ++c) {
					for (var p = c * s, d = l[p], h = 0, f = 0; f < s; ++f) {
						var m = l[p + f];
						m < d && (d = m, h = f)
					}
					u[c] = h
				}
				return i
			}, e.prototype.argMax = function(e, t) {
				var r = [t];
				assertAxesAreInnerMostDims("argMax", r, e.rank);
				for (var n = computeOutAndReduceShapes(e.shape, r), a = n[0], o = n[1], i = zeros(a, "int32"), s = sizeFromShape(o), u = i.dataSync(), l = e.dataSync(), c = 0; c < u.length; ++c) {
					for (var p = c * s, d = l[p], h = 0, f = 0; f < s; ++f) {
						var m = l[p + f];
						m > d && (d = m, h = f)
					}
					u[c] = h
				}
				return i
			}, e.prototype.cumsum = function(e, t, r, n) {
				if (t !== e.rank - 1) throw new Error("backend.cumsum in CPU expects an inner-most axis=" + (e.rank - 1) + " but got axis=" + t);
				for (var a = upcastType(e.dtype, "int32"), o = zeros(e.shape, a), i = o.dataSync(), s = e.dataSync(), u = e.shape[e.rank - 1], l = n ? function(e, t) {
						return e + u - t - 1
					} : function(e, t) {
						return e + t
					}, c = 0; c < s.length; c += u)
					for (var p = 0; p < u; p++) {
						var d = l(c, p);
						if (0 === p) i[d] = r ? 0 : s[d];
						else {
							var h = l(c, p - 1);
							i[d] = r ? s[h] + i[h] : s[d] + i[h]
						}
					}
				return o
			}, e.prototype.equal = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "bool", function(e, t) {
					return e === t ? 1 : 0
				})
			}, e.prototype.notEqual = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "bool", function(e, t) {
					return e !== t ? 1 : 0
				})
			}, e.prototype.less = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "bool", function(e, t) {
					return e < t ? 1 : 0
				})
			}, e.prototype.lessEqual = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "bool", function(e, t) {
					return e <= t ? 1 : 0
				})
			}, e.prototype.greater = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "bool", function(e, t) {
					return e > t ? 1 : 0
				})
			}, e.prototype.greaterEqual = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "bool", function(e, t) {
					return e >= t ? 1 : 0
				})
			}, e.prototype.logicalNot = function(e) {
				for (var t = e.dataSync(), r = new Int32Array(t.length), n = 0; n < t.length; ++n) r[n] = t[n] ? 0 : 1;
				return Tensor.make(e.shape, {
					values: r
				}, "bool")
			}, e.prototype.logicalAnd = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "bool", function(e, t) {
					return e && t
				})
			}, e.prototype.logicalOr = function(e, t) {
				return this.broadcastedBinaryOp(e, t, "bool", function(e, t) {
					return e || t
				})
			}, e.prototype.where = function(e, t, r, n) {
				for (var a = e.dataSync(), o = t.dataSync(), i = r.dataSync(), s = zeros(t.shape, n), u = s.dataSync(), l = 0, c = 0 === e.rank || e.rank > 1 || 1 === t.rank ? 1 : t.shape[1], p = 0; p < a.length; p++)
					for (var d = 0; d < c; d++) 1 === a[p] ? u[l++] = o[p] : u[l++] = i[p];
				return s
			}, e.prototype.topKValues = function(e, t) {
				return this.topK(e, t).values
			}, e.prototype.topKIndices = function(e, t) {
				return this.topK(e, t).indices
			}, e.prototype.topK = function(e, t) {
				for (var r = e.dataSync(), n = [], a = 0; a < r.length; a++) n.push({
					value: r[a],
					index: a
				});
				n.sort(function(e, t) {
					return t.value - e.value
				});
				for (var o = getTypedArrayFromDType(e.dtype, t), i = new Int32Array(t), a = 0; a < t; a++) o[a] = n[a].value, i[a] = n[a].index;
				return {
					values: tensor1d(o, e.dtype),
					indices: tensor1d(i, "int32")
				}
			}, e.prototype.min = function(e, t) {
				assertAxesAreInnerMostDims("min", t, e.rank);
				for (var r = computeOutAndReduceShapes(e.shape, t), n = r[0], a = r[1], o = zeros(n, e.dtype), i = sizeFromShape(a), s = o.dataSync(), u = e.dataSync(), l = 0; l < s.length; ++l) {
					for (var c = l * i, p = u[0], d = 0; d < i; ++d) {
						var h = u[c + d];
						h < p && (p = h)
					}
					s[l] = p
				}
				return o
			}, e.prototype.minimum = function(e, t) {
				return this.broadcastedBinaryOp(e, t, e.dtype, function(e, t) {
					return Math.min(e, t)
				})
			}, e.prototype.mod = function(e, t) {
				return this.broadcastedBinaryOp(e, t, e.dtype, function(e, t) {
					var r = e % t;
					return e < 0 && t < 0 || e >= 0 && t >= 0 ? r : (r + t) % t
				})
			}, e.prototype.max = function(e, t) {
				assertAxesAreInnerMostDims("max", t, e.rank);
				for (var r = computeOutAndReduceShapes(e.shape, t), n = r[0], a = r[1], o = zeros(n, e.dtype), i = sizeFromShape(a), s = o.dataSync(), u = e.dataSync(), l = 0; l < s.length; ++l) {
					for (var c = l * i, p = u[c], d = 0; d < i; ++d) {
						var h = u[c + d];
						h > p && (p = h)
					}
					s[l] = p
				}
				return o
			}, e.prototype.maximum = function(e, t) {
				return this.broadcastedBinaryOp(e, t, e.dtype, function(e, t) {
					return Math.max(e, t)
				})
			}, e.prototype.squaredDifference = function(e, t) {
				return this.broadcastedBinaryOp(e, t, e.dtype, function(e, t) {
					var r = e - t;
					return r * r
				})
			}, e.prototype.ceil = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) r[n] = Math.ceil(t[n]);
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.floor = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) r[n] = Math.floor(t[n]);
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.sign = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) t[n] < 0 ? r[n] = -1 : t[n] > 0 ? r[n] = 1 : r[n] = 0;
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.round = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) {
					var a = Math.floor(t[n]);
					t[n] - a < .5 ? r[n] = Math.floor(t[n]) : t[n] - a > .5 ? r[n] = Math.ceil(t[n]) : r[n] = a % 2 == 0 ? a : a + 1
				}
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.exp = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) r[n] = Math.exp(t[n]);
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.expm1 = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) r[n] = Math.expm1(t[n]);
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.log = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) {
					var a = t[n];
					r[n] = Math.log(a)
				}
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.log1p = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) {
					var a = t[n];
					r[n] = Math.log1p(a)
				}
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.sqrt = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) {
					var a = t[n];
					r[n] = Math.sqrt(a)
				}
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.rsqrt = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) {
					var a = t[n];
					r[n] = 1 / Math.sqrt(a)
				}
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.square = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) {
					var a = t[n];
					r[n] = a * a
				}
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.reciprocal = function(e) {
				for (var t = e.dataSync(), r = new Float32Array(t.length), n = 0; n < t.length; ++n) r[n] = 1 / t[n];
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.relu = function(e) {
				for (var t = zeros(e.shape, e.dtype), r = t.dataSync(), n = e.dataSync(), a = 0; a < n.length; ++a) r[a] = Math.max(0, n[a]);
				return t
			}, e.prototype.elu = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) {
					var a = r[n];
					t[n] = a >= 0 ? a : Math.exp(a) - 1
				}
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.eluDer = function(e, t) {
				for (var r = new Float32Array(t.size), n = t.dataSync(), a = e.dataSync(), o = 0; o < n.length; ++o) {
					var i = n[o];
					r[o] = i >= 1 ? a[o] : a[o] * (i + 1)
				}
				return Tensor.make(t.shape, {
					values: r
				})
			}, e.prototype.selu = function(e) {
				for (var t = SELU_SCALEALPHA, r = SELU_SCALE, n = new Float32Array(e.size), a = e.dataSync(), o = 0; o < a.length; ++o) {
					var i = a[o];
					n[o] = i >= 0 ? r * i : t * (Math.exp(i) - 1)
				}
				return Tensor.make(e.shape, {
					values: n
				})
			}, e.prototype.clip = function(e, t, r) {
				for (var n = new Float32Array(e.size), a = e.dataSync(), o = 0; o < a.length; ++o) n[o] = Math.min(r, Math.max(t, a[o]));
				return Tensor.make(e.shape, {
					values: n
				})
			}, e.prototype.abs = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.abs(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.int = function(e) {
				for (var t = new Int32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = r[n];
				return Tensor.make(e.shape, {
					values: t
				}, "int32")
			}, e.prototype.sigmoid = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = 1 / (1 + Math.exp(-r[n]));
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.softplus = function(e) {
				for (var t = Math.log(1.1920928955078125e-7) + 2, r = new Float32Array(e.size), n = e.dataSync(), a = 0; a < n.length; ++a) {
					var o = n[a] > -t,
						i = n[a] < t,
						s = Math.exp(n[a]),
						u = void 0;
					u = i ? s : o ? n[a] : Math.log(1 + s), r[a] = u
				}
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.sin = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.sin(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.cos = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.cos(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.tan = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.tan(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.asin = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.asin(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.acos = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.acos(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.atan = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.atan(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.atan2 = function(e, t) {
				return this.broadcastedBinaryOp(e, t, e.dtype, function(e, t) {
					return Math.atan2(e, t)
				})
			}, e.prototype.sinh = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.sinh(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.cosh = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.cosh(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.tanh = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = tanh(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.asinh = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.asinh(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.acosh = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.acosh(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.atanh = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = 0; n < r.length; ++n) t[n] = Math.atanh(r[n]);
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.erf = function(e) {
				for (var t = new Float32Array(e.size), r = e.dataSync(), n = ERF_P, a = ERF_A1, o = ERF_A2, i = ERF_A3, s = ERF_A4, u = ERF_A5, l = 0; l < r.length; ++l) {
					var c = r[l],
						p = 1 / (1 + n * c);
					t[l] = 1 - ((((u * p + s) * p + i) * p + o) * p + a) * p * Math.exp(-c * c)
				}
				return Tensor.make(e.shape, {
					values: t
				})
			}, e.prototype.step = function(e, t) {
				void 0 === t && (t = 0);
				for (var r = new Float32Array(e.size), n = e.dataSync(), a = 0; a < n.length; ++a) {
					var o = n[a];
					isNaN(o) ? r[a] = NaN : r[a] = o > 0 ? 1 : t
				}
				return Tensor.make(e.shape, {
					values: r
				})
			}, e.prototype.conv2d = function(e, t, r) {
				for (var n = r.filterHeight, a = r.filterWidth, o = r.dilationHeight, i = r.dilationWidth, s = r.padInfo.left, u = r.padInfo.top, l = buffer(r.outShape, e.dtype), c = 0; c < r.batchSize; ++c)
					for (var p = 0; p < r.outChannels; ++p)
						for (var d = 0; d < r.outHeight; ++d)
							for (var h = d * r.strideHeight - s, f = 0; f < r.outWidth; ++f) {
								for (var m = f * r.strideWidth - u, g = 0, y = 0; y < n; y++) {
									var v = h + y * o;
									if (!(v < 0 || v >= r.inHeight))
										for (var b = 0; b < a; b++) {
											var x = m + b * i;
											if (!(x < 0 || x >= r.inWidth))
												for (var w = 0; w < r.inChannels; ++w) g += e.get(c, v, x, w) * t.get(y, b, w, p)
										}
								}
								l.set(g, c, d, f, p)
							}
				return l.toTensor()
			}, e.prototype.conv2dDerInput = function(e, t, r) {
				for (var n = buffer(r.inShape, "float32"), a = n.values, o = n.strides, i = o[0], s = o[1], u = o[2], l = e.dataSync(), c = e.strides, p = c[0], d = c[1], h = c[2], f = t.dataSync(), m = t.strides, g = m[0], y = m[1], v = m[2], b = r.batchSize, x = r.filterHeight, w = r.filterWidth, _ = r.inChannels, S = r.inHeight, N = r.inWidth, A = r.outChannels, E = r.outHeight, T = r.outWidth, I = r.strideHeight, O = r.strideWidth, P = x - 1 - r.padInfo.top, R = w - 1 - r.padInfo.left, C = 0; C < b; ++C)
					for (var k = 0; k < _; ++k)
						for (var D = 0; D < S; ++D)
							for (var M = D - P, L = Math.max(0, Math.ceil(M / I)), z = Math.min(E, (x + M) / I), V = 0; V < N; ++V) {
								for (var F = V - R, $ = Math.max(0, Math.ceil(F / O)), B = Math.min(T, (w + F) / O), U = 0, j = L; j < z; ++j)
									for (var G = j * I - M, W = $; W < B; ++W)
										for (var q = p * C + d * j + h * W, H = g * (x - 1 - G) + y * (w - 1 - (W * O - F)) + v * k, K = 0; K < A; ++K) U += l[q + K] * f[H + K];
								a[i * C + s * D + u * V + k] = U
							}
				return n.toTensor()
			}, e.prototype.conv2dDerFilter = function(e, t, r) {
				for (var n = r.strideHeight, a = r.strideWidth, o = r.filterHeight, i = r.filterWidth, s = buffer(r.filterShape, "float32"), u = r.padInfo.left, l = r.padInfo.top, c = 0; c < o; ++c)
					for (var p = Math.max(0, Math.ceil((l - c) / n)), d = Math.min(r.outHeight, (r.inHeight + l - c) / n), h = 0; h < i; ++h)
						for (var f = Math.max(0, Math.ceil((u - h) / a)), m = Math.min(r.outWidth, (r.inWidth + u - h) / a), g = 0; g < r.inChannels; ++g)
							for (var y = 0; y < r.outChannels; ++y) {
								for (var v = 0, b = 0; b < r.batchSize; ++b)
									for (var x = p; x < d; ++x)
										for (var w = c + x * n - l, _ = f; _ < m; ++_) {
											var S = h + _ * a - u;
											v += e.get(b, w, S, g) * t.get(b, x, _, y)
										}
								s.set(v, c, h, g, y)
							}
				return s.toTensor()
			}, e.prototype.depthwiseConv2D = function(e, t, r) {
				for (var n = r.filterHeight, a = r.filterWidth, o = r.dilationHeight, i = r.dilationWidth, s = r.padInfo.left, u = r.padInfo.top, l = r.outChannels / r.inChannels, c = buffer(r.outShape, e.dtype), p = 0; p < r.batchSize; ++p)
					for (var d = 0; d < r.inChannels; ++d)
						for (var h = 0; h < r.outHeight; ++h)
							for (var f = h * r.strideHeight - s, m = 0; m < r.outWidth; ++m)
								for (var g = m * r.strideWidth - u, y = 0; y < l; ++y) {
									for (var v = 0, b = 0; b < n; ++b) {
										var x = f + b * o;
										if (!(x < 0 || x >= r.inHeight))
											for (var w = 0; w < a; ++w) {
												var _ = g + w * i;
												_ < 0 || _ >= r.inWidth || (v += e.get(p, x, _, d) * t.get(b, w, d, y))
											}
									}
									c.set(v, p, h, m, d * l + y)
								}
				return c.toTensor()
			}, e.prototype.depthwiseConv2DDerInput = function(e, t, r) {
				for (var n = buffer(r.inShape, "float32"), a = n.values, o = n.strides, i = o[0], s = o[1], u = o[2], l = e.dataSync(), c = e.strides, p = c[0], d = c[1], h = c[2], f = t.dataSync(), m = t.strides, g = m[0], y = m[1], v = m[2], b = r.batchSize, x = r.filterHeight, w = r.filterWidth, _ = r.inChannels, S = r.inHeight, N = r.inWidth, A = r.outChannels, E = r.outHeight, T = r.outWidth, I = r.strideHeight, O = r.strideWidth, P = x - 1 - r.padInfo.top, R = w - 1 - r.padInfo.left, C = A / _, k = 0; k < b; ++k)
					for (var D = 0; D < _; ++D)
						for (var M = 0; M < S; ++M)
							for (var L = M - P, z = Math.max(0, Math.ceil(L / I)), V = Math.min(E, (x + L) / I), F = 0; F < N; ++F) {
								for (var $ = F - R, B = Math.max(0, Math.ceil($ / O)), U = Math.min(T, (w + $) / O), j = 0, G = z; G < V; ++G)
									for (var W = G * I - L, q = B; q < U; ++q)
										for (var H = p * k + d * G + h * q, K = g * (x - 1 - W) + y * (w - 1 - (q * O - $)) + v * D, X = 0; X < C; ++X) j += l[H + (D * C + X)] * f[K + X];
								a[i * k + s * M + u * F + D] = j
							}
				return n.toTensor()
			}, e.prototype.depthwiseConv2DDerFilter = function(e, t, r) {
				for (var n = r.strideHeight, a = r.strideWidth, o = r.filterHeight, i = r.filterWidth, s = buffer(r.filterShape, "float32"), u = r.padInfo.left, l = r.padInfo.top, c = r.outChannels / r.inChannels, p = 0; p < o; ++p)
					for (var d = Math.max(0, Math.ceil((l - p) / n)), h = Math.min(r.outHeight, (r.inHeight + l - p) / n), f = 0; f < i; ++f)
						for (var m = Math.max(0, Math.ceil((u - f) / a)), g = Math.min(r.outWidth, (r.inWidth + u - f) / a), y = 0; y < r.outChannels; ++y) {
							for (var v = Math.trunc(y / c), b = y % c, x = 0, w = 0; w < r.batchSize; ++w)
								for (var _ = d; _ < h; ++_)
									for (var S = p + _ * n - l, N = m; N < g; ++N) {
										var A = f + N * a - u;
										x += e.get(w, S, A, v) * t.get(w, _, N, y)
									}
							s.set(x, p, f, v, b)
						}
				return s.toTensor()
			}, e.prototype.tile = function(e, t) {
				for (var r = new Array(e.rank), n = 0; n < r.length; n++) r[n] = e.shape[n] * t[n];
				for (var a = buffer(r, e.dtype), o = e.buffer(), n = 0; n < a.values.length; ++n) {
					for (var i = a.indexToLoc(n), s = new Array(e.rank), u = 0; u < s.length; u++) s[u] = i[u] % e.shape[u];
					var l = o.locToIndex(s);
					a.values[n] = o.values[l]
				}
				return a.toTensor()
			}, e.prototype.pad = function(e, t, r) {
				var n = t.map(function(t, r) {
						return t[0] + e.shape[r] + t[1]
					}),
					a = t.map(function(e) {
						return e[0]
					}),
					o = e.buffer(),
					i = buffer(n, e.dtype);
				0 !== r && i.values.fill(r);
				for (var s = 0; s < e.size; s++) {
					var u = o.indexToLoc(s),
						l = u.map(function(e, t) {
							return e + a[t]
						});
					i.set.apply(i, [e.get.apply(e, u)].concat(l))
				}
				return i.toTensor()
			}, e.prototype.transpose = function(e, t) {
				for (var r = new Array(e.rank), n = 0; n < r.length; n++) r[n] = e.shape[t[n]];
				for (var a = e.dataSync(), o = buffer(r, e.dtype), i = e.buffer(), n = 0; n < e.size; ++n) {
					for (var s = i.indexToLoc(n), u = new Array(s.length), l = 0; l < u.length; l++) u[l] = s[t[l]];
					var c = o.locToIndex(u);
					o.values[c] = a[n]
				}
				return o.toTensor()
			}, e.prototype.gather = function(e, t, r) {
				var n = e.shape.slice(),
					a = t.dataSync();
				n[r] = a.length;
				for (var o = buffer(n, e.dtype), i = e.buffer(), s = 0; s < o.size; ++s) {
					var u = o.indexToLoc(s),
						l = u.slice();
					l[r] = a[u[r]];
					var c = i.locToIndex(l);
					o.values[s] = i.values[c]
				}
				return o.toTensor()
			}, e.prototype.pool = function(e, t, r) {
				for (var n = t.strideHeight, a = t.strideWidth, o = t.filterHeight, i = t.filterWidth, s = buffer(t.outShape, "float32"), u = t.padInfo.top, l = t.padInfo.left, c = 0; c < t.batchSize; ++c)
					for (var p = 0; p < t.inChannels; ++p)
						for (var d = 0; d < t.outHeight; ++d)
							for (var h = d * n - u, f = Math.max(0, h), m = Math.min(t.inHeight, o + h), g = 0; g < t.outWidth; ++g) {
								for (var y = g * a - l, v = Math.max(0, y), b = Math.min(t.inWidth, i + y), x = "max" === r ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY, w = 0, _ = 0, S = f; S < m; ++S) {
									for (var N = v; N < b; ++N) {
										var A = e.get(c, S, N, p);
										"max" === r && A > x ? x = A : "avg" === r && (w += A, _++)
									}
									if (isNaN(x)) break
								}
								s.set("avg" === r ? w / _ : x, c, d, g, p)
							}
				return s.toTensor()
			}, e.prototype.maxPool = function(e, t) {
				return this.pool(e, t, "max")
			}, e.prototype.maxPoolPositions = function(e, t) {
				for (var r = buffer(t.outShape, "int32"), n = t.strideHeight, a = t.strideWidth, o = t.filterHeight, i = t.filterWidth, s = t.padInfo.top, u = t.padInfo.left, l = 0; l < t.batchSize; ++l)
					for (var c = 0; c < t.inChannels; ++c)
						for (var p = 0; p < t.outHeight; ++p)
							for (var d = p * n - s, h = Math.max(0, d), f = Math.min(t.inHeight, o + d), m = 0; m < t.outWidth; ++m) {
								for (var g = m * a - u, y = Math.max(0, g), v = Math.min(t.inWidth, i + g), b = Number.NEGATIVE_INFINITY, x = -1, w = h; w < f; ++w)
									for (var _ = w - d, S = y; S < v; ++S) {
										var N = S - g,
											A = e.get(l, w, S, c);
										A > b && (b = A, x = _ * i + N)
									}
								r.set(x, l, p, m, c)
							}
				return r.toTensor()
			}, e.prototype.maxPoolBackprop = function(e, t, r, n) {
				for (var a = this.maxPoolPositions(t, n), o = n.strideHeight, i = n.strideWidth, s = n.filterHeight, u = n.filterWidth, l = u - 1 - n.padInfo.left, c = s - 1 - n.padInfo.top, p = buffer(t.shape, "float32"), d = 0; d < n.batchSize; ++d)
					for (var h = 0; h < n.inChannels; ++h)
						for (var f = 0; f < n.inHeight; ++f)
							for (var m = 0; m < n.inWidth; ++m) {
								for (var g = f - c, y = m - l, v = 0, b = 0; b < s; ++b) {
									var x = (g + b) / o;
									if (!(x < 0 || x >= n.outHeight || Math.floor(x) !== x))
										for (var w = 0; w < u; ++w) {
											var _ = (y + w) / i;
											if (!(_ < 0 || _ >= n.outWidth || Math.floor(_) !== _)) {
												var S = s * u - 1 - a.get(d, x, _, h) === b * u + w ? 1 : 0;
												0 !== S && (v += e.get(d, x, _, h) * S)
											}
										}
								}
								p.set(v, d, f, m, h)
							}
				return p.toTensor()
			}, e.prototype.avgPoolBackprop = function(e, t, r) {
				for (var n = r.strideHeight, a = r.strideWidth, o = r.filterHeight, i = r.filterWidth, s = i - 1 - r.padInfo.left, u = o - 1 - r.padInfo.top, l = buffer(t.shape, "float32"), c = 1 / (o * i), p = 0; p < r.batchSize; ++p)
					for (var d = 0; d < r.inChannels; ++d)
						for (var h = 0; h < r.inHeight; ++h)
							for (var f = 0; f < r.inWidth; ++f) {
								for (var m = h - u, g = f - s, y = 0, v = 0; v < o; ++v) {
									var b = (m + v) / n;
									if (!(b < 0 || b >= r.outHeight || Math.floor(b) !== b))
										for (var x = 0; x < i; ++x) {
											var w = (g + x) / a;
											w < 0 || w >= r.outWidth || Math.floor(w) !== w || (y += e.get(p, b, w, d))
										}
								}
								l.set(y * c, p, h, f, d)
							}
				return l.toTensor()
			}, e.prototype.cast = function(e, t) {
				return castTensor(e, t, this)
			}, e.prototype.reshape = function(e, t) {
				return reshapeTensor(e, t)
			}, e.prototype.avgPool = function(e, t) {
				return this.pool(e, t, "avg").toFloat()
			}, e.prototype.resizeBilinear = function(e, t, r, n) {
				for (var a = e.shape, o = a[0], i = a[1], s = a[2], u = a[3], l = buffer([o, t, r, u], e.dtype), c = [n && t > 1 ? i - 1 : i, n && r > 1 ? s - 1 : s], p = [n && t > 1 ? t - 1 : t, n && r > 1 ? r - 1 : r], d = 0; d < o; d++)
					for (var h = 0; h < t; h++)
						for (var f = 0; f < r; f++)
							for (var m = 0; m < u; m++) {
								var g = c[0] * h / p[0],
									y = c[1] * f / p[1],
									v = Math.floor(g),
									b = Math.min(i - 1, Math.ceil(g)),
									x = Math.floor(y),
									w = Math.min(s - 1, Math.ceil(y)),
									_ = e.get(d, v, x, m),
									S = e.get(d, b, x, m),
									N = y - x,
									A = _ + (e.get(d, v, w, m) - _) * N,
									E = A + (S + (e.get(d, b, w, m) - S) * N - A) * (g - v);
								l.set(E, d, h, f, m)
							}
				return l.toTensor()
			}, e.prototype.resizeBilinearBackprop = function(e, t, r) {
				for (var n = t.shape, a = n[0], o = n[1], i = n[2], s = n[3], u = e.shape, l = u[1], c = u[2], p = buffer([a, o, i, s], t.dtype), d = [r && l > 1 ? o - 1 : o, r && c > 1 ? i - 1 : i], h = [r && l > 1 ? l - 1 : l, r && c > 1 ? c - 1 : c], f = d[0] / h[0], m = d[1] / h[1], g = 0; g < a; g++)
					for (var y = 0; y < l; y++)
						for (var v = y * f, b = Math.floor(v), x = Math.min(Math.ceil(v), o - 1), w = v - b, _ = 1 - w, S = 0; S < c; S++)
							for (var N = S * m, A = Math.floor(N), E = Math.min(Math.ceil(N), i - 1), T = N - A, I = 1 - T, O = 0; O < s; O++) {
								var P = e.get(g, y, S, O),
									R = p.get(g, b, A, O);
								R += P * _ * I, p.set(R, g, b, A, O);
								var C = p.get(g, b, E, O);
								C += P * _ * T, p.set(C, g, b, E, O);
								var k = p.get(g, x, A, O);
								k += P * w * I, p.set(k, g, x, A, O);
								var D = p.get(g, x, E, O);
								D += P * w * T, p.set(D, g, x, E, O)
							}
				return p.toTensor()
			}, e.prototype.resizeNearestNeighbor = function(e, t, r, n) {
				for (var a = e.shape, o = a[0], i = a[1], s = a[2], u = a[3], l = buffer([o, t, r, u], e.dtype), c = n ? [i - 1, s - 1] : [i, s], p = n ? [t - 1, r - 1] : [t, r], d = 0; d < o; d++)
					for (var h = 0; h < t; h++)
						for (var f = 0; f < r; f++)
							for (var m = 0; m < u; m++) {
								var g = c[0] * h / p[0],
									y = c[1] * f / p[1],
									v = Math.min(i - 1, n ? Math.round(g) : Math.floor(g)),
									b = Math.min(s - 1, n ? Math.round(y) : Math.floor(y)),
									x = e.get(d, v, b, m);
								l.set(x, d, h, f, m)
							}
				return l.toTensor()
			}, e.prototype.batchNormalization = function(e, t, r, n, a, o) {
				for (var i = e.dataSync(), s = t.dataSync(), u = r.dataSync(), l = a ? a.dataSync() : new Float32Array([1]), c = o ? o.dataSync() : new Float32Array([0]), p = new Float32Array(i.length), d = 0; d < i.length; d++) p[d] = c[d % c.length] + (i[d] - s[d % s.length]) * l[d % l.length] / Math.sqrt(u[d % u.length] + n);
				return tensor4d(p, e.shape)
			}, e.prototype.localResponseNormalization4D = function(e, t, r, n, a) {
				for (var o = buffer(e.shape, "float32"), i = t, s = o.shape[3] - 1, u = 0; u < o.shape[0]; u++)
					for (var l = 0; l <= o.shape[1]; l++)
						for (var c = 0; c < o.shape[2]; c++)
							for (var p = 0; p < o.shape[3]; p++) {
								var d = function(t, r, n, a) {
										for (var o = 0, u = Math.max(0, a - i); u <= Math.min(a + i, s); u++) {
											var l = e.get(t, r, n, u);
											o += l * l
										}
										return o
									}(u, l, c, p),
									h = e.get(u, l, c, p) * Math.pow(r + n * d, -a);
								o.set(h, u, l, c, p)
							}
				return o.toTensor()
			}, e.prototype.multinomial = function(e, t, r, n) {
				for (var a = t ? e : softmax(e), o = a.shape[0], i = a.shape[1], s = zeros([o, r], "int32"), u = s.dataSync(), l = a.dataSync(), c = 0; c < o; ++c) {
					var p = c * i,
						d = new Float32Array(i - 1);
					d[0] = l[p];
					for (var h = 1; h < d.length; ++h) d[h] = d[h - 1] + l[p + h];
					for (var f = seedrandom_1(n.toString()), m = c * r, g = 0; g < r; ++g) {
						var y = f();
						u[m + g] = d.length;
						for (var v = 0; v < d.length; v++)
							if (y < d[v]) {
								u[m + g] = v;
								break
							}
					}
				}
				return s
			}, e.prototype.oneHot = function(e, t, r, n) {
				var a = new Float32Array(e.size * t);
				a.fill(n);
				for (var o = 0; o < e.size; ++o) a[o * t + e.get(o)] = r;
				return tensor2d(a, [e.size, t])
			}, e.prototype.broadcastedBinaryOp = function(e, t, r, n) {
				for (var a = assertAndGetBroadcastShape(e.shape, t.shape), o = buffer(a, r), i = e.dataSync(), s = t.dataSync(), u = getBroadcastDims(e.shape, a), l = getBroadcastDims(t.shape, a), c = e.buffer(), p = t.buffer(), d = 0; d < o.values.length; ++d) ! function(r) {
					var a = o.indexToLoc(r),
						d = a.slice(-e.rank);
					u.forEach(function(e) {
						return d[e] = 0
					});
					var h = c.locToIndex(d),
						f = a.slice(-t.rank);
					l.forEach(function(e) {
						return f[e] = 0
					});
					var m = p.locToIndex(f);
					o.values[r] = n(i[h], s[m])
				}(d);
				return o.toTensor()
			}, e.prototype.dispose = function() {}, e
		}();
	ENV.registerBackend("cpu", function() {
		return new MathBackendCPU
	}, 1);
	var __decorate$27 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		BrowserUtil = function() {
			function e() {}
			return e.nextFrame = function() {
				return new Promise(function(e) {
					return requestAnimationFrame(function() {
						return e()
					})
				})
			}, __decorate$27([doc()], e, "nextFrame", null), e
		}(),
		DTYPE_VALUE_SIZE_MAP = {
			float32: 4,
			int32: 4,
			uint16: 2,
			uint8: 1,
			bool: 1
		},
		__awaiter$7 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$7 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		IORouterRegistry = function() {
			function e() {
				this.saveRouters = [], this.loadRouters = []
			}
			return e.getInstance = function() {
				return null == e.instance && (e.instance = new e), e.instance
			}, e.registerSaveRouter = function(t) {
				e.getInstance().saveRouters.push(t)
			}, e.registerLoadRouter = function(t) {
				e.getInstance().loadRouters.push(t)
			}, e.getSaveHandlers = function(t) {
				return e.getHandlers(t, "save")
			}, e.getLoadHandlers = function(t) {
				return e.getHandlers(t, "load")
			}, e.getHandlers = function(e, t) {
				var r = [];
				return ("load" === t ? this.getInstance().loadRouters : this.getInstance().saveRouters).forEach(function(t) {
					var n = t(e);
					null !== n && r.push(n)
				}), r
			}, e
		}(),
		__decorate$28 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		__awaiter$8 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$8 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		URL_SCHEME_SUFFIX = "://",
		ModelStoreManagerRegistry = function() {
			function e() {
				this.managers = {}
			}
			return e.getInstance = function() {
				return null == e.instance && (e.instance = new e), e.instance
			}, e.registerManager = function(t, r) {
				assert(null != t, "scheme must not be undefined or null."), t.endsWith(URL_SCHEME_SUFFIX) && (t = t.slice(0, t.indexOf(URL_SCHEME_SUFFIX))), assert(t.length > 0, "scheme must not be an empty string.");
				var n = e.getInstance();
				assert(null == n.managers[t], "A model store manager is already registered for scheme '" + t + "'."), n.managers[t] = r
			}, e.getManager = function(e) {
				var t = this.getInstance().managers[e];
				if (null == t) throw new Error("Cannot find model manager for scheme '" + e + "'");
				return t
			}, e.getSchemes = function() {
				return Object.keys(this.getInstance().managers)
			}, e
		}(),
		ModelManagement = function() {
			function e() {}
			return e.listModels = function() {
				return __awaiter$8(this, void 0, void 0, function() {
					var e, t, r, n, a, o, i, s;
					return __generator$8(this, function(u) {
						switch (u.label) {
							case 0:
								e = ModelStoreManagerRegistry.getSchemes(), t = {}, r = 0, n = e, u.label = 1;
							case 1:
								return r < n.length ? (a = n[r], [4, ModelStoreManagerRegistry.getManager(a).listModels()]) : [3, 4];
							case 2:
								o = u.sent();
								for (i in o) t[s = a + URL_SCHEME_SUFFIX + i] = o[i];
								u.label = 3;
							case 3:
								return r++, [3, 1];
							case 4:
								return [2, t]
						}
					})
				})
			}, e.removeModel = function(e) {
				return __awaiter$8(this, void 0, void 0, function() {
					var t, r;
					return __generator$8(this, function(n) {
						switch (n.label) {
							case 0:
								return t = parseURL(e), r = ModelStoreManagerRegistry.getManager(t.scheme), [4, r.removeModel(t.path)];
							case 1:
								return [2, n.sent()]
						}
					})
				})
			}, e.copyModel = function(e, t) {
				return __awaiter$8(this, void 0, void 0, function() {
					var r;
					return __generator$8(this, function(n) {
						switch (n.label) {
							case 0:
								return r = !1, [4, cloneModelInternal(e, t, r)];
							case 1:
								return [2, n.sent()]
						}
					})
				})
			}, e.moveModel = function(e, t) {
				return __awaiter$8(this, void 0, void 0, function() {
					var r;
					return __generator$8(this, function(n) {
						switch (n.label) {
							case 0:
								return r = !0, [4, cloneModelInternal(e, t, r)];
							case 1:
								return [2, n.sent()]
						}
					})
				})
			}, __decorate$28([doc()], e, "listModels", null), __decorate$28([doc()], e, "removeModel", null), __decorate$28([doc()], e, "copyModel", null), __decorate$28([doc()], e, "moveModel", null), e
		}(),
		__awaiter$9 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$9 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		DATABASE_NAME = "tensorflowjs",
		DATABASE_VERSION = 1,
		MODEL_STORE_NAME = "models_store",
		INFO_STORE_NAME = "model_info_store",
		BrowserIndexedDB = function() {
			function e(e) {
				if (this.indexedDB = getIndexedDBFactory(), null == e || !e) throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");
				this.modelPath = e
			}
			return e.prototype.save = function(e) {
				return __awaiter$9(this, void 0, void 0, function() {
					return __generator$9(this, function(t) {
						if (e.modelTopology instanceof ArrayBuffer) throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");
						return [2, this.databaseAction(this.modelPath, e)]
					})
				})
			}, e.prototype.load = function() {
				return __awaiter$9(this, void 0, void 0, function() {
					return __generator$9(this, function(e) {
						return [2, this.databaseAction(this.modelPath)]
					})
				})
			}, e.prototype.databaseAction = function(e, t) {
				var r = this;
				return new Promise(function(e, n) {
					var a = r.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
					a.onupgradeneeded = function() {
						return setUpDatabase(a)
					}, a.onsuccess = function() {
						var o = a.result;
						if (null == t) {
							var i = o.transaction(MODEL_STORE_NAME, "readonly"),
								s = i.objectStore(MODEL_STORE_NAME).get(r.modelPath);
							s.onsuccess = function() {
								if (null == s.result) return o.close(), n(new Error("Cannot find model with path '" + r.modelPath + "' in IndexedDB."));
								e(s.result.modelArtifacts)
							}, s.onerror = function(e) {
								return o.close(), n(s.error)
							}, i.oncomplete = function() {
								return o.close()
							}
						} else {
							var u, l = getModelArtifactsInfoForJSON(t),
								c = o.transaction(INFO_STORE_NAME, "readwrite"),
								p = c.objectStore(INFO_STORE_NAME),
								d = p.put({
									modelPath: r.modelPath,
									modelArtifactsInfo: l
								});
							d.onsuccess = function() {
								var a = (u = o.transaction(MODEL_STORE_NAME, "readwrite")).objectStore(MODEL_STORE_NAME).put({
									modelPath: r.modelPath,
									modelArtifacts: t,
									modelArtifactsInfo: l
								});
								a.onsuccess = function() {
									return e({
										modelArtifactsInfo: l
									})
								}, a.onerror = function(e) {
									var t = (p = c.objectStore(INFO_STORE_NAME)).delete(r.modelPath);
									t.onsuccess = function() {
										return o.close(), n(a.error)
									}, t.onerror = function(e) {
										return o.close(), n(a.error)
									}
								}
							}, d.onerror = function(e) {
								return o.close(), n(d.error)
							}, c.oncomplete = function() {
								null == u ? o.close() : u.oncomplete = function() {
									return o.close()
								}
							}
						}
					}, a.onerror = function(e) {
						return n(a.error)
					}
				})
			}, e.URL_SCHEME = "indexeddb://", e
		}(),
		indexedDBRouter = function(e) {
			return ENV.get("IS_BROWSER") && e.startsWith(BrowserIndexedDB.URL_SCHEME) ? browserIndexedDB(e.slice(BrowserIndexedDB.URL_SCHEME.length)) : null
		};
	IORouterRegistry.registerSaveRouter(indexedDBRouter), IORouterRegistry.registerLoadRouter(indexedDBRouter);
	var BrowserIndexedDBManager = function() {
		function e() {
			this.indexedDB = getIndexedDBFactory()
		}
		return e.prototype.listModels = function() {
			return __awaiter$9(this, void 0, void 0, function() {
				var e = this;
				return __generator$9(this, function(t) {
					return [2, new Promise(function(t, r) {
						var n = e.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
						n.onupgradeneeded = function() {
							return setUpDatabase(n)
						}, n.onsuccess = function() {
							var e = n.result,
								a = e.transaction(INFO_STORE_NAME, "readonly"),
								o = a.objectStore(INFO_STORE_NAME).getAll();
							o.onsuccess = function() {
								for (var e = {}, r = 0, n = o.result; r < n.length; r++) {
									var a = n[r];
									e[a.modelPath] = a.modelArtifactsInfo
								}
								t(e)
							}, o.onerror = function(t) {
								return e.close(), r(o.error)
							}, a.oncomplete = function() {
								return e.close()
							}
						}, n.onerror = function(e) {
							return r(n.error)
						}
					})]
				})
			})
		}, e.prototype.removeModel = function(e) {
			return __awaiter$9(this, void 0, void 0, function() {
				var t = this;
				return __generator$9(this, function(r) {
					return e = maybeStripScheme(e), [2, new Promise(function(r, n) {
						var a = t.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
						a.onupgradeneeded = function() {
							return setUpDatabase(a)
						}, a.onsuccess = function() {
							var t, o = a.result,
								i = o.transaction(INFO_STORE_NAME, "readwrite"),
								s = i.objectStore(INFO_STORE_NAME),
								u = s.get(e);
							u.onsuccess = function() {
								if (null == u.result) return o.close(), n(new Error("Cannot find model with path '" + e + "' in IndexedDB."));
								var a = s.delete(e),
									i = function() {
										var a = (t = o.transaction(MODEL_STORE_NAME, "readwrite")).objectStore(MODEL_STORE_NAME).delete(e);
										a.onsuccess = function() {
											return r(u.result.modelArtifactsInfo)
										}, a.onerror = function(e) {
											return n(u.error)
										}
									};
								a.onsuccess = i, a.onerror = function(e) {
									return i(), o.close(), n(u.error)
								}
							}, u.onerror = function(e) {
								return o.close(), n(u.error)
							}, i.oncomplete = function() {
								null == t ? o.close() : t.oncomplete = function() {
									return o.close()
								}
							}
						}, a.onerror = function(e) {
							return n(a.error)
						}
					})]
				})
			})
		}, e
	}();
	if (ENV.get("IS_BROWSER")) try {
		ModelStoreManagerRegistry.registerManager(BrowserIndexedDB.URL_SCHEME, new BrowserIndexedDBManager)
	} catch (e) {}
	var __awaiter$10 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$10 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		PATH_SEPARATOR = "/",
		PATH_PREFIX = "tensorflowjs_models",
		INFO_SUFFIX = "info",
		MODEL_TOPOLOGY_SUFFIX = "model_topology",
		WEIGHT_SPECS_SUFFIX = "weight_specs",
		WEIGHT_DATA_SUFFIX = "weight_data",
		BrowserLocalStorage = function() {
			function e(e) {
				if (!ENV.get("IS_BROWSER") || void 0 === window.localStorage) throw new Error("The current environment does not support local storage.");
				if (this.LS = window.localStorage, null == e || !e) throw new Error("For local storage, modelPath must not be null, undefined or empty.");
				this.modelPath = e, this.keys = getModelKeys(this.modelPath)
			}
			return e.prototype.save = function(e) {
				return __awaiter$10(this, void 0, void 0, function() {
					var t, r, n, a;
					return __generator$10(this, function(o) {
						if (e.modelTopology instanceof ArrayBuffer) throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");
						t = JSON.stringify(e.modelTopology), r = JSON.stringify(e.weightSpecs), n = getModelArtifactsInfoForJSON(e);
						try {
							return this.LS.setItem(this.keys.info, JSON.stringify(n)), this.LS.setItem(this.keys.topology, t), this.LS.setItem(this.keys.weightSpecs, r), this.LS.setItem(this.keys.weightData, arrayBufferToBase64String(e.weightData)), [2, {
								modelArtifactsInfo: n
							}]
						} catch (e) {
							for (a in this.keys) this.LS.removeItem(this.keys[a]);
							throw new Error("Failed to save model '" + this.modelPath + "' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=" + n.modelTopologyBytes + ", weightSpecsBytes=" + n.weightSpecsBytes + ", weightDataBytes=" + n.weightDataBytes + ".")
						}
						return [2]
					})
				})
			}, e.prototype.load = function() {
				return __awaiter$10(this, void 0, void 0, function() {
					var e, t, r, n, a;
					return __generator$10(this, function(o) {
						if (null == (e = JSON.parse(this.LS.getItem(this.keys.info)))) throw new Error("In local storage, there is no model with name '" + this.modelPath + "'");
						if ("JSON" !== e.modelTopologyType) throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");
						if (t = {}, null == (r = JSON.parse(this.LS.getItem(this.keys.topology)))) throw new Error("In local storage, the topology of model '" + this.modelPath + "' is missing.");
						if (t.modelTopology = r, null == (n = JSON.parse(this.LS.getItem(this.keys.weightSpecs)))) throw new Error("In local storage, the weight specs of model '" + this.modelPath + "' are missing.");
						if (t.weightSpecs = n, null == (a = this.LS.getItem(this.keys.weightData))) throw new Error("In local storage, the binary weight values of model '" + this.modelPath + "' are missing.");
						return t.weightData = base64StringToArrayBuffer(a), [2, t]
					})
				})
			}, e.URL_SCHEME = "localstorage://", e
		}(),
		localStorageRouter = function(e) {
			return ENV.get("IS_BROWSER") && e.startsWith(BrowserLocalStorage.URL_SCHEME) ? browserLocalStorage(e.slice(BrowserLocalStorage.URL_SCHEME.length)) : null
		};
	IORouterRegistry.registerSaveRouter(localStorageRouter), IORouterRegistry.registerLoadRouter(localStorageRouter);
	var BrowserLocalStorageManager = function() {
		function e() {
			assert(ENV.get("IS_BROWSER"), "Current environment is not a web browser"), assert(void 0 !== window.localStorage, "Current browser does not appear to support localStorage"), this.LS = window.localStorage
		}
		return e.prototype.listModels = function() {
			return __awaiter$10(this, void 0, void 0, function() {
				var e, t, r, n, a, o;
				return __generator$10(this, function(i) {
					for (e = {}, t = PATH_PREFIX + PATH_SEPARATOR, r = PATH_SEPARATOR + INFO_SUFFIX, n = 0; n < this.LS.length; ++n)(a = this.LS.key(n)).startsWith(t) && a.endsWith(r) && (o = getModelPathFromKey(a), e[o] = JSON.parse(this.LS.getItem(a)));
					return [2, e]
				})
			})
		}, e.prototype.removeModel = function(e) {
			return __awaiter$10(this, void 0, void 0, function() {
				var t, r;
				return __generator$10(this, function(n) {
					if (e = maybeStripScheme$1(e), t = getModelKeys(e), null == this.LS.getItem(t.info)) throw new Error("Cannot find model at path '" + e + "'");
					return r = JSON.parse(this.LS.getItem(t.info)), this.LS.removeItem(t.info), this.LS.removeItem(t.topology), this.LS.removeItem(t.weightSpecs), this.LS.removeItem(t.weightData), [2, r]
				})
			})
		}, e
	}();
	if (ENV.get("IS_BROWSER")) try {
		ModelStoreManagerRegistry.registerManager(BrowserLocalStorage.URL_SCHEME, new BrowserLocalStorageManager)
	} catch (e) {}
	var __awaiter$11 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$11 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		DEFAULT_FILE_NAME_PREFIX = "model",
		DEFAULT_JSON_EXTENSION_NAME = ".json",
		DEFAULT_WEIGHT_DATA_EXTENSION_NAME = ".weights.bin",
		BrowserDownloads = function() {
			function e(t) {
				if (!ENV.get("IS_BROWSER")) throw new Error("triggerDownloads() cannot proceed because the current environment is not a browser.");
				t.startsWith(e.URL_SCHEME) && (t = t.slice(e.URL_SCHEME.length)), null != t && 0 !== t.length || (t = DEFAULT_FILE_NAME_PREFIX), this.modelTopologyFileName = t + DEFAULT_JSON_EXTENSION_NAME, this.weightDataFileName = t + DEFAULT_WEIGHT_DATA_EXTENSION_NAME
			}
			return e.prototype.save = function(e) {
				return __awaiter$11(this, void 0, void 0, function() {
					var t, r, n, a, o, i;
					return __generator$11(this, function(s) {
						if (t = window.URL.createObjectURL(new Blob([e.weightData], {
								type: "application/octet-stream"
							})), e.modelTopology instanceof ArrayBuffer) throw new Error("DownloadTrigger.save() does not support saving model topology in binary formats yet.");
						return r = [{
							paths: ["./" + this.weightDataFileName],
							weights: e.weightSpecs
						}], n = {
							modelTopology: e.modelTopology,
							weightsManifest: r
						}, a = window.URL.createObjectURL(new Blob([JSON.stringify(n)], {
							type: "application/json"
						})), o = null == this.jsonAnchor ? document.createElement("a") : this.jsonAnchor, o.download = this.modelTopologyFileName, o.href = a, o.click(), null != e.weightData && ((i = null == this.weightDataAnchor ? document.createElement("a") : this.weightDataAnchor).download = this.weightDataFileName, i.href = t, i.click()), [2, {
							modelArtifactsInfo: getModelArtifactsInfoForJSON(e)
						}]
					})
				})
			}, e.URL_SCHEME = "downloads://", e
		}(),
		BrowserFiles = function() {
			function e(e) {
				if (null == e || e.length < 1) throw new Error("When calling browserFiles, at least 1 file is required, but received " + e);
				this.files = e
			}
			return e.prototype.load = function() {
				return __awaiter$11(this, void 0, void 0, function() {
					var e, t, r = this;
					return __generator$11(this, function(n) {
						return e = this.files[0], t = this.files.slice(1), [2, new Promise(function(n, a) {
							var o = new FileReader;
							o.onload = function(o) {
								var i = JSON.parse(o.target.result),
									s = i.modelTopology;
								if (null != s) {
									0 === t.length && n({
										modelTopology: s
									});
									var u = i.weightsManifest;
									if (null != u) {
										var l;
										try {
											l = r.checkManifestAndWeightFiles(u, t)
										} catch (e) {
											return void a(e)
										}
										var c = [],
											p = [],
											d = [];
										u.forEach(function(e) {
											e.paths.forEach(function(e) {
												p.push(e), d.push(null)
											}), c.push.apply(c, e.weights)
										}), u.forEach(function(e) {
											e.paths.forEach(function(e) {
												var t = new FileReader;
												t.onload = function(t) {
													var r = t.target.result,
														a = p.indexOf(e);
													d[a] = r, -1 === d.indexOf(null) && n({
														modelTopology: s,
														weightSpecs: c,
														weightData: concatenateArrayBuffers(d)
													})
												}, t.onerror = function(t) {
													a("Failed to weights data from file of path '" + e + "'.")
												}, t.readAsArrayBuffer(l[e])
											})
										})
									} else a(new Error("weightManifest field is missing from file " + e.name))
								} else a(new Error("modelTopology field is missing from file " + e.name))
							}, o.onerror = function(t) {
								a("Failed to read model topology and weights manifest JSON from file '" + e.name + "'. BrowserFiles supports loading Keras-style tf.Model artifacts only.")
							}, o.readAsText(e)
						})]
					})
				})
			}, e.prototype.checkManifestAndWeightFiles = function(e, t) {
				for (var r = [], n = t.map(function(e) {
						return basename(e.name)
					}), a = {}, o = 0, i = e; o < i.length; o++) i[o].paths.forEach(function(e) {
					var o = basename(e);
					if (-1 !== r.indexOf(o)) throw new Error("Duplicate file basename found in weights manifest: '" + o + "'");
					if (r.push(o), -1 === n.indexOf(o)) throw new Error("Weight file with basename '" + o + "' is not provided.");
					a[e] = t[n.indexOf(o)]
				});
				if (r.length !== t.length) throw new Error("Mismatch in the number of files in weights manifest (" + r.length + ") and the number of weight files provided (" + t.length + ").");
				return a
			}, e
		}(),
		browserDownloadsRouter = function(e) {
			return ENV.get("IS_BROWSER") && e.startsWith(BrowserDownloads.URL_SCHEME) ? browserDownloads(e.slice(BrowserDownloads.URL_SCHEME.length)) : null
		};
	IORouterRegistry.registerSaveRouter(browserDownloadsRouter);
	var __awaiter$12 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$12 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		__awaiter$13 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$13 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		BrowserHTTPRequest = function() {
			function e(e, t) {
				if (this.DEFAULT_METHOD = "POST", !ENV.get("IS_BROWSER")) throw new Error("browserHTTPRequest is not supported outside the web browser.");
				if (assert(null != e && e.length > 0, "URL path for browserHTTPRequest must not be null, undefined or empty."), this.path = e, null != t && null != t.body) throw new Error("requestInit is expected to have no pre-existing body, but has one.");
				this.requestInit = t || {}
			}
			return e.prototype.save = function(e) {
				return __awaiter$13(this, void 0, void 0, function() {
					var t, r, n, a;
					return __generator$13(this, function(o) {
						switch (o.label) {
							case 0:
								if (e.modelTopology instanceof ArrayBuffer) throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");
								return t = Object.assign({
									method: this.DEFAULT_METHOD
								}, this.requestInit), t.body = new FormData, r = [{
									paths: ["./model.weights.bin"],
									weights: e.weightSpecs
								}], n = {
									modelTopology: e.modelTopology,
									weightsManifest: r
								}, t.body.append("model.json", new Blob([JSON.stringify(n)], {
									type: "application/json"
								}), "model.json"), null != e.weightData && t.body.append("model.weights.bin", new Blob([e.weightData], {
									type: "application/octet-stream"
								}), "model.weights.bin"), [4, fetch(this.path, t)];
							case 1:
								if (200 === (a = o.sent()).status) return [2, {
									modelArtifactsInfo: getModelArtifactsInfoForJSON(e),
									responses: [a]
								}];
								throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status " + a.status + ".")
						}
					})
				})
			}, e.prototype.load = function() {
				return __awaiter$13(this, void 0, void 0, function() {
					var e, t, r, n, a, o, i, s, u, l, c, p, d;
					return __generator$13(this, function(h) {
						switch (h.label) {
							case 0:
								return [4, fetch(this.path, this.requestInit)];
							case 1:
								return e = h.sent(), [4, e.json()];
							case 2:
								if (t = h.sent(), r = t.modelTopology, n = t.weightsManifest, null == r && null == n) throw new Error("The JSON from HTTP path " + this.path + " contains neither model topology or manifest for weights.");
								if (null == n) return [3, 4];
								for (i = t.weightsManifest, a = [], s = 0, u = i; s < u.length; s++) l = u[s], a.push.apply(a, l.weights);
								return (c = this.path.substring(0, this.path.lastIndexOf("/"))).endsWith("/") || (c += "/"), p = [], i.forEach(function(e) {
									e.paths.forEach(function(e) {
										p.push(c + e)
									})
								}), d = concatenateArrayBuffers, [4, loadWeightsAsArrayBuffer(p, this.requestInit)];
							case 3:
								o = d.apply(void 0, [h.sent()]), h.label = 4;
							case 4:
								return [2, {
									modelTopology: r,
									weightSpecs: a,
									weightData: o
								}]
						}
					})
				})
			}, e.URL_SCHEMES = ["http://", "https://"], e
		}(),
		httpRequestRouter = function(e) {
			if (ENV.get("IS_BROWSER")) {
				for (var t = 0, r = BrowserHTTPRequest.URL_SCHEMES; t < r.length; t++) {
					var n = r[t];
					if (e.startsWith(n)) return browserHTTPRequest(e)
				}
				return null
			}
			return null
		};
	IORouterRegistry.registerSaveRouter(httpRequestRouter), IORouterRegistry.registerLoadRouter(httpRequestRouter);
	var registerSaveRouter = IORouterRegistry.registerSaveRouter,
		registerLoadRouter = IORouterRegistry.registerLoadRouter,
		getSaveHandlers = IORouterRegistry.getSaveHandlers,
		getLoadHandlers = IORouterRegistry.getLoadHandlers,
		copyModel = ModelManagement.copyModel,
		listModels = ModelManagement.listModels,
		moveModel = ModelManagement.moveModel,
		removeModel = ModelManagement.removeModel,
		io = Object.freeze({
			browserFiles: browserFiles,
			browserHTTPRequest: browserHTTPRequest,
			copyModel: copyModel,
			decodeWeights: decodeWeights,
			encodeWeights: encodeWeights,
			getLoadHandlers: getLoadHandlers,
			getModelArtifactsInfoForJSON: getModelArtifactsInfoForJSON,
			getSaveHandlers: getSaveHandlers,
			listModels: listModels,
			loadWeights: loadWeights,
			moveModel: moveModel,
			registerLoadRouter: registerLoadRouter,
			registerSaveRouter: registerSaveRouter,
			removeModel: removeModel
		}),
		Serializable = function() {
			function e() {}
			return e.prototype.getClassName = function() {
				return this.constructor.className
			}, e.fromConfig = function(e, t) {
				return new e(t)
			}, e
		}(),
		SerializationMap = function() {
			function e() {
				this.classNameMap = {}
			}
			return e.getMap = function() {
				return null == e.instance && (e.instance = new e), e.instance
			}, e.register = function(e) {
				this.getMap().classNameMap[e.className] = [e, e.fromConfig]
			}, e
		}(),
		serialization = Object.freeze({
			Serializable: Serializable,
			SerializationMap: SerializationMap
		}),
		WEBGL_ENVS = {
			BACKEND: "test-webgl"
		},
		CPU_ENVS = {
			BACKEND: "test-cpu"
		},
		ALL_ENVS = {},
		TEST_EPSILON = .001,
		test_util = Object.freeze({
			WEBGL_ENVS: WEBGL_ENVS,
			CPU_ENVS: CPU_ENVS,
			ALL_ENVS: ALL_ENVS,
			TEST_EPSILON: TEST_EPSILON,
			expectArraysClose: expectArraysClose,
			expectPromiseToFail: expectPromiseToFail,
			expectArraysEqual: expectArraysEqual,
			expectNumbersClose: expectNumbersClose,
			expectValuesInRange: expectValuesInRange
		}),
		version = "0.11.6",
		webgl = Object.freeze({
			gpgpu_util: gpgpu_util,
			webgl_util: webgl_util,
			MathBackendWebGL: MathBackendWebGL,
			GPGPUContext: GPGPUContext
		}),
		__extends$1 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$29 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		Optimizer = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$1(t, e), t.prototype.minimize = function(e, t, r) {
				void 0 === t && (t = !1);
				var n = this.computeGradients(e, r),
					a = n.value,
					o = n.grads;
				return this.applyGradients(o), Object.keys(o).forEach(function(e) {
					return o[e].dispose()
				}), t ? a : (a.dispose(), null)
			}, t.prototype.computeGradients = function(e, t) {
				return variableGrads(e, t)
			}, __decorate$29([doc()], t.prototype, "minimize", null), t = __decorate$29([doc()], t)
		}(Serializable),
		__extends$2 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		AdadeltaOptimizer = function(e) {
			function t(t, r, n) {
				void 0 === n && (n = 1e-8);
				var a = e.call(this) || this;
				return a.learningRate = t, a.rho = r, a.epsilon = n, a.accumulatedGrads = {}, a.accumulatedUpdates = {}, a.c = keep(scalar(-t)), a.epsilonScalar = keep(scalar(n)), a.rhoScalar = keep(scalar(r)), a.oneMinusRho = keep(scalar(1 - r)), a
			}
			return __extends$2(t, e), t.prototype.applyGradients = function(e) {
				var t = this,
					r = this;
				for (var n in e) ! function(n) {
					var a = ENV.engine.registeredVariables[n];
					null == r.accumulatedGrads[n] && tidy(function() {
						t.accumulatedGrads[n] = zerosLike(a).variable(!1)
					});
					null == r.accumulatedUpdates[n] && tidy(function() {
						t.accumulatedUpdates[n] = zerosLike(a).variable(!1)
					});
					var o = e[n],
						i = r.accumulatedGrads[n],
						s = r.accumulatedUpdates[n];
					tidy(function() {
						var e = t.rhoScalar.mul(i).add(t.oneMinusRho.mul(o.square())),
							r = s.add(t.epsilonScalar).sqrt().div(i.add(t.epsilonScalar).sqrt()).mul(o),
							u = t.rhoScalar.mul(s).add(t.oneMinusRho.mul(r.square()));
						t.accumulatedGrads[n].assign(e), t.accumulatedUpdates[n].assign(u);
						var l = t.c.mul(r).add(a);
						a.assign(l)
					})
				}(n)
			}, t.prototype.dispose = function() {
				var e = this;
				this.c.dispose(), this.epsilonScalar.dispose(), this.rhoScalar.dispose(), this.oneMinusRho.dispose(), null != this.accumulatedUpdates && (Object.keys(this.accumulatedUpdates).forEach(function(t) {
					return e.accumulatedUpdates[t].dispose()
				}), Object.keys(this.accumulatedGrads).forEach(function(t) {
					return e.accumulatedGrads[t].dispose()
				}))
			}, t.prototype.getConfig = function() {
				return {
					learningRate: this.learningRate,
					rho: this.rho,
					epsilon: this.epsilon
				}
			}, t.fromConfig = function(e, t) {
				return new e(t.learningRate, t.rho, t.epsilon)
			}, t.className = "AdadeltaOptimizer", t
		}(Optimizer);
	SerializationMap.register(AdadeltaOptimizer);
	var __extends$3 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		AdagradOptimizer = function(e) {
			function t(t, r) {
				void 0 === r && (r = .1);
				var n = e.call(this) || this;
				return n.learningRate = t, n.initialAccumulatorValue = r, n.accumulatedGrads = {}, n.c = keep(scalar(-t)), n.epsilon = keep(scalar(1e-8)), n
			}
			return __extends$3(t, e), t.prototype.applyGradients = function(e) {
				var t = this,
					r = this;
				for (var n in e) ! function(n) {
					var a = ENV.engine.registeredVariables[n];
					null == r.accumulatedGrads[n] && tidy(function() {
						t.accumulatedGrads[n] = fill(a.shape, t.initialAccumulatorValue).variable(!1)
					});
					var o = e[n],
						i = r.accumulatedGrads[n];
					tidy(function() {
						var e = i.add(o.square());
						t.accumulatedGrads[n].assign(e);
						var r = t.c.mul(o.div(e.add(t.epsilon).sqrt())).add(a);
						a.assign(r)
					})
				}(n)
			}, t.prototype.dispose = function() {
				var e = this;
				this.epsilon.dispose(), this.c.dispose(), null != this.accumulatedGrads && Object.keys(this.accumulatedGrads).forEach(function(t) {
					return e.accumulatedGrads[t].dispose()
				})
			}, t.prototype.getConfig = function() {
				return {
					learningRate: this.learningRate,
					initialAccumulatorValue: this.initialAccumulatorValue
				}
			}, t.fromConfig = function(e, t) {
				return new e(t.learningRate, t.initialAccumulatorValue)
			}, t.className = "AdagradOptimizer", t
		}(Optimizer);
	SerializationMap.register(AdagradOptimizer);
	var __extends$4 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		AdamOptimizer = function(e) {
			function t(t, r, n, a) {
				void 0 === a && (a = 1e-8);
				var o = e.call(this) || this;
				return o.learningRate = t, o.beta1 = r, o.beta2 = n, o.epsilon = a, o.accumulatedFirstMoment = {}, o.accumulatedSecondMoment = {}, o.c = keep(scalar(-t)), o.epsScalar = keep(scalar(a)), o.beta1Scalar = keep(scalar(r)), o.beta2Scalar = keep(scalar(n)), tidy(function() {
					o.accBeta1 = scalar(r).variable(), o.accBeta2 = scalar(n).variable()
				}), o.oneMinusBeta1 = keep(scalar(1 - r)), o.oneMinusBeta2 = keep(scalar(1 - n)), o.one = keep(scalar(1)), o
			}
			return __extends$4(t, e), t.prototype.applyGradients = function(e) {
				var t = this;
				tidy(function() {
					var r = t.one.sub(t.accBeta1),
						n = t.one.sub(t.accBeta2);
					for (var a in e) {
						var o = ENV.engine.registeredVariables[a];
						if (null == t.accumulatedFirstMoment[a]) {
							i = !1;
							t.accumulatedFirstMoment[a] = zerosLike(o).variable(i)
						}
						if (null == t.accumulatedSecondMoment[a]) {
							var i = !1;
							t.accumulatedSecondMoment[a] = zerosLike(o).variable(i)
						}
						var s = e[a],
							u = t.accumulatedFirstMoment[a],
							l = t.accumulatedSecondMoment[a],
							c = t.beta1Scalar.mul(u).add(t.oneMinusBeta1.mul(s)),
							p = t.beta2Scalar.mul(l).add(t.oneMinusBeta2.mul(s.square())),
							d = c.div(r),
							h = p.div(n);
						t.accumulatedFirstMoment[a].assign(c), t.accumulatedSecondMoment[a].assign(p);
						var f = t.c.mul(d.div(t.epsScalar.add(h.sqrt()))).add(o);
						o.assign(f)
					}
					t.accBeta1.assign(t.accBeta1.mul(t.beta1Scalar)), t.accBeta2.assign(t.accBeta2.mul(t.beta2Scalar))
				})
			}, t.prototype.dispose = function() {
				var e = this;
				this.c.dispose(), this.epsScalar.dispose(), this.beta1Scalar.dispose(), this.beta2Scalar.dispose(), this.accBeta1.dispose(), this.accBeta2.dispose(), this.oneMinusBeta1.dispose(), this.oneMinusBeta2.dispose(), this.one.dispose(), null != this.accumulatedFirstMoment && Object.keys(this.accumulatedFirstMoment).forEach(function(t) {
					return e.accumulatedFirstMoment[t].dispose()
				}), null != this.accumulatedSecondMoment && Object.keys(this.accumulatedSecondMoment).forEach(function(t) {
					return e.accumulatedSecondMoment[t].dispose()
				})
			}, t.prototype.getConfig = function() {
				return {
					learningRate: this.learningRate,
					beta1: this.beta1,
					beta2: this.beta2,
					epsilon: this.epsilon
				}
			}, t.fromConfig = function(e, t) {
				return new e(t.learningRate, t.beta1, t.beta2, t.epsilon)
			}, t.className = "AdamOptimizer", t
		}(Optimizer);
	SerializationMap.register(AdamOptimizer);
	var __extends$5 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		AdamaxOptimizer = function(e) {
			function t(t, r, n, a, o) {
				void 0 === a && (a = 1e-8), void 0 === o && (o = 0);
				var i = e.call(this) || this;
				return i.learningRate = t, i.beta1 = r, i.beta2 = n, i.epsilon = a, i.decay = o, i.accumulatedFirstMoment = {}, i.accumulatedWeightedInfNorm = {}, i.c = keep(scalar(-t)), i.epsScalar = keep(scalar(a)), i.beta1Scalar = keep(scalar(r)), i.beta2Scalar = keep(scalar(n)), i.decayScalar = keep(scalar(o)), tidy(function() {
					i.iteration = scalar(0).variable(), i.accBeta1 = scalar(r).variable()
				}), i.oneMinusBeta1 = keep(scalar(1 - r)), i.one = keep(scalar(1)), i
			}
			return __extends$5(t, e), t.prototype.applyGradients = function(e) {
				var t = this;
				tidy(function() {
					var r = t.one.sub(t.accBeta1),
						n = t.c.div(t.one.add(t.decayScalar.mul(t.iteration)));
					for (var a in e) {
						var o = ENV.engine.registeredVariables[a];
						if (null == t.accumulatedFirstMoment[a]) {
							i = !1;
							t.accumulatedFirstMoment[a] = zerosLike(o).variable(i)
						}
						if (null == t.accumulatedWeightedInfNorm[a]) {
							var i = !1;
							t.accumulatedWeightedInfNorm[a] = zerosLike(o).variable(i)
						}
						var s = e[a],
							u = t.accumulatedFirstMoment[a],
							l = t.accumulatedWeightedInfNorm[a],
							c = t.beta1Scalar.mul(u).add(t.oneMinusBeta1.mul(s)),
							p = t.beta2Scalar.mul(l),
							d = s.abs(),
							h = p.maximum(d);
						t.accumulatedFirstMoment[a].assign(c), t.accumulatedWeightedInfNorm[a].assign(h);
						var f = n.div(r).mul(c.div(t.epsScalar.add(h))).add(o);
						o.assign(f)
					}
					t.iteration.assign(t.iteration.add(t.one)), t.accBeta1.assign(t.accBeta1.mul(t.beta1Scalar))
				})
			}, t.prototype.dispose = function() {
				var e = this;
				this.c.dispose(), this.epsScalar.dispose(), this.accBeta1.dispose(), this.beta1Scalar.dispose(), this.beta2Scalar.dispose(), this.oneMinusBeta1.dispose(), this.decayScalar.dispose(), this.iteration.dispose(), this.one.dispose(), null != this.accumulatedFirstMoment && Object.keys(this.accumulatedFirstMoment).forEach(function(t) {
					return e.accumulatedFirstMoment[t].dispose()
				}), null != this.accumulatedWeightedInfNorm && Object.keys(this.accumulatedWeightedInfNorm).forEach(function(t) {
					return e.accumulatedWeightedInfNorm[t].dispose()
				})
			}, t.prototype.getConfig = function() {
				return {
					learningRate: this.learningRate,
					beta1: this.beta1,
					beta2: this.beta2,
					epsilon: this.epsilon,
					decay: this.decay
				}
			}, t.fromConfig = function(e, t) {
				return new e(t.learningRate, t.beta1, t.beta2, t.epsilon, t.decay)
			}, t.className = "AdamaxOptimizer", t
		}(Optimizer);
	SerializationMap.register(AdamaxOptimizer);
	var __extends$6 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		SGDOptimizer = function(e) {
			function t(t) {
				var r = e.call(this) || this;
				return r.learningRate = t, r.setLearningRate(t), r
			}
			return __extends$6(t, e), t.prototype.applyGradients = function(e) {
				var t = this;
				Object.keys(e).forEach(function(r) {
					var n = e[r],
						a = ENV.engine.registeredVariables[r];
					tidy(function() {
						var e = t.c.mul(n).add(a);
						a.assign(e)
					})
				})
			}, t.prototype.setLearningRate = function(e) {
				this.learningRate = e, null != this.c && this.c.dispose(), this.c = keep(scalar(-e))
			}, t.prototype.dispose = function() {
				this.c.dispose()
			}, t.prototype.getConfig = function() {
				return {
					learningRate: this.learningRate
				}
			}, t.fromConfig = function(e, t) {
				return new e(t.learningRate)
			}, t.className = "SGDOptimizer", t
		}(Optimizer);
	SerializationMap.register(SGDOptimizer);
	var __extends$7 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		MomentumOptimizer = function(e) {
			function t(t, r, n) {
				void 0 === n && (n = !1);
				var a = e.call(this, t) || this;
				return a.learningRate = t, a.momentum = r, a.useNesterov = n, a.m = scalar(a.momentum), a.accumulations = {}, a
			}
			return __extends$7(t, e), t.prototype.applyGradients = function(e) {
				var t = this,
					r = this;
				for (var n in e) ! function(n) {
					var a = ENV.engine.registeredVariables[n];
					null == r.accumulations[n] && tidy(function() {
						t.accumulations[n] = zerosLike(a).variable(!1)
					});
					var o = r.accumulations[n],
						i = e[n];
					tidy(function() {
						var e, r = t.m.mul(o).add(i);
						e = t.useNesterov ? t.c.mul(i.add(r.mul(t.m))).add(a) : t.c.mul(r).add(a), t.accumulations[n].assign(r), a.assign(e)
					})
				}(n)
			}, t.prototype.dispose = function() {
				if (e.prototype.dispose.call(this), this.m.dispose(), null != this.accumulations)
					for (var t in this.accumulations) this.accumulations[t].dispose()
			}, t.prototype.setMomentum = function(e) {
				this.momentum = e
			}, t.prototype.getConfig = function() {
				return {
					learningRate: this.learningRate,
					momentum: this.momentum,
					useNesterov: this.useNesterov
				}
			}, t.fromConfig = function(e, t) {
				return new e(t.learningRate, t.momentum, t.useNesterov)
			}, t.className = "MomentumOptimizer", t
		}(SGDOptimizer);
	SerializationMap.register(MomentumOptimizer);
	var __extends$8 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		RMSPropOptimizer = function(e) {
			function t(t, r, n, a, o) {
				void 0 === r && (r = .9), void 0 === n && (n = 0), void 0 === a && (a = 1e-8), void 0 === o && (o = !1);
				var i = e.call(this) || this;
				return i.learningRate = t, i.decay = r, i.momentum = n, i.epsilon = a, i.accumulatedMeanSquares = {}, i.accumulatedMeanGrads = {}, i.accumulatedMoments = {}, i.c = keep(scalar(t)), i.epsilonScalar = keep(scalar(a)), i.decayScalar = keep(scalar(r)), i.momentumScalar = keep(scalar(n)), i.oneMinusDecay = keep(scalar(1 - r)), i.centered = o, i
			}
			return __extends$8(t, e), t.prototype.applyGradients = function(e) {
				var t = this,
					r = this;
				for (var n in e) ! function(n) {
					var a = ENV.engine.registeredVariables[n];
					null == r.accumulatedMeanSquares[n] && tidy(function() {
						t.accumulatedMeanSquares[n] = zerosLike(a).variable(!1)
					});
					null == r.accumulatedMeanGrads[n] && r.centered && tidy(function() {
						t.accumulatedMeanGrads[n] = zerosLike(a).variable(!1)
					});
					null == r.accumulatedMoments[n] && tidy(function() {
						t.accumulatedMoments[n] = zerosLike(a).variable(!1)
					});
					var o = r.accumulatedMeanSquares[n],
						i = r.accumulatedMeanGrads[n],
						s = r.accumulatedMoments[n],
						u = e[n];
					tidy(function() {
						var e = t.decayScalar.mul(o).add(t.oneMinusDecay.mul(u.square()));
						if (t.centered) {
							var r = t.decayScalar.mul(i).add(t.oneMinusDecay.mul(u)),
								l = t.momentumScalar.mul(s).add(t.c.mul(u).div(e.sub(r.square().add(t.epsilonScalar)).sqrt()));
							t.accumulatedMeanSquares[n].assign(e), t.accumulatedMeanGrads[n].assign(r), t.accumulatedMoments[n].assign(l), p = a.sub(l), a.assign(p)
						} else {
							var c = t.decayScalar.mul(o).add(t.oneMinusDecay.mul(u.square())),
								l = t.momentumScalar.mul(s).add(t.c.mul(u).div(c.add(t.epsilonScalar).sqrt()));
							t.accumulatedMeanSquares[n].assign(c), t.accumulatedMoments[n].assign(l);
							var p = a.sub(l);
							a.assign(p)
						}
					})
				}(n)
			}, t.prototype.dispose = function() {
				var e = this;
				this.c.dispose(), this.epsilonScalar.dispose(), this.decayScalar.dispose(), this.momentumScalar.dispose(), this.oneMinusDecay.dispose(), null != this.accumulatedMeanSquares && Object.keys(this.accumulatedMeanSquares).forEach(function(t) {
					return e.accumulatedMeanSquares[t].dispose()
				}), null != this.accumulatedMeanGrads && this.centered && Object.keys(this.accumulatedMeanGrads).forEach(function(t) {
					return e.accumulatedMeanGrads[t].dispose()
				}), null != this.accumulatedMoments && Object.keys(this.accumulatedMoments).forEach(function(t) {
					return e.accumulatedMoments[t].dispose()
				})
			}, t.prototype.getConfig = function() {
				return {
					learningRate: this.learningRate,
					decay: this.decay,
					momentum: this.momentum,
					epsilon: this.epsilon,
					centered: this.centered
				}
			}, t.fromConfig = function(e, t) {
				return new e(t.learningRate, t.decay, t.momentum, t.epsilon, t.centered)
			}, t.className = "RMSPropOptimizer", t
		}(Optimizer);
	SerializationMap.register(RMSPropOptimizer);
	var __decorate$30 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		OptimizerConstructors = function() {
			function e() {}
			return e.sgd = function(e) {
				return new SGDOptimizer(e)
			}, e.momentum = function(e, t, r) {
				return void 0 === r && (r = !1), new MomentumOptimizer(e, t, r)
			}, e.rmsprop = function(e, t, r, n, a) {
				return void 0 === t && (t = .9), void 0 === r && (r = 0), void 0 === n && (n = 1e-8), void 0 === a && (a = !1), new RMSPropOptimizer(e, t, r, n, a)
			}, e.adam = function(e, t, r, n) {
				return void 0 === e && (e = .001), void 0 === t && (t = .9), void 0 === r && (r = .999), void 0 === n && (n = 1e-8), new AdamOptimizer(e, t, r, n)
			}, e.adadelta = function(e, t, r) {
				return void 0 === e && (e = .001), void 0 === t && (t = .95), void 0 === r && (r = 1e-8), new AdadeltaOptimizer(e, t, r)
			}, e.adamax = function(e, t, r, n, a) {
				return void 0 === e && (e = .002), void 0 === t && (t = .9), void 0 === r && (r = .999), void 0 === n && (n = 1e-8), void 0 === a && (a = 0), new AdamaxOptimizer(e, t, r, n, a)
			}, e.adagrad = function(e, t) {
				return void 0 === t && (t = .1), new AdagradOptimizer(e, t)
			}, __decorate$30([doc()], e, "sgd", null), __decorate$30([doc()], e, "momentum", null), __decorate$30([doc()], e, "rmsprop", null), __decorate$30([doc()], e, "adam", null), __decorate$30([doc()], e, "adadelta", null), __decorate$30([doc()], e, "adamax", null), __decorate$30([doc()], e, "adagrad", null), e
		}(),
		train = {
			sgd: OptimizerConstructors.sgd,
			momentum: OptimizerConstructors.momentum,
			adadelta: OptimizerConstructors.adadelta,
			adagrad: OptimizerConstructors.adagrad,
			rmsprop: OptimizerConstructors.rmsprop,
			adamax: OptimizerConstructors.adamax,
			adam: OptimizerConstructors.adam
		},
		setBackend = Environment.setBackend,
		getBackend = Environment.getBackend,
		disposeVariables = Environment.disposeVariables,
		memory = Environment.memory,
		nextFrame = BrowserUtil.nextFrame,
		__extends$9 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		AttributeError = function(e) {
			function t(r) {
				var n = e.call(this, r) || this;
				return Object.setPrototypeOf(n, t.prototype), n
			}
			return __extends$9(t, e), t
		}(Error),
		RuntimeError = function(e) {
			function t(r) {
				var n = e.call(this, r) || this;
				return Object.setPrototypeOf(n, t.prototype), n
			}
			return __extends$9(t, e), t
		}(Error),
		ValueError = function(e) {
			function t(r) {
				var n = e.call(this, r) || this;
				return Object.setPrototypeOf(n, t.prototype), n
			}
			return __extends$9(t, e), t
		}(Error),
		NotImplementedError = function(e) {
			function t(r) {
				var n = e.call(this, r) || this;
				return Object.setPrototypeOf(n, t.prototype), n
			}
			return __extends$9(t, e), t
		}(Error),
		AssertionError = function(e) {
			function t(r) {
				var n = e.call(this, r) || this;
				return Object.setPrototypeOf(n, t.prototype), n
			}
			return __extends$9(t, e), t
		}(Error),
		IndexError = function(e) {
			function t(r) {
				var n = e.call(this, r) || this;
				return Object.setPrototypeOf(n, t.prototype), n
			}
			return __extends$9(t, e), t
		}(Error),
		__assign = Object.assign || function(e) {
			for (var t, r = 1, n = arguments.length; r < n; r++) {
				t = arguments[r];
				for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
			}
			return e
		},
		_GLOBAL_CUSTOM_OBJECTS = {},
		nameMap = new Map,
		VALID_DATA_FORMAT_VALUES = ["channelsFirst", "channelsLast"],
		VALID_PADDING_MODE_VALUES = ["valid", "same", "causal"],
		VALID_POOL_MODE_VALUES = ["max", "avg"],
		_nameScopeStack = [],
		_nameScopeDivider = "/",
		tensorNameRegex = new RegExp(/^[A-Za-z][A-Za-z0-9\._\/]*$/),
		__decorate$31 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		_nextUniqueTensorId = 0,
		SymbolicTensor = function() {
			function e(e, t, r, n, a, o, i) {
				this.dtype = e, this.shape = t, this.sourceLayer = r, this.inputs = n, this.callArgs = a, this.outputTensorIndex = i, this.id = getNextUniqueTensorId(), null != o && (this.originalName = getScopedTensorName(o), this.name = getUniqueTensorName(this.originalName)), this.rank = t.length
			}
			return e = __decorate$31([doc()], e)
		}(),
		DEFAULT_VARIABLE_NAME_PREFIX = "Variable",
		LayerVariable = function() {
			function e(e, t, r, n, a) {
				void 0 === t && (t = "float32"), void 0 === r && (r = DEFAULT_VARIABLE_NAME_PREFIX), void 0 === n && (n = !0), void 0 === a && (a = null), this.dtype = null == t ? "float32" : t, this.shape = e.shape, this.id = getNextUniqueTensorId(), r = null == r ? DEFAULT_VARIABLE_NAME_PREFIX : r, this.originalName = getScopedTensorName(r), this.name = getUniqueTensorName(this.originalName), this.trainable = n, this.constraint = a, this.val = variable(e, this.trainable, this.name, this.dtype)
			}
			return e.prototype.read = function() {
				return this.val
			}, e.prototype.write = function(e) {
				return checkShapesMatch(this.val, e), this.val.assign(e), null != this.constraint && this.val.assign(this.constraint.apply(this.val)), this
			}, e
		}(),
		_epsilon = 1e-7,
		DEFAULT_DTYPE = "float32",
		scalarCache = {
			float32: {},
			int32: {}
		},
		epsilon$1 = epsilon,
		_uidPrefixes = {},
		__extends$10 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$32 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		Constraint = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$10(t, e), t.prototype.getConfig = function() {
				return {}
			}, t = __decorate$32([doc()], t)
		}(Serializable),
		MaxNorm = function(e) {
			function t(t) {
				var r = e.call(this) || this;
				return r.defaultMaxValue = 2, r.defaultAxis = 0, r.maxValue = null != t.maxValue ? t.maxValue : r.defaultMaxValue, r.axis = null != t.axis ? t.axis : r.defaultAxis, r
			}
			return __extends$10(t, e), t.prototype.apply = function(e) {
				var t = this;
				return tidy(function() {
					var r = calcL2Norms(e, t.axis),
						n = clipByValue(r, 0, t.maxValue);
					return mul(e, div(n, scalarPlusArray(getScalar(epsilon$1()), r)))
				})
			}, t.prototype.getConfig = function() {
				return {
					maxValue: this.maxValue,
					axis: this.axis
				}
			}, t.className = "MaxNorm", t
		}(Constraint);
	SerializationMap.register(MaxNorm);
	var UnitNorm = function(e) {
		function t(t) {
			var r = e.call(this) || this;
			return r.defaultAxis = 0, r.axis = null != t.axis ? t.axis : r.defaultAxis, r
		}
		return __extends$10(t, e), t.prototype.apply = function(e) {
			var t = this;
			return tidy(function() {
				return div(e, scalarPlusArray(getScalar(epsilon$1()), calcL2Norms(e, t.axis)))
			})
		}, t.prototype.getConfig = function() {
			return {
				axis: this.axis
			}
		}, t.className = "UnitNorm", t
	}(Constraint);
	SerializationMap.register(UnitNorm);
	var NonNeg = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$10(t, e), t.prototype.apply = function(e) {
			return relu(e)
		}, t.className = "NonNeg", t
	}(Constraint);
	SerializationMap.register(NonNeg);
	var MinMaxNorm = function(e) {
		function t(t) {
			var r = e.call(this) || this;
			return r.defaultMinValue = 0, r.defaultMaxValue = 1, r.defaultRate = 1, r.defaultAxis = 0, r.minValue = null != t.minValue ? t.minValue : r.defaultMinValue, r.maxValue = null != t.maxValue ? t.maxValue : r.defaultMaxValue, r.rate = null != t.rate ? t.rate : r.defaultRate, r.axis = null != t.axis ? t.axis : r.defaultAxis, r
		}
		return __extends$10(t, e), t.prototype.apply = function(e) {
			var t = this;
			return tidy(function() {
				var r = calcL2Norms(e, t.axis),
					n = add(scalarTimesArray(getScalar(t.rate), clipByValue(r, t.minValue, t.maxValue)), scalarTimesArray(getScalar(1 - t.rate), r));
				return mul(e, div(n, scalarPlusArray(getScalar(epsilon$1()), r)))
			})
		}, t.prototype.getConfig = function() {
			return {
				minValue: this.minValue,
				maxValue: this.maxValue,
				rate: this.rate,
				axis: this.axis
			}
		}, t.className = "MinMaxNorm", t
	}(Constraint);
	SerializationMap.register(MinMaxNorm);
	var CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP = {
			maxNorm: "MaxNorm",
			minMaxNorm: "MinMaxNorm",
			nonNeg: "NonNeg",
			unitNorm: "UnitNorm"
		},
		version$1 = "0.6.6",
		__extends$11 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$33 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		InputSpec = function() {
			return function(e) {
				this.dtype = e.dtype, this.shape = e.shape, null != e.shape ? this.ndim = e.shape.length : this.ndim = e.ndim, this.maxNDim = e.maxNDim, this.minNDim = e.minNDim, this.axes = e.axes || {}
			}
		}(),
		_nextNodeID = 0,
		Node = function() {
			function e(e, t) {
				this.callArgs = t, this.id = _nextNodeID++, this.outboundLayer = e.outboundLayer, this.inboundLayers = e.inboundLayers, this.nodeIndices = e.nodeIndices, this.tensorIndices = e.tensorIndices, this.inputTensors = e.inputTensors, this.outputTensors = e.outputTensors, this.inputMasks = e.inputMasks, this.outputMasks = e.outputMasks, this.inputShapes = e.inputShapes, this.outputShapes = e.outputShapes;
				for (var r = 0, n = e.inboundLayers; r < n.length; r++) {
					var a = n[r];
					null != a && a.outboundNodes.push(this)
				}
				e.outboundLayer.inboundNodes.push(this)
			}
			return e.prototype.getConfig = function() {
				for (var e = [], t = 0, r = this.inboundLayers; t < r.length; t++) {
					var n = r[t];
					null != n ? e.push(n.name) : e.push(null)
				}
				return {
					outboundLayer: this.outboundLayer ? this.outboundLayer.name : null,
					inboundLayers: e,
					nodeIndices: this.nodeIndices,
					tensorIndices: this.tensorIndices
				}
			}, e
		}(),
		_nextLayerID = 0,
		Layer = function(e) {
			function t(t) {
				var r = e.call(this) || this;
				r._callHook = null, r._addedWeightNames = [], r._stateful = !1, r.id = _nextLayerID++, r.activityRegularizer = null, r.inputSpec = null, r.supportsMasking = !1, r._trainableWeights = [], r._nonTrainableWeights = [], r._losses = [], r._updates = [], r._built = !1, r.inboundNodes = [], r.outboundNodes = [];
				var n = t.name;
				if (!n) {
					var a = r.getClassName();
					n = toSnakeCase(a) + "_" + getUid(a)
				}
				if (r.name = n, r.trainable = null == t.trainable || t.trainable, r.updatable = null == t.updatable || t.updatable, null != t.inputShape || null != t.batchInputShape) {
					var o = void 0;
					if (null != t.batchInputShape) o = t.batchInputShape;
					else if (null != t.inputShape) {
						var i = null;
						null != t.batchSize && (i = t.batchSize), o = [i].concat(t.inputShape)
					}
					r.batchInputShape = o;
					var s = t.dtype;
					null == s && (s = t.inputDType), null == s && (s = floatx()), r.dtype = s
				}
				return null != t.weights ? r.initialWeights = t.weights : r.initialWeights = null, r
			}
			return __extends$11(t, e), t.nodeKey = function(e, t) {
				return e.name + "_ib-" + t.toString()
			}, t.prototype.getNodeAtIndex = function(e, t) {
				if (0 === this.inboundNodes.length) throw new RuntimeError("The layer has never been called and thus has no defined " + t + ".");
				if (this.inboundNodes.length <= e) throw new ValueError("Asked to get " + t + " at node " + e + ", but the layer has only " + this.inboundNodes.length + " inbound nodes.");
				return this.inboundNodes[e]
			}, t.prototype.getInputAt = function(e) {
				return singletonOrArray(this.getNodeAtIndex(e, "input").inputTensors)
			}, t.prototype.getOutputAt = function(e) {
				return singletonOrArray(this.getNodeAtIndex(e, "output").outputTensors)
			}, Object.defineProperty(t.prototype, "input", {
				get: function() {
					if (this.inboundNodes.length > 1) throw new AttributeError("Layer " + this.name + ' has multiple inbound nodes, hence the notion of "layer input" is ill-defined. Use `getInputAt(nodeIndex)` instead.');
					if (0 === this.inboundNodes.length) throw new AttributeError("Layer " + this.name + " is not connected, no input to return.");
					return singletonOrArray(this.getNodeAtIndex(0, "input").inputTensors)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "output", {
				get: function() {
					if (0 === this.inboundNodes.length) throw new AttributeError("Layer " + this.name + " has no inbound nodes.");
					if (this.inboundNodes.length > 1) throw new AttributeError("Layer " + this.name + ' has multiple inbound nodes, hence the notion of "layer output" is ill-defined. Use `getOutputAt(nodeIndex)` instead.');
					return singletonOrArray(this.getNodeAtIndex(0, "output").outputTensors)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "losses", {
				get: function() {
					return this._losses
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.calculateLosses = function() {
				return this.losses.map(function(e) {
					return e()
				})
			}, Object.defineProperty(t.prototype, "updates", {
				get: function() {
					return this._updates
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "built", {
				get: function() {
					return this._built
				},
				set: function(e) {
					this._built = e
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "trainableWeights", {
				get: function() {
					return this.trainable ? this._trainableWeights : []
				},
				set: function(e) {
					this._trainableWeights = e
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "nonTrainableWeights", {
				get: function() {
					return this.trainable ? this._nonTrainableWeights : this._trainableWeights.concat(this._nonTrainableWeights)
				},
				set: function(e) {
					this._nonTrainableWeights = e
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "weights", {
				get: function() {
					return this.trainableWeights.concat(this.nonTrainableWeights)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "stateful", {
				get: function() {
					return this._stateful
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.assertInputCompatibility = function(e) {
				if (e = toList(e), null != this.inputSpec && 0 !== this.inputSpec.length) {
					var t = toList(this.inputSpec);
					if (e.length !== t.length) throw new ValueError("Layer " + this.name + " expects " + t.length + " inputs, but it received " + e.length + " input tensors. Input received: " + e);
					for (var r = 0; r < e.length; r++) {
						var n = e[r],
							a = t[r];
						if (null != a) {
							var o = n.rank;
							if (null != a.ndim && o !== a.ndim) throw new ValueError("Input " + r + " is incompatible with layer " + this.name + ": expected ndim=" + a.ndim + ", found ndim=" + o);
							if (null != a.maxNDim && o > a.maxNDim) throw new ValueError("Input " + r + " is incompatible with layer " + this.name + ": expected max_ndim=" + a.maxNDim + ", found ndim=" + o);
							if (null != a.minNDim && o < a.minNDim) throw new ValueError("Input " + r + " is incompatible with layer " + this.name + ": expected min_ndim=" + a.minNDim + ", found ndim=" + o + ".");
							if (null != a.dtype && dtype(n) !== a.dtype) {
								var i = dtype(n);
								throw new ValueError("Input " + r + " is incompatible with layer " + this.name + " : expected dtype=" + a.dtype + ", found dtype=" + i + ".")
							}
							if (a.axes) {
								p = intShape(n);
								for (var s in a.axes) {
									var u = Number(s),
										l = a.axes[s],
										c = u >= 0 ? p[u] : p[p.length + u];
									if (null != l && -1 === [l, null].indexOf(c)) throw new ValueError("Input " + r + " is incompatible with layer " + this.name + ": expected axis " + u + " of input shape to have value " + l + " but got shape " + p + ".")
								}
							}
							if (null != a.shape)
								for (var p = intShape(n), d = 0; d < a.shape.length; ++d) {
									var h = a.shape[d],
										f = p[d];
									if (null != h && null != f && h !== f) throw new ValueError("Input " + r + " is incompatible with layer " + this.name + ": expected shape=" + a.shape + ", found shape=${xShape}.")
								}
						}
					}
				}
			}, t.prototype.call = function(e, t) {
				return e
			}, t.prototype.invokeCallHook = function(e, t) {
				null != this._callHook && this._callHook(e, t)
			}, t.prototype.setCallHook = function(e) {
				this._callHook = e
			}, t.prototype.clearCallHook = function() {
				this._callHook = null
			}, t.prototype.apply = function(e, t) {
				var r = this;
				t = t || {};
				for (var n = toList(e), a = !0, o = 0, i = n; o < i.length; o++)
					if (!((c = i[o]) instanceof SymbolicTensor)) {
						a = !1;
						break
					} for (var s = !0, u = 0, l = n; u < l.length; u++) {
					var c = l[u];
					if (c instanceof SymbolicTensor) {
						s = !1;
						break
					}
				}
				if (a === s) throw new ValueError("Arguments to apply() must be all SymbolicTensors or all Tensors");
				return nameScope$1(this.name, function() {
					if (!r.built) {
						r.assertInputCompatibility(e);
						for (var a = [], o = 0, i = toList(e); o < i.length; o++) {
							var u = i[o];
							a.push(intShape(u))
						}
						r.build(singletonOrArray(a)), r.built = !0, r.initialWeights && r.setWeights(r.initialWeights)
					}
					if (r.assertInputCompatibility(e), s) {
						for (var l = [], c = 0, p = toList(m = r.call(e, t)); c < p.length; c++) {
							var d = p[c]; - 1 !== n.indexOf(d) && (d = identity(d)), l.push(d)
						}
						if (m = singletonOrArray(l), null != r.activityRegularizer) throw new NotImplementedError("Layer invocation in the presence of activity regularizer(s) is not supported yet.");
						return m
					}
					var h = collectInputShape(e),
						f = r.computeOutputShape(h),
						m = void 0;
					if (m = null != f && f.length > 0 && Array.isArray(f[0]) ? f.map(function(n, a) {
							return new SymbolicTensor("float32", n, r, toList(e), t, r.name, a)
						}) : new SymbolicTensor("float32", f, r, toList(e), t, r.name), r.addInboundNode(e, m, null, null, h, f, t), null != r.activityRegularizer) throw new NotImplementedError("Layer invocation in the presence of activity regularizer(s) is not supported yet.");
					return m
				})
			}, t.prototype.build = function(e) {
				this.built = !0
			}, t.prototype.getWeights = function(e) {
				return void 0 === e && (e = !1), batchGetValue(e ? this.trainableWeights : this.weights)
			}, t.prototype.setWeights = function(e) {
				var t = this;
				tidy(function() {
					var r = t.weights;
					if (r.length !== e.length) throw new ValueError('You called setWeights(weights) on layer "' + t.name + '" with a weight list of length ' + e.length + ", but the layer was expecting " + r.length + " weights. Provided weights: " + e + "...");
					if (0 !== r.length) {
						for (var n = [], a = batchGetValue(r), o = 0; o < a.length; ++o) {
							var i = a[o],
								s = r[o],
								u = e[o];
							if (!arraysEqual(i.shape, u.shape)) throw new ValueError("Layer weight shape " + i.shape + " not compatible with provided weight shape " + u.shape);
							n.push([s, u])
						}
						batchSetValue(n)
					}
				})
			}, t.prototype.addWeight = function(e, t, r, n, a, o, i) {
				if (-1 !== this._addedWeightNames.indexOf(e)) throw new ValueError("Duplicate weight name " + e + " for layer " + this.name);
				this._addedWeightNames.push(e), null == r && (r = floatx());
				var s = new LayerVariable(n.apply(t, r), r, e, o, i);
				return null != a && this.addLoss(function() {
					return a.apply(s.read())
				}), null == o && (o = !0), o ? this._trainableWeights.push(s) : this._nonTrainableWeights.push(s), s
			}, t.prototype.addLoss = function(e) {
				if (!(null == e || Array.isArray(e) && 0 === e.length)) {
					e = toList(e), void 0 !== this._losses && null !== this._losses && (t = this.losses).push.apply(t, e);
					var t
				}
			}, t.prototype.computeOutputShape = function(e) {
				return e
			}, t.prototype.computeMask = function(e, t) {
				var r = this;
				if (!this.supportsMasking) {
					if (null != t) {
						if (!Array.isArray(t)) throw new TypeError("Layer " + this.name + " does not support masking,but was passed an inputMask.");
						t.forEach(function(e) {
							if (null != e) throw new TypeError("Layer " + r.name + " does not support masking,but was passed an inputMask.")
						})
					}
					return null
				}
				return t
			}, t.prototype.addInboundNode = function(e, t, r, n, a, o, i) {
				void 0 === i && (i = null);
				var s = toList(e);
				t = toList(t), r = toList(r), n = toList(n), a = normalizeShapeList(a), o = normalizeShapeList(o);
				for (var u = [], l = [], c = [], p = 0, d = s; p < d.length; p++) {
					var h = d[p];
					u.push(h.sourceLayer), l.push(h.nodeIndex), c.push(h.tensorIndex)
				}
				new Node({
					outboundLayer: this,
					inboundLayers: u,
					nodeIndices: l,
					tensorIndices: c,
					inputTensors: s,
					outputTensors: t,
					inputMasks: r,
					outputMasks: n,
					inputShapes: a,
					outputShapes: o
				}, i);
				for (var f = 0; f < t.length; f++) t[f].sourceLayer = this, t[f].nodeIndex = this.inboundNodes.length - 1, t[f].tensorIndex = f
			}, t.prototype.getConfig = function() {
				var e = {
					name: this.name,
					trainable: this.trainable
				};
				return null != this.batchInputShape && (e.batchInputShape = this.batchInputShape), null != this.dtype && (e.dtype = this.dtype), e
			}, __decorate$33([doc()], t.prototype, "apply", null), t = __decorate$33([doc()], t)
		}(Serializable),
		InputLayer = function(e) {
			function t(t) {
				var r = e.call(this, {
					dtype: t.dtype,
					name: null != t.name ? t.name : getUid("input").toString()
				}) || this;
				if (null == t.batchSize && (t.batchSize = null), null == t.sparse && (t.sparse = !1), r.trainable = !1, r.built = !0, r.sparse = t.sparse, null != t.inputShape && null != t.batchInputShape) throw new ValueError("Only provide the inputShape OR batchInputShape argument to inputLayer, not both at the same time.");
				var n = t.batchInputShape;
				if (null == n) {
					if (null == t.inputShape) throw new ValueError("An InputLayer should be passed either a `batchInputShape` or an `inputShape`.");
					n = [t.batchSize].concat(t.inputShape)
				} else if (null != t.batchSize) throw new ValueError("Cannot specify batchSize if batchInputShape isspecified when creating an InputLayer.");
				var a = t.dtype || floatx();
				r.batchInputShape = n, r.dtype = a, r.inputSpec = [{
					shape: n
				}];
				var o = new SymbolicTensor(r.dtype, r.batchInputShape, r, [], {}, r.name);
				return o.nodeIndex = 0, o.tensorIndex = 0, new Node({
					outboundLayer: r,
					inboundLayers: [],
					nodeIndices: [],
					tensorIndices: [],
					inputTensors: [o],
					outputTensors: [o],
					inputMasks: [null],
					outputMasks: [null],
					inputShapes: [n],
					outputShapes: [n]
				}), r
			}
			return __extends$11(t, e), t.prototype.apply = function(e, t) {
				throw new ValueError("Cannot pass any input to an InputLayer's apply() method. InputLayer name: " + this.name)
			}, t.prototype.getConfig = function() {
				return {
					batchInputShape: this.batchInputShape,
					dtype: this.dtype,
					sparse: this.sparse,
					name: this.name
				}
			}, t.className = "InputLayer", t
		}(Layer);
	SerializationMap.register(InputLayer);
	var Container = function(e) {
			function t(r) {
				var n = e.call(this, {}) || this;
				if (n.containerNodes = new Set, n.name = r.name, null == n.name) {
					var a = n.getClassName().toLowerCase();
					n.name = getUid(a)
				}
				if (n.supportsMasking = !1, n.trainable = !0, n.updatable = !0, Array.isArray(r.inputs) ? n.inputs = r.inputs.slice() : n.inputs = [r.inputs], Array.isArray(r.outputs) ? n.outputs = r.outputs.slice() : n.outputs = [r.outputs], unique(n.inputs).length !== n.inputs.length) throw new ValueError("The list of inputs passed to the model is redundant. All inputs should only appear once. Found: " + n.inputs.map(function(e) {
					return e.name
				}));
				unique(n.outputs).length !== n.outputs.length && console.warn("The list of outputs passed to the model is redundant. All outputs should only appear once. Found: " + n.outputs.map(function(e) {
					return e.name
				})), n.inputLayers = [], n.inputLayersNodeIndices = [], n.inputLayersTensorIndices = [], n.outputLayers = [], n.outputLayersNodeIndices = [], n.outputLayersTensorIndices = [], n.layers = [];
				for (var o = 0, i = n.outputs; o < i.length; o++) {
					var s = (ee = i[o]).sourceLayer,
						u = ee.nodeIndex,
						l = ee.tensorIndex;
					n.outputLayers.push(s), n.outputLayersNodeIndices.push(u), n.outputLayersTensorIndices.push(l)
				}
				for (var c = 0, p = n.inputs; c < p.length; c++) {
					var s = (ee = p[c]).sourceLayer,
						u = ee.nodeIndex,
						l = ee.tensorIndex;
					assert$1(0 === u, "input layer has >1 nodes"), assert$1(0 === l, "input layer has >1 tensors"), n.inputLayers.push(s), n.inputLayersNodeIndices.push(u), n.inputLayersTensorIndices.push(l)
				}
				n.inputNames = [], n.outputNames = [], n.feedInputShapes = [], n.feedInputNames = [], n.feedOutputNames = [];
				for (O = 0; O < n.inputLayers.length; O++) {
					if (!((s = n.inputLayers[O]) instanceof InputLayer)) throw new TypeError("Input layers to a Model must be InputLayer objects. Received inputs: " + r.inputs + ". Input " + O + " (0-based) originates from layer type " + s.getClassName() + ".");
					n.inputNames.push(s.name), n.feedInputShapes.push(s.batchInputShape), n.feedInputNames.push(s.name)
				}
				for (var d = 0, h = n.outputLayers; d < h.length; d++) {
					s = h[d];
					n.outputNames.push(s.name)
				}
				n.internalInputShapes = n.inputs.map(function(e) {
					return e.shape
				}), n.internalOutputShapes = n.outputs.map(function(e) {
					return e.shape
				});
				for (var f = {}, m = {}, g = {}, y = {}, v = {}, b = [], x = function(e, r, a, o, i, s) {
						null != o && null != i && null != s || (o = e.sourceLayer, i = e.nodeIndex, s = e.tensorIndex);
						var u = o.inboundNodes[i];
						if (-1 !== a.indexOf(u)) throw new RuntimeError("The tensor " + e.name + ' at layer "' + o.name + '" is part of a cycle.');
						if (-1 === r.indexOf(u)) {
							n.containerNodes.add(t.nodeKey(o, i)), o.id in v || (v[o.id] = Object.keys(v).length), -1 === a.indexOf(u) && a.push(u);
							for (var l = u.inboundLayers.length, c = 0; c < l; c++) {
								var p = u.inputTensors[c],
									d = u.inboundLayers[c],
									h = u.nodeIndices[c],
									f = u.tensorIndices[c];
								x(p, r, a, d, h, f)
							}
							for (r.push(u); a.indexOf(u) >= 0;) a.splice(a.indexOf(u), 1);
							b.push(u)
						}
					}, w = [], _ = [], S = 0, N = n.outputs; S < N.length; S++) {
					ee = N[S];
					x(ee, w, _)
				}
				for (var A = 0, E = b.slice().reverse(); A < E.length; A++) {
					m[(X = E[A]).id] = X, X.id in f || (f[X.id] = 0);
					var T = f[X.id],
						I = null == g[X.outboundLayer.id] ? 0 : g[X.outboundLayer.id];
					T = Math.max(T, I), g[X.outboundLayer.id] = T, y[X.outboundLayer.id] = X.outboundLayer, f[X.id] = T;
					for (var O = 0; O < X.inboundLayers.length; O++) {
						var P = X.inboundLayers[O],
							u = X.nodeIndices[O],
							R = P.inboundNodes[u],
							C = null == f[R.id] ? 0 : f[R.id];
						f[R.id] = Math.max(T + 1, C), m[R.id] = R
					}
				}
				var k = {};
				for (var D in f)(T = f[D]) in k || (k[T] = []), k[T].push(m[D]);
				var M = {};
				for (var L in g)(T = g[L]) in M || (M[T] = []), M[T].push(y[L]);
				var z = Object.keys(M).map(function(e) {
					return parseInt(e, 10)
				}).sort(reverseNumberCompare);
				n.layers = [];
				for (var V = 0, F = z; V < F.length; V++) {
					var $ = M[T = F[V]];
					$.sort(function(e, t) {
						var r = v[e.id],
							n = v[t.id];
						return r < n ? -1 : r > n ? 1 : 0
					});
					for (var B = 0, U = $; B < U.length; B++) {
						s = U[B];
						n.layers.push(s)
					}
				}
				n.layersByDepth = M, z = Object.keys(k).map(function(e) {
					return parseInt(e, 10)
				}).sort(reverseNumberCompare);
				for (var j = n.inputs.slice(), G = [], W = 0, q = z; W < q.length; W++)
					for (var H = 0, K = k[T = q[W]]; H < K.length; H++) {
						var X = K[H];
						if (null != (s = X.outboundLayer)) {
							for (var J = 0, Y = X.inputTensors; J < Y.length; J++) {
								ee = Y[J];
								if (-1 === j.indexOf(ee)) throw new RuntimeError("Graph disconnected: cannot obtain value for tensor " + ee + ' at layer "' + s.name + '". The following previous layers were accessed without issue: ' + G)
							}
							for (var Z = 0, Q = X.outputTensors; Z < Q.length; Z++) {
								var ee = Q[Z];
								j.push(ee)
							}
							G.push(s.name)
						}
					}
				n.nodesByDepth = k;
				for (var te = n.layers.map(function(e) {
						return e.name
					}), re = 0, ne = te; re < ne.length; re++) ! function(e) {
					var t = te.filter(function(t) {
						return t === e
					}).length;
					if (1 !== t) throw new RuntimeError('The name "' + e + '" is used ' + t + " times in the model. All layer names should be unique. Layer names: " + JSON.stringify(te))
				}(ne[re]);
				return n.outboundNodes = [], n.inboundNodes = [], new Node({
					outboundLayer: n,
					inboundLayers: [],
					nodeIndices: [],
					tensorIndices: [],
					inputTensors: n.inputs,
					outputTensors: n.outputs,
					inputMasks: n.inputs.map(function(e) {
						return null
					}),
					outputMasks: n.outputs.map(function(e) {
						return null
					}),
					inputShapes: n.inputs.map(function(e) {
						return e.shape
					}),
					outputShapes: n.outputs.map(function(e) {
						return e.shape
					})
				}), n.built = !0, n
			}
			return __extends$11(t, e), Object.defineProperty(t.prototype, "trainableWeights", {
				get: function() {
					if (this._trainableWeights.length > 0) throw new ValueError("Container instance unexpectedly contains _trainableWeights.The trainable weights of a Container are a union of the trainable weights of its consituent Layers. Its own _trainableWeights must remain an empty Array.");
					if (!this.trainable) return [];
					for (var e = [], t = 0, r = this.layers; t < r.length; t++) {
						var n = r[t];
						e = e.concat(n.trainableWeights)
					}
					return e
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "nonTrainableWeights", {
				get: function() {
					for (var e = [], t = 0, r = this.layers; t < r.length; t++) {
						i = r[t];
						e.push.apply(e, i.nonTrainableWeights)
					}
					if (!this.trainable) {
						for (var n = [], a = 0, o = this.layers; a < o.length; a++) {
							var i = o[a];
							n.push.apply(n, i.trainableWeights)
						}
						return n.concat(e)
					}
					return e
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "weights", {
				get: function() {
					return this.trainableWeights.concat(this.nonTrainableWeights)
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.loadWeights = function(e, t, r) {
				void 0 === t && (t = !1), void 0 === r && (r = !1), r ? loadWeightsFromNamedTensorMap(e, this.layers) : loadWeightsFromJson(e, this.layers, t)
			}, t.prototype.updatedConfig = function() {
				var e = this.getConfig();
				return {
					className: this.getClassName(),
					config: e,
					kerasVersion: "tfjs-layers " + version$1,
					backend: "TensorFlow.js"
				}
			}, t.prototype.toJSON = function(e, t) {
				void 0 === t && (t = !0);
				var r = convertTsToPythonic(this.updatedConfig());
				return t ? JSON.stringify(r) : r
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					e = toList(e);
					var n;
					return n = "mask" in t ? toList(t.mask) : pyListRepeat(null, e.length), r.runInternalGraph(e, n)[0]
				})
			}, t.prototype.computeMask = function(e, t) {
				var r = this;
				return tidy(function() {
					e = toList(e);
					var n;
					return n = null == t ? pyListRepeat(null, e.length) : toList(t), r.runInternalGraph(e, n)[1]
				})
			}, t.prototype.computeOutputShape = function(e) {
				var t = normalizeShapeList(e);
				if (t.length !== this.inputLayers.length) throw new ValueError("Invalid inputShape argument " + e + ": model has " + this.inputLayers.length + " tensor inputs.");
				for (var r = {}, n = 0; n < t.length; n++) {
					var a = this.inputLayers[n],
						o = t[n];
					r[S = a.name + "_0_0"] = o
				}
				var i = Object.keys(this.nodesByDepth).map(function(e) {
					return parseInt(e, 10)
				}).sort(reverseNumberCompare);
				if (i.length > 1)
					for (var s = 0, u = i; s < u.length; s++)
						for (var l = u[s], c = 0, p = this.nodesByDepth[l]; c < p.length; c++) {
							var d = p[c],
								a = d.outboundLayer;
							if (-1 === this.inputLayers.map(function(e) {
									return e.id
								}).indexOf(a.id)) {
								for (var h = [], f = 0; f < d.inboundLayers.length; f++) {
									var m = d.inboundLayers[f],
										g = d.nodeIndices[f],
										y = d.tensorIndices[f],
										v = r[S = m.name + "_" + g + "_" + y];
									h.push(v)
								}
								for (var b = normalizeShapeList(a.computeOutputShape(singletonOrArray(h))), x = a.inboundNodes.indexOf(d), f = 0; f < b.length; f++) r[S = a.name + "_" + x + "_" + f] = b[f]
							}
						}
				for (var w = [], _ = [], n = 0; n < this.outputLayers.length; n++) {
					var a = this.outputLayers[n],
						x = this.outputLayersNodeIndices[n],
						y = this.outputLayersTensorIndices[n],
						S = a.name + "_" + x + "_" + y;
					_.push(S)
				}
				for (n = 0; n < _.length; n++) {
					var N = _[n];
					assert$1(N in r), w.push(r[N])
				}
				return singletonOrArray(w)
			}, t.prototype.runInternalGraph = function(e, t) {
				null == t && (t = pyListRepeat(null, e.length));
				for (var r = {}, n = 0; n < this.inputs.length; ++n) {
					var a = this.inputs[n],
						o = e[n],
						i = t[n];
					r[a.id] = [o, i]
				}
				for (var s = 0, u = Object.keys(this.nodesByDepth).map(function(e) {
						return parseInt(e, 10)
					}).sort(reverseNumberCompare); s < u.length; s++)
					for (var l = u[s], c = 0, p = this.nodesByDepth[l]; c < p.length; c++) {
						for (var d = p[c], h = d.outboundLayer, f = d.inputTensors, m = d.outputTensors, g = new Array, y = 0, v = f; y < v.length; y++)(a = v[y]).id in r && g.push(r[a.id]);
						if (g.length === f.length) {
							var b = {},
								x = void 0,
								w = void 0,
								_ = void 0,
								S = void 0;
							if (null != d.callArgs && (b = d.callArgs), 1 === g.length) {
								var N = g[0],
									A = N[0],
									E = N[1];
								null == b.mask && (b.mask = E), _ = toList(h.call(A, b)), S = toList(h.computeMask(A, E)), x = [A], w = [E]
							} else x = g.map(function(e) {
								return e[0]
							}), w = g.map(function(e) {
								return e[1]
							}), null == b.mask && (b.mask = w), _ = toList(h.call(x, b)), S = toList(h.computeMask(x, w));
							if (h.activityRegularizer) throw new NotImplementedError("Model invocation with concrete Tensor value(s) in the presence of activity regularizer(s) is not supported yet.");
							for (n = 0; n < m.length; ++n) {
								var a = m[n],
									o = _[n],
									i = S[n];
								r[a.id] = [o, i]
							}
						}
					}
				for (var T = [], I = [], O = [], P = 0, R = this.outputs; P < R.length; P++) {
					assert$1((a = R[P]).id in r, "Could not compute output " + a.name + " : " + a.id);
					var C = r[a.id],
						k = C[0],
						i = C[1];
					O.push(k.shape), T.push(k), I.push(i)
				}
				return [T, I, O]
			}, t.prototype.buildNodeConversionMap = function(e) {
				for (var r, n = {}, a = 0, o = this.layers; a < o.length; a++) {
					var i = o[a];
					r = i instanceof t ? 1 : 0;
					for (var s = 0; s < i.inboundNodes.length; s++) {
						var u = t.nodeKey(i, s);
						u in this.containerNodes && (n[u] = r, r += 1)
					}
				}
				return n
			}, t.prototype.getLayer = function(e, t) {
				if (null != t) {
					if (this.layers.length <= t) throw new ValueError("Was asked to retrieve layer at index " + t + ", but model only has " + this.layers.length + " layer(s).");
					return this.layers[t]
				}
				if (null == e) throw new ValueError("Provide either a layer name or layer index");
				for (var r = 0, n = this.layers; r < n.length; r++) {
					var a = n[r];
					if (a.name === e) return a
				}
				throw new ValueError("No such layer: " + e)
			}, t.prototype.calculateLosses = function() {
				var e = this;
				return tidy(function() {
					for (var r = [], n = 0, a = e.layers; n < a.length; n++)
						for (var o = a[n], i = 0; i < o.inboundNodes.length; ++i) {
							var s = t.nodeKey(o, i);
							e.containerNodes.has(s) && r.push.apply(r, o.calculateLosses())
						}
					return r
				})
			}, t.prototype.getConfig = function() {
				for (var e = {
						name: this.name
					}, r = this.buildNodeConversionMap(this.layers), n = [], a = 0, o = this.layers; a < o.length; a++) {
					for (var i = (b = o[a]).getClassName(), s = b.getConfig(), u = [], l = 0; l < b.inboundNodes.length; l++) {
						var c = b.inboundNodes[l],
							p = t.nodeKey(b, l),
							d = {};
						if (this.containerNodes.has(p) && (c.callArgs && (-1 === JSON.stringify(c.callArgs).indexOf("undefined") ? d = c.callArgs : (console.warn("Layer " + b.name + " was passed non-serializable keyword arguments: " + c.callArgs + ". They will not be included in the serialized model (and thus will be missing at deserialization time)."), d = {})), c.inboundLayers.length > 0)) {
							for (var h = [], f = 0; f < c.inboundLayers.length; f++) {
								var m = c.inboundLayers[f],
									g = c.nodeIndices[f],
									y = c.tensorIndices[f];
								null !== (w = r[t.nodeKey(m, g)]) && void 0 !== w || (w = 0), h.push([m.name, w, y, d])
							}
							u.push(h)
						}
					}
					n.push({
						name: b.name,
						className: i,
						config: s,
						inboundNodes: u
					})
				}
				e.layers = n;
				for (var v = [], f = 0; f < this.inputLayers.length; f++) {
					var b = this.inputLayers[f],
						g = this.inputLayersNodeIndices[f],
						p = t.nodeKey(b, g);
					if (this.containerNodes.has(p)) {
						null !== (w = r[p]) && void 0 !== w || (w = 0);
						y = this.inputLayersTensorIndices[f];
						v.push([b.name, w, y])
					}
				}
				e.inputLayers = v;
				for (var x = [], f = 0; f < this.outputLayers.length; f++) {
					var b = this.outputLayers[f],
						g = this.outputLayersNodeIndices[f],
						p = t.nodeKey(b, g);
					if (this.containerNodes.has(p)) {
						var w = r[p];
						null !== w && void 0 !== w || (w = 0);
						y = this.outputLayersTensorIndices[f];
						x.push([b.name, w, y])
					}
				}
				return e.outputLayers = x, e
			}, t.fromConfig = function(e, t) {
				function r(e, t) {
					e.name in a ? a[e.name].push(t) : a[e.name] = [t]
				}
				for (var n = {}, a = {}, o = t.name, i = t.layers, s = 0, u = i; s < u.length; s++) ! function(e) {
					var a = e.name,
						o = deserialize(e, null != t.customObjects ? t.customObjects : {});
					n[a] = o;
					for (var i = 0, s = e.inboundNodes; i < s.length; i++) {
						var u = s[i];
						if (!(u instanceof Array)) throw new ValueError("Corrupted configuration, expected array for nodeData: " + u);
						r(o, u)
					}
				}(p = u[s]);
				for (; !isObjectEmpty(a);)
					for (var l = 0, c = i; l < c.length; l++) {
						var p = c[l];
						if ((S = n[p.name]).name in a) {
							for (var d = 0, h = a[S.name]; d < h.length; d++) ! function(e, t) {
								for (var a, o = [], i = 0, s = t; i < s.length; i++) {
									var u = s[i],
										l = u[0],
										c = u[1],
										p = u[2];
									if (3 === u.length) a = {};
									else {
										if (4 !== u.length) throw new ValueError("Improperly formatted model config for layer " + JSON.stringify(e) + ": " + JSON.stringify(u));
										a = u[3]
									}
									if (!(l in n)) return void r(e, t);
									var d = n[l];
									if (d.inboundNodes.length <= c) return void r(e, t);
									var h = d.inboundNodes[c];
									o.push(h.outputTensors[p])
								}
								o.length > 0 && e.apply(singletonOrArray(o), a)
							}(S, h[d]);
							delete a[S.name]
						}
					}
				for (var f = [], m = [], g = 0, y = t.inputLayers; g < y.length; g++) {
					var v = (p = y[g])[0],
						b = p[1],
						x = p[2];
					assert$1(v in n);
					N = (S = n[v]).inboundNodes[b].outputTensors;
					f.push(N[x])
				}
				for (var w = 0, _ = t.outputLayers; w < _.length; w++) {
					var v = (p = _[w])[0],
						b = p[1],
						x = p[2];
					assert$1(v in n);
					var S = n[v],
						N = S.inboundNodes[b].outputTensors;
					m.push(N[x])
				}
				return new e({
					inputs: f,
					outputs: m,
					name: o
				})
			}, Object.defineProperty(t.prototype, "stateful", {
				get: function() {
					if (this._stateful) throw new ValueError("Container instance unexpectedly has _stateful = true. The statefulness of a Container is determined by the Layers it contains. Its _stateful property must remain the default false.");
					for (var e = 0, t = this.layers; e < t.length; e++)
						if (t[e].stateful) return !0;
					return !1
				},
				enumerable: !0,
				configurable: !0
			}), __decorate$33([doc()], t.prototype, "getLayer", null), t
		}(Layer),
		__extends$12 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__awaiter$14 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$14 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		Callback = function() {
			function e() {
				this.validationData = null, this.model = null
			}
			return e.prototype.setParams = function(e) {
				this.params = e
			}, e.prototype.setModel = function(e) {
				this.model = e
			}, e.prototype.onEpochBegin = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(e) {
						return [2]
					})
				})
			}, e.prototype.onEpochEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(e) {
						return [2]
					})
				})
			}, e.prototype.onBatchBegin = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(e) {
						return [2]
					})
				})
			}, e.prototype.onBatchEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(e) {
						return [2]
					})
				})
			}, e.prototype.onTrainBegin = function(e) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(e) {
						return [2]
					})
				})
			}, e.prototype.onTrainEnd = function(e) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(e) {
						return [2]
					})
				})
			}, e
		}(),
		CallbackList = function() {
			function e(e, t) {
				void 0 === t && (t = 10), null == e && (e = []), this.callbacks = e, this.queueLength = t
			}
			return e.prototype.append = function(e) {
				this.callbacks.push(e)
			}, e.prototype.setParams = function(e) {
				for (var t = 0, r = this.callbacks; t < r.length; t++) r[t].setParams(e)
			}, e.prototype.setModel = function(e) {
				for (var t = 0, r = this.callbacks; t < r.length; t++) r[t].setModel(e)
			}, e.prototype.onEpochBegin = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					var r, n, a;
					return __generator$14(this, function(o) {
						switch (o.label) {
							case 0:
								null == t && (t = {}), r = 0, n = this.callbacks, o.label = 1;
							case 1:
								return r < n.length ? (a = n[r], [4, a.onEpochBegin(e, t)]) : [3, 4];
							case 2:
								o.sent(), o.label = 3;
							case 3:
								return r++, [3, 1];
							case 4:
								return [2]
						}
					})
				})
			}, e.prototype.onEpochEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					var r, n, a;
					return __generator$14(this, function(o) {
						switch (o.label) {
							case 0:
								null == t && (t = {}), r = 0, n = this.callbacks, o.label = 1;
							case 1:
								return r < n.length ? (a = n[r], [4, a.onEpochEnd(e, t)]) : [3, 4];
							case 2:
								o.sent(), o.label = 3;
							case 3:
								return r++, [3, 1];
							case 4:
								return [2]
						}
					})
				})
			}, e.prototype.onBatchBegin = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					var r, n, a;
					return __generator$14(this, function(o) {
						switch (o.label) {
							case 0:
								null == t && (t = {}), r = 0, n = this.callbacks, o.label = 1;
							case 1:
								return r < n.length ? (a = n[r], [4, a.onBatchBegin(e, t)]) : [3, 4];
							case 2:
								o.sent(), o.label = 3;
							case 3:
								return r++, [3, 1];
							case 4:
								return [2]
						}
					})
				})
			}, e.prototype.onBatchEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					var r, n, a;
					return __generator$14(this, function(o) {
						switch (o.label) {
							case 0:
								null == t && (t = {}), r = 0, n = this.callbacks, o.label = 1;
							case 1:
								return r < n.length ? (a = n[r], [4, a.onBatchEnd(e, t)]) : [3, 4];
							case 2:
								o.sent(), o.label = 3;
							case 3:
								return r++, [3, 1];
							case 4:
								return [2]
						}
					})
				})
			}, e.prototype.onTrainBegin = function(e) {
				return __awaiter$14(this, void 0, void 0, function() {
					var t, r, n;
					return __generator$14(this, function(a) {
						switch (a.label) {
							case 0:
								null == e && (e = {}), t = 0, r = this.callbacks, a.label = 1;
							case 1:
								return t < r.length ? (n = r[t], [4, n.onTrainBegin(e)]) : [3, 4];
							case 2:
								a.sent(), a.label = 3;
							case 3:
								return t++, [3, 1];
							case 4:
								return [2]
						}
					})
				})
			}, e.prototype.onTrainEnd = function(e) {
				return __awaiter$14(this, void 0, void 0, function() {
					var t, r, n;
					return __generator$14(this, function(a) {
						switch (a.label) {
							case 0:
								null == e && (e = {}), t = 0, r = this.callbacks, a.label = 1;
							case 1:
								return t < r.length ? (n = r[t], [4, n.onTrainEnd(e)]) : [3, 4];
							case 2:
								a.sent(), a.label = 3;
							case 3:
								return t++, [3, 1];
							case 4:
								return [2]
						}
					})
				})
			}, e
		}(),
		BaseLogger = function(e) {
			function t() {
				return e.call(this) || this
			}
			return __extends$12(t, e), t.prototype.onEpochBegin = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(e) {
						return this.seen = 0, this.totals = {}, [2]
					})
				})
			}, t.prototype.onBatchEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					var e, r, n, a, o = this;
					return __generator$14(this, function(i) {
						null == t && (t = {}), e = null == t.size ? 0 : t.size, this.seen += e, r = function(r) {
							var a = t[r];
							if ("number" == typeof a) n.totals.hasOwnProperty(r) || (n.totals[r] = 0), n.totals[r] = n.totals[r] + a * e;
							else {
								var i = void 0;
								r in n.totals ? i = n.totals[r] : n.totals[r] = getScalar(0), n.totals[r] = tidy(function() {
									return scalarPlusArray(o.totals[r], mul(a, getScalar(e)))
								}), null != i && i.dispose()
							}
						}, n = this;
						for (a in t) r(a);
						return [2]
					})
				})
			}, t.prototype.onEpochEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					var e, r, n, a, o, i = this;
					return __generator$14(this, function(s) {
						if (null != t)
							for (e = function(e) {
									if (null == r.totals[e]) return "continue";
									"number" == typeof r.totals[e] ? t[e] = r.totals[e] / r.seen : tidy(function() {
										t[e] = scalarTimesArray(div(getScalar(1), getScalar(i.seen)), i.totals[e]), i.totals[e].dispose(), keep(t[e])
									})
								}, r = this, n = 0, a = this.params.metrics; n < a.length; n++) o = a[n], e(o);
						return [2]
					})
				})
			}, t
		}(Callback),
		History = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$12(t, e), t.prototype.onTrainBegin = function(e) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(e) {
						return this.epoch = [], this.history = {}, [2]
					})
				})
			}, t.prototype.onEpochEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					var r;
					return __generator$14(this, function(n) {
						null == t && (t = {}), this.epoch.push(e);
						for (r in t) null == this.history[r] && (this.history[r] = []), this.history[r].push(t[r]);
						return [2]
					})
				})
			}, t.prototype.syncData = function() {
				return __awaiter$14(this, void 0, void 0, function() {
					var e, t, r, n, a, o, i, s, u;
					return __generator$14(this, function(l) {
						switch (l.label) {
							case 0:
								e = [], t = [], r = [];
								for (n in this.history)
									for (a = this.history[n], o = 0; o < a.length; ++o) "number" != typeof a[o] && (i = a[o], e.push(i.data()), t.push(n), r.push(o));
								return [4, Promise.all(e)];
							case 1:
								for (s = l.sent(), u = 0; u < s.length; ++u) this.history[t[u]][r[u]].dispose(), this.history[t[u]][r[u]] = s[u][0];
								return [2]
						}
					})
				})
			}, t
		}(Callback),
		CustomCallback = function(e) {
			function t(t) {
				var r = e.call(this) || this;
				return r.trainBegin = t.onTrainBegin, r.trainEnd = t.onTrainEnd, r.epochBegin = t.onEpochBegin, r.epochEnd = t.onEpochEnd, r.batchBegin = t.onBatchBegin, r.batchEnd = t.onBatchEnd, r
			}
			return __extends$12(t, e), t.prototype.onEpochBegin = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(r) {
						switch (r.label) {
							case 0:
								return null == this.epochBegin ? [3, 3] : [4, resolveScalarsInLogs(t)];
							case 1:
								return r.sent(), [4, this.epochBegin(e, t)];
							case 2:
								r.sent(), r.label = 3;
							case 3:
								return [2]
						}
					})
				})
			}, t.prototype.onEpochEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(r) {
						switch (r.label) {
							case 0:
								return null == this.epochEnd ? [3, 3] : [4, resolveScalarsInLogs(t)];
							case 1:
								return r.sent(), [4, this.epochEnd(e, t)];
							case 2:
								r.sent(), r.label = 3;
							case 3:
								return [2]
						}
					})
				})
			}, t.prototype.onBatchBegin = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(r) {
						switch (r.label) {
							case 0:
								return null == this.batchBegin ? [3, 3] : [4, resolveScalarsInLogs(t)];
							case 1:
								return r.sent(), [4, this.batchBegin(e, t)];
							case 2:
								r.sent(), r.label = 3;
							case 3:
								return [2]
						}
					})
				})
			}, t.prototype.onBatchEnd = function(e, t) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(r) {
						switch (r.label) {
							case 0:
								return null == this.batchEnd ? [3, 3] : [4, resolveScalarsInLogs(t)];
							case 1:
								return r.sent(), [4, this.batchEnd(e, t)];
							case 2:
								r.sent(), r.label = 3;
							case 3:
								return [2]
						}
					})
				})
			}, t.prototype.onTrainBegin = function(e) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(t) {
						switch (t.label) {
							case 0:
								return null == this.trainBegin ? [3, 3] : [4, resolveScalarsInLogs(e)];
							case 1:
								return t.sent(), [4, this.trainBegin(e)];
							case 2:
								t.sent(), t.label = 3;
							case 3:
								return [2]
						}
					})
				})
			}, t.prototype.onTrainEnd = function(e) {
				return __awaiter$14(this, void 0, void 0, function() {
					return __generator$14(this, function(t) {
						switch (t.label) {
							case 0:
								return null == this.trainEnd ? [3, 3] : [4, resolveScalarsInLogs(e)];
							case 1:
								return t.sent(), [4, this.trainEnd(e)];
							case 2:
								t.sent(), t.label = 3;
							case 3:
								return [2]
						}
					})
				})
			}, t
		}(Callback),
		mse$1 = meanSquaredError,
		MSE$1 = meanSquaredError,
		mae$1 = meanAbsoluteError,
		MAE$1 = meanAbsoluteError,
		mape$1 = meanAbsolutePercentageError,
		MAPE$1 = meanAbsolutePercentageError,
		categoricalCrossentropy$1 = categoricalCrossentropy,
		cosine$1 = cosineProximity,
		sparseCategoricalCrossentropy$1 = sparseCategoricalCrossentropy,
		FeedDict = function() {
			function e(t) {
				if (this.id2Value = {}, t instanceof e)
					for (var r in t.id2Value) this.id2Value[r] = t.id2Value[r];
				else {
					if (null == t) return;
					for (var n = 0, a = t; n < a.length; n++) {
						var o = a[n];
						this.add(o.key, o.value)
					}
				}
			}
			return e.prototype.add = function(e, t) {
				if (assertFeedCompatibility(e, t), null != this.id2Value[e.id]) throw new ValueError("Duplicate key: name=" + e.name + ", id=" + e.id);
				return this.id2Value[e.id] = t, this
			}, e.prototype.addFeed = function(e) {
				this.add(e.key, e.value)
			}, e.prototype.hasKey = function(e) {
				return null != this.id2Value[e.id]
			}, e.prototype.getValue = function(e) {
				if (null == this.id2Value[e.id]) throw new ValueError("Nonexistent key: " + JSON.stringify(e));
				return this.id2Value[e.id]
			}, e
		}(),
		__extends$13 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$34 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		__awaiter$15 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$15 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		ModelLoggingVerbosity;
	! function(e) {
		e[e.SILENT = 0] = "SILENT", e[e.VERBOSE = 1] = "VERBOSE"
	}(ModelLoggingVerbosity || (ModelLoggingVerbosity = {}));
	var Model = function(e) {
		function t(t) {
			return e.call(this, t) || this
		}
		return __extends$13(t, e), t.prototype.compile = function(e) {
			var t = this;
			if (null == e.loss && (e.loss = []), this.loss = e.loss, "string" == typeof e.optimizer) this.optimizer = getOptimizer(e.optimizer);
			else {
				if (!(e.optimizer instanceof Optimizer)) throw new ValueError("User-defined optimizer must be an instance of tf.Optimizer.");
				this.optimizer = e.optimizer
			}
			var r = [];
			if (Array.isArray(e.loss) || "string" == typeof e.loss || "function" == typeof e.loss)
				if (Array.isArray(e.loss)) {
					if (e.loss.length !== this.outputs.length) throw new ValueError("When passing an Array as loss, it should have one entry per model output. The model has " + this.outputs.length + " output(s), but you passed loss=" + e.loss + ".");
					var n = e.loss;
					r = n.map(function(e) {
						return get(e)
					})
				} else {
					var a = get(e.loss);
					this.outputs.map(function(e) {
						r.push(a)
					})
				}
			else {
				e.loss = e.loss;
				for (var o in e.loss)
					if (-1 === this.outputNames.indexOf(o)) throw new ValueError('Unknown entry in loss dictionary: "' + o + '". Only expect the following keys: ' + this.outputNames);
				for (var i in this.outputNames) null == e.loss[i] && console.warn('Output "' + i + '" is missing from loss dictionary. We assume this was done on purpose, and we will not be expecting data to be passed to ' + i + " during training"), r.push(get(e.loss[i]))
			}
			this.lossFunctions = r, this.feedOutputNames = [], this.feedOutputShapes = [], this.feedLossFns = [];
			for (var s = 0; s < this.outputs.length; ++s) {
				var u = this.internalOutputShapes[s],
					l = this.outputNames[s];
				this.feedOutputNames.push(l), this.feedOutputShapes.push(u), this.feedLossFns.push(this.lossFunctions[s])
			}
			var c = [];
			this.metrics = e.metrics, this.metricsNames = ["loss"], this.metricsTensors = [], nameScope$1("loss", function() {
				for (var e = 0; e < t.outputs.length; ++e)
					if (-1 === c.indexOf(e)) {
						var r = t.lossFunctions[e];
						t.outputs.length > 1 && (t.metricsTensors.push([r, e]), t.metricsNames.push(t.outputNames[e] + "_loss"))
					}
			});
			var p = collectMetrics(e.metrics, this.outputNames),
				d = function(e, r, n) {
					t.outputNames.length > 1 && (r = t.outputNames[e] + "_" + r), t.metricsNames.push(r), t.metricsTensors.push([n, e])
				};
			nameScope$1("metric", function() {
				for (var e = 0; e < t.outputs.length; ++e) ! function(e) {
					if (-1 !== c.indexOf(e)) return "continue";
					! function(r) {
						for (var n, a, o, i = 0, s = p[e]; i < s.length; i++) ! function(r) {
							if (-1 !== ["accuracy", "acc", "crossentropy", "ce"].indexOf(r)) {
								var i = t.internalOutputShapes[e];
								1 === i[i.length - 1] || t.lossFunctions[e] === binaryCrossentropy ? -1 !== ["accuracy", "acc"].indexOf(r) ? a = binaryAccuracy : -1 !== ["crossentropy", "ce"].indexOf(r) && (a = binaryCrossentropy$1) : t.lossFunctions[e] === sparseCategoricalCrossentropy ? -1 !== ["accuracy", "acc"].indexOf(r) ? a = sparseCategoricalAccuracy : -1 !== ["crossentropy", "ce"].indexOf(r) && (a = sparseCategoricalCrossentropy$1) : -1 !== ["accuracy", "acc"].indexOf(r) ? a = categoricalAccuracy : -1 !== ["crossentropy", "ce"].indexOf(r) && (a = categoricalCrossentropy$1);
								var s = void 0; - 1 !== ["accuracy", "acc"].indexOf(r) ? s = "acc" : -1 !== ["crossentropy", "ce"].indexOf(r) && (s = "ce"), o = a, n = "" + s
							} else {
								var u = get$1(r);
								o = u, n = "" + r
							}
							var l;
							nameScope$1(n, function() {
								l = o
							}), d(e, n, l)
						}(s[i])
					}()
				}(e)
			}), this.collectedTrainableWeights = this.trainableWeights
		}, t.prototype.checkTrainableWeightsConsistency = function() {
			null != this.collectedTrainableWeights && this.trainableWeights.length !== this.collectedTrainableWeights.length && console.warn("Discrepancy between trainableweights and collected trainable weights. Did you set `model.trainable` without calling `model.compile()` afterwards?")
		}, t.prototype.evaluate = function(e, t, r) {
			void 0 === r && (r = {});
			var n = null == r.batchSize ? 32 : r.batchSize,
				a = this.standardizeUserData(e, t, !0, n),
				o = a[0].concat(a[1]);
			this.makeTestFunction();
			var i = this.testFunction;
			return singletonOrArray(this.testLoop(i, o, n, r.verbose, r.steps))
		}, t.prototype.checkNumSamples = function(e, t, r, n) {
			void 0 === n && (n = "steps");
			var a;
			if (null != r) {
				if (a = null, null != t) throw new ValueError("If " + n + " is set, batchSize must be null or undefined.Got batchSize = " + t)
			} else {
				if (null == e) throw new ValueError("Either the input data should have a defined shape, or " + n + " shoud be specified.");
				a = Array.isArray(e) ? e[0].shape[0] : e.shape[0]
			}
			return a
		}, t.prototype.predictLoop = function(e, t, r) {
			var n = this;
			void 0 === t && (t = 32), void 0 === r && (r = !1);
			var a = this.checkNumSamples(e);
			if (r) throw new NotImplementedError("Verbose predictLoop() is not implemented yet.");
			for (var o = makeBatches(a, t), i = [], s = 0; s < o.length; ++s) ! function(t) {
				var r = tidy(function() {
					var r = o[t][0],
						a = o[t][1],
						i = sliceArrays(e, r, a),
						s = [];
					if (Array.isArray(i))
						for (var u = 0; u < i.length; ++u) s.push({
							key: n.inputs[u],
							value: i[u]
						});
					else s.push({
						key: n.inputs[0],
						value: i
					});
					var l = new FeedDict(s);
					return execute(n.outputs, l)
				});
				if (0 === t)
					for (var a = 0, s = r; a < s.length; a++) {
						var u = s[a];
						i.push(u)
					} else
						for (var l = 0; l < r.length; ++l) i[l] = concatAlongFirstAxis(i[l], r[l])
			}(s);
			return singletonOrArray(i)
		}, t.prototype.predict = function(e, t) {
			void 0 === t && (t = {}), checkInputData(e, this.inputNames, this.feedInputShapes, !1);
			var r = null == t.batchSize ? 32 : t.batchSize;
			return this.predictLoop(e, r)
		}, t.prototype.predictOnBatch = function(e) {
			return checkInputData(e, this.inputNames, this.feedInputShapes, !0), this.predictLoop(e, e.shape[0])
		}, t.prototype.standardizeUserData = function(e, t, r, n) {
			if (void 0 === r && (r = !0), null == this.optimizer) throw new RuntimeError("You must compile a model before training/testing. Use Model.compile(modelCompileConfig).");
			for (var a = [], o = 0; o < this.feedOutputShapes.length; ++o) {
				var i = this.feedOutputShapes[o];
				this.feedLossFns[o] === sparseCategoricalCrossentropy ? a.push(i.slice(0, i.length - 1).concat([1])) : a.push(i)
			}
			if (e = standardizeInputData(e, this.feedInputNames, this.feedInputShapes, !1, "input"), t = standardizeInputData(t, this.feedOutputNames, a, !1, "target"), checkArrayLengths(e, t), checkLossAndTargetCompatibility(t, this.feedLossFns, this.feedOutputShapes), this.stateful && null != n && n > 0 && e[0].shape[0] % n != 0) throw new ValueError("In a stateful network, you should only pass inputs with a number of samples that is divisible by the batch size " + n + ". Found: " + e[0].shape[0] + " sample(s).");
			return [e, t, null]
		}, t.prototype.fitLoop = function(e, t, r, n, a, o, i, s, u, l, c, p, d, h) {
			return void 0 === p && (p = 0), __awaiter$15(this, void 0, void 0, function() {
				var f, m, g, y, v, b, x, w, _ = this;
				return __generator$15(this, function(S) {
					switch (S.label) {
						case 0:
							if (null == n && (n = 32), null == a && (a = 1), null == l && (l = !0), null == p && (p = 0), f = !1, null != s && null != u && (f = !0), null != h && (f = !0, null == d)) throw new ValueError("Can only use `validationSteps` when doing step-wise training, i.e., `stepsPerEpoch` must be set.");
							if (null != (m = this.checkNumSamples(t, n, d, "steps_per_epoch")) && (g = range$1(0, m)), this.history = new History, i = null == i ? [new BaseLogger] : [new BaseLogger].concat(i), i = i.concat([this.history]), o > 0) throw new NotImplementedError("Verbose mode is not implemented yet.");
							return (y = new CallbackList(i)).setModel(this), y.setParams({
								epochs: a,
								steps: d,
								verbose: o,
								doValidation: f,
								metrics: c
							}), [4, y.onTrainBegin()];
						case 1:
							S.sent(), this.stopTraining = !1, v = function(a) {
								var o, i, c, p, h, v;
								return __generator$15(this, function(x) {
									switch (x.label) {
										case 0:
											return [4, y.onEpochBegin(a)];
										case 1:
											if (x.sent(), o = {}, null == d) return [3, 2];
											throw new NotImplementedError("stepsPerEpoch mode is not implemented yet.");
										case 2:
											if ("batch" === l) throw new NotImplementedError("batch shuffling is not implemneted yet");
											l && shuffle(g), i = tensor1d(g), c = makeBatches(m, n), p = function(a) {
												var l;
												return __generator$15(this, function(p) {
													switch (p.label) {
														case 0:
															return l = {}, [4, y.onBatchBegin(a, l)];
														case 1:
															return p.sent(), tidy(function() {
																var p = c[a][0],
																	d = c[a][1],
																	h = sliceAlongFirstAxis(i, p, d - p);
																l.batch = a, l.size = d - p;
																for (var m = sliceArraysByIndices(t, h), g = e(m), y = 0; y < r.length; ++y) {
																	var v = r[y],
																		b = g[y];
																	l[v] = b, keep(b)
																}
																if (a === c.length - 1 && f)
																	for (var x = _.testLoop(s, u, n), y = 0; y < r.length; ++y) {
																		var v = r[y],
																			b = x[y];
																		keep(b), o["val_" + v] = b
																	}
															}), [4, y.onBatchEnd(a, l)];
														case 2:
															return p.sent(), disposeTensorsInLogs(l), b.stopTraining ? [2, "break"] : [2]
													}
												})
											}, h = 0, x.label = 3;
										case 3:
											return h < c.length ? [5, p(h)] : [3, 6];
										case 4:
											if ("break" === (v = x.sent())) return [3, 6];
											x.label = 5;
										case 5:
											return ++h, [3, 3];
										case 6:
											i.dispose(), x.label = 7;
										case 7:
											return [4, y.onEpochEnd(a, o)];
										case 8:
											return x.sent(), b.stopTraining ? [2, "break"] : [2]
									}
								})
							}, b = this, x = p, S.label = 2;
						case 2:
							return x < a ? [5, v(x)] : [3, 5];
						case 3:
							if ("break" === (w = S.sent())) return [3, 5];
							S.label = 4;
						case 4:
							return ++x, [3, 2];
						case 5:
							return [4, y.onTrainEnd()];
						case 6:
							return S.sent(), [4, this.history.syncData()];
						case 7:
							return S.sent(), [2, this.history]
					}
				})
			})
		}, t.prototype.testLoop = function(e, t, r, n, a) {
			void 0 === n && (n = 0);
			var o = this.checkNumSamples(t, r, a, "steps"),
				i = [];
			if (1 === n) throw new NotImplementedError("Verbose mode is not implemented yet.");
			if (null != a) throw new NotImplementedError("steps mode in testLoop() is not implemented yet");
			for (var s = makeBatches(o, r), u = tensor1d(range$1(0, o)), l = 0; l < s.length; ++l) {
				var c = s[l][0],
					p = s[l][1],
					d = e(sliceArraysByIndices(t, sliceAlongFirstAxis(u, c, p - c)));
				if (0 === l)
					for (f = 0; f < d.length; ++f) i.push(getScalar(0));
				for (f = 0; f < d.length; ++f) {
					var h = d[f];
					i[f] = add(i[f], scalarTimesArray(getScalar(p - c), h))
				}
			}
			for (var f = 0; f < i.length; ++f) i[f] = div(i[f], getScalar(o));
			return i
		}, t.prototype.getDedupedMetricsNames = function() {
			for (var e = this.metricsNames, t = [], r = 0; r < e.length; ++r) {
				var n = e[r],
					a = n;
				count(e, n) > 1 && (a += "_" + count(e.slice(0, r), n)), t.push(a)
			}
			return t
		}, t.prototype.makeTestFunction = function() {
			var e = this;
			this.testFunction = function(t) {
				return tidy(function() {
					for (var r, n = [], a = t.slice(0, e.inputs.length), o = t.slice(e.inputs.length, e.inputs.length + e.outputs.length), i = [], s = 0; s < e.inputs.length; ++s) i.push({
						key: e.inputs[s],
						value: a[s]
					});
					for (var u = new FeedDict(i), l = execute(e.outputs, u), s = 0; s < e.lossFunctions.length; ++s) {
						var c = e.lossFunctions[s],
							p = mean(c(o[s], l[s]));
						r = 0 === s ? p : add(r, p), n.push(r)
					}
					for (s = 0; s < e.metricsTensors.length; ++s) {
						var d = e.metricsTensors[s][0],
							h = e.metricsTensors[s][1],
							f = mean(d(o[h], l[h]));
						n.push(f)
					}
					return n
				})
			}
		}, t.prototype.fit = function(e, t, r) {
			return void 0 === r && (r = {}), __awaiter$15(this, void 0, void 0, function() {
				var n, a, o, i, s, u, l, c, p, d, h, f, m, g, y, v, b, x, w, _ = this;
				return __generator$15(this, function(S) {
					switch (S.label) {
						case 0:
							if (n = null == r.batchSize ? 32 : r.batchSize, a = this.standardizeUserData(e, t, !1, n), o = a[0], i = a[1], s = !1, p = !1, null != r.validationData && r.validationData.length > 0) {
								if (s = !0, 2 !== r.validationData.length) throw 3 === r.validationData.length ? new NotImplementedError("validationData including sample weights is not supported yet.") : new ValueError("When passing validation data, it must contain 2 (valX, valY) or 3 (valX, valY, valSampleWeight) items; " + r.validationData + " is invalid.");
								u = r.validationData[0], l = r.validationData[1], d = this.standardizeUserData(u, l, !0, n), u = d[0], l = d[1], c = u.concat(l)
							} else null != r.validationSplit && r.validationSplit > 0 && r.validationSplit < 1 ? (s = !0, h = Math.floor(o[0].shape[0] * (1 - r.validationSplit)), f = o[0].shape[0], u = sliceArrays(o, h, f), o = sliceArrays(o, 0, h), l = sliceArrays(i, h, f), i = sliceArrays(i, 0, h), p = !0, c = u.concat(l)) : null != r.validationSteps && (s = !0);
							return m = o.concat(i), this.checkTrainableWeightsConsistency(), g = function(e) {
								var t = e.slice(0, _.inputs.length),
									r = e.slice(_.inputs.length, _.inputs.length + _.outputs.length),
									n = [],
									a = _.collectedTrainableWeights.map(function(e) {
										return e.read()
									});
								return [_.optimizer.minimize(function() {
									for (var e = [], a = 0; a < _.inputs.length; ++a) e.push({
										key: _.inputs[a],
										value: t[a]
									});
									for (var o, i = new FeedDict(e), s = execute(_.outputs, i, {
											training: !0
										}), a = 0; a < _.lossFunctions.length; ++a) {
										var u = (0, _.lossFunctions[a])(r[a], s[a]);
										mean(u), o = 0 === a ? u : add(o, u)
									}
									for (a = 0; a < _.metricsTensors.length; ++a) {
										var l = _.metricsTensors[a][0],
											c = _.metricsTensors[a][1],
											p = mean(l(r[c], s[c]));
										keep(p), n.push(p)
									}
									return o = mean(o), _.calculateLosses().forEach(function(e) {
										o = add(o, e)
									}), o
								}, !0, a)].concat(n)
							}, y = this.getDedupedMetricsNames(), s ? (this.makeTestFunction(), v = this.testFunction, b = y.slice().concat(y.map(function(e) {
								return "val_" + e
							}))) : (v = null, c = [], b = y.slice()), x = standardizeCallbacks(r.callbacks), [4, this.fitLoop(g, m, y, n, r.epochs, r.verbose, x, v, c, r.shuffle, b, null, null, null)];
						case 1:
							return w = S.sent(), p && (c.forEach(function(e) {
								return e.dispose()
							}), o.forEach(function(e) {
								return e.dispose()
							}), i.forEach(function(e) {
								return e.dispose()
							})), [2, w]
					}
				})
			})
		}, t.prototype.getNamedWeights = function(e) {
			for (var t = {}, r = null != e && e.trainableOnly, n = r ? this.trainableWeights : this.weights, a = this.getWeights(r), o = 0; o < n.length; ++o) r && !n[o].trainable || (t[n[o].originalName] = a[o]);
			return t
		}, t.prototype.save = function(e, t) {
			return __awaiter$15(this, void 0, void 0, function() {
				var r, n, a, o, i;
				return __generator$15(this, function(s) {
					switch (s.label) {
						case 0:
							if ("string" == typeof e) {
								if (0 === (r = getSaveHandlers(e)).length) throw new ValueError("Cannot find any save handlers for URL '" + e + "'");
								if (r.length > 1) throw new ValueError("Found more than one (" + r.length + ") save handlers for URL '" + e + "'");
								e = r[0]
							}
							if (null == e.save) throw new ValueError("Model.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");
							return [4, encodeWeights(this.getNamedWeights(t))];
						case 1:
							return n = s.sent(), a = !1, o = null, i = this.toJSON(o, a), [2, e.save({
								modelTopology: i,
								weightData: n.data,
								weightSpecs: n.specs
							})]
					}
				})
			})
		}, t.className = "Model", __decorate$34([doc()], t.prototype, "compile", null), __decorate$34([doc()], t.prototype, "evaluate", null), __decorate$34([doc()], t.prototype, "predict", null), __decorate$34([doc()], t.prototype, "predictOnBatch", null), __decorate$34([doc()], t.prototype, "fit", null), t = __decorate$34([doc()], t)
	}(Container);
	SerializationMap.register(Model);
	var __extends$14 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$35 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		VALID_FAN_MODE_VALUES = ["fanIn", "fanOut", "fanAvg"],
		VALID_DISTRIBUTION_VALUES = ["normal", "uniform"],
		Initializer = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$14(t, e), t.prototype.fromConfigUsesCustomObjects = function() {
				return !1
			}, t.prototype.getConfig = function() {
				return {}
			}, t = __decorate$35([doc()], t)
		}(Serializable),
		Zeros = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$14(t, e), t.prototype.apply = function(e, t) {
				return zeros(e, t)
			}, t.className = "Zeros", t
		}(Initializer);
	SerializationMap.register(Zeros);
	var Ones = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$14(t, e), t.prototype.apply = function(e, t) {
			return ones(e, t)
		}, t.className = "Ones", t
	}(Initializer);
	SerializationMap.register(Ones);
	var Constant = function(e) {
		function t(t) {
			var r = e.call(this) || this;
			return r.value = t.value, r
		}
		return __extends$14(t, e), t.prototype.apply = function(e, t) {
			var r = this;
			return tidy(function() {
				return scalarTimesArray(scalar(r.value), ones(e, t))
			})
		}, t.prototype.getConfig = function() {
			return {
				value: this.value
			}
		}, t.className = "Constant", t
	}(Initializer);
	SerializationMap.register(Constant);
	var RandomUniform = function(e) {
		function t(t) {
			var r = e.call(this) || this;
			return r.DEFAULT_MINVAL = -.05, r.DEFAULT_MAXVAL = .05, r.minval = t.minval || r.DEFAULT_MINVAL, r.maxval = t.maxval || r.DEFAULT_MAXVAL, r.seed = t.seed, r
		}
		return __extends$14(t, e), t.prototype.apply = function(e, t) {
			return randomUniform(e, this.minval, this.maxval, t)
		}, t.prototype.getConfig = function() {
			return {
				minval: this.minval,
				maxval: this.maxval,
				seed: this.seed
			}
		}, t.className = "RandomUniform", t
	}(Initializer);
	SerializationMap.register(RandomUniform);
	var RandomNormal = function(e) {
		function t(t) {
			var r = e.call(this) || this;
			return r.DEFAULT_MEAN = 0, r.DEFAULT_STDDEV = .05, r.mean = t.mean || r.DEFAULT_MEAN, r.stddev = t.stddev || r.DEFAULT_STDDEV, r.seed = t.seed, r
		}
		return __extends$14(t, e), t.prototype.apply = function(e, t) {
			if ("bool" === t) throw new NotImplementedError("randomNormal does not support dType bool.");
			return randomNormal$1(e, this.mean, this.stddev, t, this.seed)
		}, t.prototype.getConfig = function() {
			return {
				mean: this.mean,
				stddev: this.stddev,
				seed: this.seed
			}
		}, t.className = "RandomNormal", t
	}(Initializer);
	SerializationMap.register(RandomNormal);
	var TruncatedNormal = function(e) {
		function t(t) {
			var r = e.call(this) || this;
			return r.DEFAULT_MEAN = 0, r.DEFAULT_STDDEV = .05, r.mean = t.mean || r.DEFAULT_MEAN, r.stddev = t.stddev || r.DEFAULT_STDDEV, r.seed = t.seed, r
		}
		return __extends$14(t, e), t.prototype.apply = function(e, t) {
			if ("bool" === t) throw new NotImplementedError("truncatedNormal does not support dType bool.");
			return truncatedNormal(e, this.mean, this.stddev, t, this.seed)
		}, t.prototype.getConfig = function() {
			return {
				mean: this.mean,
				stddev: this.stddev,
				seed: this.seed
			}
		}, t.className = "TruncatedNormal", t
	}(Initializer);
	SerializationMap.register(TruncatedNormal);
	var Identity = function(e) {
		function t(t) {
			var r = e.call(this) || this;
			return r.gain = null != t.gain ? scalar(t.gain) : getScalar(1), r
		}
		return __extends$14(t, e), t.prototype.apply = function(e, t) {
			var r = this;
			return tidy(function() {
				if (2 !== e.length || e[0] !== e[1]) throw new ValueError("Identity matrix initializer can only be used for 2D square matrices.");
				return scalarTimesArray(r.gain, eye(e[0]))
			})
		}, t.prototype.getConfig = function() {
			return {
				gain: this.gain.get()
			}
		}, t.className = "Identity", t
	}(Initializer);
	SerializationMap.register(Identity);
	var VarianceScaling = function(e) {
		function t(t) {
			var r = e.call(this) || this;
			if (t.scale < 0) throw new ValueError("scale must be a positive float. Got: " + t.scale);
			return r.scale = null == t.scale ? 1 : t.scale, r.mode = t.mode, checkFanMode(r.mode), r.distribution = t.distribution, checkDistribution(r.distribution), r.seed = t.seed, r
		}
		return __extends$14(t, e), t.prototype.apply = function(e, t) {
			var r = computeFans(e),
				n = r[0],
				a = r[1],
				o = this.scale;
			if ("fanIn" === this.mode ? o /= Math.max(1, n) : "fanOut" === this.mode ? o /= Math.max(1, a) : o /= Math.max(1, (n + a) / 2), "normal" === this.distribution) {
				var i = Math.sqrt(o);
				if ("bool" === t) throw new NotImplementedError(this.getClassName() + " does not support dType bool.");
				return truncatedNormal(e, 0, i, t, this.seed)
			}
			var s = Math.sqrt(3 * o);
			return randomUniform(e, -s, s, t)
		}, t.prototype.getConfig = function() {
			return {
				scale: this.scale,
				mode: this.mode,
				distribution: this.distribution,
				seed: this.seed
			}
		}, t.className = "VarianceScaling", t
	}(Initializer);
	SerializationMap.register(VarianceScaling);
	var GlorotUniform = function(e) {
			function t(t) {
				return e.call(this, {
					scale: 1,
					mode: "fanAvg",
					distribution: "uniform",
					seed: null == t ? null : t.seed
				}) || this
			}
			return __extends$14(t, e), t.prototype.getClassName = function() {
				return VarianceScaling.className
			}, t
		}(VarianceScaling),
		GlorotNormal = function(e) {
			function t(t) {
				return e.call(this, {
					scale: 1,
					mode: "fanAvg",
					distribution: "normal",
					seed: null == t ? null : t.seed
				}) || this
			}
			return __extends$14(t, e), t.prototype.getClassName = function() {
				return VarianceScaling.className
			}, t
		}(VarianceScaling),
		HeNormal = function(e) {
			function t(t) {
				return e.call(this, {
					scale: 2,
					mode: "fanIn",
					distribution: "normal",
					seed: null == t ? null : t.seed
				}) || this
			}
			return __extends$14(t, e), t.prototype.getClassName = function() {
				return VarianceScaling.className
			}, t
		}(VarianceScaling),
		LeCunNormal = function(e) {
			function t(t) {
				return e.call(this, {
					scale: 1,
					mode: "fanIn",
					distribution: "normal",
					seed: null == t ? null : t.seed
				}) || this
			}
			return __extends$14(t, e), t.prototype.getClassName = function() {
				return VarianceScaling.className
			}, t
		}(VarianceScaling),
		Orthogonal = function(e) {
			function t(t) {
				var r = e.call(this) || this;
				if (r.DEFAULT_GAIN = 1, r.gain = null == t.gain ? r.DEFAULT_GAIN : t.gain, r.seed = t.seed, null != r.seed) throw new NotImplementedError("Random seed is not implemented for Orthogonal Initializer yet.");
				return r
			}
			return __extends$14(t, e), t.prototype.apply = function(e, t) {
				var r = this;
				return tidy(function() {
					if (2 !== e.length) throw new NotImplementedError("The Orthogonal Initializer does not support non-2D shapes yet.");
					e[0] * e[1] > 2e3 && console.warn("Orthogonal initializer is being called on a matrix with more than 2000 (" + e[0] * e[1] + ") elements: Slowness may result.");
					var t = randomNormal$1(e[0] > e[1] ? [e[1], e[0]] : e, 0, 1, "float32"),
						n = linalg.gramSchmidt(t);
					return e[0] > e[1] && (n = n.transpose()), scalarTimesArray(getScalar(r.gain), n)
				})
			}, t.prototype.getConfig = function() {
				return {
					gain: this.gain,
					seed: this.seed
				}
			}, t.className = "Orthogonal", t
		}(Initializer);
	SerializationMap.register(Orthogonal);
	var INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP = {
			constant: "Constant",
			glorotNormal: "GlorotNormal",
			glorotUniform: "GlorotUniform",
			heNormal: "HeNormal",
			identity: "Identity",
			leCunNormal: "LeCunNormal",
			ones: "Ones",
			orthogonal: "Orthogonal",
			randomNormal: "RandomNormal",
			randomUniform: "RandomUniform",
			truncatedNormal: "TruncatedNormal",
			varianceScaling: "VarianceScaling",
			zeros: "Zeros"
		},
		__extends$15 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		Activation = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$15(t, e), t.prototype.getConfig = function() {
				return {}
			}, t
		}(Serializable),
		Elu = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$15(t, e), t.prototype.apply = function(e, t) {
				return void 0 === t && (t = 1), elu$1(e, t)
			}, t.className = "elu", t
		}(Activation);
	SerializationMap.register(Elu);
	var Selu = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return selu(e)
		}, t.className = "selu", t
	}(Activation);
	SerializationMap.register(Selu);
	var Relu = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return relu(e)
		}, t.className = "relu", t
	}(Activation);
	SerializationMap.register(Relu);
	var Relu6 = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return tidy(function() {
				return minimum(getScalar(6), relu(e))
			})
		}, t.className = "relu6", t
	}(Activation);
	SerializationMap.register(Relu6);
	var Linear = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return e
		}, t.className = "linear", t
	}(Activation);
	SerializationMap.register(Linear);
	var Sigmoid = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return sigmoid(e)
		}, t.className = "sigmoid", t
	}(Activation);
	SerializationMap.register(Sigmoid);
	var HardSigmoid = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return hardSigmoid(e)
		}, t.className = "hardSigmoid", t
	}(Activation);
	SerializationMap.register(HardSigmoid);
	var Softplus = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return softplus(e)
		}, t.className = "softplus", t
	}(Activation);
	SerializationMap.register(Softplus);
	var Softsign = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return softsign(e)
		}, t.className = "softsign", t
	}(Activation);
	SerializationMap.register(Softsign);
	var Tanh = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e) {
			return tanh$1(e)
		}, t.className = "tanh", t
	}(Activation);
	SerializationMap.register(Tanh);
	var Softmax = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$15(t, e), t.prototype.apply = function(e, t) {
			return void 0 === t && (t = -1), softmax(e, t)
		}, t.className = "softmax", t
	}(Activation);
	SerializationMap.register(Softmax);
	var __extends$16 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		LeakyReLU = function(e) {
			function t(t) {
				var r = e.call(this, null == t ? {} : t) || this;
				return r.DEFAULT_ALPHA = .3, null == t && (t = {}), r.alpha = null == t.alpha ? r.DEFAULT_ALPHA : t.alpha, r
			}
			return __extends$16(t, e), t.prototype.call = function(e, t) {
				var r = getExactlyOneTensor(e);
				return leakyRelu(r, this.alpha)
			}, t.prototype.computeOutputShape = function(e) {
				return e
			}, t.prototype.getConfig = function() {
				var t = {
						alpha: this.alpha
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t.className = "LeakyReLU", t
		}(Layer);
	SerializationMap.register(LeakyReLU);
	var ELU$1 = function(e) {
		function t(t) {
			var r = e.call(this, null == t ? {} : t) || this;
			if (r.DEFAULT_ALPHA = 1, null == t && (t = {}), null != t.alpha && t.alpha !== r.DEFAULT_ALPHA) throw new NotImplementedError("Non-default alpha value (" + t.alpha + ") is not supported by the ELU layer yet.");
			return r.alpha = null == t.alpha ? r.DEFAULT_ALPHA : t.alpha, r
		}
		return __extends$16(t, e), t.prototype.call = function(e, t) {
			var r = getExactlyOneTensor(e);
			return elu(r)
		}, t.prototype.computeOutputShape = function(e) {
			return e
		}, t.prototype.getConfig = function() {
			var t = {
					alpha: this.alpha
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "ELU", t
	}(Layer);
	SerializationMap.register(ELU$1);
	var ThresholdedReLU = function(e) {
		function t(t) {
			var r = e.call(this, null == t ? {} : t) || this;
			return r.DEFAULT_THETA = 1, null == t && (t = {}), r.theta = null == t.theta ? r.DEFAULT_THETA : t.theta, r.thetaTensor = getScalar(r.theta), r
		}
		return __extends$16(t, e), t.prototype.call = function(e, t) {
			var r = getExactlyOneTensor(e);
			return r.mul(cast$1(r.greater(this.thetaTensor), "float32"))
		}, t.prototype.computeOutputShape = function(e) {
			return e
		}, t.prototype.getConfig = function() {
			var t = {
					theta: this.theta
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "ThresholdedReLU", t
	}(Layer);
	SerializationMap.register(ThresholdedReLU);
	var Softmax$1 = function(e) {
		function t(t) {
			var r = e.call(this, null == t ? {} : t) || this;
			return r.DEFAULT_AXIS = 1, null == t && (t = {}), r.softmax = (new Softmax).apply, r.axis = null == t.axis ? r.DEFAULT_AXIS : t.axis, r
		}
		return __extends$16(t, e), t.prototype.call = function(e, t) {
			var r = getExactlyOneTensor(e);
			return this.softmax(r, this.axis)
		}, t.prototype.computeOutputShape = function(e) {
			return e
		}, t.prototype.getConfig = function() {
			var t = {
					axis: this.axis
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "Softmax", t
	}(Layer);
	SerializationMap.register(Softmax$1);
	var __extends$17 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$36 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		Regularizer = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$17(t, e), t
		}(Serializable),
		L1L2 = function(e) {
			function t(t) {
				var r = e.call(this) || this,
					n = null == t || null == t.l1 ? .01 : t.l1,
					a = null == t || null == t.l2 ? .01 : t.l2;
				return r.hasL1 = 0 !== n, r.hasL2 = 0 !== a, r.l1 = getScalar(n), r.l2 = getScalar(a), r
			}
			return __extends$17(t, e), t.prototype.apply = function(e) {
				var t = this;
				return tidy(function() {
					var r = zeros([1]);
					return t.hasL1 && (r = add(r, sum(scalarTimesArray(t.l1, abs(e))))), t.hasL2 && (r = add(r, sum(scalarTimesArray(t.l2, square$1(e))))), r.asScalar()
				})
			}, t.prototype.getConfig = function() {
				return {
					l1: this.l1.dataSync()[0],
					l2: this.l2.dataSync()[0]
				}
			}, t.fromConfig = function(e, t) {
				return new e({
					l1: t.l1,
					l2: t.l2
				})
			}, t.className = "L1L2", t = __decorate$36([doc()], t)
		}(Regularizer);
	SerializationMap.register(L1L2);
	var REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP = {
			l1l2: "L1L2"
		},
		__extends$18 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		Conv = function(e) {
			function t(t, r) {
				var n = e.call(this, r) || this;
				if (n.kernel = null, n.bias = null, n.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", n.DEFAULT_BIAS_INITIALIZER = "zeros", n.rank = t, 1 !== n.rank && 2 !== n.rank) throw new NotImplementedError("Convolution layer for rank other than 1 or 2 (" + n.rank + ") is not implemented yet.");
				if (n.filters = r.filters, n.kernelSize = normalizeArray(r.kernelSize, t, "kernelSize"), n.strides = normalizeArray(null == r.strides ? 1 : r.strides, t, "strides"), n.padding = null == r.padding ? "valid" : r.padding, checkPaddingMode(n.padding), n.dataFormat = null == r.dataFormat ? "channelsLast" : r.dataFormat, checkDataFormat(n.dataFormat), n.dilationRate = null == r.dilationRate ? 1 : r.dilationRate, 1 === n.rank && Array.isArray(n.dilationRate) && 1 !== n.dilationRate.length) throw new ValueError("dilationRate must be a number or an array of a single number for 1D convolution, but received " + JSON.stringify(n.dilationRate));
				if (2 === n.rank)
					if ("number" == typeof n.dilationRate) n.dilationRate = [n.dilationRate, n.dilationRate];
					else if (2 !== n.dilationRate.length) throw new ValueError("dilationRate must be a number or array of two numbers for 2D convolution, but received " + JSON.stringify(n.dilationRate));
				return n.activation = getActivation(r.activation), n.useBias = null == r.useBias || r.useBias, n.kernelInitializer = getInitializer(r.kernelInitializer || n.DEFAULT_KERNEL_INITIALIZER), n.biasInitializer = getInitializer(r.biasInitializer || n.DEFAULT_BIAS_INITIALIZER), n.kernelConstraint = getConstraint(r.kernelConstraint), n.biasConstraint = getConstraint(r.biasConstraint), n.kernelRegularizer = getRegularizer(r.kernelRegularizer), n.biasRegularizer = getRegularizer(r.biasRegularizer), n.activityRegularizer = getRegularizer(r.activityRegularizer), n
			}
			return __extends$18(t, e), t.prototype.build = function(e) {
				e = getExactlyOneShape(e);
				var t = "channelsFirst" === this.dataFormat ? 1 : e.length - 1;
				if (null == e[t]) throw new ValueError("The channel dimension of the input should be defined. Found " + e[t]);
				var r = e[t],
					n = this.kernelSize.concat([r, this.filters]);
				this.kernel = this.addWeight("kernel", n, null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.useBias && (this.bias = this.addWeight("bias", [this.filters], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint)), this.inputSpec = [{
					ndim: this.rank + 2,
					axes: (a = {}, a[t] = r, a)
				}], this.built = !0;
				var a
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					e = getExactlyOneTensor(e);
					var t, n = null == r.bias ? null : r.bias.read();
					if (1 === r.rank) t = conv1dWithBias(e, r.kernel.read(), n, r.strides[0], r.padding, r.dataFormat, r.dilationRate);
					else if (2 === r.rank) t = conv2dWithBias(e, r.kernel.read(), n, r.strides, r.padding, r.dataFormat, r.dilationRate);
					else if (3 === r.rank) throw new NotImplementedError("3D convolution is not implemented yet.");
					return null != r.activation && (t = r.activation.apply(t)), t
				})
			}, t.prototype.computeOutputShape = function(e) {
				e = getExactlyOneShape(e);
				for (var t = [], r = "channelsLast" === this.dataFormat ? e.slice(1, e.length - 1) : e.slice(2), n = 0; n < r.length; ++n) {
					var a = convOutputLength(r[n], this.kernelSize[n], this.padding, this.strides[n], "number" == typeof this.dilationRate ? this.dilationRate : this.dilationRate[n]);
					t.push(a)
				}
				var o = [e[0]];
				return "channelsLast" === this.dataFormat ? (o = o.concat(t)).push(this.filters) : (o.push(this.filters), o = o.concat(t)), o
			}, t.prototype.getConfig = function() {
				var t = {
						rank: this.rank,
						filters: this.filters,
						kernelSize: this.kernelSize,
						strides: this.strides,
						padding: this.padding,
						dataFormat: this.dataFormat,
						dilationRate: this.dilationRate,
						activation: serializeActivation(this.activation),
						useBias: this.useBias,
						kernelInitializer: serializeInitializer(this.kernelInitializer),
						biasInitializer: serializeInitializer(this.biasInitializer),
						kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
						biasRegularizer: serializeRegularizer(this.biasRegularizer),
						activityRegularizer: serializeRegularizer(this.activityRegularizer),
						kernelConstraint: serializeConstraint(this.kernelConstraint),
						biasConstraint: serializeConstraint(this.biasConstraint)
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t
		}(Layer),
		Conv2D = function(e) {
			function t(t) {
				return e.call(this, 2, t) || this
			}
			return __extends$18(t, e), t.prototype.getConfig = function() {
				var t = e.prototype.getConfig.call(this);
				return delete t.rank, t
			}, t.className = "Conv2D", t
		}(Conv);
	SerializationMap.register(Conv2D);
	var Conv2DTranspose = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			if (r.inputSpec = [new InputSpec({
					ndim: 4
				})], "same" !== r.padding && "valid" !== r.padding) throw new ValueError("Conv2DTranspose currently supports only padding modes 'same' and 'valid', but received padding mode " + r.padding);
			return r
		}
		return __extends$18(t, e), t.prototype.build = function(e) {
			if (4 !== (e = getExactlyOneShape(e)).length) throw new ValueError("Input should have rank 4; Received input shape: " + JSON.stringify(e));
			var t = "channelsFirst" === this.dataFormat ? 1 : e.length - 1;
			if (null == e[t]) throw new ValueError("The channel dimension of the inputs should be defined. Found `None`.");
			var r = e[t],
				n = this.kernelSize.concat([this.filters, r]);
			this.kernel = this.addWeight("kernel", n, "float32", this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.useBias && (this.bias = this.addWeight("bias", [this.filters], "float32", this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint)), this.inputSpec = [new InputSpec({
				ndim: 4,
				axes: (a = {}, a[t] = r, a)
			})], this.built = !0;
			var a
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				var t = getExactlyOneTensor(e);
				if (4 !== t.shape.length) throw new ValueError("Conv2DTranspose.call() expects input tensor to be rank-4, but received a tensor of rank-" + t.shape.length);
				var n, a, o = t.shape,
					i = o[0];
				"channelsFirst" === r.dataFormat ? (n = 2, a = 3) : (n = 1, a = 2);
				var s = o[n],
					u = o[a],
					l = r.kernelSize[0],
					c = r.kernelSize[1],
					p = r.strides[0],
					d = r.strides[1],
					h = [i, deconvLength(s, p, l, r.padding), deconvLength(u, d, c, r.padding), r.filters];
				"channelsLast" !== r.dataFormat && (t = transpose(t, [0, 2, 3, 1]));
				var f = conv2dTranspose(t, r.kernel.read(), h, r.strides, r.padding);
				return "channelsLast" !== r.dataFormat && (f = transpose(f, [0, 3, 1, 2])), null != r.bias && (f = biasAdd(f, r.bias.read(), r.dataFormat)), null != r.activation && (f = r.activation.apply(f)), f
			})
		}, t.prototype.computeOutputShape = function(e) {
			var t, r, n, a = (e = getExactlyOneShape(e)).slice();
			"channelsFirst" === this.dataFormat ? (t = 1, r = 2, n = 3) : (t = 3, r = 1, n = 2);
			var o = this.kernelSize[0],
				i = this.kernelSize[1],
				s = this.strides[0],
				u = this.strides[1];
			return a[t] = this.filters, a[r] = deconvLength(a[r], s, o, this.padding), a[n] = deconvLength(a[n], u, i, this.padding), a
		}, t.prototype.getConfig = function() {
			var t = e.prototype.getConfig.call(this);
			return delete t.dilationRate, t
		}, t.className = "Conv2DTranspose", t
	}(Conv2D);
	SerializationMap.register(Conv2DTranspose);
	var SeparableConv = function(e) {
			function t(t, r) {
				var n = e.call(this, t, r) || this;
				if (n.DEFAULT_DEPTHWISE_INITIALIZER = "glorotUniform", n.DEFAULT_POINTWISE_INITIALIZER = "glorotUniform", n.depthwiseKernel = null, n.pointwiseKernel = null, null == r.filters) throw new ValueError("The `filters` configuration field is required by SeparableConv, but is unspecified.");
				if (null != r.kernelInitializer || null != r.kernelRegularizer || null != r.kernelConstraint) throw new ValueError("Fields kernelInitializer, kernelRegularizer and kernelConstraint are invalid for SeparableConv2D. Use depthwiseInitializer, depthwiseRegularizer, depthwiseConstraint, pointwiseInitializer, pointwiseRegularizer and pointwiseConstraint instead.");
				if (null != r.padding && "same" !== r.padding && "valid" !== r.padding) throw new ValueError("SeparableConv" + n.rank + "D supports only padding modes: 'same' and 'valid', but received " + JSON.stringify(r.padding));
				return n.depthMultiplier = null == r.depthMultiplier ? 1 : r.depthMultiplier, n.depthwiseInitializer = getInitializer(r.depthwiseInitializer || n.DEFAULT_DEPTHWISE_INITIALIZER), n.depthwiseRegularizer = getRegularizer(r.depthwiseRegularizer), n.depthwiseConstraint = getConstraint(r.depthwiseConstraint), n.pointwiseInitializer = getInitializer(r.depthwiseInitializer || n.DEFAULT_POINTWISE_INITIALIZER), n.pointwiseRegularizer = getRegularizer(r.pointwiseRegularizer), n.pointwiseConstraint = getConstraint(r.pointwiseConstraint), n
			}
			return __extends$18(t, e), t.prototype.build = function(e) {
				if ((e = getExactlyOneShape(e)).length < this.rank + 2) throw new ValueError("Inputs to SeparableConv" + this.rank + "D should have rank " + (this.rank + 2) + ", but received input shape: " + JSON.stringify(e));
				var t = "channelsFirst" === this.dataFormat ? 1 : e.length - 1;
				if (null == e[t] || e[t] < 0) throw new ValueError("The channel dimension of the inputs should be defined, but found " + JSON.stringify(e[t]));
				for (var r = e[t], n = this.kernelSize.concat([r, this.depthMultiplier]), a = [], o = 0; o < this.rank; ++o) a.push(1);
				a.push(r * this.depthMultiplier, this.filters);
				this.depthwiseKernel = this.addWeight("depthwise_kernel", n, "float32", this.depthwiseInitializer, this.depthwiseRegularizer, !0, this.depthwiseConstraint), this.pointwiseKernel = this.addWeight("pointwise_kernel", a, "float32", this.pointwiseInitializer, this.pointwiseRegularizer, !0, this.pointwiseConstraint), this.useBias ? this.bias = this.addWeight("bias", [this.filters], "float32", this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint) : this.bias = null, this.inputSpec = [new InputSpec({
					ndim: this.rank + 2,
					axes: (i = {}, i[t] = r, i)
				})], this.built = !0;
				var i
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					e = getExactlyOneTensor(e);
					var t;
					if (1 === r.rank) throw new NotImplementedError("1D separable convolution is not implemented yet.");
					return 2 === r.rank && ("channelsFirst" === r.dataFormat && (e = transpose(e, [0, 2, 3, 1])), t = separableConv2d(e, r.depthwiseKernel.read(), r.pointwiseKernel.read(), r.strides, r.padding, r.dilationRate, "NHWC")), r.useBias && (t = biasAdd(t, r.bias.read(), r.dataFormat)), null != r.activation && (t = r.activation.apply(t)), "channelsFirst" === r.dataFormat && (t = transpose(t, [0, 3, 1, 2])), t
				})
			}, t.prototype.getConfig = function() {
				var t = e.prototype.getConfig.call(this);
				return delete t.rank, delete t.kernelInitializer, delete t.kernelRegularizer, delete t.kernelConstraint, t.depthwiseInitializer = serializeInitializer(this.depthwiseInitializer), t.pointwiseInitializer = serializeInitializer(this.pointwiseInitializer), t.depthwiseRegularizer = serializeRegularizer(this.depthwiseRegularizer), t.pointwiseRegularizer = serializeRegularizer(this.pointwiseRegularizer), t.depthwiseConstraint = serializeConstraint(this.depthwiseConstraint), t.pointwiseConstraint = serializeConstraint(this.pointwiseConstraint), t
			}, t.className = "SeparableConv", t
		}(Conv),
		SeparableConv2D = function(e) {
			function t(t) {
				return e.call(this, 2, t) || this
			}
			return __extends$18(t, e), t.className = "SeparableConv2D", t
		}(SeparableConv);
	SerializationMap.register(SeparableConv2D);
	var Conv1D = function(e) {
		function t(t) {
			var r = e.call(this, 1, t) || this;
			return r.inputSpec = [{
				ndim: 3
			}], r
		}
		return __extends$18(t, e), t.prototype.getConfig = function() {
			var t = e.prototype.getConfig.call(this);
			return delete t.rank, delete t.dataFormat, t
		}, t.className = "Conv1D", t
	}(Conv);
	SerializationMap.register(Conv1D);
	var Cropping2D = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			return "number" == typeof t.cropping ? r.cropping = [
				[t.cropping, t.cropping],
				[t.cropping, t.cropping]
			] : "number" == typeof t.cropping[0] ? r.cropping = [
				[t.cropping[0], t.cropping[0]],
				[t.cropping[1], t.cropping[1]]
			] : r.cropping = t.cropping, r.dataFormat = void 0 === t.dataFormat ? "channelsLast" : t.dataFormat, r.inputSpec = [{
				ndim: 4
			}], r
		}
		return __extends$18(t, e), t.prototype.computeOutputShape = function(e) {
			return "channelsFirst" === this.dataFormat ? [e[0], e[1], e[2] - this.cropping[0][0] - this.cropping[0][1], e[2] - this.cropping[1][0] - this.cropping[1][1]] : [e[0], e[1] - this.cropping[0][0] - this.cropping[0][1], e[2] - this.cropping[1][0] - this.cropping[1][1], e[3]]
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				if (e = getExactlyOneTensor(e), "channelsLast" === r.dataFormat) return sliceAlongAxis(t = sliceAlongAxis(e, r.cropping[0][0], e.shape[1] - r.cropping[0][0] - r.cropping[0][1], 2), r.cropping[1][0], e.shape[2] - r.cropping[1][1] - r.cropping[1][0], 3);
				var t = sliceAlongAxis(e, r.cropping[0][0], e.shape[2] - r.cropping[0][0] - r.cropping[0][1], 3);
				return sliceAlongAxis(t, r.cropping[1][0], e.shape[3] - r.cropping[1][1] - r.cropping[1][0], 4)
			})
		}, t.prototype.getConfig = function() {
			var t = {
					cropping: this.cropping,
					dataFormat: this.dataFormat
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "Cropping2D", t
	}(Layer);
	SerializationMap.register(Cropping2D);
	var UpSampling2D = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			return r.DEFAULT_SIZE = [2, 2], r.inputSpec = [{
				ndim: 4
			}], r.size = void 0 === t.size ? r.DEFAULT_SIZE : t.size, r.dataFormat = void 0 === t.dataFormat ? "channelsLast" : t.dataFormat, r
		}
		return __extends$18(t, e), t.prototype.computeOutputShape = function(e) {
			if ("channelsFirst" === this.dataFormat) {
				var t = this.size[0] * e[2],
					r = this.size[1] * e[3];
				return [e[0], e[1], t, r]
			}
			var t = this.size[0] * e[1],
				r = this.size[1] * e[2];
			return [e[0], t, r, e[3]]
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				var t = getExactlyOneTensor(e),
					n = t.shape;
				if ("channelsFirst" === r.dataFormat) {
					t = transpose(t, [0, 2, 3, 1]);
					var a = r.size[0] * n[2],
						o = r.size[1] * n[3],
						i = t.resizeNearestNeighbor([a, o]);
					return transpose(i, [0, 3, 1, 2])
				}
				var a = r.size[0] * n[1],
					o = r.size[1] * n[2];
				return t.resizeNearestNeighbor([a, o])
			})
		}, t.prototype.getConfig = function() {
			var t = {
					size: this.size,
					dataFormat: this.dataFormat
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "UpSampling2D", t
	}(Layer);
	SerializationMap.register(UpSampling2D);
	var __extends$19 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		DepthwiseConv2D = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				return r.depthwiseKernel = null, r.depthMultiplier = null == t.depthMultiplier ? 1 : t.depthMultiplier, r.depthwiseInitializer = getInitializer(t.depthwiseInitializer || r.DEFAULT_KERNEL_INITIALIZER), r.depthwiseConstraint = getConstraint(t.depthwiseConstraint), r.depthwiseRegularizer = getRegularizer(t.depthwiseRegularizer), r
			}
			return __extends$19(t, e), t.prototype.build = function(e) {
				if ((e = getExactlyOneShape(e)).length < 4) throw new ValueError("Inputs to DepthwiseConv2D should have rank 4. Received input shape: " + JSON.stringify(e) + ".");
				var t = "channelsFirst" === this.dataFormat ? 1 : 3;
				if (null == e[t] || e[t] < 0) throw new ValueError("The channel dimension of the inputs to DepthwiseConv2D should be defined, but is not (" + e[t] + ").");
				var r = e[t],
					n = [this.kernelSize[0], this.kernelSize[1], r, this.depthMultiplier];
				this.depthwiseKernel = this.addWeight("depthwise_kernel", n, null, this.depthwiseInitializer, this.depthwiseRegularizer, !0, this.depthwiseConstraint), this.useBias ? this.bias = this.addWeight("bias", [r * this.depthMultiplier], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint) : this.bias = null, this.built = !0
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					var t = depthwiseConv2d$1(e = getExactlyOneTensor(e), r.depthwiseKernel.read(), r.strides, r.padding, r.dataFormat, null);
					return r.useBias && (t = biasAdd(t, r.bias.read(), r.dataFormat)), null != r.activation && (t = r.activation.apply(t)), t
				})
			}, t.prototype.computeOutputShape = function(e) {
				e = getExactlyOneShape(e);
				var t = "channelsFirst" === this.dataFormat ? e[2] : e[1],
					r = "channelsFirst" === this.dataFormat ? e[3] : e[2],
					n = "channelsFirst" === this.dataFormat ? e[1] * this.depthMultiplier : e[3] * this.depthMultiplier,
					a = convOutputLength(t, this.kernelSize[0], this.padding, this.strides[0]),
					o = convOutputLength(r, this.kernelSize[1], this.padding, this.strides[1]);
				return "channelsFirst" === this.dataFormat ? [e[0], n, a, o] : [e[0], a, o, n]
			}, t.className = "DepthwiseConv2D", t
		}(Conv2D);
	SerializationMap.register(DepthwiseConv2D);
	var __extends$20 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		Dropout = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				if (r.rate = Math.max(Math.min(t.rate, 1), 0), r.rateScalar = getScalar(r.rate), r.noiseShape = t.noiseShape, r.seed = t.seed, null != r.seed) throw new NotImplementedError("Non-default seed is not implemented in Dropout layer yet: " + r.seed);
				return r.supportsMasking = !0, r
			}
			return __extends$20(t, e), t.prototype.getNoiseShape = function(e) {
				if (null == this.noiseShape) return this.noiseShape;
				for (var t = e.shape, r = [], n = 0; n < this.noiseShape.length; ++n) r.push(null == this.noiseShape[n] ? t[n] : this.noiseShape[n]);
				return r
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					r.invokeCallHook(e, t);
					var n = getExactlyOneTensor(e);
					if (null != r.noiseShape && !arraysEqual(n.shape, r.noiseShape)) throw new NotImplementedError("Non-default noise shape is not implemented in Dropout layer yet: " + JSON.stringify(r.noiseShape));
					if (0 < r.rate && r.rate < 1) {
						var a = null != t.training && t.training,
							o = r.getNoiseShape(n);
						return inTrainPhase(function() {
							return dropout(n, r.rateScalar, o, r.seed)
						}, function() {
							return n
						}, a)
					}
					return e
				})
			}, t.prototype.getConfig = function() {
				var t = {
						rate: this.rate,
						noiseShape: this.noiseShape,
						seed: this.seed
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t.className = "Dropout", t
		}(Layer);
	SerializationMap.register(Dropout);
	var Dense = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			if (r.activation = null, r.useBias = !0, r.kernel = null, r.bias = null, r.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", r.DEFAULT_BIAS_INITIALIZER = "zeros", null == t.batchInputShape && null == t.inputShape && null != t.inputDim) {
				var n = null;
				null != t.batchSize && (n = t.batchSize), r.batchInputShape = [n, t.inputDim]
			}
			return r.units = t.units, r.activation = getActivation(t.activation), null != t.useBias && (r.useBias = t.useBias), r.kernelInitializer = getInitializer(t.kernelInitializer || r.DEFAULT_KERNEL_INITIALIZER), r.biasInitializer = getInitializer(t.biasInitializer || r.DEFAULT_BIAS_INITIALIZER), r.kernelConstraint = getConstraint(t.kernelConstraint), r.biasConstraint = getConstraint(t.biasConstraint), r.kernelRegularizer = getRegularizer(t.kernelRegularizer), r.biasRegularizer = getRegularizer(t.biasRegularizer), r.activityRegularizer = getRegularizer(t.activityRegularizer), r.inputSpec = [{
				minNDim: 2
			}], r
		}
		return __extends$20(t, e), t.prototype.build = function(e) {
			var t = (e = getExactlyOneShape(e))[e.length - 1];
			null == this.kernel && (this.kernel = this.addWeight("kernel", [t, this.units], null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.useBias && (this.bias = this.addWeight("bias", [this.units], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint))), this.inputSpec = [{
				minNDim: 2,
				axes: (r = {}, r[-1] = t, r)
			}], this.built = !0;
			var r
		}, t.prototype.computeOutputShape = function(e) {
			var t = (e = getExactlyOneShape(e)).slice();
			return t[t.length - 1] = this.units, t
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				r.invokeCallHook(e, t);
				var n = dot$1(getExactlyOneTensor(e), r.kernel.read());
				return null != r.bias && (n = biasAdd(n, r.bias.read())), null != r.activation && (n = r.activation.apply(n)), n
			})
		}, t.prototype.getConfig = function() {
			var t = {
					units: this.units,
					activation: serializeActivation(this.activation),
					useBias: this.useBias,
					kernelInitializer: serializeInitializer(this.kernelInitializer),
					biasInitializer: serializeInitializer(this.biasInitializer),
					kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
					biasRegularizer: serializeRegularizer(this.biasRegularizer),
					activityRegularizer: serializeRegularizer(this.activityRegularizer),
					kernelConstraint: serializeConstraint(this.kernelConstraint),
					biasConstraint: serializeConstraint(this.biasConstraint)
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "Dense", t
	}(Layer);
	SerializationMap.register(Dense);
	var Flatten = function(e) {
		function t(t) {
			var r = e.call(this, t || {}) || this;
			return r.inputSpec = [{
				minNDim: 3
			}], r
		}
		return __extends$20(t, e), t.prototype.computeOutputShape = function(e) {
			for (var t = 0, r = (e = getExactlyOneShape(e)).slice(1); t < r.length; t++)
				if (null == r[t]) throw new ValueError('The shape of the input to "Flatten" is not fully defined (got ' + e.slice(1) + '). Make sure to pass a complete "input_shape" or "batch_input_shape" argument to the first layer in your model.');
			return [e[0], arrayProd(e, 1)]
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				return r.invokeCallHook(e, t), batchFlatten(getExactlyOneTensor(e))
			})
		}, t.className = "Flatten", t
	}(Layer);
	SerializationMap.register(Flatten);
	var Activation$1 = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			return r.supportsMasking = !0, r.activation = getActivation(t.activation), r
		}
		return __extends$20(t, e), t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				r.invokeCallHook(e, t);
				var n = getExactlyOneTensor(e);
				return r.activation.apply(n)
			})
		}, t.prototype.getConfig = function() {
			var t = {
					activation: serializeActivation(this.activation)
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "Activation", t
	}(Layer);
	SerializationMap.register(Activation$1);
	var RepeatVector = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			return r.n = t.n, r.inputSpec = [{
				ndim: 2
			}], r
		}
		return __extends$20(t, e), t.prototype.computeOutputShape = function(e) {
			return [e[0], this.n, e[1]]
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				return e = getExactlyOneTensor(e), repeat(e, r.n)
			})
		}, t.prototype.getConfig = function() {
			var t = {
					n: this.n
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "RepeatVector", t
	}(Layer);
	SerializationMap.register(RepeatVector);
	var Reshape = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			r.targetShape = t.targetShape;
			for (var n = 0; n < r.targetShape.length; ++n) r.isUnknown(r.targetShape[n]) && (r.targetShape[n] = null);
			return r
		}
		return __extends$20(t, e), t.prototype.isUnknown = function(e) {
			return e < 0 || null == e
		}, t.prototype.fixUnknownDimension = function(e, t) {
			for (var r = "Total size of new array must be unchanged.", n = t.slice(), a = 1, o = null, i = 0; i < n.length; ++i) {
				var s = n[i];
				if (this.isUnknown(s)) {
					if (null !== o) throw new ValueError("Can only specifiy one unknown dimension.");
					o = i
				} else a *= s
			}
			var u = arrayProd(e);
			if (null !== o) {
				if (0 === a || u % a != 0) throw new ValueError(r);
				n[o] = u / a
			} else if (u !== a) throw new ValueError(r);
			return n
		}, t.prototype.computeOutputShape = function(e) {
			for (var t = !1, r = 0; r < e.length; ++r)
				if (this.isUnknown(e[r])) {
					t = !0;
					break
				} return t ? e.slice(0, 1).concat(this.targetShape) : e.slice(0, 1).concat(this.fixUnknownDimension(e.slice(1), this.targetShape))
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				r.invokeCallHook(e, t);
				var n = getExactlyOneTensor(e),
					a = shape(n),
					o = a.slice(0, 1).concat(r.fixUnknownDimension(a.slice(1), r.targetShape));
				return n.reshape(o)
			})
		}, t.prototype.getConfig = function() {
			var t = {
					targetShape: this.targetShape
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "Reshape", t
	}(Layer);
	SerializationMap.register(Reshape);
	var __extends$21 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		Embedding = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				if (r.embeddings = null, r.DEFAULT_EMBEDDINGS_INITIALIZER = "randomUniform", null == t.batchInputShape && null == t.inputShape) {
					var n = null;
					null != t.batchSize && (n = t.batchSize), null == t.inputLength ? r.batchInputShape = [n, null] : r.batchInputShape = [n].concat(toList(t.inputLength))
				}
				return r.inputDim = t.inputDim, r.outputDim = t.outputDim, r.embeddingsInitializer = getInitializer(t.embeddingsInitializer || r.DEFAULT_EMBEDDINGS_INITIALIZER), r.embeddingsRegularizer = getRegularizer(t.embeddingsRegularizer), r.activityRegularizer = getRegularizer(t.activityRegularizer), r.embeddingsConstraint = getConstraint(t.embeddingsConstraint), r.maskZero = t.maskZero, r.inputLength = t.inputLength, r
			}
			return __extends$21(t, e), t.prototype.build = function(e) {
				this.embeddings = this.addWeight("embeddings", [this.inputDim, this.outputDim], this.dtype, this.embeddingsInitializer, this.embeddingsRegularizer, !0, this.embeddingsConstraint), this.built = !0
			}, t.prototype.computeMask = function(e, t) {
				throw new NotImplementedError("computeMask has not been implemented for Embedding yet")
			}, t.prototype.computeOutputShape = function(e) {
				if (e = getExactlyOneShape(e), null == this.inputLength) return e.concat([this.outputDim]);
				var t = toList(this.inputLength);
				if (t.length !== e.length - 1) throw new ValueError('"inputLength" is ' + this.inputLength + ", but received input shape has shape " + e);
				for (var r = 0, n = 0; n < t.length; ++n) {
					var a = t[n],
						o = e[n + 1];
					if (null != a && null != o && a !== o) throw new ValueError('"inputLength" is ' + this.inputLength + ", but received input shape has shape " + e);
					null == a && (t[r] = o), r++
				}
				return [e[0]].concat(t, [this.outputDim])
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					r.invokeCallHook(e, t);
					var n = getExactlyOneTensor(e);
					return "int32" !== dtype(n) && (n = cast$1(n, "int32")), gather$1(r.embeddings.read(), n.as1D()).reshape(getExactlyOneShape(r.computeOutputShape(n.shape)))
				})
			}, t.prototype.getConfig = function() {
				var t = {
						inputDim: this.inputDim,
						outputDim: this.outputDim,
						embeddingsInitializer: serializeInitializer(this.embeddingsInitializer),
						embeddingsRegularizer: serializeRegularizer(this.embeddingsRegularizer),
						activityRegularizer: serializeRegularizer(this.activityRegularizer),
						embeddingsConstraint: serializeConstraint(this.embeddingsConstraint),
						maskZero: this.maskZero,
						inputLength: this.inputLength
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t.className = "Embedding", t
		}(Layer);
	SerializationMap.register(Embedding);
	var __extends$22 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		Merge = function(e) {
			function t(t) {
				var r = e.call(this, t || {}) || this;
				return r.supportsMasking = !0, r
			}
			return __extends$22(t, e), t.prototype.mergeFunction = function(e) {
				throw new NotImplementedError
			}, t.prototype.computeElementwiseOpOutputShape = function(e, t) {
				if (null == e || null == t) return null;
				if (e.length < t.length) return this.computeElementwiseOpOutputShape(t, e);
				if (0 === t.length) return e;
				for (var r = e.slice(0, e.length - t.length), n = 0; n < t.length; ++n) {
					var a = e[e.length - t.length + n],
						o = t[n];
					if (null == a || null == o || a < 0 || o < 0) r.push(null);
					else if (1 === a) r.push(o);
					else if (1 === o) r.push(a);
					else {
						if (a !== o) throw new ValueError("Operands could not be broadcast together with shapes " + JSON.stringify(e) + " " + JSON.stringify(t));
						r.push(a)
					}
				}
				return r
			}, t.prototype.build = function(e) {
				if (Array.isArray(e) && !Array.isArray(e[0]) && (e = [getExactlyOneShape(e)]), (e = e).length < 2) throw new ValueError("A merge layer should be called on an Array of at least 2 inputs. Got " + e.length + " input(s).");
				for (var t = [], r = 0, n = e; r < n.length; r++) null != (i = n[r]) && null !== i[0] && t.push(i[0]);
				if ((t = unique(t)).length > 1) throw new ValueError("Can not merge tensors with different batch sizes. Got tensors with shapes: " + JSON.stringify(e) + ".");
				for (var a = null == e[0] ? null : e[0].slice(1), o = 1; o < e.length; ++o) {
					var i = null == e[o] ? null : e[o].slice(1);
					a = this.computeElementwiseOpOutputShape(a, i)
				}
				var s = e.map(function(e) {
					return e.length
				}); - 1 === e.indexOf(null) && 1 === unique(s).length ? this.reshapeRequired = !1 : this.reshapeRequired = !0
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					if (e = e, r.reshapeRequired) {
						var t = [],
							n = e.map(function(e) {
								return e.rank
							});
						if (-1 === n.indexOf(null)) {
							for (var a = max$1(n), o = 0, i = e; o < i.length; o++) {
								for (var s = (d = i[o]).rank, u = 0; u < a - s; ++u) d = expandDims$1(d, 1);
								t.push(d)
							}
							return r.mergeFunction(t)
						}
						for (var l = !1, c = 0, p = e; c < p.length; c++) {
							var d = p[c];
							if (null == (s = d.rank)) {
								var h = shape(d),
									f = h[0],
									m = h.slice(1).concat([f]),
									g = d.reshape([f].concat(arrayProd(h.slice(1))));
								g = (g = transpose(g, [1, 0])).reshape(m), t.push(g), l = !0
							} else if (s > 1) {
								x = range$1(1, s).concat([0]);
								t.push(transpose(d, x)), l = !0
							} else t.push(d)
						}
						var y = r.mergeFunction(t),
							v = y.rank;
						if (l)
							if (null == v) {
								var b = shape(y),
									m = [f = b[b.length - 1]].concat(b.slice(0, b.length - 1));
								y = transpose(y.reshape([-1, f]), [1, 0]).reshape(m)
							} else if (v > 1) {
							var x = [v - 1].concat(range$1(0, v - 1));
							y = transpose(y, x)
						}
						return y
					}
					return r.mergeFunction(e)
				})
			}, t.prototype.computeOutputShape = function(e) {
				var t;
				t = null == (e = e)[0] ? null : e[0].slice(1);
				for (var r = 1; r < e.length; ++r) {
					var n = null == e[r] ? null : e[r].slice(1);
					t = this.computeElementwiseOpOutputShape(t, n)
				}
				for (var a = [], o = 0, i = e; o < i.length; o++) null != (n = i[o]) && null !== n[0] && a.push(n[0]);
				return a = unique(a), t = 1 === a.length ? a.concat(t) : [null].concat(t)
			}, t
		}(Layer),
		Add = function(e) {
			function t(t) {
				return e.call(this, t) || this
			}
			return __extends$22(t, e), t.prototype.mergeFunction = function(e) {
				return tidy(function() {
					for (var t = zeros(e[0].shape), r = 0, n = e; r < n.length; r++) {
						var a = n[r];
						t = add(t, a)
					}
					return t
				})
			}, t.className = "Add", t
		}(Merge);
	SerializationMap.register(Add);
	var Multiply = function(e) {
		function t(t) {
			return e.call(this, t) || this
		}
		return __extends$22(t, e), t.prototype.mergeFunction = function(e) {
			return tidy(function() {
				for (var t = ones(e[0].shape), r = 0, n = e; r < n.length; r++) {
					var a = n[r];
					t = mul(t, a)
				}
				return t
			})
		}, t.className = "Multiply", t
	}(Merge);
	SerializationMap.register(Multiply);
	var Average = function(e) {
		function t(t) {
			return e.call(this, t) || this
		}
		return __extends$22(t, e), t.prototype.mergeFunction = function(e) {
			return tidy(function() {
				for (var t = zeros(e[0].shape), r = 0, n = e; r < n.length; r++) {
					var a = n[r];
					t = add(t, a)
				}
				return scalarTimesArray(getScalar(1 / e.length), t)
			})
		}, t.className = "Average", t
	}(Merge);
	SerializationMap.register(Average);
	var Maximum = function(e) {
		function t(t) {
			return e.call(this, t) || this
		}
		return __extends$22(t, e), t.prototype.mergeFunction = function(e) {
			return tidy(function() {
				for (var t = e[0], r = 1; r < e.length; ++r) t = maximum(t, e[r]);
				return t
			})
		}, t.className = "Maximum", t
	}(Merge);
	SerializationMap.register(Maximum);
	var Minimum = function(e) {
		function t(t) {
			return e.call(this, t) || this
		}
		return __extends$22(t, e), t.prototype.mergeFunction = function(e) {
			return tidy(function() {
				for (var t = e[0], r = 1; r < e.length; ++r) t = minimum(t, e[r]);
				return t
			})
		}, t.className = "Minimum", t
	}(Merge);
	SerializationMap.register(Minimum);
	var Concatenate = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			return r.DEFAULT_AXIS = -1, null == t && (t = {}), r.axis = null == t.axis ? r.DEFAULT_AXIS : t.axis, r.supportsMasking = !0, r.reshapeRequired = !1, r
		}
		return __extends$22(t, e), t.prototype.build = function(e) {
			if (!Array.isArray(e) || !Array.isArray(e[0]) || 1 === e.length) throw new ValueError("A `Concatenate` layer should be called on a list of at least 2 inputs");
			for (var t = !0, r = 0, n = e = e; r < n.length; r++)
				if (null != (c = n[r])) {
					t = !1;
					break
				} if (!t) {
				for (var a = [], o = 0; o < e.length; ++o) {
					var i = e[o].slice();
					i.splice(this.axis, 1);
					for (var s = !1, u = 0, l = a; u < l.length; u++) {
						var c = l[u];
						if (arraysEqual(c, i)) {
							s = !0;
							break
						}
					}
					s || a.push(i)
				}
				if (a.length > 1) throw new ValueError("A `Concatenate` layer requires inputs with matching shapes except for the concat axis. Got input shapes: " + JSON.stringify(e))
			}
		}, t.prototype.mergeFunction = function(e) {
			var t = this;
			return tidy(function() {
				return concatenate(e, t.axis)
			})
		}, t.prototype.computeOutputShape = function(e) {
			if (!Array.isArray(e) || !Array.isArray(e[0])) throw new ValueError("A `Concatenate` layer should be called on a list of inputs.");
			for (var t = e, r = t[0].slice(), n = this.axis < 0 ? r.length + this.axis : this.axis, a = 0, o = t.slice(1); a < o.length; a++) {
				var i = o[a];
				if (null == r[n] || null == i[n]) {
					r[n] = null;
					break
				}
				r[n] += i[n]
			}
			return r
		}, t.prototype.getConfig = function() {
			var t = {
					axis: this.axis
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "Concatenate", t
	}(Merge);
	SerializationMap.register(Concatenate);
	var __extends$23 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		BatchNormalization = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				return r.supportsMasking = !0, r.axis = null == t.axis ? -1 : t.axis, r.momentum = null == t.momentum ? .99 : t.momentum, r.epsilon = null == t.epsilon ? .001 : t.epsilon, r.center = null == t.center || t.center, r.scale = null == t.scale || t.scale, r.betaInitializer = getInitializer(t.betaInitializer || "zeros"), r.gammaInitializer = getInitializer(t.gammaInitializer || "ones"), r.movingMeanInitializer = getInitializer(t.movingMeanInitializer || "zeros"), r.movingVarianceInitializer = getInitializer(t.movingVarianceInitializer || "ones"), r.betaConstraint = getConstraint(t.betaConstraint), r.gammaConstraint = getConstraint(t.gammaConstraint), r.betaRegularizer = getRegularizer(t.betaRegularizer), r.gammaRegularizer = getRegularizer(t.gammaRegularizer), r.stepCount = 0, r
			}
			return __extends$23(t, e), t.prototype.build = function(e) {
				e = getExactlyOneShape(e);
				var t = this.axis >= 0 ? this.axis : this.axis + e.length,
					r = e[t];
				if (null == r) throw new ValueError("Axis " + t + " of input tensor should have a defined dimension but the layer received an input with shape " + JSON.stringify(e) + ".");
				this.inputSpec = [new InputSpec({
					ndim: e.length,
					axes: (a = {}, a[t] = r, a)
				})];
				var n = [r];
				this.scale && (this.gamma = this.addWeight("gamma", n, null, this.gammaInitializer, this.gammaRegularizer, !0, this.gammaConstraint)), this.center && (this.beta = this.addWeight("beta", n, null, this.betaInitializer, this.betaRegularizer, !0, this.betaConstraint)), this.movingMean = this.addWeight("moving_mean", n, null, this.movingMeanInitializer, null, !1), this.movingVariance = this.addWeight("moving_variance", n, null, this.movingVarianceInitializer, null, !1), this.built = !0;
				var a
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					var n = null != t.training && t.training,
						a = getExactlyOneTensor(e),
						o = shape(a),
						i = o.length,
						s = range$1(0, i),
						u = r.axis >= 0 ? r.axis : r.axis + i;
					s.splice(u, 1);
					var l = pyListRepeat(1, i);
					l[u] = o[u];
					var c = s.slice();
					c.sort();
					var p = !arraysEqual(c, range$1(0, i).slice(0, i - 1));
					if (!n) return function() {
						if (p) {
							var e = r.movingMean.read().reshape(l),
								t = r.movingVariance.read().reshape(l),
								n = r.center ? r.beta.read().reshape(l) : null,
								o = r.scale ? r.gamma.read().reshape(l) : null;
							return batchNormalization$1(a, e, t, n, o, r.epsilon)
						}
						return batchNormalization$1(a, r.movingMean.read(), r.movingVariance.read(), null == r.beta ? null : r.beta.read(), null == r.gamma ? null : r.gamma.read(), r.epsilon)
					}();
					var d = normalizeBatchInTraining(a, r.gamma.read(), r.beta.read(), s, r.epsilon),
						h = d[0],
						f = d[1],
						m = d[2],
						g = arrayProd(s.map(function(e) {
							return a.shape[e]
						})),
						y = m.mul(getScalar(g / (g - (1 + r.epsilon))));
					return function() {
						r.stepCount++;
						var e = movingAverage(r.movingMean.read(), f, r.momentum, r.stepCount);
						r.movingMean.write(e);
						var t = movingAverage(r.movingVariance.read(), y, r.momentum, r.stepCount);
						r.movingVariance.write(t)
					}(), h
				})
			}, t.prototype.getConfig = function() {
				var t = {
						axis: this.axis,
						momentum: this.momentum,
						epsilon: this.epsilon,
						center: this.center,
						scale: this.scale,
						betaInitializer: serializeInitializer(this.betaInitializer),
						gammaInitializer: serializeInitializer(this.gammaInitializer),
						movingMeanInitializer: serializeInitializer(this.movingMeanInitializer),
						movingVarianceInitializer: serializeInitializer(this.movingVarianceInitializer),
						betaRegularizer: serializeRegularizer(this.betaRegularizer),
						gammaRegularizer: serializeRegularizer(this.gammaRegularizer),
						betaConstraint: serializeConstraint(this.betaConstraint),
						gammaConstraint: serializeConstraint(this.gammaConstraint)
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t.className = "BatchNormalization", t
		}(Layer);
	SerializationMap.register(BatchNormalization);
	var __extends$24 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		ZeroPadding2D = function(e) {
			function t(t) {
				var r = this;
				if (null == t && (t = {}), r = e.call(this, t) || this, r.dataFormat = null == t.dataFormat ? imageDataFormat() : t.dataFormat, null == t.padding) r.padding = [
					[1, 1],
					[1, 1]
				];
				else if ("number" == typeof t.padding) r.padding = [
					[t.padding, t.padding],
					[t.padding, t.padding]
				];
				else {
					if (t.padding = t.padding, 2 !== t.padding.length) throw new ValueError("ZeroPadding2D expects padding to be a length-2 array, but received a length-" + t.padding.length + " array.");
					var n = void 0,
						a = void 0;
					if ("number" == typeof t.padding[0]) n = [t.padding[0], t.padding[0]], a = [t.padding[1], t.padding[1]];
					else {
						if (t.padding = t.padding, 2 !== t.padding[0].length) throw new ValueError("ZeroPadding2D expects height padding to be a length-2 array, but received a length-" + t.padding[0].length + " array.");
						if (n = t.padding[0], 2 !== t.padding[1].length) throw new ValueError("ZeroPadding2D expects width padding to be a length-2 array, but received a length-" + t.padding[1].length + " array.");
						a = t.padding[1]
					}
					r.padding = [n, a]
				}
				return r.inputSpec = [new InputSpec({
					ndim: 4
				})], r
			}
			return __extends$24(t, e), t.prototype.computeOutputShape = function(e) {
				e = getExactlyOneShape(e);
				var t, r;
				return "channelsFirst" === this.dataFormat ? (t = null != e[2] && e[2] >= 0 ? e[2] + this.padding[0][0] + this.padding[0][1] : null, r = null != e[3] && e[3] >= 0 ? e[3] + this.padding[1][0] + this.padding[1][1] : null, [e[0], e[1], t, r]) : (t = null != e[1] && e[1] >= 0 ? e[1] + this.padding[0][0] + this.padding[0][1] : null, r = null != e[2] && e[2] >= 0 ? e[2] + this.padding[1][0] + this.padding[1][1] : null, [e[0], t, r, e[3]])
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					return spatial2dPadding(getExactlyOneTensor(e), r.padding, r.dataFormat)
				})
			}, t.prototype.getConfig = function() {
				var t = {
						padding: this.padding,
						dataFormat: this.dataFormat
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t.className = "ZeroPadding2D", t
		}(Layer);
	SerializationMap.register(ZeroPadding2D);
	var __extends$25 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		Pooling1D = function(e) {
			function t(t) {
				var r = this;
				if (null == t.poolSize && (t.poolSize = 2), r = e.call(this, t) || this, "number" == typeof t.poolSize) r.poolSize = [t.poolSize];
				else {
					if (!Array.isArray(t.poolSize) || 1 !== t.poolSize.length || "number" != typeof t.poolSize[0]) throw new ValueError("poolSize for 1D convolutional layer must be a number or an Array of a single number, but received " + JSON.stringify(t.poolSize));
					r.poolSize = t.poolSize
				}
				if (null == t.strides) r.strides = r.poolSize;
				else if ("number" == typeof t.strides) r.strides = [t.strides];
				else {
					if (!Array.isArray(t.strides) || 1 !== t.strides.length || "number" != typeof t.strides[0]) throw new ValueError("strides for 1D convolutional layer must be a number or an Array of a single number, but received " + JSON.stringify(t.strides));
					r.strides = t.strides
				}
				return r.padding = null == t.padding ? "valid" : t.padding, checkPaddingMode(r.padding), r.inputSpec = [new InputSpec({
					ndim: 3
				})], r
			}
			return __extends$25(t, e), t.prototype.computeOutputShape = function(e) {
				var t = convOutputLength((e = getExactlyOneShape(e))[1], this.poolSize[0], this.padding, this.strides[0]);
				return [e[0], t, e[2]]
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					r.invokeCallHook(e, t), e = expandDims$1(getExactlyOneTensor(e), 2);
					var n = r.poolingFunction(getExactlyOneTensor(e), [r.poolSize[0], 1], [r.strides[0], 1], r.padding, "channelsLast");
					return squeeze(n, [2])
				})
			}, t.prototype.getConfig = function() {
				var t = {
						poolSize: this.poolSize,
						padding: this.padding,
						strides: this.strides
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t
		}(Layer),
		MaxPooling1D = function(e) {
			function t(t) {
				return e.call(this, t) || this
			}
			return __extends$25(t, e), t.prototype.poolingFunction = function(e, t, r, n, a) {
				return checkDataFormat(a), checkPaddingMode(n), pool2d(e, t, r, n, a, "max")
			}, t.className = "MaxPooling1D", t
		}(Pooling1D);
	SerializationMap.register(MaxPooling1D);
	var AveragePooling1D = function(e) {
		function t(t) {
			return e.call(this, t) || this
		}
		return __extends$25(t, e), t.prototype.poolingFunction = function(e, t, r, n, a) {
			return checkDataFormat(a), checkPaddingMode(n), pool2d(e, t, r, n, a, "avg")
		}, t.className = "AveragePooling1D", t
	}(Pooling1D);
	SerializationMap.register(AveragePooling1D);
	var Pooling2D = function(e) {
			function t(t) {
				var r = this;
				return null == t.poolSize && (t.poolSize = [2, 2]), r = e.call(this, t) || this, r.poolSize = Array.isArray(t.poolSize) ? t.poolSize : [t.poolSize, t.poolSize], r.strides = null == t.strides ? r.poolSize : t.strides, r.padding = null == t.padding ? "valid" : t.padding, r.dataFormat = null == t.dataFormat ? "channelsLast" : t.dataFormat, checkDataFormat(r.dataFormat), checkPaddingMode(r.padding), r.inputSpec = [new InputSpec({
					ndim: 4
				})], r
			}
			return __extends$25(t, e), t.prototype.computeOutputShape = function(e) {
				e = getExactlyOneShape(e);
				var t = "channelsFirst" === this.dataFormat ? e[2] : e[1],
					r = "channelsFirst" === this.dataFormat ? e[3] : e[2];
				return t = convOutputLength(t, this.poolSize[0], this.padding, this.strides[0]), r = convOutputLength(r, this.poolSize[1], this.padding, this.strides[1]), "channelsFirst" === this.dataFormat ? [e[0], e[1], t, r] : [e[0], t, r, e[3]]
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					return r.invokeCallHook(e, t), r.poolingFunction(getExactlyOneTensor(e), r.poolSize, r.strides, r.padding, r.dataFormat)
				})
			}, t.prototype.getConfig = function() {
				var t = {
						poolSize: this.poolSize,
						padding: this.padding,
						strides: this.strides,
						dataFormat: this.dataFormat
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t
		}(Layer),
		MaxPooling2D = function(e) {
			function t(t) {
				return e.call(this, t) || this
			}
			return __extends$25(t, e), t.prototype.poolingFunction = function(e, t, r, n, a) {
				return checkDataFormat(a), checkPaddingMode(n), pool2d(e, t, r, n, a, "max")
			}, t.className = "MaxPooling2D", t
		}(Pooling2D);
	SerializationMap.register(MaxPooling2D);
	var AveragePooling2D = function(e) {
		function t(t) {
			return e.call(this, t) || this
		}
		return __extends$25(t, e), t.prototype.poolingFunction = function(e, t, r, n, a) {
			return checkDataFormat(a), checkPaddingMode(n), pool2d(e, t, r, n, a, "avg")
		}, t.className = "AveragePooling2D", t
	}(Pooling2D);
	SerializationMap.register(AveragePooling2D);
	var GlobalPooling1D = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				return r.inputSpec = [new InputSpec({
					ndim: 3
				})], r
			}
			return __extends$25(t, e), t.prototype.computeOutputShape = function(e) {
				return [e[0], e[2]]
			}, t.prototype.call = function(e, t) {
				throw new NotImplementedError
			}, t
		}(Layer),
		GlobalAveragePooling1D = function(e) {
			function t(t) {
				return e.call(this, t) || this
			}
			return __extends$25(t, e), t.prototype.call = function(e, t) {
				return tidy(function() {
					var t = getExactlyOneTensor(e);
					return mean(t, 1)
				})
			}, t.className = "GlobalAveragePooling1D", t
		}(GlobalPooling1D);
	SerializationMap.register(GlobalAveragePooling1D);
	var GlobalMaxPooling1D = function(e) {
		function t(t) {
			return e.call(this, t) || this
		}
		return __extends$25(t, e), t.prototype.call = function(e, t) {
			return tidy(function() {
				var t = getExactlyOneTensor(e);
				return max(t, 1)
			})
		}, t.className = "GlobalMaxPooling1D", t
	}(GlobalPooling1D);
	SerializationMap.register(GlobalMaxPooling1D);
	var GlobalPooling2D = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				return r.dataFormat = null == t.dataFormat ? "channelsLast" : t.dataFormat, checkDataFormat(r.dataFormat), r.inputSpec = [new InputSpec({
					ndim: 4
				})], r
			}
			return __extends$25(t, e), t.prototype.computeOutputShape = function(e) {
				return e = e, "channelsLast" === this.dataFormat ? [e[0], e[3]] : [e[0], e[1]]
			}, t.prototype.call = function(e, t) {
				throw new NotImplementedError
			}, t.prototype.getConfig = function() {
				var t = {
						dataFormat: this.dataFormat
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t
		}(Layer),
		GlobalAveragePooling2D = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$25(t, e), t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					var t = getExactlyOneTensor(e);
					return "channelsLast" === r.dataFormat ? mean(t, [1, 2]) : mean(t, [2, 3])
				})
			}, t.className = "GlobalAveragePooling2D", t
		}(GlobalPooling2D);
	SerializationMap.register(GlobalAveragePooling2D);
	var GlobalMaxPooling2D = function(e) {
		function t() {
			return null !== e && e.apply(this, arguments) || this
		}
		return __extends$25(t, e), t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				var t = getExactlyOneTensor(e);
				return "channelsLast" === r.dataFormat ? max(t, [1, 2]) : max(t, [2, 3])
			})
		}, t.className = "GlobalMaxPooling2D", t
	}(GlobalPooling2D);
	SerializationMap.register(GlobalMaxPooling2D);
	var __extends$26 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$37 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		RNN = function(e) {
			function t(t) {
				var r, n = e.call(this, t) || this;
				if (null == t.cell) throw new ValueError("cell property is missing for the constructor of RNN.");
				if (null == (r = Array.isArray(t.cell) ? new StackedRNNCells({
						cells: t.cell
					}) : t.cell).stateSize) throw new ValueError("The RNN cell should have an attribute `stateSize` (tuple of integers, one integer per RNN state).");
				return n.cell = r, n.returnSequences = null != t.returnSequences && t.returnSequences, n.returnState = null != t.returnState && t.returnState, n.goBackwards = null != t.goBackwards && t.goBackwards, n._stateful = null != t.stateful && t.stateful, n.unroll = null != t.unroll && t.unroll, n.supportsMasking = !0, n.inputSpec = [new InputSpec({
					ndim: 3
				})], n.stateSpec = null, n.states = null, n.numConstants = null, n
			}
			return __extends$26(t, e), t.prototype.getStates = function() {
				return null == this.states ? range$1(0, Array.isArray(this.cell.stateSize) ? this.cell.stateSize.length : 1).map(function(e) {
					return null
				}) : this.states
			}, t.prototype.setStates = function(e) {
				this.states = e
			}, t.prototype.computeOutputShape = function(e) {
				isArrayOfShapes(e) && (e = e[0]), e = e;
				var t = this.cell.stateSize;
				Array.isArray(t) || (t = [t]);
				var r, n = t[0];
				if (r = this.returnSequences ? [e[0], e[1], n] : [e[0], n], this.returnState) {
					for (var a = [], o = 0, i = t; o < i.length; o++) {
						var s = i[o];
						a.push([e[0], s])
					}
					return [r].concat(a)
				}
				return r
			}, t.prototype.computeMask = function(e, t) {
				throw new NotImplementedError("computeMask has not been implemented for RNN yet")
			}, t.prototype.build = function(e) {
				if (null != this.numConstants) throw new NotImplementedError("Constants support is not implemented in RNN yet.");
				isArrayOfShapes(e) && (e = e[0]), e = e;
				var t = this.stateful ? e[0] : null,
					r = e[e.length - 1];
				this.inputSpec[0] = new InputSpec({
					shape: [t, null, r]
				});
				var n = [e[0]].concat(e.slice(2));
				this.cell.build(n);
				var a;
				if (a = Array.isArray(this.cell.stateSize) ? this.cell.stateSize : [this.cell.stateSize], null != this.stateSpec) {
					if (!arraysEqual(this.stateSpec.map(function(e) {
							return e.shape[e.shape.length - 1]
						}), a)) throw new ValueError("An initialState was passed that is not compatible with cell.stateSize. Received stateSpec=" + this.stateSpec + "; However cell.stateSize is " + this.cell.stateSize)
				} else this.stateSpec = a.map(function(e) {
					return new InputSpec({
						shape: [null, e]
					})
				});
				if (this.stateful) throw new NotImplementedError("stateful RNN layer is not implemented yet")
			}, t.prototype.resetStates = function(e) {
				var t = this;
				tidy(function() {
					if (!t.stateful) throw new AttributeError("Cannot call resetState() on an RNN Layer that is not stateful.");
					var r = t.inputSpec[0].shape[0];
					if (null == r) throw new ValueError("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");
					if (null == t.states) Array.isArray(t.cell.stateSize) ? t.states = t.cell.stateSize.map(function(e) {
						return zeros([r, e])
					}) : t.states = [zeros([r, t.cell.stateSize])];
					else if (null == e) Array.isArray(t.cell.stateSize) ? t.states = t.cell.stateSize.map(function(e) {
						return zeros([r, e])
					}) : t.states[0] = zeros([r, t.cell.stateSize]);
					else {
						if (Array.isArray(e) || (e = [e]), e.length !== t.states.length) throw new ValueError("Layer " + t.name + " expects " + t.states.length + " state(s), but it received " + e.length + " state value(s). Input received: " + e);
						for (var n = 0; n < t.states.length; ++n) {
							var a = e[n],
								o = Array.isArray(t.cell.stateSize) ? t.cell.stateSize[n] : t.cell.stateSize,
								i = [r, o];
							if (!arraysEqual(a.shape, i)) throw new ValueError("State " + n + " is incompatible with layer " + t.name + ": expected shape=" + i + ", received shape=" + a.shape);
							t.states[n] = a
						}
					}
				})
			}, t.prototype.standardizeArgs = function(e, t, r) {
				function n(e) {
					return null == e || Array.isArray(e) ? e : [e]
				}
				if (Array.isArray(e)) {
					if (null != t || null != r) throw new ValueError("When inputs is an array, neither initialState or constants should be provided");
					null != this.numConstants && (r = e.slice(e.length - this.numConstants, e.length), e = e.slice(0, e.length - this.numConstants)), e.length > 1 && (t = e.slice(1, e.length)), e = e[0]
				}
				return t = n(t), r = n(r), {
					inputs: e,
					initialState: t,
					constants: r
				}
			}, t.prototype.apply = function(t, r) {
				var n = null == r ? null : r.initialState,
					a = null == r ? null : r.constants;
				null == r && (r = {});
				var o = this.standardizeArgs(t, n, a);
				t = o.inputs, n = o.initialState, a = o.constants;
				var i = [],
					s = [];
				if (null != n) {
					r.initialState = n, i = i.concat(n), this.stateSpec = [];
					for (var u = 0, l = n; u < l.length; u++) {
						var c = l[u];
						this.stateSpec.push(new InputSpec({
							shape: c.shape
						}))
					}
					s = s.concat(this.stateSpec)
				}
				if (null != a && (r.constants = a, i = i.concat(a), this.numConstants = a.length), i[0] instanceof SymbolicTensor) {
					var p = [t].concat(i),
						d = this.inputSpec.concat(s),
						h = this.inputSpec;
					this.inputSpec = d;
					var f = e.prototype.apply.call(this, p, r);
					return this.inputSpec = h, f
				}
				return e.prototype.apply.call(this, t, r)
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					var n = null == t ? null : t.mask,
						a = null == t ? null : t.training,
						o = null == t ? null : t.initialState;
					if (e = getExactlyOneTensor(e), null == o) {
						if (r.stateful) throw new NotImplementedError("stateful RNN layer is not implemented yet.");
						o = r.getInitialState(e)
					}
					if (null != n) throw new NotImplementedError("Masking is not implemented for RNN yet");
					var i = Array.isArray(r.cell.stateSize) ? r.cell.stateSize.length : 1;
					if (o.length !== i) throw new ValueError("RNN Layer has " + i + " state(s) but was passed " + o.length + " initial state(s).");
					e.shape[1];
					r.unroll && console.warn("Ignoring unroll = true for RNN layer, due to imperative backend.");
					var s = {
							training: a
						},
						u = rnn(function(e, t) {
							var n = r.cell.call([e].concat(t), s);
							return [n[0], n.slice(1)]
						}, e, o, r.goBackwards, null, null, r.unroll),
						l = u[0],
						c = u[1],
						p = u[2];
					if (r.stateful) throw new NotImplementedError("stateful RNN layer is not implemented yet");
					var d = r.returnSequences ? c : l;
					return r.returnState ? [d].concat(p) : d
				})
			}, t.prototype.getInitialState = function(e) {
				var t = this;
				return tidy(function() {
					var r = zeros(e.shape);
					return r = sum(r, [1, 2]), r = expandDims$1(r), Array.isArray(t.cell.stateSize) ? t.cell.stateSize.map(function(e) {
						return e > 1 ? tile$1(r, [1, e]) : r
					}) : t.cell.stateSize > 1 ? [tile$1(r, [1, t.cell.stateSize])] : [r]
				})
			}, Object.defineProperty(t.prototype, "trainableWeights", {
				get: function() {
					return this.trainable ? this.cell.trainableWeights : []
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "nonTrainableWeights", {
				get: function() {
					return this.trainable ? this.cell.nonTrainableWeights : this.cell.weights
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.getConfig = function() {
				var t = {
					returnSequences: this.returnSequences,
					returnState: this.returnState,
					goBackwards: this.goBackwards,
					stateful: this.stateful,
					unroll: this.unroll
				};
				null != this.numConstants && (t.numConstants = this.numConstants);
				var r = this.cell.getConfig();
				t.cell = {
					className: this.cell.getClassName(),
					config: r
				};
				var n = e.prototype.getConfig.call(this);
				return Object.assign(t, n), t
			}, t.className = "RNN", t
		}(Layer);
	SerializationMap.register(RNN);
	var RNNCell = function(e) {
			function t() {
				return null !== e && e.apply(this, arguments) || this
			}
			return __extends$26(t, e), t = __decorate$37([doc()], t)
		}(Layer),
		SimpleRNNCell = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				return r.DEFAULT_ACTIVATION = "tanh", r.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", r.DEFAULT_RECURRENT_INITIALIZER = "orthogonal", r.DEFAULT_BIAS_INITIALIZER = "zeros", r.units = t.units, r.activation = getActivation(null == t.activation ? r.DEFAULT_ACTIVATION : t.activation), r.useBias = null == t.useBias || t.useBias, r.kernelInitializer = getInitializer(t.kernelInitializer || r.DEFAULT_KERNEL_INITIALIZER), r.recurrentInitializer = getInitializer(t.recurrentInitializer || r.DEFAULT_RECURRENT_INITIALIZER), r.biasInitializer = getInitializer(t.biasInitializer || r.DEFAULT_BIAS_INITIALIZER), r.kernelRegularizer = getRegularizer(t.kernelRegularizer), r.recurrentRegularizer = getRegularizer(t.recurrentRegularizer), r.biasRegularizer = getRegularizer(t.biasRegularizer), r.kernelConstraint = getConstraint(t.kernelConstraint), r.recurrentConstraint = getConstraint(t.recurrentConstraint), r.biasConstraint = getConstraint(t.biasConstraint), r.dropout = min$1([1, max$1([0, null == t.dropout ? 0 : t.dropout])]), r.recurrentDropout = min$1([1, max$1([0, null == t.recurrentDropout ? 0 : t.recurrentDropout])]), r.stateSize = r.units, r
			}
			return __extends$26(t, e), t.prototype.build = function(e) {
				e = getExactlyOneShape(e), this.kernel = this.addWeight("kernel", [e[e.length - 1], this.units], null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.recurrentKernel = this.addWeight("recurrent_kernel", [this.units, this.units], null, this.recurrentInitializer, this.recurrentRegularizer, !0, this.recurrentConstraint), this.useBias ? this.bias = this.addWeight("bias", [this.units], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint) : this.bias = null, this.built = !0
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					if (2 !== (e = e).length) throw new ValueError("SimpleRNNCell expects 2 input Tensors, got " + e.length + ".");
					var t = e[1];
					if (e = e[0], 0 !== r.dropout || 0 !== r.recurrentDropout) throw new NotImplementedError("Dropout is not implemented for SimpleRNNCell yet");
					var n = dot$1(e, r.kernel.read());
					null != r.bias && (n = biasAdd(n, r.bias.read()));
					var a = add(n, dot$1(t, r.recurrentKernel.read()));
					return null != r.activation && (a = r.activation.apply(a)), [a, a]
				})
			}, t.prototype.getConfig = function() {
				var t = {
						units: this.units,
						activation: serializeActivation(this.activation),
						useBias: this.useBias,
						kernelInitializer: serializeInitializer(this.kernelInitializer),
						recurrentInitializer: serializeInitializer(this.recurrentInitializer),
						biasInitializer: serializeInitializer(this.biasInitializer),
						kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
						recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
						biasRegularizer: serializeRegularizer(this.biasRegularizer),
						activityRegularizer: serializeRegularizer(this.activityRegularizer),
						kernelConstraint: serializeConstraint(this.kernelConstraint),
						recurrentConstraint: serializeConstraint(this.recurrentConstraint),
						biasConstraint: serializeConstraint(this.biasConstraint),
						dropout: this.dropout,
						recurrentDropout: this.recurrentDropout
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t.className = "SimpleRNNCell", t
		}(RNNCell);
	SerializationMap.register(SimpleRNNCell);
	var SimpleRNN = function(e) {
		function t(t) {
			return t.cell = new SimpleRNNCell(t), e.call(this, t) || this
		}
		return __extends$26(t, e), t.prototype.call = function(t, r) {
			var n = this;
			return tidy(function() {
				var a = null == r ? null : r.mask,
					o = null == r ? null : r.training,
					i = null == r ? null : r.initialState;
				return e.prototype.call.call(n, t, {
					mask: a,
					training: o,
					initialState: i
				})
			})
		}, Object.defineProperty(t.prototype, "units", {
			get: function() {
				return this.cell.units
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "activation", {
			get: function() {
				return this.cell.activation
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "useBias", {
			get: function() {
				return this.cell.useBias
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelInitializer", {
			get: function() {
				return this.cell.kernelInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentInitializer", {
			get: function() {
				return this.cell.recurrentInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasInitializer", {
			get: function() {
				return this.cell.biasInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelRegularizer", {
			get: function() {
				return this.cell.kernelRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentRegularizer", {
			get: function() {
				return this.cell.recurrentRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasRegularizer", {
			get: function() {
				return this.cell.biasRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelConstraint", {
			get: function() {
				return this.cell.kernelConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentConstraint", {
			get: function() {
				return this.cell.recurrentConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasConstraint", {
			get: function() {
				return this.cell.biasConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "dropout", {
			get: function() {
				return this.cell.dropout
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentDropout", {
			get: function() {
				return this.cell.recurrentDropout
			},
			enumerable: !0,
			configurable: !0
		}), t.prototype.getConfig = function() {
			var t = {
					units: this.units,
					activation: serializeActivation(this.activation),
					useBias: this.useBias,
					kernelInitializer: serializeInitializer(this.kernelInitializer),
					recurrentInitializer: serializeInitializer(this.recurrentInitializer),
					biasInitializer: serializeInitializer(this.biasInitializer),
					kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
					recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
					biasRegularizer: serializeRegularizer(this.biasRegularizer),
					activityRegularizer: serializeRegularizer(this.activityRegularizer),
					kernelConstraint: serializeConstraint(this.kernelConstraint),
					recurrentConstraint: serializeConstraint(this.recurrentConstraint),
					biasConstraint: serializeConstraint(this.biasConstraint),
					dropout: this.dropout,
					recurrentDropout: this.recurrentDropout
				},
				r = e.prototype.getConfig.call(this);
			return delete r.cell, Object.assign(t, r), t
		}, t.className = "SimpleRNN", t
	}(RNN);
	SerializationMap.register(SimpleRNN);
	var GRUCell = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			return r.DEFAULT_ACTIVATION = "tanh", r.DEFAULT_RECURRENT_ACTIVATION = "hardSigmoid", r.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", r.DEFAULT_RECURRENT_INITIALIZER = "orthogonal", r.DEFAULT_BIAS_INITIALIZER = "zeros", r.units = t.units, r.activation = getActivation(void 0 === t.activation ? r.DEFAULT_ACTIVATION : t.activation), r.recurrentActivation = getActivation(void 0 === t.activation ? r.DEFAULT_RECURRENT_ACTIVATION : t.recurrentActivation), r.useBias = null == t.useBias || t.useBias, r.kernelInitializer = getInitializer(t.kernelInitializer || r.DEFAULT_KERNEL_INITIALIZER), r.recurrentInitializer = getInitializer(t.recurrentInitializer || r.DEFAULT_RECURRENT_INITIALIZER), r.biasInitializer = getInitializer(t.biasInitializer || r.DEFAULT_BIAS_INITIALIZER), r.kernelRegularizer = getRegularizer(t.kernelRegularizer), r.recurrentRegularizer = getRegularizer(t.recurrentRegularizer), r.biasRegularizer = getRegularizer(t.biasRegularizer), r.kernelConstraint = getConstraint(t.kernelConstraint), r.recurrentConstraint = getConstraint(t.recurrentConstraint), r.biasConstraint = getConstraint(t.biasConstraint), r.dropout = min$1([1, max$1([0, null == t.dropout ? 0 : t.dropout])]), r.recurrentDropout = min$1([1, max$1([0, null == t.recurrentDropout ? 0 : t.recurrentDropout])]), r.implementation = t.implementation, r.stateSize = r.units, r
		}
		return __extends$26(t, e), t.prototype.build = function(e) {
			var t = (e = getExactlyOneShape(e))[e.length - 1];
			this.kernel = this.addWeight("kernel", [t, 3 * this.units], null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.recurrentKernel = this.addWeight("recurrent_kernel", [this.units, 3 * this.units], null, this.recurrentInitializer, this.recurrentRegularizer, !0, this.recurrentConstraint), this.useBias ? this.bias = this.addWeight("bias", [3 * this.units], null, this.biasInitializer, this.biasRegularizer, !0, this.biasConstraint) : this.bias = null, this.built = !0
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				if (0 !== r.dropout || 0 !== r.recurrentDropout) throw new NotImplementedError("Dropout is not implemented for GRUCell yet");
				if (2 !== (e = e).length) throw new ValueError("GRUCell expects 2 input Tensors (inputs, h, c), got " + e.length + ".");
				var t = e[1];
				e = e[0];
				var n, a, o;
				if (1 === r.implementation) {
					var i = sliceAlongLastAxis(r.kernel.read(), 0, r.units),
						s = sliceAlongLastAxis(r.kernel.read(), r.units, r.units),
						u = sliceAlongLastAxis(r.kernel.read(), 2 * r.units, r.units),
						l = sliceAlongLastAxis(r.recurrentKernel.read(), 0, r.units),
						c = sliceAlongLastAxis(r.recurrentKernel.read(), r.units, r.units),
						p = sliceAlongLastAxis(r.recurrentKernel.read(), 2 * r.units, r.units),
						d = e,
						h = e,
						f = dot$1(e, i),
						m = dot$1(d, s),
						g = dot$1(h, u);
					if (r.useBias) {
						var y = sliceAlongFirstAxis(r.bias.read(), 0, r.units),
							v = sliceAlongFirstAxis(r.bias.read(), r.units, r.units),
							b = sliceAlongFirstAxis(r.bias.read(), 2 * r.units, r.units);
						f = biasAdd(f, y), m = biasAdd(m, v), g = biasAdd(g, b)
					}
					var x = t,
						w = t,
						_ = t;
					n = r.recurrentActivation.apply(add(f, dot$1(x, l))), a = r.recurrentActivation.apply(add(m, dot$1(w, c))), o = r.activation.apply(add(g, dot$1(mul(a, _), p)))
				} else {
					var S = dot$1(e, r.kernel.read());
					r.useBias && (S = biasAdd(S, r.bias.read()));
					var N = dot$1(t, sliceAlongLastAxis(r.recurrentKernel.read(), 0, 2 * r.units)),
						f = sliceAlongLastAxis(S, 0, r.units),
						m = sliceAlongLastAxis(S, r.units, r.units),
						A = sliceAlongLastAxis(N, 0, r.units),
						E = sliceAlongLastAxis(N, r.units, r.units);
					n = r.recurrentActivation.apply(add(f, A)), a = r.recurrentActivation.apply(add(m, E));
					var g = sliceAlongLastAxis(S, 2 * r.units, r.units),
						T = dot$1(mul(a, t), sliceAlongLastAxis(r.recurrentKernel.read(), 2 * r.units, r.units));
					o = r.activation.apply(add(g, T))
				}
				var I = add(mul(n, t), mul(scalarPlusArray(getScalar(1), neg(n)), o));
				return [I, I]
			})
		}, t.prototype.getConfig = function() {
			var t = {
					units: this.units,
					activation: serializeActivation(this.activation),
					useBias: this.useBias,
					kernelInitializer: serializeInitializer(this.kernelInitializer),
					recurrentInitializer: serializeInitializer(this.recurrentInitializer),
					biasInitializer: serializeInitializer(this.biasInitializer),
					kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
					recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
					biasRegularizer: serializeRegularizer(this.biasRegularizer),
					activityRegularizer: serializeRegularizer(this.activityRegularizer),
					kernelConstraint: serializeConstraint(this.kernelConstraint),
					recurrentConstraint: serializeConstraint(this.recurrentConstraint),
					biasConstraint: serializeConstraint(this.biasConstraint),
					dropout: this.dropout,
					recurrentDropout: this.recurrentDropout,
					implementation: this.implementation
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "GRUCell", t
	}(RNNCell);
	SerializationMap.register(GRUCell);
	var GRU = function(e) {
		function t(t) {
			return 0 === t.implementation && console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."), t.cell = new GRUCell(t), e.call(this, t) || this
		}
		return __extends$26(t, e), t.prototype.call = function(t, r) {
			var n = this;
			return tidy(function() {
				var a = null == r ? null : r.mask,
					o = null == r ? null : r.training,
					i = null == r ? null : r.initialState;
				return e.prototype.call.call(n, t, {
					mask: a,
					training: o,
					initialState: i
				})
			})
		}, Object.defineProperty(t.prototype, "units", {
			get: function() {
				return this.cell.units
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "activation", {
			get: function() {
				return this.cell.activation
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "useBias", {
			get: function() {
				return this.cell.useBias
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelInitializer", {
			get: function() {
				return this.cell.kernelInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentInitializer", {
			get: function() {
				return this.cell.recurrentInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasInitializer", {
			get: function() {
				return this.cell.biasInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelRegularizer", {
			get: function() {
				return this.cell.kernelRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentRegularizer", {
			get: function() {
				return this.cell.recurrentRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasRegularizer", {
			get: function() {
				return this.cell.biasRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelConstraint", {
			get: function() {
				return this.cell.kernelConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentConstraint", {
			get: function() {
				return this.cell.recurrentConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasConstraint", {
			get: function() {
				return this.cell.biasConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "dropout", {
			get: function() {
				return this.cell.dropout
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentDropout", {
			get: function() {
				return this.cell.recurrentDropout
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "implementation", {
			get: function() {
				return this.cell.implementation
			},
			enumerable: !0,
			configurable: !0
		}), t.prototype.getConfig = function() {
			var t = {
					units: this.units,
					activation: serializeActivation(this.activation),
					useBias: this.useBias,
					kernelInitializer: serializeInitializer(this.kernelInitializer),
					recurrentInitializer: serializeInitializer(this.recurrentInitializer),
					biasInitializer: serializeInitializer(this.biasInitializer),
					kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
					recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
					biasRegularizer: serializeRegularizer(this.biasRegularizer),
					activityRegularizer: serializeRegularizer(this.activityRegularizer),
					kernelConstraint: serializeConstraint(this.kernelConstraint),
					recurrentConstraint: serializeConstraint(this.recurrentConstraint),
					biasConstraint: serializeConstraint(this.biasConstraint),
					dropout: this.dropout,
					recurrentDropout: this.recurrentDropout,
					implementation: this.implementation
				},
				r = e.prototype.getConfig.call(this);
			return delete r.cell, Object.assign(t, r), t
		}, t.fromConfig = function(e, t) {
			return 0 === t.implmentation && (t.implementation = 1), new e(t)
		}, t.className = "GRU", t
	}(RNN);
	SerializationMap.register(GRU);
	var LSTMCell = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			return r.DEFAULT_ACTIVATION = "tanh", r.DEFAULT_RECURRENT_ACTIVATION = "hardSigmoid", r.DEFAULT_KERNEL_INITIALIZER = "glorotNormal", r.DEFAULT_RECURRENT_INITIALIZER = "orthogonal", r.DEFAULT_BIAS_INITIALIZER = "zeros", r.units = t.units, r.activation = getActivation(void 0 === t.activation ? r.DEFAULT_ACTIVATION : t.activation), r.recurrentActivation = getActivation(void 0 === t.activation ? r.DEFAULT_RECURRENT_ACTIVATION : t.recurrentActivation), r.useBias = null == t.useBias || t.useBias, r.kernelInitializer = getInitializer(t.kernelInitializer || r.DEFAULT_KERNEL_INITIALIZER), r.recurrentInitializer = getInitializer(t.recurrentInitializer || r.DEFAULT_RECURRENT_INITIALIZER), r.biasInitializer = getInitializer(t.biasInitializer || r.DEFAULT_BIAS_INITIALIZER), r.unitForgetBias = t.unitForgetBias, r.kernelRegularizer = getRegularizer(t.kernelRegularizer), r.recurrentRegularizer = getRegularizer(t.recurrentRegularizer), r.biasRegularizer = getRegularizer(t.biasRegularizer), r.kernelConstraint = getConstraint(t.kernelConstraint), r.recurrentConstraint = getConstraint(t.recurrentConstraint), r.biasConstraint = getConstraint(t.biasConstraint), r.dropout = min$1([1, max$1([0, null == t.dropout ? 0 : t.dropout])]), r.recurrentDropout = min$1([1, max$1([0, null == t.recurrentDropout ? 0 : t.recurrentDropout])]), r.implementation = t.implementation, r.stateSize = [r.units, r.units], r
		}
		return __extends$26(t, e), t.prototype.build = function(e) {
			var t = (e = getExactlyOneShape(e))[e.length - 1];
			this.kernel = this.addWeight("kernel", [t, 4 * this.units], null, this.kernelInitializer, this.kernelRegularizer, !0, this.kernelConstraint), this.recurrentKernel = this.addWeight("recurrent_kernel", [this.units, 4 * this.units], null, this.recurrentInitializer, this.recurrentRegularizer, !0, this.recurrentConstraint);
			var r;
			if (this.useBias) {
				if (this.unitForgetBias) {
					var n = this.biasInitializer,
						a = this.units;
					r = new(o = function(e) {
						function t() {
							return null !== e && e.apply(this, arguments) || this
						}
						return __extends$26(t, e), t.prototype.apply = function(e, t) {
							var r = n.apply([a]),
								o = (new Ones).apply([a]),
								i = n.apply([2 * a]);
							return concatAlongFirstAxis(concatAlongFirstAxis(r, o), i)
						}, t
					}(Initializer), o.className = "CustomInit", o)
				} else r = this.biasInitializer;
				this.bias = this.addWeight("bias", [4 * this.units], null, r, this.biasRegularizer, !0, this.biasConstraint)
			} else this.bias = null;
			this.built = !0;
			var o
		}, t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				if (0 !== r.dropout || 0 !== r.recurrentDropout) throw new NotImplementedError("Dropout is not implemented for LSTMCell yet");
				if (3 !== (e = e).length) throw new ValueError("LSTMCell expects 3 input Tensors (inputs, h, c), got " + e.length + ".");
				var t = e[1],
					n = e[2];
				e = e[0];
				var a, o, i, s;
				if (1 === r.implementation) {
					var u = sliceAlongLastAxis(r.kernel.read(), 0, r.units),
						l = sliceAlongLastAxis(r.kernel.read(), r.units, r.units),
						c = sliceAlongLastAxis(r.kernel.read(), 2 * r.units, r.units),
						p = sliceAlongLastAxis(r.kernel.read(), 3 * r.units, r.units),
						d = sliceAlongLastAxis(r.recurrentKernel.read(), 0, r.units),
						h = sliceAlongLastAxis(r.recurrentKernel.read(), r.units, r.units),
						f = sliceAlongLastAxis(r.recurrentKernel.read(), 2 * r.units, r.units),
						m = sliceAlongLastAxis(r.recurrentKernel.read(), 3 * r.units, r.units),
						g = e,
						y = e,
						v = e,
						b = dot$1(e, u),
						x = dot$1(g, l),
						w = dot$1(y, c),
						_ = dot$1(v, p);
					if (r.useBias) {
						var S = sliceAlongFirstAxis(r.bias.read(), 0, r.units),
							N = sliceAlongFirstAxis(r.bias.read(), r.units, r.units),
							A = sliceAlongFirstAxis(r.bias.read(), 2 * r.units, r.units),
							E = sliceAlongFirstAxis(r.bias.read(), 3 * r.units, r.units);
						b = biasAdd(b, S), x = biasAdd(x, N), w = biasAdd(w, A), _ = biasAdd(_, E)
					}
					var T = t,
						I = t,
						O = t,
						P = t;
					a = r.recurrentActivation.apply(add(b, dot$1(T, d))), o = r.recurrentActivation.apply(add(x, dot$1(I, h))), i = add(mul(o, n), mul(a, r.activation.apply(add(w, dot$1(O, f))))), s = r.recurrentActivation.apply(add(_, dot$1(P, m)))
				} else {
					var R = dot$1(e, r.kernel.read());
					R = add(R, dot$1(t, r.recurrentKernel.read())), r.useBias && (R = biasAdd(R, r.bias.read()));
					var C = sliceAlongLastAxis(R, 0, r.units),
						k = sliceAlongLastAxis(R, r.units, r.units),
						D = sliceAlongLastAxis(R, 2 * r.units, r.units),
						M = sliceAlongLastAxis(R, 3 * r.units, r.units);
					a = r.recurrentActivation.apply(C), o = r.recurrentActivation.apply(k), i = add(mul(o, n), mul(a, r.activation.apply(D))), s = r.recurrentActivation.apply(M)
				}
				var L = mul(s, r.activation.apply(i));
				return [L, L, i]
			})
		}, t.prototype.getConfig = function() {
			var t = {
					units: this.units,
					activation: serializeActivation(this.activation),
					useBias: this.useBias,
					kernelInitializer: serializeInitializer(this.kernelInitializer),
					recurrentInitializer: serializeInitializer(this.recurrentInitializer),
					biasInitializer: serializeInitializer(this.biasInitializer),
					unitForgetBias: this.unitForgetBias,
					kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
					recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
					biasRegularizer: serializeRegularizer(this.biasRegularizer),
					activityRegularizer: serializeRegularizer(this.activityRegularizer),
					kernelConstraint: serializeConstraint(this.kernelConstraint),
					recurrentConstraint: serializeConstraint(this.recurrentConstraint),
					biasConstraint: serializeConstraint(this.biasConstraint),
					dropout: this.dropout,
					recurrentDropout: this.recurrentDropout,
					implementation: this.implementation
				},
				r = e.prototype.getConfig.call(this);
			return Object.assign(t, r), t
		}, t.className = "LSTMCell", t
	}(RNNCell);
	SerializationMap.register(LSTMCell);
	var LSTM = function(e) {
		function t(t) {
			return 0 === t.implementation && console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."), t.cell = new LSTMCell(t), e.call(this, t) || this
		}
		return __extends$26(t, e), t.prototype.call = function(t, r) {
			var n = this;
			return tidy(function() {
				var a = null == r ? null : r.mask,
					o = null == r ? null : r.training,
					i = null == r ? null : r.initialState;
				return e.prototype.call.call(n, t, {
					mask: a,
					training: o,
					initialState: i
				})
			})
		}, Object.defineProperty(t.prototype, "units", {
			get: function() {
				return this.cell.units
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "activation", {
			get: function() {
				return this.cell.activation
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "useBias", {
			get: function() {
				return this.cell.useBias
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelInitializer", {
			get: function() {
				return this.cell.kernelInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentInitializer", {
			get: function() {
				return this.cell.recurrentInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasInitializer", {
			get: function() {
				return this.cell.biasInitializer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "unitForgetBias", {
			get: function() {
				return this.cell.unitForgetBias
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelRegularizer", {
			get: function() {
				return this.cell.kernelRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentRegularizer", {
			get: function() {
				return this.cell.recurrentRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasRegularizer", {
			get: function() {
				return this.cell.biasRegularizer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "kernelConstraint", {
			get: function() {
				return this.cell.kernelConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentConstraint", {
			get: function() {
				return this.cell.recurrentConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "biasConstraint", {
			get: function() {
				return this.cell.biasConstraint
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "dropout", {
			get: function() {
				return this.cell.dropout
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "recurrentDropout", {
			get: function() {
				return this.cell.recurrentDropout
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "implementation", {
			get: function() {
				return this.cell.implementation
			},
			enumerable: !0,
			configurable: !0
		}), t.prototype.getConfig = function() {
			var t = {
					units: this.units,
					activation: serializeActivation(this.activation),
					useBias: this.useBias,
					kernelInitializer: serializeInitializer(this.kernelInitializer),
					recurrentInitializer: serializeInitializer(this.recurrentInitializer),
					biasInitializer: serializeInitializer(this.biasInitializer),
					unitForgetBias: this.unitForgetBias,
					kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
					recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
					biasRegularizer: serializeRegularizer(this.biasRegularizer),
					activityRegularizer: serializeRegularizer(this.activityRegularizer),
					kernelConstraint: serializeConstraint(this.kernelConstraint),
					recurrentConstraint: serializeConstraint(this.recurrentConstraint),
					biasConstraint: serializeConstraint(this.biasConstraint),
					dropout: this.dropout,
					recurrentDropout: this.recurrentDropout,
					implementation: this.implementation
				},
				r = e.prototype.getConfig.call(this);
			return delete r.cell, Object.assign(t, r), t
		}, t.fromConfig = function(e, t) {
			return 0 === t.implmentation && (t.implementation = 1), new e(t)
		}, t.className = "LSTM", t
	}(RNN);
	SerializationMap.register(LSTM);
	var StackedRNNCells = function(e) {
		function t(t) {
			var r = e.call(this, t) || this;
			return r.cells = t.cells, r
		}
		return __extends$26(t, e), Object.defineProperty(t.prototype, "stateSize", {
			get: function() {
				for (var e = [], t = 0, r = this.cells.slice().reverse(); t < r.length; t++) {
					var n = r[t];
					Array.isArray(n.stateSize) ? e.push.apply(e, n.stateSize) : e.push(n.stateSize)
				}
				return e
			},
			enumerable: !0,
			configurable: !0
		}), t.prototype.call = function(e, t) {
			var r = this;
			return tidy(function() {
				for (var n = (e = e).slice(1), a = [], o = 0, i = r.cells.slice().reverse(); o < i.length; o++) {
					c = i[o];
					Array.isArray(c.stateSize) ? a.push(n.splice(0, c.stateSize.length)) : a.push(n.splice(0, 1))
				}
				a.reverse();
				for (var s, u = [], l = 0; l < r.cells.length; ++l) {
					var c = r.cells[l];
					n = a[l], s = 0 === l ? [e[0]].concat(n) : [s[0]].concat(n), s = c.call(s, t), u.push(s.slice(1))
				}
				n = [];
				for (var p = 0, d = u.slice().reverse(); p < d.length; p++) {
					var h = d[p];
					n.push.apply(n, h)
				}
				return [s[0]].concat(n)
			})
		}, t.prototype.build = function(e) {
			isArrayOfShapes(e) && (e = e[0]), e = e;
			for (var t, r = 0, n = this.cells; r < n.length; r++) {
				var a = n[r];
				a.build(e), t = Array.isArray(a.stateSize) ? a.stateSize[0] : a.stateSize, e = [e[0], t]
			}
			this.built = !0
		}, t.prototype.getConfig = function() {
			for (var t = [], r = 0, n = this.cells; r < n.length; r++) {
				var a = n[r];
				t.push({
					className: this.getClassName(),
					config: a.getConfig()
				})
			}
			var o = {
					cells: t
				},
				i = e.prototype.getConfig.call(this);
			return Object.assign(o, i), o
		}, t.fromConfig = function(e, t, r) {
			void 0 === r && (r = {});
			for (var n = [], a = 0, o = t.cells; a < o.length; a++) {
				var i = o[a];
				n.push(deserialize(i, r))
			}
			return new e({
				cells: n
			})
		}, Object.defineProperty(t.prototype, "trainableWeights", {
			get: function() {
				if (!this.trainable) return [];
				for (var e = [], t = 0, r = this.cells; t < r.length; t++) {
					var n = r[t];
					e.push.apply(e, n.trainableWeights)
				}
				return e
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(t.prototype, "nonTrainableWeights", {
			get: function() {
				for (var e = [], t = 0, r = this.cells; t < r.length; t++) {
					i = r[t];
					e.push.apply(e, i.nonTrainableWeights)
				}
				if (!this.trainable) {
					for (var n = [], a = 0, o = this.cells; a < o.length; a++) {
						var i = o[a];
						n.push.apply(n, i.trainableWeights)
					}
					return n.concat(e)
				}
				return e
			},
			enumerable: !0,
			configurable: !0
		}), t.prototype.getWeights = function() {
			for (var e = [], t = 0, r = this.cells; t < r.length; t++) {
				var n = r[t];
				e.push.apply(e, n.weights)
			}
			return batchGetValue(e)
		}, t.prototype.setWeights = function(e) {
			for (var t = [], r = 0, n = this.cells; r < n.length; r++)
				for (var a = n[r], o = a.weights.length, i = e.splice(o), s = 0; s < a.weights.length; ++s) t.push([a.weights[s], i[s]]);
			batchSetValue(t)
		}, t.className = "StackedRNNCells", t
	}(RNNCell);
	SerializationMap.register(StackedRNNCells);
	var __extends$27 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		Wrapper = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				return r.layer = t.layer, r
			}
			return __extends$27(t, e), t.prototype.build = function(e) {
				this.built = !0
			}, Object.defineProperty(t.prototype, "trainable", {
				get: function() {
					return null != this.layer && this.layer.trainable
				},
				set: function(e) {
					null != this.layer && (this.layer.trainable = e)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "trainableWeights", {
				get: function() {
					return this.layer.trainableWeights
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "nonTrainableWeights", {
				get: function() {
					return this.layer.nonTrainableWeights
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "updates", {
				get: function() {
					return this.layer._updates
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "losses", {
				get: function() {
					return this.layer.losses
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.getWeights = function() {
				return this.layer.getWeights()
			}, t.prototype.setWeights = function(e) {
				this.layer.setWeights(e)
			}, t.prototype.getConfig = function() {
				var t = {
						layer: {
							className: this.layer.getClassName(),
							config: this.layer.getConfig()
						}
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t.fromConfig = function(e, t, r) {
				void 0 === r && (r = {});
				var n = deserialize(t.layer, r);
				delete t.layer;
				var a = {
					layer: n
				};
				return Object.assign(a, t), new e(a)
			}, t
		}(Layer),
		TimeDistributed = function(e) {
			function t(t) {
				var r = e.call(this, t) || this;
				return r.supportsMasking = !0, r
			}
			return __extends$27(t, e), t.prototype.build = function(t) {
				if ((t = getExactlyOneShape(t)).length < 3) throw new ValueError("TimeDistributed layer expects an input shape >= 3D, but received input shape " + JSON.stringify(t));
				this.inputSpec = [{
					shape: t
				}];
				var r = [t[0]].concat(t.slice(2));
				this.layer.built || (this.layer.build(r), this.layer.built = !0), e.prototype.build.call(this, t)
			}, t.prototype.computeOutputShape = function(e) {
				var t = [(e = getExactlyOneShape(e))[0]].concat(e.slice(2)),
					r = this.layer.computeOutputShape(t),
					n = e[1];
				return [r[0], n].concat(r.slice(1))
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					return rnn(function(e, n) {
						return [r.layer.call(e, t), []]
					}, e = getExactlyOneTensor(e), [], !1, null, null, !1, e.shape[1])[1]
				})
			}, t.className = "TimeDistributed", t
		}(Wrapper);
	SerializationMap.register(TimeDistributed);
	var VALID_BIDIRECTIONAL_MERGE_MODES = ["sum", "mul", "concat", "ave"],
		Bidirectional = function(e) {
			function t(t) {
				var r = e.call(this, t) || this,
					n = t.layer.getConfig();
				if (r.forwardLayer = deserialize({
						className: t.layer.getClassName(),
						config: n
					}), n.goBackwards = !0 !== n.goBackwards, r.backwardLayer = deserialize({
						className: t.layer.getClassName(),
						config: n
					}), r.forwardLayer.name = "forward_" + r.forwardLayer.name, r.backwardLayer.name = "backward_" + r.backwardLayer.name, checkBidirectionalMergeMode(t.mergeMode), r.mergeMode = t.mergeMode, t.weights) throw new NotImplementedError("weights support is not implemented for Bidirectional layer yet.");
				return r._stateful = t.layer.stateful, r.returnSequences = t.layer.returnSequences, r.returnState = t.layer.returnState, r.supportsMasking = !0, r._trainable = !0, r.inputSpec = t.layer.inputSpec, r
			}
			return __extends$27(t, e), Object.defineProperty(t.prototype, "trainable", {
				get: function() {
					return this._trainable
				},
				set: function(e) {
					this._trainable = e, null != this.forwardLayer && (this.forwardLayer.trainable = e), null != this.backwardLayer && (this.backwardLayer.trainable = e)
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.getWeights = function() {
				return this.forwardLayer.getWeights().concat(this.backwardLayer.getWeights())
			}, t.prototype.setWeights = function(e) {
				var t = e.length,
					r = Math.floor(t / 2);
				this.forwardLayer.setWeights(e.slice(0, r)), this.backwardLayer.setWeights(e.slice(r))
			}, t.prototype.computeOutputShape = function(e) {
				var t = this.forwardLayer.computeOutputShape(e);
				Array.isArray(t) && Array.isArray(t[0]) || (t = [t]), t = t;
				var r, n, a;
				return this.returnState ? (a = t.slice(1), r = t[0]) : r = t[0], r = r, "concat" === this.mergeMode ? (r[r.length - 1] *= 2, n = [r]) : n = null == this.mergeMode ? [r, r.slice()] : [r], this.returnState ? null == this.mergeMode ? n.concat(a).concat(a.slice()) : [r].concat(a).concat(a.slice()) : singletonOrArray(n)
			}, t.prototype.apply = function(t, r) {
				var n = null;
				if (null != r && (n = r.initialState), Array.isArray(t) && (n = t.slice(1), t = t[0]), null == n || 0 === n.length) return e.prototype.apply.call(this, t, r);
				throw new NotImplementedError("The support for initial states is not implemented for Bidirectional layers yet.")
			}, t.prototype.call = function(e, t) {
				var r = this;
				return tidy(function() {
					if (null != t.mask) throw new NotImplementedError("The support for masking is not implemented for Bidirectional layers yet.");
					if (null != t.initialState) throw new NotImplementedError("The support for initial states is not implemented for Bidirectional layers yet.");
					var n, a = r.forwardLayer.call(e, t),
						o = r.backwardLayer.call(e, t);
					r.returnState && (Array.isArray(a) && (n = a.slice(1).concat(o.slice(1))), a = a[0], o = o[0]), r.returnSequences && (o = reverse(o, 1));
					var i;
					return "concat" === r.mergeMode ? i = concatenate([a, o]) : "sum" === r.mergeMode ? i = add(a, o) : "ave" === r.mergeMode ? i = scalarTimesArray(getScalar(.5), add(a, o)) : "mul" === r.mergeMode ? i = mul(a, o) : null == r.mergeMode && (i = [a, o]), r.returnState ? null == r.mergeMode ? i.concat(n) : [i].concat(n) : i
				})
			}, t.prototype.resetStates = function(e) {
				this.forwardLayer.resetStates(), this.backwardLayer.resetStates()
			}, t.prototype.build = function(e) {
				var t = this;
				nameScope$1(this.forwardLayer.name, function() {
					t.forwardLayer.build(e)
				}), nameScope$1(this.backwardLayer.name, function() {
					t.backwardLayer.build(e)
				}), this.built = !0
			}, Object.defineProperty(t.prototype, "trainableWeights", {
				get: function() {
					return this.forwardLayer.trainableWeights.concat(this.backwardLayer.trainableWeights)
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "nonTrainableWeights", {
				get: function() {
					return this.forwardLayer.nonTrainableWeights.concat(this.backwardLayer.nonTrainableWeights)
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.getConfig = function() {
				var t = {
						mergeMode: this.mergeMode
					},
					r = e.prototype.getConfig.call(this);
				return Object.assign(t, r), t
			}, t.fromConfig = function(e, t) {
				var r = deserialize(t.layer);
				if (delete t.layer, null != t.numConstants) throw new NotImplementedError("Deserialization of a Bidirectional layer with numConstants present is not supported yet.");
				var n = t;
				return n.layer = r, new e(n)
			}, t.className = "Bidirectional", t
		}(Wrapper);
	SerializationMap.register(Bidirectional);
	var __extends$28 = function() {
			var e = Object.setPrototypeOf || {
				__proto__: []
			}
			instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
			};
			return function(t, r) {
				function n() {
					this.constructor = t
				}
				e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
			}
		}(),
		__decorate$38 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		__awaiter$16 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$16 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		Sequential = function(e) {
			function t(t) {
				var r = e.call(this, {
					inputs: [],
					outputs: []
				}) || this;
				if (t = t || {}, r.trainable = !0, r._updatable = !0, r.built = !1, r.name = null != t.name ? t.name : getUid("sequential_"), null != t.layers)
					for (var n = 0, a = t.layers; n < a.length; n++) {
						var o = a[n];
						r.add(o)
					}
				return r
			}
			return __extends$28(t, e), r = t, t.prototype.add = function(e) {
				var t, n = e instanceof r || e instanceof Model;
				if (n) {
					if (1 !== (t = e).outputs.length) throw new ValueError("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");
					if (1 !== t.inputs.length) throw new ValueError("All layers in a Sequential model should have a single input tensor. For multi-input layers, use the functional API.")
				}
				if (0 === this.outputs.length) {
					if (0 === e.inboundNodes.length) {
						if (null == e.batchInputShape) throw new ValueError("The first layer in a Sequential model must get an `inputShape` or `batchInputShape` argument.");
						var a = Input({
							batchShape: e.batchInputShape,
							dtype: e.dtype,
							name: e.name + "_input"
						});
						e.apply(a)
					}
					if (n) this.outputs = t.outputs, this.inputs = t.inputs;
					else {
						if (1 !== e.inboundNodes.length) throw new ValueError("A layer added to a Sequential model must not already be connected somewhere else. Model received layer " + e.name + " which has " + e.inboundNodes.length + " pre-existing inbound connections.");
						if (1 !== e.inboundNodes[0].outputTensors.length) throw new ValueError("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");
						this.outputs = [e.inboundNodes[0].outputTensors[0]], this.inputs = getSourceInputs(this.outputs[0])
					}
					new Node({
						outboundLayer: this,
						inboundLayers: [],
						nodeIndices: [],
						tensorIndices: [],
						inputTensors: this.inputs,
						outputTensors: this.outputs,
						inputMasks: pyListRepeat(null, this.inputs.length),
						outputMasks: [null],
						inputShapes: this.inputs.map(function(e) {
							return e.shape
						}),
						outputShapes: this.outputs[0].shape
					})
				} else {
					var o = e.apply(this.outputs[0]);
					if (Array.isArray(o)) throw new TypeError("All layers in a Sequential model should have a single output tensor. For multi-output layers, use the functional API.");
					this.outputs = [o], this.inboundNodes[0].outputTensors = this.outputs, this.inboundNodes[0].outputShapes = [this.outputs[0].shape]
				}
				this.layers.push(e), this.built = !1
			}, t.prototype.pop = function() {
				if (0 === this.layers.length) throw new TypeError("There are no layers in the model.");
				if (this.layers.pop(), 0 === this.layers.length) this.outputs = [], this.inboundNodes = [], this.outboundNodes = [];
				else {
					var e = this.layers.length - 1;
					this.layers[e].outboundNodes = [], this.outputs = [this.layers[e].output], this.inboundNodes[0].outputTensors = this.outputs, this.inboundNodes[0].outputShapes = [this.outputs[0].shape]
				}
			}, t.prototype.call = function(e, t) {
				return null == this.model && this.build(), this.model.call(e, t)
			}, t.prototype.build = function(e) {
				if (getExactlyOneShape(e), 0 === this.inputs.length || 0 === this.outputs.length) throw new TypeError("Sequential model cannot be built: model is empty. Add some layers first.");
				this.model = new Model({
					inputs: this.inputs,
					outputs: this.outputs[0],
					name: this.name + "_model"
				}), this.model.trainable = this.trainable, this.model.updatable = this.updatable, this.supportsMasking = this.model.supportsMasking, this.inputLayers = this.model.inputLayers, this.inputLayersNodeIndices = this.model.inputLayersNodeIndices, this.inputLayersTensorIndices = this.model.inputLayersTensorIndices, this.outputLayers = this.model.outputLayers, this.outputLayersNodeIndices = this.model.outputLayersNodeIndices, this.outputLayersTensorIndices = this.model.outputLayersTensorIndices, this.nodesByDepth = this.model.nodesByDepth, this.containerNodes = this.model.containerNodes, this.outputNames = this.model.outputNames, this.inputNames = this.model.inputNames, this.built = !0
			}, t.prototype.setWeights = function(e) {
				null == this.model && this.build(), this.model.setWeights(e)
			}, Object.defineProperty(t.prototype, "updatable", {
				get: function() {
					return this._updatable
				},
				set: function(e) {
					this.built && (this.model.updatable = e), this._updatable = e
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.evaluate = function(e, t, r) {
				if (void 0 === r && (r = {}), !this.built) throw new RuntimeError("The model needs to be compiled before being used.");
				return this.model.evaluate(e, t, r)
			}, t.prototype.predict = function(e, t) {
				return void 0 === t && (t = {}), null == this.model && this.build(), this.model.predict(e, t)
			}, t.prototype.predictOnBatch = function(e) {
				return null == this.model && this.build(), this.model.predictOnBatch(e)
			}, t.prototype.compile = function(e) {
				this.build(), this.model.compile(e), this.optimizer = this.model.optimizer, this.loss = this.model.loss, this.metrics = this.model.metrics, this.metricsTensors = this.model.metricsTensors, this.metricsNames = this.model.metricsNames
			}, t.prototype.fit = function(e, t, r) {
				return void 0 === r && (r = {}), __awaiter$16(this, void 0, void 0, function() {
					return __generator$16(this, function(n) {
						if (!this.built) throw new RuntimeError("The model needs to be compiled before being used.");
						return [2, this.model.fit(e, t, r)]
					})
				})
			}, t.fromConfig = function(e, t) {
				var n = new e({});
				if (!(n instanceof r)) throw new ValueError("Sequential.fromConfig called on non-Sequential input: " + n);
				if (!(t instanceof Array)) throw new ValueError("Sequential.fromConfig called without an array of configs");
				if (null == t[0].className || "Merge" === t[0].className) throw new ValueError("Legacy serialization format not supported yet.");
				for (var a = 0, o = t; a < o.length; a++) {
					var i = deserialize(o[a]);
					n.add(i)
				}
				return n
			}, t.prototype.getConfig = function() {
				for (var e = [], t = 0, r = this.layers; t < r.length; t++) {
					var n = r[t];
					e.push({
						className: n.getClassName(),
						config: n.getConfig()
					})
				}
				return e
			}, t.className = "Sequential", __decorate$38([doc()], t.prototype, "add", null), __decorate$38([doc()], t.prototype, "evaluate", null), __decorate$38([doc()], t.prototype, "predict", null), __decorate$38([doc()], t.prototype, "fit", null), t = r = __decorate$38([doc()], t);
			var r
		}(Model);
	SerializationMap.register(Sequential);
	var __decorate$39 = function(e, t, r, n) {
			var a, o = arguments.length,
				i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
			if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n);
			else
				for (var s = e.length - 1; s >= 0; s--)(a = e[s]) && (i = (o < 3 ? a(i) : o > 3 ? a(t, r, i) : a(t, r)) || i);
			return o > 3 && i && Object.defineProperty(t, r, i), i
		},
		ModelExports = function() {
			function e() {}
			return e.model = function(e) {
				return new Model(e)
			}, e.sequential = function(e) {
				return new Sequential(e)
			}, e.loadModel = function(e) {
				return loadModelInternal(e)
			}, e.input = function(e) {
				return Input(e)
			}, __decorate$39([doc()], e, "model", null), __decorate$39([doc()], e, "sequential", null), __decorate$39([doc()], e, "loadModel", null), __decorate$39([doc()], e, "input", null), e
		}(),
		LayerExports = function() {
			function e() {}
			return e.inputLayer = function(e) {
				return new InputLayer(e)
			}, e.elu = function(e) {
				return new ELU$1(e)
			}, e.leakyReLU = function(e) {
				return new LeakyReLU(e)
			}, e.softmax = function(e) {
				return new Softmax$1(e)
			}, e.thresholdedReLU = function(e) {
				return new ThresholdedReLU(e)
			}, e.conv1d = function(e) {
				return new Conv1D(e)
			}, e.conv2d = function(e) {
				return new Conv2D(e)
			}, e.conv2dTranspose = function(e) {
				return new Conv2DTranspose(e)
			}, e.separableConv2d = function(e) {
				return new SeparableConv2D(e)
			}, e.cropping2D = function(e) {
				return new Cropping2D(e)
			}, e.upSampling2d = function(e) {
				return new UpSampling2D(e)
			}, e.depthwiseConv2d = function(e) {
				return new DepthwiseConv2D(e)
			}, e.activation = function(e) {
				return new Activation$1(e)
			}, e.dense = function(e) {
				return new Dense(e)
			}, e.dropout = function(e) {
				return new Dropout(e)
			}, e.flatten = function(e) {
				return new Flatten(e)
			}, e.repeatVector = function(e) {
				return new RepeatVector(e)
			}, e.reshape = function(e) {
				return new Reshape(e)
			}, e.embedding = function(e) {
				return new Embedding(e)
			}, e.add = function(e) {
				return new Add(e)
			}, e.average = function(e) {
				return new Average(e)
			}, e.concatenate = function(e) {
				return new Concatenate(e)
			}, e.maximum = function(e) {
				return new Maximum(e)
			}, e.minimum = function(e) {
				return new Minimum(e)
			}, e.multiply = function(e) {
				return new Multiply(e)
			}, e.batchNormalization = function(e) {
				return new BatchNormalization(e)
			}, e.zeroPadding2d = function(e) {
				return new ZeroPadding2D(e)
			}, e.averagePooling1d = function(e) {
				return new AveragePooling1D(e)
			}, e.avgPool1d = function(t) {
				return e.averagePooling1d(t)
			}, e.avgPooling1d = function(t) {
				return e.averagePooling1d(t)
			}, e.averagePooling2d = function(e) {
				return new AveragePooling2D(e)
			}, e.avgPool2d = function(t) {
				return e.averagePooling2d(t)
			}, e.avgPooling2d = function(t) {
				return e.averagePooling2d(t)
			}, e.globalAveragePooling1d = function(e) {
				return new GlobalAveragePooling1D(e)
			}, e.globalAveragePooling2d = function(e) {
				return new GlobalAveragePooling2D(e)
			}, e.globalMaxPooling1d = function(e) {
				return new GlobalMaxPooling1D(e)
			}, e.globalMaxPooling2d = function(e) {
				return new GlobalMaxPooling2D(e)
			}, e.maxPooling1d = function(e) {
				return new MaxPooling1D(e)
			}, e.maxPooling2d = function(e) {
				return new MaxPooling2D(e)
			}, e.gru = function(e) {
				return new GRU(e)
			}, e.gruCell = function(e) {
				return new GRUCell(e)
			}, e.lstm = function(e) {
				return new LSTM(e)
			}, e.lstmCell = function(e) {
				return new LSTMCell(e)
			}, e.simpleRNN = function(e) {
				return new SimpleRNN(e)
			}, e.simpleRNNCell = function(e) {
				return new SimpleRNNCell(e)
			}, e.rnn = function(e) {
				return new RNN(e)
			}, e.stackedRNNCells = function(e) {
				return new StackedRNNCells(e)
			}, e.bidirectional = function(e) {
				return new Bidirectional(e)
			}, e.timeDistributed = function(e) {
				return new TimeDistributed(e)
			}, e.Layer = Layer, e.RNN = RNN, e.RNNCell = RNNCell, e.input = ModelExports.input, __decorate$39([doc()], e, "inputLayer", null), __decorate$39([doc()], e, "elu", null), __decorate$39([doc()], e, "leakyReLU", null), __decorate$39([doc()], e, "softmax", null), __decorate$39([doc()], e, "thresholdedReLU", null), __decorate$39([doc()], e, "conv1d", null), __decorate$39([doc()], e, "conv2d", null), __decorate$39([doc()], e, "conv2dTranspose", null), __decorate$39([doc()], e, "separableConv2d", null), __decorate$39([doc()], e, "cropping2D", null), __decorate$39([doc()], e, "upSampling2d", null), __decorate$39([doc()], e, "depthwiseConv2d", null), __decorate$39([doc()], e, "activation", null), __decorate$39([doc()], e, "dense", null), __decorate$39([doc()], e, "dropout", null), __decorate$39([doc()], e, "flatten", null), __decorate$39([doc()], e, "repeatVector", null), __decorate$39([doc()], e, "reshape", null), __decorate$39([doc()], e, "embedding", null), __decorate$39([doc()], e, "add", null), __decorate$39([doc()], e, "average", null), __decorate$39([doc()], e, "concatenate", null), __decorate$39([doc()], e, "maximum", null), __decorate$39([doc()], e, "minimum", null), __decorate$39([doc()], e, "multiply", null), __decorate$39([doc()], e, "batchNormalization", null), __decorate$39([doc()], e, "zeroPadding2d", null), __decorate$39([doc()], e, "averagePooling1d", null), __decorate$39([doc()], e, "averagePooling2d", null), __decorate$39([doc()], e, "globalAveragePooling1d", null), __decorate$39([doc()], e, "globalAveragePooling2d", null), __decorate$39([doc()], e, "globalMaxPooling1d", null), __decorate$39([doc()], e, "globalMaxPooling2d", null), __decorate$39([doc()], e, "maxPooling1d", null), __decorate$39([doc()], e, "maxPooling2d", null), __decorate$39([doc()], e, "gru", null), __decorate$39([doc()], e, "gruCell", null), __decorate$39([doc()], e, "lstm", null), __decorate$39([doc()], e, "lstmCell", null), __decorate$39([doc()], e, "simpleRNN", null), __decorate$39([doc()], e, "simpleRNNCell", null), __decorate$39([doc()], e, "rnn", null), __decorate$39([doc()], e, "stackedRNNCells", null), __decorate$39([doc()], e, "bidirectional", null), __decorate$39([doc()], e, "timeDistributed", null), e
		}(),
		ConstraintExports = function() {
			function e() {}
			return e.maxNorm = function(e) {
				return new MaxNorm(e)
			}, e.unitNorm = function(e) {
				return new UnitNorm(e)
			}, e.nonNeg = function() {
				return new NonNeg
			}, e.minMaxNorm = function(e) {
				return new MinMaxNorm(e)
			}, __decorate$39([doc()], e, "maxNorm", null), __decorate$39([doc()], e, "unitNorm", null), __decorate$39([doc()], e, "nonNeg", null), __decorate$39([doc()], e, "minMaxNorm", null), e
		}(),
		InitializerExports = function() {
			function e() {}
			return e.zeros = function() {
				return new Zeros
			}, e.ones = function() {
				return new Ones
			}, e.constant = function(e) {
				return new Constant(e)
			}, e.randomUniform = function(e) {
				return new RandomUniform(e)
			}, e.randomNormal = function(e) {
				return new RandomNormal(e)
			}, e.truncatedNormal = function(e) {
				return new TruncatedNormal(e)
			}, e.identity = function(e) {
				return new Identity(e)
			}, e.varianceScaling = function(e) {
				return new VarianceScaling(e)
			}, e.glorotUniform = function(e) {
				return new GlorotUniform(e)
			}, e.glorotNormal = function(e) {
				return new GlorotNormal(e)
			}, e.heNormal = function(e) {
				return new HeNormal(e)
			}, e.leCunNormal = function(e) {
				return new LeCunNormal(e)
			}, e.orthogonal = function(e) {
				return new Orthogonal(e)
			}, __decorate$39([doc()], e, "zeros", null), __decorate$39([doc()], e, "ones", null), __decorate$39([doc()], e, "constant", null), __decorate$39([doc()], e, "randomUniform", null), __decorate$39([doc()], e, "randomNormal", null), __decorate$39([doc()], e, "truncatedNormal", null), __decorate$39([doc()], e, "identity", null), __decorate$39([doc()], e, "varianceScaling", null), __decorate$39([doc()], e, "glorotUniform", null), __decorate$39([doc()], e, "glorotNormal", null), __decorate$39([doc()], e, "heNormal", null), __decorate$39([doc()], e, "leCunNormal", null), __decorate$39([doc()], e, "orthogonal", null), e
		}(),
		MetricExports = function() {
			function e() {}
			return e.binaryAccuracy = function(e, t) {
				return binaryAccuracy(e, t)
			}, e.binaryCrossentropy = function(e, t) {
				return binaryCrossentropy$1(e, t)
			}, e.categoricalAccuracy = function(e, t) {
				return categoricalAccuracy(e, t)
			}, e.categoricalCrossentropy = function(e, t) {
				return categoricalCrossentropy(e, t)
			}, e.cosineProximity = function(e, t) {
				return cosineProximity(e, t)
			}, e.prototype.meanAbsoluteError = function(e, t) {
				return meanAbsoluteError(e, t)
			}, e.prototype.meanAbsolutePercentageError = function(e, t) {
				return meanAbsolutePercentageError(e, t)
			}, e.prototype.MAPE = function(e, t) {
				return meanAbsolutePercentageError(e, t)
			}, e.prototype.mape = function(e, t) {
				return meanAbsolutePercentageError(e, t)
			}, e.meanSquaredError = function(e, t) {
				return meanSquaredError(e, t)
			}, e.MSE = function(e, t) {
				return meanSquaredError(e, t)
			}, e.mse = function(e, t) {
				return meanSquaredError(e, t)
			}, __decorate$39([doc()], e.prototype, "meanAbsoluteError", null), __decorate$39([doc()], e.prototype, "meanAbsolutePercentageError", null), __decorate$39([doc()], e, "binaryAccuracy", null), __decorate$39([doc()], e, "binaryCrossentropy", null), __decorate$39([doc()], e, "categoricalAccuracy", null), __decorate$39([doc()], e, "categoricalCrossentropy", null), __decorate$39([doc()], e, "cosineProximity", null), __decorate$39([doc()], e, "meanSquaredError", null), e
		}(),
		RegularizerExports = function() {
			function e() {}
			return e.l1l2 = function(e) {
				return new L1L2(e)
			}, e.l1 = function(e) {
				return l1(e)
			}, e.l2 = function(e) {
				return l2(e)
			}, __decorate$39([doc()], e, "l1l2", null), __decorate$39([doc()], e, "l1", null), __decorate$39([doc()], e, "l2", null), e
		}(),
		model = ModelExports.model,
		sequential = ModelExports.sequential,
		loadModel = ModelExports.loadModel,
		input = ModelExports.input,
		layers = LayerExports,
		constraints = ConstraintExports,
		initializers = InitializerExports,
		metrics = MetricExports,
		regularizers = RegularizerExports,
		punycode = createCommonjsModule(function(e, t) {
			! function(r) {
				function n(e) {
					throw RangeError(P[e])
				}

				function a(e, t) {
					for (var r = e.length, n = []; r--;) n[r] = t(e[r]);
					return n
				}

				function o(e, t) {
					var r = e.split("@"),
						n = "";
					return r.length > 1 && (n = r[0] + "@", e = r[1]), n + a((e = e.replace(O, ".")).split("."), t).join(".")
				}

				function i(e) {
					for (var t, r, n = [], a = 0, o = e.length; a < o;)(t = e.charCodeAt(a++)) >= 55296 && t <= 56319 && a < o ? 56320 == (64512 & (r = e.charCodeAt(a++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), a--) : n.push(t);
					return n
				}

				function s(e) {
					return a(e, function(e) {
						var t = "";
						return e > 65535 && (t += k((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += k(e)
					}).join("")
				}

				function u(e) {
					return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : b
				}

				function l(e, t) {
					return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
				}

				function c(e, t, r) {
					var n = 0;
					for (e = r ? C(e / S) : e >> 1, e += C(e / t); e > R * w >> 1; n += b) e = C(e / R);
					return C(n + (R + 1) * e / (e + _))
				}

				function p(e) {
					var t, r, a, o, i, l, p, d, h, f, m = [],
						g = e.length,
						y = 0,
						_ = A,
						S = N;
					for ((r = e.lastIndexOf(E)) < 0 && (r = 0), a = 0; a < r; ++a) e.charCodeAt(a) >= 128 && n("not-basic"), m.push(e.charCodeAt(a));
					for (o = r > 0 ? r + 1 : 0; o < g;) {
						for (i = y, l = 1, p = b; o >= g && n("invalid-input"), ((d = u(e.charCodeAt(o++))) >= b || d > C((v - y) / l)) && n("overflow"), y += d * l, h = p <= S ? x : p >= S + w ? w : p - S, !(d < h); p += b) l > C(v / (f = b - h)) && n("overflow"), l *= f;
						S = c(y - i, t = m.length + 1, 0 == i), C(y / t) > v - _ && n("overflow"), _ += C(y / t), y %= t, m.splice(y++, 0, _)
					}
					return s(m)
				}

				function d(e) {
					var t, r, a, o, s, u, p, d, h, f, m, g, y, _, S, T = [];
					for (g = (e = i(e)).length, t = A, r = 0, s = N, u = 0; u < g; ++u)(m = e[u]) < 128 && T.push(k(m));
					for (a = o = T.length, o && T.push(E); a < g;) {
						for (p = v, u = 0; u < g; ++u)(m = e[u]) >= t && m < p && (p = m);
						for (p - t > C((v - r) / (y = a + 1)) && n("overflow"), r += (p - t) * y, t = p, u = 0; u < g; ++u)
							if ((m = e[u]) < t && ++r > v && n("overflow"), m == t) {
								for (d = r, h = b; f = h <= s ? x : h >= s + w ? w : h - s, !(d < f); h += b) S = d - f, _ = b - f, T.push(k(l(f + S % _, 0))), d = C(S / _);
								T.push(k(l(d, 0))), s = c(r, y, a == o), r = 0, ++a
							}++ r, ++t
					}
					return T.join("")
				}
				var h = t && !t.nodeType && t,
					f = e && !e.nodeType && e,
					m = "object" == typeof commonjsGlobal && commonjsGlobal;
				m.global !== m && m.window !== m && m.self !== m || (r = m);
				var g, y, v = 2147483647,
					b = 36,
					x = 1,
					w = 26,
					_ = 38,
					S = 700,
					N = 72,
					A = 128,
					E = "-",
					T = /^xn--/,
					I = /[^\x20-\x7E]/,
					O = /[\x2E\u3002\uFF0E\uFF61]/g,
					P = {
						overflow: "Overflow: input needs wider integers to process",
						"not-basic": "Illegal input >= 0x80 (not a basic code point)",
						"invalid-input": "Invalid input"
					},
					R = b - x,
					C = Math.floor,
					k = String.fromCharCode;
				if (g = {
						version: "1.3.2",
						ucs2: {
							decode: i,
							encode: s
						},
						decode: p,
						encode: d,
						toASCII: function(e) {
							return o(e, function(e) {
								return I.test(e) ? "xn--" + d(e) : e
							})
						},
						toUnicode: function(e) {
							return o(e, function(e) {
								return T.test(e) ? p(e.slice(4).toLowerCase()) : e
							})
						}
					}, h && f)
					if (e.exports == h) f.exports = g;
					else
						for (y in g) g.hasOwnProperty(y) && (h[y] = g[y]);
				else r.punycode = g
			}(commonjsGlobal)
		}),
		util$1 = {
			isString: function(e) {
				return "string" == typeof e
			},
			isObject: function(e) {
				return "object" == typeof e && null !== e
			},
			isNull: function(e) {
				return null === e
			},
			isNullOrUndefined: function(e) {
				return null == e
			}
		},
		decode = function(e, t, r, n) {
			t = t || "&", r = r || "=";
			var a = {};
			if ("string" != typeof e || 0 === e.length) return a;
			var o = /\+/g;
			e = e.split(t);
			var i = 1e3;
			n && "number" == typeof n.maxKeys && (i = n.maxKeys);
			var s = e.length;
			i > 0 && s > i && (s = i);
			for (var u = 0; u < s; ++u) {
				var l, c, p, d, h = e[u].replace(o, "%20"),
					f = h.indexOf(r);
				f >= 0 ? (l = h.substr(0, f), c = h.substr(f + 1)) : (l = h, c = ""), p = decodeURIComponent(l), d = decodeURIComponent(c), hasOwnProperty(a, p) ? Array.isArray(a[p]) ? a[p].push(d) : a[p] = [a[p], d] : a[p] = d
			}
			return a
		},
		stringifyPrimitive = function(e) {
			switch (typeof e) {
				case "string":
					return e;
				case "boolean":
					return e ? "true" : "false";
				case "number":
					return isFinite(e) ? e : "";
				default:
					return ""
			}
		},
		encode = function(e, t, r, n) {
			return t = t || "&", r = r || "=", null === e && (e = void 0), "object" == typeof e ? Object.keys(e).map(function(n) {
				var a = encodeURIComponent(stringifyPrimitive(n)) + r;
				return Array.isArray(e[n]) ? e[n].map(function(e) {
					return a + encodeURIComponent(stringifyPrimitive(e))
				}).join(t) : a + encodeURIComponent(stringifyPrimitive(e[n]))
			}).join(t) : n ? encodeURIComponent(stringifyPrimitive(n)) + r + encodeURIComponent(stringifyPrimitive(e)) : ""
		},
		querystring = createCommonjsModule(function(e, t) {
			t.decode = t.parse = decode, t.encode = t.stringify = encode
		}),
		querystring_1 = querystring.decode,
		querystring_2 = querystring.parse,
		querystring_3 = querystring.encode,
		querystring_4 = querystring.stringify,
		parse = urlParse,
		format = urlFormat,
		protocolPattern = /^([a-z0-9.+-]+:)/i,
		portPattern = /:[0-9]*$/,
		simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
		delims = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
		unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims),
		autoEscape = ["'"].concat(unwise),
		nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape),
		hostEndingChars = ["/", "?", "#"],
		hostnameMaxLen = 255,
		hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
		hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
		unsafeProtocol = {
			javascript: !0,
			"javascript:": !0
		},
		hostlessProtocol = {
			javascript: !0,
			"javascript:": !0
		},
		slashedProtocol = {
			http: !0,
			https: !0,
			ftp: !0,
			gopher: !0,
			file: !0,
			"http:": !0,
			"https:": !0,
			"ftp:": !0,
			"gopher:": !0,
			"file:": !0
		};
	Url.prototype.parse = function(e, t, r) {
		if (!util$1.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
		var n = e.indexOf("?"),
			a = -1 !== n && n < e.indexOf("#") ? "?" : "#",
			o = e.split(a),
			i = /\\/g;
		o[0] = o[0].replace(i, "/");
		var s = e = o.join(a);
		if (s = s.trim(), !r && 1 === e.split("#").length) {
			var u = simplePathPattern.exec(s);
			if (u) return this.path = s, this.href = s, this.pathname = u[1], u[2] ? (this.search = u[2], this.query = t ? querystring.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this
		}
		var l = protocolPattern.exec(s);
		if (l) {
			var c = (l = l[0]).toLowerCase();
			this.protocol = c, s = s.substr(l.length)
		}
		if (r || l || s.match(/^\/\/[^@\/]+@[^@\/]+/)) {
			var p = "//" === s.substr(0, 2);
			!p || l && hostlessProtocol[l] || (s = s.substr(2), this.slashes = !0)
		}
		if (!hostlessProtocol[l] && (p || l && !slashedProtocol[l])) {
			for (var d = -1, h = 0; h < hostEndingChars.length; h++) - 1 !== (g = s.indexOf(hostEndingChars[h])) && (-1 === d || g < d) && (d = g);
			var f, m; - 1 !== (m = -1 === d ? s.lastIndexOf("@") : s.lastIndexOf("@", d)) && (f = s.slice(0, m), s = s.slice(m + 1), this.auth = decodeURIComponent(f)), d = -1;
			for (h = 0; h < nonHostChars.length; h++) {
				var g = s.indexOf(nonHostChars[h]); - 1 !== g && (-1 === d || g < d) && (d = g)
			} - 1 === d && (d = s.length), this.host = s.slice(0, d), s = s.slice(d), this.parseHost(), this.hostname = this.hostname || "";
			var y = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
			if (!y)
				for (var v = this.hostname.split(/\./), h = 0, b = v.length; h < b; h++) {
					var x = v[h];
					if (x && !x.match(hostnamePartPattern)) {
						for (var w = "", _ = 0, S = x.length; _ < S; _++) x.charCodeAt(_) > 127 ? w += "x" : w += x[_];
						if (!w.match(hostnamePartPattern)) {
							var N = v.slice(0, h),
								A = v.slice(h + 1),
								E = x.match(hostnamePartStart);
							E && (N.push(E[1]), A.unshift(E[2])), A.length && (s = "/" + A.join(".") + s), this.hostname = N.join(".");
							break
						}
					}
				}
			this.hostname.length > hostnameMaxLen ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), y || (this.hostname = punycode.toASCII(this.hostname));
			var T = this.port ? ":" + this.port : "",
				I = this.hostname || "";
			this.host = I + T, this.href += this.host, y && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== s[0] && (s = "/" + s))
		}
		if (!unsafeProtocol[c])
			for (var h = 0, b = autoEscape.length; h < b; h++) {
				var O = autoEscape[h];
				if (-1 !== s.indexOf(O)) {
					var P = encodeURIComponent(O);
					P === O && (P = escape(O)), s = s.split(O).join(P)
				}
			}
		var R = s.indexOf("#"); - 1 !== R && (this.hash = s.substr(R), s = s.slice(0, R));
		var C = s.indexOf("?");
		if (-1 !== C ? (this.search = s.substr(C), this.query = s.substr(C + 1), t && (this.query = querystring.parse(this.query)), s = s.slice(0, C)) : t && (this.search = "", this.query = {}), s && (this.pathname = s), slashedProtocol[c] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
			var T = this.pathname || "",
				k = this.search || "";
			this.path = T + k
		}
		return this.href = this.format(), this
	}, Url.prototype.format = function() {
		var e = this.auth || "";
		e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
		var t = this.protocol || "",
			r = this.pathname || "",
			n = this.hash || "",
			a = !1,
			o = "";
		this.host ? a = e + this.host : this.hostname && (a = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (a += ":" + this.port)), this.query && util$1.isObject(this.query) && Object.keys(this.query).length && (o = querystring.stringify(this.query));
		var i = this.search || o && "?" + o || "";
		return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || slashedProtocol[t]) && !1 !== a ? (a = "//" + (a || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : a || (a = ""), n && "#" !== n.charAt(0) && (n = "#" + n), i && "?" !== i.charAt(0) && (i = "?" + i), r = r.replace(/[?#]/g, function(e) {
			return encodeURIComponent(e)
		}), i = i.replace("#", "%23"), t + a + r + i + n
	}, Url.prototype.resolve = function(e) {
		return this.resolveObject(urlParse(e, !1, !0)).format()
	}, Url.prototype.resolveObject = function(e) {
		if (util$1.isString(e)) {
			var t = new Url;
			t.parse(e, !1, !0), e = t
		}
		for (var r = new Url, n = Object.keys(this), a = 0; a < n.length; a++) {
			var o = n[a];
			r[o] = this[o]
		}
		if (r.hash = e.hash, "" === e.href) return r.href = r.format(), r;
		if (e.slashes && !e.protocol) {
			for (var i = Object.keys(e), s = 0; s < i.length; s++) {
				var u = i[s];
				"protocol" !== u && (r[u] = e[u])
			}
			return slashedProtocol[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r
		}
		if (e.protocol && e.protocol !== r.protocol) {
			if (!slashedProtocol[e.protocol]) {
				for (var l = Object.keys(e), c = 0; c < l.length; c++) {
					var p = l[c];
					r[p] = e[p]
				}
				return r.href = r.format(), r
			}
			if (r.protocol = e.protocol, e.host || hostlessProtocol[e.protocol]) r.pathname = e.pathname;
			else {
				for (b = (e.pathname || "").split("/"); b.length && !(e.host = b.shift()););
				e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== b[0] && b.unshift(""), b.length < 2 && b.unshift(""), r.pathname = b.join("/")
			}
			if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
				var d = r.pathname || "",
					h = r.search || "";
				r.path = d + h
			}
			return r.slashes = r.slashes || e.slashes, r.href = r.format(), r
		}
		var f = r.pathname && "/" === r.pathname.charAt(0),
			m = e.host || e.pathname && "/" === e.pathname.charAt(0),
			g = m || f || r.host && e.pathname,
			y = g,
			v = r.pathname && r.pathname.split("/") || [],
			b = e.pathname && e.pathname.split("/") || [],
			x = r.protocol && !slashedProtocol[r.protocol];
		if (x && (r.hostname = "", r.port = null, r.host && ("" === v[0] ? v[0] = r.host : v.unshift(r.host)), r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === b[0] ? b[0] = e.host : b.unshift(e.host)), e.host = null), g = g && ("" === b[0] || "" === v[0])), m) r.host = e.host || "" === e.host ? e.host : r.host, r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, v = b;
		else if (b.length) v || (v = []), v.pop(), v = v.concat(b), r.search = e.search, r.query = e.query;
		else if (!util$1.isNullOrUndefined(e.search)) return x && (r.hostname = r.host = v.shift(), (E = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = E.shift(), r.host = r.hostname = E.shift())), r.search = e.search, r.query = e.query, util$1.isNull(r.pathname) && util$1.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
		if (!v.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
		for (var w = v.slice(-1)[0], _ = (r.host || e.host || v.length > 1) && ("." === w || ".." === w) || "" === w, S = 0, N = v.length; N >= 0; N--) "." === (w = v[N]) ? v.splice(N, 1) : ".." === w ? (v.splice(N, 1), S++) : S && (v.splice(N, 1), S--);
		if (!g && !y)
			for (; S--; S) v.unshift("..");
		!g || "" === v[0] || v[0] && "/" === v[0].charAt(0) || v.unshift(""), _ && "/" !== v.join("/").substr(-1) && v.push("");
		var A = "" === v[0] || v[0] && "/" === v[0].charAt(0);
		if (x) {
			r.hostname = r.host = A ? "" : v.length ? v.shift() : "";
			var E = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
			E && (r.auth = E.shift(), r.host = r.hostname = E.shift())
		}
		return (g = g || r.host && v.length) && !A && v.unshift(""), v.length ? r.pathname = v.join("/") : (r.pathname = null, r.path = null), util$1.isNull(r.pathname) && util$1.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r
	}, Url.prototype.parseHost = function() {
		var e = this.host,
			t = portPattern.exec(e);
		t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e)
	};
	var aspromise = asPromise,
		base64_1 = createCommonjsModule(function(e, t) {
			var r = t;
			r.length = function(e) {
				var t = e.length;
				if (!t) return 0;
				for (var r = 0; --t % 4 > 1 && "=" === e.charAt(t);) ++r;
				return Math.ceil(3 * e.length) / 4 - r
			};
			for (var n = new Array(64), a = new Array(123), o = 0; o < 64;) a[n[o] = o < 26 ? o + 65 : o < 52 ? o + 71 : o < 62 ? o - 4 : o - 59 | 43] = o++;
			r.encode = function(e, t, r) {
				for (var a, o = null, i = [], s = 0, u = 0; t < r;) {
					var l = e[t++];
					switch (u) {
						case 0:
							i[s++] = n[l >> 2], a = (3 & l) << 4, u = 1;
							break;
						case 1:
							i[s++] = n[a | l >> 4], a = (15 & l) << 2, u = 2;
							break;
						case 2:
							i[s++] = n[a | l >> 6], i[s++] = n[63 & l], u = 0
					}
					s > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, i)), s = 0)
				}
				return u && (i[s++] = n[a], i[s++] = 61, 1 === u && (i[s++] = 61)), o ? (s && o.push(String.fromCharCode.apply(String, i.slice(0, s))), o.join("")) : String.fromCharCode.apply(String, i.slice(0, s))
			};
			r.decode = function(e, t, r) {
				for (var n, o = r, i = 0, s = 0; s < e.length;) {
					var u = e.charCodeAt(s++);
					if (61 === u && i > 1) break;
					if (void 0 === (u = a[u])) throw Error("invalid encoding");
					switch (i) {
						case 0:
							n = u, i = 1;
							break;
						case 1:
							t[r++] = n << 2 | (48 & u) >> 4, n = u, i = 2;
							break;
						case 2:
							t[r++] = (15 & n) << 4 | (60 & u) >> 2, n = u, i = 3;
							break;
						case 3:
							t[r++] = (3 & n) << 6 | u, i = 0
					}
				}
				if (1 === i) throw Error("invalid encoding");
				return r - o
			}, r.test = function(e) {
				return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)
			}
		}),
		eventemitter = EventEmitter;
	EventEmitter.prototype.on = function(e, t, r) {
		return (this._listeners[e] || (this._listeners[e] = [])).push({
			fn: t,
			ctx: r || this
		}), this
	}, EventEmitter.prototype.off = function(e, t) {
		if (void 0 === e) this._listeners = {};
		else if (void 0 === t) this._listeners[e] = [];
		else
			for (var r = this._listeners[e], n = 0; n < r.length;) r[n].fn === t ? r.splice(n, 1) : ++n;
		return this
	}, EventEmitter.prototype.emit = function(e) {
		var t = this._listeners[e];
		if (t) {
			for (var r = [], n = 1; n < arguments.length;) r.push(arguments[n++]);
			for (n = 0; n < t.length;) t[n].fn.apply(t[n++].ctx, r)
		}
		return this
	};
	var float_1 = factory(factory),
		inquire_1 = inquire,
		utf8_1 = createCommonjsModule(function(e, t) {
			var r = t;
			r.length = function(e) {
				for (var t = 0, r = 0, n = 0; n < e.length; ++n)(r = e.charCodeAt(n)) < 128 ? t += 1 : r < 2048 ? t += 2 : 55296 == (64512 & r) && 56320 == (64512 & e.charCodeAt(n + 1)) ? (++n, t += 4) : t += 3;
				return t
			}, r.read = function(e, t, r) {
				if (r - t < 1) return "";
				for (var n, a = null, o = [], i = 0; t < r;)(n = e[t++]) < 128 ? o[i++] = n : n > 191 && n < 224 ? o[i++] = (31 & n) << 6 | 63 & e[t++] : n > 239 && n < 365 ? (n = ((7 & n) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536, o[i++] = 55296 + (n >> 10), o[i++] = 56320 + (1023 & n)) : o[i++] = (15 & n) << 12 | (63 & e[t++]) << 6 | 63 & e[t++], i > 8191 && ((a || (a = [])).push(String.fromCharCode.apply(String, o)), i = 0);
				return a ? (i && a.push(String.fromCharCode.apply(String, o.slice(0, i))), a.join("")) : String.fromCharCode.apply(String, o.slice(0, i))
			}, r.write = function(e, t, r) {
				for (var n, a, o = r, i = 0; i < e.length; ++i)(n = e.charCodeAt(i)) < 128 ? t[r++] = n : n < 2048 ? (t[r++] = n >> 6 | 192, t[r++] = 63 & n | 128) : 55296 == (64512 & n) && 56320 == (64512 & (a = e.charCodeAt(i + 1))) ? (n = 65536 + ((1023 & n) << 10) + (1023 & a), ++i, t[r++] = n >> 18 | 240, t[r++] = n >> 12 & 63 | 128, t[r++] = n >> 6 & 63 | 128, t[r++] = 63 & n | 128) : (t[r++] = n >> 12 | 224, t[r++] = n >> 6 & 63 | 128, t[r++] = 63 & n | 128);
				return r - o
			}
		}),
		pool_1 = pool,
		longbits = LongBits,
		zero = LongBits.zero = new LongBits(0, 0);
	zero.toNumber = function() {
		return 0
	}, zero.zzEncode = zero.zzDecode = function() {
		return this
	}, zero.length = function() {
		return 1
	};
	var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
	LongBits.fromNumber = function(e) {
		if (0 === e) return zero;
		var t = e < 0;
		t && (e = -e);
		var r = e >>> 0,
			n = (e - r) / 4294967296 >>> 0;
		return t && (n = ~n >>> 0, r = ~r >>> 0, ++r > 4294967295 && (r = 0, ++n > 4294967295 && (n = 0))), new LongBits(r, n)
	}, LongBits.from = function(e) {
		if ("number" == typeof e) return LongBits.fromNumber(e);
		if (minimal.isString(e)) {
			if (!minimal.Long) return LongBits.fromNumber(parseInt(e, 10));
			e = minimal.Long.fromString(e)
		}
		return e.low || e.high ? new LongBits(e.low >>> 0, e.high >>> 0) : zero
	}, LongBits.prototype.toNumber = function(e) {
		if (!e && this.hi >>> 31) {
			var t = 1 + ~this.lo >>> 0,
				r = ~this.hi >>> 0;
			return t || (r = r + 1 >>> 0), -(t + 4294967296 * r)
		}
		return this.lo + 4294967296 * this.hi
	}, LongBits.prototype.toLong = function(e) {
		return minimal.Long ? new minimal.Long(0 | this.lo, 0 | this.hi, Boolean(e)) : {
			low: 0 | this.lo,
			high: 0 | this.hi,
			unsigned: Boolean(e)
		}
	};
	var charCodeAt = String.prototype.charCodeAt;
	LongBits.fromHash = function(e) {
		return e === zeroHash ? zero : new LongBits((charCodeAt.call(e, 0) | charCodeAt.call(e, 1) << 8 | charCodeAt.call(e, 2) << 16 | charCodeAt.call(e, 3) << 24) >>> 0, (charCodeAt.call(e, 4) | charCodeAt.call(e, 5) << 8 | charCodeAt.call(e, 6) << 16 | charCodeAt.call(e, 7) << 24) >>> 0)
	}, LongBits.prototype.toHash = function() {
		return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
	}, LongBits.prototype.zzEncode = function() {
		var e = this.hi >> 31;
		return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0, this.lo = (this.lo << 1 ^ e) >>> 0, this
	}, LongBits.prototype.zzDecode = function() {
		var e = -(1 & this.lo);
		return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0, this.hi = (this.hi >>> 1 ^ e) >>> 0, this
	}, LongBits.prototype.length = function() {
		var e = this.lo,
			t = (this.lo >>> 28 | this.hi << 4) >>> 0,
			r = this.hi >>> 24;
		return 0 === r ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : r < 128 ? 9 : 10
	};
	var minimal = createCommonjsModule(function(e, t) {
			function r(e, t, r) {
				for (var n = Object.keys(t), a = 0; a < n.length; ++a) void 0 !== e[n[a]] && r || (e[n[a]] = t[n[a]]);
				return e
			}

			function n(e) {
				function t(e, n) {
					if (!(this instanceof t)) return new t(e, n);
					Object.defineProperty(this, "message", {
						get: function() {
							return e
						}
					}), Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", {
						value: (new Error).stack || ""
					}), n && r(this, n)
				}
				return (t.prototype = Object.create(Error.prototype)).constructor = t, Object.defineProperty(t.prototype, "name", {
					get: function() {
						return e
					}
				}), t.prototype.toString = function() {
					return this.name + ": " + this.message
				}, t
			}
			var a = t;
			a.asPromise = aspromise, a.base64 = base64_1, a.EventEmitter = eventemitter, a.float = float_1, a.inquire = inquire_1, a.utf8 = utf8_1, a.pool = pool_1, a.LongBits = longbits, a.emptyArray = Object.freeze ? Object.freeze([]) : [], a.emptyObject = Object.freeze ? Object.freeze({}) : {}, a.isNode = Boolean(commonjsGlobal.process && commonjsGlobal.process.versions && commonjsGlobal.process.versions.node), a.isInteger = Number.isInteger || function(e) {
				return "number" == typeof e && isFinite(e) && Math.floor(e) === e
			}, a.isString = function(e) {
				return "string" == typeof e || e instanceof String
			}, a.isObject = function(e) {
				return e && "object" == typeof e
			}, a.isset = a.isSet = function(e, t) {
				var r = e[t];
				return !(null == r || !e.hasOwnProperty(t)) && ("object" != typeof r || (Array.isArray(r) ? r.length : Object.keys(r).length) > 0)
			}, a.Buffer = function() {
				try {
					var e = a.inquire("buffer").Buffer;
					return e.prototype.utf8Write ? e : null
				} catch (e) {
					return null
				}
			}(), a._Buffer_from = null, a._Buffer_allocUnsafe = null, a.newBuffer = function(e) {
				return "number" == typeof e ? a.Buffer ? a._Buffer_allocUnsafe(e) : new a.Array(e) : a.Buffer ? a._Buffer_from(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e)
			}, a.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, a.Long = commonjsGlobal.dcodeIO && commonjsGlobal.dcodeIO.Long || a.inquire("long"), a.key2Re = /^true|false|0|1$/, a.key32Re = /^-?(?:0|[1-9][0-9]*)$/, a.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, a.longToHash = function(e) {
				return e ? a.LongBits.from(e).toHash() : a.LongBits.zeroHash
			}, a.longFromHash = function(e, t) {
				var r = a.LongBits.fromHash(e);
				return a.Long ? a.Long.fromBits(r.lo, r.hi, t) : r.toNumber(Boolean(t))
			}, a.merge = r, a.lcFirst = function(e) {
				return e.charAt(0).toLowerCase() + e.substring(1)
			}, a.newError = n, a.ProtocolError = n("ProtocolError"), a.oneOfGetter = function(e) {
				for (var t = {}, r = 0; r < e.length; ++r) t[e[r]] = 1;
				return function() {
					for (var e = Object.keys(this), r = e.length - 1; r > -1; --r)
						if (1 === t[e[r]] && void 0 !== this[e[r]] && null !== this[e[r]]) return e[r]
				}
			}, a.oneOfSetter = function(e) {
				return function(t) {
					for (var r = 0; r < e.length; ++r) e[r] !== t && delete this[e[r]]
				}
			}, a.toJSONOptions = {
				longs: String,
				enums: String,
				bytes: String,
				json: !0
			}, a._configure = function() {
				var e = a.Buffer;
				e ? (a._Buffer_from = e.from !== Uint8Array.from && e.from || function(t, r) {
					return new e(t, r)
				}, a._Buffer_allocUnsafe = e.allocUnsafe || function(t) {
					return new e(t)
				}) : a._Buffer_from = a._Buffer_allocUnsafe = null
			}
		}),
		writer = Writer,
		BufferWriter, LongBits$1 = minimal.LongBits,
		base64 = minimal.base64,
		utf8 = minimal.utf8;
	Writer.create = minimal.Buffer ? function() {
		return (Writer.create = function() {
			return new BufferWriter
		})()
	} : function() {
		return new Writer
	}, Writer.alloc = function(e) {
		return new minimal.Array(e)
	}, minimal.Array !== Array && (Writer.alloc = minimal.pool(Writer.alloc, minimal.Array.prototype.subarray)), Writer.prototype._push = function(e, t, r) {
		return this.tail = this.tail.next = new Op(e, t, r), this.len += t, this
	}, VarintOp.prototype = Object.create(Op.prototype), VarintOp.prototype.fn = writeVarint32, Writer.prototype.uint32 = function(e) {
		return this.len += (this.tail = this.tail.next = new VarintOp((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len, this
	}, Writer.prototype.int32 = function(e) {
		return e < 0 ? this._push(writeVarint64, 10, LongBits$1.fromNumber(e)) : this.uint32(e)
	}, Writer.prototype.sint32 = function(e) {
		return this.uint32((e << 1 ^ e >> 31) >>> 0)
	}, Writer.prototype.uint64 = function(e) {
		var t = LongBits$1.from(e);
		return this._push(writeVarint64, t.length(), t)
	}, Writer.prototype.int64 = Writer.prototype.uint64, Writer.prototype.sint64 = function(e) {
		var t = LongBits$1.from(e).zzEncode();
		return this._push(writeVarint64, t.length(), t)
	}, Writer.prototype.bool = function(e) {
		return this._push(writeByte, 1, e ? 1 : 0)
	}, Writer.prototype.fixed32 = function(e) {
		return this._push(writeFixed32, 4, e >>> 0)
	}, Writer.prototype.sfixed32 = Writer.prototype.fixed32, Writer.prototype.fixed64 = function(e) {
		var t = LongBits$1.from(e);
		return this._push(writeFixed32, 4, t.lo)._push(writeFixed32, 4, t.hi)
	}, Writer.prototype.sfixed64 = Writer.prototype.fixed64, Writer.prototype.float = function(e) {
		return this._push(minimal.float.writeFloatLE, 4, e)
	}, Writer.prototype.double = function(e) {
		return this._push(minimal.float.writeDoubleLE, 8, e)
	};
	var writeBytes = minimal.Array.prototype.set ? function(e, t, r) {
		t.set(e, r)
	} : function(e, t, r) {
		for (var n = 0; n < e.length; ++n) t[r + n] = e[n]
	};
	Writer.prototype.bytes = function(e) {
		var t = e.length >>> 0;
		if (!t) return this._push(writeByte, 1, 0);
		if (minimal.isString(e)) {
			var r = Writer.alloc(t = base64.length(e));
			base64.decode(e, r, 0), e = r
		}
		return this.uint32(t)._push(writeBytes, t, e)
	}, Writer.prototype.string = function(e) {
		var t = utf8.length(e);
		return t ? this.uint32(t)._push(utf8.write, t, e) : this._push(writeByte, 1, 0)
	}, Writer.prototype.fork = function() {
		return this.states = new State(this), this.head = this.tail = new Op(noop, 0, 0), this.len = 0, this
	}, Writer.prototype.reset = function() {
		return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new Op(noop, 0, 0), this.len = 0), this
	}, Writer.prototype.ldelim = function() {
		var e = this.head,
			t = this.tail,
			r = this.len;
		return this.reset().uint32(r), r && (this.tail.next = e.next, this.tail = t, this.len += r), this
	}, Writer.prototype.finish = function() {
		for (var e = this.head.next, t = this.constructor.alloc(this.len), r = 0; e;) e.fn(e.val, t, r), r += e.len, e = e.next;
		return t
	}, Writer._configure = function(e) {
		BufferWriter = e
	};
	var writer_buffer = BufferWriter$1;
	(BufferWriter$1.prototype = Object.create(writer.prototype)).constructor = BufferWriter$1;
	var Buffer = minimal.Buffer;
	BufferWriter$1.alloc = function(e) {
		return (BufferWriter$1.alloc = minimal._Buffer_allocUnsafe)(e)
	};
	var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && "set" === Buffer.prototype.set.name ? function(e, t, r) {
		t.set(e, r)
	} : function(e, t, r) {
		if (e.copy) e.copy(t, r, 0, e.length);
		else
			for (var n = 0; n < e.length;) t[r++] = e[n++]
	};
	BufferWriter$1.prototype.bytes = function(e) {
		minimal.isString(e) && (e = minimal._Buffer_from(e, "base64"));
		var t = e.length >>> 0;
		return this.uint32(t), t && this._push(writeBytesBuffer, t, e), this
	}, BufferWriter$1.prototype.string = function(e) {
		var t = Buffer.byteLength(e);
		return this.uint32(t), t && this._push(writeStringBuffer, t, e), this
	};
	var reader = Reader,
		BufferReader, LongBits$2 = minimal.LongBits,
		utf8$1 = minimal.utf8,
		create_array = "undefined" != typeof Uint8Array ? function(e) {
			if (e instanceof Uint8Array || Array.isArray(e)) return new Reader(e);
			throw Error("illegal buffer")
		} : function(e) {
			if (Array.isArray(e)) return new Reader(e);
			throw Error("illegal buffer")
		};
	Reader.create = minimal.Buffer ? function(e) {
		return (Reader.create = function(e) {
			return minimal.Buffer.isBuffer(e) ? new BufferReader(e) : create_array(e)
		})(e)
	} : create_array, Reader.prototype._slice = minimal.Array.prototype.subarray || minimal.Array.prototype.slice, Reader.prototype.uint32 = function() {
		var e = 4294967295;
		return function() {
			if (e = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return e;
			if (e = (e | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return e;
			if (e = (e | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return e;
			if (e = (e | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return e;
			if (e = (e | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return e;
			if ((this.pos += 5) > this.len) throw this.pos = this.len, indexOutOfRange(this, 10);
			return e
		}
	}(), Reader.prototype.int32 = function() {
		return 0 | this.uint32()
	}, Reader.prototype.sint32 = function() {
		var e = this.uint32();
		return e >>> 1 ^ -(1 & e) | 0
	}, Reader.prototype.bool = function() {
		return 0 !== this.uint32()
	}, Reader.prototype.fixed32 = function() {
		if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
		return readFixed32_end(this.buf, this.pos += 4)
	}, Reader.prototype.sfixed32 = function() {
		if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
		return 0 | readFixed32_end(this.buf, this.pos += 4)
	}, Reader.prototype.float = function() {
		if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
		var e = minimal.float.readFloatLE(this.buf, this.pos);
		return this.pos += 4, e
	}, Reader.prototype.double = function() {
		if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
		var e = minimal.float.readDoubleLE(this.buf, this.pos);
		return this.pos += 8, e
	}, Reader.prototype.bytes = function() {
		var e = this.uint32(),
			t = this.pos,
			r = this.pos + e;
		if (r > this.len) throw indexOutOfRange(this, e);
		return this.pos += e, Array.isArray(this.buf) ? this.buf.slice(t, r) : t === r ? new this.buf.constructor(0) : this._slice.call(this.buf, t, r)
	}, Reader.prototype.string = function() {
		var e = this.bytes();
		return utf8$1.read(e, 0, e.length)
	}, Reader.prototype.skip = function(e) {
		if ("number" == typeof e) {
			if (this.pos + e > this.len) throw indexOutOfRange(this, e);
			this.pos += e
		} else
			do {
				if (this.pos >= this.len) throw indexOutOfRange(this)
			} while (128 & this.buf[this.pos++]);
		return this
	}, Reader.prototype.skipType = function(e) {
		switch (e) {
			case 0:
				this.skip();
				break;
			case 1:
				this.skip(8);
				break;
			case 2:
				this.skip(this.uint32());
				break;
			case 3:
				for (;;) {
					if (4 == (e = 7 & this.uint32())) break;
					this.skipType(e)
				}
				break;
			case 5:
				this.skip(4);
				break;
			default:
				throw Error("invalid wire type " + e + " at offset " + this.pos)
		}
		return this
	}, Reader._configure = function(e) {
		BufferReader = e;
		var t = minimal.Long ? "toLong" : "toNumber";
		minimal.merge(Reader.prototype, {
			int64: function() {
				return readLongVarint.call(this)[t](!1)
			},
			uint64: function() {
				return readLongVarint.call(this)[t](!0)
			},
			sint64: function() {
				return readLongVarint.call(this).zzDecode()[t](!1)
			},
			fixed64: function() {
				return readFixed64.call(this)[t](!0)
			},
			sfixed64: function() {
				return readFixed64.call(this)[t](!1)
			}
		})
	};
	var reader_buffer = BufferReader$1;
	(BufferReader$1.prototype = Object.create(reader.prototype)).constructor = BufferReader$1, minimal.Buffer && (BufferReader$1.prototype._slice = minimal.Buffer.prototype.slice), BufferReader$1.prototype.string = function() {
		var e = this.uint32();
		return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len))
	};
	var service = Service;
	(Service.prototype = Object.create(minimal.EventEmitter.prototype)).constructor = Service, Service.prototype.rpcCall = function e(t, r, n, a, o) {
		if (!a) throw TypeError("request must be specified");
		var i = this;
		if (!o) return minimal.asPromise(e, i, t, r, n, a);
		if (i.rpcImpl) try {
			return i.rpcImpl(t, r[i.requestDelimited ? "encodeDelimited" : "encode"](a).finish(), function(e, r) {
				if (e) return i.emit("error", e, t), o(e); {
					if (null !== r) {
						if (!(r instanceof n)) try {
							r = n[i.responseDelimited ? "decodeDelimited" : "decode"](r)
						} catch (e) {
							return i.emit("error", e, t), o(e)
						}
						return i.emit("data", r, t), o(null, r)
					}
					i.end(!0)
				}
			})
		} catch (e) {
			return i.emit("error", e, t), void setTimeout(function() {
				o(e)
			}, 0)
		} else setTimeout(function() {
			o(Error("already ended"))
		}, 0)
	}, Service.prototype.end = function(e) {
		return this.rpcImpl && (e || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this
	};
	var rpc_1 = createCommonjsModule(function(e, t) {
			t.Service = service
		}),
		roots = {},
		indexMinimal = createCommonjsModule(function(e, t) {
			function r() {
				n.Reader._configure(n.BufferReader), n.util._configure()
			}
			var n = t;
			n.build = "minimal", n.Writer = writer, n.BufferWriter = writer_buffer, n.Reader = reader, n.BufferReader = reader_buffer, n.util = minimal, n.rpc = rpc_1, n.roots = roots, n.configure = r, n.Writer._configure(n.BufferWriter), r()
		}),
		minimal$1 = indexMinimal,
		minimal_1 = minimal$1.roots,
		minimal_2 = minimal$1.Reader,
		minimal_3 = minimal$1.util,
		$Reader = minimal_2,
		$util = minimal_3,
		$root = minimal_1.default || (minimal_1.default = {}),
		tensorflow = $root.tensorflow = function() {
			var e = {};
			return e.Any = function() {
				function e(e) {
					if (e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.typeUrl = "", e.prototype.value = $util.newBuffer([]), e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.Any; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.typeUrl = e.string();
								break;
							case 2:
								n.value = e.bytes();
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e.DataType = function() {
				var e = {},
					t = Object.create(e);
				return t[e[0] = "DT_INVALID"] = 0, t[e[1] = "DT_FLOAT"] = 1, t[e[2] = "DT_DOUBLE"] = 2, t[e[3] = "DT_INT32"] = 3, t[e[4] = "DT_UINT8"] = 4, t[e[5] = "DT_INT16"] = 5, t[e[6] = "DT_INT8"] = 6, t[e[7] = "DT_STRING"] = 7, t[e[8] = "DT_COMPLEX64"] = 8, t[e[9] = "DT_INT64"] = 9, t[e[10] = "DT_BOOL"] = 10, t[e[11] = "DT_QINT8"] = 11, t[e[12] = "DT_QUINT8"] = 12, t[e[13] = "DT_QINT32"] = 13, t[e[14] = "DT_BFLOAT16"] = 14, t[e[101] = "DT_FLOAT_REF"] = 101, t[e[102] = "DT_DOUBLE_REF"] = 102, t[e[103] = "DT_INT32_REF"] = 103, t[e[104] = "DT_UINT8_REF"] = 104, t[e[105] = "DT_INT16_REF"] = 105, t[e[106] = "DT_INT8_REF"] = 106, t[e[107] = "DT_STRING_REF"] = 107, t[e[108] = "DT_COMPLEX64_REF"] = 108, t[e[109] = "DT_INT64_REF"] = 109, t[e[110] = "DT_BOOL_REF"] = 110, t[e[111] = "DT_QINT8_REF"] = 111, t[e[112] = "DT_QUINT8_REF"] = 112, t[e[113] = "DT_QINT32_REF"] = 113, t[e[114] = "DT_BFLOAT16_REF"] = 114, t
			}(), e.TensorShape = function() {
				function e(e) {
					if (this.dim = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.dim = $util.emptyArray, e.prototype.unknownRank = !1, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.TensorShape; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 2:
								n.dim && n.dim.length || (n.dim = []), n.dim.push($root.tensorflow.TensorShape.Dim.decode(e, e.uint32()));
								break;
							case 3:
								n.unknownRank = e.bool();
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e.Dim = function() {
					function e(e) {
						if (e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.size = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, e.prototype.name = "", e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.TensorShape.Dim; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.size = e.int64();
									break;
								case 2:
									n.name = e.string();
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e
			}(), e.Tensor = function() {
				function e(e) {
					if (this.floatVal = [], this.doubleVal = [], this.intVal = [], this.stringVal = [], this.scomplexVal = [], this.int64Val = [], this.boolVal = [], this.uint32Val = [], this.uint64Val = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.dtype = 0, e.prototype.tensorShape = null, e.prototype.versionNumber = 0, e.prototype.tensorContent = $util.newBuffer([]), e.prototype.floatVal = $util.emptyArray, e.prototype.doubleVal = $util.emptyArray, e.prototype.intVal = $util.emptyArray, e.prototype.stringVal = $util.emptyArray, e.prototype.scomplexVal = $util.emptyArray, e.prototype.int64Val = $util.emptyArray, e.prototype.boolVal = $util.emptyArray, e.prototype.uint32Val = $util.emptyArray, e.prototype.uint64Val = $util.emptyArray, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.Tensor; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.dtype = e.int32();
								break;
							case 2:
								n.tensorShape = $root.tensorflow.TensorShape.decode(e, e.uint32());
								break;
							case 3:
								n.versionNumber = e.int32();
								break;
							case 4:
								n.tensorContent = e.bytes();
								break;
							case 5:
								if (n.floatVal && n.floatVal.length || (n.floatVal = []), 2 == (7 & a))
									for (o = e.uint32() + e.pos; e.pos < o;) n.floatVal.push(e.float());
								else n.floatVal.push(e.float());
								break;
							case 6:
								if (n.doubleVal && n.doubleVal.length || (n.doubleVal = []), 2 == (7 & a))
									for (o = e.uint32() + e.pos; e.pos < o;) n.doubleVal.push(e.double());
								else n.doubleVal.push(e.double());
								break;
							case 7:
								if (n.intVal && n.intVal.length || (n.intVal = []), 2 == (7 & a))
									for (o = e.uint32() + e.pos; e.pos < o;) n.intVal.push(e.int32());
								else n.intVal.push(e.int32());
								break;
							case 8:
								n.stringVal && n.stringVal.length || (n.stringVal = []), n.stringVal.push(e.bytes());
								break;
							case 9:
								if (n.scomplexVal && n.scomplexVal.length || (n.scomplexVal = []), 2 == (7 & a))
									for (o = e.uint32() + e.pos; e.pos < o;) n.scomplexVal.push(e.float());
								else n.scomplexVal.push(e.float());
								break;
							case 10:
								if (n.int64Val && n.int64Val.length || (n.int64Val = []), 2 == (7 & a))
									for (o = e.uint32() + e.pos; e.pos < o;) n.int64Val.push(e.int64());
								else n.int64Val.push(e.int64());
								break;
							case 11:
								if (n.boolVal && n.boolVal.length || (n.boolVal = []), 2 == (7 & a))
									for (o = e.uint32() + e.pos; e.pos < o;) n.boolVal.push(e.bool());
								else n.boolVal.push(e.bool());
								break;
							case 16:
								if (n.uint32Val && n.uint32Val.length || (n.uint32Val = []), 2 == (7 & a))
									for (o = e.uint32() + e.pos; e.pos < o;) n.uint32Val.push(e.uint32());
								else n.uint32Val.push(e.uint32());
								break;
							case 17:
								if (n.uint64Val && n.uint64Val.length || (n.uint64Val = []), 2 == (7 & a))
									for (var o = e.uint32() + e.pos; e.pos < o;) n.uint64Val.push(e.uint64());
								else n.uint64Val.push(e.uint64());
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e.AttrValue = function() {
				function e(e) {
					if (e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				e.prototype.list = null, e.prototype.s = $util.newBuffer([]), e.prototype.i = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, e.prototype.f = 0, e.prototype.b = !1, e.prototype.type = 0, e.prototype.shape = null, e.prototype.tensor = null, e.prototype.placeholder = "", e.prototype.func = null;
				var t = void 0;
				return Object.defineProperty(e.prototype, "value", {
					get: $util.oneOfGetter(t = ["list", "s", "i", "f", "b", "type", "shape", "tensor", "placeholder", "func"]),
					set: $util.oneOfSetter(t)
				}), e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.AttrValue; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.list = $root.tensorflow.AttrValue.ListValue.decode(e, e.uint32());
								break;
							case 2:
								n.s = e.bytes();
								break;
							case 3:
								n.i = e.int64();
								break;
							case 4:
								n.f = e.float();
								break;
							case 5:
								n.b = e.bool();
								break;
							case 6:
								n.type = e.int32();
								break;
							case 7:
								n.shape = $root.tensorflow.TensorShape.decode(e, e.uint32());
								break;
							case 8:
								n.tensor = $root.tensorflow.Tensor.decode(e, e.uint32());
								break;
							case 9:
								n.placeholder = e.string();
								break;
							case 10:
								n.func = $root.tensorflow.NameAttrList.decode(e, e.uint32());
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e.ListValue = function() {
					function e(e) {
						if (this.s = [], this.i = [], this.f = [], this.b = [], this.type = [], this.shape = [], this.tensor = [], this.func = [], e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.s = $util.emptyArray, e.prototype.i = $util.emptyArray, e.prototype.f = $util.emptyArray, e.prototype.b = $util.emptyArray, e.prototype.type = $util.emptyArray, e.prototype.shape = $util.emptyArray, e.prototype.tensor = $util.emptyArray, e.prototype.func = $util.emptyArray, e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.AttrValue.ListValue; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 2:
									n.s && n.s.length || (n.s = []), n.s.push(e.bytes());
									break;
								case 3:
									if (n.i && n.i.length || (n.i = []), 2 == (7 & a))
										for (o = e.uint32() + e.pos; e.pos < o;) n.i.push(e.int64());
									else n.i.push(e.int64());
									break;
								case 4:
									if (n.f && n.f.length || (n.f = []), 2 == (7 & a))
										for (o = e.uint32() + e.pos; e.pos < o;) n.f.push(e.float());
									else n.f.push(e.float());
									break;
								case 5:
									if (n.b && n.b.length || (n.b = []), 2 == (7 & a))
										for (o = e.uint32() + e.pos; e.pos < o;) n.b.push(e.bool());
									else n.b.push(e.bool());
									break;
								case 6:
									if (n.type && n.type.length || (n.type = []), 2 == (7 & a))
										for (var o = e.uint32() + e.pos; e.pos < o;) n.type.push(e.int32());
									else n.type.push(e.int32());
									break;
								case 7:
									n.shape && n.shape.length || (n.shape = []), n.shape.push($root.tensorflow.TensorShape.decode(e, e.uint32()));
									break;
								case 8:
									n.tensor && n.tensor.length || (n.tensor = []), n.tensor.push($root.tensorflow.Tensor.decode(e, e.uint32()));
									break;
								case 9:
									n.func && n.func.length || (n.func = []), n.func.push($root.tensorflow.NameAttrList.decode(e, e.uint32()));
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e
			}(), e.NameAttrList = function() {
				function e(e) {
					if (this.attr = {}, e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.name = "", e.prototype.attr = $util.emptyObject, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r, n = void 0 === t ? e.len : e.pos + t, a = new $root.tensorflow.NameAttrList; e.pos < n;) {
						var o = e.uint32();
						switch (o >>> 3) {
							case 1:
								a.name = e.string();
								break;
							case 2:
								e.skip().pos++, a.attr === $util.emptyObject && (a.attr = {}), r = e.string(), e.pos++, a.attr[r] = $root.tensorflow.AttrValue.decode(e, e.uint32());
								break;
							default:
								e.skipType(7 & o)
						}
					}
					return a
				}, e
			}(), e.NodeDef = function() {
				function e(e) {
					if (this.input = [], this.attr = {}, e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.name = "", e.prototype.op = "", e.prototype.input = $util.emptyArray, e.prototype.device = "", e.prototype.attr = $util.emptyObject, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r, n = void 0 === t ? e.len : e.pos + t, a = new $root.tensorflow.NodeDef; e.pos < n;) {
						var o = e.uint32();
						switch (o >>> 3) {
							case 1:
								a.name = e.string();
								break;
							case 2:
								a.op = e.string();
								break;
							case 3:
								a.input && a.input.length || (a.input = []), a.input.push(e.string());
								break;
							case 4:
								a.device = e.string();
								break;
							case 5:
								e.skip().pos++, a.attr === $util.emptyObject && (a.attr = {}), r = e.string(), e.pos++, a.attr[r] = $root.tensorflow.AttrValue.decode(e, e.uint32());
								break;
							default:
								e.skipType(7 & o)
						}
					}
					return a
				}, e
			}(), e.VersionDef = function() {
				function e(e) {
					if (this.badConsumers = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.producer = 0, e.prototype.minConsumer = 0, e.prototype.badConsumers = $util.emptyArray, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.VersionDef; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.producer = e.int32();
								break;
							case 2:
								n.minConsumer = e.int32();
								break;
							case 3:
								if (n.badConsumers && n.badConsumers.length || (n.badConsumers = []), 2 == (7 & a))
									for (var o = e.uint32() + e.pos; e.pos < o;) n.badConsumers.push(e.int32());
								else n.badConsumers.push(e.int32());
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e.GraphDef = function() {
				function e(e) {
					if (this.node = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.node = $util.emptyArray, e.prototype.versions = null, e.prototype.library = null, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.GraphDef; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.node && n.node.length || (n.node = []), n.node.push($root.tensorflow.NodeDef.decode(e, e.uint32()));
								break;
							case 4:
								n.versions = $root.tensorflow.VersionDef.decode(e, e.uint32());
								break;
							case 2:
								n.library = $root.tensorflow.FunctionDefLibrary.decode(e, e.uint32());
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e.CollectionDef = function() {
				function e(e) {
					if (e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				e.prototype.nodeList = null, e.prototype.bytesList = null, e.prototype.int64List = null, e.prototype.floatList = null, e.prototype.anyList = null;
				var t = void 0;
				return Object.defineProperty(e.prototype, "kind", {
					get: $util.oneOfGetter(t = ["nodeList", "bytesList", "int64List", "floatList", "anyList"]),
					set: $util.oneOfSetter(t)
				}), e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.CollectionDef; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.nodeList = $root.tensorflow.CollectionDef.NodeList.decode(e, e.uint32());
								break;
							case 2:
								n.bytesList = $root.tensorflow.CollectionDef.BytesList.decode(e, e.uint32());
								break;
							case 3:
								n.int64List = $root.tensorflow.CollectionDef.Int64List.decode(e, e.uint32());
								break;
							case 4:
								n.floatList = $root.tensorflow.CollectionDef.FloatList.decode(e, e.uint32());
								break;
							case 5:
								n.anyList = $root.tensorflow.CollectionDef.AnyList.decode(e, e.uint32());
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e.NodeList = function() {
					function e(e) {
						if (this.value = [], e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.value = $util.emptyArray, e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.CollectionDef.NodeList; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.value && n.value.length || (n.value = []), n.value.push(e.string());
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e.BytesList = function() {
					function e(e) {
						if (this.value = [], e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.value = $util.emptyArray, e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.CollectionDef.BytesList; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.value && n.value.length || (n.value = []), n.value.push(e.bytes());
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e.Int64List = function() {
					function e(e) {
						if (this.value = [], e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.value = $util.emptyArray, e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.CollectionDef.Int64List; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									if (n.value && n.value.length || (n.value = []), 2 == (7 & a))
										for (var o = e.uint32() + e.pos; e.pos < o;) n.value.push(e.int64());
									else n.value.push(e.int64());
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e.FloatList = function() {
					function e(e) {
						if (this.value = [], e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.value = $util.emptyArray, e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.CollectionDef.FloatList; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									if (n.value && n.value.length || (n.value = []), 2 == (7 & a))
										for (var o = e.uint32() + e.pos; e.pos < o;) n.value.push(e.float());
									else n.value.push(e.float());
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e.AnyList = function() {
					function e(e) {
						if (this.value = [], e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.value = $util.emptyArray, e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.CollectionDef.AnyList; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.value && n.value.length || (n.value = []), n.value.push($root.tensorflow.Any.decode(e, e.uint32()));
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e
			}(), e.SaverDef = function() {
				function e(e) {
					if (e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.filenameTensorName = "", e.prototype.saveTensorName = "", e.prototype.restoreOpName = "", e.prototype.maxToKeep = 0, e.prototype.sharded = !1, e.prototype.keepCheckpointEveryNHours = 0, e.prototype.version = 0, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.SaverDef; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.filenameTensorName = e.string();
								break;
							case 2:
								n.saveTensorName = e.string();
								break;
							case 3:
								n.restoreOpName = e.string();
								break;
							case 4:
								n.maxToKeep = e.int32();
								break;
							case 5:
								n.sharded = e.bool();
								break;
							case 6:
								n.keepCheckpointEveryNHours = e.float();
								break;
							case 7:
								n.version = e.int32();
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e.CheckpointFormatVersion = function() {
					var e = {},
						t = Object.create(e);
					return t[e[0] = "LEGACY"] = 0, t[e[1] = "V1"] = 1, t[e[2] = "V2"] = 2, t
				}(), e
			}(), e.TensorInfo = function() {
				function e(e) {
					if (e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				e.prototype.name = "", e.prototype.cooSparse = null, e.prototype.dtype = 0, e.prototype.tensorShape = null;
				var t = void 0;
				return Object.defineProperty(e.prototype, "encoding", {
					get: $util.oneOfGetter(t = ["name", "cooSparse"]),
					set: $util.oneOfSetter(t)
				}), e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.TensorInfo; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.name = e.string();
								break;
							case 4:
								n.cooSparse = $root.tensorflow.TensorInfo.CooSparse.decode(e, e.uint32());
								break;
							case 2:
								n.dtype = e.int32();
								break;
							case 3:
								n.tensorShape = $root.tensorflow.TensorShape.decode(e, e.uint32());
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e.CooSparse = function() {
					function e(e) {
						if (e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.valuesTensorName = "", e.prototype.indicesTensorName = "", e.prototype.denseShapeTensorName = "", e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.TensorInfo.CooSparse; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.valuesTensorName = e.string();
									break;
								case 2:
									n.indicesTensorName = e.string();
									break;
								case 3:
									n.denseShapeTensorName = e.string();
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e
			}(), e.SignatureDef = function() {
				function e(e) {
					if (this.inputs = {}, this.outputs = {}, e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.inputs = $util.emptyObject, e.prototype.outputs = $util.emptyObject, e.prototype.methodName = "", e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r, n = void 0 === t ? e.len : e.pos + t, a = new $root.tensorflow.SignatureDef; e.pos < n;) {
						var o = e.uint32();
						switch (o >>> 3) {
							case 1:
								e.skip().pos++, a.inputs === $util.emptyObject && (a.inputs = {}), r = e.string(), e.pos++, a.inputs[r] = $root.tensorflow.TensorInfo.decode(e, e.uint32());
								break;
							case 2:
								e.skip().pos++, a.outputs === $util.emptyObject && (a.outputs = {}), r = e.string(), e.pos++, a.outputs[r] = $root.tensorflow.TensorInfo.decode(e, e.uint32());
								break;
							case 3:
								a.methodName = e.string();
								break;
							default:
								e.skipType(7 & o)
						}
					}
					return a
				}, e
			}(), e.AssetFileDef = function() {
				function e(e) {
					if (e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.tensorInfo = null, e.prototype.filename = "", e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.AssetFileDef; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.tensorInfo = $root.tensorflow.TensorInfo.decode(e, e.uint32());
								break;
							case 2:
								n.filename = e.string();
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e.OpDef = function() {
				function e(e) {
					if (this.inputArg = [], this.outputArg = [], this.attr = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.name = "", e.prototype.inputArg = $util.emptyArray, e.prototype.outputArg = $util.emptyArray, e.prototype.attr = $util.emptyArray, e.prototype.deprecation = null, e.prototype.summary = "", e.prototype.description = "", e.prototype.isCommutative = !1, e.prototype.isAggregate = !1, e.prototype.isStateful = !1, e.prototype.allowsUninitializedInput = !1, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.OpDef; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.name = e.string();
								break;
							case 2:
								n.inputArg && n.inputArg.length || (n.inputArg = []), n.inputArg.push($root.tensorflow.OpDef.ArgDef.decode(e, e.uint32()));
								break;
							case 3:
								n.outputArg && n.outputArg.length || (n.outputArg = []), n.outputArg.push($root.tensorflow.OpDef.ArgDef.decode(e, e.uint32()));
								break;
							case 4:
								n.attr && n.attr.length || (n.attr = []), n.attr.push($root.tensorflow.OpDef.AttrDef.decode(e, e.uint32()));
								break;
							case 8:
								n.deprecation = $root.tensorflow.OpDef.OpDeprecation.decode(e, e.uint32());
								break;
							case 5:
								n.summary = e.string();
								break;
							case 6:
								n.description = e.string();
								break;
							case 18:
								n.isCommutative = e.bool();
								break;
							case 16:
								n.isAggregate = e.bool();
								break;
							case 17:
								n.isStateful = e.bool();
								break;
							case 19:
								n.allowsUninitializedInput = e.bool();
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e.ArgDef = function() {
					function e(e) {
						if (e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.name = "", e.prototype.description = "", e.prototype.type = 0, e.prototype.typeAttr = "", e.prototype.numberAttr = "", e.prototype.typeListAttr = "", e.prototype.isRef = !1, e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.OpDef.ArgDef; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.name = e.string();
									break;
								case 2:
									n.description = e.string();
									break;
								case 3:
									n.type = e.int32();
									break;
								case 4:
									n.typeAttr = e.string();
									break;
								case 5:
									n.numberAttr = e.string();
									break;
								case 6:
									n.typeListAttr = e.string();
									break;
								case 16:
									n.isRef = e.bool();
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e.AttrDef = function() {
					function e(e) {
						if (e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.name = "", e.prototype.type = "", e.prototype.defaultValue = null, e.prototype.description = "", e.prototype.hasMinimum = !1, e.prototype.minimum = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, e.prototype.allowedValues = null, e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.OpDef.AttrDef; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.name = e.string();
									break;
								case 2:
									n.type = e.string();
									break;
								case 3:
									n.defaultValue = $root.tensorflow.AttrValue.decode(e, e.uint32());
									break;
								case 4:
									n.description = e.string();
									break;
								case 5:
									n.hasMinimum = e.bool();
									break;
								case 6:
									n.minimum = e.int64();
									break;
								case 7:
									n.allowedValues = $root.tensorflow.AttrValue.decode(e, e.uint32());
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e.OpDeprecation = function() {
					function e(e) {
						if (e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.version = 0, e.prototype.explanation = "", e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.OpDef.OpDeprecation; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.version = e.int32();
									break;
								case 2:
									n.explanation = e.string();
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e
			}(), e.OpList = function() {
				function e(e) {
					if (this.op = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.op = $util.emptyArray, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.OpList; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.op && n.op.length || (n.op = []), n.op.push($root.tensorflow.OpDef.decode(e, e.uint32()));
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e.MetaGraphDef = function() {
				function e(e) {
					if (this.collectionDef = {}, this.signatureDef = {}, this.assetFileDef = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.metaInfoDef = null, e.prototype.graphDef = null, e.prototype.saverDef = null, e.prototype.collectionDef = $util.emptyObject, e.prototype.signatureDef = $util.emptyObject, e.prototype.assetFileDef = $util.emptyArray, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r, n = void 0 === t ? e.len : e.pos + t, a = new $root.tensorflow.MetaGraphDef; e.pos < n;) {
						var o = e.uint32();
						switch (o >>> 3) {
							case 1:
								a.metaInfoDef = $root.tensorflow.MetaGraphDef.MetaInfoDef.decode(e, e.uint32());
								break;
							case 2:
								a.graphDef = $root.tensorflow.GraphDef.decode(e, e.uint32());
								break;
							case 3:
								a.saverDef = $root.tensorflow.SaverDef.decode(e, e.uint32());
								break;
							case 4:
								e.skip().pos++, a.collectionDef === $util.emptyObject && (a.collectionDef = {}), r = e.string(), e.pos++, a.collectionDef[r] = $root.tensorflow.CollectionDef.decode(e, e.uint32());
								break;
							case 5:
								e.skip().pos++, a.signatureDef === $util.emptyObject && (a.signatureDef = {}), r = e.string(), e.pos++, a.signatureDef[r] = $root.tensorflow.SignatureDef.decode(e, e.uint32());
								break;
							case 6:
								a.assetFileDef && a.assetFileDef.length || (a.assetFileDef = []), a.assetFileDef.push($root.tensorflow.AssetFileDef.decode(e, e.uint32()));
								break;
							default:
								e.skipType(7 & o)
						}
					}
					return a
				}, e.MetaInfoDef = function() {
					function e(e) {
						if (this.tags = [], e)
							for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
					}
					return e.prototype.metaGraphVersion = "", e.prototype.strippedOpList = null, e.prototype.anyInfo = null, e.prototype.tags = $util.emptyArray, e.prototype.tensorflowVersion = "", e.prototype.tensorflowGitVersion = "", e.decode = function(e, t) {
						e instanceof $Reader || (e = $Reader.create(e));
						for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.MetaGraphDef.MetaInfoDef; e.pos < r;) {
							var a = e.uint32();
							switch (a >>> 3) {
								case 1:
									n.metaGraphVersion = e.string();
									break;
								case 2:
									n.strippedOpList = $root.tensorflow.OpList.decode(e, e.uint32());
									break;
								case 3:
									n.anyInfo = $root.tensorflow.Any.decode(e, e.uint32());
									break;
								case 4:
									n.tags && n.tags.length || (n.tags = []), n.tags.push(e.string());
									break;
								case 5:
									n.tensorflowVersion = e.string();
									break;
								case 6:
									n.tensorflowGitVersion = e.string();
									break;
								default:
									e.skipType(7 & a)
							}
						}
						return n
					}, e
				}(), e
			}(), e.SavedModel = function() {
				function e(e) {
					if (this.metaGraphs = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.savedModelSchemaVersion = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0, e.prototype.metaGraphs = $util.emptyArray, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.SavedModel; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.savedModelSchemaVersion = e.int64();
								break;
							case 2:
								n.metaGraphs && n.metaGraphs.length || (n.metaGraphs = []), n.metaGraphs.push($root.tensorflow.MetaGraphDef.decode(e, e.uint32()));
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e.FunctionDefLibrary = function() {
				function e(e) {
					if (this.function = [], this.gradient = [], e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.function = $util.emptyArray, e.prototype.gradient = $util.emptyArray, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.FunctionDefLibrary; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.function && n.function.length || (n.function = []), n.function.push($root.tensorflow.FunctionDef.decode(e, e.uint32()));
								break;
							case 2:
								n.gradient && n.gradient.length || (n.gradient = []), n.gradient.push($root.tensorflow.GradientDef.decode(e, e.uint32()));
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e.FunctionDef = function() {
				function e(e) {
					if (this.attr = {}, this.nodeDef = [], this.ret = {}, e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.signature = null, e.prototype.attr = $util.emptyObject, e.prototype.nodeDef = $util.emptyArray, e.prototype.ret = $util.emptyObject, e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r, n = void 0 === t ? e.len : e.pos + t, a = new $root.tensorflow.FunctionDef; e.pos < n;) {
						var o = e.uint32();
						switch (o >>> 3) {
							case 1:
								a.signature = $root.tensorflow.OpDef.decode(e, e.uint32());
								break;
							case 5:
								e.skip().pos++, a.attr === $util.emptyObject && (a.attr = {}), r = e.string(), e.pos++, a.attr[r] = $root.tensorflow.AttrValue.decode(e, e.uint32());
								break;
							case 3:
								a.nodeDef && a.nodeDef.length || (a.nodeDef = []), a.nodeDef.push($root.tensorflow.NodeDef.decode(e, e.uint32()));
								break;
							case 4:
								e.skip().pos++, a.ret === $util.emptyObject && (a.ret = {}), r = e.string(), e.pos++, a.ret[r] = e.string();
								break;
							default:
								e.skipType(7 & o)
						}
					}
					return a
				}, e
			}(), e.GradientDef = function() {
				function e(e) {
					if (e)
						for (var t = Object.keys(e), r = 0; r < t.length; ++r) null != e[t[r]] && (this[t[r]] = e[t[r]])
				}
				return e.prototype.functionName = "", e.prototype.gradientFunc = "", e.decode = function(e, t) {
					e instanceof $Reader || (e = $Reader.create(e));
					for (var r = void 0 === t ? e.len : e.pos + t, n = new $root.tensorflow.GradientDef; e.pos < r;) {
						var a = e.uint32();
						switch (a >>> 3) {
							case 1:
								n.functionName = e.string();
								break;
							case 2:
								n.gradientFunc = e.string();
								break;
							default:
								e.skipType(7 & a)
						}
					}
					return n
				}, e
			}(), e
		}(),
		arithmetic = [{
			tfOpName: "Add",
			dlOpName: "add",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "BiasAdd",
			dlOpName: "add",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Sub",
			dlOpName: "sub",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "RealDiv",
			dlOpName: "div",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Div",
			dlOpName: "div",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Mul",
			dlOpName: "mul",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Maximum",
			dlOpName: "maximum",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}]
		}, {
			tfOpName: "Minimum",
			dlOpName: "minimum",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}]
		}, {
			tfOpName: "Pow",
			dlOpName: "pow",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "SquaredDifference",
			dlOpName: "squaredDifference",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Mod",
			dlOpName: "mod",
			category: "arithmetic",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}],
		arithmetic$1 = Object.freeze({
			default: arithmetic
		}),
		basic_math = [{
			tfOpName: "Abs",
			dlOpName: "abs",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Acos",
			dlOpName: "acos",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Asin",
			dlOpName: "asin",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "atan",
			dlOpName: "atan",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Ceil",
			dlOpName: "ceil",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "ClipByValue",
			dlOpName: "clipByValue",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "clip_value_min",
				dlParamName: "clipValueMin",
				type: "number"
			}, {
				tfParamName: "clip_value_max",
				dlParamName: "clipValueMax",
				type: "number"
			}]
		}, {
			tfOpName: "Cos",
			dlOpName: "cos",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Cosh",
			dlOpName: "cosh",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Elu",
			dlOpName: "elu",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Exp",
			dlOpName: "exp",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Floor",
			dlOpName: "floor",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Log",
			dlOpName: "log",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Neg",
			dlOpName: "neg",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Relu",
			dlOpName: "relu",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Relu6",
			dlOpName: "clipByValue",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}, {
				dlParamName: "clipValueMin",
				type: "number",
				defaultValue: 0
			}, {
				dlParamName: "clipValueMax",
				type: "number",
				defaultValue: 6
			}]
		}, {
			tfOpName: "Selu",
			dlOpName: "selu",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Sigmoid",
			dlOpName: "sigmoid",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Sin",
			dlOpName: "sin",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Sinh",
			dlOpName: "sinh",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Sqrt",
			dlOpName: "sqrt",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Rsqrt",
			dlOpName: "rsqrt",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Square",
			dlOpName: "square",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Tan",
			dlOpName: "tan",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Tanh",
			dlOpName: "tanh",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Sign",
			dlOpName: "sign",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Round",
			dlOpName: "round",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Expm1",
			dlOpName: "expm1",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Log1p",
			dlOpName: "log1p",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Reciprocal",
			dlOpName: "reciprocal",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Reciprocal",
			dlOpName: "reciprocal",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Softplus",
			dlOpName: "softplus",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Asinh",
			dlOpName: "asinh",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Acosh",
			dlOpName: "acosh",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Atanh",
			dlOpName: "atanh",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Erf",
			dlOpName: "erf",
			category: "basic_math",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}],
		basicMath = Object.freeze({
			default: basic_math
		}),
		control = [{
			tfOpName: "LoopCond",
			dlOpName: "loopCond",
			category: "control",
			params: [{
				tfInputIndex: 0,
				dlParamName: "pred",
				type: "tensor"
			}]
		}, {
			tfOpName: "Switch",
			dlOpName: "switch",
			category: "control",
			params: [{
				tfInputIndex: 0,
				dlParamName: "data",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "pred",
				type: "tensor"
			}]
		}, {
			tfOpName: "Merge",
			dlOpName: "merge",
			category: "control",
			params: [{
				tfInputIndex: 0,
				tfInputParamLength: 0,
				dlParamName: "tensors",
				type: "tensors"
			}]
		}, {
			tfOpName: "Enter",
			dlOpName: "enter",
			category: "control",
			params: [{
				tfInputIndex: 0,
				dlParamName: "tensor",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}, {
				tfParamName: "frame_name",
				dlParamName: "frameName",
				type: "string"
			}, {
				tfParamName: "is_constant",
				dlParamName: "isConstant",
				type: "bool"
			}]
		}, {
			tfOpName: "Exit",
			dlOpName: "exit",
			category: "control",
			params: [{
				tfInputIndex: 0,
				dlParamName: "tensor",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "NextIteration",
			dlOpName: "nextIteration",
			category: "control",
			params: [{
				tfInputIndex: 0,
				dlParamName: "tensor",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}],
		control$1 = Object.freeze({
			default: control
		}),
		convolution = [{
			tfOpName: "AvgPool",
			dlOpName: "avgPool",
			category: "convolution",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "strides",
				dlParamName: "strides",
				type: "number[]"
			}, {
				tfParamName: "padding",
				dlParamName: "pad",
				type: "string"
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				notSupported: !0
			}, {
				tfParamName: "ksize",
				dlParamName: "kernelSize",
				type: "number[]"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "MaxPool",
			dlOpName: "maxPool",
			category: "convolution",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "strides",
				dlParamName: "strides",
				type: "number[]"
			}, {
				tfParamName: "padding",
				dlParamName: "pad",
				type: "string"
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				notSupported: !0
			}, {
				tfParamName: "ksize",
				dlParamName: "kernelSize",
				type: "number[]"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Conv1D",
			dlOpName: "conv1d",
			category: "convolution",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "filter",
				type: "tensor"
			}, {
				tfParamName: "stride",
				dlParamName: "stride",
				type: "number"
			}, {
				tfParamName: "padding",
				dlParamName: "pad",
				type: "string"
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				defaultValue: "NWC"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}, {
				tfParamName: "dilation",
				dlParamName: "dilation",
				type: "number",
				defaultValue: 1
			}]
		}, {
			tfOpName: "Conv2D",
			dlOpName: "conv2d",
			category: "convolution",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "filter",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}, {
				tfParamName: "strides",
				dlParamName: "strides",
				type: "number[]"
			}, {
				tfParamName: "padding",
				dlParamName: "pad",
				type: "string"
			}, {
				tfParamName: "useCudnnOnGpu",
				dlParamName: "useCudnnOnGpu",
				type: "bool"
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				defaultValue: "NHWC"
			}, {
				tfParamName: "dilations",
				dlParamName: "dilations",
				type: "number[]"
			}]
		}, {
			tfOpName: "Conv2DBackpropInput",
			dlOpName: "conv2dTranspose",
			category: "convolution",
			params: [{
				tfInputIndex: 2,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "filter",
				type: "tensor"
			}, {
				tfInputIndex: 0,
				dlParamName: "outputShape",
				type: "number[]"
			}, {
				tfParamName: "strides",
				dlParamName: "strides",
				type: "number[]"
			}, {
				tfParamName: "padding",
				dlParamName: "pad",
				type: "string"
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				notSupported: !0
			}]
		}, {
			tfOpName: "DepthwiseConv2d",
			dlOpName: "depthwiseConv2d",
			category: "convolution",
			params: [{
				tfInputIndex: 0,
				dlParamName: "input",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "filter",
				type: "tensor"
			}, {
				tfParamName: "strides",
				dlParamName: "strides",
				type: "number[]"
			}, {
				tfParamName: "padding",
				dlParamName: "pad",
				type: "string"
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				defaultValue: "NHWC"
			}, {
				tfParamName: "dilations",
				dlParamName: "dilations",
				type: "number[]"
			}]
		}, {
			tfOpName: "DepthwiseConv2dNative",
			dlOpName: "depthwiseConv2d",
			category: "convolution",
			params: [{
				tfInputIndex: 0,
				dlParamName: "input",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "filter",
				type: "tensor"
			}, {
				tfParamName: "strides",
				dlParamName: "strides",
				type: "number[]"
			}, {
				tfParamName: "padding",
				dlParamName: "pad",
				type: "string"
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				defaultValue: "NHWC"
			}, {
				tfParamName: "dilations",
				dlParamName: "dilations",
				type: "number[]"
			}]
		}],
		convolution$1 = Object.freeze({
			default: convolution
		}),
		creation = [{
			tfOpName: "Fill",
			dlOpName: "fill",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "shape",
				type: "number[]"
			}, {
				tfInputIndex: 1,
				dlParamName: "value",
				type: "number"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "LinSpace",
			dlOpName: "linspace",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "start",
				type: "number"
			}, {
				tfInputIndex: 1,
				dlParamName: "stop",
				type: "number"
			}, {
				tfInputIndex: 2,
				dlParamName: "num",
				type: "number"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "OneHot",
			dlOpName: "oneHot",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "indices",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "depth",
				type: "number"
			}, {
				tfInputIndex: 2,
				dlParamName: "onValue",
				type: "number",
				defaultValue: 1
			}, {
				tfInputIndex: 3,
				dlParamName: "offValue",
				type: "number",
				defaultValue: 0
			}, {
				tfParamName: "axis",
				dlParamName: "axis",
				type: "number",
				notSupported: !0
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Ones",
			dlOpName: "ones",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "shape",
				type: "number[]"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype"
			}]
		}, {
			tfOpName: "OnesLike",
			dlOpName: "onesLike",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "dtype",
				dlParamName: "dtype",
				type: "dtype"
			}]
		}, {
			tfOpName: "RandomUniform",
			dlOpName: "randomUniform",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "shape",
				type: "number[]"
			}, {
				tfParamName: "minval",
				dlParamName: "minval",
				type: "number",
				defaultValue: 0
			}, {
				tfParamName: "maxval",
				dlParamName: "maxval",
				type: "number",
				defaultValue: 1
			}, {
				tfParamName: "dtype",
				dlParamName: "dtype",
				type: "dtype"
			}, {
				tfParamName: "seed",
				dlParamName: "seed",
				type: "number",
				defaultValue: 0
			}, {
				tfParamName: "seed2",
				dlParamName: "seed2",
				type: "number",
				defaultValue: 0,
				notSupported: !0
			}, {
				tfParamName: "T",
				dlParamName: "T",
				type: "number",
				notSupported: !0
			}]
		}, {
			tfOpName: "Range",
			dlOpName: "range",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "start",
				type: "number"
			}, {
				tfInputIndex: 1,
				dlParamName: "stop",
				type: "number"
			}, {
				tfInputIndex: 2,
				dlParamName: "step",
				type: "number",
				defaultValue: 0
			}, {
				tfParamName: "Tidx",
				dlParamName: "dtype",
				type: "dtype"
			}]
		}, {
			tfOpName: "truncatedNormal",
			dlOpName: "truncatedNormal",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "shape",
				type: "number[]"
			}, {
				tfParamName: "means",
				dlParamName: "mean",
				type: "number",
				defaultValue: 0
			}, {
				tfParamName: "stddev",
				dlParamName: "stdDev",
				type: "number",
				defaultValue: 1
			}, {
				tfParamName: "seed",
				dlParamName: "seed",
				type: "number"
			}, {
				tfParamName: "seed2",
				dlParamName: "seed2",
				type: "number",
				defaultValue: 0,
				notSupported: !0
			}, {
				tfParamName: "dtype",
				dlParamName: "dtype",
				type: "dtype"
			}, {
				tfParamName: "T",
				dlParamName: "T",
				type: "number",
				notSupported: !0
			}]
		}, {
			tfOpName: "Zeros",
			dlOpName: "zeros",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "shape",
				type: "number[]"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype"
			}]
		}, {
			tfOpName: "ZerosLike",
			dlOpName: "zerosLike",
			category: "creation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype"
			}]
		}],
		creation$1 = Object.freeze({
			default: creation
		}),
		graph = [{
			tfOpName: "PlaceholderWithDefault",
			dlOpName: "placeholder",
			category: "graph",
			params: [{
				tfInputIndex: 0,
				dlParamName: "default",
				type: "tensor"
			}]
		}, {
			tfOpName: "Placeholder",
			dlOpName: "placeholder",
			category: "graph"
		}, {
			tfOpName: "Const",
			dlOpName: "const",
			category: "graph"
		}, {
			tfOpName: "Identity",
			dlOpName: "identity",
			category: "graph",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}]
		}, {
			tfOpName: "Snapshot",
			dlOpName: "snapshot",
			category: "graph",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}]
		}, {
			tfOpName: "Shape",
			dlOpName: "shape",
			category: "graph",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}]
		}, {
			tfOpName: "Print",
			dlOpName: "print",
			category: "graph",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				tfInputParamLength: 1,
				dlParamName: "data",
				type: "tensors"
			}, {
				tfParamName: "message",
				dlParamName: "message",
				type: "string"
			}, {
				tfParamName: "first_n",
				dlParamName: "firstN",
				type: "number",
				notSupprted: !0
			}, {
				tfParamName: "summarize",
				dlParamName: "summarize",
				type: "number",
				defaultValue: 3
			}]
		}, {
			tfOpName: "NoOp",
			dlOpName: "noop",
			category: "graph",
			params: []
		}, {
			tfOpName: "StopGradient",
			dlOpName: "stopGradient",
			category: "graph",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}]
		}, {
			tfOpName: "FakeQuantWithMinMaxVars",
			dlOpName: "fakeQuantWithMinMaxVars",
			category: "graph",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "min",
				dlParamName: "min",
				type: "number"
			}, {
				tfParamName: "max",
				dlParamName: "max",
				type: "number"
			}]
		}],
		graph$1 = Object.freeze({
			default: graph
		}),
		image$1 = [{
			tfOpName: "ResizeBilinear",
			dlOpName: "resizeBilinear",
			category: "image",
			params: [{
				tfInputIndex: 0,
				dlParamName: "images",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "size",
				type: "number[]"
			}, {
				tfParamName: "align_corners",
				dlParamName: "alignCorners",
				type: "bool"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "ResizeNearestNeighbor",
			dlOpName: "resizeNearestNeighbor",
			category: "image",
			params: [{
				tfInputIndex: 0,
				dlParamName: "images",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "size",
				type: "number[]"
			}, {
				tfParamName: "align_corners",
				dlParamName: "alignCorners",
				type: "bool"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}],
		image$2 = Object.freeze({
			default: image$1
		}),
		logical = [{
			tfOpName: "Equal",
			dlOpName: "equal",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "NotEqual",
			dlOpName: "notEqual",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Greater",
			dlOpName: "greater",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "GreaterEqual",
			dlOpName: "greaterEqual",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Less",
			dlOpName: "less",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "LessEqual",
			dlOpName: "lessEqual",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "LogicalAnd",
			dlOpName: "logicalAnd",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "LogicalNot",
			dlOpName: "logicalNot",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "LogicalOr",
			dlOpName: "logicalOr",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Select",
			dlOpName: "where",
			category: "logical",
			params: [{
				tfInputIndex: 0,
				dlParamName: "condition",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 2,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}],
		logical$1 = Object.freeze({
			default: logical
		}),
		matrices = [{
			tfOpName: "MatMul",
			dlOpName: "matMul",
			category: "matrices",
			params: [{
				tfInputIndex: 0,
				dlParamName: "a",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "b",
				type: "tensor"
			}, {
				tfParamName: "transpose_a",
				dlParamName: "transposeA",
				type: "bool",
				defaultValue: !1
			}, {
				tfParamName: "transpose_b",
				dlParamName: "transposeB",
				type: "bool",
				defaultValue: !1
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}, {
			tfOpName: "Transpose",
			dlOpName: "transpose",
			category: "matrices",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "perm",
				dlParamName: "perm",
				type: "number[]"
			}, {
				tfParamName: "T",
				dlParamName: "dtype",
				type: "dtype",
				notSupported: !0
			}]
		}],
		matrices$1 = Object.freeze({
			default: matrices
		}),
		normalization = [{
			tfOpName: "FusedBatchNorm",
			dlOpName: "batchNormalization",
			category: "normalization",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "scale",
				type: "tensor"
			}, {
				tfInputIndex: 2,
				dlParamName: "offset",
				type: "tensor"
			}, {
				tfInputIndex: 3,
				dlParamName: "mean",
				type: "tensor"
			}, {
				tfInputIndex: 4,
				dlParamName: "variance",
				type: "tensor"
			}, {
				tfParamName: "epsilon",
				dlParamName: "epsilon",
				type: "number",
				defaultValue: .001
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				notSupported: !0
			}]
		}, {
			tfOpName: "FusedBatchNormV2",
			dlOpName: "batchNormalization",
			category: "normalization",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "scale",
				type: "tensor"
			}, {
				tfInputIndex: 2,
				dlParamName: "offset",
				type: "tensor"
			}, {
				tfInputIndex: 3,
				dlParamName: "mean",
				type: "tensor"
			}, {
				tfInputIndex: 4,
				dlParamName: "variance",
				type: "tensor"
			}, {
				tfParamName: "epsilon",
				dlParamName: "epsilon",
				type: "number",
				defaultValue: .001
			}, {
				tfParamName: "data_format",
				dlParamName: "dataFormat",
				type: "string",
				notSupported: !0
			}]
		}, {
			tfOpName: "LRN",
			dlOpName: "localResponseNormalization",
			category: "normalization",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "depth_radius",
				dlParamName: "radius",
				type: "number",
				defaultValue: 5
			}, {
				tfParamName: "bias",
				dlParamName: "bias",
				type: "number",
				defaultValue: 1
			}, {
				tfParamName: "alpha",
				dlParamName: "alpha",
				type: "number",
				defaultValue: 1
			}, {
				tfParamName: "beta",
				dlParamName: "beta",
				type: "number",
				defaultValue: .5
			}]
		}, {
			tfOpName: "Softmax",
			dlOpName: "softmax",
			category: "normalization",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}]
		}],
		normalization$1 = Object.freeze({
			default: normalization
		}),
		reduction = [{
			tfOpName: "Max",
			dlOpName: "max",
			category: "reduction",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "axis",
				type: "number[]"
			}, {
				tfParamName: "keep_dims",
				dlParamName: "keepDims",
				type: "bool"
			}]
		}, {
			tfOpName: "Mean",
			dlOpName: "mean",
			category: "reduction",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "axis",
				type: "number[]"
			}, {
				tfParamName: "keep_dims",
				dlParamName: "keepDims",
				type: "bool"
			}]
		}, {
			tfOpName: "Min",
			dlOpName: "min",
			category: "reduction",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "axis",
				type: "number[]"
			}, {
				tfParamName: "keep_dims",
				dlParamName: "keepDims",
				type: "bool"
			}]
		}, {
			tfOpName: "Sum",
			dlOpName: "sum",
			category: "reduction",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "axis",
				type: "number[]"
			}, {
				tfParamName: "keep_dims",
				dlParamName: "keepDims",
				type: "bool"
			}]
		}, {
			tfOpName: "ArgMax",
			dlOpName: "argMax",
			category: "reduction",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "axis",
				type: "number"
			}]
		}, {
			tfOpName: "ArgMin",
			dlOpName: "argMin",
			category: "reduction",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "axis",
				type: "number"
			}]
		}],
		reduction$1 = Object.freeze({
			default: reduction
		}),
		slice_join = [{
			tfOpName: "ConcatV2",
			dlOpName: "concat",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				tfInputParamLength: 1,
				dlParamName: "tensors",
				type: "tensors"
			}, {
				tfInputIndex: -1,
				dlParamName: "axis",
				type: "number"
			}]
		}, {
			tfOpName: "Concat",
			dlOpName: "concat",
			category: "slice_join",
			params: [{
				tfInputIndex: 1,
				tfInputParamLength: 1,
				dlParamName: "tensors",
				type: "tensors"
			}, {
				tfInputIndex: 0,
				dlParamName: "axis",
				type: "number"
			}]
		}, {
			tfOpName: "GatherV2",
			dlOpName: "gather",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "indices",
				type: "tensor"
			}, {
				tfParamName: "axis",
				dlParamName: "axis",
				type: "number",
				defaultValue: 0
			}]
		}, {
			tfOpName: "Gather",
			dlOpName: "gather",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "indices",
				type: "tensor"
			}, {
				tfParamName: "axis",
				dlParamName: "axis",
				type: "number",
				defaultValue: 0
			}, {
				tfParamName: "validate_indices",
				dlParamName: "validateIndices",
				type: "bool",
				notSupported: !0
			}]
		}, {
			tfOpName: "Reverse",
			dlOpName: "reverse",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "axis",
				type: "number"
			}]
		}, {
			tfOpName: "ReverseV2",
			dlOpName: "reverse",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "axis",
				type: "number"
			}]
		}, {
			tfOpName: "Slice",
			dlOpName: "slice",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "begin",
				type: "number[]"
			}, {
				tfInputIndex: 2,
				dlParamName: "size",
				type: "number[]"
			}]
		}, {
			tfOpName: "StridedSlice",
			dlOpName: "stridedSlice",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "begin",
				type: "number[]"
			}, {
				tfInputIndex: 2,
				dlParamName: "end",
				type: "number[]"
			}, {
				tfInputIndex: 3,
				dlParamName: "strides",
				type: "number[]"
			}, {
				tfParamName: "begin_mask",
				dlParamName: "beginMask",
				type: "number",
				defaultValue: 0
			}, {
				tfParamName: "end_mask",
				dlParamName: "endMask",
				type: "number",
				defaultValue: 0
			}]
		}, {
			tfOpName: "Pack",
			dlOpName: "stack",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				tfInputParamLength: 0,
				dlParamName: "tensors",
				type: "tensors"
			}, {
				tfParamName: "axis",
				dlParamName: "axis",
				type: "number",
				defaultValue: 0
			}]
		}, {
			tfOpName: "Tile",
			dlOpName: "tile",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "reps",
				type: "number[]"
			}]
		}, {
			tfOpName: "Split",
			dlOpName: "split",
			category: "slice_join",
			params: [{
				tfInputIndex: 0,
				dlParamName: "axis",
				type: "number",
				defaultValue: 0
			}, {
				tfInputIndex: 1,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "num_split",
				dlParamName: "numOrSizeSplits",
				type: "number",
				defaultValue: 1
			}]
		}],
		sliceJoin = Object.freeze({
			default: slice_join
		}),
		transformation = [{
			tfOpName: "Cast",
			dlOpName: "cast",
			category: "transformation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "SrcT",
				dlParamName: "sdtype",
				type: "dtype",
				notSupported: !0
			}, {
				tfParamName: "DstT",
				dlParamName: "dtype",
				type: "dtype"
			}]
		}, {
			tfOpName: "ExpandDims",
			dlOpName: "expandDims",
			category: "transformation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				tfParamNameDeprecated: "dim",
				dlParamName: "axis",
				type: "number"
			}]
		}, {
			tfOpName: "Pad",
			dlOpName: "pad",
			category: "transformation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "padding",
				type: "number[]"
			}, {
				tfParamName: "constant_value",
				dlParamName: "constantValue",
				type: "number",
				defaultValue: 0
			}]
		}, {
			tfOpName: "PadV2",
			dlOpName: "pad",
			category: "transformation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "padding",
				type: "number[]"
			}, {
				tfInputIndex: 2,
				dlParamName: "constantValue",
				type: "number",
				defaultValue: 0
			}]
		}, {
			tfOpName: "Reshape",
			dlOpName: "reshape",
			category: "transformation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfInputIndex: 1,
				dlParamName: "shape",
				type: "number[]"
			}]
		}, {
			tfOpName: "Squeeze",
			dlOpName: "squeeze",
			category: "transformation",
			params: [{
				tfInputIndex: 0,
				dlParamName: "x",
				type: "tensor"
			}, {
				tfParamName: "axis",
				tfParamNameDeprecated: "squeeze_dims",
				dlParamName: "axis",
				type: "number[]"
			}]
		}],
		transformation$1 = Object.freeze({
			default: transformation
		}),
		CONTROL_FLOW_OPS = ["Switch", "Merge", "Enter", "Exit", "NextIteration"],
		OperationMapper = function() {
			function e() {
				var e = [arithmetic$1, basicMath, control$1, convolution$1, creation$1, logical$1, image$2, graph$1, matrices$1, normalization$1, reduction$1, sliceJoin, transformation$1],
					t = [].concat.apply([], e.map(function(e) {
						return e.default ? e.default : e
					}));
				this.opMappers = t.reduce(function(e, t) {
					return e[t.tfOpName] = t, e
				}, {})
			}
			return Object.defineProperty(e, "Instance", {
				get: function() {
					return this._instance || (this._instance = new this)
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.isControlFlow = function(e) {
				return CONTROL_FLOW_OPS.some(function(t) {
					return t === e.op
				})
			}, e.prototype.transformGraph = function(e) {
				var t = this,
					r = !1,
					n = [],
					a = e.node.reduce(function(e, a) {
						return e[a.name] = t.mapNode(a), t.isControlFlow(a) && (r = !0), "Placeholder" === a.op && n.push(e[a.name]), e
					}, {}),
					o = [],
					i = [];
				return Object.keys(a).forEach(function(e) {
					var t = a[e];
					t.inputNames.forEach(function(e) {
						var r = getNodeNameAndIndex(e)[0];
						t.inputs.push(a[r]), a[r].children.push(t)
					}), 0 === t.inputs.length && o.push(t)
				}), Object.keys(a).forEach(function(e) {
					var t = a[e];
					0 === t.children.length && i.push(t)
				}), {
					nodes: a,
					inputs: o,
					outputs: i,
					placeholders: n,
					withControlFlow: r
				}
			}, e.prototype.mapNode = function(e) {
				var t = this,
					r = this.opMappers[e.op];
				if (void 0 === r) throw new Error("Tensorflow Op is not supported: " + e.op);
				var n = {
					name: e.name,
					op: r.dlOpName,
					category: r.category,
					inputNames: (e.input || []).map(function(e) {
						return e.startsWith("^") ? e.substr(1) : e
					}),
					inputs: [],
					children: [],
					params: {}
				};
				return r.params && (n.params = r.params.reduce(function(r, n) {
					var a = n.tfInputIndex,
						o = n.tfInputParamLength,
						i = n.type,
						s = void 0;
					if (void 0 === a) switch (n.type) {
						case "string":
							void 0 === (s = t.getStringParam(e.attr, n.tfParamName, n.defaultValue)) && n.tfParamNameDeprecated && (s = t.getStringParam(e.attr, n.tfParamNameDeprecated, n.defaultValue));
							break;
						case "number":
							void 0 === (s = t.getNumberParam(e.attr, n.tfParamName, n.defaultValue)) && n.tfParamNameDeprecated && (s = t.getNumberParam(e.attr, n.tfParamNameDeprecated, n.defaultValue));
							break;
						case "number[]":
							void 0 === (s = t.getNumericArrayParam(e.attr, n.tfParamName, n.defaultValue)) && n.tfParamNameDeprecated && (s = t.getNumericArrayParam(e.attr, n.tfParamNameDeprecated, n.defaultValue));
							break;
						case "bool":
							void 0 === (s = t.getBoolParam(e.attr, n.tfParamName, n.defaultValue)) && n.tfParamNameDeprecated && (s = t.getBoolParam(e.attr, n.tfParamNameDeprecated, n.defaultValue));
							break;
						case "shape":
							void 0 === (s = t.getTensorShapeParam(e.attr, n.tfParamName, n.defaultValue)) && n.tfParamNameDeprecated && (s = t.getTensorShapeParam(e.attr, n.tfParamNameDeprecated, n.defaultValue));
							break;
						case "dtype":
							void 0 === (s = t.getDtypeParam(e.attr, n.tfParamName, n.defaultValue)) && n.tfParamNameDeprecated && (s = t.getDtypeParam(e.attr, n.tfParamNameDeprecated, n.defaultValue));
							break;
						case "tensor":
						case "tensors":
							break;
						default:
							throw new Error("Unsupported param type: " + n.type + " for op: " + e.op)
					}
					return r[n.dlParamName] = {
						value: s,
						inputIndex: a,
						type: i,
						inputParamLength: o
					}, r
				}, {})), n
			}, e.prototype.getStringParam = function(e, t, r, n) {
				void 0 === n && (n = !1);
				var a = e[t];
				if (void 0 !== a) {
					var o = String.fromCharCode.apply(null, a.s);
					return n ? o : o.toLowerCase()
				}
				return r
			}, e.prototype.getBoolParam = function(e, t, r) {
				var n = e[t];
				return n ? n.b : r
			}, e.prototype.getNumberParam = function(e, t, r) {
				var n = e[t],
					a = n ? void 0 !== n.f ? n.f : n.i : r;
				return "number" == typeof a ? a : a.toInt()
			}, e.prototype.getDtypeParam = function(e, t, r) {
				var n = e[t];
				if (n && n.type) switch (n.type) {
					case tensorflow.DataType.DT_FLOAT:
						return "float32";
					case tensorflow.DataType.DT_INT32:
						return "int32";
					case tensorflow.DataType.DT_BOOL:
						return "bool";
					default:
						return r
				}
				return r
			}, e.prototype.getTensorShapeParam = function(e, t, r) {
				var n = e[t];
				return n && n.shape ? n.shape.dim.map(function(e) {
					return e.size
				}) : r
			}, e.prototype.getNumericArrayParam = function(e, t, r) {
				var n = e[t];
				return n ? (n.list.f && n.list.f.length ? n.list.f : n.list.i).map(function(e) {
					return "number" == typeof e ? e : e.toInt()
				}) : r
			}, e
		}(),
		executeOp = function(e, t, r) {
			switch (e.op) {
				case "add":
					return [add(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "mod":
					return [mod(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "mul":
					return [mul(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "div":
					return [div(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "sub":
					return [sub(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "minimum":
					return [minimum(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "maximum":
					return [maximum(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "pow":
					return [pow(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "squaredDifference":
					return [squaredDifference(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$1 = function(e, t, r) {
			switch (e.op) {
				case "abs":
					return [abs(getParamValue("x", e, t, r))];
				case "acos":
					return [acos(getParamValue("x", e, t, r))];
				case "acosh":
					return [acosh(getParamValue("x", e, t, r))];
				case "asin":
					return [asin(getParamValue("x", e, t, r))];
				case "asinh":
					return [asinh(getParamValue("x", e, t, r))];
				case "atan":
					return [atan(getParamValue("x", e, t, r))];
				case "atanh":
					return [atanh(getParamValue("x", e, t, r))];
				case "ceil":
					return [ceil(getParamValue("x", e, t, r))];
				case "cos":
					return [cos(getParamValue("x", e, t, r))];
				case "cosh":
					return [cosh(getParamValue("x", e, t, r))];
				case "elu":
					return [elu(getParamValue("x", e, t, r))];
				case "erf":
					return [erf(getParamValue("x", e, t, r))];
				case "exp":
					return [exp(getParamValue("x", e, t, r))];
				case "expm1":
					return [expm1(getParamValue("x", e, t, r))];
				case "floor":
					return [floor(getParamValue("x", e, t, r))];
				case "log":
					return [log(getParamValue("x", e, t, r))];
				case "log1p":
					return [log1p(getParamValue("x", e, t, r))];
				case "neg":
					return [neg(getParamValue("x", e, t, r))];
				case "reciprocal":
					return [reciprocal(getParamValue("x", e, t, r))];
				case "relu":
					return [relu(getParamValue("x", e, t, r))];
				case "round":
					return [round(getParamValue("x", e, t, r))];
				case "selu":
					return [selu(getParamValue("x", e, t, r))];
				case "sigmoid":
					return [sigmoid(getParamValue("x", e, t, r))];
				case "sin":
					return [sin(getParamValue("x", e, t, r))];
				case "sign":
					return [sign(getParamValue("x", e, t, r))];
				case "sinh":
					return [sinh(getParamValue("x", e, t, r))];
				case "softplus":
					return [softplus(getParamValue("x", e, t, r))];
				case "sqrt":
					return [sqrt(getParamValue("x", e, t, r))];
				case "square":
					return [square(getParamValue("x", e, t, r))];
				case "tanh":
					return [tanh$1(getParamValue("x", e, t, r))];
				case "tan":
					return [tan(getParamValue("x", e, t, r))];
				case "clipByValue":
					return [clipByValue(getParamValue("x", e, t, r), getParamValue("clipValueMin", e, t, r), getParamValue("clipValueMax", e, t, r))];
				case "rsqrt":
					return [div(scalar(1, "float32"), sqrt(getTensor(e.inputNames[0], t, r)))];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		__awaiter$17 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$17 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		executeOp$3 = function(e, t, r) {
			switch (e.op) {
				case "conv1d":
					var n = getParamValue("stride", e, t, r),
						a = getParamValue("pad", e, t, r),
						o = getParamValue("dataFormat", e, t, r).toUpperCase(),
						i = getParamValue("dilation", e, t, r);
					return [conv1d(getParamValue("x", e, t, r), getParamValue("filter", e, t, r), n, a, o, i)];
				case "conv2d":
					var n = getParamValue("strides", e, t, r),
						a = getParamValue("pad", e, t, r),
						o = getParamValue("dataFormat", e, t, r).toUpperCase(),
						s = getParamValue("dilations", e, t, r);
					return [conv2d(getParamValue("x", e, t, r), getParamValue("filter", e, t, r), [n[1], n[2]], a, o, [s[0], s[1]])];
				case "conv2dTranspose":
					var u = getParamValue("outputShape", e, t, r),
						n = getParamValue("strides", e, t, r),
						a = getParamValue("pad", e, t, r);
					return [conv2dTranspose(getParamValue("x", e, t, r), getParamValue("filter", e, t, r), u, [n[1], n[2]], a)];
				case "depthwiseConv2d":
					var n = getParamValue("strides", e, t, r),
						a = getParamValue("pad", e, t, r),
						s = getParamValue("dilations", e, t, r),
						o = getParamValue("dataFormat", e, t, r).toUpperCase();
					return [depthwiseConv2d(getParamValue("input", e, t, r), getParamValue("filter", e, t, r), [n[1], n[2]], a, o, [s[0], s[1]])];
				case "avgPool":
					var n = getParamValue("strides", e, t, r),
						a = getParamValue("pad", e, t, r),
						l = getParamValue("kernelSize", e, t, r);
					return [avgPool(getParamValue("x", e, t, r), [l[1], l[2]], [n[1], n[2]], a)];
				case "maxPool":
					var n = getParamValue("strides", e, t, r),
						a = getParamValue("pad", e, t, r),
						l = getParamValue("kernelSize", e, t, r);
					return [maxPool(getParamValue("x", e, t, r), [l[1], l[2]], [n[1], n[2]], a)];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$4 = function(e, t, r) {
			switch (e.op) {
				case "fill":
					var n = getParamValue("shape", e, t, r),
						a = getParamValue("value", e, t, r);
					return [fill(n, a)];
				case "linspace":
					var o = getParamValue("start", e, t, r),
						i = getParamValue("stop", e, t, r),
						s = getParamValue("num", e, t, r);
					return [linspace(o, i, s)];
				case "oneHot":
					var u = getParamValue("indices", e, t, r),
						l = getParamValue("depth", e, t, r),
						c = getParamValue("onValue", e, t, r),
						p = getParamValue("offValue", e, t, r);
					return [oneHot(u, l, c, p)];
				case "ones":
					return [ones(getParamValue("shape", e, t, r), getParamValue("dtype", e, t, r))];
				case "onesLike":
					return [onesLike(getParamValue("x", e, t, r))];
				case "randomUniform":
					return [randomUniform(getParamValue("shape", e, t, r), getParamValue("minval", e, t, r), getParamValue("maxval", e, t, r), getParamValue("dtype", e, t, r))];
				case "range":
					var o = getParamValue("start", e, t, r),
						d = getParamValue("stop", e, t, r),
						h = getParamValue("step", e, t, r);
					return [range(o, d, h, getParamValue("dtype", e, t, r))];
				case "truncatedNormal":
					var n = getParamValue("shape", e, t, r),
						f = getParamValue("mean", e, t, r),
						m = getParamValue("stdDev", e, t, r),
						g = getParamValue("seed", e, t, r);
					return [truncatedNormal(n, f, m, getParamValue("dtype", e, t, r), g)];
				case "zeros":
					return [zeros(getParamValue("shape", e, t, r), getParamValue("dtype", e, t, r))];
				case "zerosLike":
					return [zerosLike(getParamValue("x", e, t, r))];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$5 = function(e, t, r) {
			switch (e.op) {
				case "const":
					return t[e.name];
				case "placeholder":
					var n = getParamValue("default", e, t, r);
					return [getTensor(e.name, t, r) || n];
				case "identity":
				case "stopGradient":
				case "fakeQuantWithMinMaxVars":
					return [getParamValue("x", e, t, r)];
				case "snapshot":
					return [getParamValue("x", e, t, r).clone()];
				case "shape":
					return [tensor1d(getParamValue("x", e, t, r).shape, "int32")];
				case "noop":
					return [];
				case "print":
					var a = getParamValue("x", e, t, r),
						o = getParamValue("data", e, t, r),
						i = getParamValue("message", e, t, r),
						s = getParamValue("summarize", e, t, r);
					console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."), console.log(i);
					for (var u = 0; u < o.length; u++) console.log(Array.prototype.slice.call(o[0].dataSync()).slice(0, s));
					return [a];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$6 = function(e, t, r) {
			switch (e.op) {
				case "resizeBilinear":
					var n = getParamValue("images", e, t, r),
						a = getParamValue("size", e, t, r),
						o = getParamValue("alignCorners", e, t, r);
					return [image.resizeBilinear(n, [a[0], a[1]], o)];
				case "resizeNearestNeighbor":
					var n = getParamValue("images", e, t, r),
						a = getParamValue("size", e, t, r),
						o = getParamValue("alignCorners", e, t, r);
					return [image.resizeNearestNeighbor(n, [a[0], a[1]], o)];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$7 = function(e, t, r) {
			switch (e.op) {
				case "equal":
					return [equal(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "notEqual":
					return [notEqual(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "greater":
					return [greater(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "greaterEqual":
					return [greaterEqual(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "less":
					return [less(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "lessEqual":
					return [lessEqual(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "logicalAnd":
					return [logicalAnd(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "logicalNot":
					return [logicalNot(getParamValue("a", e, t, r))];
				case "logicalOr":
					return [logicalOr(getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				case "where":
					return [where(getParamValue("condition", e, t, r), getParamValue("a", e, t, r), getParamValue("b", e, t, r))];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$8 = function(e, t, r) {
			switch (e.op) {
				case "matMul":
					return [matMul(getParamValue("a", e, t, r), getParamValue("b", e, t, r), getParamValue("transposeA", e, t, r), getParamValue("transposeB", e, t, r))];
				case "transpose":
					return [transpose(getParamValue("x", e, t, r), getParamValue("perm", e, t, r))];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$9 = function(e, t, r) {
			switch (e.op) {
				case "batchNormalization":
					return [batchNormalization(getParamValue("x", e, t, r), getParamValue("mean", e, t, r), getParamValue("variance", e, t, r), getParamValue("epsilon", e, t, r), getParamValue("scale", e, t, r), getParamValue("offset", e, t, r))];
				case "localResponseNormalization":
					return [localResponseNormalization(getParamValue("x", e, t, r), getParamValue("radius", e, t, r), getParamValue("bias", e, t, r), getParamValue("alpha", e, t, r), getParamValue("beta", e, t, r))];
				case "softmax":
					return [softmax(getParamValue("x", e, t, r))];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$10 = function(e, t, r) {
			switch (e.op) {
				case "max":
					var n = getParamValue("axis", e, t, r),
						a = getParamValue("keepDims", e, t, r);
					return [max(getParamValue("x", e, t, r), n, a)];
				case "mean":
					var n = getParamValue("axis", e, t, r),
						a = getParamValue("keepDims", e, t, r);
					return [mean(getParamValue("x", e, t, r), n, a)];
				case "min":
					var n = getParamValue("axis", e, t, r),
						a = getParamValue("keepDims", e, t, r);
					return [min(getParamValue("x", e, t, r), n, a)];
				case "sum":
					var n = getParamValue("axis", e, t, r),
						a = getParamValue("keepDims", e, t, r);
					return [sum(getParamValue("x", e, t, r), n, a)];
				case "argMax":
					n = getParamValue("axis", e, t, r);
					return [argMax(getParamValue("x", e, t, r), n)];
				case "argMin":
					n = getParamValue("axis", e, t, r);
					return [argMin(getParamValue("x", e, t, r), n)];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$11 = function(e, t, r) {
			switch (e.op) {
				case "concat":
					var n = getParamValue("axis", e, t, r),
						a = getParamValue("tensors", e, t, r);
					return [concat(a, n)];
				case "gather":
					var n = getParamValue("axis", e, t, r),
						o = getParamValue("x", e, t, r),
						i = getParamValue("indices", e, t, r);
					return [gather(o, i, n)];
				case "reverse":
					var n = getParamValue("axis", e, t, r),
						o = getParamValue("x", e, t, r);
					return [reverse(o, n)];
				case "slice":
					var s = getParamValue("begin", e, t, r),
						u = getParamValue("size", e, t, r);
					return [slice(getParamValue("x", e, t, r), s, u)];
				case "stridedSlice":
					var s = getParamValue("begin", e, t, r),
						l = getParamValue("end", e, t, r),
						c = getParamValue("strides", e, t, r),
						p = getParamValue("beginMask", e, t, r),
						d = getParamValue("endMask", e, t, r);
					return [stridedSlice(getParamValue("x", e, t, r), s, l, c, p, d)];
				case "stack":
					return tidy(function() {
						var n = getParamValue("axis", e, t, r),
							a = getParamValue("tensors", e, t, r),
							o = a[0].shape,
							i = a[0].squeeze().shape,
							s = a.map(function(e) {
								var t = arraysEqual(e.shape, o);
								if (!t && !arraysEqual(e.squeeze().shape, i)) throw new Error("the input tensors shape does not match");
								return t ? e : e.reshape(o)
							});
						return [stack(s, n)]
					});
				case "tile":
					var h = getParamValue("reps", e, t, r);
					return [tile(getParamValue("x", e, t, r), h)];
				case "split":
					var n = getParamValue("axis", e, t, r),
						f = getParamValue("numOrSizeSplits", e, t, r);
					return split(getParamValue("x", e, t, r), f, n);
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		executeOp$12 = function(e, t, r) {
			switch (e.op) {
				case "cast":
					return [cast(getParamValue("x", e, t, r), getParamValue("dtype", e, t, r))];
				case "expandDims":
					n = e.params.axis.value;
					return [expandDims(getParamValue("x", e, t, r), n)];
				case "squeeze":
					var n = e.params.axis.value;
					return [squeeze(getParamValue("x", e, t, r), n)];
				case "reshape":
					return [reshape(getParamValue("x", e, t, r), getParamValue("shape", e, t, r))];
				case "pad":
					return [pad(getParamValue("x", e, t, r), split$1(getParamValue("padding", e, t, r), 2), getParamValue("constantValue", e, t, r))];
				default:
					throw TypeError("Node type " + e.op + " is not implemented")
			}
		},
		ExecutionContext = function() {
			function e(e) {
				this.weightMap = e, this.rootContext = {
					id: 0,
					frameName: "",
					iterationId: 0
				}, this.contexts = [this.rootContext], this.lastId = 0, this.generateCurrentContextIds()
			}
			return e.prototype.newFrame = function(e, t) {
				return {
					id: e,
					frameName: t,
					iterationId: 0
				}
			}, Object.defineProperty(e.prototype, "currentContext", {
				get: function() {
					return this.contexts
				},
				set: function(e) {
					this.contexts !== e && (this.contexts = e, this.generateCurrentContextIds())
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "currentContextId", {
				get: function() {
					return this._currentContextIds[0]
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "currentContextIds", {
				get: function() {
					return this._currentContextIds
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.generateCurrentContextIds = function() {
				for (var e = [], t = 0; t < this.contexts.length - 1; t++) {
					var r = this.contexts.slice(0, this.contexts.length - t);
					e.push(this.contextIdforContexts(r))
				}
				e.push(""), this._currentContextIds = e
			}, e.prototype.contextIdforContexts = function(e) {
				return e ? e.map(function(e) {
					return 0 === e.id && 0 === e.iterationId ? "" : e.frameName + "-" + e.iterationId
				}).join("/") : ""
			}, e.prototype.enterFrame = function(e) {
				this.contexts && (this.lastId++, this.contexts = this.contexts.slice(), this.contexts.push(this.newFrame(this.lastId, e)), this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))
			}, e.prototype.exitFrame = function() {
				if (!(this.contexts && this.contexts.length > 1)) throw new Error("Cannot exit frame, the context is empty");
				this.contexts = this.contexts.slice(), this.contexts.splice(-1), this.currentContextIds.shift()
			}, e.prototype.nextIteration = function() {
				if (!(this.contexts && this.contexts.length > 0)) throw new Error("Cannot increase frame iteration, the context is empty");
				this.contexts = this.contexts.slice(), this.lastId++;
				var e = Object.assign({}, this.contexts[this.contexts.length - 1]);
				e.iterationId += 1, e.id = this.lastId, this.contexts.splice(-1, 1, e), this._currentContextIds.splice(0, 1, this.contextIdforContexts(this.contexts))
			}, e.prototype.getWeight = function(e) {
				return this.weightMap[e]
			}, e
		}(),
		__assign$1 = Object.assign || function(e) {
			for (var t, r = 1, n = arguments.length; r < n; r++) {
				t = arguments[r];
				for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
			}
			return e
		},
		__awaiter$18 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$18 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		GraphExecutor = function() {
			function e(e) {
				this.graph = e, this.compiledOrder = [], this._weightMap = {}, this.placeholders = e.placeholders.map(function(e) {
					return e.name
				}), this.outputs = e.outputs.map(function(e) {
					return e.name
				}), this.compile()
			}
			return Object.defineProperty(e.prototype, "weightMap", {
				get: function() {
					return this._weightMap
				},
				set: function(e) {
					var t = Object.keys(e).map(function(t) {
						return e[t].map(function(e) {
							return e.id
						})
					});
					this.weightIds = [].concat.apply([], t), this._weightMap = e
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "inputNodes", {
				get: function() {
					return this.placeholders
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "outputNodes", {
				get: function() {
					return this.outputs
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "isControlFlowModel", {
				get: function() {
					return this.graph.withControlFlow
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.compile = function() {
				if (!this.graph.withControlFlow)
					for (var e = this.graph.inputs.slice(), t = {}; e.length > 0;) {
						var r = e.pop();
						t[r.name] = !0, this.compiledOrder.push(r), r.children.forEach(function(r) {
							!t[r.name] && r.inputNames.every(function(e) {
								var r = getNodeNameAndIndex(e)[0];
								return t[r]
							}) && e.push(r)
						})
					}
			}, e.prototype.execute = function(e, t) {
				var r = this;
				return this.checkInput(e), tidy(function() {
					var n = new ExecutionContext(r._weightMap),
						a = r.compiledOrder.reduce(function(e, t) {
							return e[t.name] = executeOp$13(t, e, n), e
						}, __assign$1({}, r.weightMap, e));
					return r.findOutputs(a, n, t)
				})
			}, e.prototype.executeAsync = function(e, t) {
				return __awaiter$18(this, void 0, void 0, function() {
					var r, n, a, o, i, s, u = this;
					return __generator$18(this, function(l) {
						switch (l.label) {
							case 0:
								return r = new ExecutionContext(this._weightMap), [4, this.executeWithControlFlow(e, r)];
							case 1:
								return n = l.sent(), a = this.findOutputs(n, r, t), o = Object.keys(a).map(function(e) {
									return a[e].id
								}), i = Object.keys(e).map(function(t) {
									return e[t].map(function(e) {
										return e.id
									})
								}), s = [].concat.apply([], i), Object.keys(n).forEach(function(e) {
									n[e].forEach(function(e) {
										e && -1 === o.indexOf(e.id) && -1 === s.indexOf(e.id) && -1 === u.weightIds.indexOf(e.id) && e.dispose()
									})
								}), [2, a]
						}
					})
				})
			}, e.prototype.executeWithControlFlow = function(e, t) {
				return __awaiter$18(this, void 0, void 0, function() {
					var r, n, a, o, i, s, u, l;
					return __generator$18(this, function(c) {
						switch (c.label) {
							case 0:
								r = this.graph.inputs.map(function(e) {
									return {
										node: e,
										contexts: t.currentContext
									}
								}), n = __assign$1({}, this.weightMap, e), a = {}, c.label = 1;
							case 1:
								return r.length > 0 ? (o = r.pop(), t.currentContext = o.contexts, i = executeOp$13(o.node, n, t), s = getNodeNameAndIndex(o.node.name, t)[0], u = n, l = s, [4, i]) : [3, 3];
							case 2:
								return u[l] = c.sent(), o.node.children.forEach(function(e) {
									var o = getNodeNameAndIndex(e.name, t)[0];
									a[o] || ("merge" === e.op ? e.inputNames.some(function(e) {
										return !!getTensor(e, n, t)
									}) && (a[o] = !0, r.push({
										contexts: t.currentContext,
										node: e
									})) : e.inputNames.every(function(e) {
										return !!getTensor(e, n, t)
									}) && (a[o] = !0, r.push({
										contexts: t.currentContext,
										node: e
									})))
								}), [3, 1];
							case 3:
								return [2, n]
						}
					})
				})
			}, e.prototype.findOutputs = function(e, t, r) {
				return !r || r instanceof Array || (r = [r]), (r || this.graph.outputs.map(function(e) {
					return e.name
				})).reduce(function(r, n) {
					return r[n] = getTensor(n, e, t), r
				}, {})
			}, e.prototype.dispose = function() {
				var e = this;
				Object.keys(this.weightMap).forEach(function(t) {
					return e.weightMap[t].forEach(function(e) {
						return e.dispose()
					})
				})
			}, e.prototype.checkInput = function(e) {
				var t = this,
					r = Object.keys(e),
					n = [],
					a = [];
				if (this.placeholders.forEach(function(e) {
						-1 === r.indexOf(e) && n.push(e)
					}), r.forEach(function(e) {
						-1 === t.placeholders.indexOf(e) && a.push(e)
					}), n.length > 0) throw new Error("The dict provided in model.execute(dict) has the keys [" + r + "], but is missing the required keys: [" + n + "].");
				if (a.length > 0) throw new Error("The dict provided in model.execute(dict) has unused keys: [" + a + "]. Please provide only the following keys: [" + this.placeholders + "].")
			}, e
		}(),
		__awaiter$19 = function(e, t, r, n) {
			return new(r || (r = Promise))(function(a, o) {
				function i(e) {
					try {
						u(n.next(e))
					} catch (e) {
						o(e)
					}
				}

				function s(e) {
					try {
						u(n.throw(e))
					} catch (e) {
						o(e)
					}
				}

				function u(e) {
					e.done ? a(e.value) : new r(function(t) {
						t(e.value)
					}).then(i, s)
				}
				u((n = n.apply(e, t || [])).next())
			})
		},
		__generator$19 = function(e, t) {
			function r(e) {
				return function(t) {
					return n([e, t])
				}
			}

			function n(r) {
				if (a) throw new TypeError("Generator is already executing.");
				for (; u;) try {
					if (a = 1, o && (i = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(i = i.call(o, r[1])).done) return i;
					switch (o = 0, i && (r = [0, i.value]), r[0]) {
						case 0:
						case 1:
							i = r;
							break;
						case 4:
							return u.label++, {
								value: r[1],
								done: !1
							};
						case 5:
							u.label++, o = r[1], r = [0];
							continue;
						case 7:
							r = u.ops.pop(), u.trys.pop();
							continue;
						default:
							if (i = u.trys, !(i = i.length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
								u = 0;
								continue
							}
							if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
								u.label = r[1];
								break
							}
							if (6 === r[0] && u.label < i[1]) {
								u.label = i[1], i = r;
								break
							}
							if (i && u.label < i[2]) {
								u.label = i[2], u.ops.push(r);
								break
							}
							i[2] && u.ops.pop(), u.trys.pop();
							continue
					}
					r = t.call(e, u)
				} catch (e) {
					r = [6, e], o = 0
				} finally {
					a = i = 0
				}
				if (5 & r[0]) throw r[1];
				return {
					value: r[0] ? r[1] : void 0,
					done: !0
				}
			}
			var a, o, i, s, u = {
				label: 0,
				sent: function() {
					if (1 & i[0]) throw i[1];
					return i[1]
				},
				trys: [],
				ops: []
			};
			return s = {
				next: r(0),
				throw: r(1),
				return: r(2)
			}, "function" == typeof Symbol && (s[Symbol.iterator] = function() {
				return this
			}), s
		},
		FrozenModel = function() {
			function e(e, t, r) {
				this.modelUrl = e, this.weightManifestUrl = t, this.requestOption = r, this.version = "n/a", this.pathPrefix = this.getPathPrefix()
			}
			return Object.defineProperty(e.prototype, "modelVersion", {
				get: function() {
					return this.version
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "inputNodes", {
				get: function() {
					return this.executor.inputNodes
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(e.prototype, "outputNodes", {
				get: function() {
					return this.executor.outputNodes
				},
				enumerable: !0,
				configurable: !0
			}), e.prototype.getPathPrefix = function() {
				var e = parse(this.weightManifestUrl),
					t = e.pathname.split("/");
				return t.splice(-1), e.pathname = t.join("/"), format(e) + "/"
			}, e.prototype.loadRemoteProtoFile = function() {
				return __awaiter$19(this, void 0, void 0, function() {
					var e, t, r, n, a;
					return __generator$19(this, function(o) {
						switch (o.label) {
							case 0:
								return o.trys.push([0, 3, , 4]), [4, fetch(this.modelUrl, this.requestOption)];
							case 1:
								return e = o.sent(), r = (t = tensorflow.GraphDef).decode, n = Uint8Array.bind, [4, e.arrayBuffer()];
							case 2:
								return [2, r.apply(t, [new(n.apply(Uint8Array, [void 0, o.sent()]))])];
							case 3:
								throw a = o.sent(), new Error(this.modelUrl + " not found. " + a);
							case 4:
								return [2]
						}
					})
				})
			}, e.prototype.loadWeightManifest = function() {
				return __awaiter$19(this, void 0, void 0, function() {
					var e, t, r;
					return __generator$19(this, function(n) {
						switch (n.label) {
							case 0:
								return n.trys.push([0, 3, , 4]), [4, fetch(this.weightManifestUrl, this.requestOption)];
							case 1:
								return e = n.sent(), t = this, [4, e.clone().json()];
							case 2:
								return t.weightManifest = n.sent(), [3, 4];
							case 3:
								throw r = n.sent(), new Error(this.weightManifestUrl + " not found. " + r);
							case 4:
								return [2]
						}
					})
				})
			}, e.prototype.load = function() {
				return __awaiter$19(this, void 0, void 0, function() {
					var e, t, r, n;
					return __generator$19(this, function(a) {
						switch (a.label) {
							case 0:
								return e = this.loadRemoteProtoFile(), t = this.loadWeightManifest(), [4, Promise.all([e, t])];
							case 1:
								return r = a.sent()[0], this.version = r.versions.producer + "." + r.versions.minConsumer, [4, loadWeights(this.weightManifest, this.pathPrefix, void 0, this.requestOption)];
							case 2:
								return n = a.sent(), this.executor = new GraphExecutor(OperationMapper.Instance.transformGraph(r)), this.executor.weightMap = this.convertTensorMapToTensorsMap(n), [2, !0]
						}
					})
				})
			}, e.prototype.predict = function(e, t) {
				return this.execute(e, this.outputNodes)
			}, e.prototype.constructTensorMap = function(e) {
				var t = e instanceof Tensor ? [e] : e;
				if (t.length !== this.inputNodes.length) throw new Error("Input tensor count mismatch,the frozen model has " + this.inputNodes.length + " placeholders, while there are " + t.length + " input tensors.");
				return this.inputNodes.reduce(function(e, r, n) {
					return e[r] = t[n], e
				}, {})
			}, e.prototype.execute = function(e, t) {
				if (t = t || this.outputNodes, (e instanceof Tensor || Array.isArray(e)) && (e = this.constructTensorMap(e)), this.executor.isControlFlowModel) throw new Error("The model contains control flow ops, please use executeAsync method");
				var r = this.executor.execute(this.convertTensorMapToTensorsMap(e), t),
					n = Object.keys(r);
				return Array.isArray(t) && t.length > 1 ? t.map(function(e) {
					return r[e]
				}) : r[n[0]]
			}, e.prototype.executeAsync = function(e, t) {
				return __awaiter$19(this, void 0, void 0, function() {
					var r, n;
					return __generator$19(this, function(a) {
						switch (a.label) {
							case 0:
								if (!this.executor.isControlFlowModel) throw new Error("The model does not contain control flow ops, please use execute method for better performance.");
								return t = t || this.outputNodes, (e instanceof Tensor || Array.isArray(e)) && (e = this.constructTensorMap(e)), [4, this.executor.executeAsync(this.convertTensorMapToTensorsMap(e), t)];
							case 1:
								return r = a.sent(), n = Object.keys(r), [2, Array.isArray(t) && t.length > 1 ? t.map(function(e) {
									return r[e]
								}) : r[n[0]]]
						}
					})
				})
			}, e.prototype.convertTensorMapToTensorsMap = function(e) {
				return Object.keys(e).reduce(function(t, r) {
					return t[r] = [e[r]], t
				}, {})
			}, e.prototype.dispose = function() {
				this.executor.dispose()
			}, e
		}(),
		version$2 = "0.4.1",
		version$3 = "0.11.6",
		version$4 = {
			"tfjs-core": version,
			"tfjs-layers": version$1,
			"tfjs-converter": version$2,
			tfjs: version$3
		};
	exports.version = version$4, exports.setBackend = setBackend, exports.getBackend = getBackend, exports.disposeVariables = disposeVariables, exports.memory = memory, exports.version_core = version, exports.nextFrame = nextFrame, exports.environment = environment, exports.io = io, exports.serialization = serialization, exports.test_util = test_util, exports.util = util, exports.webgl = webgl, exports.AdadeltaOptimizer = AdadeltaOptimizer, exports.AdagradOptimizer = AdagradOptimizer, exports.AdamOptimizer = AdamOptimizer, exports.AdamaxOptimizer = AdamaxOptimizer, exports.MomentumOptimizer = MomentumOptimizer, exports.Optimizer = Optimizer, exports.RMSPropOptimizer = RMSPropOptimizer, exports.SGDOptimizer = SGDOptimizer, exports.Tensor = Tensor, exports.TensorBuffer = TensorBuffer, exports.variable = variable, exports.Variable = Variable, exports.ENV = ENV, exports.Environment = Environment, exports.doc = doc, exports.batchNormalization = batchNormalization, exports.batchNormalization2d = batchNormalization2d, exports.batchNormalization3d = batchNormalization3d, exports.batchNormalization4d = batchNormalization4d, exports.concat = concat, exports.concat1d = concat1d, exports.concat2d = concat2d, exports.concat3d = concat3d, exports.concat4d = concat4d, exports.conv1d = conv1d, exports.conv2d = conv2d, exports.conv2dTranspose = conv2dTranspose, exports.depthwiseConv2d = depthwiseConv2d, exports.separableConv2d = separableConv2d, exports.matMul = matMul, exports.matrixTimesVector = matrixTimesVector, exports.outerProduct = outerProduct, exports.vectorTimesMatrix = vectorTimesMatrix, exports.dot = dot, exports.avgPool = avgPool, exports.maxPool = maxPool, exports.transpose = transpose, exports.reverse = reverse, exports.reverse1d = reverse1d, exports.reverse2d = reverse2d, exports.reverse3d = reverse3d, exports.reverse4d = reverse4d, exports.slice = slice, exports.slice1d = slice1d, exports.slice2d = slice2d, exports.slice3d = slice3d, exports.slice4d = slice4d, exports.stridedSlice = stridedSlice, exports.argMax = argMax, exports.argMin = argMin, exports.logSumExp = logSumExp, exports.max = max, exports.mean = mean, exports.min = min, exports.moments = moments, exports.sum = sum, exports.unsortedSegmentSum = unsortedSegmentSum, exports.equal = equal, exports.equalStrict = equalStrict, exports.greater = greater, exports.greaterStrict = greaterStrict, exports.greaterEqual = greaterEqual, exports.greaterEqualStrict = greaterEqualStrict, exports.less = less, exports.lessStrict = lessStrict, exports.lessEqual = lessEqual, exports.lessEqualStrict = lessEqualStrict, exports.notEqual = notEqual, exports.notEqualStrict = notEqualStrict, exports.logicalNot = logicalNot, exports.logicalAnd = logicalAnd, exports.logicalOr = logicalOr, exports.logicalXor = logicalXor, exports.where = where, exports.abs = abs, exports.acos = acos, exports.acosh = acosh, exports.asin = asin, exports.asinh = asinh, exports.atan = atan, exports.atanh = atanh, exports.ceil = ceil, exports.clipByValue = clipByValue, exports.cos = cos, exports.cosh = cosh, exports.elu = elu, exports.exp = exp, exports.expm1 = expm1, exports.floor = floor, exports.sign = sign, exports.leakyRelu = leakyRelu, exports.log = log, exports.log1p = log1p, exports.logSigmoid = logSigmoid, exports.neg = neg, exports.prelu = prelu, exports.relu = relu, exports.reciprocal = reciprocal, exports.round = round, exports.selu = selu, exports.sigmoid = sigmoid, exports.sin = sin, exports.sinh = sinh, exports.softplus = softplus, exports.sqrt = sqrt, exports.rsqrt = rsqrt, exports.square = square, exports.step = step, exports.tan = tan, exports.tanh = tanh$1, exports.erf = erf, exports.add = add, exports.addStrict = addStrict, exports.atan2 = atan2, exports.div = div, exports.floorDiv = floorDiv, exports.divStrict = divStrict, exports.maximum = maximum, exports.maximumStrict = maximumStrict, exports.minimum = minimum, exports.minimumStrict = minimumStrict, exports.mod = mod, exports.modStrict = modStrict, exports.mul = mul, exports.mulStrict = mulStrict, exports.pow = pow, exports.powStrict = powStrict, exports.sub = sub, exports.subStrict = subStrict, exports.squaredDifference = squaredDifference, exports.squaredDifferenceStrict = squaredDifferenceStrict, exports.norm = norm, exports.cast = cast, exports.clone = clone, exports.fromPixels = fromPixels, exports.toPixels = toPixels, exports.ones = ones, exports.onesLike = onesLike, exports.zeros = zeros, exports.zerosLike = zerosLike, exports.eye = eye, exports.rand = rand, exports.randomNormal = randomNormal, exports.truncatedNormal = truncatedNormal, exports.randomUniform = randomUniform, exports.multinomial = multinomial, exports.reshape = reshape, exports.squeeze = squeeze, exports.tile = tile, exports.gather = gather, exports.oneHot = oneHot, exports.linspace = linspace, exports.range = range, exports.buffer = buffer, exports.fill = fill, exports.tensor = tensor, exports.scalar = scalar, exports.tensor1d = tensor1d, exports.tensor2d = tensor2d, exports.tensor3d = tensor3d, exports.tensor4d = tensor4d, exports.tensor5d = tensor5d, exports.print = print, exports.expandDims = expandDims, exports.stack = stack, exports.unstack = unstack, exports.split = split, exports.cumsum = cumsum, exports.pad = pad, exports.pad1d = pad1d, exports.pad2d = pad2d, exports.pad3d = pad3d, exports.pad4d = pad4d, exports.movingAverage = movingAverage, exports.basicLSTMCell = basicLSTMCell, exports.multiRNNCell = multiRNNCell, exports.softmax = softmax, exports.localResponseNormalization = localResponseNormalization, exports.linalg = linalg, exports.losses = losses, exports.image = image, exports.operation = operation, exports.train = train, exports.tidy = tidy, exports.keep = keep, exports.dispose = dispose, exports.time = time, exports.grad = grad, exports.valueAndGrad = valueAndGrad, exports.grads = grads, exports.valueAndGrads = valueAndGrads, exports.variableGrads = variableGrads, exports.customGrad = customGrad, exports.model = model, exports.sequential = sequential, exports.loadModel = loadModel, exports.input = input, exports.layers = layers, exports.constraints = constraints, exports.initializers = initializers, exports.metrics = metrics, exports.regularizers = regularizers, exports.Callback = Callback, exports.CallbackList = CallbackList, exports.CustomCallback = CustomCallback, exports.Model = Model, exports.RNN = RNN, exports.Sequential = Sequential, exports.SymbolicTensor = SymbolicTensor, exports.version_layers = version$1, exports.FrozenModel = FrozenModel, exports.loadFrozenModel = loadFrozenModel, exports.version_converter = version$2, Object.defineProperty(exports, "__esModule", {
		value: !0
	})
});