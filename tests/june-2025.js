/*
 * Practice test: June 2025 (24 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'june-2025',
  source: String.raw`
---
title: SAT Math June 2025
author: tungtks18022
date: 2025-06
description: A 24-question SAT Math practice set mixing multiple-choice and student-produced response questions.
time: 38
---

1. A survey of the daily commuting times, in minutes, of seven different Chicago-based employees at a certain company yielded a data set consisting of the values $31$, $13$, $44$, $32$, $53$, $22$, and $44$. A survey of the daily commuting times, in minutes, of seven different San Francisco-based employees at the same company yielded a data set consisting of the values $46$, $31$, $19$, $33$, $48$, $x$, and $38$. If the means of the two data sets are equal, what is the value of $x$?
Answer: 24
Domain: Problem-Solving and Data Analysis
Explanation: The Chicago values have a sum of $31 + 13 + 44 + 32 + 53 + 22 + 44 = 239$. Both data sets have seven values, so equal means require equal sums: $46 + 31 + 19 + 33 + 48 + x + 38 = 215 + x = 239$, which gives $x = 24$.

2. In isosceles triangle $ABC$, sides $AB$ and $AC$ are congruent. Point $D$ divides side $BC$ such that the length of $BD$ is $\dfrac{2}{7}$ of the length of $BC$. Point $E$ lies on side $AB$ and point $F$ lies on side $AC$ such that when segments $DE$ and $DF$ are drawn, angle $BED$ is congruent to angle $CFD$. If the length of $BE$ is $14$, what is the length of $CF$?
A. $28$
B. $35$
C. $49$
D. $98$
Answer: B
Domain: Geometry and Trigonometry
Explanation: Since $AB = AC$, angles $B$ and $C$ are congruent. Together with $\angle BED \cong \angle CFD$, this makes triangles $BED$ and $CFD$ similar, so $\frac{BE}{CF} = \frac{BD}{CD}$. Because $BD = \frac{2}{7}BC$, $CD = \frac{5}{7}BC$, so $\frac{14}{CF} = \frac{2}{5}$ and $CF = 35$.

3.

$$26z^{18} + bz^9 + 70$$

In the given expression, $b$ is a positive integer. If $qz^9 + r$ is a factor of the expression, where $q$ and $r$ are positive integers, what is the greatest possible value of $b$?
Answer: 1821
Domain: Advanced Math
Explanation: Write the expression as $(qz^9 + r)(sz^9 + t)$, where $qs = 26$, $rt = 70$, and $b = qt + rs$. Since $(qt)(rs) = (qs)(rt) = 26(70) = 1{,}820$, the sum $qt + rs$ is greatest when one product is $1{,}820$ and the other is $1$, as in $(26z^9 + 1)(z^9 + 70) = 26z^{18} + 1{,}821z^9 + 70$. So the greatest possible value of $b$ is $1{,}821$.

4. Ari examined a set of $86$ plants. The lightest plant had a mass of $2.8$ kilograms (kg) and the heaviest plant had a mass of $6.3$ kg. Chihiro examined the same set of $86$ plants and also an additional plant with a mass of $11.6$ kg. Which of the following must be true about the set of plants that Ari examined and the set of plants that Chihiro examined?
A. The standard deviation of the masses, in kg, of the plants that Ari examined is greater than the standard deviation of the masses, in kg, of the plants that Chihiro examined.
B. The range of the masses, in kg, of the plants that Ari examined is greater than the range of the masses, in kg, of the plants that Chihiro examined.
C. The median of the masses, in kg, of the plants that Ari examined is less than the median of the masses, in kg, of the plants that Chihiro examined.
D. The mean of the masses, in kg, of the plants that Ari examined is less than the mean of the masses, in kg, of the plants that Chihiro examined.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The added mass, $11.6$ kg, is greater than every mass in Ari's set, so it is greater than the mean of Ari's set, and adding it must increase the mean. Adding a value this far from the others increases both the range (from $3.5$ to $8.8$ kg) and the standard deviation, so choices A and B are false, and choice C need not be true because the median can stay the same.

5. In triangle $XYZ$, angle $Y$ is a right angle, the measure of angle $Z$ is $38^\circ$, and the length of $YZ$ is $28$ units. If the area, in square units, of triangle $XYZ$ can be represented by the expression $k\tan 38^\circ$, where $k$ is a constant, what is the value of $k$?
Answer: 392
Domain: Geometry and Trigonometry
Explanation: Since angle $Y$ is a right angle, $\tan 38^\circ = \frac{XY}{YZ}$, so $XY = 28\tan 38^\circ$. The area is $\frac{1}{2}(YZ)(XY) = \frac{1}{2}(28)(28\tan 38^\circ) = 392\tan 38^\circ$, so $k = 392$.

6. The composition of an animal is defined as the muscles, bones, and fat of the animal. A scientist studied the composition of one young swamp buffalo and determined the buffalo had $123.8$ kilograms of muscle, which made up approximately $67.2\%$ of its composition. Of the remaining composition of this buffalo, approximately $47.4\%$ was bone, and the remainder was fat. Based on these approximations, to the nearest tenth, how many kilograms of this buffalo's composition was bone?
Answer: 28.6
Domain: Problem-Solving and Data Analysis
Explanation: The total composition is $\frac{123.8}{0.672} \approx 184.23$ kilograms, so the remaining $32.8\%$ is about $0.328(184.23) \approx 60.43$ kilograms. Bone is $47.4\%$ of that: $0.474(60.43) \approx 28.6$ kilograms.

7. The relationship between two variables, $x$ and $y$, is linear. For every increase in the value of $x$ by $1$, the value of $y$ increases by $8$. When the value of $x$ is $2$, the value of $y$ is $18$. Which equation represents this relationship?
A. $y = 2x + 18$
B. $y = 2x + 8$
C. $y = 8x + 2$
D. $y = 3x + 26$
Answer: C
Domain: Algebra
Explanation: The slope is $8$, so $y = 8x + b$. Substituting $x = 2$ and $y = 18$ gives $18 = 16 + b$, so $b = 2$ and $y = 8x + 2$.

8.

![Two horizontal box plots above a number line labeled Number of books, with tick marks from 0 to 12. Class A: minimum 0, first quartile 1, median 2, third quartile 4, maximum 5. Class B: minimum 1, first quartile 4, median 7, third quartile 9, maximum 10.](tests/images/june-2025/q8.svg)

The two box plots show the distribution of number of books read over the summer by the students in two different English classes. What is the positive difference between the ranges of number of books read over the summer for the two classes?
Answer: 4
Domain: Problem-Solving and Data Analysis
Explanation: For Class A, the minimum is $0$ and the maximum is $5$, so the range is $5$. For Class B, the minimum is $1$ and the maximum is $10$, so the range is $9$. The positive difference is $9 - 5 = 4$.

9.

![Scatterplot in the xy-plane, with x from 0 to 14 and y from 0 to 140, showing six data points and a decreasing exponential model curve that starts on the y-axis between 120 and 140 and falls toward the x-axis as x increases.](tests/images/june-2025/q9.svg)

The scatterplot shows the relationship between two variables, $x$ and $y$. An equation for the exponential model shown can be written as $y = ab^x$, where $a$ and $b$ are positive constants. Which of the following is closest to the value of $b$?
A. $0.83$
B. $1.83$
C. $18.36$
D. $126.35$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The model decreases as $x$ increases, so $b$, the factor by which $y$ is multiplied each time $x$ increases by $1$, must satisfy $0 < b < 1$. Of the choices, only $0.83$ is between $0$ and $1$; as a check, the curve falls from about $125$ at $x = 0$ to about $10$ at $x = 14$, and $125(0.83)^{14} \approx 9$.

10.

![Segments WZ and XY cross at point Q, forming triangle WQX on the left and triangle YQZ on the right. Angle W of triangle WQX and angle Y of triangle YQZ are each marked a degrees.](tests/images/june-2025/q10.svg)

*Note: Figure not drawn to scale.*

In the figure shown, $\overline{WZ}$ and $\overline{XY}$ intersect at point $Q$. $YQ = 63$, $WQ = 70$, $WX = 60$, and $XQ = 120$. What is the length of $\overline{YZ}$?
Answer: 54
Domain: Geometry and Trigonometry
Explanation: Angles $W$ and $Y$ are congruent, and angles $WQX$ and $YQZ$ are vertical angles, so triangles $WQX$ and $YQZ$ are similar, with $W$ corresponding to $Y$ and $X$ corresponding to $Z$. Then $\frac{YZ}{WX} = \frac{YQ}{WQ} = \frac{63}{70} = \frac{9}{10}$, so $YZ = \frac{9}{10}(60) = 54$.

11. The number of zebras in a population in 2018 was $1.27$ times the number of zebras in this population in 2014. If the number of zebras in this population in 2014 is $p\%$ of the number of zebras in this population in 2018, what is the value of $p$, to the nearest whole number?
Answer: 79
Domain: Problem-Solving and Data Analysis
Explanation: If there were $z$ zebras in 2014, there were $1.27z$ zebras in 2018. Then $\frac{z}{1.27z} = \frac{1}{1.27} \approx 0.787$, which is about $79\%$, so $p = 79$.

12.

![Circle A drawn on a grid in the xy-plane, with tick marks labeled every 2 units (from -6 to 2 on the x-axis and from -6 to 6 on the y-axis). The center (-2, 0) is marked with a point, and the circle passes through (-5, 0), (1, 0), (-2, 3), and (-2, -3).|360](tests/images/june-2025/q12.svg)

Circle $A$ (shown) is defined by the equation $(x + 2)^2 + y^2 = 9$. Circle $B$ (not shown) is the result of shifting circle $A$ down $6$ units and increasing the radius so that the radius of circle $B$ is $2$ times the radius of circle $A$. Which equation defines circle $B$?
A. $(x + 2)^2 + (y + 6)^2 = 36$
B. $2(x + 2)^2 + 2(y + 6)^2 = 9$
C. $(x + 2)^2 + (y - 6)^2 = 36$
D. $2(x + 2)^2 + 2(y - 6)^2 = 9$
Answer: A
Domain: Geometry and Trigonometry
Explanation: Circle $A$ has center $(-2, 0)$ and radius $3$. Shifting it down $6$ units moves the center to $(-2, -6)$, and doubling the radius gives a radius of $6$. So circle $B$ is defined by $(x + 2)^2 + (y + 6)^2 = 6^2 = 36$.

13. A rectangle is inscribed in a circle, such that each vertex of the rectangle lies on the circumference of the circle. The diagonal of the rectangle is twice the length of the shortest side of the rectangle. The area of the rectangle is $1{,}089\sqrt{3}$ square units. What is the length, in units, of the diameter of the circle?
Answer: 66
Domain: Geometry and Trigonometry
Explanation: Let the shortest side be $s$, so the diagonal is $2s$ and the other side is $\sqrt{(2s)^2 - s^2} = s\sqrt{3}$. The area is $s^2\sqrt{3} = 1{,}089\sqrt{3}$, so $s = 33$. The diagonal of an inscribed rectangle is a diameter of the circle, so the diameter is $2(33) = 66$.

14. In the $xy$-plane, a unit circle with center at the origin $O$ contains point $A$ with coordinates $(1, 0)$ and point $B$ with coordinates $\left(-\dfrac{5}{\sqrt{89}}, \dfrac{8}{\sqrt{89}}\right)$. If the measure of angle $AOB$ is $w$ radians, what is the value of $\tan w$?
Answer: -8/5 | -1.6
Domain: Geometry and Trigonometry
Explanation: Angle $AOB$ is in standard position with point $B$ on its terminal side, so $\tan w = \dfrac{8/\sqrt{89}}{-5/\sqrt{89}} = -\dfrac{8}{5}$.

15. The ratio of cups of flour to cups of butter in a pie dough recipe is $2.75$ to $1$. The ratio of cups of flour to cups of butter in a biscuit recipe is $7$ to $1$. Each recipe has $1$ cup of butter. How many more cups of flour are in the biscuit recipe than in the pie dough recipe?
Answer: 4.25
Domain: Problem-Solving and Data Analysis
Explanation: With $1$ cup of butter, the pie dough recipe has $2.75$ cups of flour and the biscuit recipe has $7$ cups of flour. The difference is $7 - 2.75 = 4.25$ cups.

16. A boat traveled a certain distance upriver and then traveled downriver $10$ miles farther than it traveled upriver. The boat took $x$ hours to travel upriver at a speed of $12$ miles per hour. The boat then took $y$ hours to travel downriver at a speed of $18$ miles per hour faster than the speed at which the boat traveled upriver. Which of the following equations best represents this situation?
A. $12x - 30y = -10$
B. $12x + 30y = -10$
C. $12x + 30y = 10$
D. $12x - 30y = 10$
Answer: A
Domain: Algebra
Explanation: The boat traveled $12x$ miles upriver. Its downriver speed was $12 + 18 = 30$ miles per hour, so it traveled $30y$ miles downriver, which is $10$ miles farther: $30y = 12x + 10$. Rearranging gives $12x - 30y = -10$.

17.

| $x$ | $y$ |
|:---:|:---:|
| $-6$ | $-14$ |
| $-3$ | $-16$ |
| $3$ | $-20$ |
| $6$ | $-22$ |

The table shows four values of $x$ and their corresponding values of $y$. The linear relationship between $x$ and $y$ can be represented by the equation $2x + By = C$, where $B$ and $C$ are constants. What is the value of $C$?
Answer: -54
Domain: Algebra
Explanation: The slope is $\frac{-16 - (-14)}{-3 - (-6)} = -\frac{2}{3}$, and substituting $(-6, -14)$ into $y = -\frac{2}{3}x + b$ gives $b = -18$. So $y = -\frac{2}{3}x - 18$; multiplying by $3$ and rearranging gives $2x + 3y = -54$, so $C = -54$.

18.

$$\begin{gathered} 2x + 5y = 9 \\[4pt] 12x + 30y = 54 \end{gathered}$$

For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system?
A. $\left(r, -\dfrac{2r}{5} + \dfrac{9}{5}\right)$
B. $\left(-\dfrac{2r}{5} + \dfrac{9}{5}, r\right)$
C. $\left(-\dfrac{2r}{5} + 9, \dfrac{2r}{5} + 54\right)$
D. $\left(\dfrac{r}{6} + 9, -\dfrac{r}{6} + 54\right)$
Answer: A
Domain: Algebra
Explanation: The second equation is the first equation multiplied by $6$, so both equations have the same graph: the line $y = -\frac{2}{5}x + \frac{9}{5}$. Letting $x = r$ gives the point $\left(r, -\frac{2r}{5} + \frac{9}{5}\right)$, which satisfies both equations for every real number $r$.

19. A right triangular pyramid has exactly six edges. Each of these edges is $96$ centimeters long. If the surface area of the pyramid is $k\sqrt{3}$ square centimeters, what is the value of $k$?
Answer: 9216
Domain: Geometry and Trigonometry
Explanation: Since all six edges are $96$ centimeters long, the four faces are congruent equilateral triangles. Each face has area $\frac{\sqrt{3}}{4}(96)^2 = 2{,}304\sqrt{3}$, so the surface area is $4(2{,}304\sqrt{3}) = 9{,}216\sqrt{3}$ and $k = 9{,}216$.

20. A grove has $6$ rows of birch trees and $5$ rows of maple trees. Each row of birch trees has $8$ trees $20$ feet or taller and $6$ trees shorter than $20$ feet. Each row of maple trees has $9$ trees $20$ feet or taller and $7$ trees shorter than $20$ feet. A tree from one of these rows will be selected at random. What is the probability of selecting a maple tree, given that the tree is $20$ feet or taller?
A. $\dfrac{9}{164}$
B. $\dfrac{3}{10}$
C. $\dfrac{15}{31}$
D. $\dfrac{9}{17}$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: There are $6(8) = 48$ birch trees and $5(9) = 45$ maple trees that are $20$ feet or taller, for a total of $93$ trees. The probability is $\frac{45}{93} = \frac{15}{31}$.

21. The positive number $a$ is $2{,}241\%$ of the sum of the positive numbers $b$ and $c$, and $b$ is $83\%$ of $c$. What percent of $b$ is $a$?
A. $23.24\%$
B. $49.41\%$
C. $2{,}324\%$
D. $4{,}941\%$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Since $b = 0.83c$, $c = \frac{b}{0.83}$, so $b + c = b + \frac{b}{0.83} = \frac{1.83}{0.83}b$. Then $a = 22.41\left(\frac{1.83}{0.83}b\right) = 49.41b$, so $a$ is $4{,}941\%$ of $b$.

22.

$$\begin{gathered} \dfrac{7}{8}y - \dfrac{5}{8}x = \dfrac{4}{7} - \dfrac{7}{8}y \\[10pt] \dfrac{5}{4}x + \dfrac{7}{4} = py + \dfrac{15}{4} \end{gathered}$$

In the given system of equations, $p$ is a constant. If the system has no solution, what is the value of $p$?
Answer: 7/2 | 3.5
Domain: Algebra
Explanation: Collecting the $y$-terms, the first equation becomes $-\frac{5}{8}x + \frac{7}{4}y = \frac{4}{7}$, or $5x - 14y = -\frac{32}{7}$ after multiplying by $-8$. The second equation rearranges to $\frac{5}{4}x - py = 2$, or $5x - 4py = 8$. The system has no solution when the left sides match but the right sides differ, so $4p = 14$ and $p = \frac{7}{2}$; since $-\frac{32}{7} \ne 8$, the lines are parallel and distinct.

23. A circle has center $G$, and points $M$ and $N$ lie on the circle. Line segments $MH$ and $NH$ are tangent to the circle at points $M$ and $N$, respectively. If the radius of the circle is $168$ millimeters and the perimeter of quadrilateral $GMHN$ is $3{,}856$ millimeters, what is the distance, in millimeters, between points $G$ and $H$?
A. $168$
B. $1{,}752$
C. $1{,}760$
D. $1{,}768$
Answer: D
Domain: Geometry and Trigonometry
Explanation: Tangent segments from $H$ are equal, so $2(168) + 2(MH) = 3{,}856$ and $MH = 1{,}760$. A tangent is perpendicular to the radius at the point of tangency, so triangle $GMH$ has a right angle at $M$ and $GH = \sqrt{168^2 + 1{,}760^2} = \sqrt{3{,}125{,}824} = 1{,}768$.

24. A clothing store buys shirts at a wholesale price of $5.00$ dollars each and resells them each at a retail price that is $270\%$ of the wholesale price. At the end of the season, any remaining shirts are marked at a discounted price that is $70\%$ off the retail price. What is the discounted price of each remaining shirt, in dollars?
Answer: 4.05
Domain: Problem-Solving and Data Analysis
Explanation: The retail price is $2.70(5.00) = 13.50$ dollars. Taking $70\%$ off leaves $30\%$ of the retail price: $0.30(13.50) = 4.05$ dollars.
`
});
