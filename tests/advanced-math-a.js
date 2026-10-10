/*
 * Advanced test: Advanced Math A (57 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'advanced-math-a',
  source: String.raw`
---
title: Advanced Math A
author: tungtks18022
description: 57 harder Advanced Math questions on quadratic, exponential, polynomial and rational functions, radicals and rational exponents, and nonlinear equations and models, with an explanation for every question.
category: Advanced Math
section: advanced
time: 91
---

1.

$$4x^2 - px + w = -86$$

In the given equation, $p$ and $w$ are integer constants. The equation has exactly one real solution. Which is NOT a possible value of $w$?
A. $-22$
B. $14$
C. $25$
D. $314$
Answer: C
Domain: Advanced Math
Explanation: Adding $86$ to both sides gives $4x^2 - px + (w + 86) = 0$. The equation has exactly one real solution when its discriminant is $0$: $p^2 - 16(w + 86) = 0$, so $w + 86 = \left(\frac{p}{4}\right)^2$. Since $w + 86$ is an integer, the rational number $\frac{p}{4}$ must be an integer, so $w + 86$ must be a perfect square. For $w = -22$, $14$, and $314$, $w + 86$ is $64 = 8^2$, $100 = 10^2$, and $400 = 20^2$ (with $p = 32$, $40$, and $80$). For $w = 25$, $w + 86 = 111$, which is not a perfect square, so $25$ is not a possible value of $w$.

2. If $x = \sqrt[2n]{7x^{n + 30}}$ for every positive integer $n$, what is the value of $x$?
Answer: 0
Domain: Advanced Math
Explanation: Raising both sides to the power $2n$ gives $x^{2n} = 7x^{n + 30}$. For $n = 30$ this becomes $x^{60} = 7x^{60}$, so $6x^{60} = 0$ and $x = 0$. And $x = 0$ works for every $n$, because $\sqrt[2n]{7 \cdot 0} = 0$. (For one particular $n \ne 30$, the positive number $x = 7^{\frac{1}{n - 30}}$ would also satisfy the equation, for example $x = 7$ when $n = 31$, which is why the equation must hold for every positive integer $n$.)

3. A company developed a plan to set the selling price of a product. The company determined that for a selling price of \$120.00, zero products would be sold. For each \$1.50 decrease in the selling price, the number of products sold would increase by one. For a revenue of exactly \$1,966.50, which of the following could be the number of products sold? (revenue = price $\times$ number of products sold)
A. $23$
B. $40$
C. $1{,}231$
D. $2{,}400$
Answer: A
Domain: Advanced Math
Explanation: If $n$ products are sold, the price is $120 - 1.5n$ dollars, so the revenue is $n(120 - 1.5n) = 1{,}966.5$. This gives $1.5n^2 - 120n + 1{,}966.5 = 0$, and dividing by $1.5$ gives $n^2 - 80n + 1{,}311 = 0$, or $(n - 23)(n - 57) = 0$. So $n = 23$ or $n = 57$, and only $23$ is a choice. Check: $23$ products at $120 - 34.50 = 85.50$ dollars each give $23 \times 85.50 = 1{,}966.50$ dollars.

4. In the $xy$-plane, a parabola has a vertex $(9, -14)$ and intersects the $x$-axis at two points. If the equation of the parabola is written in the form $y = ax^2 + bx + c$, where $a$, $b$, and $c$ are constants, which of the following could be the value of $a + b + c$?
A. $-23$
B. $-19$
C. $-14$
D. $-12$
Answer: D
Domain: Advanced Math
Explanation: The vertex is below the $x$-axis and the parabola crosses the $x$-axis twice, so it opens upward and $a > 0$. In vertex form, $y = a(x - 9)^2 - 14$. The value of $a + b + c$ is the value of $y$ when $x = 1$: $a(1 - 9)^2 - 14 = 64a - 14$. Since $a > 0$, $64a - 14 > -14$, and only $-12$ is greater than $-14$ (it occurs when $a = \frac{1}{32}$).

5.

$$\begin{gathered} f(x) = x^2 + 5x - 6 \\[4pt] g(x) = x^2 + 2x - 35 \end{gathered}$$

The quadratic function $f$ has $2$ zeros, $j$ and $k$, where $j < k$. The quadratic function $g$ has $2$ zeros, $l$ and $m$, where $l < m$. The quadratic function $h(x) = x^2 + 7x + c$ has zeros $k + l$ and $m + j$ and can be rewritten as $(x + a)(x + b)$, where $a$ and $b$ are constants. What is the value of $c$?
Answer: 6
Domain: Advanced Math
Explanation: Since $f(x) = (x + 6)(x - 1)$, its zeros are $j = -6$ and $k = 1$. Since $g(x) = (x + 7)(x - 5)$, its zeros are $l = -7$ and $m = 5$. So the zeros of $h$ are $k + l = 1 + (-7) = -6$ and $m + j = 5 + (-6) = -1$, and $h(x) = (x + 6)(x + 1) = x^2 + 7x + 6$. Therefore $c = 6$.

6. For the function $f$, for each increase in the value of $x$ by $c$, where $c$ is a positive constant, the value of $f(x)$ increases by a factor of $27$. Which of the following equivalent forms of the function $f$ displays $\dfrac{1}{c}$ as a coefficient of $x$?
A. $f(x) = 48(3)^{\frac{1}{2}x}$
B. $f(x) = 48\left(3^3\right)^{\frac{1}{6}x}$
C. $f(x) = 48(9)^{\frac{1}{4}x}$
D. $f(x) = 48\left(27^{\frac{1}{3}x}\right)^{\frac{1}{2}}$
Answer: B
Domain: Advanced Math
Explanation: All four forms equal $48(3)^{\frac{x}{2}}$. Since $27 = 3^3 = \left(3^{\frac{1}{2}}\right)^6$, the value of $f(x)$ is multiplied by $27$ each time $x$ increases by $6$, so $c = 6$ and $\frac{1}{c} = \frac{1}{6}$. Choice B can be written as $48(27)^{\frac{1}{6}x}$, and it displays $\frac{1}{6}$ as the coefficient of $x$. Choices A and C display $\frac{1}{2}$ and $\frac{1}{4}$, and in choice D the coefficient of $x$ is $\frac{1}{3}$ (the $\frac{1}{2}$ is an outer exponent).

7.

$$3x^2 + bx - 112 = (ax + m)(x - l)$$

Given that $a$, $m$, and $l$ are integers, which of the following must be true?
A. $m$ is a factor of $b$
B. $a$ is a factor of $112$
C. $a$ is a factor of $b$
D. $l$ is a factor of $112$
Answer: D
Domain: Advanced Math
Explanation: Expanding the right side gives $ax^2 + (m - al)x - ml$. Matching coefficients gives $a = 3$, $b = m - 3l$, and $ml = 112$. Since $m$ and $l$ are integers whose product is $112$, $l$ is a factor of $112$. The other statements can fail: $a = 3$ is not a factor of $112$, and with $m = 112$ and $l = 1$, $b = 109$, which is divisible by neither $112$ nor $3$.

8.

$$f(x) = (x - a)(x - b)$$

The function $f$ is defined by the given equation, where $a$ and $b$ are integer constants. If $f(17) > 0$, $f(20) < 0$, and $f(23) > 0$, what is one possible value of $a + b$?
Answer: 39 | 40 | 41
Domain: Advanced Math
Explanation: The graph of $f$ is a parabola that opens upward with zeros $a$ and $b$, so $f(x) < 0$ only for $x$ strictly between the zeros. Because $f(20) < 0$ while $f(17) > 0$ and $f(23) > 0$, one zero is strictly between $17$ and $20$ and the other is strictly between $20$ and $23$. As integers, one zero is $18$ or $19$ and the other is $21$ or $22$, so $a + b$ is $39$, $40$, or $41$.

9. The function $f$ is defined by $f(x) = \dfrac{x^2 + ax + b}{2x + c}$, where $a$, $b$, and $c$ are constants. The graph of the function $f$ in the $xy$-plane, where $y = f(x)$, does not intersect the line $x = 3$. If $f(5) = f(7) = 0$, what is the value of $a + b + c$?
Answer: 17
Domain: Advanced Math
Explanation: The graph does not intersect the line $x = 3$, so $f(3)$ is undefined: $2(3) + c = 0$, which gives $c = -6$. Since $f(5) = f(7) = 0$ (and the denominator is not $0$ at $x = 5$ or $x = 7$), the numerator has zeros $5$ and $7$: $x^2 + ax + b = (x - 5)(x - 7) = x^2 - 12x + 35$. So $a = -12$, $b = 35$, and $a + b + c = -12 + 35 - 6 = 17$.

10. The function $f$ is defined by $f(x) = ab^{\frac{x}{n}}$, where $a$, $b$, and $n$ are constants, and $b$ and $n$ are integers. If $f(2) = 6$ and $f(5) = 162$, what is the value of $f(7)$?
Answer: 1458
Domain: Advanced Math
Explanation: Dividing, $\frac{f(5)}{f(2)} = b^{\frac{5}{n} - \frac{2}{n}} = b^{\frac{3}{n}} = \frac{162}{6} = 27$, so $b^{\frac{1}{n}} = 3$. Then $f(7) = f(5) \cdot b^{\frac{2}{n}} = 162 \cdot 3^2 = 1{,}458$.

11.

$$(x - k)^2 = (k - 4a)(x - k)$$

In the given equation, $a$ and $k$ are constants, where $k > 4a$. The sum of the solutions to the equation is $3k + 35$. What is the value of $a$?
Answer: -35/4 | -8.75
Domain: Advanced Math
Explanation: Moving everything to one side and factoring gives $(x - k)\big[(x - k) - (k - 4a)\big] = 0$, or $(x - k)(x - 2k + 4a) = 0$. The solutions are $x = k$ and $x = 2k - 4a$, which are different because $k > 4a$. Their sum is $3k - 4a$, so $3k - 4a = 3k + 35$, which gives $a = -\frac{35}{4}$, or $-8.75$.

12. The equation $N(m) = 65(Q)^{\frac{m}{4}}$ gives the predicted population $N(m)$, in thousands, of a certain bacteria colony $m$ minutes after the initial measurement, where $Q$ is a constant greater than $1$. The predicted population increases by $p\%$ every $120$ seconds. What is the value of $p$ in terms of $Q$?
A. $100\left(Q^{\frac{1}{2}} + 1\right)$
B. $100\left(Q^{30} + 1\right)$
C. $100\left(Q^{\frac{1}{2}} - 1\right)$
D. $100\left(Q^{30} - 1\right)$
Answer: C
Domain: Advanced Math
Explanation: Since $m$ is in minutes, $120$ seconds is $2$ minutes. Then $N(m + 2) = 65(Q)^{\frac{m + 2}{4}} = N(m) \cdot Q^{\frac{1}{2}}$, so every $2$ minutes the population is multiplied by $Q^{\frac{1}{2}}$. Multiplying by $Q^{\frac{1}{2}}$ is an increase of $\left(Q^{\frac{1}{2}} - 1\right) \times 100$ percent, so $p = 100\left(Q^{\frac{1}{2}} - 1\right)$. Choices B and D treat $120$ as minutes, and choices A and B add $1$ instead of subtracting it.

13. In the $xy$-plane, the graph of function $f$, where $y = f(x)$, has exactly $8$ $x$-intercepts. One of these $x$-intercepts is $(17, 0)$. The rational function $g$ is defined by $g(x) = \dfrac{f(x)}{x - 17}$. In the $xy$-plane, how many $x$-intercepts does the graph of $y = g(x)$ have?
Answer: 7
Domain: Advanced Math
Explanation: The graph of $g$ has an $x$-intercept at each value of $x$ where $f(x) = 0$ and the denominator $x - 17$ is not $0$. The function $g$ is undefined at $x = 17$, so $(17, 0)$ is not an $x$-intercept of $g$, but the other $8 - 1 = 7$ zeros of $f$ are zeros of $g$. So the graph of $y = g(x)$ has $7$ $x$-intercepts.

14. If $n$ and $k$ are numbers greater than $1$ and $\sqrt[4]{n^5}$ is equivalent to $\sqrt[3]{k^2}$, for what value of $a$ is $n^{2a + 1}$ equal to $k$?
Answer: 7/16
Domain: Advanced Math
Explanation: Since $\sqrt[4]{n^5} = n^{\frac{5}{4}}$ and $\sqrt[3]{k^2} = k^{\frac{2}{3}}$, it follows that $k^{\frac{2}{3}} = n^{\frac{5}{4}}$. Raising both sides to the power $\frac{3}{2}$ gives $k = n^{\frac{15}{8}}$. Then $2a + 1 = \frac{15}{8}$, so $2a = \frac{7}{8}$ and $a = \frac{7}{16}$.

15. For the function $f$, for every increase of $2$ in the value of $x$, the value of $f(x)$ increases by a factor of $c$, where $c$ is a constant. Which of the following equivalent forms of function $f$ displays the value of $c$ as the base or the coefficient?
A. $f(x) = 26(2)^{6x}$
B. $f(x) = 26(8)^{2x}$
C. $f(x) = 26(64)^x$
D. $f(x) = 26(4{,}096)^{\frac{x}{2}}$
Answer: D
Domain: Advanced Math
Explanation: All four forms equal $26(64)^x$, since $2^{6x} = 8^{2x} = 64^x = \left(64^2\right)^{\frac{x}{2}}$. When $x$ increases by $2$, $64^x$ is multiplied by $64^2 = 4{,}096$, so $c = 4{,}096$. Only choice D displays $4{,}096$ as the base. In choice D, increasing $x$ by $2$ increases the exponent $\frac{x}{2}$ by exactly $1$.

16. The functions $f$ and $g$ are defined by the given equations below, where $x \ge 0$. Which of the following equations displays, as a constant or coefficient, the minimum value of the function it defines, where $x \ge 0$?

I. $f(x) = 16(1.3)^{x + 5}$

II. $g(x) = 16(1.09)(1.3)^{x + 3}$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: D
Domain: Advanced Math
Explanation: Both functions are increasing because the base $1.3$ is greater than $1$, so each minimum occurs at $x = 0$. The minimum of $f$ is $f(0) = 16(1.3)^5 \approx 59.41$, and the minimum of $g$ is $g(0) = 16(1.09)(1.3)^3 \approx 38.32$. Neither value appears as a constant or coefficient in its equation (the numbers $16$ and $16(1.09) = 17.44$ are not the minimums), so the answer is neither I nor II.

17.

$$r(m) = (1.031)^{4m}$$

The function $r$ is defined by the given equation. The value of $r(m)$ increases by $p\%$ for each increase by $1$ in the value of $m$. Which of the following is closest to the value of $p$?
A. $0.766$
B. $3.1$
C. $12.989$
D. $25.775$
Answer: C
Domain: Advanced Math
Explanation: Increasing $m$ by $1$ increases the exponent by $4$, so $r(m + 1) = r(m) \cdot (1.031)^4 \approx r(m) \cdot 1.12989$. This is an increase of about $12.989\%$. (A $3.1\%$ increase happens for each increase of $\frac{1}{4}$ in $m$, not $1$.)

18. The function $g$ is defined by $g(x) = -2x(x + 3)(x - k)^2 + r$, where $k$ and $r$ are integer constants. In the $xy$-plane, the graph of $y = g(x)$ passes through the point $(7, 13)$, and $g(0) = 13$. What is the value of $r + k$?
A. $-7$
B. $6$
C. $13$
D. $20$
Answer: D
Domain: Advanced Math
Explanation: Since $g(0) = -2(0)(3)(0 - k)^2 + r = r$, we get $r = 13$. Then $g(7) = -2(7)(10)(7 - k)^2 + 13 = 13$, so $-140(7 - k)^2 = 0$ and $k = 7$. Therefore $r + k = 13 + 7 = 20$.

19.

![Graph of a parabola that opens upward in the xy-plane. The x-axis is labeled from -6 to 4 and the y-axis from -10 to 4, with grid lines every 0.5 unit. Three points on the parabola are marked: the vertex (-1, -9), and the points (-2, -3) and (0, -3), which are symmetric about the vertex. The parabola crosses the x-axis once between x = -3 and x = -2 and once between x = 0 and x = 1.](tests/images/advanced-math-a/q19.svg)

The graph of $y = 6x^2 + bx + c$ is shown, where $b$ and $c$ are constants. What is the value of $bc$?
Answer: -36
Domain: Advanced Math
Explanation: The graph passes through $(0, -3)$, so $c = -3$. The vertex is $(-1, -9)$, so $-\frac{b}{2(6)} = -1$, which gives $b = 12$. Check: $6(-1)^2 + 12(-1) - 3 = -9$ and $6(-2)^2 + 12(-2) - 3 = -3$. Therefore $bc = 12(-3) = -36$.

20.

$$N(t) = 1{,}000\left(\dfrac{3}{2}\right)^{\frac{6t}{5}}$$

The function $N$ gives the estimated number of bacteria in a growth medium $t$ hours after the study began. According to the function, the number of bacteria is estimated to increase by $50\%$ every $k$ minutes. What is the value of $k$?
A. $40$
B. $50$
C. $72$
D. $90$
Answer: B
Domain: Advanced Math
Explanation: An increase of $50\%$ means the number is multiplied by $\frac{3}{2}$, which happens each time the exponent $\frac{6t}{5}$ increases by $1$, that is, each time $t$ increases by $\frac{5}{6}$ hour. Since $\frac{5}{6}$ hour is $\frac{5}{6} \times 60 = 50$ minutes, $k = 50$.

21.

$$\dfrac{1}{4xy} + xyz = \dfrac{1}{3yz}$$

In the given equation, $x$, $y$, and $z$ are positive numbers. Which expression is equivalent to $y$?
A. $\dfrac{4x - 3z}{12x^2z^2}$
B. $\sqrt{\dfrac{4x - 3z}{12x^2z^2}}$
C. $\dfrac{1}{3xz^2 - 4x^2z}$
D. $\sqrt{\dfrac{1}{3xz^2 - 4x^2z}}$
Answer: B
Domain: Advanced Math
Explanation: Multiplying both sides by $y$ gives $\frac{1}{4x} + xy^2z = \frac{1}{3z}$, so $xy^2z = \frac{1}{3z} - \frac{1}{4x} = \frac{4x - 3z}{12xz}$. Dividing by $xz$ gives $y^2 = \frac{4x - 3z}{12x^2z^2}$. Since $y$ is positive, $y = \sqrt{\frac{4x - 3z}{12x^2z^2}}$. Choice A is $y^2$, not $y$.

22.

| $x$ | $-3$ | $0$ | $8$ |
| $f(x)$ | $-\dfrac{1}{5}$ | $-\dfrac{1}{2}$ | $\dfrac{1}{6}$ |

For a rational function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. Which of the following could be the graph of $y = f(x)$?
A. ![Graph of a rational function in the xy-plane, both axes from -8 to 8 with grid lines every 1 unit. It has a vertical asymptote at x = 2 and the x-axis (y = 0) as its horizontal asymptote. The left branch stays just below the x-axis for negative x, passes through about (0, -0.5), and drops toward negative infinity as x approaches 2 from the left. The right branch comes down from positive infinity just right of x = 2, passes through about (3, 1), and approaches the x-axis from above as x increases.](tests/images/advanced-math-a/q22a.svg)
B. ![Graph of a rational function in the xy-plane, both axes from -8 to 8 with grid lines every 1 unit. It has a vertical asymptote at the y-axis (x = 0) and a horizontal asymptote at y = -2. The right branch comes down from positive infinity near the y-axis, crosses the x-axis at about x = 0.5, and levels off just above y = -2 as x increases. The left branch stays just below y = -2 for negative x and drops toward negative infinity as x approaches 0 from the left.](tests/images/advanced-math-a/q22b.svg)
C. ![Graph of a rational function in the xy-plane, both axes from -8 to 8 with grid lines every 1 unit. It has a vertical asymptote at the y-axis (x = 0) and a horizontal asymptote at y = 2. The left branch stays just below y = 2 for negative x, crosses the x-axis at about x = -0.5, and drops toward negative infinity as x approaches 0 from the left. The right branch comes down from positive infinity near the y-axis and levels off just above y = 2 as x increases.](tests/images/advanced-math-a/q22c.svg)
D. ![Graph of a rational function in the xy-plane, both axes from -8 to 8 with grid lines every 1 unit. It has a vertical asymptote at x = -2 and the x-axis (y = 0) as its horizontal asymptote. The left branch stays just below the x-axis for x less than -2 and drops toward negative infinity as x approaches -2 from the left. The right branch comes down from positive infinity just right of x = -2, crosses the y-axis at about (0, 0.5), and approaches the x-axis from above as x increases.](tests/images/advanced-math-a/q22d.svg)
Answer: A
Domain: Advanced Math
Explanation: The values in the table fit $f(x) = \frac{1}{x - 2}$: $f(-3) = -\frac{1}{5}$, $f(0) = -\frac{1}{2}$, and $f(8) = \frac{1}{6}$. Graph A has a vertical asymptote at $x = 2$ and horizontal asymptote $y = 0$, with negative values to the left of $x = 2$ (including about $-\frac{1}{2}$ at $x = 0$) and small positive values to the right, so it matches all three points. In graph B the value at $x = 8$ is close to $-2$, not $\frac{1}{6}$; in graph C the value at $x = -3$ is positive, not $-\frac{1}{5}$; and in graph D the $y$-intercept is positive, not $-\frac{1}{2}$.

23.

$$57x^{18} + bx^9 + 34$$

The given expression, where $b$ is a constant, is equivalent to $(3x^9 + q)(rx^9 + 2)$, where $q$ and $r$ are constants. What is the value of $b$?
Answer: 329
Domain: Advanced Math
Explanation: Expanding gives $(3x^9 + q)(rx^9 + 2) = 3rx^{18} + (6 + qr)x^9 + 2q$. Matching coefficients, $3r = 57$, so $r = 19$, and $2q = 34$, so $q = 17$. Then $b = 6 + qr = 6 + 17(19) = 6 + 323 = 329$.

24.

$$g(x) = x^3 + ax^2 + bx + c$$

The function $g$ is defined by the given equation, where $a$, $b$, and $c$ are integer constants. The zeros of the function are $-2$, $-7$, and $3$. What is the value of $a$?
A. $-42$
B. $-6$
C. $6$
D. $42$
Answer: C
Domain: Advanced Math
Explanation: Since the leading coefficient is $1$, $g(x) = (x + 2)(x + 7)(x - 3)$. First, $(x + 2)(x + 7) = x^2 + 9x + 14$, and multiplying by $x - 3$ gives $x^3 + 6x^2 - 13x - 42$. So $a = 6$. (Choice A is the value of $c$, and choice B has the wrong sign: $a$ is the opposite of the sum of the zeros, $-(-2 - 7 + 3) = 6$.)

25.

| $x$ | $y$ |
|:---:|:---:|
| $-\dfrac{5}{9}$ | $0$ |
| $0$ | $-120$ |
| $6$ | $0$ |

The table shows three values of $x$ and their corresponding values of $y$. There is a quadratic relationship between $x$ and $y$. An equation that represents this relationship can be written as $y = 36x^2 - bx - 120$, where $b$ is a constant. What is the value of $b$?
Answer: 196
Domain: Advanced Math
Explanation: The point $(6, 0)$ satisfies the equation, so $0 = 36(6)^2 - 6b - 120 = 1{,}296 - 6b - 120$. Then $6b = 1{,}176$ and $b = 196$. Check with the other zero: the sum of the zeros of $36x^2 - 196x - 120$ is $\frac{196}{36} = \frac{49}{9}$, and $-\frac{5}{9} + 6 = \frac{49}{9}$.

26.

![Graph of an increasing exponential curve in the xy-plane. The x-axis is labeled from -8 to 8 and the y-axis from 0 to 14, with grid lines every 1 unit. On the left the curve is nearly flat just above the horizontal line y = 3. It crosses the y-axis at (0, 4), passes through (1, 5) and (2, 7), and rises steeply to about (3.6, 15).](tests/images/advanced-math-a/q26.svg)

What is an equation of the graph shown?
A. $y = 2^{-x} + 4$
B. $y = 2^x + 4$
C. $y = 2^{-x} + 3$
D. $y = 2^x + 3$
Answer: D
Domain: Advanced Math
Explanation: The graph is increasing, so the exponent is $x$ rather than $-x$ (choices A and C are decreasing). As $x$ decreases, the graph approaches the horizontal asymptote $y = 3$, and the $y$-intercept is $(0, 4)$. For $y = 2^x + 3$, the asymptote is $y = 3$, $y(0) = 1 + 3 = 4$, and $y(2) = 4 + 3 = 7$, which match the graph. Choice B would have asymptote $y = 4$ and $y$-intercept $5$.

27.

$$\dfrac{1}{24}x^2 + \left(s - \dfrac{1}{24}t\right)x - st = 0$$

In the given equation, $s$ and $t$ are positive constants. The product of the solutions to the given equation is $-2kst$, where $k$ is a constant. What is the value of $k$?
Answer: 12
Domain: Advanced Math
Explanation: For a quadratic equation $Ax^2 + Bx + C = 0$, the product of the solutions is $\frac{C}{A}$. Here the product is $\frac{-st}{\frac{1}{24}} = -24st$. Setting $-24st = -2kst$ gives $k = 12$.

28. A savings account is opened with an initial deposit of \$9,000. The amount of money in the account $t$ years after the initial deposit is given by the function $f(t) = 9{,}000(1.02)^{2t}$. Which of the following is the best interpretation of the statement "$f(9)$ is approximately equal to $12{,}854.22$" in this context?
A. Every $9$ years, the amount of money, in dollars, in the account increases by $12{,}854.22$.
B. $9$ years after the initial deposit, the amount of money, in dollars, in the account is $12{,}854.22$.
C. $9$ years after the initial deposit, the amount of money, in dollars, in the account has increased by $12{,}854.22$.
D. Every $9$ years, the amount of money, in dollars, in the account decreases by $12{,}854.22$.
Answer: B
Domain: Advanced Math
Explanation: The input $t = 9$ is the number of years after the initial deposit, and the output $f(9) = 9{,}000(1.02)^{18} \approx 12{,}854.22$ is the amount of money in the account at that time. So $9$ years after the initial deposit, the account holds about $12{,}854.22$ dollars. The increase over those $9$ years is only about $12{,}854.22 - 9{,}000 = 3{,}854.22$ dollars, so choice C is wrong, and the growth is not a fixed amount every $9$ years (choices A and D).

29.

![Graph of a parabola that opens downward in the xy-plane, in the first quadrant. The x-axis is labeled from 0 to 16 with grid lines every 1 unit, and the y-axis from 0 to 10 with grid lines every 0.5 unit. The parabola crosses the x-axis at (4, 0) and (12, 0), has its vertex at (8, 4), and passes through (6, 3) and (10, 3).](tests/images/advanced-math-a/q29.svg)

An equation of the graph shown is $y = -\dfrac{1}{4}(x - p)^2 + 4$, where $p$ is an integer constant. What is the value of $p$?
Answer: 8
Domain: Advanced Math
Explanation: The graph of $y = -\frac{1}{4}(x - p)^2 + 4$ has its vertex at $(p, 4)$. The vertex of the graph shown is $(8, 4)$, so $p = 8$. Check: at $x = 4$, $y = -\frac{1}{4}(4 - 8)^2 + 4 = -4 + 4 = 0$, which matches the $x$-intercept $(4, 0)$.

30.

$$y = 4x^2 - bx - 5$$

Which of the following equations is equivalent to the given equation, where $b$ is a positive constant?
A. $y = 4\left(x - \dfrac{b}{8}\right)^2 - 5 - \dfrac{b^2}{16}$
B. $y = 4\left(x + \dfrac{b}{8}\right)^2 - 5$
C. $y = 4\left(x - \dfrac{b}{8}\right)^2 - 5$
D. $y = 4\left(x + \dfrac{b}{8}\right)^2 - 5 - \dfrac{b^2}{16}$
Answer: A
Domain: Advanced Math
Explanation: Completing the square: $4x^2 - bx - 5 = 4\left(x^2 - \frac{b}{4}x\right) - 5 = 4\left[\left(x - \frac{b}{8}\right)^2 - \frac{b^2}{64}\right] - 5 = 4\left(x - \frac{b}{8}\right)^2 - \frac{b^2}{16} - 5$. This is choice A. Choices B and D have the wrong sign inside the parentheses, and choice C leaves out the $-\frac{b^2}{16}$ term.

31. A quadratic function models the height, in feet, of an object above the ground in terms of the time, in seconds, after the object was launched. According to the model, the object was launched from a height of $0$ feet and reached its maximum height of $1{,}600$ feet $10$ seconds after it was launched. Based on the model, what was the height, in feet, of the object $13$ seconds after it was launched?
Answer: 1456
Domain: Advanced Math
Explanation: The vertex is $(10, 1{,}600)$, so $h(t) = a(t - 10)^2 + 1{,}600$. Since $h(0) = 0$, $100a + 1{,}600 = 0$ and $a = -16$. Then $h(13) = -16(13 - 10)^2 + 1{,}600 = -144 + 1{,}600 = 1{,}456$ feet.

32.

$$-16(5x - 2)^2 + 6(5x - 3)^2$$

The given expression can be rewritten as

$$\dfrac{a}{6}x^2 + \dfrac{b}{6}x + \dfrac{c}{6},$$

where $a$, $b$, and $c$ are constants. What is the value of $a + b + c$?
A. $-720$
B. $-360$
C. $-120$
D. $-20$
Answer: A
Domain: Advanced Math
Explanation: At $x = 1$, the rewritten form equals $\frac{a + b + c}{6}$, and the given expression equals $-16(3)^2 + 6(2)^2 = -144 + 24 = -120$. So $\frac{a + b + c}{6} = -120$ and $a + b + c = -720$. (Expanding confirms this: the expression is $-250x^2 + 140x - 10$, so $a = -1{,}500$, $b = 840$, and $c = -60$.) Choice C is the value of $\frac{a + b + c}{6}$.

33. The functions $f$ and $g$ are defined by the given equations, where $x \ge 0$. Which of the following equations displays, as a constant or coefficient, the maximum value of the function it defines, where $x \ge 0$?

I. $f(x) = 16(1.24)^x + 43$

II. $g(x) = 8(0.72)^x$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: B
Domain: Advanced Math
Explanation: In I, the base $1.24$ is greater than $1$, so $f$ increases without bound for $x \ge 0$ and has no maximum value. In II, the base $0.72$ is between $0$ and $1$, so $g$ is decreasing and its maximum value for $x \ge 0$ is $g(0) = 8$, which is the coefficient in the equation. So only II displays its maximum value.

34.

$$\dfrac{\sqrt[3]{x^{17}y^5}}{5x^2\left(\sqrt[8]{y^8}\right)}$$

For all positive values of $x$ and $y$, the given expression is equivalent to which of the following?

I. $\dfrac{\left(x^{\frac{14}{3}}\right)\left(y^{\frac{5}{3}}\right)}{5xy}$

II. $\dfrac{\sqrt[3]{x^{11}y^2}}{5}$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: C
Domain: Advanced Math
Explanation: For positive $x$ and $y$, $\sqrt[3]{x^{17}y^5} = x^{\frac{17}{3}}y^{\frac{5}{3}}$ and $\sqrt[8]{y^8} = y$, so the expression equals $\frac{x^{\frac{17}{3}}y^{\frac{5}{3}}}{5x^2y} = \frac{x^{\frac{11}{3}}y^{\frac{2}{3}}}{5}$. Expression I equals $\frac{x^{\frac{14}{3} - 1}y^{\frac{5}{3} - 1}}{5} = \frac{x^{\frac{11}{3}}y^{\frac{2}{3}}}{5}$, and expression II equals $\frac{x^{\frac{11}{3}}y^{\frac{2}{3}}}{5}$. Both are equivalent to the given expression.

35.

$$\begin{gathered} \sqrt[7]{a^5} = \sqrt{b^5} \\[4pt] a^{3x - 3} = b^3 \end{gathered}$$

In the given equations, $a$ and $b$ are constants, $a > 1$ and $b > 1$. What is the value of $x$?
Answer: 9/7
Domain: Advanced Math
Explanation: The first equation says $a^{\frac{5}{7}} = b^{\frac{5}{2}}$. Raising both sides to the power $\frac{2}{5}$ gives $b = a^{\frac{2}{7}}$, so $b^3 = a^{\frac{6}{7}}$. Then $a^{3x - 3} = a^{\frac{6}{7}}$, and since $a > 1$, the exponents are equal: $3x - 3 = \frac{6}{7}$. So $3x = \frac{27}{7}$ and $x = \frac{9}{7}$.

36. A model initially estimates that there are $24{,}000$ bacteria on a petri dish. $14$ days later, the model estimates that there are $96{,}000$ bacteria on the petri dish. Assuming exponential growth, the formula $B = a(2)^{xd}$ gives the estimated number of bacteria on a petri dish, where $a$ and $x$ are constants and $B$ is the number of bacteria on the petri dish $d$ days after the initial measurement. What is the value of $x$?
A. $\dfrac{1}{14}$
B. $\dfrac{1}{7}$
C. $7$
D. $14$
Answer: B
Domain: Advanced Math
Explanation: When $d = 0$, $B = a = 24{,}000$. When $d = 14$, $24{,}000(2)^{14x} = 96{,}000$, so $2^{14x} = 4 = 2^2$. Then $14x = 2$ and $x = \frac{1}{7}$. (The population doubles every $7$ days.)

37. The equation below relates distinct positive real numbers $a$, $b$, and $c$. Which equation correctly expresses $c$ in terms of $a$ and $b$?

$$a = 19b \cdot \sqrt[5]{\left(\dfrac{c}{20}\right)^4}$$
A. $c = \dfrac{20}{19b}(a)^{\frac{5}{4}}$
B. $c = \dfrac{20}{19b}(a)^{\frac{4}{5}}$
C. $c = 20\left(\dfrac{a}{19b}\right)^{\frac{5}{4}}$
D. $c = 20\left(\dfrac{a}{19b}\right)^{\frac{4}{5}}$
Answer: C
Domain: Advanced Math
Explanation: Dividing both sides by $19b$ gives $\frac{a}{19b} = \left(\frac{c}{20}\right)^{\frac{4}{5}}$. Raising both sides to the power $\frac{5}{4}$ gives $\frac{c}{20} = \left(\frac{a}{19b}\right)^{\frac{5}{4}}$, so $c = 20\left(\frac{a}{19b}\right)^{\frac{5}{4}}$. Choices A and B raise only $a$ to a power, and choice D uses the wrong exponent.

38. For the function $f$, for every increase of $\dfrac{1}{2}$ in the value of $x$, the value of $f(x)$ increases by a factor of $c$, where $c$ is a constant. Which of the following forms of function $f$ displays the value of $c$ as the base or coefficient?
A. $f(x) = 56(2)^{6x}$
B. $f(x) = 56(8)^{2x}$
C. $f(x) = 56(64)^x$
D. $f(x) = 56(4{,}096)^{\frac{x}{2}}$
Answer: B
Domain: Advanced Math
Explanation: All four forms equal $56(64)^x$. When $x$ increases by $\frac{1}{2}$, $64^x$ is multiplied by $64^{\frac{1}{2}} = 8$, so $c = 8$. Choice B, $56(8)^{2x}$, displays $8$ as the base; there, increasing $x$ by $\frac{1}{2}$ increases the exponent $2x$ by exactly $1$.

39.

| $x$ | $f(x)$ |
|:---:|:---:|
| $-9$ | $155$ |
| $-3$ | $227$ |
| $3$ | $155$ |

Three points on the graph of the quadratic function $f$ are given in the table. If $g(x) = f(x + 4)$, what is the $y$-coordinate of the $y$-intercept of the graph of $y = g(x)$?
Answer: 129
Domain: Advanced Math
Explanation: Since $f(-9) = f(3) = 155$, the axis of symmetry is $x = \frac{-9 + 3}{2} = -3$, so the vertex is $(-3, 227)$ and $f(x) = a(x + 3)^2 + 227$. Using $f(3) = 155$: $36a + 227 = 155$, so $a = -2$. The $y$-intercept of $g$ is at $x = 0$, where $g(0) = f(4) = -2(4 + 3)^2 + 227 = -98 + 227 = 129$.

40.

$$r^2 + qr = 8r - 97$$

In the given equation, $q$ is an integer constant. The given equation has no real solutions. What is the largest possible value of $q$?
Answer: 27
Domain: Advanced Math
Explanation: Rewriting gives $r^2 + (q - 8)r + 97 = 0$. There are no real solutions when the discriminant is negative: $(q - 8)^2 - 4(97) < 0$, or $(q - 8)^2 < 388$. Since $19^2 = 361 < 388 < 400 = 20^2$, the integer $q - 8$ can be at most $19$, so the largest possible value of $q$ is $27$.

41.

$$\dfrac{5}{9}(5x + 9)\big(x + \sqrt{5k + 9}\big)\big(x - \sqrt{5k + 9}\big) = 0$$

In the given equation, $k$ is a positive constant. The product of the solutions to the equation is $72$. What is the value of $k$?
Answer: 31/5 | 6.2
Domain: Advanced Math
Explanation: The solutions are $x = -\frac{9}{5}$, $x = -\sqrt{5k + 9}$, and $x = \sqrt{5k + 9}$ (the factor $\frac{5}{9}$ does not affect them). Their product is $\left(-\frac{9}{5}\right)\left(-\sqrt{5k + 9}\right)\left(\sqrt{5k + 9}\right) = \frac{9}{5}(5k + 9)$. Setting this equal to $72$ gives $5k + 9 = 40$, so $k = \frac{31}{5}$, or $6.2$.

42. A model estimates that at the end of each year from 2015 to 2020, the number of rabbits in a population was $180\%$ more than the number of rabbits in the population at the end of the previous year. The model estimates that at the end of 2016, there were $252$ rabbits in the population. Which of the following equations represents this model, where $n$ is the estimated number of rabbits in the population $t$ years after the end of 2015, and $t \le 5$?
A. $n = 90(1.8)^t$
B. $n = 90(2.8)^t$
C. $n = 252(1.8)^t$
D. $n = 252(2.8)^t$
Answer: B
Domain: Advanced Math
Explanation: A number that is $180\%$ more than another is $1 + 1.80 = 2.8$ times it, so the growth factor is $2.8$ and $n = n_0(2.8)^t$. The end of 2016 is $t = 1$, so $n_0(2.8) = 252$ and $n_0 = 90$. Therefore $n = 90(2.8)^t$. Choices C and D use $252$, which is the value at $t = 1$, not $t = 0$.

43.

$$\begin{gathered} w = 19 \\[4pt] 1 = \dfrac{(w - 19)^3}{81} + \dfrac{(p - 4)^2}{49} \end{gathered}$$

A solution to the given system of equations is $(p, w)$. What is one possible value of $p$?
A. $9$
B. $7$
C. $4$
D. $-3$
Answer: D
Domain: Advanced Math
Explanation: Substituting $w = 19$ into the second equation gives $1 = 0 + \frac{(p - 4)^2}{49}$, so $(p - 4)^2 = 49$. Then $p - 4 = 7$ or $p - 4 = -7$, so $p = 11$ or $p = -3$. Only $-3$ is a choice.

44.

$$\begin{gathered} y = -1.5 \\[4pt] y = x^2 + 4x + a \end{gathered}$$

In the given system of equations, $a$ is a positive integer constant. The system has no real solutions. What is the least possible value of $a$?
Answer: 3
Domain: Advanced Math
Explanation: Substituting gives $-1.5 = x^2 + 4x + a$, or $x^2 + 4x + (a + 1.5) = 0$. The system has no real solutions when the discriminant is negative: $16 - 4(a + 1.5) < 0$, so $a + 1.5 > 4$ and $a > 2.5$. The least positive integer greater than $2.5$ is $3$. (Equivalently, the vertex of the parabola, $(-2, a - 4)$, must be above the line $y = -1.5$.)

45. A researcher observes a sample of a nuclide. An exponential model estimates that the mass, in grams, of the sample decreases by $22\%$ every $11.11$ minutes. Which of the following equations could represent this model, where $M$ is the estimated mass, in grams, of the sample $t$ minutes after the researcher began observing the sample?
A. $M = 100(0.22)^{t + 11.11}$
B. $M = 100(0.22)^{\frac{t}{11.11}}$
C. $M = 100(0.78)^{t + 11.11}$
D. $M = 100(0.78)^{\frac{t}{11.11}}$
Answer: D
Domain: Advanced Math
Explanation: A decrease of $22\%$ leaves $100\% - 22\% = 78\%$ of the mass, so the mass is multiplied by $0.78$ once every $11.11$ minutes. After $t$ minutes, $\frac{t}{11.11}$ such periods have passed, so $M = 100(0.78)^{\frac{t}{11.11}}$, where $100$ grams is the initial mass. Choices A and B use $0.22$, the fraction lost, and choices A and C have the wrong exponent.

46. The function $f$ is defined by $f(x) = -10(3)^x + \dfrac{1}{k}$, where $k$ is a constant. If $y = f(x)$ is graphed in the $xy$-plane, what is the $y$-coordinate of the $y$-intercept of the graph?
A. $-10$
B. $\dfrac{1 - 10k}{k}$
C. $\dfrac{1}{k}$
D. $\dfrac{1 - k}{k}$
Answer: B
Domain: Advanced Math
Explanation: The $y$-intercept occurs at $x = 0$: $f(0) = -10(3)^0 + \frac{1}{k} = -10 + \frac{1}{k} = \frac{-10k + 1}{k} = \frac{1 - 10k}{k}$.

47.

$$\sqrt{k - x} = 57 - x$$

In the given equation, $k$ is a constant. The equation has exactly one real solution. What is the minimum possible value of $4k$?
Answer: 227
Domain: Advanced Math
Explanation: Let $u = 57 - x$. A square root is never negative, so $u \ge 0$, and $k - x = k - 57 + u$. Squaring gives $k - 57 + u = u^2$, or $u^2 - u + (57 - k) = 0$, so $u = \frac{1 \pm \sqrt{4k - 227}}{2}$. Each root $u \ge 0$ gives exactly one solution $x = 57 - u$. If $4k < 227$, there are no solutions; if $4k = 227$, there is exactly one ($u = \frac{1}{2}$, so $x = 56.5$); if $227 < 4k \le 228$, both roots are nonnegative and there are two solutions; and if $4k > 228$, there is exactly one. So the minimum possible value of $4k$ is $227$. Check: with $k = 56.75$ and $x = 56.5$, $\sqrt{0.25} = 0.5 = 57 - 56.5$.

48. The equation $y = -4.9(x - 9.1)^2 + 10{,}700$ gives the estimated height above ground, $y$, in meters, of a plane, where $x$ is the number of seconds since it started a parabolic maneuver. If this equation is graphed in the $xy$-plane, which of the following is the best interpretation of the vertex of the graph?
A. The plane reached an estimated maximum height of $10{,}700$ meters $4.9$ seconds after it started the parabolic maneuver.
B. The plane reached an estimated maximum height of $10{,}700$ meters $9.1$ seconds after it started the parabolic maneuver.
C. The plane reached an estimated maximum height of $4.9$ meters $10{,}700$ seconds after it started the parabolic maneuver.
D. The plane reached an estimated maximum height of $9.1$ meters $10{,}700$ seconds after it started the parabolic maneuver.
Answer: B
Domain: Advanced Math
Explanation: The equation is in vertex form, so the vertex is $(9.1, 10{,}700)$, and it is a maximum because the leading coefficient $-4.9$ is negative. Since $x$ is the time in seconds and $y$ is the height in meters, the plane reached an estimated maximum height of $10{,}700$ meters $9.1$ seconds after it started the maneuver.

49.

$$-8x(x + 9) = 40$$

One solution to the given equation can be written as $x = -\dfrac{s + \sqrt{t}}{2}$, where $s$ and $t$ are positive integers. What is the value of $\dfrac{s}{t}$?
A. $\dfrac{9}{101}$
B. $\dfrac{9}{76}$
C. $\dfrac{9}{61}$
D. $\dfrac{18}{61}$
Answer: C
Domain: Advanced Math
Explanation: Dividing both sides by $-8$ gives $x^2 + 9x = -5$, or $x^2 + 9x + 5 = 0$. By the quadratic formula, $x = \frac{-9 \pm \sqrt{81 - 20}}{2} = \frac{-9 \pm \sqrt{61}}{2}$. The solution $\frac{-9 - \sqrt{61}}{2} = -\frac{9 + \sqrt{61}}{2}$ has the given form with $s = 9$ and $t = 61$, so $\frac{s}{t} = \frac{9}{61}$.

50. A computer program models the population of a certain insect in an environment where the insect has no natural predators. According to the model, the estimated total mass of the population of insects at the end of every $5$-week period is $158\%$ greater than the estimated total mass of the population of insects at the end of the previous $5$-week period. The estimated total mass of the population of insects at the end of $15$ weeks is $627.7$ grams. Which equation best represents this model, where $M$ is the estimated total mass, in grams, of the population of insects at the end of $t$ weeks?
A. $M = 538.92(1.58)^{\frac{5}{t}}$
B. $M = 457.66(2.58)^{\frac{5}{t}}$
C. $M = 159.14(1.58)^{\frac{t}{5}}$
D. $M = 36.55(2.58)^{\frac{t}{5}}$
Answer: D
Domain: Advanced Math
Explanation: A mass that is $158\%$ greater is $1 + 1.58 = 2.58$ times as large, and this happens once every $5$ weeks, so $M = M_0(2.58)^{\frac{t}{5}}$. At $t = 15$, $M_0(2.58)^3 = 627.7$. Since $2.58^3 \approx 17.1735$, $M_0 \approx \frac{627.7}{17.1735} \approx 36.55$. So $M = 36.55(2.58)^{\frac{t}{5}}$. Choices A and C use the wrong growth factor $1.58$, and choices A and B have the exponent upside down.

51.

$$x(kx - 40) = -8$$

In the given equation, $k$ is an integer constant. If the equation has two distinct real solutions, what is the greatest possible value of $k$?
Answer: 49
Domain: Advanced Math
Explanation: Rewriting gives $kx^2 - 40x + 8 = 0$. If $k = 0$, there is only one solution, so $k \ne 0$, and two distinct real solutions require a positive discriminant: $(-40)^2 - 4(k)(8) > 0$, or $1{,}600 - 32k > 0$. So $k < 50$, and the greatest possible integer value of $k$ is $49$.

52.

![Graph of a decreasing exponential curve in the xy-plane. The x-axis is labeled from -10 to 10 and runs along the top of the grid; the y-axis is labeled from 0 down to -10, with grid lines every 1 unit. On the left the curve is nearly flat just below the horizontal line y = -7. It bends downward, crosses the y-axis at (0, -8), passes through about (1, -9), and ends near (1.6, -10). The whole curve lies below the x-axis.](tests/images/advanced-math-a/q52.svg)

The graph of $y = f(x)$ is shown, where $f(x) = ab^x + c$, and $a$, $b$, and $c$ are constants. For how many values of $x$ does $f(x) = 0$?
A. Three
B. Two
C. One
D. Zero
Answer: D
Domain: Advanced Math
Explanation: The graph approaches the horizontal asymptote $y = -7$, so $c = -7$, and it crosses the $y$-axis at $(0, -8)$, so $a + c = -8$ and $a = -1$. Since $b^x > 0$, $ab^x = -b^x$ is always negative, and $f(x) = -b^x - 7 < -7$ for every $x$. So the graph never reaches the $x$-axis, and $f(x) = 0$ for zero values of $x$.

53.

$$r(t) = 53t - 2t^2$$

The function $r$ is defined by the given equation. The function $s$ is defined by $s(t) = r(t) + 1$. Which expression represents the maximum value of $s(t)$?
A. $1 - \left(\dfrac{53}{2}\right)^2$
B. $1 - 2\left(\dfrac{53}{4}\right)^2$
C. $1 + 2\left(\dfrac{53}{4}\right)^2$
D. $1 + \left(\dfrac{53}{2}\right)^2$
Answer: C
Domain: Advanced Math
Explanation: Completing the square: $r(t) = -2\left(t^2 - \frac{53}{2}t\right) = -2\left(t - \frac{53}{4}\right)^2 + 2\left(\frac{53}{4}\right)^2$. So the maximum value of $r(t)$ is $2\left(\frac{53}{4}\right)^2$, at $t = \frac{53}{4}$, and the maximum value of $s(t) = r(t) + 1$ is $1 + 2\left(\frac{53}{4}\right)^2$. The maximum is positive, so choices A and B, which are negative, cannot be correct.

54. A beaker containing a liquid is placed on a table. The function $g(t) = 294 + (363 - 294)(2.72)^{-0.103t}$ gives the approximate temperature, in kelvins, of the liquid $t$ minutes after the beaker was placed on the table. According to this function, what was the approximate temperature, in kelvins, of the liquid when the beaker was placed on the table?
Answer: 363
Domain: Advanced Math
Explanation: The beaker was placed on the table at $t = 0$. Since $(2.72)^0 = 1$, $g(0) = 294 + (363 - 294)(1) = 294 + 69 = 363$ kelvins.

55. The functions $f$ and $g$ are defined by the equations shown, where $a$ and $b$ are integer constants, $a < b$, and $b < 0$. If $y = f(x)$ and $y = g(x)$ are graphed in the $xy$-plane, which of the following equations displays, as a constant or coefficient, the $y$-coordinate of the $y$-intercept of the graph of the corresponding function?

I. $f(x) = a(3.3)^{x + b}$

II. $g(x) = a(3.3)^x + b$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: D
Domain: Advanced Math
Explanation: For I, $f(0) = a(3.3)^b$. Since $b < 0$, $(3.3)^b$ is between $0$ and $1$, so $f(0)$ is not $a$, and it is not displayed in the equation. For II, $g(0) = a(3.3)^0 + b = a + b$. Since $a$ and $b$ are both negative, $a + b$ is less than both $a$ and $b$, so it is not displayed either. Neither equation displays the $y$-coordinate of its $y$-intercept.

56.

$$(x - k)(7x + t) - (x - k) = 0$$

In the given equation, $k$ and $t$ are positive constants. A solution to the equation is $-\dfrac{22}{7}$. What is the value of $t$?
Answer: 23
Domain: Advanced Math
Explanation: Factoring out $x - k$ gives $(x - k)(7x + t - 1) = 0$, so the solutions are $x = k$ and $x = \frac{1 - t}{7}$. Since $k$ is positive, the negative solution $-\frac{22}{7}$ must be $\frac{1 - t}{7}$. Then $1 - t = -22$, so $t = 23$.

57. An exponential function $f$ is defined by $f(x) = c^x$, where $c$ is a constant greater than $1$. If $f(7) = 9 \cdot f(5)$, what is the value of $c$?
Answer: 3
Domain: Advanced Math
Explanation: The condition says $c^7 = 9c^5$. Dividing both sides by $c^5$ (which is not $0$) gives $c^2 = 9$, and since $c > 1$, $c = 3$.
`
});
