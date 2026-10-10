/*
 * Advanced test: Geometry and Trigonometry B (45 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'geometry-b',
  source: String.raw`
---
title: Geometry and Trigonometry B
author: tungtks18022
description: 45 harder Geometry and Trigonometry questions on area, surface area and volume, lines and angles, similar triangles, right triangle trigonometry and circles, with an explanation for every question.
category: Geometry and Trigonometry
section: advanced
time: 72
---

1. The figure shown is a trirectangular tetrahedron, a three-dimensional figure with four triangular faces, three of which are right triangles. A chemistry professor uses trirectangular tetrahedrons to create large-scale models of various carbon-based molecules. The base of one of these tetrahedrons is an isosceles right triangle whose legs each have length $14$ inches (in). The height of this tetrahedron is $15$ in. Which of the following is closest to the volume of this tetrahedron, in pints? (Note: $1 \text{ pint} = 0.5 \text{ quarts}$; use $1 \text{ quart} = 57.75 \text{ in}^3$. The volume of a trirectangular tetrahedron is equal to $\frac{1}{3}Sh$, where $S$ is the area of its base and $h$ is its height.)

![A trirectangular tetrahedron drawn in perspective. Three edges meet at one corner, marked with a small cube to show that they are mutually perpendicular: one edge goes straight up to the top vertex and the other two run along the base to the remaining two vertices.](tests/images/geometry-b/q1.svg)

*Note: Figure not drawn to scale.*
A. $14{,}148.75$
B. $16.9$
C. $490.00$
D. $101.82$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The base has area $S = \frac{1}{2}(14)(14) = 98$ square inches, so the volume is $\frac{1}{3}(98)(15) = 490$ cubic inches. That is $\frac{490}{57.75} \approx 8.485$ quarts, and since $1$ pint is $0.5$ quart, it is $\frac{8.485}{0.5} \approx 16.97$ pints, which is closest to $16.9$.

2. In triangle $JKL$, the measure of angle $J$ is $90b^\circ$, the measure of angle $K$ is $66a^\circ$, and the measure of angle $L$ is $24a^\circ$, where $a$ and $b$ are constants. Which of the following must be true?
A. $\cos L > \sin K$
B. $\cos L = \sin K$
C. $\cos L < \sin K$
D. There is not enough information to compare the values of $\cos L$ and $\sin K$.
Answer: D
Domain: Geometry and Trigonometry
Explanation: The angle sum gives $90b + 66a + 24a = 180$, so $a + b = 2$, but $a$ itself is not determined. If $a = 1$, then $K = 66^\circ$ and $L = 24^\circ$ are complementary, so $\cos L = \sin K$. If $a = 0.5$, then $K = 33^\circ$ and $L = 12^\circ$, so $\cos L \approx 0.98$ is greater than $\sin K \approx 0.54$. Since different possible values of $a$ give different comparisons, there is not enough information.

3.

| | Volume (*cubic units*) |
|:---:|:---:|
| Right circular cylinder A | $112\pi$ |
| Right circular cylinder B | $3{,}024\pi$ |

The table shows the volume of two similar solids, right circular cylinder A and right circular cylinder B. The radius of right circular cylinder A is $4$ units. The surface area of right circular cylinder A is $k\pi$ square units, and the surface area of right circular cylinder B is $n\pi$ square units, where $k$ and $n$ are constants. What is the value of $n - k$? The surface area of a right circular cylinder with radius $r$ and height $h$ is $2\pi r^2 + 2\pi rh$.
Answer: 704
Domain: Geometry and Trigonometry
Explanation: For cylinder A, $\pi(4^2)h = 112\pi$, so $h = 7$ and its surface area is $2\pi(16) + 2\pi(4)(7) = 88\pi$; thus $k = 88$. The volume ratio is $\frac{3{,}024\pi}{112\pi} = 27 = 3^3$, so the scale factor is $3$ and surface areas are multiplied by $3^2 = 9$: $n = 9(88) = 792$. Therefore $n - k = 792 - 88 = 704$.

4.

![A right circular cylinder. An arrow from the center of the top base to its edge is labeled r, and a vertical arrow beside the cylinder is labeled h.](tests/images/geometry-b/q4.svg)

The figure shown is a right circular cylinder with a radius of $r$ and a height of $h$. A second right circular cylinder (not shown) has a volume that is $576$ times as large as the volume of the cylinder shown. Which of the following could represent the radius $R$, in terms of $r$, and the height $H$, in terms of $h$, of the second cylinder?
A. $R = 9r$ and $H = 8h$
B. $R = 9r$ and $H = 64h$
C. $R = 8r$ and $H = 9h$
D. $R = 64r$ and $H = 9h$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The volumes are $\pi r^2 h$ and $\pi R^2 H$, so the second cylinder needs $R^2 H = 576r^2 h$. Choice C works: $(8r)^2(9h) = 64(9)r^2 h = 576r^2 h$. The other choices give $81(8) = 648$, $81(64) = 5{,}184$ and $64^2(9) = 36{,}864$ times the volume.

5. A right square pyramid has a total surface area of $36{,}864$ square inches, and the combined surface area of the four lateral faces of this pyramid is $20{,}480$ square inches. What is the height, in inches, of this pyramid?
A. $48$
B. $64$
C. $80$
D. $128$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The base has area $36{,}864 - 20{,}480 = 16{,}384$, so each base edge is $\sqrt{16{,}384} = 128$ inches. Each lateral face has area $\frac{20{,}480}{4} = 5{,}120 = \frac{1}{2}(128)\ell$, so the slant height is $\ell = 80$. The height, the slant height and half a base edge ($64$) form a right triangle, so the height is $\sqrt{80^2 - 64^2} = \sqrt{2{,}304} = 48$ inches.

6.

![Right triangle ABC with the right angle at B. The hypotenuse AC is labeled 32.](tests/images/geometry-b/q6.svg)

For triangle $ABC$, the length of $\overline{AB}$ is $11$ less than the length of $\overline{AC}$. Point $D$ (not shown) lies on $\overline{AC}$ such that $\overline{BD}$ (not shown) is perpendicular to $\overline{AC}$. What is the value of $\dfrac{BC}{BD}$?
Answer: 32/21 | 1.524
Domain: Geometry and Trigonometry
Explanation: Angle $B$ is a right angle and $AC = 32$, so $AB = 32 - 11 = 21$. The area of the triangle equals both $\frac{1}{2}(AB)(BC)$ and $\frac{1}{2}(AC)(BD)$, so $(AB)(BC) = (AC)(BD)$ and $\frac{BC}{BD} = \frac{AC}{AB} = \frac{32}{21}$.

7.

![A line segment in the xy-plane with endpoints at (-5, 3) and (4, 9). The x-axis is labeled from -8 to 8 and the y-axis from 2 to 16, in steps of 2.](tests/images/geometry-b/q7.svg)

The line segment shown in the $xy$-plane represents one of the legs of a right triangle. The area of this triangle is $48\sqrt{13}$ square units. What is the length, in units, of the other leg of this triangle?
A. $16$
B. $32$
C. $3\sqrt{13}$
D. $6\sqrt{13}$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The segment's endpoints are $(-5, 3)$ and $(4, 9)$, so its length is $\sqrt{9^2 + 6^2} = \sqrt{117} = 3\sqrt{13}$. If the other leg has length $L$, then $\frac{1}{2}(3\sqrt{13})L = 48\sqrt{13}$, so $L = 32$.

8.

![A right rectangular pyramid. The two base edges meeting at the front corner are labeled ℓ and w, and a dashed segment from the apex down to the center of the base is labeled h.](tests/images/geometry-b/q8.svg)

*Note: Figure not drawn to scale.*

The figure shown is a right rectangular pyramid, where $\ell = 18$ units, $w = 9$ units, and $h = 12$ units. What is the surface area, in square units, of the pyramid?
Answer: 527.7 | 527.6
Domain: Geometry and Trigonometry
Explanation: The base has area $18(9) = 162$. The two triangular faces on the base edges of length $18$ have slant height $\sqrt{12^2 + 4.5^2} = \sqrt{164.25} \approx 12.816$, and the two faces on the base edges of length $9$ have slant height $\sqrt{12^2 + 9^2} = 15$. Each pair of congruent faces has a combined area equal to the base edge times the slant height, so the surface area is $162 + 18(12.816) + 9(15) \approx 162 + 230.69 + 135 = 527.69$, which is entered as $527.7$ (rounded) or $527.6$ (truncated).

9. In triangle $ABC$, angle $C$ is a right angle, point $D$ lies on $\overline{AB}$, point $E$ lies on $\overline{BC}$, and $\overline{DE}$ is parallel to $\overline{AC}$. If the length of $\overline{AB}$ is $39$ units, $\overline{DE}$ is $8$ units, the length of $\overline{AC}$ is greater than the length of $\overline{BC}$, and the area of triangle $ABC$ is $270$ square units, what is the length of $\overline{BE}$, in units?
Answer: 10/3
Domain: Geometry and Trigonometry
Explanation: Let $AC = p$ and $BC = q$. Then $p^2 + q^2 = 39^2 = 1{,}521$ and $\frac{1}{2}pq = 270$, so $pq = 540$. It follows that $(p + q)^2 = 2{,}601$ and $(p - q)^2 = 441$, so $p + q = 51$ and $p - q = 21$ (since $p > q$), giving $AC = 36$ and $BC = 15$. Triangle $DBE$ is similar to triangle $ABC$, so $\frac{BE}{BC} = \frac{DE}{AC}$, or $BE = 15\left(\frac{8}{36}\right) = \frac{10}{3}$.

10.

![Right triangle RST with the right angle at T, where R is at the top and S at the bottom right. Point X lies on hypotenuse RS near R and point Z lies on RS near S. Segment XY is horizontal, parallel to TS, and segment YZ is vertical, so triangle XYZ has a right angle at Y.](tests/images/geometry-b/q10.svg)

*Note: Figure not drawn to scale.*

In triangles $RST$ and $XYZ$ shown, $\overline{XY}$ is parallel to $\overline{TS}$ and $\tan R = \dfrac{180}{299}$. What is the value of $\sin X$ in triangle $XYZ$?
A. $\dfrac{299}{349}$
B. $\dfrac{180}{349}$
C. $\dfrac{180}{479}$
D. $\dfrac{299}{180}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: In right triangle $RST$, $\tan R = \frac{TS}{RT} = \frac{180}{299}$, so the sides are $TS = 180k$, $RT = 299k$ and $RS = \sqrt{180^2 + 299^2}\,k = 349k$ for some $k > 0$. Since $\overline{XY} \parallel \overline{TS}$, angle $X$ of triangle $XYZ$ and angle $S$ are alternate interior angles formed by transversal $\overline{RS}$, so they are congruent. Therefore $\sin X = \sin S = \frac{RT}{RS} = \frac{299}{349}$.

11. In triangle $ABC$, the measure of angle $A$ is $30^\circ$ and the measure of angle $B$ is $90^\circ$. If the length of side $BC$ is $38$ centimeters, what is the length, in centimeters, of side $AB$?
A. $38\sqrt{3}$
B. $38\sqrt{2}$
C. $38$
D. $76$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Angle $B$ is the right angle, so $\overline{BC}$ is the leg opposite the $30^\circ$ angle $A$ and $\overline{AB}$ is the leg opposite the $60^\circ$ angle $C$. In a $30^\circ$-$60^\circ$-$90^\circ$ triangle, the leg opposite $60^\circ$ is $\sqrt{3}$ times the leg opposite $30^\circ$, so $AB = 38\sqrt{3}$.

12. For which of the following triangles is $\cos P = \dfrac{1}{2}$?
A. ![Right triangle PQR with the right angle at Q. Hypotenuse PR is labeled 76 and leg QR is labeled 38.|170](tests/images/geometry-b/q12a.svg)
B. ![Right triangle PQR with the right angle at Q. Hypotenuse PR is labeled 76 and angle R is labeled 60 degrees.|170](tests/images/geometry-b/q12b.svg)
C. ![Right triangle PQR with the right angle at Q. Hypotenuse PR is labeled 76 and angle R is labeled 30 degrees.|170](tests/images/geometry-b/q12c.svg)
D. ![Right triangle PQR with the right angle at Q. Leg PQ is labeled 38 and leg QR is labeled 76.|170](tests/images/geometry-b/q12d.svg)
Answer: C
Domain: Geometry and Trigonometry
Explanation: The value of $\cos P$ is $\frac{1}{2}$ when angle $P$ measures $60^\circ$. In choice C, angle $Q$ is a right angle and angle $R$ measures $30^\circ$, so angle $P$ measures $60^\circ$; indeed $PQ = 76\sin 30^\circ = 38$ and $\cos P = \frac{38}{76} = \frac{1}{2}$. In choice A, $\sin P = \frac{38}{76} = \frac{1}{2}$, so $P = 30^\circ$; in choice B, $P = 90^\circ - 60^\circ = 30^\circ$; in choice D, $\tan P = \frac{76}{38} = 2$, so $P$ is not $60^\circ$.

13.

![A line segment in the xy-plane with endpoints at (-7, 4) and (5, 7). The x-axis is labeled from -8 to 8 and the y-axis from 2 to 14, in steps of 2.](tests/images/geometry-b/q13.svg)

The line segment shown in the $xy$-plane represents $\overline{JK}$ of isosceles triangle $JKL$, where side $\overline{JL}$ is congruent to side $\overline{KL}$. The perimeter of this triangle is $13\sqrt{17}$ units. What is the length, in units, of side $\overline{JL}$ of this triangle?
A. $\sqrt{17}$
B. $3\sqrt{17}$
C. $5\sqrt{17}$
D. $10\sqrt{17}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The endpoints are $(-7, 4)$ and $(5, 7)$, so $JK = \sqrt{12^2 + 3^2} = \sqrt{153} = 3\sqrt{17}$. Since $JL = KL$, the perimeter is $2(JL) + 3\sqrt{17} = 13\sqrt{17}$, so $JL = 5\sqrt{17}$.

14. In triangle $XYZ$, the measure of angle $X$ is $90^\circ$. Point $W$ lies on segment $YZ$, and segment $WX$ is perpendicular to segment $YZ$. The length of segment $WY$ is $668$, and the length of segment $WX$ is $501$. What is the value of $\tan Z$?
A. $\dfrac{3}{5}$
B. $\dfrac{3}{4}$
C. $\dfrac{4}{5}$
D. $\dfrac{4}{3}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Angle $WXY$ and angle $Z$ are both complementary to angle $Y$ (in right triangles $XWY$ and $XYZ$), so they are congruent. In right triangle $XWY$, $\tan(\angle WXY) = \frac{WY}{WX} = \frac{668}{501} = \frac{4}{3}$. Therefore $\tan Z = \frac{4}{3}$.

15. A right rectangular prism has a height of $24$ inches. The length of the prism's base is $x$ inches, which is $10$ inches more than the width of the prism's base. Which function $V$ gives the volume of the prism, in cubic inches, in terms of the length of the prism's base?
A. $V(x) = x(x + 24)(x + 10)$
B. $V(x) = x(x + 24)(x - 10)$
C. $V(x) = 24x(x + 10)$
D. $V(x) = 24x(x - 10)$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The length is $x$ inches, so the width is $x - 10$ inches, and the height is $24$ inches. The volume is length times width times height: $V(x) = 24x(x - 10)$.

16. The measure of angle $S$ is $\dfrac{8\pi}{11}$ radians. The measure of angle $T$ is $2$ times the measure of angle $S$. Which expression represents the measure, in degrees, of angle $T$?
A. $\dfrac{8}{11}(90)(2)$
B. $\dfrac{8}{11}(180)(2)$
C. $\dfrac{8}{11\pi}(90)(2)$
D. $\dfrac{8\pi}{11}(180)(2)$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $\pi$ radians equals $180^\circ$, angle $S$ measures $\frac{8\pi}{11} \cdot \frac{180}{\pi} = \frac{8}{11}(180)$ degrees. Angle $T$ is $2$ times as large, so it measures $\frac{8}{11}(180)(2)$ degrees.

17.

![Two triangles. Small triangle DEF has side DE labeled f, side EF labeled d, and side DF labeled e. Larger triangle QRS has side QR labeled kf, side RS labeled kd, and side QS labeled ke.](tests/images/geometry-b/q17.svg)

*Note: Figure not drawn to scale.*

In the figure, $d$, $e$, and $f$ are constants and the value of $k$ is $3$. If the measures of angles $D$, $E$, and $F$ are $30^\circ$, $x^\circ$, and $(2x + 6)^\circ$, respectively, what is the measure, in degrees, of angle $S$?
Answer: 102
Domain: Geometry and Trigonometry
Explanation: The sides $QR = kf$, $RS = kd$ and $QS = ke$ of triangle $QRS$ are $k$ times the corresponding sides $DE = f$, $EF = d$ and $DF = e$ of triangle $DEF$, so the triangles are similar, with angle $S$ corresponding to angle $F$. In triangle $DEF$, $30 + x + (2x + 6) = 180$, so $x = 48$ and angle $F$ measures $2(48) + 6 = 102^\circ$. Therefore angle $S$ measures $102^\circ$.

18.

![A right circular cone with vertex V at the top. Point O is the center of the circular base, and segment OP is a radius of the base.](tests/images/geometry-b/q18.svg)

*Note: Figure not drawn to scale.*

For the right circular cone shown, $\overline{OP}$ is a radius of the base, and $V$ is the vertex. The cone's lateral surface area, in square meters, is $rL\pi$, where $r$ is the length, in meters, of $\overline{OP}$ and $L$ is the length, in meters, of $\overline{VP}$. The cone has a base area of $16\pi$ square meters and a lateral surface area of $51\pi$ square meters. What is the height of the cone, to the nearest meter?
Answer: 12
Domain: Geometry and Trigonometry
Explanation: From $\pi r^2 = 16\pi$, $r = 4$. From $4L\pi = 51\pi$, the slant height is $L = 12.75$. The height, the radius and the slant height form a right triangle, so the height is $\sqrt{12.75^2 - 4^2} = \sqrt{146.5625} \approx 12.1$, which is $12$ meters to the nearest meter.

19.

$$\begin{gathered} \text{Circle A: } (x - 7)^2 + (y - p)^2 = 21 \\[4pt] \text{Circle B: } (x + 7)^2 + (y - p)^2 = 21 \end{gathered}$$

In the given equations, $p$ is a positive constant. Which statement correctly compares the graphs of circles A and B in the $xy$-plane?
A. Circle B is the reflection of circle A across the $x$-axis.
B. Circle B is the reflection of circle A across the $y$-axis.
C. Circle B is the translation of circle A $14$ units up.
D. Circle B is the translation of circle A $14$ units to the right.
Answer: B
Domain: Geometry and Trigonometry
Explanation: Both circles have radius $\sqrt{21}$. Circle A has center $(7, p)$ and circle B has center $(-7, p)$: the $x$-coordinate changes sign and the $y$-coordinate stays the same, which is a reflection across the $y$-axis. (A translation $14$ units to the right would move the center to $(21, p)$.)

20.

![A circle with center O. Radius OA is horizontal and radius OB is vertical, with a right-angle mark at O. The quarter of the circle between OA and OB is shaded.](tests/images/geometry-b/q20.svg)

*Note: Figure not drawn to scale.*

In the circle, $O$ is the center, and $\angle AOB$ is a right angle. If the area of the shaded region is $37\pi$ square units, what is the length, in units, of $\overline{OA}$?
A. $74$
B. $148$
C. $\sqrt{148}$
D. $\sqrt{592}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The shaded region is a sector with a $90^\circ$ central angle, which is $\frac{1}{4}$ of the circle. So $\frac{1}{4}\pi r^2 = 37\pi$, which gives $r^2 = 148$ and $OA = \sqrt{148}$.

21.

![Points U, V and R lie on a horizontal line, in that order. Segment US rises to point S at the upper right, with point T on it. Segment SV goes down from S to V, and segment TR goes from T to R. The angle at T between TU and TR is labeled x degrees.](tests/images/geometry-b/q21.svg)

*Note: Figure not drawn to scale.*

In the figure, $RT = TU$, the measure of angle $VST$ is $23^\circ$, and the measure of angle $RVS$ is $34^\circ$. What is the value of $x$?
Answer: 158
Domain: Geometry and Trigonometry
Explanation: Angle $RVS$ is an exterior angle of triangle $UVS$, so it equals the sum of the two remote interior angles: $34 = m\angle U + 23$, which gives $m\angle U = 11^\circ$. Since $RT = TU$, triangle $RTU$ is isosceles with $m\angle R = m\angle U = 11^\circ$. Therefore $x = 180 - 11 - 11 = 158$.

22. In triangle $XYZ$, angle $Y$ is a right angle, the measure of angle $Z$ is $39^\circ$, and the length of $\overline{YZ}$ is $22$ units. If the area, in square units, of triangle $XYZ$ can be represented by the expression $k\tan 39^\circ$, where $k$ is a constant, what is the value of $k$?
Answer: 242
Domain: Geometry and Trigonometry
Explanation: Leg $\overline{XY}$ is opposite angle $Z$ and leg $\overline{YZ}$ is adjacent to it, so $XY = 22\tan 39^\circ$. The area is $\frac{1}{2}(22)(22\tan 39^\circ) = 242\tan 39^\circ$, so $k = 242$.

23. The volume of a right rectangular prism with a square base is $2{,}448$ cubic centimeters. If the area of the square base is $144$ square centimeters, what is the area, in square centimeters, of one of the four lateral faces of the prism?
A. $17$
B. $204$
C. $540$
D. $816$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The square base has area $144$, so each base edge is $12$ centimeters. The height is $\frac{2{,}448}{144} = 17$ centimeters. Each lateral face is a $12$ by $17$ rectangle, so its area is $12(17) = 204$ square centimeters.

24.

![Two parallel vertical lines r and s are crossed by line t, which rises from lower left to upper right. The angle labeled x degrees is at the intersection of t and r, to the left of r and below t. The angle labeled y degrees is at the intersection of t and s, to the left of s and above t.](tests/images/geometry-b/q24.svg)

*Note: Figure not drawn to scale.*

In the figure shown, line $r$ is parallel to line $s$, and both lines are intersected by line $t$. If $x = 2w + 24$, $y = 5w + 29$, and $7w = a$, where $a$ is a constant, what is the value of $a$?
Answer: 127
Domain: Geometry and Trigonometry
Explanation: Because $r \parallel s$, the angle marked $x^\circ$ is congruent to the corresponding angle at line $s$ (to the left of $s$ and below $t$), which forms a linear pair with the angle marked $y^\circ$. So $x + y = 180$: $(2w + 24) + (5w + 29) = 180$, which gives $7w + 53 = 180$ and $a = 7w = 127$.

25. Rectangle $ABCD$ is similar to rectangle $EFGH$. The area of rectangle $ABCD$ is $648$ square inches, and the area of rectangle $EFGH$ is $72$ square inches. The length of the longest side of rectangle $ABCD$ is $36$ inches. What is the length, in inches, of the longest side of rectangle $EFGH$?
A. $4$
B. $9$
C. $12$
D. $36$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The ratio of the areas is $\frac{72}{648} = \frac{1}{9}$, so the ratio of corresponding lengths is $\sqrt{\frac{1}{9}} = \frac{1}{3}$. The longest side of rectangle $EFGH$ is $\frac{1}{3}(36) = 12$ inches.

26. In the $xy$-plane, circle $M$ is the graph of the equation $(x + 6a)^2 + (y - 38a)^2 = 36a^2$, where $a$ is a positive constant. Circle $V$ is obtained by shifting circle $M$ $12a$ units to the right. Which equation represents circle $V$?
A. $(x + 18a)^2 + (y - 38a)^2 = 36a^2$
B. $(x + 6a)^2 + (y - 50a)^2 = 36a^2$
C. $(x + 6a)^2 + (y - 26a)^2 = 36a^2$
D. $(x - 6a)^2 + (y - 38a)^2 = 36a^2$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Circle $M$ has center $(-6a, 38a)$ and radius $6a$. Shifting it $12a$ units to the right moves the center to $(-6a + 12a, 38a) = (6a, 38a)$ and keeps the radius, so circle $V$ is $(x - 6a)^2 + (y - 38a)^2 = 36a^2$.

27.

$$x^2 - 6x + y^2 - 4y - 51 = 0$$

In the $xy$-plane, the graph of the given equation is a circle. If this circle is inscribed in a square, what is the perimeter of the square?
A. $16$
B. $32$
C. $64$
D. $204$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Completing the square gives $(x - 3)^2 + (y - 2)^2 = 51 + 9 + 4 = 64$, so the radius is $8$. The side of a square with an inscribed circle equals the circle's diameter, $16$, so the perimeter is $4(16) = 64$.

28. Circle A in the $xy$-plane has the equation $(x + 8)^2 + (y - 8)^2 = 4$. Circle B has the same center as circle A. The radius of circle B is two times the radius of circle A. The equation defining circle B in the $xy$-plane is $(x + 8)^2 + (y - 8)^2 = k$, where $k$ is a constant. What is the value of $k$?
Answer: 16
Domain: Geometry and Trigonometry
Explanation: Circle A has radius $\sqrt{4} = 2$, so circle B has radius $2(2) = 4$, and $k$ is the square of its radius: $k = 4^2 = 16$.

29. The length of each edge of a box is $79$ centimeters. Each side of the box is in the shape of a square. The box does not have a lid. What is the exterior surface area, in square meters, of this box without a lid? ($1$ meter $= 100$ centimeters)
Answer: 3.1205 | 3.121
Domain: Geometry and Trigonometry
Explanation: Each edge is $0.79$ meters, so each square face has area $0.79^2 = 0.6241$ square meters. Without a lid, the box has $5$ faces, so its exterior surface area is $5(0.6241) = 3.1205$ square meters, which is entered as $3.121$ (rounded) or $3.120$ (truncated).

30. The perimeter of an isosceles right triangle is $26 + 26\sqrt{2}$ inches. What is the length, in inches, of the hypotenuse of this triangle?
A. $13$
B. $13\sqrt{2}$
C. $26$
D. $26\sqrt{2}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: If each leg has length $s$, the hypotenuse is $s\sqrt{2}$ and the perimeter is $2s + s\sqrt{2} = s\sqrt{2}\left(\sqrt{2} + 1\right)$. Setting this equal to $26\left(1 + \sqrt{2}\right)$ gives $s\sqrt{2} = 26$, so the hypotenuse is $26$ inches.

31.

![A semicircle on diameter JM with center L, sitting on top of rectangle KMNO. Point K lies on JM between J and L, segment KO goes straight down to O, and MN goes straight down to N; the rectangle has right-angle marks at K, O and N.](tests/images/geometry-b/q31.svg)

*Note: Figure not drawn to scale.*

In the figure shown, $\overline{JM}$ is the diameter and $\overline{LM}$ is the radius of semicircle $L$, and point $K$ is the midpoint of $\overline{JL}$. If the length of $\overline{KL}$ is $13$ units and the length of $\overline{MN}$ is $14$ units, which expression represents the area, in square units, of this figure?
A. $546 + 676\pi$
B. $364 + 676\pi$
C. $546 + 338\pi$
D. $364 + 338\pi$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Since $K$ is the midpoint of $\overline{JL}$, the radius is $JL = 2(13) = 26$, so the semicircle has area $\frac{1}{2}\pi(26)^2 = 338\pi$. Rectangle $KMNO$ has length $KM = KL + LM = 13 + 26 = 39$ and width $MN = 14$, so its area is $39(14) = 546$. The area of the figure is $546 + 338\pi$.

32. A rectangular region of land is divided into $88$ square lots of equal area $R$, in square units. The length of the region is $5.5$ times the width of the region. If the width of the region is $x\sqrt{R}$ units, what is the value of $x$?
Answer: 4
Domain: Geometry and Trigonometry
Explanation: Let the width be $W$. Then the length is $5.5W$, and the area of the region is $5.5W^2 = 88R$. So $W^2 = 16R$ and $W = 4\sqrt{R}$, which gives $x = 4$.

33.

$$x^2 - 16x + y^2 - 10y - 55 = 0$$

In the $xy$-plane, the graph of the given equation is a circle. If this circle is inscribed in a square, what is the perimeter of the square?
A. $24$
B. $48$
C. $96$
D. $220$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Completing the square gives $(x - 8)^2 + (y - 5)^2 = 55 + 64 + 25 = 144$, so the radius is $12$ and the diameter is $24$. The side of the square equals the diameter, so the perimeter is $4(24) = 96$.

34. A circle in the $xy$-plane has its center at $(3, 7)$. Line $t$ is tangent to this circle at the point $(a, -4)$, where $a$ is a constant. The slope of line $t$ is $\dfrac{5}{4}$. What is the value of $a$?
A. $-\dfrac{43}{4}$
B. $-\dfrac{29}{5}$
C. $\dfrac{59}{5}$
D. $\dfrac{67}{4}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: A tangent line is perpendicular to the radius drawn to the point of tangency, so the radius from $(3, 7)$ to $(a, -4)$ has slope $-\frac{4}{5}$. Then $\frac{-4 - 7}{a - 3} = -\frac{4}{5}$, so $4(a - 3) = 55$ and $a = 3 + \frac{55}{4} = \frac{67}{4}$.

35. The function $f(x) = 180(x - 2)$ gives the sum of the interior angles, in degrees, for a polygon with $x$ sides. What is the sum of the interior angles, in degrees, for a polygon with $35$ sides?
Answer: 5940
Domain: Geometry and Trigonometry
Explanation: Substituting $x = 35$ gives $f(35) = 180(35 - 2) = 180(33) = 5{,}940$.

36.

![Triangle XYZ with base XY. A segment from Z perpendicular to XY, with a right-angle mark at its foot, shows the height of the triangle.](tests/images/geometry-b/q36.svg)

*Note: Figure not drawn to scale.*

In the figure shown, the measure of angle $X$ is $52^\circ$. The length of $\overline{XY}$ is $24$ units and the length of $\overline{XZ}$ is $17$ units. What is the area, in square units, of triangle $XYZ$?
A. $204$
B. $408$
C. $204\sin 52^\circ$
D. $408\sin 52^\circ$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The height from $Z$ to $\overline{XY}$ is $XZ\sin 52^\circ = 17\sin 52^\circ$. So the area is $\frac{1}{2}(24)(17\sin 52^\circ) = 204\sin 52^\circ$.

37. In triangle $PQR$, the measure of angle $P$ is $(3x + 5)^\circ$, the measure of angle $Q$ is $(2x + 9)^\circ$, and the measure of angle $R$ is $(4y + 5)^\circ$. If side $\overline{QR}$ is extended through point $R$ to point $S$, and the measure of angle $PRS$ is $(x + y)^\circ$, what is the value of $x + y$?
Answer: 39
Domain: Geometry and Trigonometry
Explanation: Exterior angle $PRS$ equals the sum of the remote interior angles: $x + y = (3x + 5) + (2x + 9)$, so $y = 4x + 14$. It is also supplementary to angle $R$: $(x + y) + (4y + 5) = 180$, so $x + 5y = 175$. Substituting gives $x + 5(4x + 14) = 175$, so $21x = 105$, $x = 5$ and $y = 34$. Therefore $x + y = 39$.

38. Triangle $QRS$ is similar to triangle $FGH$ such that $Q$, $R$, and $S$ correspond to $F$, $G$, and $H$, respectively. Each side of triangle $FGH$ has $\dfrac{1}{4}$ the length of its corresponding side in triangle $QRS$. In triangle $FGH$, the measure of angle $F$ is $35^\circ$, the measure of angle $G$ is $8^\circ$, and $FG = a$. In triangle $QRS$, the measure of angle $Q$ is $b^\circ$ and $QR = 20$. What is the value of $a + b$?
Answer: 40
Domain: Geometry and Trigonometry
Explanation: Side $\overline{FG}$ corresponds to side $\overline{QR}$, so $a = \frac{1}{4}(20) = 5$. Angle $Q$ corresponds to angle $F$, and corresponding angles of similar triangles are congruent, so $b = 35$. Therefore $a + b = 5 + 35 = 40$.

39. Right rectangular prism $X$ is similar to right rectangular prism $Y$. The surface area of right rectangular prism $X$ is $59$ square centimeters ($\text{cm}^2$), and the surface area of right rectangular prism $Y$ is $1{,}475$ $\text{cm}^2$. The volume of right rectangular prism $Y$ is $1{,}500$ cubic centimeters ($\text{cm}^3$). What is the sum of the volumes, in $\text{cm}^3$, of right rectangular prism $X$ and right rectangular prism $Y$?
Answer: 1512
Domain: Geometry and Trigonometry
Explanation: The ratio of the surface areas is $\frac{1{,}475}{59} = 25$, so the ratio of corresponding lengths is $\sqrt{25} = 5$ and the ratio of the volumes is $5^3 = 125$. The volume of prism $X$ is $\frac{1{,}500}{125} = 12$ $\text{cm}^3$, so the sum of the volumes is $12 + 1{,}500 = 1{,}512$ $\text{cm}^3$.

40. Quadrilateral $P'Q'R'S'$ is similar to quadrilateral $PQRS$, where $P$, $Q$, $R$, and $S$ correspond to $P'$, $Q'$, $R'$, and $S'$, respectively. The measure of angle $P$ is $40^\circ$, the measure of angle $Q$ is $70^\circ$, and the measure of angle $R$ is $90^\circ$. The length of each side of $P'Q'R'S'$ is $4$ times the length of each corresponding side of $PQRS$. What is the measure of angle $P'$?
A. $10^\circ$
B. $40^\circ$
C. $50^\circ$
D. $150^\circ$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Corresponding angles of similar figures are congruent; the scale factor of $4$ changes only the side lengths. So angle $P'$ has the same measure as angle $P$, which is $40^\circ$.

41. In triangle $RST$, the measure of angle $R$ is $39^\circ$, the measure of angle $S$ is $x^\circ$, and the measure of angle $T$ is $(5x - 3)^\circ$. Point $L$ lies on $\overline{RS}$, point $K$ lies on $\overline{ST}$, and $\overline{LK}$ is parallel to $\overline{RT}$. What is the measure, in degrees, of angle $SKL$? (Disregard the degree symbol when entering your answer.)
Answer: 117
Domain: Geometry and Trigonometry
Explanation: The angle sum gives $39 + x + (5x - 3) = 180$, so $6x = 144$ and $x = 24$; angle $T$ measures $5(24) - 3 = 117^\circ$. Since $\overline{LK} \parallel \overline{RT}$, angle $SKL$ and angle $STR$ are corresponding angles, so angle $SKL$ measures $117^\circ$.

42.

![Circle A in the xy-plane, centered on the y-axis at (0, 5), crossing the y-axis between 2 and 3 and between 7 and 8. The x-axis is labeled from -8 to 8 and the y-axis from -2 to 14, in steps of 2.](tests/images/geometry-b/q42.svg)

Circle A shown is defined by the equation $x^2 + (y - 5)^2 = 7$. Circle B (not shown) has the same radius but is translated $91$ units to the right. If the equation of circle B is $(x - h)^2 + (y - k)^2 = a$, where $h$, $k$, and $a$ are constants, what is the value of $4a$?
Answer: 28
Domain: Geometry and Trigonometry
Explanation: A translation does not change the radius, so circle B also has $r^2 = 7$; its equation is $(x - 91)^2 + (y - 5)^2 = 7$. Thus $a = 7$ and $4a = 28$.

43. Triangle $ABC$ is inscribed in a circle with a radius of $85$. The length of $\overline{AC}$ is $170$, and the length of $\overline{BC}$ is $168$. What is the value of $\dfrac{AB}{BC}$?
Answer: 13/84
Domain: Geometry and Trigonometry
Explanation: Since $AC = 170 = 2(85)$, side $\overline{AC}$ is a diameter of the circle, so inscribed angle $B$ is a right angle. Then $AB = \sqrt{170^2 - 168^2} = \sqrt{676} = 26$, and $\frac{AB}{BC} = \frac{26}{168} = \frac{13}{84}$.

44.

![Parallel horizontal lines q (upper) and t (lower) are crossed by lines r and s, which intersect each other above line q. The angle labeled a degrees is at the intersection of r and s, between the parts of r and s above that intersection. The angle labeled b degrees is at the intersection of s and q, above q and to the left of s. Below line t, a short ray from the intersection of r and t splits the angle between line t (to the left) and line r (below t) into two angles, each labeled w degrees.](tests/images/geometry-b/q44.svg)

*Note: Figure not drawn to scale.*

In the figure, parallel lines $q$ and $t$ are intersected by lines $r$ and $s$. If $a = 43$ and $b = 122$, what is the value of $w$?
Answer: 101/2 | 50.5
Domain: Geometry and Trigonometry
Explanation: Lines $r$, $s$ and $q$ form a triangle. Its angle where $r$ and $s$ meet is vertical to the angle marked $a^\circ$, so it measures $43^\circ$, and its angle where $s$ meets $q$ is supplementary to the angle marked $b^\circ$, so it measures $180 - 122 = 58^\circ$. Its third angle, where $r$ meets $q$ (above $q$, to the left of $r$), measures $180 - 43 - 58 = 79^\circ$. Because $q \parallel t$, the corresponding angle above $t$ and to the left of $r$ also measures $79^\circ$, so the angle below $t$ and to the left of $r$ measures $180 - 79 = 101^\circ$. This angle is split into the two angles marked $w^\circ$, so $2w = 101$ and $w = 50.5$.

45. In right triangle $ABC$, angle $C$ is the right angle and $BC = 162$. Point $D$ on side $\overline{AB}$ is connected by a line segment with point $E$ on side $\overline{AC}$ such that line segment $\overline{DE}$ is parallel to side $\overline{BC}$ and $CE = 2AE$. What is the length of line segment $\overline{DE}$?
Answer: 54
Domain: Geometry and Trigonometry
Explanation: Since $CE = 2AE$, $AC = AE + CE = 3AE$, so $\frac{AE}{AC} = \frac{1}{3}$. Because $\overline{DE} \parallel \overline{BC}$, triangle $ADE$ is similar to triangle $ABC$, so $DE = \frac{1}{3}(BC) = \frac{1}{3}(162) = 54$.
`
});
