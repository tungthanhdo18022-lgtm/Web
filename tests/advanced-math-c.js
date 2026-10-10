/*
 * Advanced test: Advanced Math C (57 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'advanced-math-c',
  source: String.raw`
---
title: Advanced Math C
author: tungtks18022
description: 57 harder Advanced Math questions on quadratic, exponential, polynomial, radical and rational functions, factoring, equivalent expressions and nonlinear equations, with an explanation for every question.
category: Advanced Math
section: advanced
time: 91
---

1. A parabola in the $xy$-plane has a vertex of $(1, 17)$. The equation $y = -ax^2 + bx + c$ represents this parabola, where $a$, $b$, and $c$ are positive integer constants. What is the greatest possible value of $b$?
Answer: 32
Domain: Advanced Math
Explanation: The $x$-coordinate of the vertex is $\frac{-b}{2(-a)} = \frac{b}{2a} = 1$, so $b = 2a$. The vertex lies on the parabola, so $17 = -a(1)^2 + b(1) + c = -a + 2a + c = a + c$. Since $c$ is a positive integer, $c \ge 1$, so $a \le 16$ and $b = 2a \le 32$. The value $b = 32$ is possible with $a = 16$ and $c = 1$: $y = -16x^2 + 32x + 1 = -16(x - 1)^2 + 17$.

2. Which of the following must be a factor of the expression $2x^2 + (18r + 5)x + 45r$, where $r$ is a nonzero constant?

I. $x + 9r$

II. $2x + 5r$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Advanced Math
Explanation: Expanding $(x + 9r)(2x + 5)$ gives $2x^2 + 5x + 18rx + 45r = 2x^2 + (18r + 5)x + 45r$, so the expression equals $(x + 9r)(2x + 5)$ and $x + 9r$ is always a factor. The other factor is $2x + 5$, not $2x + 5r$: the expression has $2x + 5r$ as a factor only in the special case $r = 1$. For example, if $r = 2$, then substituting $x = -5$ (the zero of $2x + 10$) gives $2(25) + 41(-5) + 90 = -65 \ne 0$. So only I must be a factor.

3. The function $f$ is defined by $f(x) = 11x^3$. The graph of $y = f(-x) + c$ in the $xy$-plane, where $c$ is a positive integer constant, has an $x$-intercept at $(r, 0)$ and a $y$-intercept at $(0, t)$, where $r$ and $t$ are constants. Which of the following must be true about $r$ and $t$?
A. $r < 0$ and $t < 0$
B. $r < 0$ and $t > 0$
C. $r > 0$ and $t > 0$
D. $r > 0$ and $t < 0$
Answer: C
Domain: Advanced Math
Explanation: Since $f(-x) = 11(-x)^3 = -11x^3$, the graph is $y = -11x^3 + c$. At $x = 0$, $y = c$, so $t = c > 0$. At the $x$-intercept, $-11r^3 + c = 0$, so $r^3 = \frac{c}{11} > 0$, which means $r > 0$.

4. Function $f$ is a quadratic function. The graph of $y = f(x)$ in the $xy$-plane has a vertex at $(4, -6)$, contains the point $(3, 8)$, and has a $y$-intercept at $(0, a)$. The graph of $y = 5 + f(x)$ has a $y$-intercept at $(0, b)$. What is the positive difference between $a$ and $b$?
Answer: 5
Domain: Advanced Math
Explanation: The graph of $y = 5 + f(x)$ is the graph of $y = f(x)$ shifted up $5$ units, so $b = f(0) + 5 = a + 5$ and the positive difference is $5$. To confirm: $f(x) = m(x - 4)^2 - 6$ with $8 = m(3 - 4)^2 - 6$, so $m = 14$. Then $a = f(0) = 14(16) - 6 = 218$ and $b = 223$, and $223 - 218 = 5$.

5.

$$\begin{gathered} f(x) = 1.6^x + 6 \\[4pt] g(x) = 1.8x + b \end{gathered}$$

The graphs of the given functions in the $xy$-plane intersect at the points $(j, k)$ and $(h, r)$, where $r < k$. If $b$ is an integer, what is the least possible value of $b$?
A. $7$
B. $6$
C. $5$
D. $4$
Answer: C
Domain: Advanced Math
Explanation: The graphs intersect where $f(x) - g(x) = 1.6^x - 1.8x + 6 - b = 0$. This difference is an exponential minus a linear expression, so it decreases and then increases, and it has two zeros exactly when its smallest value is negative. If $b = 5$, the difference is $1.6^x - 1.8x + 1$, which equals $2$ at $x = 0$, $2.56 - 3.6 + 1 = -0.04$ at $x = 2$, and about $2.49$ at $x = 5$, so the graphs cross twice. If $b = 4$, the difference is $1.6^x - 1.8x + 2$, whose smallest value (near $x \approx 2.86$) is about $0.69 > 0$, so the graphs never meet; any smaller $b$ moves the line even farther below the curve. So the least integer value is $b = 5$. (The condition $r < k$ only names the two intersection points.)

6. For a certain circuit, its power $P$, in watts; current $C$, in amperes; voltage $V$, in volts; and resistance $R$, in ohms, are related as $\dfrac{CV^2}{P} = \sqrt{PR}$, where $P$, $C$, $V$, and $R$ are positive. When $R = 18$, which equation correctly expresses $P$ in terms of $C$ and $V$?
A. $P = \dfrac{CV^2}{\sqrt{18P}}$
B. $P = \dfrac{CV^2}{\sqrt{18}}$
C. $P = \sqrt[3]{\dfrac{C^2V^4}{18}}$
D. $P = \sqrt[3]{\dfrac{18}{C^2V^4}}$
Answer: C
Domain: Advanced Math
Explanation: With $R = 18$, $\frac{CV^2}{P} = \sqrt{18P}$. Multiplying both sides by $P$ gives $CV^2 = P\sqrt{18P}$, and squaring both sides gives $C^2V^4 = 18P^3$. So $P^3 = \frac{C^2V^4}{18}$ and $P = \sqrt[3]{\frac{C^2V^4}{18}}$. Choice A still has $P$ on the right side, choice B equals $P^{\frac{3}{2}}$ rather than $P$, and choice D is the reciprocal of the correct expression.

7.

$$f(x) = ax^2 + 4x + c$$

In the given quadratic function, $a$ and $c$ are constants. The graph of $y = f(x)$ in the $xy$-plane is a parabola that opens upward and has a vertex at the point $(h, k)$, where $h$ and $k$ are constants. If $k < 0$ and $f(-9) = f(3)$, which of the following must be true?

I. $c < 0$

II. $a \ge 1$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: D
Domain: Advanced Math
Explanation: Since $f(-9) = f(3)$, the axis of symmetry is halfway between $-9$ and $3$, so $h = -3$. The vertex formula gives $h = -\frac{4}{2a}$, so $-\frac{2}{a} = -3$ and $a = \frac{2}{3}$. So II is false. The vertex's $y$-coordinate is $k = f(-3) = 9\left(\frac{2}{3}\right) - 12 + c = c - 6$, and $k < 0$ only requires $c < 6$. For example, $c = 3$ gives $k = -3 < 0$, so I need not be true.

8. The expression $54x^4 + 219x^2 + 105$ can be written in the form $k(ax^2 + b)(cx^2 + d)$. If $a$, $b$, $c$, $d$, and $k$ are integers, what is the smallest possible value of $ab$?
Answer: 14
Domain: Advanced Math
Explanation: Factor out $3$ and treat the result as a quadratic in $x^2$: $54x^4 + 219x^2 + 105 = 3(18x^4 + 73x^2 + 35) = 3(9x^2 + 5)(2x^2 + 7)$. (Check: $(9x^2 + 5)(2x^2 + 7) = 18x^4 + 63x^2 + 10x^2 + 35$.) So the factor $ax^2 + b$ must be an integer multiple of $9x^2 + 5$ or of $2x^2 + 7$, which makes $ab$ equal to $45m^2$ or $14m^2$ for a nonzero integer $m$. The smallest possible value is $14$, from $ax^2 + b = 2x^2 + 7$ (for example, $k = 3$, $a = 2$, $b = 7$, $c = 9$, $d = 5$).

9. The function $h$ is defined by $h(x) = -\sqrt{x^2 + bx + c}$, where $b$ and $c$ are constants. In the $xy$-plane, the graph of $y = h(x)$ contains the points $(2, 0)$ and $\left(0, -\sqrt{266}\right)$. If $h(m) = 0$, what is the greatest possible value of $m$?
Answer: 133
Domain: Advanced Math
Explanation: From $h(0) = -\sqrt{c} = -\sqrt{266}$, $c = 266$. From $h(2) = 0$, $4 + 2b + 266 = 0$, so $b = -135$. Then $h(m) = 0$ means $m^2 - 135m + 266 = 0$, or $(m - 2)(m - 133) = 0$. The greatest possible value of $m$ is $133$.

10. The function $f$ is defined by $f(x) = 9x^2 + kx - 21$, where $k$ is a constant. In the $xy$-plane, the graph of $y = f(x)$ passes through the points $(r, 23)$ and $(2r, 139)$, where $r$ is a constant. Which of the following could be the value of $k$?
A. $4$
B. $12$
C. $116$
D. $152$
Answer: A
Domain: Advanced Math
Explanation: From $f(r) = 23$, $9r^2 + kr = 44$. From $f(2r) = 139$, $36r^2 + 2kr = 160$, or $18r^2 + kr = 80$. Subtracting the first equation from the second gives $9r^2 = 36$, so $r = 2$ or $r = -2$. If $r = 2$, then $36 + 2k = 44$ and $k = 4$; if $r = -2$, then $k = -4$. Only $4$ is among the choices.

11. The function $h$ is defined by $h(x) = a^x + b$, where $a$ and $b$ are positive constants. The graph of $y = h(x)$ in the $xy$-plane passes through the points $(0, 8)$ and $(2, 32)$. What is the value of $ab$?
A. $32$
B. $35$
C. $40$
D. $64$
Answer: B
Domain: Advanced Math
Explanation: Since $a^0 = 1$, $h(0) = 1 + b = 8$, so $b = 7$. Then $h(2) = a^2 + 7 = 32$, so $a^2 = 25$ and $a = 5$ (because $a > 0$). So $ab = 5 \cdot 7 = 35$. Choice C, $40 = 5 \cdot 8$, comes from using the $y$-intercept $8$ in place of $b$.

12. The function $g$ is a quadratic function. In the $xy$-plane, the graph of $y = g(x)$ has a vertex at $(-1, -4)$ and passes through the points $(-2, -43)$ and $(1, -160)$. What is the value of $g(0) - g(2)$?
A. $-121$
B. $0$
C. $117$
D. $312$
Answer: D
Domain: Advanced Math
Explanation: In vertex form, $g(x) = m(x + 1)^2 - 4$. From $g(-2) = m - 4 = -43$, $m = -39$ (check: $g(1) = 4(-39) - 4 = -160$). Then $g(0) = -39 - 4 = -43$ and $g(2) = -39(9) - 4 = -355$, so $g(0) - g(2) = -43 + 355 = 312$.

13. The function $f$ is defined by $f(x) = -39^x$. The function $g$ is a decreasing linear function. In the $xy$-plane, the graphs of $y = f(x)$ and $y = g(x)$ intersect at two points, $(h, j)$ and $(k, m)$, where $j > m$. When $g(x) < f(x)$, which of the following must also be true?
A. $x > k$
B. $x < h$
C. $x > k$ or $x < h$
D. $h < x < k$
Answer: D
Domain: Advanced Math
Explanation: Since $g$ is decreasing and $j > m$, the point with the greater $y$-value is to the left, so $h < k$. The graph of $f(x) = -39^x = -\left(39^x\right)$ is decreasing and curves downward (it is concave down), so between its two intersection points with a line, the curve lies above the line, and outside them it lies below. Therefore $g(x) < f(x)$ exactly when $h < x < k$. For example, the line through $(0, -1)$ and $(1, -39)$ is $g(x) = -38x - 1$, and at $x = 0.5$, $g(0.5) = -20 < f(0.5) \approx -6.24$.

14.

$$-16(3x - 4)^2 + 4(3x - 2)^2$$

The given expression can be rewritten as $\dfrac{a}{4}x^2 + \dfrac{b}{4}x + \dfrac{c}{4}$, where $a$, $b$, and $c$ are constants. What is the value of $a + b + c$?
A. $-48$
B. $-24$
C. $-12$
D. $-3$
Answer: A
Domain: Advanced Math
Explanation: Substituting $x = 1$ into both forms gives $\frac{a + b + c}{4} = -16(-1)^2 + 4(1)^2 = -12$, so $a + b + c = -48$. Expanding confirms this: the expression equals $-144x^2 + 384x - 256 + 36x^2 - 48x + 16 = -108x^2 + 336x - 240$, so $a = -432$, $b = 1{,}344$, and $c = -960$. Choice C is the value of $\frac{a + b + c}{4}$, not $a + b + c$.

15. The function $q$ is defined by $q(x) = |x - 9|^2 - 87|x - 9| + b$, where $b$ is a constant and $b > 87$. If $q(639) = h$ and $q(-621) = k$, where $h$ and $k$ are constants, what is the value of $9(-639)^{h - k} + 621(9)^{k - h}$?
Answer: 630
Domain: Advanced Math
Explanation: The function depends on $x$ only through $|x - 9|$. Since $|639 - 9| = 630$ and $|-621 - 9| = |-630| = 630$, $q(639) = q(-621)$, so $h = k$ and $h - k = k - h = 0$. Any nonzero number to the power $0$ is $1$, so the value is $9(1) + 621(1) = 630$.

16. The expression $9(x - 3)(x + 3)(x^2 - 4)$ is equivalent to $9x^4 - rx^2 + p$, where $r$ and $p$ are constants. What is the value of $p - r$?
A. $207$
B. $5$
C. $-5$
D. $-207$
Answer: A
Domain: Advanced Math
Explanation: Since $(x - 3)(x + 3) = x^2 - 9$, the expression is $9(x^2 - 9)(x^2 - 4) = 9(x^4 - 13x^2 + 36) = 9x^4 - 117x^2 + 324$. So $r = 117$ and $p = 324$, and $p - r = 207$.

17.

$$f(x) = a(x - h)^3 + k$$

In the given function, $a$, $h$, and $k$ are real constants such that $a < 0$, $h > 0$, and $k < 0$. Which of the following could be the graph of $y = f(x)$ in the $xy$-plane?
A. A cubic curve that passes from quadrant II through $(h, k)$ in quadrant IV and decreases for all real values of $x$.
B. A cubic curve that passes from quadrant III through $(h, k)$ in quadrant I and increases for all real values of $x$.
C. A parabola opening downward with its vertex at $(h, k)$ in quadrant IV.
D. A cubic curve that passes from quadrant II through $(-h, k)$ in quadrant III and decreases for all real values of $x$.
Answer: A
Domain: Advanced Math
Explanation: The graph is the graph of $y = ax^3$ shifted so that its center is at $(h, k)$. Since $h > 0$ and $k < 0$, the point $(h, k)$ is in quadrant IV. Since $a < 0$, the function decreases for all $x$, with $f(x)$ large and positive for very negative $x$ (quadrant II). Choice B increases, choice C is not a cubic, and choice D is centered at $(-h, k)$ instead of $(h, k)$.

18.

$$f(x) = 29(b)^x + c$$

The function $f$ is defined by the given equation, where $b$ and $c$ are constants and $b > 1$. In the $xy$-plane, the graph of $y = f(x)$ contains the point $(0, 44)$. For all values of $x$, $f(x) > k$, where $k$ is a constant. What is the greatest possible value of $k$?
Answer: 15
Domain: Advanced Math
Explanation: Since $b^0 = 1$, $f(0) = 29 + c = 44$, so $c = 15$. For $b > 1$, $29(b)^x$ is always positive and gets arbitrarily close to $0$ as $x$ decreases, so $f(x) > 15$ for all $x$, and $f(x)$ takes values as close to $15$ as desired. So $f(x) > k$ for all $x$ exactly when $k \le 15$, and the greatest possible value of $k$ is $15$.

19. An exponential function $f$ gives the estimated amount of an X-ray beam's initial intensity remaining after passing through a $w$-centimeter-thick window made of beryllium. The function estimates that after passing through a $1.8$-centimeter-thick window, the amount of the X-ray beam's initial intensity remaining is $0.65$. Which equation could define $f$?
A. $f(w) = 0.65(0.79)^{w - 1.8}$
B. $f(w) = 0.65(0.79)^{\frac{w}{1.8}}$
C. $f(w) = 0.65(1.8)^w$
D. $f(w) = 1.8(0.65)^w$
Answer: A
Domain: Advanced Math
Explanation: The function must satisfy $f(1.8) = 0.65$. In choice A, $f(1.8) = 0.65(0.79)^0 = 0.65$. The others give $f(1.8) = 0.65(0.79) \approx 0.51$ (choice B), $0.65(1.8)^{1.8} \approx 1.87$ (choice C, which also increases with thickness), and $1.8(0.65)^{1.8} \approx 0.83$ (choice D). Choice A also makes sense at $w = 0$: $f(0) = 0.65(0.79)^{-1.8} \approx 0.99$, almost all of the initial intensity.

20.

$$y = 5x^2 - 40x + 35$$

The given equation represents a parabola in the $xy$-plane. Which of the following equations represents the same parabola and displays the $x$-intercepts as constants or coefficients?
A. $y = 5x^2 - 8x + 35$
B. $y = 5x(x - 8) + 35$
C. $y = 5(x - 4)^2 - 45$
D. $y = 5(x - 1)(x - 7)$
Answer: D
Domain: Advanced Math
Explanation: Factoring gives $y = 5(x^2 - 8x + 7) = 5(x - 1)(x - 7)$, so the $x$-intercepts are $(1, 0)$ and $(7, 0)$, and the constants $1$ and $7$ appear in the equation. Choice C is the vertex form (it displays the vertex $(4, -45)$), choice B is equivalent but does not display the intercepts, and choice A is not equivalent to the given equation.

21. The quadratic function $g$ models the depth, in meters, below the surface of the water of a Weddell seal $t$ minutes after the seal entered the water during a dive. The function estimates that the seal reached its maximum depth of $396.8$ meters $8$ minutes after it entered the water, and then reached the surface of the water $16$ minutes after it entered the water. Based on the function, what was the estimated depth, to the nearest meter, of the seal $11$ minutes after it entered the water?
Answer: 341
Domain: Advanced Math
Explanation: The vertex of the graph is $(8, 396.8)$, so $g(t) = m(t - 8)^2 + 396.8$. Since $g(16) = 0$, $64m + 396.8 = 0$ and $m = -6.2$. Then $g(11) = -6.2(3)^2 + 396.8 = -55.8 + 396.8 = 341$ meters.

22.

$$\begin{gathered} f(x) = x + 3 \\[4pt] g(x) = 7x^2 - rx + 63 \end{gathered}$$

The functions $f$ and $g$ are given. In function $g$, $r$ is a constant. If $f(x) \cdot g(x) = 7x^3 + 189$, what is the value of $r$?
Answer: 21
Domain: Advanced Math
Explanation: Expanding, $(x + 3)(7x^2 - rx + 63) = 7x^3 + (21 - r)x^2 + (63 - 3r)x + 189$. For this to equal $7x^3 + 189$, the $x^2$-coefficient must be $0$, so $r = 21$ (and then $63 - 3r = 0$ as well). This matches the sum of cubes: $7x^3 + 189 = 7(x + 3)(x^2 - 3x + 9) = (x + 3)(7x^2 - 21x + 63)$.

23. The function $f$ is defined by $f(x) = 6(x - 2)(x^2 - k)$, where $k$ is a constant. In the $xy$-plane, the graph of $y = f(x)$ passes through the point $(-8, 0)$. What is the value of $f(0)$?
Answer: 768
Domain: Advanced Math
Explanation: Since $f(-8) = 6(-10)(64 - k) = 0$, $k = 64$. Then $f(0) = 6(0 - 2)(0 - 64) = 6(-2)(-64) = 768$.

24. The function $f(x) = -x(x - 401)$, where $0 \le x \le 401$, gives the speed, in meters per second, of a particle $x$ seconds after it started traveling. If the function $f$ is graphed in the $xy$-plane, where $y = f(x)$, which statement is the best interpretation of the point $(1, 400)$ on the graph?
A. The particle's speed was $400$ meters per second $1$ second after it started traveling.
B. The particle's initial speed was $400$ meters per second when it started traveling.
C. The particle's speed was $1$ meter per second $400$ seconds after it started traveling.
D. The particle's speed increased by $400$ meters per second each second after it started traveling.
Answer: A
Domain: Advanced Math
Explanation: The $x$-coordinate is the time in seconds and the $y$-coordinate is the speed in meters per second. Indeed, $f(1) = -1(1 - 401) = 400$, so $1$ second after it started, the particle's speed was $400$ meters per second. Choice B would be the point $(0, 400)$, but $f(0) = 0$; choice C swaps the coordinates; choice D describes a rate of change, not a point.

25.

$$f(x) = 18(2.10)^{\frac{x}{2}}$$

The function $f$ is defined by the given equation. The value of $f(x)$ increases by $p\%$ for every increase of $x$ by $4$. For which of the following functions, where $n$ is a positive constant, does the value of $g(x)$ increase by $p\%$ for every increase of $x$ by $1$?
A. $g(x) = n(1.05)^x$
B. $g(x) = n(2.10)^x$
C. $g(x) = n(3.41)^x$
D. $g(x) = n(4.41)^x$
Answer: D
Domain: Advanced Math
Explanation: When $x$ increases by $4$, the exponent $\frac{x}{2}$ increases by $2$, so $f(x)$ is multiplied by $(2.10)^2 = 4.41$. That is an increase of $341\%$, so $p = 341$. For $g(x)$ to increase by $341\%$ each time $x$ increases by $1$, its base must be $1 + 3.41 = 4.41$, so $g(x) = n(4.41)^x$. Choice C uses $3.41$, the percent as a decimal, instead of the growth factor.

26.

$$f(x) = 4^{-5(x + 1)}$$

Which of the following equivalent forms of the given function $f$ displays, as the base or the coefficient, the $y$-coordinate of the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?
A. $f(x) = \dfrac{1}{1{,}024}\left(\dfrac{1}{4}\right)^{5x}$
B. $f(x) = \left(\dfrac{1}{4}\right)^{5x + 5}$
C. $f(x) = 4^{-5x - 5}$
D. $f(x) = 1{,}024^{-x - 1}$
Answer: A
Domain: Advanced Math
Explanation: The $y$-intercept is $f(0) = 4^{-5} = \frac{1}{1{,}024}$. In choice A, $\frac{1}{1{,}024}\left(\frac{1}{4}\right)^{5x} = 4^{-5} \cdot 4^{-5x} = 4^{-5x - 5}$, so it is equivalent and it displays $\frac{1}{1{,}024}$ as the coefficient. Choices B, C, and D are also equivalent, but their bases are $\frac{1}{4}$, $4$, and $1{,}024$, and their coefficients are $1$.

27. Which expression must be a factor of $x^4 + 14ax^2 + 49a^2 - 64$, where $a$ is a positive constant?
A. $x^2 + 7a + 8$
B. $x^2 - 7a - 8$
C. $x^2 + 14a$
D. $x^2 - 8a$
Answer: A
Domain: Advanced Math
Explanation: The first three terms form a perfect square: $x^4 + 14ax^2 + 49a^2 = (x^2 + 7a)^2$. So the expression is a difference of squares, $(x^2 + 7a)^2 - 8^2 = (x^2 + 7a - 8)(x^2 + 7a + 8)$, and $x^2 + 7a + 8$ is a factor for every value of $a$. Choice C equals $x^2 + 7a + 8$ only when $a = \frac{8}{7}$, and choice D equals $x^2 + 7a - 8$ only when $a = \frac{8}{15}$, so neither must be a factor.

28.

$$nx^2 - 16x = 26x^2 - 8$$

In the given equation, $n$ is an integer constant. If the equation has two distinct real solutions, what is the greatest possible value of $n$?
Answer: 33
Domain: Advanced Math
Explanation: Rewrite the equation as $(n - 26)x^2 - 16x + 8 = 0$. If $n = 26$, the equation is linear and has only one solution. Otherwise, it has two distinct real solutions when the discriminant is positive: $(-16)^2 - 4(n - 26)(8) > 0$, so $256 > 32(n - 26)$, $n - 26 < 8$, and $n < 34$. The greatest integer value is $n = 33$.

29. Which expression is NOT a factor of $1{,}440x^4 - 56{,}250$?
A. $90$
B. $4x^2 + 25$
C. $2x^2 - 5$
D. $2x + 5$
Answer: C
Domain: Advanced Math
Explanation: Factoring out the greatest common factor $90$ gives $90(16x^4 - 625)$. Then $16x^4 - 625 = (4x^2 - 25)(4x^2 + 25) = (2x - 5)(2x + 5)(4x^2 + 25)$. So $1{,}440x^4 - 56{,}250 = 90(2x - 5)(2x + 5)(4x^2 + 25)$, which has $90$, $4x^2 + 25$, and $2x + 5$ as factors but not $2x^2 - 5$.

30. The point $(0, 0)$ lies on a circle in the $xy$-plane. An equation of this circle is $x^2 + (y + 6)^2 = p + 3$, where $p$ is a positive constant. What is the value of $p$?
Answer: 33
Domain: Geometry and Trigonometry
Explanation: Since $(0, 0)$ is on the circle, it satisfies the equation: $0^2 + (0 + 6)^2 = p + 3$, so $36 = p + 3$ and $p = 33$.

31.

$$f(x) = 26(2)^x + 4(2)^x$$

The function $f$ is defined by the given equation. Which of the following equivalent forms of $f$ displays, as a coefficient or a base, the $y$-coordinate of the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?
A. $f(x) = 104(2)^{x - 2} + 16(2)^{x - 2}$
B. $f(x) = 2\big(13(2)^x + 2(2)^x\big)$
C. $f(x) = 26(4)^{\frac{x}{2}} + 4(4)^{\frac{x}{2}}$
D. $f(x) = 30(2)^x$
Answer: D
Domain: Advanced Math
Explanation: Combining like terms, $f(x) = (26 + 4)(2)^x = 30(2)^x$, so the $y$-intercept is $f(0) = 30$, and choice D displays $30$ as the coefficient. Choices A, B, and C are also equivalent to $f$, but the numbers they display ($104$, $16$, and $2$; $2$ and $13$; $26$ and $4$) do not include $30$.

32.

| $x$ | $y$ |
|:---:|:---:|
| $16$ | $-7$ |
| $19$ | $11$ |
| $22$ | $-7$ |

The table shows three values of $x$ and their corresponding values of $y$, where $y = f(x) + 6$ and $f$ is a quadratic function. What is the $y$-coordinate of the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?
Answer: -717
Domain: Advanced Math
Explanation: Since $f(x) = y - 6$, $f(16) = -13$, $f(19) = 5$, and $f(22) = -13$. The equal values at $x = 16$ and $x = 22$ put the axis of symmetry at $x = 19$, so the vertex is $(19, 5)$ and $f(x) = m(x - 19)^2 + 5$. From $f(16) = 9m + 5 = -13$, $m = -2$. Then $f(0) = -2(-19)^2 + 5 = -722 + 5 = -717$.

33.

$$-(3x - 7)^2 = p + 16$$

In the equation, $p$ is an integer constant. The equation has no real solution. What is the least possible value of $p$?
A. $-18$
B. $-17$
C. $-16$
D. $-15$
Answer: D
Domain: Advanced Math
Explanation: The left side, $-(3x - 7)^2$, is never positive, and it takes every value less than or equal to $0$. So the equation has no real solution exactly when $p + 16 > 0$, that is, $p > -16$. The least integer value is $p = -15$. (If $p = -16$, then $x = \frac{7}{3}$ is a solution.)

34. A company opens an account with an initial balance of \$35,600.00. The account earns interest, and no additional deposits or withdrawals are made. The account balance is given by an exponential function $A$, where $A(t)$ is the account balance, in dollars, $t$ years after the account is opened. The account balance after $15$ years is \$129,672.38. Which equation could define $A$?
A. $A(t) = 35{,}600.00(1.09)^t$
B. $A(t) = 35{,}600.00(0.09)^t$
C. $A(t) = 94{,}072.38(1.09)^t$
D. $A(t) = 94{,}072.38(0.09)^t$
Answer: A
Domain: Advanced Math
Explanation: The initial balance is $A(0) = 35{,}600.00$, so the coefficient is $35{,}600.00$ (this rules out choices C and D). The balance grows, so the base must be greater than $1$ (choice B would shrink the balance). Check choice A: $35{,}600(1.09)^{15} \approx 129{,}672.38$.

35. The function $k$ is defined by

$$k(s) = \sqrt{s + 110}.$$

If $k(53p) = p$, where $p$ is a constant, what is the value of $p$?
Answer: 55
Domain: Advanced Math
Explanation: $\sqrt{53p + 110} = p$ requires $p \ge 0$. Squaring gives $53p + 110 = p^2$, so $p^2 - 53p - 110 = 0$ and $(p - 55)(p + 2) = 0$. The solution $p = -2$ is rejected because a square root cannot be negative, so $p = 55$. Check: $\sqrt{53(55) + 110} = \sqrt{3{,}025} = 55$.

36. The graph of the quadratic function $y = f(x)$ in the $xy$-plane intersects the $x$-axis when $x = 74$ and $x = k$, where $k$ is a constant. The maximum value of $y = f(x)$ occurs at the point $(17, m)$, where $m$ is a constant. What is the value of $k$?
Answer: -40
Domain: Advanced Math
Explanation: The maximum occurs at the vertex, which lies on the axis of symmetry halfway between the two $x$-intercepts. So $\frac{74 + k}{2} = 17$, which gives $74 + k = 34$ and $k = -40$.

37.

$$f(x) = n^x - p$$

In the given function, $n$ and $p$ are positive constants. The graph of $y = f(x)$ in the $xy$-plane passes through the points $(d, 11)$ and $(2d, 251)$, where $d$ is a constant. What is the value of $p$?
Answer: 5
Domain: Advanced Math
Explanation: Let $u = n^d$. Then $n^{2d} = u^2$, and the two points give $u - p = 11$ and $u^2 - p = 251$. Substituting $u = 11 + p$ gives $(11 + p)^2 = 251 + p$, so $p^2 + 21p - 130 = 0$ and $(p + 26)(p - 5) = 0$. Since $p$ is positive, $p = 5$. Check: $n^d = 16$ and $n^{2d} = 256$, and $256 - 5 = 251$. (The other root, $p = -26$, would require $n^d = 11 - 26 = -15$, which is impossible for a positive base $n$.)

38. The function $f$ is defined by $f(x) = ax^2 + bx + c$, where $a$, $b$, and $c$ are constants. The graph of $y = f(x)$ in the $xy$-plane passes through the points $(13, 0)$ and $(-6, 0)$. Which of the following is the value of $a + b$ in terms of $a$?
A. $7a$
B. $6a$
C. $-6a$
D. $-7a$
Answer: C
Domain: Advanced Math
Explanation: The zeros are $13$ and $-6$, so $f(x) = a(x - 13)(x + 6) = a(x^2 - 7x - 78) = ax^2 - 7ax - 78a$. So $b = -7a$ and $a + b = a - 7a = -6a$. Choice D is the value of $b$ alone.

39. The quadratic expression $a(x + 4.5)^2 - d$, where $a$, $c$, and $d$ are constants, can be rewritten as $(x - 9.5)(x + c)$. If $a$ is equal to $1$, what is the value of $d$?
Answer: 196
Domain: Advanced Math
Explanation: The rewritten form shows that $x = 9.5$ makes the expression equal to $0$. With $a = 1$: $(9.5 + 4.5)^2 - d = 0$, so $d = 14^2 = 196$. (Then the other zero is $-4.5 - 14 = -18.5$, so $c = 18.5$; check: $(x - 9.5)(x + 18.5) = x^2 + 9x - 175.75 = (x + 4.5)^2 - 196$.)

40.

$$\begin{gathered} y = -3x^2 - 58 \\[4pt] y = px - 46 \end{gathered}$$

In the given system of equations, $p$ is a constant. The graphs of the equations in the given system intersect at exactly one point, $(x, y)$, in the $xy$-plane. Which of the following could be the value of $x$?
A. $-2$
B. $-4$
C. $12$
D. $16$
Answer: A
Domain: Advanced Math
Explanation: Setting the expressions equal gives $-3x^2 - 58 = px - 46$, or $3x^2 + px + 12 = 0$. Exactly one intersection point means the discriminant is $0$: $p^2 - 4(3)(12) = 0$, so $p = 12$ or $p = -12$. The single solution is $x = -\frac{p}{2(3)} = -\frac{p}{6}$, which is $-2$ (when $p = 12$) or $2$ (when $p = -12$). Only $-2$ is a choice.

41. The function $f$ is defined by $f(x) = ax^2 + bx + c$, where $a$, $b$, and $c$ are constants. The graph of $y = f(x)$ in the $xy$-plane is a parabola with $x$-intercepts at $(14, 0)$ and $(k, 0)$. If $f(27) = f(11)$, what is the value of $k$?
Answer: 24
Domain: Advanced Math
Explanation: Since $f(27) = f(11)$, the axis of symmetry is $x = \frac{27 + 11}{2} = 19$. The $x$-intercepts are symmetric about this axis, so $\frac{14 + k}{2} = 19$, which gives $k = 24$.

42.

$$g(x) = \dfrac{x^2 - 49}{2x^2 - 13x - 7}$$

For what value of $x$ is the rational function $g$ undefined, but does NOT have a vertical asymptote (i.e., corresponds to a removable discontinuity)?
A. $-7$
B. $\dfrac{1}{2}$
C. $0$
D. $7$
Answer: D
Domain: Advanced Math
Explanation: Factoring gives $g(x) = \frac{(x - 7)(x + 7)}{(2x + 1)(x - 7)}$. The function is undefined where the denominator is $0$: at $x = 7$ and $x = -\frac{1}{2}$. At $x = 7$ the factor $x - 7$ cancels, so the graph has a hole there (a removable discontinuity) rather than a vertical asymptote; at $x = -\frac{1}{2}$ there is a vertical asymptote. The function is defined at $-7$ (where $g = 0$), at $\frac{1}{2}$, and at $0$.

43.

$$y = 8(x - d)(x + d)(x + h)(x - d)$$

In the given equation, $d$ and $h$ are different positive constants. When the equation is graphed in the $xy$-plane, how many distinct $x$-intercepts does the graph have?
A. $4$
B. $3$
C. $2$
D. $1$
Answer: B
Domain: Advanced Math
Explanation: The zeros are $x = d$ (from two factors), $x = -d$, and $x = -h$. Since $d > 0$ and $-h < 0$, $-h \ne d$, and since $h \ne d$, $-h \ne -d$. So there are $3$ distinct $x$-intercepts: $(d, 0)$, $(-d, 0)$, and $(-h, 0)$. Choice A counts the repeated factor $x - d$ twice.

44. In a certain state, the population of pheasants, a type of bird, is estimated each year by counting the number of pheasants observed along certain roads in the state. On average, each year from 2005 to 2015, the number of pheasants counted per mile of road decreased by $3.5\%$ of the number of pheasants per mile of road the previous year. Based on this average, if there were $6.97$ pheasants per mile of road in this state in 2005, which of the following best approximates the number of pheasants per mile of road in 2015?
A. $0.965(6.97)^{10}$
B. $1.035(6.97)^{10}$
C. $6.97(0.035)^{10}$
D. $6.97(0.965)^{10}$
Answer: D
Domain: Advanced Math
Explanation: A $3.5\%$ decrease each year multiplies the number by $1 - 0.035 = 0.965$ each year. From 2005 to 2015 is $10$ years, so the number in 2015 is about $6.97(0.965)^{10}$. Choices A and B put $6.97$ in the base, and choice C keeps only $3.5\%$ of the number each year.

45.

$$\dfrac{4}{7}(4x + 7)\big(x + \sqrt{4k + 7}\big)\big(x - \sqrt{4k + 7}\big) = 0$$

In the given equation, $k$ is a positive constant. The product of the solutions to the equation is $77$. What is the value of $k$?
Answer: 37/4 | 9.25
Domain: Advanced Math
Explanation: The solutions are $x = -\frac{7}{4}$, $x = -\sqrt{4k + 7}$, and $x = \sqrt{4k + 7}$. Their product is $\left(-\frac{7}{4}\right)\left(-\sqrt{4k + 7}\right)\left(\sqrt{4k + 7}\right) = \frac{7}{4}(4k + 7)$. Setting $\frac{7}{4}(4k + 7) = 77$ gives $4k + 7 = 44$, so $k = \frac{37}{4} = 9.25$.

46.

| $x$ | $h(x)$ |
|:---:|:---:|
| $0$ | $1.25$ |
| $2$ | $1.80$ |
| $4$ | $2.59$ |

The table shows the exponential relationship between the number of years, $x$, since Hana started training in pole vault, and the estimated height $h(x)$, in meters, of her best pole vault for that year. Which of the following functions best represents this relationship, where $x \le 4$?
A. $h(x) = 1.20(0.25)^x$
B. $h(x) = 1.20(1.25)^x$
C. $h(x) = 1.25(0.20)^x$
D. $h(x) = 1.25(1.20)^x$
Answer: D
Domain: Advanced Math
Explanation: Since $h(0) = 1.25$, the initial value (coefficient) is $1.25$, which rules out choices A and B. From $x = 0$ to $x = 2$, the height is multiplied by $\frac{1.80}{1.25} = 1.44 = 1.2^2$, so the yearly growth factor is $1.20$. Check: $1.25(1.20)^4 = 1.25(2.0736) \approx 2.59$. Choice C would decrease.

47. The expression $\dfrac{x^{20}(x - 4)}{5x^2} + \dfrac{4x^{20}}{5x^2}$ is equivalent to $\dfrac{1}{5}x^c$, where $x > 0$. What is the value of $c$?
A. $4$
B. $5$
C. $19$
D. $21$
Answer: C
Domain: Advanced Math
Explanation: The fractions have the same denominator, so the sum is $\frac{x^{21} - 4x^{20} + 4x^{20}}{5x^2} = \frac{x^{21}}{5x^2} = \frac{1}{5}x^{19}$. So $c = 19$. Choice D forgets to divide by $x^2$.

48. The graph of the quadratic function $y = f(x)$ in the $xy$-plane intersects the $x$-axis when $x = 39$ and when $x = p$, where $p$ is a constant. The maximum value of $y = f(x)$ occurs at the point $(14, m)$, where $m$ is a constant. What is the value of $p$?
Answer: -11
Domain: Advanced Math
Explanation: The maximum occurs on the axis of symmetry, halfway between the $x$-intercepts: $\frac{39 + p}{2} = 14$, so $39 + p = 28$ and $p = -11$.

49.

$$x(kx - 68) = -4$$

In the given equation, $k$ is an integer constant. If the equation has no real solution, what is the least possible value of $k$?
Answer: 290
Domain: Advanced Math
Explanation: Rewrite the equation as $kx^2 - 68x + 4 = 0$. If $k = 0$, the equation $-68x + 4 = 0$ has a solution. Otherwise, there is no real solution when the discriminant is negative: $(-68)^2 - 4(k)(4) < 0$, so $4{,}624 < 16k$ and $k > 289$. The least integer value is $290$.

50.

$$\begin{gathered} f(x) = x + 4 \\[4pt] g(x) = 3x^2 - rx + 48 \end{gathered}$$

The functions $f$ and $g$ are given. In the function $g$, $r$ is a constant. If $f(x) \cdot g(x) = 3x^3 + 192$, what is the value of $r$?
Answer: 12
Domain: Advanced Math
Explanation: Expanding, $(x + 4)(3x^2 - rx + 48) = 3x^3 + (12 - r)x^2 + (48 - 4r)x + 192$. For this to equal $3x^3 + 192$, the $x^2$-coefficient must be $0$, so $r = 12$ (and then $48 - 4r = 0$ as well). This matches $3x^3 + 192 = 3(x + 4)(x^2 - 4x + 16) = (x + 4)(3x^2 - 12x + 48)$.

51.

$$f(x) = x^2 - 42x + 80$$

The function $f$ is defined by the given equation. Which of the following equivalent forms of the equation displays the zeros of the function as constants or coefficients?
A. $f(x) = x^2 - 5x - 37x + 80$
B. $f(x) = (x - 2)(x - 40)$
C. $f(x) = x(x - 42) + 80$
D. $f(x) = (x - 21)^2 - 361$
Answer: B
Domain: Advanced Math
Explanation: Two numbers with product $80$ and sum $42$ are $2$ and $40$, so $f(x) = (x - 2)(x - 40)$, which displays the zeros $2$ and $40$. Choice D is the vertex form (it displays the vertex $(21, -361)$), and choices A and C are equivalent but do not display the zeros.

52.

![Graph of the estimated population y, in thousands, versus x, years since 2001. The horizontal x-axis runs from 0 to 5 with labels every 1 unit; the vertical y-axis is labeled 2, 4, 6, 8, 10, with horizontal gridlines every 1 unit up to 11 and vertical gridlines at x = 1, 2, 3, 4, 5. The graph is a line segment from (0, 5) to (1, 7.5), followed by a curve that keeps increasing but levels off, passing through about (2, 8.7), (3, 9.3), and (4, 9.7), and ending at (5, 10).](tests/images/advanced-math-c/q52.svg)

The graph gives the estimated population $y$, in thousands, of a town $x$ years since 2001, where $0 \le x \le 5$. Which of the following best describes the increase in the estimated population from $x = 0$ to $x = 1$?
A. The estimated population at $x = 1$ is $0.5$ times the estimated population at $x = 0$.
B. The estimated population at $x = 1$ is $1.5$ times the estimated population at $x = 0$.
C. The estimated population at $x = 1$ is $2.5$ times the estimated population at $x = 0$.
D. The estimated population at $x = 1$ is $3.5$ times the estimated population at $x = 0$.
Answer: B
Domain: Advanced Math
Explanation: From the graph, the estimated population is $5$ thousand at $x = 0$ and $7.5$ thousand at $x = 1$. Since $\frac{7.5}{5} = 1.5$, the population at $x = 1$ is $1.5$ times the population at $x = 0$. Choice C uses the increase, $2.5$ thousand, as if it were the ratio.

53.

$$f(x) = 240(2)^x$$

The function $f$ is defined by the given equation. If $g(x) = f(x - 3)$, which of the following equations defines the function $g$?
A. $g(x) = 30(2)^x$
B. $g(x) = 80(2)^x$
C. $g(x) = 240(8)^x$
D. $g(x) = 240(6)^x$
Answer: A
Domain: Advanced Math
Explanation: $g(x) = f(x - 3) = 240(2)^{x - 3} = 240 \cdot \frac{(2)^x}{2^3} = \frac{240}{8}(2)^x = 30(2)^x$. Choice B divides by $3$ instead of by $2^3 = 8$.

54.

$$x(9x - 2a) + b(9x - 2a) - (x + b) = 0$$

In the given equation, $a$ and $b$ are positive constants. A solution to the equation is $x = 42$. What is the value of $a$?
Answer: 377/2 | 188.5
Domain: Advanced Math
Explanation: The first two terms share the factor $9x - 2a$, so the equation is $(x + b)(9x - 2a) - (x + b) = 0$, or $(x + b)(9x - 2a - 1) = 0$. The solutions are $x = -b$, which is negative because $b > 0$, and $x = \frac{2a + 1}{9}$. So $\frac{2a + 1}{9} = 42$, which gives $2a + 1 = 378$ and $a = \frac{377}{2} = 188.5$.

55. The scatterplot shows the relationship between two variables, $x$ and $y$.

![Scatterplot with x on the horizontal axis from 0 to 5,000 and y on the vertical axis from 0 to 5,000, both labeled every 1,000, with gridlines every 1,000. Eight points rise from left to right in a roughly straight-line pattern, at about (1,200, 800), (1,600, 1,100), (1,900, 1,500), (2,300, 2,000), (2,600, 2,850), (3,200, 3,100), (3,500, 3,750), and (4,150, 4,050).](tests/images/advanced-math-c/q55.svg)

Which of the following equations is the most appropriate model for the data shown?
A. $y = -694 + 1.2x$
B. $y = 694 - 1.2x$
C. $y = -694(1.2)^x$
D. $y = 694(1.2)^{-x}$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The points rise from left to right in a roughly straight-line pattern, so a linear model with a positive slope is appropriate. Choice A has slope $1.2$; for example, at $x = 2{,}300$ it gives $y = -694 + 2{,}760 = 2{,}066$, close to the point near $(2{,}300, 2{,}000)$. Choices B and D decrease, and choice C gives only negative values of $y$.

56. On January 1, there were $231$ views of a video posted on a social media site. Every $2$ days after January 1, the number of views of the video increased by $70\%$ of the number of views $2$ days earlier. The function $f$ gives the predicted number of views $x$ days after January 1. Which equation defines $f$?
A. $f(x) = 231(0.70)^{\frac{x}{2}}$
B. $f(x) = 231(0.70)^{2x}$
C. $f(x) = 231(1.70)^{\frac{x}{2}}$
D. $f(x) = 231(1.70)^{2x}$
Answer: C
Domain: Advanced Math
Explanation: An increase of $70\%$ multiplies the number of views by $1 + 0.70 = 1.70$. This happens once every $2$ days, so after $x$ days it has happened $\frac{x}{2}$ times, and $f(x) = 231(1.70)^{\frac{x}{2}}$. Choices A and B would multiply by $0.70$ (a $30\%$ decrease), and choice D would multiply by $1.70$ every half day.

57.

$$-2x^2 + bx - 32 = 0$$

In the given equation, $b$ is a positive integer. The equation has no real solution. What is the largest possible value of $b$?
Answer: 15
Domain: Advanced Math
Explanation: The equation has no real solution when its discriminant is negative: $b^2 - 4(-2)(-32) < 0$, so $b^2 - 256 < 0$ and $b^2 < 256$. For a positive integer $b$, this means $b < 16$, so the largest possible value is $15$. (If $b = 16$, the discriminant is $0$ and $x = 4$ is a solution.)
`
});
