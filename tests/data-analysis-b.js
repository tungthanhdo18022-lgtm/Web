/*
 * Advanced test: Data Analysis B (69 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'data-analysis-b',
  source: String.raw`
---
title: Data Analysis B
author: tungtks18022
description: 69 harder Problem-Solving and Data Analysis questions on dot plots, histograms, box plots and scatterplots, mean, median and standard deviation, percentages and ratios, two-way tables and probability, and margin of error and sampling, with an explanation for every question.
category: Problem-Solving and Data Analysis
section: advanced
time: 110
---

1. The dot plots represent the distributions of values in data sets A and B.

![Two dot plots titled Data Set A and Data Set B, each on a number line labeled Value from 8 to 14. Data set A has 1, 3, 4, 5, 4, 3, and 1 dots at the values 8, 9, 10, 11, 12, 13, and 14, respectively, for 21 dots in all. Data set B has 2, 3, 4, 3, 4, 3, and 2 dots at those values, for 21 dots in all.](tests/images/data-analysis-b/q1.svg)

Which of the following statements must be true?

I. The median of data set A is equal to the median of data set B.

II. The standard deviation of data set A is equal to the standard deviation of data set B.
A. I and II
B. I only
C. II only
D. Neither I nor II
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Data set A has $1, 3, 4, 5, 4, 3, 1$ dots and data set B has $2, 3, 4, 3, 4, 3, 2$ dots at the values $8$ through $14$, so each data set has $21$ values and its median is the $11$th value. Both distributions are symmetric about $11$, and in each the $11$th value is $11$, so the medians are equal and statement I is true. Data set B has fewer values at the center ($3$ at $11$ instead of $5$) and more values at the extremes $8$ and $14$ ($2$ each instead of $1$), so its values are more spread out from the mean of $11$: the standard deviation of A is about $1.54$ and that of B is about $1.80$. Statement II is false, so the answer is I only.

2.

![Histogram with a horizontal axis labeled Duration of interval (minutes), marked from 325 to 500 in steps of 25, and a vertical axis labeled Number of intervals, from 0 to 18 in steps of 2. The bar heights, from left to right, are 1 for 325 to 350, 3 for 350 to 375, 17 for 375 to 400, 5 for 400 to 425, 8 for 425 to 450, 9 for 450 to 475, and 1 for 475 to 500, for a total of 44 intervals.](tests/images/data-analysis-b/q2.svg)

The histogram summarizes a data set of the durations, to the nearest minute, of the $44$ intervals between eruptions of Grand Geyser in Yellowstone National Park in a certain $14$-day period. If a duration of $772$ minutes is added to this data set to create a new data set of the durations of $45$ intervals, which of the following measures must be greater for the new data set than for the original data set?

I. The mean duration

II. The median duration
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Every original duration is at most $500$ minutes, so $772$ is greater than every value and therefore greater than the original mean; adding a value greater than the mean always increases the mean, so statement I must be true. The original $44$ values have median equal to the mean of the $22$nd and $23$rd values. The cumulative counts are $1, 4, 21, 26, \ldots$, so both of these values are in the $400$ to $425$ interval. The new data set has $45$ values, so its median is the $23$rd value. If the $22$nd and $23$rd values are equal (for example, both $410$ minutes), the median does not change, so statement II need not be true. The answer is I only.

3. A standard deck of playing cards has $52$ cards, with $13$ cards in each of four suits: clubs, diamonds, hearts, and spades. Each suit has three face cards (jack, queen, and king). For a particular card game, a player is dealt a hand of five cards from a standard deck. The number of distinct hands containing exactly three face cards is given by the expression $\underline{\hspace{4em}}$.
A. $\dbinom{12}{3}$
B. $\dbinom{12}{3}\dbinom{40}{2}$
C. $\dbinom{52}{3}\dbinom{49}{2}$
D. $\dbinom{13}{3}(4)$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The deck has $4 \times 3 = 12$ face cards and $52 - 12 = 40$ cards that are not face cards. A five-card hand with exactly three face cards consists of $3$ of the $12$ face cards and $2$ of the $40$ other cards. There are $\binom{12}{3} = 220$ ways to choose the face cards and $\binom{40}{2} = 780$ ways to choose the other two cards, so there are $\binom{12}{3}\binom{40}{2} = 171{,}600$ such hands. Choice A counts only the face cards, and choice C does not restrict which cards are chosen, so it includes hands with other numbers of face cards.

4. A researcher investigated two species of mites: a predator and its prey. At the start of the week, there was an equal number of the two species. At the end of the week, the number of prey has increased by $1{,}000\%$ of the number of prey at the start of the week, and the number of predators has increased by $340\%$ of the number of predators at the start of the week. The number of predators at the end of the week was $p\%$ less than the number of prey at the end of the week. What is the value of $p$?
Answer: 60
Domain: Problem-Solving and Data Analysis
Explanation: Let $n$ be the number of each species at the start of the week. At the end of the week there are $n + 10n = 11n$ prey and $n + 3.4n = 4.4n$ predators. The number of predators is less than the number of prey by $11n - 4.4n = 6.6n$, which is $\frac{6.6n}{11n} = 0.6$, or $60\%$, of the number of prey. So $p = 60$.

5. The scatterplot shows data set A, which consists of the weights $y$, in pounds, of a Labrador retriever puppy at various ages, $x$, in months. The equation of a line of best fit for the relationship in data set A can be written as $y = -5.0 + 8.7x$, where $2 \le x \le 6$.

![Scatterplot in the xy-plane with the x-axis labeled from 1 to 10 and the y-axis labeled from 10 to 60 in steps of 10, with grid lines every 1 unit of x and every 10 units of y. There are 5 points: (2, 12), (3, 22), (4, 28), (5, 41), and (6, 46).](tests/images/data-analysis-b/q5.svg)

The puppy was weighed again at $9$ months old and weighed $52$ pounds. Data set B consists of all the data points in data set A, as well as the data point $(9, 52)$. The equation of a line of best fit for data set B can be written as $y = r + sx$, where $r$ and $s$ are constants and $2 \le x \le 9$. Assuming the equations of the lines of best fit are calculated in the same way, which of the following is the best estimate for the value of $s$?
A. $5.8$
B. $8.7$
C. $13.7$
D. $17.7$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The line of best fit for data set A predicts a weight of $-5.0 + 8.7(9) = 73.3$ pounds at $9$ months, but the new point is $(9, 52)$, far below that line and to the right of all the other points. Adding this point pulls the right end of the line down, so the slope of the new line must be less than $8.7$. The only choice less than $8.7$ is $5.8$. Indeed, the least-squares line for the six points $(2, 12)$, $(3, 22)$, $(4, 28)$, $(5, 41)$, $(6, 46)$, and $(9, 52)$ is about $y = 5.4 + 5.8x$.

6. The value of a painting increased by $166\%$ from the end of 2011 to the end of 2012 and then decreased by $14\%$ from the end of 2012 to the end of 2013. What was the net percentage increase in the value of the painting from the end of 2011 to the end of 2013?
A. $128.76\%$
B. $142.76\%$
C. $152.00\%$
D. $203.24\%$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: A $166\%$ increase multiplies the value by $1 + 1.66 = 2.66$, and a $14\%$ decrease multiplies it by $1 - 0.14 = 0.86$. Overall the value is multiplied by $2.66 \times 0.86 = 2.2876$, which is a net increase of $2.2876 - 1 = 1.2876$, or $128.76\%$. Choice B uses $1.66 \times 0.86$, and choice C simply subtracts the percentages ($166 - 14 = 152$).

7. For a study, a group of gophers will be selected from a habitat consisting of $220$ gophers, and a group of groundhogs will be selected from a habitat consisting of $200$ groundhogs. Some of the gophers and groundhogs will be in a treatment group, and some will be in a control group. Which of the following is necessary for this study to attempt to establish a cause-and-effect relationship between two variables?
A. The number of gophers in the treatment group is equal to the number of groundhogs in the treatment group, and the number of gophers in the control group is equal to the number of groundhogs in the control group.
B. The gophers and the groundhogs are randomly selected from their respective habitats.
C. The gophers and the groundhogs are randomly assigned to the treatment and control groups.
D. The average age of the gophers in the treatment group is equal to the average age of the groundhogs in the treatment group, and the average age of the gophers in the control group is equal to the average age of the groundhogs in the control group.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: A cause-and-effect relationship can be established only when the subjects are randomly assigned to the treatment and control groups, so that the groups differ, apart from chance, only in the treatment. Random selection from the habitats (choice B) allows the results to be generalized to the habitats but does not by itself allow a cause-and-effect conclusion. Equal group sizes (choice A) and equal average ages (choice D) are not necessary.

8.

<div class="q-tables">
<table class="q-table"><thead><tr><th colspan="2">Data Set A</th></tr><tr><th>Value</th><th>Frequency</th></tr></thead><tbody><tr><td>$c$</td><td>12</td></tr><tr><td>$2c$</td><td>21</td></tr><tr><td>$3c$</td><td>30</td></tr></tbody></table>
<table class="q-table"><thead><tr><th colspan="2">Data Set B</th></tr><tr><th>Value</th><th>Frequency</th></tr></thead><tbody><tr><td>$c$</td><td>30</td></tr><tr><td>$2c$</td><td>21</td></tr><tr><td>$3c$</td><td>12</td></tr></tbody></table>
</div>

The frequency tables represent data sets A and B, where $c$ is a negative integer constant. The mean of data set A is $r$ and the mean of data set B is $q$. What is the value of $\dfrac{r}{q}$?
A. $-\dfrac{4}{3}$
B. $1$
C. $\dfrac{4}{3}$
D. There is not enough information to determine the value of $\dfrac{r}{q}$.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Each data set has $12 + 21 + 30 = 63$ values. The sum of data set A is $12c + 21(2c) + 30(3c) = 144c$, so $r = \frac{144c}{63}$. The sum of data set B is $30c + 21(2c) + 12(3c) = 108c$, so $q = \frac{108c}{63}$. Since $c \ne 0$, $\frac{r}{q} = \frac{144c}{108c} = \frac{4}{3}$. The sign of $c$ does not matter, because $c$ cancels; data set A has a mean of greater absolute value because more of its values are $3c$.

9. There are two ranches: ranch A and ranch B. The ratio of male horses to female horses is $1:15$ for the total number of horses on ranches A and B. The ratio of female horses on ranch A to ranch B is $7:17$. There are $168$ horses on ranch A and $344$ horses on ranch B. How many more male horses are there on ranch A than on ranch B?
Answer: 24
Domain: Problem-Solving and Data Analysis
Explanation: There are $168 + 344 = 512$ horses in all. With a male-to-female ratio of $1:15$, there are $\frac{1}{16}(512) = 32$ male horses and $512 - 32 = 480$ female horses. Splitting the female horses in the ratio $7:17$ gives $\frac{7}{24}(480) = 140$ on ranch A and $\frac{17}{24}(480) = 340$ on ranch B. So ranch A has $168 - 140 = 28$ male horses and ranch B has $344 - 340 = 4$ male horses, and ranch A has $28 - 4 = 24$ more.

10.

![Scatterplot of 7 points in the xy-plane, with both axes labeled from 2 to 14 in steps of 2. The points are at approximately (2, 3), (4.5, 7), (5.5, 10), (6.5, 7), (7, 8.5), (9.5, 10), and (12.5, 13.4). A line of best fit, approximately y = 2.4 + 0.88x, rises from about (0, 2.4) on the y-axis to about (15, 15.6), passing through about (7, 8.5) and (12.5, 13.4).](tests/images/data-analysis-b/q10.svg)

The scatterplot shows the relationship between two variables, $x$ and $y$, for the $7$ data points in data set W. A line of best fit for data set W is also shown. This line can be represented by an equation in the form $y = s + tx$, where $s$ and $t$ are constants. Data set V consists of all the data points in data set W as well as the point $(14, 8)$. A line of best fit for data set V can be represented by the equation $y = r + px$, where $r$ and $p$ are constants. Assuming the lines of best fit are calculated the same way, which of the following statements must be true?

I. $t > p$

II. $s > r$
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The line for data set W has a $y$-intercept of about $2.4$ and a slope of about $0.88$, so at $x = 14$ it is at about $y = 14.7$. The new point $(14, 8)$ is far below the line and to the right of all the other points, so it pulls the right end of the line down: the new line is less steep, so $p < t$ and statement I is true. A less steep line that still passes near the middle of the data is higher at the left end, so its $y$-intercept increases: $r > s$, and statement II is false. (A least-squares fit gives about $y = 2.6 + 0.86x$ for W and about $y = 4.5 + 0.50x$ for V.)

11. A researcher investigated two species of mites: a predator and its prey. At the start of a week, there was an equal number of the two species. At the end of the week, the number of prey has increased by $2{,}700\%$ of the number of prey at the start of the week, and the number of predators has increased by $180\%$ of the number of predators at the start of the week. The number of prey at the end of the week was $p\%$ greater than the number of predators at the end of the week. What is the value of $p$?
Answer: 900
Domain: Problem-Solving and Data Analysis
Explanation: Let $n$ be the number of each species at the start of the week. At the end of the week there are $n + 27n = 28n$ prey and $n + 1.8n = 2.8n$ predators. The number of prey is greater than the number of predators by $28n - 2.8n = 25.2n$, which is $\frac{25.2n}{2.8n} = 9$, or $900\%$, of the number of predators. So $p = 900$.

12. A square map has a side length of $45$ inches, and $1$ inch on the map represents an actual distance of $19$ miles. A smaller version of the same map is printed as a square with the side length $70\%$ shorter than the side length of the previous map. On the smaller map, which of the following is closest to the actual distance, in miles, represented by $1$ inch?
A. $5.70$
B. $11.18$
C. $31.50$
D. $63.33$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The side of the original map represents $45 \times 19 = 855$ miles. The smaller map has a side length of $45(1 - 0.70) = 13.5$ inches, and that side still represents $855$ miles. So $1$ inch on the smaller map represents $\frac{855}{13.5} \approx 63.33$ miles (equivalently, $\frac{19}{0.3}$). Choice A multiplies $19$ by $0.3$ instead of dividing.

13. Data set F consists of $55$ integers, where the value of each integer is between $150$ and $260$. Data set G consists of the same $55$ integers in data set F as well as the integer $10$. Which of the following must be less for data set G than for data set F?

I. The mean

II. The median
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The value $10$ is less than every value in data set F, so it is less than the mean of F, and adding it must decrease the mean: statement I is true. The median of F is its $28$th value. Data set G has $56$ values, and since $10$ is the least value, the $28$th and $29$th values of G are the $27$th and $28$th values of F, so the median of G is the mean of the $27$th and $28$th values of F. If those two values are equal, the medians are equal, so the median need not be less: statement II need not be true.

14.

| Weight (pounds) | Frequency |
|:---:|:---:|
| 13 | 12 |
| 14 | 10 |
| 15 | 3 |
| 16 | 5 |
| 17 | 7 |
| 18 | 12 |
| 19 | 13 |
| 20 | 9 |

The frequency table summarizes a data set of the weights, rounded to the nearest pound, of $71$ *Ardeotis kori* birds. A weight of $32$ pounds is added to the original data set, creating a new data set of the weights, rounded to the nearest pound, of $72$ *Ardeotis kori* birds. Which statement best compares the mean and median of the new data set to the mean and median of the original data set?
A. The mean of the new data set is greater than the mean of the original data set, and the median of the new data set is greater than the median of the original data set.
B. The mean of the new data set is greater than the mean of the original data set, and the medians of the two data sets are equal.
C. The mean of the new data set is less than the mean of the original data set, and the median of the new data set is less than the median of the original data set.
D. The mean of the new data set is equal to the mean of the original data set, and the median of the new data set is equal to the median of the original data set.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The value $32$ is greater than every original weight, so adding it increases the mean (from $\frac{1{,}183}{71} \approx 16.66$ to $\frac{1{,}215}{72} \approx 16.88$ pounds). The cumulative frequencies are $12, 22, 25, 30, 37, \ldots$, so the $31$st through $37$th values are all $17$. The original median is the $36$th of $71$ values, $17$. The new median is the mean of the $36$th and $37$th of $72$ values, $\frac{17 + 17}{2} = 17$. So the mean increases and the medians are equal.

15.

![Scatterplot in the xy-plane. Both axes have a break near the origin. The x-axis is labeled 100, 110, 120, and 130, with grid lines every 5 units; the y-axis is labeled from 13.0 to 15.0 in steps of 0.5, with grid lines every 0.25 unit. There are 10 points at about (101, 14.2), (105, 14.3), (109, 14.5), (113, 14.5), (117, 14.7), (118, 14.6), (127, 14.9), (128, 15.0), (129, 14.9), and (130, 15.0). A line of best fit runs from about (100, 14.2) to about (131, 15.0).](tests/images/data-analysis-b/q15.svg)

The scatterplot shows the relationship between two variables, $x$ and $y$, for data set P. A line of best fit for the data is also shown. Data set Q is created by adding $649$ units to the value of $x$ for each data point from data set P. Which of the following could be an equation of a line of best fit for data set Q?
A. $y = 28 + \dfrac{35}{1{,}301}x$
B. $y = 18 + \dfrac{1}{131}x$
C. $y = 9 + \dfrac{1}{131}x$
D. $y = -6 + \dfrac{35}{1{,}301}x$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Adding $649$ to every $x$-value shifts the data, and the line of best fit, $649$ units to the right without changing the slope. The line for data set P rises from about $14.2$ at $x = 100$ to about $15.0$ at $x = 130$, so its slope is about $\frac{0.8}{30} \approx 0.027$. This matches $\frac{35}{1{,}301} \approx 0.027$, not $\frac{1}{131} \approx 0.0076$, which eliminates choices B and C. For data set Q, the point $(100, 14.2)$ moves to $(749, 14.2)$. Choice D gives $-6 + \frac{35}{1{,}301}(749) \approx 14.15$ at $x = 749$, which fits, while choice A gives about $48.15$.

16.

![Dot plot with a horizontal axis labeled Capacity (microfarads), marked at 4, 7, 10, 13, and 16. There are 5 dots at 4, 6 dots at 7, 3 dots at 10, 6 dots at 13, and 5 dots at 16, for 25 dots in all.](tests/images/data-analysis-b/q16.svg)

The dot plot shows the distribution of capacity for a set of capacitors, set A, which a researcher used for a certain experiment. For another experiment, the researcher used a different set of capacitors, set B. Set B has the same number of capacitors as set A, but the capacity of each capacitor of set B is $14$ microfarads ($\mu$F) greater than the capacity of each respective capacitor in set A. Which of the following is true about the capacities of the capacitors in set B?
A. The mean capacity is $10\ \mu\text{F}$, and the range of capacities is $12\ \mu\text{F}$.
B. The mean capacity is $10\ \mu\text{F}$, and the range of capacities is $26\ \mu\text{F}$.
C. The mean capacity is $24\ \mu\text{F}$, and the range of capacities is $12\ \mu\text{F}$.
D. The mean capacity is $24\ \mu\text{F}$, and the range of capacities is $26\ \mu\text{F}$.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Set A has $5$, $6$, $3$, $6$, and $5$ capacitors at $4$, $7$, $10$, $13$, and $16\ \mu\text{F}$. The distribution is symmetric about $10$, so its mean is $10\ \mu\text{F}$ (the sum is $250$ for $25$ capacitors), and its range is $16 - 4 = 12\ \mu\text{F}$. Adding $14\ \mu\text{F}$ to every capacity adds $14$ to the mean, giving $24\ \mu\text{F}$, and does not change the range, which stays $12\ \mu\text{F}$. Choice A describes set A, not set B.

17. The area of a rectangular region is increasing at a rate of $260$ square feet per hour. Which of the following is closest to this rate in square meters per minute? (Use $1$ meter $= 3.28$ feet.)
A. $0.40$
B. $1.32$
C. $14.21$
D. $24.17$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Since $1$ meter $= 3.28$ feet, $1$ square meter $= 3.28^2 = 10.7584$ square feet. So $260$ square feet per hour is $\frac{260}{10.7584} \approx 24.17$ square meters per hour, and dividing by $60$ minutes per hour gives about $0.40$ square meters per minute. Choice D is the rate per hour, and choice B converts feet to meters only once ($\frac{260}{3.28 \times 60} \approx 1.32$).

18.

| Values | Data set A frequency | Data set B frequency | Data set C frequency | Data set D frequency |
|:---:|:---:|:---:|:---:|:---:|
| 40 | 0 | 0 | 8 | 8 |
| 43 | 2 | 3 | 3 | 4 |
| 46 | 4 | 3 | 3 | 2 |
| 49 | 8 | 8 | 0 | 0 |

The table shows the frequencies of the data values for four data sets. Which data set has the greatest mean?
A. Data set A
B. Data set B
C. Data set C
D. Data set D
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Each data set has $14$ values. Data sets C and D have $8$ values of $40$ and no values of $49$, so their means (about $41.93$ and $41.71$) are much less than those of A and B. Data sets A and B both have $8$ values of $49$, but A has $2$ values of $43$ and $4$ values of $46$, while B has $3$ of each, so A's sum is greater: $2(43) + 4(46) + 8(49) = 662$ versus $3(43) + 3(46) + 8(49) = 659$. The mean of A, $\frac{662}{14} \approx 47.29$, is the greatest.

19. A real estate company offers a series of three webinars. $1{,}250$ people attended the first webinar, $46\%$ of the people who attended the first webinar attended the second webinar, and $32\%$ of the people who attended the first and second webinars attended the third webinar. How many people attended all three webinars?
Answer: 184
Domain: Problem-Solving and Data Analysis
Explanation: The number of people who attended the first and second webinars is $0.46 \times 1{,}250 = 575$. Of these, $32\%$ attended the third webinar, so $0.32 \times 575 = 184$ people attended all three webinars.

20. The table shows the distribution of $88$ basketball players and their positions in a basketball club. Each player is categorized in one position.

| Position | Frequency |
|:---:|:---:|
| Point guard | 26 |
| Shooting guard | 16 |
| Small forward | 11 |
| Power forward or center | 35 |

If one of the $88$ players is selected at random, the probability of selecting a player who is categorized as a power forward, given that the player is not categorized as a shooting guard, is $\dfrac{3}{12}$. How many of these players are categorized as a center?
Answer: 17
Domain: Problem-Solving and Data Analysis
Explanation: There are $88 - 16 = 72$ players who are not shooting guards. Since the conditional probability is $\frac{3}{12}$, the number of power forwards is $\frac{3}{12} \times 72 = 18$. The $35$ players in the last row are power forwards or centers, so $35 - 18 = 17$ players are centers.

21. A grove has $6$ rows of birch trees and $5$ rows of maple trees. Each row of birch trees has $8$ trees $20$ feet or taller and $6$ trees shorter than $20$ feet. Each row of maple trees has $9$ trees $20$ feet or taller and $7$ trees shorter than $20$ feet. A tree from one of these rows will be selected at random. What is the probability of selecting a maple tree, given that the tree is $20$ feet or taller?
A. $\dfrac{9}{164}$
B. $\dfrac{3}{10}$
C. $\dfrac{15}{31}$
D. $\dfrac{9}{17}$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: There are $6 \times 8 = 48$ birch trees and $5 \times 9 = 45$ maple trees that are $20$ feet or taller, for $93$ such trees. The probability that a tree $20$ feet or taller is a maple tree is $\frac{45}{93} = \frac{15}{31}$. Choice D uses only one row of each kind ($\frac{9}{8 + 9}$), and choice A divides by all $164$ trees.

22. A square map has a side length of $55$ inches, and $1$ inch on the map represents an actual distance of $13$ miles. A larger version of the same map is printed as a square with the side length $90\%$ longer than the side length of the previous map. On the larger map, which of the following is closest to the actual distance, in miles, represented by $1$ inch?
A. $1.30$
B. $6.84$
C. $24.70$
D. $49.50$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The side of the original map represents $55 \times 13 = 715$ miles. The larger map has a side length of $55(1.90) = 104.5$ inches, and that side still represents $715$ miles. So $1$ inch on the larger map represents $\frac{715}{104.5} \approx 6.84$ miles (equivalently, $\frac{13}{1.9}$). Choice C multiplies $13$ by $1.9$ instead of dividing.

23. The box plots below show the distribution of copper concentration, in milligrams (mg) per kilogram (kg) of soil, in soil samples collected from two locations in a particular city.

![Two vertical box plots, Location A and Location B, on a vertical axis labeled Copper concentration (mg/kg), from 0 to 100.0 with grid lines every 10 and labels every 20. Location A: minimum about 4, first quartile 15, median 20, third quartile 25, maximum 34. Location B: minimum about 4, first quartile 14, median 29, third quartile 48, maximum 73.](tests/images/data-analysis-b/q23.svg)

What is the approximate difference, in mg/kg, between the range of copper concentration in the Location B samples and the range of copper concentration in the Location A samples?
A. $6$
B. $12$
C. $39$
D. $52$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The range is the maximum minus the minimum, shown by the ends of the whiskers. For Location B the range is about $73 - 4 = 69$ mg/kg, and for Location A it is about $34 - 4 = 30$ mg/kg. The difference is about $69 - 30 = 39$ mg/kg.

24.

![Two identical histograms titled Data Set A and Data Set B. Each has a horizontal axis labeled Integer, marked 10, 20, 30, 40, and 50, and a vertical axis labeled Frequency, from 0 to 12 in steps of 2. In each histogram the bar heights are 3 for 10 to 20, 4 for 20 to 30, 7 for 30 to 40, and 9 for 40 to 50.](tests/images/data-analysis-b/q24.svg)

Two data sets of $23$ integers each are summarized in the histograms shown. For each of the histograms, the first interval represents the frequency of integers greater than or equal to $10$, but less than $20$. The second interval represents the frequency of integers greater than or equal to $20$, but less than $30$, and so on. What is the smallest possible difference between the mean of data set A and the mean of data set B?
A. $0$
B. $1$
C. $10$
D. $23$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The two histograms are identical: each has $3$, $4$, $7$, and $9$ integers in the intervals starting at $10$, $20$, $30$, and $40$. The histograms do not show the individual values, so the two data sets could consist of exactly the same $23$ integers. In that case the means are equal, so the smallest possible difference between the means is $0$.

25. Data set A consists of $37$ different values that have a minimum of $230$, a maximum of $278$, a mean of $244$, and a standard deviation of $9$. The values $230$ and $278$ are removed from the data set to create data set B. Which of the following statements is true?
A. Both the mean and standard deviation of data set B are less than those in data set A.
B. Both the mean and standard deviation of data set B are greater than those in data set A.
C. The standard deviation of data set B is less than the standard deviation in data set A but the mean of both data sets is the same.
D. The standard deviation of data set B is greater than the standard deviation in data set A but the mean of both data sets is the same.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The sum of data set A is $37 \times 244 = 9{,}028$. Removing $230$ and $278$ leaves $9{,}028 - 508 = 8{,}520$ for $35$ values, so the mean of B is $\frac{8{,}520}{35} \approx 243.4$, less than $244$ (the two removed values have a mean of $254$, which is greater than $244$). The removed values are $14$ and $34$ away from the mean, with squared distances $196$ and $1{,}156$, much more than the variance $9^2 = 81$, so removing them decreases the standard deviation; a direct calculation gives a standard deviation of about $6.8$ for data set B. So both the mean and the standard deviation decrease.

26. Four different research groups each surveyed a random sample of students from a certain high school to estimate the percentage of students at the school who speak a second language. The table shows the resulting estimates and their associated margins of error.

| Group | Percentage of students who speak a second language | Margin of error |
|:---:|:---:|:---:|
| 1 | 41% | 13% |
| 2 | 45% | 11% |
| 3 | 45% | 8% |
| 4 | 47% | 15% |

Assuming the margins of error were calculated in the same way, which group had the largest sample size?
A. Group 4
B. Group 3
C. Group 2
D. Group 1
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: When margins of error are calculated in the same way, a larger sample size produces a smaller margin of error. Group 3 has the smallest margin of error, $8\%$, so it had the largest sample size. Group 4, with the largest margin of error, had the smallest sample size.

27. A farmer gave two groups of chickens different types of chicken feed for a month to measure the effect on egg production. The lists give the number of eggs collected from each chicken in each of the two groups.

$$\begin{gathered} \text{Group G: } 8, 16, 18, 18, 24 \\[4pt] \text{Group H: } 16, 18, 18, 24 \end{gathered}$$

Which statement correctly compares the median number of eggs collected for group G and the median number of eggs collected for group H?
A. The median number of eggs collected for group G is equal to the median number of eggs collected for group H.
B. The median number of eggs collected for group G is greater than the median number of eggs collected for group H.
C. The median number of eggs collected for group G is less than the median number of eggs collected for group H.
D. There is not enough information to compare the median number of eggs collected for group G and the median number of eggs collected for group H.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Group G has $5$ values in order, so its median is the $3$rd value, $18$. Group H has $4$ values, so its median is the mean of the $2$nd and $3$rd values, $\frac{18 + 18}{2} = 18$. The medians are equal.

28. At a nature preserve, a wildlife biologist counted ducks from an observation deck at the same time each day for $41$ days. The table summarizes the resulting data set, data set A.

| Number of ducks | Number of days |
|:---:|:---:|
| 0 | 1 |
| 1 | 7 |
| 2 | 8 |
| 3 | 9 |
| 4 | 8 |
| 5 | 7 |
| 13 | 1 |

The data value $13$ was recorded in error and was removed from data set A to create data set B, which consists of the remaining $40$ data values. Which statement best compares the median of data set A and the median of data set B?
A. The median of data set B is greater than the median of data set A.
B. There is not enough information to compare the medians of the two data sets.
C. The median of data set B is equal to the median of data set A.
D. The median of data set B is less than the median of data set A.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The cumulative frequencies are $1, 8, 16, 25, \ldots$, so the $17$th through $25$th values are all $3$. Data set A has $41$ values, so its median is the $21$st value, $3$. Data set B has $40$ values (the largest value, $13$, is removed), so its median is the mean of the $20$th and $21$st values, $\frac{3 + 3}{2} = 3$. The medians are equal.

29. A researcher is designing a study to investigate the average number of hours students at a high school spend reading per day. The researcher will report an estimated average number of hours students at the high school spend reading per day with an associated margin of error. The researcher is considering using a random sample of either $90$ or $180$ students from the high school. Which of the following would be the most likely effect of using the larger random sample compared to the smaller random sample?
A. The reported margin of error would be lower.
B. The reported margin of error would be higher.
C. The reported average number of hours would be lower.
D. The reported average number of hours would be higher.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: A larger random sample gives a more precise estimate, so the associated margin of error would most likely be lower. The sample size does not push the estimated average in a particular direction, so there is no reason to expect the reported average to be lower or higher.

30. Two participants solved a puzzle cube during timed competitions. The lists give the times, to the nearest second, that participant A and participant B took to solve the cube at various competitions.

$$\begin{gathered} \text{Participant A: } 23, 23, 24, 27 \\[4pt] \text{Participant B: } 23, 23, 24, 27, 39 \end{gathered}$$

Which statement correctly compares the mean solve times, to the nearest second, of participant A and participant B at these competitions?
A. The mean solve time of participant A is greater than the mean solve time of participant B.
B. There is not enough information to compare the mean solve times of participant A and participant B.
C. The mean solve time of participant A is less than the mean solve time of participant B.
D. The mean solve time of participant A is equal to the mean solve time of participant B.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The mean for participant A is $\frac{23 + 23 + 24 + 27}{4} = \frac{97}{4} = 24.25$ seconds. Participant B has the same four times plus $39$, which is greater than $24.25$, so B's mean is greater: $\frac{136}{5} = 27.2$ seconds. The mean solve time of participant A is less than that of participant B.

31. Sunspots are temporary dark spots on the surface of the Sun. The monthly mean number of sunspots for one calendar month is the average of the number of sunspots observed each day during the month. The linear function $s$ models the monthly mean number of sunspots as a function of the number of months, $x$, since December 2013, where $0 \le x \le 30$. The graph of $y = s(x)$ is shown.

![Graph of y = s(x) in the xy-plane. The horizontal axis, Months since December 2013, is labeled 5 to 30 in steps of 5, with grid lines every 5. The vertical axis, Monthly mean number of sunspots, is labeled 20 to 120 in steps of 20, with grid lines every 10. The graph is a line segment from (0, 120) to (30, 48), passing through (5, 108), (10, 96), (15, 84), (20, 72), and (25, 60).](tests/images/data-analysis-b/q31.svg)

Which of the following is the best estimate for the monthly mean number of sunspots in December 2014?
A. $61$
B. $71$
C. $81$
D. $91$
Answer: D
Domain: Algebra
Explanation: December 2014 is $12$ months after December 2013, so the estimate is $s(12)$. The graph passes through $(0, 120)$ and $(30, 48)$, so its slope is $\frac{48 - 120}{30} = -2.4$ and $s(x) = 120 - 2.4x$. Then $s(12) = 120 - 2.4(12) = 91.2$, so the best estimate is $91$. Choice B, $71$, is close to $s(20) = 72$, which is the estimate for August 2015, not December 2014.

32. $0.0036$ is $0.6\%$ of $a$, and $84$ is $350\%$ of $b$, where $a$ and $b$ are positive numbers. What percentage of $a$ is $b$?
A. $40\%$
B. $144\%$
C. $1{,}440\%$
D. $4{,}000\%$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: From $0.006a = 0.0036$, $a = 0.6$. From $3.5b = 84$, $b = 24$. Then $\frac{b}{a} = \frac{24}{0.6} = 40$, so $b$ is $40 \times 100\% = 4{,}000\%$ of $a$. Choice A gives the ratio $40$ as if it were a percentage.

33. An entomologist placed an initial population of $20$ *Tenebrio molitor*, a type of beetle, into a habitat and monitored the population over time. When the number of *Tenebrio molitor* in the habitat reached $180\%$ of the initial population, the entomologist moved $75\%$ of the *Tenebrio molitor* to a second habitat. How many *Tenebrio molitor* did the entomologist move to the second habitat at this time?
Answer: 27
Domain: Problem-Solving and Data Analysis
Explanation: The population reached $180\%$ of $20$, which is $1.8 \times 20 = 36$ beetles. The entomologist moved $75\%$ of them, or $0.75 \times 36 = 27$ beetles.

34. Two sets of blocks include both wood-finish and painted blocks. The table summarizes the types of blocks in each set.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th>Set</th><th>Wood-finish blocks</th><th>Painted blocks</th><th>Total</th></tr></thead><tbody><tr><td>A</td><td>4</td><td>8</td><td>12</td></tr><tr><td>B</td><td>14</td><td>5</td><td>19</td></tr><tr><td>Total</td><td>18</td><td>13</td><td>31</td></tr></tbody></table></div>

If one of these blocks is selected at random, what is the probability of selecting a wood-finish block that is in set A? Express your answer as a decimal or fraction, not as a percent.
Answer: 4/31
Domain: Problem-Solving and Data Analysis
Explanation: There are $31$ blocks in all, and $4$ of them are wood-finish blocks in set A. So the probability is $\frac{4}{31}$ (about $0.129$). This is not a conditional probability, so the denominator is the total $31$, not $12$ or $18$.

35.

$$a, 26, 29, b, 33, 46, c$$

For the given data set, the data values are listed in ascending order, where $a$, $b$, and $c$ are constants. For this data set, the mean is $36$, the median is $29$, and the range is $71$. What is the value of $c$?
A. $55$
B. $71$
C. $80$
D. $97$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The data set has $7$ values, so the median is the $4$th value: $b = 29$. The mean is $36$, so the sum is $7 \times 36 = 252$, and $a + 26 + 29 + 29 + 33 + 46 + c = 252$ gives $a + c = 89$. The range is $c - a = 71$. Adding the two equations gives $2c = 160$, so $c = 80$ (and $a = 9$). Check: $9, 26, 29, 29, 33, 46, 80$ has mean $36$, median $29$, and range $71$.

36. The concentration of calcium, in milligrams per liter (mg/L), is found for three samples of water: bottled, tap, and mineral. The concentration of calcium in the sample of bottled water is $48\%$ of the concentration of calcium in the sample of tap water and $24\%$ of the concentration of calcium in the sample of mineral water. If the concentration of calcium in the sample of tap water is $36$ mg/L, what is the concentration of calcium, in mg/L, in the sample of mineral water?
Answer: 72
Domain: Problem-Solving and Data Analysis
Explanation: The concentration in the bottled water is $48\%$ of $36$ mg/L, which is $0.48(36) = 17.28$ mg/L. This is also $24\%$ of the concentration $m$ in the mineral water, so $0.24m = 17.28$ and $m = \frac{17.28}{0.24} = 72$ mg/L. (Since $48\%$ is twice $24\%$, the mineral water's concentration is twice the tap water's: $2(36) = 72$.)

37. A group of $10$ gardeners recorded data on the germination rates of their tomato crop for one growing season. The scatterplot shows the relationship between the number of tomato seeds planted, $x$, and the number of tomato seeds that germinated, $y$, for each of the gardeners. A line of best fit is also shown.

![Scatterplot in the xy-plane with the origin labeled O. The x-axis (number of tomato seeds planted) and the y-axis (number of tomato seeds that germinated) each run from 0 to 500, labeled every 100, with grid lines every 50. Ten points are plotted at (35, 24), (100, 90), (162, 89), (200, 141), (243, 209), (310, 169), (350, 246), (387, 230), (459, 372), and (490, 347). The line of best fit starts at the origin and passes through (100, 70), (200, 140), and (500, 350).](tests/images/data-analysis-b/q37.svg)

Which of the following is the best interpretation of the slope of the line of best fit in this context?
A. The number of tomato seeds planted is predicted to increase by $70$ seeds every $100$ days.
B. The number of tomato seeds planted is predicted to increase by $350$ seeds every $100$ days.
C. The number of tomato seeds that germinate is predicted to increase by $70$ seeds for every additional $100$ tomato seeds that are planted.
D. The number of tomato seeds that germinate is predicted to increase by $350$ seeds for every additional $100$ tomato seeds that are planted.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The line of best fit passes through $(0, 0)$ and $(500, 350)$, so its slope is $\frac{350 - 0}{500 - 0} = 0.7 = \frac{70}{100}$. The slope is the predicted change in $y$, the number of seeds that germinate, for each change in $x$, the number of seeds planted, so about $70$ more seeds are predicted to germinate for every additional $100$ seeds planted. Choices A and B are incorrect because the graph does not involve time, and choice D uses $350$, which is the predicted number of germinated seeds when $500$ seeds are planted, not the change per $100$ seeds.

38. An inspector checked a sample of $370$ scales selected at random from a population of $8{,}000$ scales to estimate what percentage of the $8{,}000$ scales were inaccurate. From this sample, the inspector estimated that $9\%$ of the $8{,}000$ scales were inaccurate, with an associated margin of error of $2.9\%$. Which of the following is the most appropriate conclusion?
A. It is plausible that between $488$ and $952$ of the scales in the population are inaccurate.
B. It is plausible that fewer than $488$ of the scales in the population are inaccurate.
C. Exactly $720$ of the scales in the population are inaccurate.
D. It is plausible that more than $952$ of the scales in the population are inaccurate.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The plausible values for the percentage of inaccurate scales are from $9\% - 2.9\% = 6.1\%$ to $9\% + 2.9\% = 11.9\%$. Of the $8{,}000$ scales, $0.061(8{,}000) = 488$ and $0.119(8{,}000) = 952$, so it is plausible that between $488$ and $952$ of the scales are inaccurate. Choices B and D describe values outside this interval, and choice C is incorrect because the estimate $0.09(8{,}000) = 720$ comes from a sample and is not an exact count.

39. In a study of high-precision manufacturing, a sample of $1{,}200$ microprocessors produced by Machine A had a mean lifespan of $18{,}400$ hours with a standard deviation of $350$ hours. A sample of $1{,}200$ microprocessors produced by Machine B had a mean lifespan of $18{,}400$ hours with a standard deviation of $720$ hours. Which of the following statements must be true?
A. Machine A produced more microprocessors that lasted longer than $19{,}500$ hours than Machine B did.
B. The median lifespan of microprocessors from Machine A is strictly greater than the median lifespan of microprocessors from Machine B.
C. The lifespans of the microprocessors produced by Machine B showed greater variability around the mean than the lifespans of the microprocessors produced by Machine A.
D. The total lifespan of all microprocessors tested from Machine B was greater than the total lifespan of all microprocessors tested from Machine A.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Standard deviation measures how spread out the values are around the mean. Machine B's standard deviation, $720$ hours, is greater than Machine A's, $350$ hours, so Machine B's lifespans showed greater variability around the mean. The means and standard deviations do not determine the medians or how many lifespans exceeded $19{,}500$ hours, so choices A and B need not be true. Choice D is false: both samples have $1{,}200$ microprocessors with a mean of $18{,}400$ hours, so each total lifespan is $1{,}200(18{,}400) = 22{,}080{,}000$ hours.

40. A sample consisted of $750$ people selected at random from all adult residents in a certain city. Based on the sample, the estimated percentage of all adult residents who think taxes are too high was $62\%$, with an associated margin of error of $3.47\%$. Which of the following best describes the range of plausible values for the percentage of all adult residents in the city who think taxes are too high?
A. Any value greater than $65.47\%$
B. Any value greater than $58.53\%$ and less than $65.47\%$
C. Any value less than $58.53\%$ or greater than $65.47\%$
D. Any value less than $58.53\%$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The plausible values are within the margin of error of the estimate: from $62\% - 3.47\% = 58.53\%$ to $62\% + 3.47\% = 65.47\%$. So any value greater than $58.53\%$ and less than $65.47\%$ is plausible. Choices A, C, and D describe values outside this interval.

41. The number $0.1242$ is $0.09\%$ of the number $b$. The number $b$ is $25\%$ of the number $c$. What is the value of $c$?
Answer: 552
Domain: Problem-Solving and Data Analysis
Explanation: Since $0.09\% = 0.0009$, the first statement gives $0.0009b = 0.1242$, so $b = \frac{0.1242}{0.0009} = 138$. The second statement gives $0.25c = 138$, so $c = \frac{138}{0.25} = 552$.

42. A car dealership has only sedans, SUVs, and minivans for sale. On Monday, $20\%$ of the vehicles for sale were sedans and $50\%$ were SUVs. If there were $62$ sedans for sale at the dealership on Monday, how many minivans were for sale?
Answer: 93
Domain: Problem-Solving and Data Analysis
Explanation: The $62$ sedans are $20\%$ of the vehicles, so there were $\frac{62}{0.20} = 310$ vehicles for sale. The minivans are the remaining $100\% - 20\% - 50\% = 30\%$, so there were $0.30(310) = 93$ minivans. Check: $62 + 0.50(310) + 93 = 62 + 155 + 93 = 310$.

43. The density of a certain type of marble stone is $2.6000$ grams per cubic centimeter. If a sample of this type of stone is in the shape of a sphere with a diameter of $31.000$ centimeters, what is the mass of this sample, in grams, to the nearest whole number? (Use $3.14159$ for $\pi$.)
Answer: 40556
Domain: Problem-Solving and Data Analysis
Explanation: The radius of the sphere is $\frac{31}{2} = 15.5$ centimeters, so its volume is $\frac{4}{3}\pi r^3 = \frac{4}{3}(3.14159)(15.5)^3 = \frac{4}{3}(3.14159)(3{,}723.875) \approx 15{,}598.518$ cubic centimeters. The mass is the density times the volume: $2.6(15{,}598.518) \approx 40{,}556.15$ grams, which is $40{,}556$ grams to the nearest whole number. (Using the diameter $31$ as the radius would give a mass $8$ times too large.)

44. The percent increase in mass of a certain red kangaroo from $110$ days old to $220$ days old was $971\%$. If this red kangaroo's mass was $k$ grams at $110$ days old, which expression represents its mass, in grams, at $220$ days old?
A. $10.71k$
B. $9.71k$
C. $1.08k$
D. $0.08k$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: An increase of $971\%$ means the mass increased by $9.71k$ grams, so the new mass is $k + 9.71k = 10.71k$ grams. Choice B is only the amount of the increase, not the new mass.

45. A chemist prepares a buffer solution containing a weak acid and its conjugate base. The initial ratio of the concentration of conjugate base to acid is $3 : 5$. The chemist adds a reagent that increases the conjugate base concentration by $40\%$ and reduces the acid concentration by $25\%$. What is the new ratio of the concentration of conjugate base to acid?
A. $14 : 15$
B. $28 : 25$
C. $7 : 5$
D. $21 : 20$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Let the initial concentrations of conjugate base and acid be $3x$ and $5x$. After the change, the conjugate base concentration is $1.40(3x) = 4.2x$ and the acid concentration is $0.75(5x) = 3.75x$. The new ratio is $4.2 : 3.75$, which is $420 : 375 = 28 : 25$. Choice C, $4.2 : 3 = 7 : 5$, results from reducing the acid concentration by $40\%$ instead of $25\%$.

46. A real estate company offers a series of three webinars. $1{,}875$ people attended the first webinar, $64\%$ of the people who attended the first webinar attended the second webinar, and $29\%$ of the people who attended the first and second webinars attended the third webinar. How many people attended all three webinars?
Answer: 348
Domain: Problem-Solving and Data Analysis
Explanation: The number of people who attended both the first and second webinars is $0.64(1{,}875) = 1{,}200$. Of these, $29\%$ attended the third webinar, so $0.29(1{,}200) = 348$ people attended all three webinars.

47. How many liters of a $30\%$ chlorine solution must be added to $12$ liters of a $10\%$ chlorine solution to obtain a $15\%$ chlorine solution?
Answer: 4
Domain: Problem-Solving and Data Analysis
Explanation: Let $x$ be the number of liters of the $30\%$ solution. The amount of chlorine in the mixture is $0.30x + 0.10(12)$, and it must equal $15\%$ of the $x + 12$ liters of mixture: $0.30x + 1.2 = 0.15(x + 12) = 0.15x + 1.8$. So $0.15x = 0.6$ and $x = 4$. Check: $1.2 + 1.2 = 2.4$ liters of chlorine in $16$ liters is $\frac{2.4}{16} = 15\%$.

48. There are red, blue, green, and black marbles in a bag. There are $26$ black marbles, $8$ green marbles, and $26$ blue and red marbles. Given that a randomly selected marble is not black, the probability of selecting a red marble is $\dfrac{5}{17}$. What is the number of blue marbles in the bag?
Answer: 16
Domain: Problem-Solving and Data Analysis
Explanation: The marbles that are not black are the $8$ green marbles and the $26$ blue and red marbles, $8 + 26 = 34$ marbles in all. Since the probability of selecting a red marble from these is $\frac{5}{17}$, there are $\frac{5}{17}(34) = 10$ red marbles. So there are $26 - 10 = 16$ blue marbles.

49.

![Two horizontal box plots above a number line labeled Number of books, from 0 to 12 with tick marks every 1 and labels every 2. Class A: minimum 0, first quartile 1, median 2, third quartile 4, maximum 5. Class B: minimum 1, first quartile 4, median 7, third quartile 9, maximum 10.](tests/images/data-analysis-b/q49.svg)

The two box plots show the distribution of the number of books read over the summer by the students in two different English classes. What is the positive difference between the ranges of the number of books read over the summer for the two classes?
Answer: 4
Domain: Problem-Solving and Data Analysis
Explanation: The range is the maximum minus the minimum, shown by the ends of the whiskers. For class A, the range is $5 - 0 = 5$ books. For class B, the range is $10 - 1 = 9$ books. The positive difference between the ranges is $9 - 5 = 4$. (The interquartile ranges, $4 - 1 = 3$ and $9 - 4 = 5$, are not the ranges.)

50. For a certain computer game, individuals receive an integer score that ranges from $2$ through $10$. The table below shows the frequency distribution of the scores of the $9$ players in group A and the $11$ players in group B.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th rowspan="2">Score</th><th colspan="2">Score Frequencies</th></tr><tr><th>Group A</th><th>Group B</th></tr></thead><tbody><tr><td>2</td><td>1</td><td>0</td></tr><tr><td>3</td><td>1</td><td>0</td></tr><tr><td>4</td><td>2</td><td>0</td></tr><tr><td>5</td><td>1</td><td>4</td></tr><tr><td>6</td><td>3</td><td>2</td></tr><tr><td>7</td><td>0</td><td>0</td></tr><tr><td>8</td><td>0</td><td>2</td></tr><tr><td>9</td><td>1</td><td>1</td></tr><tr><td>10</td><td>0</td><td>2</td></tr><tr><td>Total</td><td>9</td><td>11</td></tr></tbody></table></div>

The median of the scores for group B is how much greater than the median of the scores for group A?
Answer: 1
Domain: Problem-Solving and Data Analysis
Explanation: Group A has $9$ scores, so its median is the $5$th score in order. Group A's scores in order are $2, 3, 4, 4, 5, 6, 6, 6, 9$, so its median is $5$. Group B has $11$ scores, so its median is the $6$th score. Group B's scores in order are $5, 5, 5, 5, 6, 6, 8, 8, 9, 10, 10$, so its median is $6$. The median for group B is $6 - 5 = 1$ greater.

51. The number $a$ is $90\%$ greater than the positive number $b$. The number $c$ is $60\%$ less than $a$. The number $c$ is how many times $b$?
Answer: 0.76 | 19/25
Domain: Problem-Solving and Data Analysis
Explanation: Since $a$ is $90\%$ greater than $b$, $a = 1.90b$. Since $c$ is $60\%$ less than $a$, $c = 0.40a$. So $c = 0.40(1.90b) = 0.76b$, and $c$ is $0.76$ times $b$.

52.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th colspan="5">Primary Mode of Transportation</th></tr><tr><th></th><th>Car</th><th>Public Transit</th><th>Bicycle</th><th>Total</th></tr></thead><tbody><tr><td>Male</td><td>48</td><td>30</td><td>16</td><td>94</td></tr><tr><td>Female</td><td>22</td><td>26</td><td>58</td><td>106</td></tr><tr><td>Total</td><td>70</td><td>56</td><td>74</td><td>200</td></tr></tbody></table></div>

The table shows the distribution of a random sample of $200$ commuters in a city, by primary mode of transportation and gender. If one commuter from the sample is selected at random, what is the probability that the selected commuter is a female who uses public transit?
Answer: 0.13 | 13/100
Domain: Problem-Solving and Data Analysis
Explanation: According to the table, $26$ of the $200$ commuters are females who use public transit. So the probability is $\frac{26}{200} = \frac{13}{100} = 0.13$. (The probability that a female commuter uses public transit, $\frac{26}{106}$, and the probability that a public transit user is female, $\frac{26}{56}$, answer different questions.)

53. The positive number $a$ is $2{,}047\%$ of the sum of the positive numbers $b$ and $c$, and $b$ is $89\%$ of $c$. What percent of $b$ is $a$?
A. $21.36\%$
B. $38.69\%$
C. $2{,}300\%$
D. $4{,}347\%$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Since $b = 0.89c$, $c = \frac{b}{0.89}$, so $b + c = b + \frac{b}{0.89} = \frac{1.89}{0.89}b$. Then $a = 20.47(b + c) = \frac{20.47(1.89)}{0.89}b = 43.47b$, so $a$ is $4{,}347\%$ of $b$. Check with $c = 100$: then $b = 89$, $b + c = 189$, $a = 20.47(189) = 3{,}868.83$, and $\frac{3{,}868.83}{89} = 43.47$.

54. A district school board in a certain state is proposing a change to the time school starts for all high schools in the district. A sample of $353$ high school students was selected at random from all high school students in the district. The selected students were asked whether they approved of the proposed change, and $300$ students responded that they did not approve. Which of the following is the largest population to which the results of the survey can be generalized?
A. All high school students in the district
B. The $353$ students who were surveyed
C. The $300$ students who responded that they did not approve of the proposed change
D. All high school students in the state
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The results of a survey of a random sample can be generalized to the population the sample was selected from. The students were selected at random from all high school students in the district, so the results can be generalized to all high school students in the district. Students elsewhere in the state were not part of the population sampled, so choice D is incorrect, and choices B and C are smaller groups than the district's population.

55. A research manager selected $2$ random samples of ovens of a certain type to estimate the average amount of time this type of oven takes to preheat to $325$ degrees Fahrenheit ($^\circ\text{F}$). The research manager recorded the amount of time, in minutes, each oven takes to preheat to $325^\circ\text{F}$. Based on the first sample, the research manager estimated that this type of oven takes an average of $15.2$ minutes to preheat to $325^\circ\text{F}$, with an associated margin of error of $1$ minute. Based on the second sample, the research manager estimated that this type of oven takes an average of $15.4$ minutes to preheat to $325^\circ\text{F}$, with an associated margin of error of $2.2$ minutes. Assuming the margins of error were calculated the same way, which of the following best explains why the first sample obtained a smaller margin of error than the second sample?
A. The first sample contained more ovens than the second sample.
B. The first sample contained fewer ovens than the second sample.
C. The first sample took more time on average to preheat to $325^\circ\text{F}$ than the second sample.
D. The first sample took less time on average to preheat to $325^\circ\text{F}$ than the second sample.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: When margins of error are calculated the same way for random samples from the same population, a larger sample size generally gives a smaller margin of error. The first sample had the smaller margin of error ($1$ minute compared with $2.2$ minutes), so the best explanation is that it contained more ovens. Choice B has the relationship backward, and the sample means in choices C and D do not explain the difference in the margins of error.

56. The speeds of particles A, B, and C are $a$ meters per second, $b$ meters per second, and $c$ meters per second, respectively. If the speed of particle A is $6{,}000\%$ of the speed of particle C and the speed of particle C is $0.008\%$ of the speed of particle B, which expression represents the value of $a + b$ in terms of $c$?
A. $12{,}560c$
B. $6{,}125c$
C. $6{,}008c$
D. $1{,}850c$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Since $6{,}000\% = 60$, $a = 60c$. Since $0.008\% = 0.00008$, $c = 0.00008b$, so $b = \frac{c}{0.00008} = 12{,}500c$. Therefore $a + b = 60c + 12{,}500c = 12{,}560c$.

57. The value of an autographed baseball increased by $178\%$ from the end of $2012$ to the end of $2013$ and then decreased by $21\%$ from the end of $2013$ to the end of $2014$. What was the net percentage increase in the value of the autographed baseball from the end of $2012$ to the end of $2014$?
A. $119.62\%$
B. $140.62\%$
C. $157.00\%$
D. $236.38\%$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: If the value at the end of $2012$ was $v$, the value at the end of $2013$ was $(1 + 1.78)v = 2.78v$, and the value at the end of $2014$ was $(1 - 0.21)(2.78v) = 0.79(2.78v) = 2.1962v$. This is a net increase of $2.1962v - v = 1.1962v$, or $119.62\%$. Choice C incorrectly subtracts the percentages, $178\% - 21\% = 157\%$, but the $21\%$ decrease applies to the larger $2013$ value.

58. A bin contains a mixture of T-shirts for two sports teams. The table shows the number of T-shirts in the bin, classified by size and sports team.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th></th><th>Flames</th><th>Sharks</th><th>Total</th></tr></thead><tbody><tr><td>Small</td><td>8</td><td>7</td><td>15</td></tr><tr><td>Medium</td><td>22</td><td>34</td><td>56</td></tr><tr><td>Large</td><td>14</td><td>27</td><td>41</td></tr><tr><td>Total</td><td>44</td><td>68</td><td>112</td></tr></tbody></table></div>

One T-shirt from the bin will be selected at random. What is the probability of selecting a T-shirt that is medium, given that the T-shirt is a Flames T-shirt?
A. $0.20$
B. $0.22$
C. $0.39$
D. $0.5$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Given that the T-shirt is a Flames T-shirt, only the $44$ Flames T-shirts are considered. Of these, $22$ are medium, so the probability is $\frac{22}{44} = 0.5$. Choice A is the probability that a T-shirt from the whole bin is a medium Flames T-shirt, $\frac{22}{112} \approx 0.20$, and choice C is the probability that a medium T-shirt is a Flames T-shirt, $\frac{22}{56} \approx 0.39$.

59. The values in data sets X and Y are shown in the table.

<div class="q-table-wrap"><table class="q-table"><tbody><tr><th>Data set X</th><td>13</td><td>13</td><td>14</td><td>14</td><td>15</td><td>16</td><td>16</td><td>17</td><td>17</td></tr><tr><th>Data set Y</th><td>2</td><td>2</td><td>3</td><td>3</td><td>4</td><td>5</td><td>5</td><td>6</td><td>6</td></tr></tbody></table></div>

The standard deviation of data set X is $q$, and the standard deviation of data set Y is $s$. Which of the following statements about the standard deviation of the data sets is true?
A. $q < s$
B. $q > s$
C. $q = s$
D. The relationship between $q$ and $s$ cannot be determined.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Each value in data set Y is $11$ less than the corresponding value in data set X ($13 - 11 = 2$, $14 - 11 = 3$, and so on). Subtracting the same number from every value shifts the data and the mean by $11$ but does not change the distances of the values from the mean, so the spread is the same. Therefore $q = s$. (Both are about $1.49$ as population standard deviations, or about $1.58$ as sample standard deviations.)

60.

![Two histograms, titled Team A and Team B, each with Score on the horizontal axis from 15 to 50 in intervals of width 5 and Frequency on the vertical axis from 0 to 50. Team A has bars only from 25 to 40: frequencies 44 for 25 to 30, 46 for 30 to 35, and 44 for 35 to 40, and no scores from 15 to 25 or from 40 to 50. Team B has frequencies 31 for 15 to 20, 22 for 20 to 25, 11 for 25 to 30, 2 for 30 to 35, 11 for 35 to 40, 22 for 40 to 45, and 31 for 45 to 50.](tests/images/data-analysis-b/q60.svg)

The histograms summarize the distributions of scores for team A and team B. Which statement best compares the standard deviations of scores for these teams?
A. The standard deviation of scores for team A is less than the standard deviation of scores for team B.
B. The standard deviation of scores for team A is greater than the standard deviation of scores for team B.
C. The standard deviation of scores for team A is equal to the standard deviation of scores for team B.
D. There is not enough information to compare the standard deviations.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Both histograms are symmetric about a score of $32.5$, so both means are about $32.5$. All of team A's scores are between $25$ and $40$, within about $7.5$ points of the mean. Most of team B's scores are in the outer intervals, from $15$ to $25$ and from $40$ to $50$, far from the mean, and only $2$ scores are in the middle interval. Team B's scores are much more spread out from the mean, so the standard deviation for team A is less than the standard deviation for team B.

61.

| Number of queen ants | Number of colonies |
|:---:|:---:|
| $1$ | $11$ |
| $2$ | $9$ |
| $3$ | $1$ |
| $4$ | $6$ |
| $5$ | $6$ |

Scientists collected acorns that each housed a colony of a particular ant species and then analyzed each colony's structure. For these colonies, the table summarizes the number of queen ants per colony. For these colonies, what is the median number of queen ants per colony?
A. $6$
B. $4$
C. $3$
D. $2$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: There are $11 + 9 + 1 + 6 + 6 = 33$ colonies, so the median is the $17$th value when the numbers of queen ants are listed in order. The first $11$ values are $1$ and the $12$th through $20$th values are $2$, so the $17$th value is $2$. Choice C, $3$, is the middle of the five listed numbers of queen ants, which ignores how many colonies have each number.

62. A random sample of $850$ registered voters in a metropolitan region were surveyed about a municipal public transit proposal. Based on the survey, $62\%$ of the voters supported the proposal, with an associated margin of error of $3.3\%$ at a $95\%$ confidence level. Which of the following is the most appropriate conclusion from this result?
A. Exactly $62\%$ of all registered voters in the metropolitan region support the proposal.
B. It is plausible that the proportion of all registered voters in the metropolitan region who support the proposal is between $58.7\%$ and $65.3\%$.
C. If another random sample of $850$ voters were surveyed, exactly $62\%$ of those surveyed would support the proposal.
D. There is a $95\%$ chance that any individual voter chosen at random supports the proposal.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The plausible values for the percentage of all registered voters in the region who support the proposal are within the margin of error of the sample estimate: from $62\% - 3.3\% = 58.7\%$ to $62\% + 3.3\% = 65.3\%$. Choice A treats the estimate as exact, choice C ignores the variation between random samples, and choice D misreads the confidence level, which describes the method of estimating, not the probability that one voter supports the proposal.

63.

| Number of birds | Number of days |
|:---:|:---:|
| $14$ | $3$ |
| $15$ | $3$ |
| $16$ | $4$ |
| $17$ | $1$ |
| $18$ | $3$ |
| $19$ | $9$ |

A science class studied the feeding behavior of the birds that visited a bird feeder each school day for a period of time. The table summarizes the number of birds the class observed visiting the bird feeder each school day during this period of time. What is the median number of birds the class observed visiting the bird feeder each school day during this period of time?
Answer: 18
Domain: Problem-Solving and Data Analysis
Explanation: There are $3 + 3 + 4 + 1 + 3 + 9 = 23$ days, so the median is the $12$th value when the daily numbers of birds are listed in order. The numbers $14$, $15$, $16$, and $17$ account for the first $3 + 3 + 4 + 1 = 11$ days, and the $12$th through $14$th values are $18$. So the median is $18$ birds.

64.

![Histogram with Weight (pounds) on the horizontal axis from 10 to 35 in intervals of width 5 and Number of salmon on the vertical axis from 0 to 6. The bar heights are 3 for 10 to 15, 6 for 15 to 20, 2 for 20 to 25, 1 for 25 to 30, and 2 for 30 to 35 (14 salmon in all).](tests/images/data-analysis-b/q64.svg)

The histogram summarizes a data set of the weights, in pounds, of $14$ salmon. If an additional weight of $78$ pounds is added to the original data set to create a new data set of $15$ weights of salmon, which of the following measures must be greater for the new data set than for the original data set?

I. The median

II. The mean
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Every original weight is at most $35$ pounds, so the original mean is at most $35$ pounds. Adding $78$, which is greater than the mean, must increase the mean, so II must be true. The original median is the average of the $7$th and $8$th weights in order, both of which are in the $15$ to $20$ pound interval; the new median is the $8$th original weight. If the $7$th and $8$th weights are equal (for example, both $17$ pounds), the median does not change, so I need not be true.

65. Which expression is equivalent to $\dfrac{y + 13}{x - 10} + \dfrac{y(x - 10)}{x^2 y - 10xy}$?
A. $\dfrac{xy + y + 3}{x^3 y - 20x^2 y + 100xy}$
B. $\dfrac{xy + 11y + 13}{x^2 y - 10xy + x - 10}$
C. $\dfrac{xy^2 + 14xy - 10y}{x^2 y - 10xy}$
D. $\dfrac{xy^2 + 14xy - 10y}{x^3 y - 20x^2 y + 100xy}$
Answer: C
Domain: Advanced Math
Explanation: Since $x^2 y - 10xy = xy(x - 10)$, use $x^2 y - 10xy$ as the common denominator. The first fraction becomes $\frac{xy(y + 13)}{x^2 y - 10xy} = \frac{xy^2 + 13xy}{x^2 y - 10xy}$. Adding the numerator of the second fraction, $y(x - 10) = xy - 10y$, gives $\frac{xy^2 + 13xy + xy - 10y}{x^2 y - 10xy} = \frac{xy^2 + 14xy - 10y}{x^2 y - 10xy}$. Choice D has the same numerator but the denominator $(x - 10)(x^2 y - 10xy) = x^3 y - 20x^2 y + 100xy$, so it is not equivalent.

66. A clothing store buys shirts at a wholesale price of $4.00$ dollars each and resells them at a retail price that is $340\%$ of the wholesale price. At the end of the season, any remaining shirts are marked at a discounted price that is $80\%$ off the retail price. What is the discounted price of each remaining shirt, in dollars?
Answer: 2.72
Domain: Problem-Solving and Data Analysis
Explanation: The retail price is $340\%$ of $4.00$ dollars, which is $3.4(4.00) = 13.60$ dollars. A discount of $80\%$ off leaves $100\% - 80\% = 20\%$ of the retail price, so the discounted price is $0.20(13.60) = 2.72$ dollars.

67.

$$\dfrac{1}{R} = \dfrac{1}{p} + \dfrac{1}{q} + \dfrac{1}{s} + \dfrac{1}{13}$$

A parallel electric circuit contains four resistors with resistances of $p$ ohms, $q$ ohms, $s$ ohms, and $13$ ohms. The given equation relates the resistance $R$, in ohms, of the circuit, to the resistances of the four individual resistors it contains. Which equation correctly expresses $R$ in terms of $p$, $q$, and $s$?
A. $R = \dfrac{13pqs}{p + q + s + 13}$
B. $R = \dfrac{13pqs}{13qs + 13ps + 13pq + pqs}$
C. $R = \dfrac{13qs + 13ps + 13pq + pqs}{13pqs}$
D. $R = p + q + s + 13$
Answer: B
Domain: Advanced Math
Explanation: Using the common denominator $13pqs$, the right side is $\frac{13qs}{13pqs} + \frac{13ps}{13pqs} + \frac{13pq}{13pqs} + \frac{pqs}{13pqs} = \frac{13qs + 13ps + 13pq + pqs}{13pqs}$. This equals $\frac{1}{R}$, so $R$ is its reciprocal: $R = \frac{13pqs}{13qs + 13ps + 13pq + pqs}$. Choice C is $\frac{1}{R}$, not $R$, and choices A and D do not combine the fractions correctly.

68. A company conducted a study concerning the time spent on extracurricular activities by students in grades $6$, $7$, and $8$ and their level of school spirit. A total of $90$ students were selected at random from all students in grades $6$, $7$, and $8$ in a large school district in the US. The selected students were asked to report their level of school spirit as either low, medium, or high. The table summarizes the distribution of the selected students by grade.

<div class="q-table-wrap"><table class="q-table"><tbody><tr><th>Grade</th><td>6</td><td>7</td><td>8</td></tr><tr><th>Number of students</th><td>30</td><td>26</td><td>34</td></tr></tbody></table></div>

If the results of the study suggest a relationship between the self-reported level of school spirit and the amount of time spent on extracurricular activities by students in grades $6$, $7$, and $8$, which of the following aspects of the study will prevent the results from being generalized to all students in grades $6$, $7$, and $8$ in the US?
A. The selected students are not all from the same school.
B. The number of selected students is too small.
C. The number of selected students from each grade is different.
D. The students were not selected at random from all students in grades $6$, $7$, and $8$ in the US.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Results from a random sample can be generalized only to the population the sample was selected from. These students were selected at random from one large school district, so the results can be generalized to students in grades $6$, $7$, and $8$ in that district, but not to all such students in the US. Students coming from different schools (choice A), a random sample of $90$ students (choice B), and unequal numbers of students per grade (choice C) do not prevent generalizing to the population that was sampled.

69. The mass of object A is $481\%$ of the mass of object B, and the mass of object A is $0.074\%$ of the mass of object C. If the mass of object C is $p\%$ of the mass of object B, what is the value of $\dfrac{p}{1{,}000}$?
Answer: 650
Domain: Problem-Solving and Data Analysis
Explanation: Let the masses of objects A, B, and C be $a$, $b$, and $c$. Then $a = 4.81b$ and $a = 0.00074c$, so $c = \frac{a}{0.00074} = \frac{4.81b}{0.00074} = 6{,}500b$. Since $c = 6{,}500b$, the mass of object C is $650{,}000\%$ of the mass of object B, so $p = 650{,}000$ and $\frac{p}{1{,}000} = 650$.
`
});
