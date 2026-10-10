/*
 * Advanced test: Advanced Math D (56 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'advanced-math-d',
  source: String.raw`
---
title: Advanced Math D
author: tungtks18022
description: 56 harder Advanced Math questions on exponential functions and models, equivalent forms, quadratics, polynomials and factoring, and nonlinear equations, with an explanation for every question.
category: Advanced Math
section: advanced
time: 90
---

1. The expression $6x^4 + 23x^2 + 7$ can be rewritten as $(3x^2 + a)(2x^2 + b)$, where $a$ and $b$ are positive integers, or as $(3x^2 + c)(2x^2 + d)$, where $c$ and $d$ are positive nonintegers. What is the value of $a + c$?
Answer: 23/2 | 11.5
Domain: Advanced Math
Explanation: Expanding $(3x^2 + a)(2x^2 + b)$ gives $6x^4 + (2a + 3b)x^2 + ab$, so $ab = 7$ and $2a + 3b = 23$. For positive integers, $a = 1$ and $b = 7$ works ($2 + 21 = 23$), while $a = 7$ and $b = 1$ gives $14 + 3 = 17$. For the second form, $d = \frac{7}{c}$, so $2c + \frac{21}{c} = 23$, or $2c^2 - 23c + 21 = 0$, which factors as $(2c - 21)(c - 1) = 0$. Since $c$ is not an integer, $c = \frac{21}{2}$ (and $d = \frac{2}{3}$). Therefore $a + c = 1 + \frac{21}{2} = \frac{23}{2}$, or $11.5$.

2.

![Graph of a cubic curve in the xy-plane. The x-axis is labeled from -8 to 8 with vertical grid lines every 1 unit, and the y-axis is labeled from -16 to 16 with horizontal grid lines every 2 units. The curve enters at the bottom of the grid near (-1.4, -16) and rises steeply, crossing the x-axis at about (-0.5, 0) and the y-axis at (0, 4). It reaches a relative maximum of about 5.2 near x = 0.5, falls to cross the x-axis at (2, 0), reaches a relative minimum of about -3.6 near x = 3.1, then rises to cross the x-axis at (4, 0) and leaves the top of the grid near (5, 16).](tests/images/advanced-math-d/q2.svg)

The graph of $y = f(x) - k$ is shown in the $xy$-plane. If $k$, $a$, and $b$ are positive constants, which equation could define $f$?
A. $f(x) = (x - a)^2(x + b)$
B. $f(x) = (x + a)^2(x - b)$
C. $f(x) = (x - a)^2(x + b)^2$
D. $f(x) = (x + a)^2(x - b)^2$
Answer: A
Domain: Advanced Math
Explanation: The graph of $y = f(x)$ is the shown graph shifted up $k$ units. The shown graph falls to the left and rises to the right like a cubic with a positive leading coefficient, so $f$ cannot be one of the quartics in choices C and D. In choices A and B, the squared factor gives a double zero of $f$, where the graph of $f$ touches the $x$-axis at a relative extremum with value $0$; after the shift down of $k$ units, that extremum has the negative value $-k$. In choice A, the double zero $x = a$ is to the right of the other zero $x = -b$, so it is a relative minimum at a positive $x$-value. That matches the graph's relative minimum of about $-3.6$ near $x = 3.1$ (for example, $a \approx 3.1$, $b \approx 0.8$, and $k \approx 3.6$ fit the graph). In choice B, the double zero $x = -a$ would be a relative maximum with a negative value, but the graph's relative maximum, about $5.2$, is positive.

3.

$$f(x) = 66(b)^x$$

In the given function, $b$ is a positive constant. For every increase in the value of $x$ by $1$, the value of $f(x)$ increases by $c\%$, where $0 < c < 100$. Which expression gives the value of $c$ in terms of $b$?
A. $1 + \dfrac{b}{100}$
B. $b + 100$
C. $100(b + 1)$
D. $100(b - 1)$
Answer: D
Domain: Advanced Math
Explanation: Increasing $x$ by $1$ multiplies $f(x)$ by $b$. An increase of $c\%$ means multiplying by $1 + \frac{c}{100}$, so $b = 1 + \frac{c}{100}$. Then $\frac{c}{100} = b - 1$, so $c = 100(b - 1)$.

4. The exponential function $f$ is defined by $f(x) = ab^x$, where $a$ and $b$ are positive constants. If $f(s) = t$ and $f(s + 1) = t - 0.87t$, where $s$ and $t$ are constants, what is the value of $b$?
A. $0.13$
B. $0.87$
C. $1.13$
D. $1.87$
Answer: A
Domain: Advanced Math
Explanation: The ratio $\frac{f(s + 1)}{f(s)} = \frac{ab^{s + 1}}{ab^s} = b$. Also, $\frac{f(s + 1)}{f(s)} = \frac{t - 0.87t}{t} = \frac{0.13t}{t} = 0.13$. So $b = 0.13$. (The value $0.87$ in choice B is the decrease, $87\%$, not the factor.)

5. The function $p$ is defined by $p(x) = a\big((x + 5)^2 - b\big)\big((x + 5)^2 - c\big)$, where $a$, $b$, and $c$ are constants. In the $xy$-plane, the graph of $y = p(x)$ passes through the points $(-6, 30)$ and $(0, 342)$. What is the value of $p(-10) + p(-4)$?
Answer: 372
Domain: Advanced Math
Explanation: The value of $p(x)$ depends only on $(x + 5)^2$. For $x = -4$ and $x = -6$, $(x + 5)^2 = 1$, so $p(-4) = p(-6) = 30$. For $x = -10$ and $x = 0$, $(x + 5)^2 = 25$, so $p(-10) = p(0) = 342$. Therefore $p(-10) + p(-4) = 342 + 30 = 372$.

6. The function $f$ is defined by $f(x) = ab^{\frac{x}{n}}$, where $a$, $b$, and $n$ are constants, and $b$ and $n$ are integers. If $f(4) = 5$ and $f(7) = 135$, what is the value of $f(9)$?
Answer: 1215
Domain: Advanced Math
Explanation: Let $m = b^{\frac{1}{n}}$, so $f(x) = am^x$. Then $\frac{f(7)}{f(4)} = m^3 = \frac{135}{5} = 27$, so $m = 3$. Therefore $f(9) = f(7) \cdot m^2 = 135 \cdot 9 = 1{,}215$. (For example, $b = 3$, $n = 1$, and $a = \frac{5}{81}$ satisfy all the conditions.)

7.

$$f(x) = 12^{-4(x + 1)}$$

Which of the following equivalent forms of the given function $f$ displays, as the base or the coefficient, the $y$-coordinate of the $y$-intercept of the graph of $y = f(x)$ in the $xy$-plane?
A. $f(x) = \dfrac{1}{20{,}736}\left(\dfrac{1}{12}\right)^{4x}$
B. $f(x) = \left(\dfrac{1}{12}\right)^{4x + 4}$
C. $f(x) = 12^{-4x - 4}$
D. $f(x) = 20{,}736^{-x + 1}$
Answer: A
Domain: Advanced Math
Explanation: The $y$-coordinate of the $y$-intercept is $f(0) = 12^{-4} = \frac{1}{20{,}736}$. Since $12^{-4(x + 1)} = 12^{-4} \cdot 12^{-4x} = \frac{1}{20{,}736}\left(\frac{1}{12}\right)^{4x}$, choice A is equivalent to $f$ and shows $\frac{1}{20{,}736}$ as its coefficient. Choices B and C are also equivalent, but their only base is $\frac{1}{12}$ or $12$. Choice D equals $12^{4(-x + 1)} = 12^{-4x + 4}$, which is not equivalent to $f$.

8.

$$g(x) = x^3 + ax^2 + bx + c$$

The function $g$ is defined by the given equation, where $a$, $b$, and $c$ are integer constants. The zeros of the function are $-2$, $-7$, and $6$. What is the value of $a$?
A. $-84$
B. $-3$
C. $3$
D. $84$
Answer: C
Domain: Advanced Math
Explanation: Since $g$ has leading coefficient $1$ and zeros $-2$, $-7$, and $6$, $g(x) = (x + 2)(x + 7)(x - 6) = (x^2 + 9x + 14)(x - 6) = x^3 + 3x^2 - 40x - 84$. So $a = 3$, which is the opposite of the sum of the zeros, $-2 - 7 + 6 = -3$. (Choice A is the constant term $c = -84$, and choice B is the sum of the zeros.)

9. The functions $f$ and $g$ are defined by the given equations, where $x \ge 0$. Which of the following equations displays, as a constant or coefficient, the maximum value of the function it defines, where $x \ge 0$?

I. $f(x) = 232(0.4)^{x + 2}$

II. $g(x) = 232(0.4)(0.4)(0.4)^{x - 2}$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: B
Domain: Advanced Math
Explanation: Both functions are decreasing because the base $0.4$ is less than $1$, so for $x \ge 0$ each maximum occurs at $x = 0$. For I, the maximum is $f(0) = 232(0.4)^2 = 37.12$, which does not appear in the equation. For II, $g(x) = 232(0.4)^2(0.4)^{x - 2} = 232(0.4)^x$, so the maximum is $g(0) = 232$, which appears as the coefficient. So only II displays its maximum value.

10. The solutions to $x^2 + 6x + 7 = 0$ are $r$ and $s$, where $r < s$. The solutions to $x^2 + 8x + 8 = 0$ are $t$ and $u$, where $t < u$. The solutions to $x^2 + 14x + c = 0$, where $c$ is a constant, are $r + t$ and $s + u$. What is the value of $c$?
Answer: 31
Domain: Advanced Math
Explanation: By the quadratic formula, $r = -3 - \sqrt{2}$, $s = -3 + \sqrt{2}$, $t = -4 - 2\sqrt{2}$, and $u = -4 + 2\sqrt{2}$. So $r + t = -7 - 3\sqrt{2}$ and $s + u = -7 + 3\sqrt{2}$. Their sum is $-14$, which matches the coefficient $14$, and $c$ is their product: $c = (-7)^2 - \left(3\sqrt{2}\right)^2 = 49 - 18 = 31$.

11. For the exponential function $f$, the value of $f(3)$ is $k$, where $k$ is a constant. Which of the following equivalent forms of the function $f$ shows the value of $k$ as the coefficient or the base?
A. $f(x) = 3(4)(4)^{x + 1}$
B. $f(x) = 3{,}072(4)(4)^{x - 4}$
C. $f(x) = 12(4)(4)^x$
D. $f(x) = 768(4)(4)^{x - 3}$
Answer: B
Domain: Advanced Math
Explanation: Each choice simplifies to $f(x) = 48(4)^x$, so $k = f(3) = 48 \cdot 64 = 3{,}072$. Choice B can be written as $3{,}072(4)^{x - 3}$, so $f(3) = 3{,}072(4)^0 = 3{,}072$, and it shows $3{,}072$ as the coefficient. Choices A, C, and D show $3$, $12$, and $768$ instead.

12. Which of the following inequalities gives all possible values of $k$ where the equation below has no solution?

$$4 - 4\left|\dfrac{7}{8} + \dfrac{4}{5}x\right| = \dfrac{57}{12} + k$$
A. $k < -\dfrac{3}{4}$
B. $k > -\dfrac{3}{4}$
C. $k \le \dfrac{3}{4}$
D. $k \ge \dfrac{3}{4}$
Answer: B
Domain: Advanced Math
Explanation: The expression $\left|\frac{7}{8} + \frac{4}{5}x\right|$ can equal any nonnegative number, so the left side can equal any number less than or equal to $4$ and nothing greater than $4$. So the equation has no solution exactly when $\frac{57}{12} + k > 4$, that is, $k > 4 - \frac{57}{12} = \frac{48}{12} - \frac{57}{12} = -\frac{9}{12} = -\frac{3}{4}$.

13. During the first $8.00$ seconds after a car started moving, its speed increased to $11.0$ meters per second. From $8.00$ seconds to $14.0$ seconds after the car started moving, its speed increased from $11.0$ meters per second to $23.0$ meters per second. To the nearest hundredth, what is the positive difference between the average rate of change of the speed of the car, in meters per second per second, during the first $8.00$ seconds after the car started moving and the average rate of change of the speed of the car, in meters per second per second, from $8.00$ seconds to $14.0$ seconds after the car started moving?
Answer: 0.63 | 0.625
Domain: Problem-Solving and Data Analysis
Explanation: The car started from rest, so during the first $8.00$ seconds its speed went from $0$ to $11.0$ meters per second, an average rate of change of $\frac{11.0 - 0}{8.00} = 1.375$ meters per second per second. From $8.00$ to $14.0$ seconds, the average rate of change was $\frac{23.0 - 11.0}{14.0 - 8.00} = \frac{12.0}{6.00} = 2.00$ meters per second per second. The positive difference is $2.00 - 1.375 = 0.625$, which is $0.63$ to the nearest hundredth.

14. A certain investment account offers a special interest rate for the first $6$ months the account is open, followed by a lower interest rate for the remainder of the time the account is open. Bennett opened one of these accounts with an original account balance of \$600 and did not make any other deposits or withdrawals. $6$ months after Bennett opened the account, the balance had increased by $0.4\%$ of the original balance. $8$ months after Bennett opened the account, the balance had increased by an additional $0.3\%$ of the balance at the end of the first $6$ months. Every $2$ months after the first $8$ months, the balance had increased by an additional $0.3\%$ of the balance $2$ months before. Which of the following equations could represent the account balance $B(x)$, in dollars, $x$ months after the account was opened, where $x \ge 6$?
A. $B(x) = 602.40(1.003)^{\frac{x}{2} - 6}$
B. $B(x) = 602.40(1.003)^{\frac{x}{2} - \frac{6}{2}}$
C. $B(x) = 602.40(1.003)^{2x - 12}$
D. $B(x) = 602.40(1.003)^{2x - 6}$
Answer: B
Domain: Advanced Math
Explanation: After $6$ months the balance is $600(1.004) = 602.40$ dollars. From then on, the balance is multiplied by $1.003$ every $2$ months, so $x$ months after the account was opened there have been $\frac{x - 6}{2}$ two-month periods since month $6$. So $B(x) = 602.40(1.003)^{\frac{x - 6}{2}} = 602.40(1.003)^{\frac{x}{2} - \frac{6}{2}}$; for example, $B(6) = 602.40$ and $B(8) = 602.40(1.003)$. Choice A gives $B(6) = 602.40(1.003)^{-3}$, and choices C and D multiply the balance by $1.003$ every half month.

15. A model estimates that in a particular forest, the number of trees with any given diameter measured at shoulder height is $21\%$ less for each $1$-inch increase in tree diameter measured at shoulder height. The model can be written in the form $f(x) = ab^x$, where $a$ and $b$ are constants, and $x$ is the tree's diameter, in inches, measured at shoulder height, and $x \ge 5$. The model estimates that $3{,}100$ trees in this forest have a diameter of $13$ inches measured at shoulder height. Which function best represents this model?
A. $f(x) = 3{,}100(0.21)^x$
B. $f(x) = 3{,}100(0.79)^x$
C. $f(x) = 66{,}000(0.21)^x$
D. $f(x) = 66{,}000(0.79)^x$
Answer: D
Domain: Advanced Math
Explanation: A decrease of $21\%$ for each $1$-inch increase means $b = 1 - 0.21 = 0.79$, which eliminates choices A and C. Since $f(13) = 3{,}100$, $a(0.79)^{13} = 3{,}100$, so $a = \frac{3{,}100}{(0.79)^{13}} \approx \frac{3{,}100}{0.0467} \approx 66{,}400$, which is about $66{,}000$. Choice B would give $3{,}100$ trees for a diameter of $0$ inches, not $13$ inches.

16. For $x > 0$, the function $f$ is defined as follows: $f(x)$ equals $111\%$ of $x$. Which of the following could describe this function?
A. Decreasing exponential
B. Decreasing linear
C. Increasing exponential
D. Increasing linear
Answer: D
Domain: Advanced Math
Explanation: Since $111\% = 1.11$, $f(x) = 1.11x$. This is a linear function with a positive slope, $1.11$, so it is increasing linear. It is not exponential, because $x$ is not in an exponent: each increase of $1$ in $x$ adds the same amount, $1.11$, to $f(x)$.

17.

$$C(t) = 240\left(\dfrac{53}{52}\right)^{t - 15} + 7$$

The function $C$ gives the estimated number of cephalopods, a class of marine animals, in a certain area, where $t$ is the number of months since the study began. How many months after the study began was the number of cephalopods in the area estimated to be $247$?
Answer: 15
Domain: Advanced Math
Explanation: Setting $C(t) = 247$ gives $240\left(\frac{53}{52}\right)^{t - 15} = 240$, so $\left(\frac{53}{52}\right)^{t - 15} = 1$. A positive base other than $1$ raised to a power equals $1$ only when the exponent is $0$, so $t - 15 = 0$ and $t = 15$.

18.

$$4x^2 + 21 = 48x + r$$

In the given equation, $r$ is a constant. The equation has exactly one real solution. What is the value of $r$?
Answer: -123
Domain: Advanced Math
Explanation: Rewrite the equation as $4x^2 - 48x + (21 - r) = 0$. It has exactly one real solution when its discriminant is $0$: $(-48)^2 - 4(4)(21 - r) = 0$, so $2{,}304 = 16(21 - r)$. Then $144 = 21 - r$, so $r = -123$.

19. For an online trivia game, $490$ points are awarded for a correct answer if a question is answered in less than $5$ seconds from the time the question is asked. Each $5$ seconds after the question is asked, the number of points awarded for a correct answer decreases by $20\%$ of the number of points awarded for a correct answer in the previous $5$ seconds. Which function gives the number of points awarded for a correct answer $x$ seconds from the time the question is asked, where $x$ is a multiple of $5$?
A. $f(x) = 490(0.80)^{\frac{x}{5}}$
B. $f(x) = 490(0.80)^{5x}$
C. $f(x) = 490(0.20)^{\frac{x}{5}}$
D. $f(x) = 490(0.20)^{5x}$
Answer: A
Domain: Advanced Math
Explanation: Each $5$ seconds, the number of points decreases by $20\%$, so it is multiplied by $1 - 0.20 = 0.80$. After $x$ seconds there have been $\frac{x}{5}$ such decreases, so $f(x) = 490(0.80)^{\frac{x}{5}}$. Choices C and D multiply by $0.20$, which is an $80\%$ decrease, and choices B and D apply the decrease $5x$ times instead of $\frac{x}{5}$ times.

20. The population of a certain city doubled every $25$ years from 1660 to 1760. The population of this city was $208{,}000$ in 1760. What was the population of this city in 1660?
A. $13{,}000$
B. $26{,}000$
C. $104{,}000$
D. $416{,}000$
Answer: A
Domain: Advanced Math
Explanation: From 1660 to 1760 is $100$ years, which is $\frac{100}{25} = 4$ doubling periods, so the population was multiplied by $2^4 = 16$. The population in 1660 was $\frac{208{,}000}{16} = 13{,}000$.

21.

$$p = \sqrt{12c} - 25$$

The given equation relates the variables $p$ and $c$, where $c$ is positive. Which equation correctly expresses $c$ in terms of $p$?
A. $c = \dfrac{(p + 25)^2}{12}$
B. $c = \dfrac{p^2}{12} + \dfrac{5}{12}$
C. $c = \dfrac{p}{24} + \dfrac{25}{24}$
D. $c = \dfrac{\sqrt{p + 25}}{12}$
Answer: A
Domain: Advanced Math
Explanation: Adding $25$ to both sides gives $\sqrt{12c} = p + 25$. Squaring both sides gives $12c = (p + 25)^2$, so $c = \frac{(p + 25)^2}{12}$.

22.

$$h(t) = 450(1.035)^{2t}$$

The function $h$ models the estimated population of a protected wildlife sanctuary $t$ years after initial monitoring began. Which of the following expressions represents the estimated annual percent increase in the population?
A. $3.5\%$
B. $7.0\%$
C. $7.1225\%$
D. $12.25\%$
Answer: C
Domain: Advanced Math
Explanation: Since $(1.035)^{2t} = \left((1.035)^2\right)^t$, $h(t) = 450(1.071225)^t$. Each year the population is multiplied by $1.071225$, an increase of $7.1225\%$. Choice A, $3.5\%$, is the increase every half year, and choice B doubles $3.5\%$ without accounting for compounding.

23. Which expression is a factor of $7x^2 - 9x + 14x - 18$?
A. $x - 2$
B. $x + 9$
C. $7x - 9$
D. $7x + 2$
Answer: C
Domain: Advanced Math
Explanation: Grouping the terms gives $7x^2 - 9x + 14x - 18 = x(7x - 9) + 2(7x - 9) = (x + 2)(7x - 9)$. So $7x - 9$ is a factor.

24. In the equation $7x^2 + 49x + c = 0$, $c$ is a constant. If the equation has exactly one real solution, what is the value of $c$?
A. $0$
B. $\dfrac{7}{2}$
C. $56$
D. $\dfrac{343}{4}$
Answer: D
Domain: Advanced Math
Explanation: The equation has exactly one real solution when its discriminant is $0$: $49^2 - 4(7)(c) = 0$, so $2{,}401 = 28c$ and $c = \frac{2{,}401}{28} = \frac{343}{4}$.

25.

$$33x^2 + (33s + r)x + rs = 0$$

In the given equation, $r$ and $s$ are positive constants. The product of the solutions to the given equation is $krs$, where $k$ is a constant. What is the value of $k$?
Answer: 1/33
Domain: Advanced Math
Explanation: For a quadratic equation $Ax^2 + Bx + C = 0$, the product of the solutions is $\frac{C}{A}$. Here the product is $\frac{rs}{33} = \frac{1}{33}rs$, so $k = \frac{1}{33}$. (Indeed, the equation factors as $(33x + r)(x + s) = 0$, with solutions $-\frac{r}{33}$ and $-s$, whose product is $\frac{rs}{33}$.)

26. The function $f$ is defined by $f(x) = \dfrac{|x|}{a} - 14$, where $a < 0$. What is the product of $f(15a)$ and $f(8a)$?
Answer: 638
Domain: Advanced Math
Explanation: Since $a < 0$, $|15a| = -15a$ and $|8a| = -8a$. So $f(15a) = \frac{-15a}{a} - 14 = -15 - 14 = -29$ and $f(8a) = \frac{-8a}{a} - 14 = -8 - 14 = -22$. The product is $(-29)(-22) = 638$.

27.

$$24x^2 - (12a + 2b)x + ab = 0$$

In the given equation, $a$ and $b$ are positive constants. The sum of the solutions to the given equation is $k(6a + b)$, where $k$ is a constant. What is the value of $k$?
Answer: 1/12
Domain: Advanced Math
Explanation: For a quadratic equation $Ax^2 + Bx + C = 0$, the sum of the solutions is $-\frac{B}{A}$. Here the sum is $\frac{12a + 2b}{24} = \frac{2(6a + b)}{24} = \frac{1}{12}(6a + b)$, so $k = \frac{1}{12}$.

28.

$$\begin{gathered} y = -0.5 \\[4pt] y = x^2 + 8x + a \end{gathered}$$

In the given system of equations, $a$ is a positive integer constant. The system has no real solutions. What is the least possible value of $a$?
Answer: 16
Domain: Advanced Math
Explanation: Substituting $y = -0.5$ gives $x^2 + 8x + a = -0.5$, or $x^2 + 8x + (a + 0.5) = 0$. The system has no real solutions when this equation has none, that is, when its discriminant is negative: $8^2 - 4(a + 0.5) < 0$, so $a + 0.5 > 16$ and $a > 15.5$. The least integer greater than $15.5$ is $16$.

29.

![Graph of an increasing exponential curve in the xy-plane. The x-axis is labeled from -4 to 4 and the y-axis from -6 to 10, with grid lines every 1 unit. On the left the curve is nearly flat just above the horizontal line y = -4. It passes through the marked points (0, -3) and (1, 1), then rises steeply and leaves the top of the grid near (1.7, 11).](tests/images/advanced-math-d/q29.svg)

The equation of the graph shown is $y = a^x + b$, where $a$ and $b$ are constants. What is the value of $a - b$?
Answer: 9
Domain: Advanced Math
Explanation: The graph passes through $(0, -3)$, so $a^0 + b = 1 + b = -3$ and $b = -4$ (which matches the horizontal asymptote $y = -4$). The graph also passes through $(1, 1)$, so $a + b = 1$ and $a = 5$. Therefore $a - b = 5 - (-4) = 9$.

30. Which expression is a factor of $49p^{19} - 121p^{17}$?
A. $7p + 11$
B. $49p^2 + 121$
C. $11p - 7$
D. $-72p^{40}$
Answer: A
Domain: Advanced Math
Explanation: Factoring out $p^{17}$ and using the difference of squares gives $49p^{19} - 121p^{17} = p^{17}(49p^2 - 121) = p^{17}(7p - 11)(7p + 11)$. So $7p + 11$ is a factor.

31. The function $f$ is defined by $f(x) = 53(0.15)^x$. For any positive integer $n$, the value of $f(n)$ is $p\%$ less than the value of $f(n - 1)$. What is the value of $p$?
A. $15$
B. $47$
C. $53$
D. $85$
Answer: D
Domain: Advanced Math
Explanation: Since $\frac{f(n)}{f(n - 1)} = 0.15$, the value of $f(n)$ is $15\%$ of $f(n - 1)$, which is $100\% - 15\% = 85\%$ less than $f(n - 1)$. So $p = 85$.

32. The population $P$ of a certain city $y$ years after the last census is modeled by the equation below, where $r$ is a constant and $P_0$ is the population when $y = 0$.

$$P = P_0(1 + r)^y$$

If during this time the population of the city decreases by a fixed percent each year, which of the following must be true?
A. $r < -1$
B. $-1 < r < 0$
C. $0 < r < 1$
D. $r > 1$
Answer: B
Domain: Advanced Math
Explanation: Each year the population is multiplied by $1 + r$. A decrease by a fixed percent means the population stays positive but gets smaller, so $0 < 1 + r < 1$, which gives $-1 < r < 0$.

33. The function $f$ is defined by $f(x) = a\sqrt{x + b}$, where $a$ and $b$ are constants. In the $xy$-plane, the graph of $y = f(x)$ passes through the point $(-24, 0)$, and $f(24) < 0$. Which of the following must be true?
A. $f(0) = 24$
B. $f(0) = -24$
C. $a > b$
D. $a < b$
Answer: D
Domain: Advanced Math
Explanation: Since $f(24) < 0$, $a \ne 0$. So $f(-24) = a\sqrt{-24 + b} = 0$ requires $\sqrt{b - 24} = 0$, which gives $b = 24$. Then $f(24) = a\sqrt{48} < 0$ means $a < 0$. Therefore $a < 0 < 24 = b$, so $a < b$. (The value $f(0) = a\sqrt{24}$ is negative, but it depends on $a$, so choices A and B need not be true.)

34. For the exponential function $f$, the value of $f(2)$ is $k$, where $k$ is a constant. Which of the following equivalent forms of the function $f$ shows the value of $k$ as the coefficient or the base?
A. $f(x) = 729(3)^{x + 2}$
B. $f(x) = 6{,}561(3)^x$
C. $f(x) = 177{,}147(3)^{x - 3}$
D. $f(x) = 59{,}049(3)^{x - 2}$
Answer: D
Domain: Advanced Math
Explanation: All four forms equal $6{,}561(3)^x$, so $k = f(2) = 6{,}561 \cdot 9 = 59{,}049$. Choice D shows $59{,}049$ as its coefficient; in that form, $f(2) = 59{,}049(3)^0 = 59{,}049$. The coefficients in choices A, B, and C are $f(-2)$, $f(0)$, and $f(3)$.

35. For the exponential function $f(x) = 16^{x + 4}$, which of the following answer choices expresses the minimum value as either a constant or a coefficient when $x \ge 0$?
A. $f(x) = 64(16)^x$
B. $f(x) = 65{,}536(16)^x$
C. $f(x) = 1{,}048{,}576(16)^x$
D. $f(x) = \dfrac{1}{65{,}536}(16)^x$
Answer: B
Domain: Advanced Math
Explanation: Since $16^{x + 4} = 16^4 \cdot 16^x$, $f(x) = 65{,}536(16)^x$. The function is increasing, so its minimum value for $x \ge 0$ is $f(0) = 65{,}536$, the coefficient in choice B. Choices A, C, and D use $16 \cdot 4 = 64$, $16^5$, and $16^{-4}$, so they are not equivalent to $f$.

36. In the polynomial $p(x) = x^4 - 5x^3 + ax^2 + bx - 48$, $a$ and $b$ are integer constants. If $(x - 3)$ and $(x + 2)$ are both factors of $p(x)$, what is the remainder when $p(x)$ is divided by $(x + 1)$?
A. $-52$
B. $-36$
C. $0$
D. $36$
Answer: A
Domain: Advanced Math
Explanation: Since $x - 3$ and $x + 2$ are factors, $p(3) = 0$ and $p(-2) = 0$. From $p(3) = 81 - 135 + 9a + 3b - 48 = 0$, $9a + 3b = 102$, or $3a + b = 34$. From $p(-2) = 16 + 40 + 4a - 2b - 48 = 0$, $4a - 2b = -8$, or $2a - b = -4$. Adding these equations gives $5a = 30$, so $a = 6$ and $b = 16$. By the remainder theorem, the remainder when $p(x)$ is divided by $x + 1$ is $p(-1) = 1 + 5 + 6 - 16 - 48 = -52$.

37. The functions $f$ and $g$ are defined by the equations shown, where $a$ and $b$ are integer constants, $a > b$ and $b > 0$. If $y = f(x)$ and $y = g(x)$ are graphed in the $xy$-plane, which of the following equations displays, as a constant or a coefficient, the maximum of the graph of the corresponding function when $x \ge 0$?

I. $f(x) = b(0.97)^{x + a}$

II. $g(x) = b(0.97)^x + a$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: D
Domain: Advanced Math
Explanation: Since $b > 0$ and $0 < 0.97 < 1$, both functions are decreasing, so for $x \ge 0$ each maximum occurs at $x = 0$. For I, the maximum is $f(0) = b(0.97)^a$, which is less than $b$ (because $a > 0$) and is not shown as a constant or coefficient. For II, the maximum is $g(0) = b + a$, which also does not appear in the equation; the constant $a$ is the horizontal asymptote, not the maximum. So neither equation displays its maximum.

38.

$$f(t) = 34{,}000(1.07)^{6t}$$

The given function $f$ models the balance of an investment account, in dollars, $t$ years after it is opened. Which statement is the best interpretation of $(1.07)^{6t}$?
A. Every $6$ years, the balance increases by $2{,}380$ dollars.
B. Every $6$ years, the balance increases by $7\%$ of the previous $6$ years’ balance.
C. Every $2$ months, the balance increases by $2{,}380$ dollars.
D. Every $2$ months, the balance increases by $7\%$ of the previous $2$ months’ balance.
Answer: D
Domain: Advanced Math
Explanation: The factor $(1.07)^{6t}$ gains one more factor of $1.07$ each time $6t$ increases by $1$, that is, each time $t$ increases by $\frac{1}{6}$ of a year, or $2$ months. Multiplying by $1.07$ is an increase of $7\%$ of the balance $2$ months earlier. Choices A and C describe a constant increase of $34{,}000(0.07) = 2{,}380$ dollars (linear growth), and choice B uses $6$ years instead of $\frac{1}{6}$ of a year.

39. By examining pollen in the soil, scientists estimated that the number of *Ulmus* trees in an ancient population doubled every $664$ years. There were $n$ trees in the earliest known sample, where $n$ is a constant. Which expression gives the estimated number of *Ulmus* trees $x$ years after the year of the earliest known sample?
A. $n(2)^{664x}$
B. $n(2)^{\frac{664}{x}}$
C. $n(2)^{\frac{x}{664}}$
D. $n(2)^{(664 + x)}$
Answer: C
Domain: Advanced Math
Explanation: The number of trees doubles every $664$ years, so after $x$ years it has doubled $\frac{x}{664}$ times: $n(2)^{\frac{x}{664}}$. At $x = 664$ this gives $2n$, as it should. Choice A doubles $664$ times every year, choice B's exponent decreases as $x$ increases, and choice D gives $n(2)^{664}$ trees at $x = 0$ instead of $n$.

40. James purchased a certain baseball card on January 1. The function $f(x) = 55(1.04)^x$, where $0 \le x \le 10$, gives the predicted value, in dollars, of the baseball card $x$ years after James purchased it. What is the best interpretation of the statement “$f(7)$ is approximately equal to $72$” in this context?
A. When the baseball card's predicted value is approximately $72$ dollars, it is $7\%$ greater than the predicted value, in dollars, on January 1 of the previous year.
B. When the baseball card's predicted value is approximately $72$ dollars, it is $7$ times the predicted value, in dollars, on January 1 of the previous year.
C. From the day James purchased the baseball card to $7$ years after James purchased the card, its predicted value increased by a total of approximately $72$ dollars.
D. $7$ years after James purchased the baseball card, its predicted value is approximately $72$ dollars.
Answer: D
Domain: Advanced Math
Explanation: The input $7$ is the number of years after the purchase, and the output $f(7) = 55(1.04)^7 \approx 72.38$ is the predicted value, in dollars, at that time. So $7$ years after James purchased the card, its predicted value is approximately $72$ dollars. Choices A and B treat $7$ as a percent or a factor (the value actually grows by $4\%$ per year), and choice C treats $72$ as the increase, which is only about $72 - 55 = 17$ dollars.

41.

$$-8x(x + 9) = 40$$

One solution to the given equation can be written as $x = -\dfrac{s + \sqrt{t}}{2}$, where $s$ and $t$ are positive integers. What is the value of $\dfrac{s}{t}$?
A. $\dfrac{9}{101}$
B. $\dfrac{9}{76}$
C. $\dfrac{9}{61}$
D. $\dfrac{18}{61}$
Answer: C
Domain: Advanced Math
Explanation: Dividing both sides by $-8$ gives $x(x + 9) = -5$, so $x^2 + 9x + 5 = 0$. By the quadratic formula, $x = \frac{-9 \pm \sqrt{81 - 20}}{2} = \frac{-9 \pm \sqrt{61}}{2}$. The solution $\frac{-9 - \sqrt{61}}{2} = -\frac{9 + \sqrt{61}}{2}$ has the given form with $s = 9$ and $t = 61$, so $\frac{s}{t} = \frac{9}{61}$.

42. The scatterplot shows the relationship between $x$ and $y$ for the $10$ data points in data set $G$.

![Scatterplot of 10 points in the xy-plane. The x-axis is labeled from -4 to 4 with vertical grid lines every 1 unit, and the y-axis is labeled from 0 to 160 in steps of 40, with horizontal grid lines every 20 units. The points are at about (-1.25, 117.5), (-1, 87), (-0.5, 47.7), (0, 26.1), (0.5, 14.3), (1, 7.8), (1.5, 4.3), (2, 2.3), (2.5, 1.3), and (3, 0.7). They fall steeply from left to right, each point about 0.3 times the height of the point 1 unit to its left, and level off just above the x-axis.](tests/images/advanced-math-d/q42.svg)

Data set $H$ is created by multiplying the $y$-value of each data point from data set $G$ by $20$. Which of the following equations is the most appropriate model for data set $H$?
A. $y = 20(0.30)^x + 20$
B. $y = 26(0.30)^x$
C. $y = 26(0.30)^x + 20$
D. $y = 522(0.30)^x$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The points of data set $G$ decrease by a factor of about $0.30$ for each increase of $1$ in $x$ and level off toward $y = 0$, with a $y$-value of about $26$ at $x = 0$, so $G$ is modeled well by $y = 26.1(0.30)^x$. Multiplying every $y$-value by $20$ multiplies the model by $20$: $y = 20(26.1)(0.30)^x = 522(0.30)^x$. Choice B models data set $G$ itself, and choices A and C add $20$, which would shift the data up instead of stretching it, and their graphs level off toward $y = 20$, not $y = 0$.

43.

$$x^2 + 44x + y^2 = 0$$

In the $xy$-plane, the graph of the given equation is a circle. What are the coordinates $(x, y)$ of the center of the circle?
A. $(-22, 0)$
B. $(22, 0)$
C. $(0, -22)$
D. $(0, 22)$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Completing the square in $x$ by adding $\left(\frac{44}{2}\right)^2 = 484$ to both sides gives $x^2 + 44x + 484 + y^2 = 484$, so $(x + 22)^2 + y^2 = 22^2$. This is a circle with center $(-22, 0)$ and radius $22$.

44.

$$x^2 + \left(\sqrt{k - 3}\right)x + 26 = 0$$

In the given equation, $k$ is a constant. The equation has exactly one real solution. What is the value of $k$?
A. $29$
B. $104$
C. $107$
D. $101$
Answer: C
Domain: Advanced Math
Explanation: The equation has exactly one real solution when its discriminant is $0$: $\left(\sqrt{k - 3}\right)^2 - 4(1)(26) = 0$, so $k - 3 = 104$ and $k = 107$. (Choice B, $104$, is the value of $k - 3$, not $k$.)

45. In the $xy$-plane, the graph of the equation $y = -x^2 + 7x - 104$ intersects the line $y = c$ at exactly one point. What is the value of $c$?
A. $-\dfrac{367}{4}$
B. $-\dfrac{7}{2}$
C. $-104$
D. $-\dfrac{465}{4}$
Answer: A
Domain: Advanced Math
Explanation: The graph is a parabola that opens downward, so a horizontal line meets it at exactly one point only when the line passes through the vertex. The vertex is at $x = -\frac{7}{2(-1)} = \frac{7}{2}$, where $y = -\left(\frac{7}{2}\right)^2 + 7\left(\frac{7}{2}\right) - 104 = -\frac{49}{4} + \frac{98}{4} - \frac{416}{4} = -\frac{367}{4}$. So $c = -\frac{367}{4}$.

46. A computer program models the total mass of the population of a certain type of algae after the algae were placed in an environment where it has no natural predators. According to the model, the estimated total mass of this population of algae at the end of every $6$-hour period is $129\%$ greater than the estimated total mass of this population of algae at the end of the previous $6$-hour period, and the estimated total mass of this population of algae is $613.90$ grams after $18$ hours. Which equation best represents this model, where $A$ is the estimated total mass, in grams, of the population of algae after $x$ hours, and $x < 50$?
A. $A = 34.11(1.29)^{\frac{x}{6}}$
B. $A = 34.11(2.29)^{\frac{x}{6}}$
C. $A = 51.12(2.29)^{\frac{x}{6}}$
D. $A = 285.98(1.29)^{\frac{x}{6}}$
Answer: C
Domain: Advanced Math
Explanation: Being $129\%$ greater means the mass is multiplied by $1 + 1.29 = 2.29$ every $6$ hours, so $A = a(2.29)^{\frac{x}{6}}$, which eliminates choices A and D (a factor of $1.29$ would be only a $29\%$ increase). After $18$ hours, $A = a(2.29)^3 = 613.90$, so $a = \frac{613.90}{12.008989} \approx 51.12$. Choice B would give only $34.11(2.29)^3 \approx 409.63$ grams after $18$ hours.

47. A linear function $L$ satisfies $L(4) = 19$ and $L(-2) = -5$. An exponential function $E$ is defined by $E(x) = 3 \cdot 2^{cx}$, where $c$ is a positive constant. If the graphs of $y = L(x)$ and $y = E(x)$ intersect at the point $(2, k)$, what is the value of $k$?
A. $2$
B. $6$
C. $11$
D. $12$
Answer: C
Domain: Advanced Math
Explanation: The slope of $L$ is $\frac{19 - (-5)}{4 - (-2)} = \frac{24}{6} = 4$, so $L(x) = 19 + 4(x - 4) = 4x + 3$. The point $(2, k)$ is on the graph of $L$, so $k = L(2) = 4(2) + 3 = 11$. This is consistent with $E$: $3 \cdot 2^{2c} = 11$ gives $2^{2c} = \frac{11}{3}$, which has a positive solution $c \approx 0.94$.

48. A sum of $9{,}000$ dollars was invested in a certificate of deposit (CD) that earns interest, and no other deposits or withdrawals were made after that. The function $f(x) = 9{,}000(1 + 0.026)^x$ gives the value of the CD, in dollars, $x$ years after the investment was initially made, where $x \le 5$. Which of the following is the best interpretation of the statement “$f(2)$ is approximately equal to $9{,}474.08$” in this context?
A. The value of the CD would be approximately $9{,}474.08$ dollars if invested at $2\%$ interest.
B. $9{,}474.08$ days after the investment was made, the value of the CD was approximately $2$ times greater than its initial value.
C. $2$ years after the investment was made, the value of the CD was approximately $9{,}474.08$ dollars.
D. $2$ years after the investment was made, the value of the CD was approximately $9{,}474.08$ dollars greater than its initial value.
Answer: C
Domain: Advanced Math
Explanation: The input $2$ is the number of years after the investment was made, and the output is the value of the CD, in dollars: $f(2) = 9{,}000(1.026)^2 = 9{,}000(1.052676) \approx 9{,}474.08$. So $2$ years after the investment was made, the value of the CD was approximately $9{,}474.08$ dollars. Choice D treats this value as the increase, which is only about $474.08$ dollars, and choices A and B misread the input $2$.

49.

$$\sqrt[3]{117n}\left(\sqrt[4]{117n}\right)^2$$

For what value of $x$ is the given expression equivalent to $(117n)^{12x}$, where $n > 1$?
Answer: 5/72
Domain: Advanced Math
Explanation: Since $\sqrt[3]{117n} = (117n)^{\frac{1}{3}}$ and $\left(\sqrt[4]{117n}\right)^2 = (117n)^{\frac{2}{4}} = (117n)^{\frac{1}{2}}$, the expression equals $(117n)^{\frac{1}{3} + \frac{1}{2}} = (117n)^{\frac{5}{6}}$. Because $117n > 1$, the two forms are equivalent only when the exponents are equal: $12x = \frac{5}{6}$, so $x = \frac{5}{72}$.

50.

$$(5x + 10)(2x + 1) - (2x - 18)$$

For all values of $x$, the given expression is equivalent to which of the following?

I. $10x^2 + 23x + 28$

II. $10x^2 + 25x + 10 - 2x - 18$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Advanced Math
Explanation: Expanding gives $(5x + 10)(2x + 1) = 10x^2 + 5x + 20x + 10 = 10x^2 + 25x + 10$. Subtracting $2x - 18$ gives $10x^2 + 25x + 10 - 2x + 18 = 10x^2 + 23x + 28$, which is expression I. Expression II subtracts $18$ instead of adding it (the subtraction must apply to both terms of $2x - 18$), so it equals $10x^2 + 23x - 8$, which is not equivalent.

51. An exponential function $f$ is defined by $f(x) = k(4)^x$, where $k$ is a positive constant. If $f(-1) = 3$ and $f(2) = 192$, what is the value of $k$?
A. $2$
B. $12$
C. $4$
D. $3$
Answer: B
Domain: Advanced Math
Explanation: Since $f(-1) = k(4)^{-1} = \frac{k}{4} = 3$, $k = 12$. Check: $f(2) = 12(4)^2 = 12(16) = 192$. (Choice D is $f(-1)$, not $k = f(0)$.)

52.

$$g(x) = \dfrac{x^2 - x - a}{x^3 - x - b}$$

The function $g$ is defined by the given equation, where $a$ and $b$ are constants. In the $xy$-plane, the graph of $y = g(x)$ passes through the point $(0, 43)$ and $g(-43) = 0$. What is the value of $b$?
A. $44$
B. $43$
C. $-43$
D. $-44$
Answer: A
Domain: Advanced Math
Explanation: Since $g(0) = 43$, $\frac{-a}{-b} = \frac{a}{b} = 43$, so $a = 43b$. Since $g(-43) = 0$, the numerator is $0$ at $x = -43$: $(-43)^2 - (-43) - a = 1{,}849 + 43 - a = 0$, so $a = 1{,}892$. Then $b = \frac{1{,}892}{43} = 44$. (The denominator at $x = -43$ is $-79{,}507 + 43 - 44 \ne 0$, so $g(-43) = 0$ is valid.)

53. One of the factors of $8x^4 + 50x^2 + 63$ is $ax^2 + b$, where $a$ and $b$ are positive integers. Which of the following is a possible value of $ab$?
A. $7$
B. $14$
C. $18$
D. $36$
Answer: C
Domain: Advanced Math
Explanation: The polynomial factors as $8x^4 + 50x^2 + 63 = (2x^2 + 9)(4x^2 + 7)$, since $2 \cdot 7 + 9 \cdot 4 = 14 + 36 = 50$. Any factor of the form $ax^2 + b$ is a constant multiple of one of these, $m(2x^2 + 9)$ or $m(4x^2 + 7)$, and for $a$ and $b$ to be integers, $m$ must be an integer. So $ab = 18m^2$ or $ab = 28m^2$, which gives $18$, $28$, $72$, $112$, and so on. Of the choices, only $18$ is possible, from the factor $2x^2 + 9$.

54.

$$f(x) = x^2 - 4x - 780$$

The function $f$ is defined by the given equation. Which of the following equivalent forms of the equation displays the minimum value of the function as a constant or coefficient?
A. $f(x) = x^2 - 4x + 195$
B. $f(x) = (x - 2)^2 - 784$
C. $f(x) = x(x - 4) - 780$
D. $f(x) = (x + 26)(x - 30)$
Answer: B
Domain: Advanced Math
Explanation: Completing the square gives $x^2 - 4x - 780 = (x^2 - 4x + 4) - 4 - 780 = (x - 2)^2 - 784$. Since $(x - 2)^2 \ge 0$, the minimum value is $-784$, at $x = 2$, and it appears as the constant in choice B. Choice D is equivalent but shows the zeros, $-26$ and $30$; choice C shows $f(0) = -780$; and choice A is not equivalent to $f$.

55.

$$P(t) = 67\left(\dfrac{5}{4}\right)^t$$

A reindeer population was introduced into an area and researched for $19$ years. Function $P$ models this reindeer population $t$ years after the population was introduced into the area. Which statement is the best interpretation of $\dfrac{5}{4}$ in this context?
A. For every $4$ reindeer there were in this population in a certain year, it is predicted that there were $5$ reindeer the next year.
B. For every $5$ reindeer there were in this population in a certain year, it is predicted that there were $4$ reindeer the next year.
C. It is predicted that this reindeer population grew by $4$ reindeer every $5$ years.
D. It is predicted that this reindeer population grew by $5$ reindeer every $4$ years.
Answer: A
Domain: Advanced Math
Explanation: Each year the population is multiplied by $\frac{5}{4}$, since $P(t + 1) = \frac{5}{4}P(t)$. So for every $4$ reindeer in one year, the model predicts $5$ reindeer the next year. Choice B describes a factor of $\frac{4}{5}$, which would be a decrease, and choices C and D describe linear growth by a fixed number of reindeer.

56. There are $176$ teams participating in a basketball tournament that consists of $4$ rounds. Each team participating in the tournament will play against another team in round $1$. At the end of each round, the losing team of each game from that round is eliminated, and the winning team advances to the next round to play a game against another winning team. Which equation gives the number of teams, $t$, eliminated at the end of round $r$, where $r \le 4$?
A. $t = 11\left(\dfrac{1}{2}\right)^r$
B. $t = 11(2)^r$
C. $t = 176\left(\dfrac{1}{2}\right)^r$
D. $t = 176(2)^r$
Answer: C
Domain: Advanced Math
Explanation: In round $1$, the $176$ teams play $88$ games, so $88$ teams are eliminated and $88$ advance. Each round eliminates half of the remaining teams, so $88$, $44$, $22$, and $11$ teams are eliminated at the end of rounds $1$, $2$, $3$, and $4$. These numbers are $176\left(\frac{1}{2}\right)^r$ for $r = 1$, $2$, $3$, and $4$. Choice A gives $5.5$ teams for $r = 1$, and choices B and D give numbers that increase from round to round.
`
});
