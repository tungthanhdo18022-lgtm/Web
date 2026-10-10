/*
 * Advanced test: Geometry A (20 questions on geometry and trigonometry).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'geometry-a',
  source: String.raw`
---
title: Geometry A
author: tungtks18022
description: 20 SAT Math questions on triangles, circles, volume, coordinate geometry and trigonometry, with an explanation for every question.
category: Geometry and Trigonometry
section: advanced
time: 35
---

1. In a right triangle, the two legs have lengths $9$ and $12$. What is the length of the hypotenuse?
A. $12$
B. $15$
C. $18$
D. $21$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The Pythagorean theorem gives $\sqrt{9^2 + 12^2} = \sqrt{225} = 15$.

2. The equation $x^2 + y^2 - 6x + 10y + 18 = 0$ defines a circle in the $xy$-plane. What is the radius of the circle?
Answer: 4
Domain: Geometry and Trigonometry
Explanation: Complete the square: $(x - 3)^2 + (y + 5)^2 = 9 + 25 - 18 = 16$. The radius is $\sqrt{16} = 4$.

3. A sector of a circle has radius $12$ and a central angle of $150^\circ$. What is the arc length of the sector?
A. $5\pi$
B. $10\pi$
C. $15\pi$
D. $20\pi$
Answer: B
Domain: Geometry and Trigonometry
Explanation: The arc length is $\frac{150}{360} \cdot 2\pi(12) = \frac{5}{12} \cdot 24\pi = 10\pi$.

4. Triangle $ABC$ is similar to triangle $DEF$, where $AB$ corresponds to $DE$. $AB = 6$, $DE = 9$, and the perimeter of triangle $ABC$ is $20$. What is the perimeter of triangle $DEF$?
Answer: 30
Domain: Geometry and Trigonometry
Explanation: The scale factor from $ABC$ to $DEF$ is $\frac{9}{6} = \frac{3}{2}$, so the perimeter of $DEF$ is $20 \cdot \frac{3}{2} = 30$.

5. In right triangle $ABC$, the right angle is at $C$ and $\sin A = \frac{5}{13}$. What is the value of $\cos B$?
A. $\frac{5}{13}$
B. $\frac{12}{13}$
C. $\frac{12}{5}$
D. $\frac{13}{5}$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Angles $A$ and $B$ are complementary, so $\cos B = \sin A = \frac{5}{13}$.

6. A right circular cylinder has a volume of $200\pi$ cubic centimeters and a height of $8$ centimeters. What is the diameter, in centimeters, of its base?
Answer: 10
Domain: Geometry and Trigonometry
Explanation: $V = \pi r^2 h$ gives $200\pi = 8\pi r^2$, so $r^2 = 25$ and $r = 5$. The diameter is $2r = 10$.

7. The measures of the angles of a triangle are in the ratio $2:3:4$. What is the measure, in degrees, of the largest angle?
Answer: 80
Domain: Geometry and Trigonometry
Explanation: The angles are $2k$, $3k$ and $4k$ with $9k = 180$, so $k = 20$ and the largest angle is $4k = 80$.

8. What is the degree measure of an angle with a radian measure of $\frac{5\pi}{6}$?
A. $120^\circ$
B. $135^\circ$
C. $150^\circ$
D. $165^\circ$
Answer: C
Domain: Geometry and Trigonometry
Explanation: Multiply by $\frac{180}{\pi}$: $\frac{5\pi}{6} \cdot \frac{180}{\pi} = 150$ degrees.

9. In the $xy$-plane, what is the distance between the points $(-2, 3)$ and $(4, 11)$?
Answer: 10
Domain: Geometry and Trigonometry
Explanation: The distance is $\sqrt{(4 - (-2))^2 + (11 - 3)^2} = \sqrt{36 + 64} = 10$.

10. In the $xy$-plane, a circle has a diameter with endpoints $(1, -4)$ and $(7, 8)$. Which of the following is an equation of the circle?
A. $(x - 4)^2 + (y - 2)^2 = 45$
B. $(x - 4)^2 + (y - 2)^2 = 180$
C. $(x + 4)^2 + (y + 2)^2 = 45$
D. $(x - 4)^2 + (y - 2)^2 = 90$
Answer: A
Domain: Geometry and Trigonometry
Explanation: The center is the midpoint $\left(\frac{1+7}{2}, \frac{-4+8}{2}\right) = (4, 2)$. The diameter is $\sqrt{6^2 + 12^2} = \sqrt{180}$, so $r^2 = \left(\frac{\sqrt{180}}{2}\right)^2 = 45$.

11. A cube has a total surface area of $150$ square inches. What is the volume, in cubic inches, of the cube?
Answer: 125
Domain: Geometry and Trigonometry
Explanation: A cube has $6$ faces, so each face has area $25$ and the edge length is $5$. The volume is $5^3 = 125$.

12. In a $30^\circ$-$60^\circ$-$90^\circ$ triangle, the hypotenuse has length $14$. What is the length of the side opposite the $60^\circ$ angle?
A. $7$
B. $7\sqrt{2}$
C. $7\sqrt{3}$
D. $14\sqrt{3}$
Answer: C
Domain: Geometry and Trigonometry
Explanation: The side opposite $30^\circ$ is half the hypotenuse, $7$. The side opposite $60^\circ$ is $7\sqrt{3}$ (equivalently, $14 \sin 60^\circ$).

13. Two parallel lines are cut by a transversal. A pair of alternate interior angles have measures $(3x + 10)^\circ$ and $(5x - 30)^\circ$. What is the measure, in degrees, of each of these angles?
Answer: 70
Domain: Geometry and Trigonometry
Explanation: Alternate interior angles are congruent: $3x + 10 = 5x - 30$, so $x = 20$. Each angle measures $3(20) + 10 = 70$ degrees.

14. An isosceles triangle has side lengths $13$, $13$ and $10$. What is the area of the triangle?
Answer: 60
Domain: Geometry and Trigonometry
Explanation: The altitude to the base of length $10$ splits it into two segments of length $5$, so the height is $\sqrt{13^2 - 5^2} = 12$. The area is $\frac{1}{2}(10)(12) = 60$.

15. A sphere has a volume of $36\pi$ cubic units. What is the surface area, in square units, of the sphere?
A. $9\pi$
B. $18\pi$
C. $36\pi$
D. $108\pi$
Answer: C
Domain: Geometry and Trigonometry
Explanation: $\frac{4}{3}\pi r^3 = 36\pi$ gives $r^3 = 27$, so $r = 3$. The surface area is $4\pi r^2 = 4\pi(9) = 36\pi$.

16. In a circle with center $O$, the central angle $\angle AOB$ measures $100^\circ$. Point $P$ is on the circle on the major arc $AB$. What is the measure, in degrees, of the inscribed angle $\angle APB$?
A. $25^\circ$
B. $50^\circ$
C. $100^\circ$
D. $200^\circ$
Answer: B
Domain: Geometry and Trigonometry
Explanation: An inscribed angle is half the central angle that subtends the same arc, so $\angle APB = \frac{100^\circ}{2} = 50^\circ$.

17. For an angle $x$ with $0^\circ < x < 90^\circ$, $\cos x = 0.6$. What is the value of $\tan x$?
A. $\frac{3}{4}$
B. $\frac{4}{3}$
C. $\frac{4}{5}$
D. $\frac{5}{3}$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $\sin^2 x + \cos^2 x = 1$, $\sin x = \sqrt{1 - 0.36} = 0.8$. Then $\tan x = \frac{0.8}{0.6} = \frac{4}{3}$.

18. A rectangle has a diagonal of length $26$ and a length of $24$. What is the perimeter of the rectangle?
Answer: 68
Domain: Geometry and Trigonometry
Explanation: The width is $\sqrt{26^2 - 24^2} = \sqrt{100} = 10$. The perimeter is $2(24 + 10) = 68$.

19. Two similar figures have corresponding side lengths in the ratio $1:3$. The area of the smaller figure is $20$ square units. What is the area, in square units, of the larger figure?
Answer: 180
Domain: Geometry and Trigonometry
Explanation: Areas scale by the square of the ratio of side lengths: $20 \cdot 3^2 = 180$.

20. Which of the following points lies on the circle with equation $(x - 2)^2 + (y + 1)^2 = 25$?
A. $(5, -5)$
B. $(5, 5)$
C. $(-3, 1)$
D. $(6, 3)$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Substitute each point. For $(5, -5)$: $3^2 + (-4)^2 = 9 + 16 = 25$, so it lies on the circle. The other points give $45$, $29$ and $32$.
`
});
