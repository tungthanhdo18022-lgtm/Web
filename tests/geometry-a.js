/*
 * Advanced test: Geometry and Trigonometry A (45 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'geometry-a',
  source: String.raw`
---
title: Geometry and Trigonometry A
author: tungtks18022
description: 45 harder Geometry and Trigonometry questions on lines and angles, similar and congruent triangles, right triangle trigonometry, circles and the unit circle, and area and volume, with an explanation for every question.
category: Geometry and Trigonometry
section: advanced
time: 72
---

1. Two lines intersect at exactly one point, forming two acute angles and two obtuse angles. The measure of one of these angles is $(9x - 190)^\circ$. Which of the following could NOT be the sum of the measures of any two of these angles?
A. $(-18x + 380)^\circ$
B. $(-18x + 740)^\circ$
C. $(18x - 380)^\circ$
D. $180^\circ$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Vertical angles are congruent and adjacent angles are supplementary, so each of the four angles measures either $(9x - 190)^\circ$ or $180^\circ - (9x - 190)^\circ = (370 - 9x)^\circ$. The possible sums of two angles are $2(9x - 190) = 18x - 380$, $2(370 - 9x) = -18x + 740$, and $(9x - 190) + (370 - 9x) = 180$. So $(-18x + 380)^\circ$ could not be such a sum.

2. Point $N$ lies on a unit circle in the $xy$-plane and has coordinates $(1, 0)$. Point $O$ is the center of the circle and has coordinates $(0, 0)$. Point $M$ also lies on the unit circle, and the measure of angle $NOM$ is $\dfrac{272\pi}{3}$ radians. If the coordinates of point $M$ are $(a, b)$, where $a$ and $b$ are constants, what is the value of $a$?
A. $\dfrac{1}{2}$
B. $\dfrac{\sqrt{3}}{2}$
C. $-\dfrac{1}{2}$
D. $-\dfrac{\sqrt{3}}{2}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Since $\frac{272\pi}{3} = 90\pi + \frac{2\pi}{3}$ and $90\pi$ is $45$ full rotations, point $M$ is in the same position as the point for an angle of $\frac{2\pi}{3}$ radians. So $a = \cos\frac{2\pi}{3} = -\frac{1}{2}$.

3. The perimeter of an equilateral triangle is $642$ centimeters. The three vertices of the triangle lie on a circle. The radius of the circle is $w\sqrt{3}$ centimeters. What is the value of $w$?
Answer: 214/3
Domain: Geometry and Trigonometry
Explanation: Each side of the triangle is $\frac{642}{3} = 214$ centimeters. The center of the circle is the centroid of the equilateral triangle, so the radius is $\frac{2}{3}$ of the height: $\frac{2}{3} \cdot \frac{214\sqrt{3}}{2} = \frac{214\sqrt{3}}{3}$. Therefore $w = \frac{214}{3}$.

4. A right square pyramid has a height of $11$ centimeters (cm). A second right square pyramid has a height of $22$ centimeters. The area of the base of each of the two pyramids is $100$ $\text{cm}^2$. Which of the following is closest to the difference in the surface area of the second pyramid and the surface area of the first pyramid, in $\text{cm}^2$?
A. $209$
B. $220$
C. $367$
D. $551$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Each base is a square with side length $10$ cm, so the bases have equal areas and the difference comes from the four triangular faces. A pyramid with height $h$ has slant height $\sqrt{h^2 + 5^2}$, so its lateral area is $4 \cdot \frac{1}{2}(10)\sqrt{h^2 + 25} = 20\sqrt{h^2 + 25}$. The difference is $20\sqrt{509} - 20\sqrt{146} \approx 451.2 - 241.7 \approx 209.6$, which is closest to $209$.

5. A line intersects two parallel lines, forming four acute angles and four obtuse angles. The measure of one of these eight angles is $(7x - 250)^\circ$. The sum of the measures of four of the eight angles is $k^\circ$. Which of the following could NOT be equivalent to $k$, for all values of $x$?
A. $-14x + 1{,}540$
B. $14x - 320$
C. $-28x + 1{,}720$
D. $360$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Four of the angles measure $(7x - 250)^\circ$, and the other four are supplementary to them, so they measure $(430 - 7x)^\circ$. If $n$ of the four chosen angles measure $(7x - 250)^\circ$, the sum is $n(7x - 250) + (4 - n)(430 - 7x)$, which for $n = 0, 1, 2, 3, 4$ gives $-28x + 1{,}720$, $-14x + 1{,}040$, $360$, $14x - 320$, and $28x - 1{,}000$. So $-14x + 1{,}540$ could not be equivalent to $k$.

6. In triangle $ABC$, the measure of angle $A$ is $52^\circ$ and $AC = 35$. In triangle $PQR$, the measure of angle $P$ is $52^\circ$ and $PR = 105$. Which additional piece of information is sufficient to prove that triangle $ABC$ is similar to triangle $PQR$?
A. $AB = 30$ and $PQ = 30$.
B. $AB = 30$ and $QR = 90$.
C. The measures of angle $B$ and angle $R$ are $34^\circ$ and $94^\circ$, respectively.
D. The measures of angle $B$ and angle $Q$ are $52^\circ$ and $34^\circ$, respectively.
Answer: C
Domain: Geometry and Trigonometry
Explanation: With choice C, angle $C$ measures $180^\circ - 52^\circ - 34^\circ = 94^\circ$ and angle $Q$ measures $180^\circ - 52^\circ - 94^\circ = 34^\circ$. So angles $A$, $B$, and $C$ are congruent to angles $P$, $Q$, and $R$, respectively, and the triangles are similar by angle-angle similarity. Choice A gives $\frac{AB}{PQ} = 1 \ne \frac{AC}{PR} = \frac{1}{3}$, choice B does not give the other side that includes angle $P$, and in choice D the angles do not match.

7.

![A coordinate grid in the xy-plane with three marked points at (-3, 4), (5, 3), and (4, -3). The x-axis is labeled from -5 to 7 and the y-axis from -5 to 10.](tests/images/geometry-a/q7.svg)

What is the area, in square units, of the triangle formed by connecting the three points shown?
Answer: 49/2 | 24.5
Domain: Geometry and Trigonometry
Explanation: The points are $(-3, 4)$, $(5, 3)$, and $(4, -3)$. The triangle fits in the rectangle with $-3 \le x \le 5$ and $-3 \le y \le 4$, whose area is $8 \cdot 7 = 56$. Subtracting the three right triangles outside the triangle, with areas $\frac{1}{2}(8)(1) = 4$, $\frac{1}{2}(1)(6) = 3$, and $\frac{1}{2}(7)(7) = 24.5$, leaves $56 - 31.5 = 24.5$ square units.

8. A circle has center $G$, and points $M$ and $N$ lie on the circle. Line segments $MH$ and $NH$ are tangent to the circle at points $M$ and $N$, respectively. If the radius of the circle is $168$ millimeters and the perimeter of quadrilateral $GMHN$ is $3{,}856$ millimeters, what is the distance, in millimeters, between points $G$ and $H$?
A. $168$
B. $1{,}752$
C. $1{,}760$
D. $1{,}768$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The two tangent segments from $H$ are equal, so $2(168) + 2(MH) = 3{,}856$, which gives $MH = 1{,}760$. A tangent is perpendicular to the radius at the point of tangency, so triangle $GMH$ is a right triangle and $GH = \sqrt{168^2 + 1{,}760^2} = \sqrt{3{,}125{,}824} = 1{,}768$.

9.

![A circle with point a at the top, point c at the upper right, and point b at the lower right. Two chords are drawn from an unlabeled point on the lower left of the circle, one to c and one to b, and the angle between them is labeled 35 degrees.](tests/images/geometry-a/q9.svg)

For the given circle, the measure of arc $abc$ is $(130 + 7x)$ degrees and the measure of arc $acb$ is $(90 + 3x)$ degrees. What is the value of $x$?
Answer: 21
Domain: Geometry and Trigonometry
Explanation: The $35^\circ$ inscribed angle intercepts arc $cb$, so arc $cb$ measures $2(35^\circ) = 70^\circ$. Arcs $abc$ and $acb$ together cover the whole circle once and arc $cb$ a second time, so $(130 + 7x) + (90 + 3x) = 360 + 70$. Then $220 + 10x = 430$, so $x = 21$ (arc $abc$ measures $277^\circ$ and arc $acb$ measures $153^\circ$).

10. A conservation specialist hung artificial nesting structures each in the shape of a right rectangular prism for a species of native duck. Each structure has a height of $12$ inches. The length of each structure's base is $x$ inches, which is $1$ inch more than the width of the structure's base. Which function $V$ gives the volume of each structure, in cubic inches, in terms of the length of the structure's base?
A. $V(x) = x(x + 12)(x + 1)$
B. $V(x) = x(x + 12)(x - 1)$
C. $V(x) = 12x(x + 1)$
D. $V(x) = 12x(x - 1)$
Answer: D
Domain: Advanced Math
Explanation: The length is $x$ inches, so the width is $x - 1$ inches, and the height is $12$ inches. The volume is length times width times height: $V(x) = x(x - 1)(12) = 12x(x - 1)$.

11. A circle has diameters $\overline{AC}$ and $\overline{BD}$. The circumference of the circle is $84\pi$, and the length of arc $DA$ is $2$ times the length of arc $AB$. What is the length of arc $BC$?
A. $2\pi$
B. $14\pi$
C. $21\pi$
D. $28\pi$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $\overline{BD}$ is a diameter, arcs $DA$ and $AB$ together form a semicircle of length $42\pi$, so $3(AB) = 42\pi$, arc $AB$ has length $14\pi$, and arc $DA$ has length $28\pi$. Central angles $BOC$ and $DOA$ are vertical angles, where $O$ is the center, so arc $BC$ has the same length as arc $DA$: $28\pi$.

12. Triangle $ABC$ is similar to triangle $DEF$, where angle $A$ corresponds to angle $D$ and angles $C$ and $F$ are right angles. The length of $AB$ is $2.4$ times the length of $DE$. If $\tan A = \dfrac{21}{20}$, what is the value of $\sin D$?
Answer: 21/29
Domain: Geometry and Trigonometry
Explanation: Corresponding angles of similar triangles are congruent, so $\sin D = \sin A$. Since $\tan A = \frac{21}{20}$, the leg opposite angle $A$ and the leg adjacent to it can be $21$ and $20$, so the hypotenuse is $\sqrt{21^2 + 20^2} = 29$. Therefore $\sin D = \sin A = \frac{21}{29}$; the scale factor $2.4$ does not affect the answer.

13. In isosceles triangle $ABC$, sides $AB$ and $AC$ are congruent. Point $D$ divides side $BC$ such that the length of $\overline{BD}$ is $\dfrac{5}{7}$ of the length of $\overline{BC}$. Point $E$ lies on side $AB$ and point $F$ lies on side $AC$ such that when segments $DE$ and $DF$ are drawn, angle $BED$ is congruent to angle $CFD$. If the length of $\overline{BE}$ is $10$, what is the length of $\overline{CF}$?
A. $4$
B. $14$
C. $50$
D. $70$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since $AB = AC$, angles $B$ and $C$ are congruent, and angles $BED$ and $CFD$ are congruent, so triangles $BED$ and $CFD$ are similar, with $B$, $E$, $D$ corresponding to $C$, $F$, $D$. Since $BD = \frac{5}{7}BC$, it follows that $CD = \frac{2}{7}BC$, so $\frac{BE}{CF} = \frac{BD}{CD} = \frac{5}{2}$. Therefore $CF = \frac{2}{5}(10) = 4$.

14. For each of the two rectangles, the ratio of the rectangle's length to its width is $10$ to $5$. The width of rectangle $X$ is $16.5$ times the width of rectangle $Y$. How does the length of rectangle $X$ compare to the length of rectangle $Y$?
A. The length of rectangle $X$ is $0.5$ times the length of rectangle $Y$.
B. The length of rectangle $X$ is $2$ times the length of rectangle $Y$.
C. The length of rectangle $X$ is $16.5$ times the length of rectangle $Y$.
D. The length of rectangle $X$ is $33$ times the length of rectangle $Y$.
Answer: C
Domain: Geometry and Trigonometry
Explanation: In each rectangle the length is $2$ times the width. If rectangle $Y$ has width $w$, rectangle $X$ has width $16.5w$, so the lengths are $2w$ and $33w$. The length of rectangle $X$ is $\frac{33w}{2w} = 16.5$ times the length of rectangle $Y$.

15. Triangles $JKL$ and $PQR$ are congruent, where $J$ corresponds to $P$, and $K$ corresponds to $Q$. The measure of angle $J$ is $45^\circ$, the measure of angle $K$ is $10^\circ$, and the measure of angle $L$ is $125^\circ$. What is the measure, in degrees, of angle $P$? (Disregard the degree symbol when entering your answer.)
Answer: 45
Domain: Geometry and Trigonometry
Explanation: Corresponding angles of congruent triangles are congruent. Since $J$ corresponds to $P$, angle $P$ measures $45^\circ$.

16. A rectangle is inscribed in a circle such that the length of the diagonal of the rectangle is twice the length of its shortest side. The circumference of the circle is $114\pi$ units. What is the area, in square units, of the rectangle?
A. $57\sqrt{2}$
B. $57\sqrt{3}$
C. $3{,}249\sqrt{2}$
D. $3{,}249\sqrt{3}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The diagonal of an inscribed rectangle is a diameter of the circle, so its length is $114$. Because the diagonal is twice the shorter side, the diagonal and two sides form a $30^\circ$-$60^\circ$-$90^\circ$ triangle, so the sides are $57$ and $57\sqrt{3}$. The area is $57 \cdot 57\sqrt{3} = 3{,}249\sqrt{3}$ square units.

17.

![Triangle ABC, with vertex A at the top left, B at the top right, and C at the bottom; the angle at A is labeled 60 degrees and side AC is labeled d. A larger triangle XYZ has the same orientation, with X at the top left, Y at the top right, and Z at the bottom.](tests/images/geometry-a/q17.svg)

*Note: Figures not drawn to scale.*

For the triangles shown, triangle $ABC$ is dilated by a scale factor of $3$ to obtain triangle $XYZ$, where $d = 16$. What is the measure, in degrees, of angle $X$?
A. $20$
B. $57$
C. $60$
D. $63$
Answer: C
Domain: Geometry and Trigonometry
Explanation: A dilation preserves angle measures, and angle $X$ corresponds to angle $A$. So angle $X$ measures $60^\circ$; the value of $d$ affects only the side lengths.

18. Triangles $ABC$ and $DEF$ are similar, where $A$ corresponds to $D$, and $B$ corresponds to $E$. The measure of angle $A$ is $26^\circ$, and $AB = 4$. Which of the following statements must be true?

I. The measure of angle $D$ is $26^\circ$.

II. $DE = 4$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Geometry and Trigonometry
Explanation: Corresponding angles of similar triangles are congruent, so angle $D$ measures $26^\circ$ and statement I must be true. Corresponding sides are proportional but not necessarily equal, so $DE$ need not be $4$ and statement II need not be true.

19. In triangle $FGH$ and triangle $KLM$, the measures of angles $G$ and $L$ are each $60^\circ$. The lengths of $GH$ and $LM$ are each $34$ centimeters, and $\dfrac{GH}{GF} = \dfrac{LM}{LK}$. Which additional piece of information would be necessary to prove that triangle $FGH$ is congruent to triangle $KLM$?
A. The lengths of $FG$ and $KM$ are each $17$ centimeters.
B. The measures of angles $H$ and $M$ are each $30^\circ$.
C. The measures of angles $F$ and $K$ are each $90^\circ$.
D. No additional information is necessary.
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $GH = LM$ and $\frac{GH}{GF} = \frac{LM}{LK}$, it follows that $GF = LK$. So sides $GF$ and $GH$ and the included angle $G$ of triangle $FGH$ are congruent to sides $LK$ and $LM$ and the included angle $L$ of triangle $KLM$, and the triangles are congruent by side-angle-side. No additional information is necessary.

20. A right rectangular prism has a base area of $28p$ square centimeters ($\text{cm}^2$). The length of the base of the rectangular prism is $12$ cm, and the height of the rectangular prism is $4$ cm. Which expression represents the surface area, in $\text{cm}^2$, of the right rectangular prism?
A. $\dfrac{512p}{3}$
B. $\dfrac{224p}{3} + 96$
C. $56p + 192$
D. $560p + 96$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The width of the base is $\frac{28p}{12} = \frac{7p}{3}$ cm. The surface area is the two bases plus four side faces: $2(28p) + 2(12)(4) + 2\left(\frac{7p}{3}\right)(4) = 56p + 96 + \frac{56p}{3} = \frac{224p}{3} + 96$.

21.

![Segments WZ and XY intersect at point Q, forming triangle WQX on the left and triangle YQZ on the right. The angle at W in triangle WQX and the angle at Y in triangle YQZ are each labeled a degrees.](tests/images/geometry-a/q21.svg)

*Note: Figure not drawn to scale.*

In the figure shown, $\overline{WZ}$ and $\overline{XY}$ intersect at point $Q$, $YQ = 36$, $WQ = 90$, $WX = 70$, and $XQ = 150$. What is the length of $\overline{YZ}$?
A. $28$
B. $60$
C. $150$
D. $175$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Angles $XWQ$ and $ZYQ$ both measure $a^\circ$, and angles $WQX$ and $YQZ$ are vertical angles, so triangle $WQX$ is similar to triangle $YQZ$, with $W$ corresponding to $Y$ and $X$ corresponding to $Z$. The scale factor is $\frac{YQ}{WQ} = \frac{36}{90} = 0.4$, so $YZ = 0.4(WX) = 0.4(70) = 28$.

22.

![A figure made of rectangle WXYZ, with W at the top left, X at the top right, Y at the bottom right, and Z at the bottom left, and a semicircle on top whose diameter is side WX.](tests/images/geometry-a/q22.svg)

*Note: Figure not drawn to scale.*

The figure shown consists of a rectangle and a semicircle, where the length of $\overline{WX}$ is $20$ units, and the length of $\overline{WZ}$ is $5$ units. The diameter of the semicircle is $\overline{WX}$. Which of the following expressions represents the area, in square units, of the figure?
A. $20 \times 5 + 5\pi$
B. $20 \times 5 + 10\pi$
C. $20 \times 5 + 50\pi$
D. $20 \times 5 + 100\pi$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The rectangle has area $20 \times 5$. The semicircle has diameter $20$, so its radius is $10$ and its area is $\frac{1}{2}\pi(10)^2 = 50\pi$. The area of the figure is $20 \times 5 + 50\pi$.

23.

![Segments LQ and MP intersect at point R. Point M is above segment LQ near its left end L, point P is below it, and segments LM and PQ complete triangle LMR on the left and triangle QPR on the right.](tests/images/geometry-a/q23.svg)

*Note: Figure not drawn to scale.*

In the figure, $LQ$ intersects $MP$ at point $R$, and $LM$ is parallel to $PQ$. The lengths of $MR$, $LR$, and $RP$ are $9$, $10$, and $19$, respectively. What is the length of $LQ$?
A. $\dfrac{280}{19}$
B. $\dfrac{190}{9}$
C. $\dfrac{271}{9}$
D. $\dfrac{280}{9}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $LM \parallel PQ$, alternate interior angles are congruent, and the angles at $R$ are vertical angles, so triangle $LMR$ is similar to triangle $QPR$. Then $\frac{RQ}{LR} = \frac{RP}{MR} = \frac{19}{9}$, so $RQ = \frac{19}{9}(10) = \frac{190}{9}$. Therefore $LQ = 10 + \frac{190}{9} = \frac{280}{9}$.

24.

![Right triangle ABC with the right angle at B. Vertex A is at the top, B at the bottom left, and C at the bottom right; the hypotenuse AC is labeled 28.](tests/images/geometry-a/q24.svg)

*Note: Figure not drawn to scale.*

For triangle $ABC$, the length of $\overline{AB}$ is $11$ less than the length of $\overline{AC}$. Point $D$ (not shown) lies on $\overline{AC}$ such that $\overline{BD}$ (not shown) is perpendicular to $\overline{AC}$. What is the value of $\dfrac{BC}{BD}$?
Answer: 28/17
Domain: Geometry and Trigonometry
Explanation: From the figure, $AC = 28$, so $AB = 28 - 11 = 17$. The area of triangle $ABC$ can be written as $\frac{1}{2}(AB)(BC)$ or as $\frac{1}{2}(AC)(BD)$, so $(AB)(BC) = (AC)(BD)$. Therefore $\frac{BC}{BD} = \frac{AC}{AB} = \frac{28}{17}$.

25.

![A pond with point P at its top edge and point T at its bottom edge; segment PT across the pond is labeled x feet. Segments PR and TS cross at point Q to the right of the pond, and segment SR joins S and R, forming triangle PTQ and triangle RSQ.](tests/images/geometry-a/q25.svg)

*Note: Figure not drawn to scale.*

A property owner wants to find the length $x$, in feet, across a pond as represented in the figure. $\overline{PR}$ intersects $\overline{ST}$ at point $Q$, and $\angle PTQ$ is congruent to $\angle RSQ$. The lengths represented by $PQ$, $TQ$, $QS$, and $RS$ were determined to be $4{,}200$ feet, $8{,}400$ feet, $1{,}400$ feet, and $1{,}600$ feet, respectively. What is the value of $x$?
Answer: 9600
Domain: Geometry and Trigonometry
Explanation: Angles $PTQ$ and $RSQ$ are congruent, and angles $PQT$ and $RQS$ are vertical angles, so triangle $PTQ$ is similar to triangle $RSQ$, with $T$ corresponding to $S$ and $P$ corresponding to $R$. The scale factor is $\frac{TQ}{SQ} = \frac{8{,}400}{1{,}400} = 6$, so $x = PT = 6(RS) = 6(1{,}600) = 9{,}600$.

26. A circle in the $xy$-plane has a diameter with endpoints $(a, 11)$ and $(a, d)$, where $a$ and $d$ are constants. An equation of this circle is $(x - a)^2 + (y - 17)^2 = r^2$, where $r$ is a positive constant. What is the value of $d$?
A. $5$
B. $12$
C. $17$
D. $23$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The center of the circle, $(a, 17)$, is the midpoint of the diameter, so $\frac{11 + d}{2} = 17$. Therefore $11 + d = 34$ and $d = 23$.

27.

$$(x - 3)^2 + (y + 7)^2 = 25$$

The given equation represents circle $P$ in the $xy$-plane. Circle $Q$ has a center that is $1$ unit to the right of and $2$ units below the center of circle $P$. Circle $Q$ has a diameter that is double the diameter of circle $P$. Which equation represents circle $Q$?
A. $(x - 2)^2 + (y + 5)^2 = 50$
B. $(x - 4)^2 + (y + 9)^2 = 50$
C. $(x - 2)^2 + (y + 5)^2 = 100$
D. $(x - 4)^2 + (y + 9)^2 = 100$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Circle $P$ has center $(3, -7)$ and radius $5$. Circle $Q$ has center $(3 + 1, -7 - 2) = (4, -9)$ and radius $2(5) = 10$, so its equation is $(x - 4)^2 + (y + 9)^2 = 10^2 = 100$.

28.

![A right circular cone with apex A at the top. Point B is on the circumference of the base, at the front of the base.](tests/images/geometry-a/q28.svg)

*Note: Figure not drawn to scale.*

For the right circular cone shown, $B$ is a point on the circumference of the base, and the length of segment $AB$ (not shown) is $32$ centimeters. If the height of the cone is $16$ centimeters and the volume of the cone is $k\pi$ cubic centimeters, what is the value of $k$?
Answer: 4096
Domain: Geometry and Trigonometry
Explanation: Segment $AB$ is a slant height, so the height, the radius $r$, and $AB$ form a right triangle: $r^2 = 32^2 - 16^2 = 768$. The volume is $\frac{1}{3}\pi r^2 h = \frac{1}{3}\pi(768)(16) = 4{,}096\pi$ cubic centimeters, so $k = 4{,}096$.

29.

![Segments LQ and MP intersect at point R. Point M is above segment LQ near its left end L, point P is below it, and segments LM and PQ complete triangle LMR on the left and triangle PQR on the right.](tests/images/geometry-a/q29.svg)

*Note: Figure not drawn to scale.*

In the figure, $\overline{LQ}$ intersects $\overline{MP}$ at point $R$, and $\overline{LM}$ is parallel to $\overline{PQ}$. The lengths of $\overline{MR}$ and $\overline{RP}$ are $8$ and $14$ units, respectively. The area of $\triangle LMR$ is $36$ square units. What is the area of $\triangle PQR$, in square units?
A. $\dfrac{576}{49}$
B. $\dfrac{144}{7}$
C. $63$
D. $\dfrac{441}{4}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $\overline{LM} \parallel \overline{PQ}$, alternate interior angles are congruent, and the angles at $R$ are vertical angles, so triangle $LMR$ is similar to triangle $QPR$ with scale factor $\frac{RP}{MR} = \frac{14}{8} = \frac{7}{4}$. Areas of similar figures scale by the square of the scale factor, so the area of $\triangle PQR$ is $36\left(\frac{7}{4}\right)^2 = \frac{441}{4}$ square units.

30. In triangle $ABC$, the measure of angle $B$ is $90^\circ$ and $\overline{BD}$ is the altitude of the triangle. The length of $\overline{AB}$ is $14$ and the length of $\overline{AC}$ is $15$ greater than the length of $\overline{AB}$. What is the value of $\dfrac{BC}{BD}$?
A. $\dfrac{14}{29}$
B. $\dfrac{14}{15}$
C. $\dfrac{15}{29}$
D. $\dfrac{29}{14}$
Answer: D
Domain: Geometry and Trigonometry
Explanation: The hypotenuse is $AC = 14 + 15 = 29$. The area of triangle $ABC$ can be written as $\frac{1}{2}(AB)(BC)$ or as $\frac{1}{2}(AC)(BD)$, so $(AB)(BC) = (AC)(BD)$. Therefore $\frac{BC}{BD} = \frac{AC}{AB} = \frac{29}{14}$.

31.

![A shaded rectangular pool, labeled pool, surrounded by a rectangular concrete path, labeled concrete path. Arrows show that the path is x ft wide at the top and at the left side of the pool.](tests/images/geometry-a/q31.svg)

*Note: Figure not drawn to scale.*

The figure shows a rectangular pool surrounded by a concrete path that is $x$ feet (ft) wide on all sides. The pool is $23$ ft long and $11$ ft wide. The area of the concrete path is $240$ $\text{ft}^2$. What is the value of $x$?
A. $3$
B. $6$
C. $20$
D. $40$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The pool and the path together form a rectangle that is $(23 + 2x)$ ft by $(11 + 2x)$ ft, so $(23 + 2x)(11 + 2x) - 23(11) = 240$. This simplifies to $4x^2 + 68x - 240 = 0$, or $x^2 + 17x - 60 = 0$, so $(x + 20)(x - 3) = 0$. Since $x > 0$, $x = 3$.

32.

![Right triangle ABC with the right angle at A, vertex B at the top left and C at the bottom right. Point D lies on side BC, and segment AD is perpendicular to BC, with a right-angle mark at D.](tests/images/geometry-a/q32.svg)

*Note: Figure not drawn to scale.*

In the figure, $\overline{AD}$ and $\overline{BC}$ intersect at point $D$. The measure of $\angle ABD$ is $w^\circ$, the measure of $\angle CAD$ is $z^\circ$, and $AD = 178$. If $\cos w^\circ = \dfrac{9}{41}$, what is the value of $\tan z^\circ$?
Answer: 40/9
Domain: Geometry and Trigonometry
Explanation: In right triangle $ABD$, angle $BAD$ measures $(90 - w)^\circ$, so angle $CAD$ measures $90^\circ - (90 - w)^\circ = w^\circ$; that is, $z = w$. Since $\cos w^\circ = \frac{9}{41}$, a right triangle with hypotenuse $41$ and adjacent leg $9$ has opposite leg $\sqrt{41^2 - 9^2} = 40$. Therefore $\tan z^\circ = \tan w^\circ = \frac{40}{9}$; the length $AD = 178$ is not needed.

33. A circle with a center $B(0, 0)$ is a unit circle in the $xy$-plane. Points $A(1, 0)$ and $C$ lie on the circle. If the measure of angle $ABC$ is $\dfrac{975\pi}{60}$ radians, what is the $x$-coordinate of point $C$?
A. $\dfrac{\sqrt{2}}{2}$
B. $-\dfrac{\sqrt{2}}{2}$
C. $0$
D. $\dfrac{\sqrt{2}}{3}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Since $\frac{975\pi}{60} = \frac{65\pi}{4} = 16\pi + \frac{\pi}{4}$ and $16\pi$ is $8$ full rotations, point $C$ is in the same position as the point for an angle of $\frac{\pi}{4}$ radians. Its $x$-coordinate is $\cos\frac{\pi}{4} = \frac{\sqrt{2}}{2}$.

34.

![A circle with center O. Points A, B, and C lie on the circle, with A at the upper left, B at the upper right, and C at the bottom. Chord AB and radii OA, OB, and OC are drawn.](tests/images/geometry-a/q34.svg)

Point $O$ is the center of the circle above, and the measure of $\angle OAB$ is $30^\circ$. If the length of $\overline{OC}$ is $18$, what is the length of arc $\overset{\frown}{AB}$?
A. $9\pi$
B. $12\pi$
C. $15\pi$
D. $18\pi$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $OA = OB$, triangle $OAB$ is isosceles, so angle $OBA$ also measures $30^\circ$ and angle $AOB$ measures $180^\circ - 2(30^\circ) = 120^\circ$. The radius is $OC = 18$, so the length of arc $AB$ is $\frac{120}{360}(2\pi \cdot 18) = 12\pi$.

35. Circle $A$ has the equation $(x - 18)^2 + y^2 = 27$. Circle $B$ has the equation $(x - 18)^2 + (y - m)^2 = 50$. If Circle $B$ passes through the center of Circle $A$, what is a possible value of $m$?
A. $3\sqrt{3}$
B. $5\sqrt{2}$
C. $5\sqrt{2} - 3\sqrt{3}$
D. $5\sqrt{2} + 3\sqrt{3}$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The center of circle $A$ is $(18, 0)$. Substituting this point into the equation of circle $B$ gives $0^2 + (0 - m)^2 = 50$, so $m^2 = 50$ and $m = \pm 5\sqrt{2}$. A possible value of $m$ is $5\sqrt{2}$.

36.

$$(x + 4)^2 + (y - 19)^2 = 121$$

The graph of the given equation is a circle in the $xy$-plane. The point $(a, b)$ lies on the circle. Which of the following is a possible value for $a$?
A. $-16$
B. $-14$
C. $11$
D. $19$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The circle has center $(-4, 19)$ and radius $\sqrt{121} = 11$, so the $x$-coordinate of any point on it satisfies $-4 - 11 \le a \le -4 + 11$, or $-15 \le a \le 7$. Of the choices, only $-14$ is in this interval.

37.

![Four concentric circles. The smallest circle is labeled petting space, the ring around it is labeled playing space, the shaded ring outside that is labeled barking space, and the outermost ring is labeled staring space.](tests/images/geometry-a/q37.svg)

The diagram above represents George O. Williams's concept of space surrounding a dog defined by four nonoverlapping regions. Petting space is the region inside a circle of radius $1$ foot. Playing space is the region within a circle of radius $3$ feet but outside the petting space. Barking space is the region within a circle of radius $8$ feet, but outside the playing space. Staring space is the region within a circle of radius $15$ feet but outside barking space. What is the area, in square feet, of the shaded region representing a dog's barking space?
A. $9\pi$
B. $55\pi$
C. $64\pi$
D. $225\pi$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Barking space is the region inside the circle of radius $8$ feet and outside the circle of radius $3$ feet. Its area is $\pi(8)^2 - \pi(3)^2 = 64\pi - 9\pi = 55\pi$ square feet.

38.

![Triangle ABC with A at the top, B at the bottom left, and C at the bottom right. Point D lies on side AC and point E lies on side BC, and triangle BDE is shaded.](tests/images/geometry-a/q38.svg)

The figure above shows a triangle $ABC$ with $AC = 11$ cm and $BC = 16$ cm. The point $D$ is on the line $AC$ such that $AD : DC = 6 : 5$, while the point $E$ is the midpoint of $BC$. Given that the area of triangle $BDE$ is $10$ $\text{cm}^2$, find the area of triangle $ABD$.
Answer: 24
Domain: Geometry and Trigonometry
Explanation: Since $E$ is the midpoint of $\overline{BC}$, triangles $BDE$ and $EDC$ have equal bases and the same height from $D$, so the area of triangle $BDC$ is $2(10) = 20$ $\text{cm}^2$. Triangles $ABD$ and $DBC$ have the same height from $B$ to line $AC$, so their areas are in the ratio $AD : DC = 6 : 5$. The area of triangle $ABD$ is $\frac{6}{5}(20) = 24$ $\text{cm}^2$.

39. In the $xy$-plane, which of the following points lies on a circle with the equation $(x + k)^2 + (y - j)^2 = 841$?
A. $(k + 20, j + 21)$
B. $(k - 20, j - 21)$
C. $(-k + 21, j + 20)$
D. $(-k - 21, -j - 20)$
Answer: C
Domain: Geometry and Trigonometry
Explanation: For the point $(-k + 21, j + 20)$, $(x + k)^2 + (y - j)^2 = 21^2 + 20^2 = 441 + 400 = 841$, so the point lies on the circle. For each of the other choices, the left side of the equation depends on $k$ or $j$, so the point is not on the circle for all values of $k$ and $j$.

40.

![Right triangle PQR with the right angle at P, Q at the top, and R at the right. Side PQ is labeled 3 and side PR is labeled 4, and a circle is inscribed in the triangle.](tests/images/geometry-a/q40.svg)

In the figure above, a circle is inscribed in $\triangle PQR$. If $PQ = 3$ and $PR = 4$, what is the radius of the circle?
Answer: 1
Domain: Geometry and Trigonometry
Explanation: Angle $P$ is a right angle, so $QR = \sqrt{3^2 + 4^2} = 5$. The area of the triangle is $\frac{1}{2}(3)(4) = 6$, and it also equals the radius $r$ times half the perimeter: $r \cdot \frac{3 + 4 + 5}{2} = 6r$. So $6r = 6$ and $r = 1$.

41.

![Right triangle RST with the right angle at S. Side RS is labeled 12 and side ST is labeled 5.](tests/images/geometry-a/q41.svg)

In triangle $RST$ above, point $W$ (not shown) lies on $\overline{RT}$. What is the value of $\cos(\angle RSW) - \sin(\angle WST)$?
Answer: 0
Domain: Geometry and Trigonometry
Explanation: Since $W$ lies on $\overline{RT}$, angles $RSW$ and $WST$ together form the right angle $RST$, so they are complementary. The sine of an angle equals the cosine of its complement, so $\sin(\angle WST) = \cos(\angle RSW)$, and the difference is $0$.

42. In $\triangle ABC$, $\angle B$ is a right angle, and the length of $\overline{AB}$ is $456$ millimeters. If $\cos C = \dfrac{7}{25}$, what is the length, in millimeters, of $\overline{BC}$?
Answer: 133
Domain: Geometry and Trigonometry
Explanation: Since $\cos C = \frac{BC}{AC} = \frac{7}{25}$, the sides are in the ratio $BC : AB : AC = 7 : 24 : 25$ (because $\sqrt{25^2 - 7^2} = 24$). Since $AB = 456 = 24(19)$, $BC = 7(19) = 133$ millimeters.

43.

![A trapezoid made of three congruent equilateral triangles: two shaded triangles pointing up at the left and right, and an unshaded triangle pointing down between them.](tests/images/geometry-a/q43.svg)

A graphic designer is creating a logo for a company. The logo is shown in the figure above. The logo is in the shape of a trapezoid and consists of three congruent equilateral triangles. If the perimeter of the logo is $20$ centimeters, what is the combined area of the shaded regions, in square centimeters, of the logo?
A. $2\sqrt{3}$
B. $4\sqrt{3}$
C. $8\sqrt{3}$
D. $16$
Answer: C
Domain: Geometry and Trigonometry
Explanation: If each triangle has side length $s$, the trapezoid has a longer base of $2s$, a shorter base of $s$, and two legs of length $s$, so its perimeter is $5s = 20$ and $s = 4$. Each triangle has area $\frac{\sqrt{3}}{4}(4)^2 = 4\sqrt{3}$, so the two shaded triangles have a combined area of $8\sqrt{3}$ square centimeters.

44. A circle has diameters $\overline{AC}$ and $\overline{BD}$. The circumference of the circle is $84\pi$, and the length of arc $DA$ is $2$ times the length of arc $AB$. What is the length of arc $BC$?
A. $2\pi$
B. $14\pi$
C. $21\pi$
D. $28\pi$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Since $\overline{BD}$ is a diameter, arcs $DA$ and $AB$ together form a semicircle of length $42\pi$, so $3(AB) = 42\pi$, arc $AB$ has length $14\pi$, and arc $DA$ has length $28\pi$. Central angles $BOC$ and $DOA$ are vertical angles, where $O$ is the center, so arc $BC$ has the same length as arc $DA$: $28\pi$.

45.

![A hemisphere on top of an upside-down cone, joined at their circular bases. A vertical arrow beside the figure shows the total height of the figure, 9 cm.](tests/images/geometry-a/q45.svg)

A hemisphere and a cone have circular bases of equal circumference and have been connected at their bases, as shown in the figure. The diameter of the base of the hemisphere is $6$ centimeters (cm), and the total height of the figure is $9$ cm. What is the total volume, in $\text{cm}^3$, of the cone and hemisphere?
A. $18\pi$
B. $36\pi$
C. $45\pi$
D. $162\pi$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The common radius is $3$ cm, so the hemisphere is $3$ cm tall and the cone is $9 - 3 = 6$ cm tall. The hemisphere's volume is $\frac{2}{3}\pi(3)^3 = 18\pi$ and the cone's volume is $\frac{1}{3}\pi(3)^2(6) = 18\pi$, for a total of $36\pi$ $\text{cm}^3$.
`
});
