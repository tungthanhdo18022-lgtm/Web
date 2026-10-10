/*
 * Advanced test: Geometry and Trigonometry D (45 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'geometry-d',
  source: String.raw`
---
title: Geometry and Trigonometry D
author: tungtks18022
description: 45 harder Geometry and Trigonometry questions on area, surface area and volume, similar solids and triangles, lines and angles, right triangle trigonometry, and circles in the xy-plane, with an explanation for every question.
category: Geometry and Trigonometry
section: advanced
time: 72
---

1.

| Cylinder | Volume | Surface Area |
|:---:|:---:|:---:|
| A | $1{,}296\pi$ | $k\pi$ |
| B | $162{,}000\pi$ | $j\pi$ |

The table gives the volume of two similar cylinders. If the radius of cylinder A is $9$ cm, what is the value of $j - k$?

(Volume $= \pi r^2 h$, Surface Area $= 2\pi r^2 + 2\pi rh$)
Answer: 10800
Domain: Geometry and Trigonometry
Explanation: The ratio of the volumes is $\frac{162{,}000\pi}{1{,}296\pi} = 125 = 5^3$, so the scale factor from cylinder A to cylinder B is $5$ and their surface areas are in the ratio $5^2 = 25$. For cylinder A, $\pi(9)^2h = 1{,}296\pi$ gives $h = 16$, so its surface area is $2\pi(81) + 2\pi(9)(16) = 450\pi$ and $k = 450$. Then $j = 25(450) = 11{,}250$, and $j - k = 10{,}800$.

2. In the $xy$-plane, a unit circle with center at the origin $O$ contains point $A$ with coordinates $(1, 0)$ and point $B$ with coordinates $\left(\dfrac{5}{\sqrt{34}}, -\dfrac{3}{\sqrt{34}}\right)$. If the measure of angle $AOB$ is $p$ radians (measured counterclockwise from $\overline{OA}$ to $\overline{OB}$), what is the value of $\dfrac{\cos p}{\sin p}$?
Answer: -5/3
Domain: Geometry and Trigonometry
Explanation: Angle $AOB$ is in standard position with initial side $\overline{OA}$ and terminal side $\overline{OB}$, and $B$ lies on the unit circle, so $\cos p = \frac{5}{\sqrt{34}}$ and $\sin p = -\frac{3}{\sqrt{34}}$. Therefore $\frac{\cos p}{\sin p} = \frac{5}{-3} = -\frac{5}{3}$.

3.

$$2\cos(90 - a)^\circ \cdot \cos b^\circ + \sin(a + y)^\circ \cdot \sin(90 - b)^\circ$$

In the given expression, $a$ and $b$ are constants such that $\sin a^\circ = 0.50$, $\cos b^\circ = 0.99$, and $0 < b < 90$. What is the value of the given expression when $y = 0$?
Answer: 297/200 | 1.485
Domain: Geometry and Trigonometry
Explanation: Since $\cos(90 - a)^\circ = \sin a^\circ$ and $\sin(90 - b)^\circ = \cos b^\circ$, when $y = 0$ the expression becomes $2\sin a^\circ \cos b^\circ + \sin a^\circ \cos b^\circ = 3\sin a^\circ \cos b^\circ$. This equals $3(0.50)(0.99) = 1.485$, or $\frac{297}{200}$.

4. A right triangular pyramid has exactly six edges. Each of these edges is $96$ centimeters long. If the surface area of the pyramid is $k\sqrt{3}$ square centimeters, what is the value of $k$?
Answer: 9216
Domain: Geometry and Trigonometry
Explanation: Since all six edges are $96$ centimeters long, each of the four faces is an equilateral triangle with side length $96$ and area $\frac{\sqrt{3}}{4}(96)^2 = 2{,}304\sqrt{3}$ square centimeters. The surface area is $4(2{,}304\sqrt{3}) = 9{,}216\sqrt{3}$, so $k = 9{,}216$.

5.

![A circle with points A, B, C, and E on it: B at the upper left, A at the left, C at the right, and E at the bottom. Segments AB, BC, AC, and BE are drawn, and BE crosses AC at point D. Right-angle marks are shown at D and at B, in angle ABC.](tests/images/geometry-d/q5.svg)

*Note: Figure not drawn to scale.*

In the figure shown, points $A$, $B$, $C$, and $E$ lie on the circle, and $AB < BC$. Segment $AC$ is perpendicular to segment $BE$ at point $D$, and $BD = \sqrt{226}$. The diameter of the circle is $115$. If $\frac{CD}{AD} = r$, what is the value of $r$?
Answer: 113/2 | 56.5
Domain: Geometry and Trigonometry
Explanation: Angle $ABC$ is a right angle inscribed in the circle, so $\overline{AC}$ is a diameter and $AD + CD = 115$. In right triangle $ABC$, the altitude $\overline{BD}$ to the hypotenuse satisfies $BD^2 = AD \cdot CD$, so $AD \cdot CD = 226$. Then $AD$ and $CD$ are the solutions of $t^2 - 115t + 226 = 0$, which are $2$ and $113$. Since $AB < BC$, $AD < CD$, so $AD = 2$, $CD = 113$, and $r = \frac{113}{2}$.

6. A raised garden is in the shape of a right rectangular prism. Its base has a width of $3$ feet and a length of $27$ feet, and it will be filled $24$ inches high with topsoil. The total cost of the topsoil needed to fill the garden to this height is $234$ dollars. What is the unit cost, in dollars per cubic yard, for the topsoil? ($1$ yard $= 3$ feet; $1$ foot $= 12$ inches)
Answer: 39
Domain: Geometry and Trigonometry
Explanation: In yards, the topsoil fills a prism $\frac{3}{3} = 1$ yard wide, $\frac{27}{3} = 9$ yards long, and $\frac{24}{36} = \frac{2}{3}$ yard high, so its volume is $1(9)\left(\frac{2}{3}\right) = 6$ cubic yards. The unit cost is $\frac{234}{6} = 39$ dollars per cubic yard.

7.

![Two parallel vertical lines, a on the left and b on the right, are crossed by three lines: line c rises from lower left to upper right, and lines d and e fall from upper left to lower right, with d above e. Angle v is at the intersection of lines a and d, below d and to the right of a. Angle y is at the intersection of lines b and c, below c and to the right of b. Angle z is at the intersection of lines b and e, below e and to the right of b. Angle x is at the intersection of lines c and d, on the side that opens to the right. Angle w is at the intersection of lines c and e, left of line a, on the side that opens to the left.](tests/images/geometry-d/q7.svg)

*Note: Figure not drawn to scale.*

In the figure, parallel lines $a$ and $b$ are intersected by lines $c$, $d$, and $e$. If $z = 49$, $y = 136$, and $v < z$, which statement about $x$ and $w$ must be true?
A. $x < w$
B. $x > w$
C. $x = w$
D. $x + w = 90$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $a \parallel b$, line $d$ also makes a $v^\circ$ angle with line $b$ (corresponding angles). In the triangle formed by lines $b$, $c$, and $d$, the angles measure $v^\circ$, $(180 - y)^\circ = 44^\circ$, and $x^\circ$ (vertical angles), so $x = 136 - v$. In the triangle formed by lines $b$, $c$, and $e$, the angles measure $44^\circ$, $z^\circ = 49^\circ$, and $w^\circ$ (all by vertical angles), so $w = 87$. Since $v < 49$, $x > 136 - 49 = 87 = w$.

8. A circle in the $xy$-plane has its center at $(3, 7)$. Line $t$ is tangent to this circle at the point $(a, -4)$, where $a$ is a constant. The slope of line $t$ is $\frac{5}{4}$. What is the value of $a$?
A. $-\dfrac{43}{4}$
B. $-\dfrac{29}{5}$
C. $\dfrac{59}{5}$
D. $\dfrac{67}{4}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The radius to the point of tangency is perpendicular to line $t$, so its slope is $-\frac{4}{5}$. The slope from $(3, 7)$ to $(a, -4)$ is $\frac{-4 - 7}{a - 3} = \frac{-11}{a - 3}$, so $\frac{-11}{a - 3} = -\frac{4}{5}$. Then $4(a - 3) = 55$, which gives $a = \frac{67}{4}$.

9.

![A circle with its center marked. Points M at the upper left, N at the upper right, and P at the lower right lie on the circle.](tests/images/geometry-d/q9.svg)

Points $M$, $N$, and $P$ lie on the circle shown. On this circle, minor arc $MN$ has a length of $39$ centimeters and major arc $MPN$ has a length of $195$ centimeters. What is the circumference, in centimeters, of the circle shown?
A. $39$
B. $156$
C. $195$
D. $234$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Minor arc $MN$ and major arc $MPN$ together make up the whole circle, so the circumference is $39 + 195 = 234$ centimeters.

10.

![A sphere inside a right circular cylinder, touching the top base, the bottom base, and the curved side of the cylinder. A radius r is drawn from the center of the sphere to the side of the cylinder.](tests/images/geometry-d/q10.svg)

*Note: Figure not drawn to scale.*

A sphere is inscribed in a right circular cylinder, as shown. The sphere touches the center of each base of the cylinder. The sphere and the cylinder have the same radius, $r$, where $r$ is $37$ centimeters. What is the surface area, in square centimeters, of the cylinder?
A. $5{,}476\pi$
B. $8{,}214\pi$
C. $16{,}428\pi$
D. $101{,}306\pi$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The sphere touches both bases, so the height of the cylinder equals the diameter of the sphere: $h = 2(37) = 74$. The surface area of the cylinder is $2\pi r^2 + 2\pi rh = 2\pi(37)^2 + 2\pi(37)(74) = 2{,}738\pi + 5{,}476\pi = 8{,}214\pi$ square centimeters.

11.

![Two cylinders. Cylinder I is tall and narrow, with radius r and height 10. Cylinder II is short and wide, with radius 2r and height h.](tests/images/geometry-d/q11.svg)

Two cylinders shown above have the same volume. If the radius of cylinder II is twice the radius of cylinder I and the height of cylinder I is $10$, what is the height $h$ of cylinder II?
Answer: 5/2 | 2.5
Domain: Geometry and Trigonometry
Explanation: Setting the volumes equal gives $\pi r^2(10) = \pi(2r)^2h = 4\pi r^2h$. Dividing both sides by $4\pi r^2$ gives $h = \frac{10}{4} = 2.5$.

12. The table gives the volume and surface areas of two similar rectangular prisms, where $k$ is a constant.

| | Volume (cubic inches) | Surface Area (square inches) |
|:---:|:---:|:---:|
| Rectangular Prism A | 4,374 | 1,782 |
| Rectangular Prism B | 1,500,282 | $k$ |

What is the value of $k$?
A. $5{,}346$
B. $12{,}474$
C. $87{,}318$
D. $611{,}226$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The ratio of the volumes is $\frac{1{,}500{,}282}{4{,}374} = 343 = 7^3$, so the scale factor from prism A to prism B is $7$. Surface areas scale by $7^2 = 49$, so $k = 49(1{,}782) = 87{,}318$.

13. An equilateral triangle with side lengths of $k$ is inscribed in a circle. Which of the following defines the radius, $r$, in terms of $k$?
A. $\dfrac{k}{2}$
B. $\dfrac{k\sqrt{3}}{6}$
C. $\dfrac{k\sqrt{3}}{3}$
D. $\dfrac{k\sqrt{3}}{2}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The center of the circle is the centroid of the equilateral triangle, which lies $\frac{2}{3}$ of the way along each altitude from the vertex. The altitude is $\frac{k\sqrt{3}}{2}$, so $r = \frac{2}{3} \cdot \frac{k\sqrt{3}}{2} = \frac{k\sqrt{3}}{3}$.

14. A right circular cone has a volume of $\frac{1}{3}\pi$ cubic feet and a height of $9$ feet. What is the radius, in feet, of the base of the cone?
A. $\dfrac{1}{3}$
B. $\dfrac{1}{\sqrt{3}}$
C. $\sqrt{3}$
D. $3$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The volume of a cone is $\frac{1}{3}\pi r^2h$, so $\frac{1}{3}\pi r^2(9) = \frac{1}{3}\pi$. This gives $9r^2 = 1$, so $r^2 = \frac{1}{9}$ and $r = \frac{1}{3}$.

15.

![Right triangle ABC with the right angle at C, A at the left, and B directly above C. Side BC is labeled y. A vertical segment labeled x is drawn from a point on side AC up to side AB, perpendicular to AC; it divides AC into a part of length 5 next to A and a part of length 7 next to C.](tests/images/geometry-d/q15.svg)

*Note: Figure not drawn to scale.*

The area of triangle $ABC$ above is at least $48$ but no more than $60$. If $y$ is an integer, what is one possible value of $x$?
Answer: 10/3 | 15/4 | 3.75 | 25/6
Domain: Geometry and Trigonometry
Explanation: Triangle $ABC$ has a right angle at $C$ and $AC = 5 + 7 = 12$, so its area is $\frac{1}{2}(12)y = 6y$. From $48 \le 6y \le 60$, $8 \le y \le 10$, so $y$ is $8$, $9$, or $10$. The small right triangle with vertex $A$ is similar to triangle $ABC$, so $\frac{x}{5} = \frac{y}{12}$ and $x = \frac{5y}{12}$, which gives $x = \frac{10}{3}$, $\frac{15}{4}$, or $\frac{25}{6}$.

16. The surface area of rectangular prism A is $312 \text{ m}^2$. The surface area of rectangular prism B is $11{,}232 \text{ m}^2$. Rectangular prism A has a volume of $224 \text{ m}^3$. If both rectangular prisms are similar, what is the volume of rectangular prism B?
Answer: 48384
Domain: Geometry and Trigonometry
Explanation: The ratio of the surface areas is $\frac{11{,}232}{312} = 36 = 6^2$, so the scale factor from prism A to prism B is $6$. Volumes scale by $6^3 = 216$, so the volume of prism B is $216(224) = 48{,}384 \text{ m}^3$.

17.

![Triangle ABC with C at the top, A at the lower left, and B at the lower right. Segment CD is drawn from C to point D on side AB, with a right-angle mark at D. Segment AD is labeled 4 and segment DB is labeled 16.](tests/images/geometry-d/q17.svg)

In the figure shown, angle $ACB$ is a right angle, and segment $CD$ is perpendicular to segment $AB$. If the length of $AD$ is $4$ and the length of $DB$ is $16$, what is the length of segment $AC$?
A. $4\sqrt{5}$
B. $8\sqrt{5}$
C. $12$
D. $20$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Triangle $ADC$ and triangle $ACB$ are right triangles that share angle $A$, so they are similar and $\frac{AD}{AC} = \frac{AC}{AB}$. With $AB = 4 + 16 = 20$, this gives $AC^2 = AD \cdot AB = 4(20) = 80$, so $AC = \sqrt{80} = 4\sqrt{5}$.

18. A right triangle has legs with lengths of $24$ centimeters and $21$ centimeters. If the length of this triangle's hypotenuse, in centimeters, can be written in the form $3\sqrt{d}$, where $d$ is an integer, what is the value of $d$?
Answer: 113
Domain: Geometry and Trigonometry
Explanation: By the Pythagorean theorem, the hypotenuse is $\sqrt{24^2 + 21^2} = \sqrt{576 + 441} = \sqrt{1{,}017} = \sqrt{9 \cdot 113} = 3\sqrt{113}$. So $d = 113$.

19. In the given figure, $BC$ is the diameter of the circle. If the length of $BC$ is equal to $132$ and the length of $AB$ is equal to $\sqrt{363}$, what is the value of $\frac{BC}{BD}$?

![A circle with points A at the upper left, B at the lower left, and C at the right on it. Segments AB, AC, and BC are drawn, and segment AD is drawn from A to point D on BC, with a right-angle mark at D.](tests/images/geometry-d/q19.svg)

*Note: Figure not drawn to scale.*
Answer: 48
Domain: Geometry and Trigonometry
Explanation: Since $\overline{BC}$ is a diameter, angle $BAC$ is a right angle, and $\overline{AD}$ is the altitude to the hypotenuse. Triangle $BDA$ is similar to triangle $BAC$, so $AB^2 = BD \cdot BC$, which gives $363 = 132(BD)$ and $BD = \frac{11}{4}$. Therefore $\frac{BC}{BD} = 132 \cdot \frac{4}{11} = 48$.

20.

![Rectangle ABCD with B at the top left, C at the top right, D at the bottom right, and A at the bottom left. Point E is on side BC and point F is on side CD. Diagonal BD and segment EF are drawn, and the region between them, quadrilateral BEFD, is shaded.](tests/images/geometry-d/q20.svg)

In the figure above, $E$ and $F$ are the midpoints of two sides of a rectangle. If the area of $\triangle CEF$ is $10$, what is the area of the shaded region?
A. $15$
B. $20$
C. $25$
D. $30$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Let $BC = w$ and $CD = h$. Since $E$ and $F$ are midpoints, $CE = \frac{w}{2}$ and $CF = \frac{h}{2}$, so the area of $\triangle CEF$ is $\frac{1}{2} \cdot \frac{w}{2} \cdot \frac{h}{2} = \frac{wh}{8} = 10$ and $wh = 80$. The shaded region is $\triangle BCD$ without $\triangle CEF$, so its area is $\frac{wh}{2} - 10 = 40 - 10 = 30$.

21. An equilateral triangle is inscribed in a circle with a diameter of $16$. Which of the following gives the area of the equilateral triangle?
A. $6\sqrt{3}$
B. $24\sqrt{3}$
C. $32\sqrt{3}$
D. $48\sqrt{3}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The radius of the circle is $8$. The circumradius of an equilateral triangle with side length $s$ is $\frac{s\sqrt{3}}{3}$, so $\frac{s\sqrt{3}}{3} = 8$ and $s = 8\sqrt{3}$. The area of the triangle is $\frac{\sqrt{3}}{4}(8\sqrt{3})^2 = \frac{\sqrt{3}}{4}(192) = 48\sqrt{3}$.

22. A rectangular poster has an area of $360$ square inches. A copy of the poster is made in which the length and width of the original poster are each increased by $20\%$. What is the area of the copy, in square inches?
Answer: 2592/5 | 518.4
Domain: Geometry and Trigonometry
Explanation: Each dimension is multiplied by $1.2$, so the area is multiplied by $1.2^2 = 1.44$. The area of the copy is $1.44(360) = 518.4$ square inches.

23. A circle in the $xy$-plane has center $(28, 5)$ and $y$-intercepts $(0, -16)$ and $(0, 26)$. What is the radius of this circle?
A. $35$
B. $26$
C. $21$
D. $16$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The radius is the distance from the center $(28, 5)$ to the point $(0, 26)$ on the circle: $\sqrt{(28 - 0)^2 + (5 - 26)^2} = \sqrt{784 + 441} = \sqrt{1{,}225} = 35$.

24.

![Two horizontal parallel lines, line CD on top and line AB on the bottom. Line AD and line BC cross at point E between the parallel lines. Angle x is at C, above line CD and to the right of line BC. Angle y is at A, above line AB and to the left of line AD. Angle z is at E, between segments EC and ED.](tests/images/geometry-d/q24.svg)

*Note: Figure not drawn to scale.*

In the figure, line $AB$ is parallel to line $CD$ and line $AD$ intersects line $BC$ at point $E$. If $x = 105$ and $y = 110$, what is the value of $z$?
Answer: 35
Domain: Geometry and Trigonometry
Explanation: Angle $x^\circ$ and angle $ECD$ form a linear pair, so angle $ECD$ measures $180^\circ - 105^\circ = 75^\circ$. Angle $y^\circ$ and angle $EAB$ form a linear pair, so angle $EAB$ measures $70^\circ$, and since lines $AB$ and $CD$ are parallel, alternate interior angles give angle $EDC = 70^\circ$. In triangle $CED$, $z = 180 - 75 - 70 = 35$.

25.

$$x^2 + x\sqrt{t} + y^2 - y - 28 = 0$$

The given equation, where $t$ is a constant, defines a circle in the $xy$-plane. The radius of this circle is $\sqrt{46}$. What is the value of $t$?
A. $73$
B. $71$
C. $37$
D. $35$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Completing the square gives $\left(x + \frac{\sqrt{t}}{2}\right)^2 + \left(y - \frac{1}{2}\right)^2 = 28 + \frac{t}{4} + \frac{1}{4}$. The radius is $\sqrt{46}$, so $28 + \frac{t}{4} + \frac{1}{4} = 46$. Then $\frac{t}{4} = \frac{71}{4}$, so $t = 71$.

26. In the $xy$-plane, an angle with measure $\theta$ radians is in standard position, where $0 \le \theta \le \frac{\pi}{2}$. If $\cos\left(\frac{\pi}{2} - \theta\right) = \frac{5}{13}$, what is the value of $\tan\theta$?
A. $\dfrac{5}{12}$
B. $\dfrac{12}{13}$
C. $\dfrac{12}{5}$
D. $\dfrac{13}{5}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since $\cos\left(\frac{\pi}{2} - \theta\right) = \sin\theta$, $\sin\theta = \frac{5}{13}$. Because $0 \le \theta \le \frac{\pi}{2}$, $\cos\theta = \sqrt{1 - \frac{25}{169}} = \frac{12}{13}$, so $\tan\theta = \frac{5/13}{12/13} = \frac{5}{12}$.

27. In right triangle $ABC$, angles $A$ and $B$ are acute, side $AC$ has a length of $28.2$, and $\tan B = \frac{1}{3}$. What is the length of side $BC$, rounded to the nearest tenth?
A. $795.2$
B. $84.6$
C. $9.4$
D. $5.3$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since angles $A$ and $B$ are acute, the right angle is at $C$. Side $\overline{AC}$ is opposite angle $B$ and side $\overline{BC}$ is adjacent to it, so $\tan B = \frac{AC}{BC} = \frac{1}{3}$. Then $BC = 3(28.2) = 84.6$.

28.

![Two horizontal parallel lines, r on top and s below, are crossed by three lines t, u, and w. Line t falls from upper left to lower right, and lines u and w rise from lower left to upper right. Lines t and u cross above line r, and angle j is the angle between them that opens upward. Angle g is at the intersection of lines t and r, above r and to the right of t. Angle d is at the intersection of lines w and r, above r and to the right of w. Angle h is at the intersection of lines u and s, above s and to the right of u. Lines t and w cross just below line s, and angle p is the angle between them that opens downward.](tests/images/geometry-d/q28.svg)

In the figure, parallel lines $r$ and $s$ are intersected by lines $t$, $u$, and $w$. If $d = 42$, $g = 143$, and $h > d$, which statement about $j$ and $p$ must be true?
A. $j = p$
B. $j + p = 90$
C. $j > p$
D. $j < p$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Line $t$ makes a $(180 - g)^\circ = 37^\circ$ acute angle with line $r$, and also with line $s$ (corresponding angles). In the triangle formed by lines $r$, $t$, and $u$, the angles measure $37^\circ$, $h^\circ$ (corresponding angles, since $r \parallel s$), and $j^\circ$ (vertical angles), so $j = 143 - h$. In the triangle formed by lines $s$, $t$, and $w$, the angles measure $37^\circ$, $d^\circ = 42^\circ$ (corresponding and vertical angles), and $p^\circ$ (vertical angles), so $p = 101$. Since $h > 42$, $j < 143 - 42 = 101 = p$.

29. The triangle inequality theorem states that the sum of any two sides of a triangle must be greater than the length of the third side. If a triangle has side lengths of $8$ and $13$, which inequality represents the possible lengths, $x$, of the third side of the triangle?
A. $x < 21$
B. $x > 21$
C. $5 < x < 21$
D. $x < 5$ or $x > 21$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The triangle inequality requires $x < 8 + 13 = 21$ and $x + 8 > 13$, so $x > 5$ (the condition $x + 13 > 8$ holds for every positive $x$). Therefore $5 < x < 21$.

30. Square $P$ has a side length of $x$ inches. Square $Q$ has a perimeter that is $32$ inches greater than the perimeter of square $P$. The function $f$ gives the area of square $Q$, in square inches. Which of the following defines $f$?
A. $f(x) = (x + 8)^2$
B. $f(x) = (x + 32)^2$
C. $f(x) = (32x + 8)^2$
D. $f(x) = (32x + 32)^2$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The perimeter of square $Q$ is $4x + 32$, so its side length is $\frac{4x + 32}{4} = x + 8$ inches. Its area is $f(x) = (x + 8)^2$.

31.

![Segment SW slants up from W at the bottom left to S at the top, with point T between them. Segment TU is horizontal, segment UV goes down from U to V at the bottom right, and segment WV is horizontal along the bottom. Angle p is at U, between UT and UV, and angle r is at W, between WT and WV.](tests/images/geometry-d/q31.svg)

*Note: Figure not drawn to scale.*

In the figure shown, point $T$ lies on segment $SW$, and segment $TU$ is parallel to segment $VW$. The measure of angle $V$ is $26^\circ$, and the measure of angle $STU$ is $74^\circ$. What is the value of $p - r$?
Answer: 80
Domain: Geometry and Trigonometry
Explanation: Since $\overline{TU} \parallel \overline{VW}$, angles $STU$ and $SWV$ are corresponding angles, so $r = 74$. Angles $p^\circ$ and $V$ are same-side interior angles between the parallel segments, so $p = 180 - 26 = 154$. Therefore $p - r = 154 - 74 = 80$.

32.

![Three parallel vertical lines a, b, and c, with line b drawn only upward from a marked point. One segment joins a marked point on line a to a lower marked point on line c, and another segment joins the marked point on line b to the same point on line c. Angle w is at the point on line a, between line a below the point and the segment. Angle z is at the point on line b, between line b above the point and the segment. At the point on line c, angle x is between the two segments, and angle y is between the segment from line b and line c above the point.](tests/images/geometry-d/q32.svg)

*Note: Figure not drawn to scale.*

In the figure shown, lines $a$, $b$, and $c$ are parallel. If $201 < x + y + z < 212$, which of the following could be true?

I. $w - y = 22$

II. $w - y = 32$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since $a \parallel c$, the angles $w$ and $x + y$ are alternate interior angles, so $w = x + y$. Since $b \parallel c$, extending line $b$ below its marked point forms an angle of $y$ with the segment to line $c$ (alternate interior angles), and this angle is supplementary to $z$, so $z = 180 - y$. Then $x + y + z = x + 180$, and $201 < x + 180 < 212$ gives $21 < x < 32$. Since $w - y = x$, $w - y = 22$ is possible but $w - y = 32$ is not.

33.

![A right triangle representing a ramp. The horizontal leg is labeled x, the vertical leg on the right is labeled height of the ramp, and the hypotenuse is labeled length of the ramp. The angle theta is between the horizontal leg and the hypotenuse, and the right angle is at the bottom right.](tests/images/geometry-d/q33.svg)

*Note: Figure not drawn to scale.*

According to a US law, ramps for use by the general public must form an angle with level ground such that $\tan\theta \le \frac{1}{12}$. If the ramp in the figure conforms to this law and has a height of $28.4$ inches, what is the least possible value of $x$, in inches?
Answer: 340.8
Domain: Geometry and Trigonometry
Explanation: In the right triangle, $\tan\theta = \frac{28.4}{x}$. The law requires $\frac{28.4}{x} \le \frac{1}{12}$, so $x \ge 12(28.4) = 340.8$. The least possible value of $x$ is $340.8$ inches.

34.

![Right triangle ADE with the right angle at E, A at the left, and D directly above E. Point B is on side AD and point C is on side AE, and segment BC is perpendicular to AE, with a right-angle mark at C.](tests/images/geometry-d/q34.svg)

*Note: Figure not drawn to scale.*

In the figure shown, $AB = \sqrt{89}$ units, $AC = 8$ units, and $CE = 24$ units. What is the area, in square units, of triangle $ADE$?
Answer: 320
Domain: Geometry and Trigonometry
Explanation: In right triangle $ABC$, $BC = \sqrt{89 - 64} = 5$. Triangles $ABC$ and $ADE$ share angle $A$ and each has a right angle, so they are similar. Since $AE = 8 + 24 = 32$, $DE = 5 \cdot \frac{32}{8} = 20$. The area of triangle $ADE$ is $\frac{1}{2}(32)(20) = 320$ square units.

35. A polygon has exactly $57$ sides. If the measure of each of the $57$ interior angles of this polygon is $(180p)^\circ$, what is the value of $p$?
Answer: 55/57
Domain: Geometry and Trigonometry
Explanation: The interior angles of a $57$-sided polygon have a sum of $(57 - 2)(180^\circ) = 55(180^\circ)$. All $57$ angles have the same measure, so each measures $\frac{55}{57}(180^\circ)$, and $p = \frac{55}{57}$.

36.

$$(x + 3)^2 + (y - 18)^2 = 169$$

The graph of the given equation is a circle in the $xy$-plane. The point $(a, b)$ lies on the circle. Which of the following is a possible value for $a$?
A. $-17$
B. $-11$
C. $13$
D. $18$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The circle has center $(-3, 18)$ and radius $\sqrt{169} = 13$, so the $x$-coordinate of any point on it satisfies $-3 - 13 \le a \le -3 + 13$, or $-16 \le a \le 10$. Of the choices, only $-11$ is in this interval (for example, $(-11, 18 + \sqrt{105})$ lies on the circle).

37. The height of a right circular cylinder is $6$ inches longer than its radius, and the surface area of the cylinder is $1{,}080\pi$ square inches. What is the cylinder's radius, in inches?
A. $15$
B. $18$
C. $21$
D. $24$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Let $r$ be the radius; then the height is $r + 6$. The surface area is $2\pi r^2 + 2\pi r(r + 6) = 4\pi r^2 + 12\pi r = 1{,}080\pi$, so $r^2 + 3r - 270 = 0$, or $(r + 18)(r - 15) = 0$. Since $r > 0$, $r = 15$.

38. Circle $F$ in the $xy$-plane is represented by the equation $(x - 13)^2 + (y - 9)^2 = 196$. Circle $G$ is obtained by shifting circle $F$ $5$ units to the left and $11$ units up. An equation representing circle $G$ is $(x + h)^2 + (y + k)^2 = 196$, where $h$ and $k$ are constants. What is the value of $h + k$?
Answer: -28
Domain: Geometry and Trigonometry
Explanation: Circle $F$ has center $(13, 9)$. Shifting it $5$ units to the left and $11$ units up gives center $(8, 20)$, so circle $G$ is $(x - 8)^2 + (y - 20)^2 = 196$. Then $h = -8$ and $k = -20$, so $h + k = -28$.

39.

$$(x - 5)^2 + (y + 3)^2 = 36$$

The given equation represents circle $P$ in the $xy$-plane. Circle $Q$ has a center that is $3$ units to the right of and $2$ units below the center of circle $P$. Circle $Q$ has a diameter that is double the diameter of circle $P$. Which equation represents circle $Q$?
A. $(x - 8)^2 + (y + 5)^2 = 144$
B. $(x - 2)^2 + (y + 1)^2 = 144$
C. $(x - 8)^2 + (y + 5)^2 = 72$
D. $(x - 2)^2 + (y + 1)^2 = 72$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Circle $P$ has center $(5, -3)$ and radius $6$. Circle $Q$ has center $(5 + 3, -3 - 2) = (8, -5)$ and radius $2(6) = 12$, so its equation is $(x - 8)^2 + (y + 5)^2 = 144$.

40. Sphere A and Sphere B are tangent to each other at point $P$. Segment $MP$ is a diameter of Sphere A, segment $NP$ is a diameter of Sphere B, and point $P$ lies on line segment $MN$. The radius of Sphere A is $5$ times the radius of Sphere B. If the volume of Sphere B is $288\pi \text{ in.}^3$, what is the length of segment $MN$ in inches?
Answer: 72
Domain: Geometry and Trigonometry
Explanation: For Sphere B, $\frac{4}{3}\pi r^3 = 288\pi$, so $r^3 = 216$ and $r = 6$ inches. The radius of Sphere A is $5(6) = 30$ inches. Since $P$ lies on $\overline{MN}$, $MN = MP + PN = 2(30) + 2(6) = 72$ inches.

41. A line intersects two parallel lines, forming four acute angles and four obtuse angles. The measure of one of the acute angles is $(9x - 490)^\circ$. The sum of the measures of one of the acute angles and three of the obtuse angles is $(-18x + w)^\circ$. What is the value of $w$?
Answer: 1520
Domain: Geometry and Trigonometry
Explanation: All four acute angles measure $(9x - 490)^\circ$, and each obtuse angle is supplementary to them, measuring $(180 - (9x - 490))^\circ = (670 - 9x)^\circ$. The sum is $(9x - 490) + 3(670 - 9x) = -18x + 1{,}520$, so $w = 1{,}520$.

42.

![A coordinate grid in the xy-plane with grid lines 1 unit apart. The origin is labeled O, and both axes are labeled from 2 to 14 in steps of 2. Three points are marked at (9, 7), (12, 10), and (12, 4).](tests/images/geometry-d/q42.svg)

The three points shown define a circle. The circumference of this circle is $k\pi$, where $k$ is a constant. What is the value of $k$?
A. $3$
B. $6$
C. $9$
D. $12$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The points are $(9, 7)$, $(12, 10)$, and $(12, 4)$. The center is equidistant from $(12, 10)$ and $(12, 4)$, so it lies on the line $y = 7$, and the point $(12, 7)$ is $3$ units from all three points. So the radius is $3$ and the circumference is $2\pi(3) = 6\pi$, which gives $k = 6$.

43. In triangle $ABC$ and triangle $DEF$, sides $AB$ and $DE$ each have a side length of $10$ inches, and angles $A$ and $D$ each have an angle measure of $40^\circ$. Which of the following additional pieces of information is (are) sufficient to prove whether triangle $ABC$ is congruent to triangle $DEF$?

I. The measures of angles $B$ and $C$ are equal.

II. The lengths of sides $AC$ and $DF$ are equal.

III. The lengths of sides $BC$ and $EF$ are equal.
A. I is sufficient, but II and III are not.
B. II is sufficient, but I and III are not.
C. III is sufficient, but I and II are not.
D. II is sufficient and III is sufficient, but I is not.
Answer: B
Domain: Geometry and Trigonometry
Explanation: With statement II, two sides and the included angle of triangle $ABC$ are congruent to those of triangle $DEF$, so the triangles are congruent by SAS. Statement I only shows that angles $B$ and $C$ of triangle $ABC$ each measure $70^\circ$; it gives no information about triangle $DEF$. Statement III gives two sides and a non-included angle (SSA), which does not guarantee congruence. So only II is sufficient.

44. A circle is inscribed in a square such that the circumference of the circle touches the midpoint of each side of the square. The length of the diagonal of the square is $176$ units. What is the area, in square units, of the circle?
A. $3{,}872\pi$
B. $7{,}744\pi$
C. $15{,}488\pi$
D. $30{,}976\pi$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The side length of the square is $\frac{176}{\sqrt{2}} = 88\sqrt{2}$. The diameter of the inscribed circle equals the side length, so the radius is $44\sqrt{2}$ and the area is $\pi(44\sqrt{2})^2 = 3{,}872\pi$ square units.

45. The area of a triangle is equal to $x^2$ square centimeters. The length of the base of the triangle is $2x + 6$ centimeters, and the height of the triangle is $x - 2$ centimeters. What is the value of $x$?
Answer: 6
Domain: Geometry and Trigonometry
Explanation: The area is $\frac{1}{2}(2x + 6)(x - 2) = (x + 3)(x - 2) = x^2 + x - 6$. Setting this equal to $x^2$ gives $x - 6 = 0$, so $x = 6$. (Check: the base is $18$, the height is $4$, and the area is $36 = 6^2$.)
`
});
