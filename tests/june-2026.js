/*
 * Practice test: June 2026 (20 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'june-2026',
  source: String.raw`
---
title: June 2026
author: tungtks18022
date: 2026-06
description: A 20-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 32
---

1. A right square pyramid has a surface area of $100 + 20\sqrt{554}$ square inches, which includes a base area of $100$ square inches. What is the height, in inches, of this pyramid?
Answer: 23
Domain: Geometry and Trigonometry
Explanation: The square base has area $100$, so its side length is $10$. The lateral area is $20\sqrt{554}$, and each of the $4$ triangular faces has area $\frac{1}{2}(10)\ell = 5\ell$, where $\ell$ is the slant height, so $20\ell = 20\sqrt{554}$ and $\ell = \sqrt{554}$. The height, half the side length, and the slant height form a right triangle, so the height is $\sqrt{554 - 5^2} = \sqrt{529} = 23$ inches.

2. An online store is offering two different discounts on its sweaters: a bulk discount for large orders and a coupon discount. For orders of $n$ sweaters, where $10 < n < 50$, a bulk discount of $n\%$ off the original price of $32$ dollars is applied to the price of each sweater. If a coupon is applied to the order, a discount of an additional $2$ dollars is applied to the price of each sweater, after the bulk discount is applied. For a certain order with both the bulk discount and the coupon discount applied, the total price after the discounts for the sweaters purchased was $612$ dollars. How many sweaters were purchased in this order?
A. $19$
B. $20$
C. $30$
D. $46$
Answer: C
Domain: Advanced Math
Explanation: After both discounts, each sweater costs $32\left(1 - \frac{n}{100}\right) - 2 = 30 - 0.32n$ dollars, so $n(30 - 0.32n) = 612$. Multiplying by $25$ and rearranging gives $8n^2 - 750n + 15{,}300 = 0$, which factors as $2(n - 30)(4n - 255) = 0$, so $n = 30$ or $n = 63.75$. Only $n = 30$ satisfies $10 < n < 50$ (check: $30(30 - 9.6) = 612$).

3. Which expression must be a factor of $x^4 + 14ax^2 + 49a^2 - 64$, where $a$ is a positive constant?
A. $x^2 + 7a + 8$
B. $x^2 - 7a - 8$
C. $x^2 + 14a$
D. $x^2 - 8a$
Answer: A
Domain: Advanced Math
Explanation: Since $x^4 + 14ax^2 + 49a^2 = (x^2 + 7a)^2$, the expression is a difference of squares: $(x^2 + 7a)^2 - 8^2 = (x^2 + 7a - 8)(x^2 + 7a + 8)$, so $x^2 + 7a + 8$ is a factor for every value of $a$. Choice C equals $x^2 + 7a + 8$ only when $a = \frac{8}{7}$, and choice D equals $x^2 + 7a - 8$ only when $a = \frac{8}{15}$, so neither must be a factor. Choice B is never a factor for a positive $a$.

4. As the size of a firework's shell increases, the height above the ground when the firework bursts increases. For a firework to burst $858$ feet above the ground, a firework's shell in the shape of a sphere with a volume of $282.40$ cubic inches could be used. To the nearest whole number, what is the volume of this firework's shell in cubic centimeters? ($1$ inch $= 2.54$ centimeters)
Answer: 4628
Domain: Problem-Solving and Data Analysis
Explanation: Since $1$ inch $= 2.54$ centimeters, $1$ cubic inch $= 2.54^3 = 16.387064$ cubic centimeters. The volume is $282.40(16.387064) \approx 4{,}627.71$ cubic centimeters, which rounds to $4{,}628$.

5.

![A trirectangular tetrahedron drawn in perspective. Three dashed edges meet at a hidden back vertex, where a corner mark shows they are mutually perpendicular: one rises vertically to the top vertex and the other two run to the two front vertices of the base. Solid edges join the top vertex to each front vertex and the two front vertices to each other.](tests/images/june-2026/q5.svg)

The figure shown is a trirectangular tetrahedron, a three-dimensional figure with four triangular faces, three of which are right triangles. A chemistry professor uses trirectangular tetrahedrons to create large-scale models of various carbon-based molecules. The base of one of these tetrahedrons is an isosceles right triangle whose legs each have length $12$ inches (in). The height of this tetrahedron is $24$ in. Which of the following is closest to the volume of this tetrahedron, in pints? (Note: $1$ pint $= 0.5$ quarts; use $1$ quart $= 57.75\text{ in}^3$. The volume of a trirectangular tetrahedron is equal to $\frac{1}{3}Sh$, where $S$ is the area of its base and $h$ is its height.)
A. $19.95$
B. $119.69$
C. $576.00$
D. $16{,}632.00$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The base area is $S = \frac{1}{2}(12)(12) = 72$ square inches, so the volume is $\frac{1}{3}(72)(24) = 576$ cubic inches. One pint is $0.5(57.75) = 28.875$ cubic inches, so the volume is $\frac{576}{28.875} \approx 19.95$ pints.

6. The exponential function $g$ is defined by $g(x) = ab^x$, where $a$ and $b$ are positive constants. If $g(c) = m$ and the value of $g(c + 1)$ is $68\%$ more than the value of $m$, where $c$ and $m$ are constants, what is the value of $b$?
A. $0.32$
B. $0.68$
C. $1.68$
D. $3.36$
Answer: C
Domain: Advanced Math
Explanation: $g(c + 1) = ab^{c + 1} = b \cdot ab^c = bm$. A value $68\%$ more than $m$ is $1.68m$, so $bm = 1.68m$ and $b = 1.68$.

7.

![A circle with center O. Radius OA goes straight up from O and radius OB goes to the right, with a right-angle mark at O. The quarter-circle sector AOB between the two radii is shaded.](tests/images/june-2026/q7.svg)

In the circle, $O$ is the center and $\angle AOB$ is a right angle. If the area of the shaded region is $37\pi$ square units, what is the length, in units, of $OA$?
A. $74$
B. $148$
C. $\sqrt{148}$
D. $\sqrt{592}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Since $\angle AOB$ is a right angle, the shaded sector is one-fourth of the circle, so $\frac{1}{4}\pi r^2 = 37\pi$ and $r^2 = 148$. Therefore $OA = r = \sqrt{148}$.

8. The function $f$ is defined by the given equation. For all values of $x$, the value of $f(x)$ is greater than $k$, where $k$ is a constant. What is the greatest possible value of $k$?

$$f(x) = 9\left(\left(\dfrac{1}{8}\right)^x + 4\right)$$
A. $0$
B. $4$
C. $36$
D. $288$
Answer: C
Domain: Advanced Math
Explanation: Distributing gives $f(x) = 9\left(\frac{1}{8}\right)^x + 36$. Since $\left(\frac{1}{8}\right)^x$ is always positive and gets arbitrarily close to $0$ as $x$ increases, $f(x) > 36$ for all $x$, and $f(x)$ takes values arbitrarily close to $36$. So the greatest possible value of $k$ is $36$.

9.

![Scatterplot in the xy-plane with the x-axis from -4 to 4 and the y-axis from 0 to 160, labeled every 40 units with gridlines every 20 units. Ten data points rise exponentially, at approximately (-3, 2), (-1, 3), (0.5, 5), (1, 8), (1.5, 12), (2, 20), (2.5, 30), (3, 44), (3.5, 70), and (4, 102).](tests/images/june-2026/q9.svg)

The scatterplot shows the relationship between $x$ and $y$ for the $10$ data points in data set A. Data set B is created by multiplying the $y$-value of each data point from data set A by $30$. Which of the following equations is the most appropriate model for data set B?
A. $y = 5(2.04)^x$
B. $y = 150(2.04)^x$
C. $y = 5(2.04)^x + 30$
D. $y = 30(2.04)^x + 30$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The points in data set A follow an increasing exponential pattern that is reasonably modeled by $y = 5(2.04)^x$; for example, the points at $x = 2$ and $x = 3$ are close to $5(2.04)^2 \approx 20.8$ and $5(2.04)^3 \approx 42.4$. Multiplying every $y$-value by $30$ multiplies the model by $30$, so data set B is modeled by $y = 30 \cdot 5(2.04)^x = 150(2.04)^x$. Choices C and D add $30$ instead of multiplying by $30$.

10.

![A circle with center Q. A horizontal line m touches the top of the circle at point C; point P lies on line m to the left of C, and point A lies on line m to the right of C. Points B and D lie on the circle just below line m, with B to the left of C and D to the right of C.](tests/images/june-2026/q10.svg)

*Note: Figure not drawn to scale.*

The circle shown has center $Q$, and points $B$, $C$, and $D$ lie on the circle. Line $m$ is tangent to the circle at point $C$, and line $m$ is parallel to line segment $BD$ (not shown). Line $DQ$ (not shown) intersects line $m$ at point $A$, and line $BQ$ (not shown) intersects line $m$ at point $P$. If the length of line segment $AQ$ (not shown) is $90$ and the length of line segment $AC$ is $72$, what is the perimeter of triangle $CPQ$?
Answer: 216
Domain: Geometry and Trigonometry
Explanation: A radius drawn to the point of tangency is perpendicular to the tangent line, so triangle $QCA$ has a right angle at $C$ and $QC = \sqrt{90^2 - 72^2} = 54$. Since $BD \parallel m$, line $QC$ is perpendicular to chord $\overline{BD}$ and is therefore its perpendicular bisector, so reflecting across line $QC$ swaps $B$ and $D$ and sends $A$ to $P$. Thus $CP = AC = 72$ and $PQ = AQ = 90$, and the perimeter of triangle $CPQ$ is $72 + 90 + 54 = 216$.

11. A parabola in the $xy$-plane has a vertex of $(1, 35)$. The equation $y = -ax^2 + bx + c$ represents this parabola, where $a$, $b$, and $c$ are positive integer constants. What is the greatest possible value of $b$?
Answer: 68
Domain: Advanced Math
Explanation: The $x$-coordinate of the vertex is $\frac{-b}{2(-a)} = \frac{b}{2a} = 1$, so $b = 2a$. Substituting $(1, 35)$ gives $-a + b + c = 35$, so $a + c = 35$. Since $c$ is a positive integer, $a \le 34$, so the greatest possible value of $b$ is $2(34) = 68$ (with $a = 34$ and $c = 1$).

12. Cylinder A and cylinder B are each right circular cylinders with a radius of $4$ inches. The height of cylinder A is half the height of cylinder B, and the total surface area of cylinder A is $128\pi$ square inches. If the cylinders are glued together along a circular base, what is the height, in inches, of the resulting cylinder?
A. $8$
B. $12$
C. $24$
D. $36$
Answer: D
Domain: Geometry and Trigonometry
Explanation: If cylinder A has height $h$, its total surface area is $2\pi(4)^2 + 2\pi(4)h = 32\pi + 8\pi h = 128\pi$, so $h = 12$ inches. Cylinder B has height $2(12) = 24$ inches, so the resulting cylinder has height $12 + 24 = 36$ inches.

13.

![Two right circular cylinders standing upright side by side: a smaller cylinder labeled Cylinder A on the left and a larger cylinder labeled Cylinder B on the right.](tests/images/june-2026/q13.svg)

Cylinder A is similar to cylinder B. The volume of cylinder A is $1.52$ cubic units and the volume of cylinder B is $5.13$ cubic units. The surface area of cylinder A is $9.96$ square units. What is the surface area, in square units, of cylinder B?
Answer: 22.41
Domain: Geometry and Trigonometry
Explanation: The ratio of the volumes is $\frac{5.13}{1.52} = 3.375 = 1.5^3$, so the scale factor from cylinder A to cylinder B is $1.5$. Surface areas scale by $1.5^2 = 2.25$, so the surface area of cylinder B is $9.96(2.25) = 22.41$ square units.

14. In the given system of inequalities, $k$ is a positive constant. Which of the following represents the $x$-coordinates of all the points $(x, y)$ that satisfy this system in the $xy$-plane?

$$\begin{cases} y > 7x + k \\ y < 9 - x \end{cases}$$
A. $x > \dfrac{k}{9}$
B. $x < \dfrac{k}{9}$
C. $x > \dfrac{9 - k}{8}$
D. $x < \dfrac{9 - k}{8}$
Answer: D
Domain: Algebra
Explanation: A point $(x, y)$ satisfies the system when $7x + k < y < 9 - x$, and such a $y$ exists exactly when $7x + k < 9 - x$. This gives $8x < 9 - k$, so $x < \frac{9 - k}{8}$.

15.

![Triangle XYZ with vertex Y at the top, X at the bottom left, and Z at the bottom right. Point V lies on side XY and point W lies on side YZ, and segment VW is parallel to side XZ. Segment VW is labeled 35 and side XZ is labeled 55. Along side XY, segment YV is labeled a and segment VX is labeled c; along side YZ, segment YW is labeled b and segment WZ is labeled d.](tests/images/june-2026/q15.svg)

In triangle $XYZ$, a line segment $VW$ is parallel to $XZ$, with $VW = 35$ and $XZ = 55$, as shown in the figure. If $YV = a$, $VX = c$, $YW = b$, and $WZ = d$, and we are given $\dfrac{a}{c} = k$ and $\dfrac{b}{d} = k$, what is the value of $k$?
Answer: 7/4 | 1.75
Domain: Geometry and Trigonometry
Explanation: Since $VW \parallel XZ$, triangle $YVW$ is similar to triangle $YXZ$, so $\frac{YV}{YX} = \frac{VW}{XZ} = \frac{35}{55} = \frac{7}{11}$. Then $\frac{a}{a + c} = \frac{7}{11}$, so $11a = 7a + 7c$ and $4a = 7c$. Therefore $k = \frac{a}{c} = \frac{7}{4}$ (and likewise $\frac{b}{d} = \frac{7}{4}$).

16. The given equation, where $k$ and $t$ are positive constants, defines a circle in the $xy$-plane. The radius of this circle is $\sqrt{57}$. Which expression represents the value of $t$?

$$2x^2 - x\sqrt{k} + 2y^2 + y\sqrt{t} - 12 = 0$$
A. $816 - k$
B. $k - 720$
C. $720 - k$
D. $180 - k$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Dividing by $2$ gives $x^2 - \frac{\sqrt{k}}{2}x + y^2 + \frac{\sqrt{t}}{2}y = 6$. Completing the square gives $\left(x - \frac{\sqrt{k}}{4}\right)^2 + \left(y + \frac{\sqrt{t}}{4}\right)^2 = 6 + \frac{k}{16} + \frac{t}{16}$. The radius is $\sqrt{57}$, so $6 + \frac{k + t}{16} = 57$, which gives $k + t = 816$ and $t = 816 - k$.

17.

![A right circular cone with vertex V at the top. A dashed vertical segment runs from V down to the center O of the circular base, with a right-angle mark at O, and a solid segment OP runs from O to point P on the left edge of the base.](tests/images/june-2026/q17.svg)

For the right circular cone shown, $OP$ is a radius of the base and $V$ is the vertex. The cone's lateral surface area, in square meters, is $\pi rL$, where $r$ is the length, in meters, of $OP$ and $L$ is the length, in meters, of $VP$. The cone has a base area of $81\pi$ square meters and a lateral surface area of $128\pi$ square meters. What is the height of the cone, to the nearest meter?
Answer: 11
Domain: Geometry and Trigonometry
Explanation: From $\pi r^2 = 81\pi$, $r = 9$, and from $\pi(9)L = 128\pi$, $L = \frac{128}{9}$. The height $VO$, the radius $OP$, and the slant height $VP$ form a right triangle, so the height is $\sqrt{\left(\frac{128}{9}\right)^2 - 9^2} = \frac{\sqrt{9{,}823}}{9} \approx 11.01$, which is $11$ meters to the nearest meter.

18. The estimated total pressure a diver experiences below the surface of the water is equal to the sum of the estimated water pressure and the estimated atmospheric pressure. At a depth of $h$ meters below the surface, the estimated total pressure $P_1$, in kilopascals (kPa), a diver experiences is given by $P_1 = 10h + 101$. After maintaining a depth of $h$ meters, the diver descended $d$ additional meters. The estimated total pressure $P_2$, in kPa, the diver experienced after descending these $d$ additional meters is given by $P_2 = 10d + 341$. What is the estimated total pressure, in kPa, the diver experienced at a depth of $h$ meters below the surface?
A. $442$
B. $341$
C. $107$
D. $10$
Answer: B
Domain: Algebra
Explanation: After descending, the diver is at a depth of $h + d$ meters, so $P_2 = 10(h + d) + 101 = 10d + (10h + 101)$. Comparing this with $P_2 = 10d + 341$ gives $10h + 101 = 341$, so the total pressure at a depth of $h$ meters is $P_1 = 341$ kPa.

19.

| $x$ | $y$ |
|:---:|:---:|
| $-5$ | $49 + 4k$ |
| $5$ | $49$ |
| $10$ | $49 - 2k$ |

The table gives three values of $x$ and their corresponding values of $y$, where $k$ is a positive constant. There is a linear relationship between $x$ and $y$. Which equation represents this relationship?
A. $2kx - 5y = 49 + 2k$
B. $2kx - 5y = 245 + 10k$
C. $2kx + 5y = 49 + 2k$
D. $2kx + 5y = 245 + 10k$
Answer: D
Domain: Algebra
Explanation: From $x = 5$ to $x = 10$, $y$ changes by $-2k$, so the slope is $-\frac{2k}{5}$ (the first two rows give the same slope, $\frac{-4k}{10}$). Using the point $(5, 49)$, $y - 49 = -\frac{2k}{5}(x - 5)$. Multiplying by $5$ gives $5y - 245 = -2kx + 10k$, so $2kx + 5y = 245 + 10k$.

20. A circle in the $xy$-plane has its center at $(-9, -8)$ and intersects the line $y = a$ at exactly one point, where $a$ is a positive constant. Which equation defines this circle?
A. $(x + 9)^2 + (y + 8)^2 = (a + 8)^2$
B. $(x + 9)^2 + (y + 8)^2 = (a - 8)^2$
C. $(x - 9)^2 + (y - 8)^2 = (a + 8)^2$
D. $(x - 9)^2 + (y - 8)^2 = (a - 8)^2$
Answer: A
Domain: Geometry and Trigonometry
Explanation: A circle that intersects the horizontal line $y = a$ at exactly one point is tangent to it, so the radius is the vertical distance from the center to the line: $a - (-8) = a + 8$. With center $(-9, -8)$, the equation is $(x + 9)^2 + (y + 8)^2 = (a + 8)^2$.
`
});
