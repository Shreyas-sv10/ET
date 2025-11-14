// Helper function to safely read numbers
function num(id) {
    return parseFloat(document.getElementById(id).value) || 0;
}

// Helper to set result
function setResult(id, value) {
    document.getElementById(id).innerHTML = "Result: " + value.toFixed(3) + " mm/day";
}

/* =====================================================
   1. Crop Coefficient Method
   ETc = Kc × ET0
===================================================== */
document.getElementById("calc_crop").onclick = function () {
    let kc = num("kc");
    let et0 = num("et0_crop");
    let etc = kc * et0;
    setResult("result_crop", etc);
};

/* =====================================================
   2. Blaney–Criddle Method
   ET = p × (0.46 T + 8) × K
===================================================== */
document.getElementById("calc_bc").onclick = function () {
    let T = num("bc_mean_temp");
    let p = num("bc_pct_daylight");
    let K = num("bc_crop_factor") || 1;

    let ET = p * (0.46 * T + 8) * K;
    setResult("result_bc", ET);
};

/* =====================================================
   3. Thornthwaite Method (Simplified)
   ET = 1.6 (10*T/I)^a
===================================================== */
document.getElementById("calc_th").onclick = function () {
    let T = num("th_temp");

    if (T <= 0) {
        document.getElementById("result_th").innerHTML = "Result: Temperature must be > 0";
        return;
    }

    let I = 12 * Math.pow(T / 5, 1.514);  // Simplified heat index
    let a = 0.000000675 * Math.pow(I, 3) - 0.0000771 * Math.pow(I, 2) + 0.01792 * I + 0.49239;

    let ET = 1.6 * Math.pow((10 * T) / I, a);

    setResult("result_th", ET);
};

/* =====================================================
   4. Hargreaves Equation
===================================================== */
document.getElementById("calc_harg").onclick = function () {
    let Tmean = num("harg_Tmean");
    let Tmax = num("harg_Tmax");
    let Tmin = num("harg_Tmin");
    let Ra = num("harg_Ra") || 20; // Default approx

    let ET = 0.0023 * (Tmean + 17.8) * Math.sqrt(Tmax - Tmin) * Ra;
    setResult("result_harg", ET);
};

/* =====================================================
   5. Pan Evaporation Method
   ET0 = Kpan × Epan
===================================================== */
document.getElementById("calc_pan").onclick = function () {
    let Epan = num("pan_epan");
    let Kpan = num("pan_kpan");
    let ET = Epan * Kpan;
    setResult("result_pan", ET);
};

/* =====================================================
   6. Radiation Method (simple form)
   ET = Rn - G  (converted)
===================================================== */
document.getElementById("calc_rad").onclick = function () {
    let Rn = num("rad_Rn");
    let G = num("rad_G");
    let lambda = num("rad_lambda") || 2.45;

    let ET = (Rn - G) / lambda;
    setResult("result_rad", ET);
};

/* =====================================================
   7. Penman Method (simplified)
===================================================== */
document.getElementById("calc_penman").onclick = function () {
    let Rn = num("pen_Rn");
    let G = num("pen_G");
    let T = num("pen_T");
    let es = num("pen_es");
    let ea = num("pen_ea");
    let u2 = num("pen_u2");
    let gamma = num("pen_gamma");

    let delta = 4098 * (0.6108 * Math.exp((17.27 * T) / (T + 237.3))) / Math.pow((T + 237.3), 2);

    let ET = (delta * (Rn - G) + gamma * (900 / (T + 273)) * u2 * (es - ea)) /
             (delta + gamma * (1 + 0.34 * u2));

    setResult("result_penman", ET);
};

/* =====================================================
   8. Modified Penman (light version)
===================================================== */
document.getElementById("calc_penman_mod").onclick = function () {
    let Rn = num("mp_Rn");
    let u2 = num("mp_u2");
    let k = num("mp_tuning") || 1.0;

    let ET = k * (0.408 * Rn + 0.1 * u2);
    setResult("result_penman_mod", ET);
};

/* =====================================================
   9. FAO Penman–Monteith (FAO-56)
===================================================== */
document.getElementById("calc_fao").onclick = function () {
    let Rn = num("fao_Rn");
    let G = num("fao_G");
    let T = num("fao_T");
    let u2 = num("fao_u2");
    let es = num("fao_es");
    let ea = num("fao_ea");
    let delta = num("fao_delta");
    let gamma = num("fao_gamma");

    let ET =
      (0.408 * delta * (Rn - G) +
       gamma * (900 / (T + 273)) * u2 * (es - ea)) /
      (delta + gamma * (1 + 0.34 * u2));

    setResult("result_fao", ET);
};
