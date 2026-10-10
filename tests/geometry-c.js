/*
 * Advanced test: Geometry and Trigonometry C (44 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'geometry-c',
  source: String.raw`
---
title: Geometry and Trigonometry C
author: tungtks18022
description: 44 harder Geometry and Trigonometry questions on lines and angles, congruent and similar triangles, right triangle trigonometry, radians, circles, and area, surface area and volume, with an explanation for every question.
category: Geometry and Trigonometry
section: advanced
time: 70
---

1. In the $xy$-plane, there are $3$ points $a$, $b$, and $c$. Point $a$ has coordinates $(1, 0)$, point $b$ has coordinates $(0, 0)$, and point $c$ has coordinates $(-1, 0)$. Which of the following gives a possible angle measure, in radians, of $\angle abc$?
A. $\dfrac{456\pi}{6}$
B. $\dfrac{459\pi}{6}$
C. $\dfrac{462\pi}{6}$
D. $\dfrac{468\pi}{6}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Points $a$ and $c$ lie on the $x$-axis on opposite sides of $b$, so rays $ba$ and $bc$ point in opposite directions and $\angle abc$ is a straight angle. A possible measure of this angle in radians is therefore $\pi$ plus any whole number of full rotations of $2\pi$, that is, an odd multiple of $\pi$. Since $\frac{462\pi}{6} = 77\pi$, choice C works, while $\frac{456\pi}{6} = 76\pi$, $\frac{459\pi}{6} = 76.5\pi$, and $\frac{468\pi}{6} = 78\pi$ are not odd multiples of $\pi$.

2.

![Quadrilateral KLMN with M at the upper left, N at the upper right, L at the left, and K at the bottom. Sides KL, LM, MN, and NK are drawn; the diagonals are not shown.](tests/images/geometry-c/q2.svg)

*Note: Figure not drawn to scale.*

In quadrilateral $KLMN$ shown, $KL = 3$, $LM = 3$, $KN = 27$, and $MN = 27$. Diagonals $\overline{KM}$ and $\overline{LN}$ (not shown) intersect at point $G$ (not shown), where $GK = 1$ and $GM = 1$. If the length of diagonal $LN$ is $\sqrt{p} + \sqrt{w}$, where $p$ and $w$ are integers, what is the value of $p + w$?
Answer: 736
Domain: Geometry and Trigonometry
Explanation: Since $KL = LM$ and $KN = MN$, points $L$ and $N$ are each equidistant from $K$ and $M$, so diagonal $\overline{LN}$ is the perpendicular bisector of $\overline{KM}$ and meets it at its midpoint $G$. In right triangle $LGK$, $LG = \sqrt{3^2 - 1^2} = \sqrt{8}$, and in right triangle $NGK$, $NG = \sqrt{27^2 - 1^2} = \sqrt{728}$. So $LN = \sqrt{8} + \sqrt{728}$, and $p + w = 8 + 728 = 736$.

3. In triangle $ABC$ and triangle $XYZ$, the measures of angles $A$ and $X$ are each $20^\circ$, and the lengths of $AB$ and $XY$ are each $16$ centimeters. Which of the following additional pieces of information is (are) sufficient to prove that triangle $ABC$ is congruent to triangle $XYZ$?

I. The measures of angles $C$ and $Z$ are each $25^\circ$.

II. $\dfrac{AB}{AC} = \dfrac{XY}{XZ}$
A. I is sufficient, and II is sufficient.
B. II is sufficient, but I is not.
C. Neither I nor II is sufficient.
D. I is sufficient, but II is not.
Answer: A
Domain: Geometry and Trigonometry
Explanation: With I, the triangles have two pairs of congruent angles ($A$ and $X$, $C$ and $Z$) and a pair of congruent corresponding sides ($AB = XY$), so they are congruent by AAS. With II, since $AB = XY$, the equation $\frac{AB}{AC} = \frac{XY}{XZ}$ gives $AC = XZ$; then the congruent angles $A$ and $X$ are included between congruent pairs of sides, so the triangles are congruent by SAS. Each piece of information is sufficient.

4.

![A circle with center Q. Horizontal line m is tangent to the circle at point C at the top of the circle. A segment from Q passes through point B on the circle and meets line m at point P, to the left of C; another segment from Q passes through point D on the circle and meets line m at point A, to the right of C.](tests/images/geometry-c/q4.svg)

The circle shown has center $Q$, and points $B$, $C$, and $D$ lie on the circle. Line $m$ is tangent to the circle at point $C$, and line $m$ is parallel to line segment $BD$ (not shown). Line $DQ$ (not shown) intersects line $m$ at point $A$, and line $BQ$ (not shown) intersects line $m$ at point $P$. If the length of line segment $AQ$ is $90$ and the length of line segment $AC$ is $72$, what is the perimeter of triangle $CPQ$?
Answer: 216
Domain: Geometry and Trigonometry
Explanation: A tangent line is perpendicular to the radius drawn to the point of tangency, so triangle $ACQ$ has a right angle at $C$ and $CQ = \sqrt{90^2 - 72^2} = 54$. Since $\overline{BD} \parallel m$, radius $\overline{QC}$ is perpendicular to chord $\overline{BD}$, so it bisects angle $BQD$; then right triangles $PCQ$ and $ACQ$ are congruent (ASA), which gives $PC = 72$ and $PQ = 90$. The perimeter of triangle $CPQ$ is $72 + 90 + 54 = 216$.

5.

$$2x^2 - x\sqrt{k} + 2y^2 + y\sqrt{t} - 18 = 0$$

The given equation, where $k$ and $t$ are positive constants, defines a circle in the $xy$-plane. The radius of this circle is $\sqrt{57}$. Which expression represents the value of $t$?
A. $156 - k$
B. $k - 624$
C. $624 - k$
D. $768 - k$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Dividing by $2$ gives $x^2 - \frac{\sqrt{k}}{2}x + y^2 + \frac{\sqrt{t}}{2}y = 9$. Completing the square gives $\left(x - \frac{\sqrt{k}}{4}\right)^2 + \left(y + \frac{\sqrt{t}}{4}\right)^2 = 9 + \frac{k}{16} + \frac{t}{16}$. The square of the radius is $57$, so $9 + \frac{k + t}{16} = 57$, which gives $k + t = 768$ and $t = 768 - k$.

6.

$$x^2 + y^2 - 6x - 10y - 4n = 0$$

The given equation represents circle $A$ in the $xy$-plane, where $n$ is a constant. Point $(5, 7)$ lies on circle $B$, which has the same center but twice the diameter of circle $A$. What is the value of $n$?
Answer: -8
Domain: Geometry and Trigonometry
Explanation: Completing the square gives $(x - 3)^2 + (y - 5)^2 = 34 + 4n$, so circle $A$ has center $(3, 5)$ and the square of its radius is $34 + 4n$. Circle $B$ has twice the radius, so the square of its radius is $4(34 + 4n)$. Since $(5, 7)$ lies on circle $B$, $(5 - 3)^2 + (7 - 5)^2 = 8 = 4(34 + 4n)$, so $34 + 4n = 2$ and $n = -8$.

7. A right square pyramid has a surface area of $100 + 20\sqrt{554}$ square inches, which includes a base area of $100$ square inches. What is the height, in inches, of this pyramid?
Answer: 23
Domain: Geometry and Trigonometry
Explanation: The base has area $100$, so each base edge is $10$ inches. The four lateral faces have a combined area of $4 \cdot \frac{1}{2}(10)\ell = 20\ell = 20\sqrt{554}$, so the slant height is $\ell = \sqrt{554}$. The height, the slant height, and half a base edge ($5$) form a right triangle, so the height is $\sqrt{554 - 5^2} = \sqrt{529} = 23$ inches.

8. In the figure below, lines $a$ and $b$ are parallel. What is the value of $x + y$?

![Horizontal parallel lines a (upper) and b (lower) are crossed by two transversals that lean toward each other going up, forming a trapezoid between the lines, and the trapezoid's two diagonals are drawn. At the upper-left vertex, the angle above line a and to the left of the left transversal is labeled 123 degrees. The angle above the point where the diagonals cross is labeled 81 degrees. At the lower-left vertex, the angle between the left transversal and the diagonal is labeled x degrees. At the lower-right vertex, the angle between the right transversal and the diagonal is labeled y degrees, and the angle above line b and to the right of the right transversal is labeled 116 degrees.](tests/images/geometry-c/q8.svg)
Answer: 22
Domain: Geometry and Trigonometry
Explanation: The $123^\circ$ angle is vertical to the trapezoid's interior angle at the upper-left vertex, so because $a \parallel b$, the interior angle at the lower-left vertex measures $180^\circ - 123^\circ = 57^\circ$. The interior angle at the lower-right vertex forms a linear pair with the $116^\circ$ angle, so it measures $64^\circ$. In the triangle formed by line $b$ and the two diagonals, the angle where the diagonals cross is vertical to the $81^\circ$ angle, so the other two angles, which measure $(57 - x)^\circ$ and $(64 - y)^\circ$, sum to $99^\circ$. Then $121 - (x + y) = 99$, so $x + y = 22$.

9. A circle in the $xy$-plane has its center at $(3, -7)$ and has a radius of $12$. An equation of this circle is $x^2 + y^2 + ax + by + c = 0$, where $a$, $b$, and $c$ are constants. What is the value of $c$?
Answer: -86
Domain: Geometry and Trigonometry
Explanation: The circle is $(x - 3)^2 + (y + 7)^2 = 144$. Expanding gives $x^2 - 6x + 9 + y^2 + 14y + 49 = 144$, or $x^2 + y^2 - 6x + 14y - 86 = 0$, so $c = -86$.

10. What is the value of $(\sin x^\circ)\cos(90^\circ - x^\circ) + \sin(90^\circ - x^\circ)(\cos x^\circ)$?
A. $0.5$
B. $1$
C. $2$
D. $90$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The sine of an angle equals the cosine of its complement, so $\cos(90^\circ - x^\circ) = \sin x^\circ$ and $\sin(90^\circ - x^\circ) = \cos x^\circ$. The expression becomes $\sin^2 x^\circ + \cos^2 x^\circ = 1$.

11.

![Points P, Q, R, S, T, and V lie on a horizontal segment, in that order. Below the segment, segments QX and SX meet at point X, and segments RU and TU meet at point U, which is lower than X. Segment RU crosses segment SX at point W.](tests/images/geometry-c/q11.svg)

*Note: Figure not drawn to scale.*

In the figure shown, points $Q$, $R$, $S$, and $T$ lie on line segment $PV$, and line segment $RU$ intersects line segment $SX$ at point $W$. The measure of $\angle SQX$ is $48^\circ$, the measure of $\angle SXQ$ is $86^\circ$, the measure of $\angle SWU$ is $85^\circ$, and the measure of $\angle VTU$ is $162^\circ$. What is the measure, in degrees, of $\angle TUR$?
Answer: 123
Domain: Geometry and Trigonometry
Explanation: In triangle $QXS$, $m\angle QSX = 180^\circ - 48^\circ - 86^\circ = 46^\circ$. Angle $RWS$ forms a linear pair with $\angle SWU$, so it measures $95^\circ$, and in triangle $RWS$, $m\angle WRS = 180^\circ - 46^\circ - 95^\circ = 39^\circ$; this is also angle $TRU$. Angle $RTU$ forms a linear pair with $\angle VTU$, so it measures $18^\circ$. In triangle $RTU$, $m\angle TUR = 180^\circ - 39^\circ - 18^\circ = 123^\circ$.

12.

![A football shape made of a right circular cylinder with a right circular cone attached to each base. The height of the cylinder is labeled 6 in, the radius of its top base is labeled 3 in, and the height of each cone is labeled 3 in.](tests/images/geometry-c/q12.svg)

A futuristic football is built from two right circular cones and a right circular cylinder with internal measurements represented by the figure above. Of the following, which is closest to the volume of the football, in cubic inches?
A. $56.1$
B. $169.6$
C. $197.9$
D. $226.2$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The cylinder and both cones have radius $3$ inches. The cylinder's volume is $\pi(3^2)(6) = 54\pi$, and each cone's volume is $\frac{1}{3}\pi(3^2)(3) = 9\pi$. The total volume is $54\pi + 2(9\pi) = 72\pi \approx 226.2$ cubic inches.

13. In triangle $ABC$ and triangle $DEF$, sides $BC$ and $EF$ each have a side length of $37$ inches, and angles $B$ and $E$ each have an angle measure of $63^\circ$. Which of the following additional pieces of information is (are) sufficient to prove whether triangle $ABC$ is congruent to triangle $DEF$?

I. The measures of angles $A$ and $C$ are equal.

II. The lengths of sides $AC$ and $DF$ are equal.

III. The measures of angles $A$ and $D$ are equal.
A. I is sufficient, but II and III are not.
B. II is sufficient, but I and III are not.
C. III is sufficient, but I and II are not.
D. II and III are sufficient, but I is not.
Answer: C
Domain: Geometry and Trigonometry
Explanation: Statement I only says that triangle $ABC$ is isosceles; it gives no information about triangle $DEF$. Statement II gives the sides $AC$ and $DF$ opposite the $63^\circ$ angles, which is the SSA case: when $37\sin 63^\circ < AC < 37$, two different triangles are possible, so it is not sufficient. Statement III gives two pairs of congruent angles ($B$ and $E$, $A$ and $D$) and the congruent sides $BC = EF$, so the triangles are congruent by AAS.

14. Points $A$ and $B$ lie on a circle with radius $1$, and arc $\overset{\frown}{AB}$ has length $\dfrac{\pi}{3}$. What fraction of the circumference of the circle is the length of arc $\overset{\frown}{AB}$?
Answer: 1/6
Domain: Geometry and Trigonometry
Explanation: The circumference of the circle is $2\pi(1) = 2\pi$. The arc is $\frac{\pi}{3} \div 2\pi = \frac{1}{6}$ of the circumference.

15. Triangle $ABC$ is similar to triangle $DEF$, where $A$ corresponds to $D$ and $C$ corresponds to $F$. Angles $C$ and $F$ are right angles. If $\tan(A) = \sqrt{3}$, and $DF = 125$, what is the length of $\overline{DE}$?
A. $\dfrac{125\sqrt{3}}{3}$
B. $\dfrac{125\sqrt{3}}{2}$
C. $125\sqrt{3}$
D. $250$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $\tan A = \sqrt{3}$, angle $A$ measures $60^\circ$, so angle $D$ also measures $60^\circ$. In right triangle $DEF$, $\overline{DF}$ is the leg adjacent to angle $D$ and $\overline{DE}$ is the hypotenuse, so $\cos 60^\circ = \frac{DF}{DE}$, or $\frac{1}{2} = \frac{125}{DE}$. Therefore $DE = 250$.

16. In triangle $RST$, angle $T$ is a right angle, point $L$ lies on $\overline{RS}$, point $K$ lies on $\overline{ST}$, and $\overline{LK}$ is parallel to $\overline{RT}$. If the length of $\overline{RT}$ is $72$ units, the length of $\overline{LK}$ is $24$ units, and the area of triangle $RST$ is $792$ square units, what is the length of $\overline{KT}$, in units?
Answer: 44/3
Domain: Geometry and Trigonometry
Explanation: The legs of the right triangle are $\overline{RT}$ and $\overline{ST}$, so $\frac{1}{2}(72)(ST) = 792$, which gives $ST = 22$. Since $\overline{LK} \parallel \overline{RT}$, triangle $LSK$ is similar to triangle $RST$, so $\frac{SK}{ST} = \frac{LK}{RT} = \frac{24}{72} = \frac{1}{3}$ and $SK = \frac{22}{3}$. Therefore $KT = 22 - \frac{22}{3} = \frac{44}{3}$.

17. In the figure shown, line segments $AC$ and $DE$ are parallel. The measure of angle $ACB$ is $58^\circ$, and $AB = 1.5DB$.

![Triangle ABC with side AC at the top and vertex B at the bottom. Point D lies on side AB and point E lies on side BC, and segment DE is parallel to AC.](tests/images/geometry-c/q17.svg)

What is the measure, in degrees, of angle $DEB$? (Disregard the degree symbol when entering your answer.)
Answer: 58
Domain: Geometry and Trigonometry
Explanation: Since $\overline{AC} \parallel \overline{DE}$, angles $DEB$ and $ACB$ are corresponding angles formed by transversal $\overline{BC}$, so they are congruent. Therefore angle $DEB$ measures $58^\circ$. (The ratio $AB = 1.5DB$ is not needed.)

18. A circle in the $xy$-plane has a diameter with endpoints $(a, 11)$ and $(a, d)$, where $a$ and $d$ are constants. An equation of this circle is

$$(x - a)^2 + (y - 17)^2 = r^2,$$

where $r$ is a positive constant. What is the value of $d$?
A. $5$
B. $12$
C. $17$
D. $23$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The center of the circle, $(a, 17)$, is the midpoint of the diameter, so $\frac{11 + d}{2} = 17$. Then $11 + d = 34$ and $d = 23$.

19. A circle in the $xy$-plane has its center at $(-4, -7)$. Line $k$ is tangent to this circle at the point $(-7, -8)$. What is the slope of line $k$?
A. $-3$
B. $-\dfrac{1}{3}$
C. $\dfrac{1}{3}$
D. $3$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The radius to the point of tangency has slope $\frac{-8 - (-7)}{-7 - (-4)} = \frac{-1}{-3} = \frac{1}{3}$. A tangent line is perpendicular to this radius, so the slope of line $k$ is the negative reciprocal, $-3$.

20. In triangle $RST$, $RS = ST$, and the length of $\overline{RT}$ is $48$ units. If $\tan R = \dfrac{7}{24}$, what is the area, in square units, of triangle $RST$?
A. $168$
B. $288$
C. $84$
D. $336$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since $RS = ST$, the altitude from $S$ meets base $\overline{RT}$ at its midpoint, $24$ units from $R$. Then $\tan R = \frac{h}{24} = \frac{7}{24}$, so the height is $h = 7$. The area is $\frac{1}{2}(48)(7) = 168$ square units.

21.

![Right triangle TUV with the right angle at U. Side VU is horizontal and labeled 68, T is directly above U, and angle V is labeled 24 degrees.](tests/images/geometry-c/q21.svg)

*Note: Figure not drawn to scale.*

Triangle $TUV$ is dilated by a scale factor of $\dfrac{1}{2}$ to obtain triangle $T'U'V'$ (not shown), where $T$ corresponds to $T'$ and $U$ corresponds to $U'$. What is the measure, in degrees, of angle $V'$?
A. $68$
B. $24$
C. $34$
D. $48$
Answer: B
Domain: Geometry and Trigonometry
Explanation: A dilation changes side lengths but preserves angle measures. Angle $V'$ corresponds to angle $V$, which measures $24^\circ$, so angle $V'$ also measures $24^\circ$.

22. A polygon with $22$ sides has a perimeter of $131$ inches. The length of one side is $5$ inches. The other $21$ sides have equal lengths. What is the length, in inches, of one of the $21$ sides with equal lengths?
Answer: 6
Domain: Geometry and Trigonometry
Explanation: The other $21$ sides have a combined length of $131 - 5 = 126$ inches, so each of them has length $\frac{126}{21} = 6$ inches.

23. A circle in the $xy$-plane has its center at $(-7, 2)$, and the point $(1, -2)$ lies on the circle. Which equation represents this circle?
A. $(x + 7)^2 + (y - 2)^2 = 80$
B. $(x + 7)^2 + (y - 2)^2 = 36$
C. $(x - 7)^2 + (y + 2)^2 = 80$
D. $(x - 7)^2 + (y + 2)^2 = 36$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The square of the radius is the square of the distance from the center to $(1, -2)$: $(1 - (-7))^2 + (-2 - 2)^2 = 64 + 16 = 80$. With center $(-7, 2)$, the equation is $(x + 7)^2 + (y - 2)^2 = 80$.

24. Triangle $ABC$ is similar to triangle $XYZ$, where $A$, $B$, and $C$ correspond to $X$, $Y$, and $Z$, respectively. In triangle $ABC$, the length of $\overline{AB}$ is $130$ and the length of $\overline{BC}$ is $650$. In triangle $XYZ$, the length of $\overline{YZ}$ is $70$. What is the length of $\overline{XY}$?
A. $14$
B. $70$
C. $144$
D. $182$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Corresponding sides of similar triangles are proportional, so $\frac{XY}{YZ} = \frac{AB}{BC} = \frac{130}{650} = \frac{1}{5}$. Therefore $XY = \frac{70}{5} = 14$.

25. A right circular cone has a volume of $4{,}800\pi$ cubic centimeters, and the area of its base is $1{,}600\pi$ square centimeters. What is the slant height, in centimeters, of this cone?
A. $3$
B. $9$
C. $40$
D. $41$
Answer: D
Domain: Geometry and Trigonometry
Explanation: From $\pi r^2 = 1{,}600\pi$, the radius is $r = 40$. From $\frac{1}{3}(1{,}600\pi)h = 4{,}800\pi$, the height is $h = 9$. The radius, height, and slant height form a right triangle, so the slant height is $\sqrt{40^2 + 9^2} = \sqrt{1{,}681} = 41$ centimeters.

26.

![Horizontal parallel lines m (upper) and n (lower). Line CD crosses line m at D and line n at C, and line AE crosses line m at E and line n at A. The two lines intersect at point B between lines m and n, with D to the left of E on line m and A to the left of C on line n.](tests/images/geometry-c/q26.svg)

*Note: Figure not drawn to scale.*

In the figure, line $m$ is parallel to line $n$, and lines $AE$ and $CD$ intersect at point $B$. Which additional piece of information is sufficient to prove that triangle $ABC$ is congruent to triangle $EBD$?
A. $AB = 31$ and $DB = 31$.
B. $AB = 31$ and $EB = 31$.
C. Triangles $ABC$ and $EBD$ are isosceles.
D. No additional information is necessary to determine that the two triangles are congruent.
Answer: B
Domain: Geometry and Trigonometry
Explanation: Angles $ABC$ and $EBD$ are vertical angles, and because $m \parallel n$, angles $BAC$ and $BED$ are congruent alternate interior angles, as are angles $BCA$ and $BDE$. So the triangles are similar, with $A$, $B$, and $C$ corresponding to $E$, $B$, and $D$, but they can have different sizes. Choice B gives a pair of congruent corresponding sides, $AB = EB$, so the triangles are congruent by ASA. In choice A, $\overline{AB}$ and $\overline{DB}$ are not corresponding sides, and choice C does not fix the size of either triangle.

27. Triangle $ABC$ is similar to triangle $XYZ$ such that $A$, $B$, and $C$ correspond to $X$, $Y$, and $Z$, respectively. The length of each side of triangle $ABC$ is $n$ times the length of its corresponding side in triangle $XYZ$, where $n$ is an integer greater than $1$. The measure of angle $C$ is $59$ degrees, and $YZ = 74$. Which of the following must be true?
A. $BC = \dfrac{74}{n}$
B. $BC = 74n$
C. The measure of angle $Z$ is $\dfrac{59}{n}$ degrees.
D. The measure of angle $Z$ is $59n$ degrees.
Answer: B
Domain: Geometry and Trigonometry
Explanation: Side $\overline{BC}$ corresponds to side $\overline{YZ}$, so $BC = n(YZ) = 74n$. Corresponding angles of similar triangles are congruent, so angle $Z$ measures $59$ degrees, not $\frac{59}{n}$ or $59n$ degrees.

28.

![Right triangle ADE with the right angle at D, vertex A at the top, and vertex E at the lower right. Point B lies on side AD and point C lies on side AE, and segment BC is parallel to DE. The angle at C between CB and CA is labeled x degrees.](tests/images/geometry-c/q28.svg)

*Note: Figure not drawn to scale.*

In the figure, $\overline{BC}$ is parallel to $\overline{DE}$. If the length of $\overline{DE}$ is $162$ and the length of $\overline{AE}$ is $270$, what is the value of $\tan x^\circ$?
A. $\dfrac{270}{162}$
B. $\dfrac{216}{162}$
C. $\dfrac{162}{270}$
D. $\dfrac{162}{216}$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $\overline{BC} \parallel \overline{DE}$, angle $ACB$ and angle $AED$ are corresponding angles, so angle $AED$ also measures $x^\circ$. In right triangle $ADE$, $AD = \sqrt{270^2 - 162^2} = \sqrt{46{,}656} = 216$. So $\tan x^\circ = \frac{AD}{DE} = \frac{216}{162}$.

29.

![Triangle XYZ with Y at the top, X at the lower left, and Z at the lower right. Point V lies on side XY and point W lies on side YZ, and segment VW is drawn. Segment YV is labeled a, segment VX is labeled c, segment YW is labeled b, segment WZ is labeled d, segment VW is labeled 35, and side XZ is labeled 65.](tests/images/geometry-c/q29.svg)

*Note: Figure not drawn to scale.*

In triangle $XYZ$, $\dfrac{a}{c} = k$ and $\dfrac{b}{d} = k$. What is the value of $k$?
Answer: 7/6
Domain: Geometry and Trigonometry
Explanation: Since $\frac{a}{c} = \frac{b}{d}$, segment $\overline{VW}$ divides sides $\overline{XY}$ and $\overline{YZ}$ proportionally, so it is parallel to $\overline{XZ}$ and triangle $YVW$ is similar to triangle $YXZ$. Then $\frac{VW}{XZ} = \frac{YV}{YX} = \frac{a}{a + c} = \frac{k}{k + 1}$, so $\frac{k}{k + 1} = \frac{35}{65} = \frac{7}{13}$. This gives $13k = 7k + 7$, so $k = \frac{7}{6}$.

30. In a triangle $ABC$ with sides $6$ and $19$ and an angle of $x^\circ$ between them, the expression $k \cdot \sin x^\circ$ represents the area of the triangle. What is the value of $k$?
Answer: 57
Domain: Geometry and Trigonometry
Explanation: Using one of the given sides, $6$, as the base, the height to that base is $19\sin x^\circ$. So the area is $\frac{1}{2}(6)(19\sin x^\circ) = 57\sin x^\circ$, and $k = 57$.

31. A right square pyramid has a surface area of $100 + 20\sqrt{146}$ square inches, which includes a base area of $100$ square inches. What is the height, in inches, of this pyramid?
Answer: 11
Domain: Geometry and Trigonometry
Explanation: The base has area $100$, so each base edge is $10$ inches. The four lateral faces have a combined area of $4 \cdot \frac{1}{2}(10)\ell = 20\ell = 20\sqrt{146}$, so the slant height is $\ell = \sqrt{146}$. The height, the slant height, and half a base edge ($5$) form a right triangle, so the height is $\sqrt{146 - 5^2} = \sqrt{121} = 11$ inches.

32.

![Two right circular cylinders side by side: a larger one labeled Cylinder A and a smaller one labeled Cylinder B.](tests/images/geometry-c/q32.svg)

*Note: Figure not drawn to scale.*

Cylinder $A$ is similar to cylinder $B$. The volume of cylinder $A$ is $5.13$ cubic units, and the volume of cylinder $B$ is $1.52$ cubic units. The surface area of cylinder $A$ is $22.41$ square units. What is the surface area, in square units, of cylinder $B$?
Answer: 9.96
Domain: Geometry and Trigonometry
Explanation: The ratio of the volumes is $\frac{1.52}{5.13} = \frac{8}{27} = \left(\frac{2}{3}\right)^3$, so each length of cylinder $B$ is $\frac{2}{3}$ of the corresponding length of cylinder $A$, and the ratio of the surface areas is $\left(\frac{2}{3}\right)^2 = \frac{4}{9}$. The surface area of cylinder $B$ is $\frac{4}{9}(22.41) = 9.96$ square units.

33.

![Two horizontal parallel lines: the upper one passes through A and B, and the lower one passes through C and D. Line AD and line BC cross at point E between the parallel lines. At B, the angle above the upper line and to the left of line BC is labeled y degrees. At E, the angle to the right of E, between EB and ED, is labeled x degrees. At D, the angle below the lower line and to the left of line AD is labeled z degrees.](tests/images/geometry-c/q33.svg)

*Note: Figure not drawn to scale.*

In the figure, line $AB$ is parallel to line $CD$, and line $AD$ intersects line $BC$ at point $E$. If $y = 111$ and $z = 118$, what is the value of $x$?
A. $59$
B. $62$
C. $131$
D. $139$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The angle marked $y^\circ$ forms a linear pair with angle $ABE$, so $m\angle ABE = 180^\circ - 111^\circ = 69^\circ$; similarly, $m\angle CDE = 180^\circ - 118^\circ = 62^\circ$. Since $AB \parallel CD$, angle $BAE$ and angle $CDE$ are alternate interior angles, so $m\angle BAE = 62^\circ$. In triangle $ABE$, $m\angle AEB = 180^\circ - 69^\circ - 62^\circ = 49^\circ$, and angle $BED$, marked $x^\circ$, forms a linear pair with it, so $x = 180 - 49 = 131$.

34.

![Isosceles triangle ABC with B at the top, A at the lower left, and C at the lower right. Side AB is labeled 44, a dimension line beside side BC is also labeled 44, and angle B is labeled 36 degrees. Point D lies on side BC, and segment AD is drawn; arcs at A mark the two angles BAD and DAC.](tests/images/geometry-c/q34.svg)

*Note: Figure not drawn to scale.*

For isosceles triangle $ABC$, $AB = BC = 44$, the measure of angle $ABC$ is $36^\circ$, point $D$ lies on $\overline{BC}$, and $\angle BAC$ is bisected by $\overline{AD}$. Which of the following statements must be true?
A. $AB = AC = BC$
B. $AD = BD = AC$
C. $BD = CD = AC$
D. $AB = BD = AD$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The base angles are $m\angle BAC = m\angle BCA = \frac{1}{2}(180^\circ - 36^\circ) = 72^\circ$, so the bisector gives $m\angle BAD = m\angle DAC = 36^\circ$. In triangle $ABD$, the angles at $A$ and $B$ both measure $36^\circ$, so $AD = BD$. In triangle $ADC$, $m\angle ADC = 180^\circ - 36^\circ - 72^\circ = 72^\circ = m\angle ACD$, so $AD = AC$. Therefore $AD = BD = AC$.

35. The height of a right circular cylinder is $59$ inches, and the circumference of its base is $590$ inches. Which expression represents the total surface area, in square inches, of the cylinder?
A. $(59)(590)$
B. $\pi\left(\dfrac{295}{\pi}\right)^2(59)$
C. $(59)(590) + \pi\left(\dfrac{295}{\pi}\right)^2$
D. $(59)(590) + 2\pi\left(\dfrac{295}{\pi}\right)^2$
Answer: D
Domain: Geometry and Trigonometry
Explanation: From $2\pi r = 590$, the radius is $r = \frac{295}{\pi}$. The lateral surface area is the circumference times the height, $(59)(590)$, and the two circular bases have a combined area of $2\pi r^2 = 2\pi\left(\frac{295}{\pi}\right)^2$. So the total surface area is $(59)(590) + 2\pi\left(\frac{295}{\pi}\right)^2$.

36. Triangle $ABC$ is similar to triangle $XYZ$, where $A$ and $B$ correspond to $X$ and $Y$, respectively. The length of each side of triangle $XYZ$ is $k$ times the length of its corresponding side in triangle $ABC$, where $k$ is an integer greater than $1$. The measure, in degrees, of angle $Z$ can be represented by the expression $9x + 29$, where $x$ is an integer. Which of the following expressions represents the measure, in degrees, of angle $C$ for all possible values of $x$?
A. $9x + 29$
B. $k(9x + 29)$
C. $90 - (9x + 29)$
D. $180 - k(9x + 29)$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since $A$ and $B$ correspond to $X$ and $Y$, vertex $C$ corresponds to vertex $Z$. Corresponding angles of similar triangles are congruent regardless of the scale factor $k$, so angle $C$ measures $9x + 29$ degrees.

37.

![A circle in the xy-plane centered at the origin O. The marked point (8, 0) is where the circle crosses the positive x-axis, and the marked point (2, k) lies on the circle in the first quadrant.](tests/images/geometry-c/q37.svg)

*Note: Figure not drawn to scale.*

The circle shown has its center at $(0, 0)$. What is the value of $k$?
A. $6$
B. $7$
C. $8$
D. $\sqrt{60}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The point $(8, 0)$ lies on the circle, so the radius is $8$ and the circle's equation is $x^2 + y^2 = 64$. Substituting $(2, k)$ gives $4 + k^2 = 64$, so $k^2 = 60$. The point is above the $x$-axis, so $k = \sqrt{60}$.

38. The height of a right circular cylinder is $36$ inches, and the circumference of its base is $360$ inches. Which expression represents the total surface area, in square inches, of the cylinder?
A. $(36)(360) + 2\pi\left(\dfrac{180}{\pi}\right)^2$
B. $(36)(360) + \pi\left(\dfrac{180}{\pi}\right)^2$
C. $\pi\left(\dfrac{180}{\pi}\right)^2(36)$
D. $(36)(360)$
Answer: A
Domain: Geometry and Trigonometry
Explanation: From $2\pi r = 360$, the radius is $r = \frac{180}{\pi}$. The lateral surface area is the circumference times the height, $(36)(360)$, and the two circular bases have a combined area of $2\pi r^2 = 2\pi\left(\frac{180}{\pi}\right)^2$. So the total surface area is $(36)(360) + 2\pi\left(\frac{180}{\pi}\right)^2$.

39. In the $xy$-plane, an equation of circle $R$ is $(x + 8)^2 + (y + 19)^2 = 100$. Circle $S$ is obtained by shifting circle $R$ to the right $3$ units. An equation defining circle $S$ is $(x + h)^2 + (y + k)^2 = 100$, where $h$ and $k$ are constants. What is the value of $h$?
Answer: 5
Domain: Geometry and Trigonometry
Explanation: Circle $R$ has center $(-8, -19)$. Shifting it $3$ units to the right moves the center to $(-5, -19)$, so circle $S$ is $(x + 5)^2 + (y + 19)^2 = 100$ and $h = 5$.

40. The length of a rectangle is $45$ inches and the width is $x$ inches. The perimeter is at most $150$ inches. Which inequality represents this situation?
A. $2x + 45 \le 150$
B. $2x + 45 \ge 150$
C. $2x + 90 \le 150$
D. $2x + 90 \ge 150$
Answer: C
Domain: Algebra
Explanation: The perimeter of the rectangle is $2(45) + 2x = 2x + 90$ inches. "At most $150$" means less than or equal to $150$, so $2x + 90 \le 150$.

41. The measure of angle $F$ is $145$ degrees. The measure of angle $G$ is $\dfrac{\pi}{3}$ radians less than the measure of angle $F$. The measure of angle $H$ is $10$ degrees more than the measure of angle $G$. What is the measure of angle $H$, in radians?
A. $\dfrac{48\pi}{36}$
B. $\dfrac{17\pi}{18}$
C. $\dfrac{25\pi}{18}$
D. $\dfrac{19\pi}{36}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $\frac{\pi}{3}$ radians equals $60^\circ$, angle $G$ measures $145^\circ - 60^\circ = 85^\circ$, and angle $H$ measures $85^\circ + 10^\circ = 95^\circ$. In radians, this is $95 \cdot \frac{\pi}{180} = \frac{19\pi}{36}$.

42.

![Right triangles QPR and STR share vertex R on a horizontal line. P is to the left of R and T is to the right of R, with right angles at P and T; Q is directly above P and S is directly above T. Angle QRP and angle SRT are each labeled x degrees.](tests/images/geometry-c/q42.svg)

*Note: Figure not drawn to scale.*

$\triangle QPR$ is similar to $\triangle STR$. The lengths represented by $\overline{ST}$, $\overline{QP}$, $\overline{PR}$, and $\overline{QR}$ in the figure are $17$, $21$, $28$, and $35$, respectively. What is the length of $\overline{SR}$?
A. $\dfrac{595}{21}$
B. $\dfrac{595}{28}$
C. $\dfrac{357}{28}$
D. $\dfrac{357}{35}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: In the similarity $\triangle QPR \sim \triangle STR$, $Q$, $P$, and $R$ correspond to $S$, $T$, and $R$, so $\frac{SR}{QR} = \frac{ST}{QP}$. Then $SR = 35 \cdot \frac{17}{21} = \frac{595}{21}$.

43. A cube has an edge length of $82$ inches. A solid sphere with a radius of $41$ inches is inside the cube, such that the sphere touches the center of each face of the cube. To the nearest cubic inch, what is the volume of the space in the cube not taken up by the sphere?
A. $262{,}672$
B. $288{,}532$
C. $334{,}846$
D. $546{,}087$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The cube's volume is $82^3 = 551{,}368$ cubic inches, and the sphere's volume is $\frac{4}{3}\pi(41^3) = \frac{4}{3}\pi(68{,}921) \approx 288{,}695.6$ cubic inches. The space not taken up by the sphere is about $551{,}368 - 288{,}695.6 \approx 262{,}672$ cubic inches.

44. In triangle $RST$, the measure of angle $R$ is $10$ degrees and the measure of angle $T$ is $50$ degrees. Point $L$ lies on $RS$, point $K$ lies on $ST$, and $LK$ is parallel to $RT$. What is the measure, in degrees, of angle $SKL$? (Disregard the degree symbol when entering your answer.)
Answer: 50
Domain: Geometry and Trigonometry
Explanation: Since $\overline{LK} \parallel \overline{RT}$, angles $SKL$ and $STR$ are corresponding angles formed by transversal $\overline{ST}$, so they are congruent. Therefore angle $SKL$ measures $50^\circ$.
`
});
