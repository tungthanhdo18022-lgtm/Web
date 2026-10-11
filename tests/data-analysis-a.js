/*
 * Advanced test: Data Analysis A (68 questions).
 * Written in the same text format as the admin builder (see the "Syntax" guide there).
 * "section: advanced" lists it under "Advanced Tests" on the home page; "category" sets its filter.
 * Note: the content lives inside String.raw`...` — do not use backticks (`) inside the test.
 */
SATLibrary.register({
  id: 'data-analysis-a',
  source: String.raw`
---
title: Data Analysis A
author: tungtks18022
description: 68 harder Problem-Solving and Data Analysis questions on mean, median and standard deviation, percentages, unit rates and conversions, two-way tables and probability, margin of error, and study design, with an explanation for every question.
category: Problem-Solving and Data Analysis
section: advanced
time: 109
---

1.

$$\begin{gathered} \text{Data set A: } 8, 11, 12, 15, 21, 27 \\[4pt] \text{Data set B: } 9, 12, 13, 16, 22, h \end{gathered}$$

Data sets A and B each consist of $6$ values as shown, where $h$ is a constant. If the standard deviation of data set A is greater than the standard deviation of data set B, which of the following could be the value of $h$?

I. $23$

II. $28$

III. $29$
A. I only
B. II only
C. III only
D. II or III
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The first five values of data set B ($9, 12, 13, 16, 22$) are each $1$ more than the first five values of data set A. If $h = 28$, every value of B is $1$ more than the corresponding value of A, so the two data sets have the same spread and the same standard deviation (about $6.47$); the standard deviation of A is not greater. If $h = 29$, the largest value of B is even farther from the other values than $27$ is in A, so the standard deviation of B (about $6.77$) is greater than that of A. If $h = 23$, the largest value of B is much closer to the other values, so the standard deviation of B (about $5.15$) is less than that of A. Only $h = 23$ works, so the answer is I only.

2.

![Dot plot with a horizontal axis labeled Orbital period (days), numbered from 720 to 732 in steps of 2, with a tick mark at every whole number. Each dot represents one moon. There are 2 dots at 720, 3 dots at 723, 2 dots at 724, 1 dot each at 726, 727, and 728, 2 dots at 730, and 1 dot at 732, for a total of 13 dots. There are no dots at 721, 722, 725, 729, or 731.](tests/images/data-analysis-a/q2.svg)

A data set of the orbital periods, rounded to the nearest whole number of Earth days, for $13$ of Jupiter's moons is represented in the dot plot. An additional moon with an orbital period of $251$ days is added to the original data set to create a new data set of $14$ orbital periods. Which statement best compares the mean and median of the new data set to the mean and median of the original data set?
A. The mean of the new data set is equal to the mean of the original data set, and the median of the new data set is equal to the median of the original data set.
B. The mean of the new data set is equal to the mean of the original data set, and the median of the new data set is less than the median of the original data set.
C. The mean of the new data set is less than the mean of the original data set, and the median of the new data set is less than the median of the original data set.
D. The mean of the new data set is less than the mean of the original data set, and the median of the new data set is equal to the median of the original data set.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: In order, the original $13$ values are $720, 720, 723, 723, 723, 724, 724, 726, 727, 728, 730, 730, 732$, so the median is the $7$th value, $724$. The value $251$ is far less than every original value, so adding it lowers the mean (from about $725.4$ to $\frac{9{,}681}{14} = 691.5$ days). The new data set has $14$ values, so its median is the mean of the $7$th and $8$th values of $251, 720, 720, 723, 723, 723, 724, 724, 726, \ldots$; both are $724$, so the median is still $724$. The mean decreases and the median stays the same.

3. The area of a rectangular region is increasing at a rate of $180$ square centimeters per hour. What is this rate, in square meters per minute? ($1$ meter $= 100$ centimeters)
Answer: 0.0003
Domain: Problem-Solving and Data Analysis
Explanation: Since $1$ meter $= 100$ centimeters, $1$ square meter $= 100 \times 100 = 10{,}000$ square centimeters. So $180$ square centimeters per hour is $\frac{180}{10{,}000} = 0.018$ square meters per hour. Since $1$ hour $= 60$ minutes, this is $\frac{0.018}{60} = 0.0003$ square meters per minute (enter $.0003$).

4. An object's speed is increasing at a rate of $4.9$ meters per second squared. What is this rate, in miles per minute squared, rounded to the nearest tenth? (Use $1$ mile $= 1{,}609$ meters.)
A. $0.2$
B. $11$
C. $131.4$
D. $328.4$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Because the unit is per second squared, the conversion from seconds to minutes is applied twice: $1$ meter per second squared is $60^2 = 3{,}600$ meters per minute squared. So $4.9$ meters per second squared is $4.9 \times 3{,}600 = 17{,}640$ meters per minute squared. Dividing by $1{,}609$ meters per mile gives $\frac{17{,}640}{1{,}609} \approx 10.96$, which rounds to $11.0$ miles per minute squared. Choice A converts seconds to minutes only once ($\frac{4.9 \times 60}{1{,}609} \approx 0.2$).

5.

![Histogram with a horizontal axis labeled Weight (pounds), marked at 10, 15, 20, 25, 30, and 35, and a vertical axis labeled Number of salmon, from 0 to 6. The bar heights, from left to right, are 3 for 10 to 15 pounds, 6 for 15 to 20 pounds, 2 for 20 to 25 pounds, 1 for 25 to 30 pounds, and 2 for 30 to 35 pounds, for a total of 14 salmon.](tests/images/data-analysis-a/q5.svg)

The histogram summarizes a data set of the weights, in pounds, of $14$ salmon. If an additional weight of $85$ pounds is added to the original data set to create a new data set of $15$ weights of salmon, which of the following measures must be greater for the new data set than for the original data set?

I. The median

II. The mean
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Every original weight is at most $35$ pounds, so $85$ is greater than the original mean, and adding it must increase the mean. The bars have heights $3, 6, 2, 1, 2$. With $14$ weights, the original median is the mean of the $7$th and $8$th weights in order, both in the $15$ to $20$ pound interval. With $15$ weights, the new median is the $8$th weight. The $8$th weight is at least the $7$th weight, so the median cannot decrease, but if the $7$th and $8$th weights are equal, the median stays the same. So only the mean must be greater.

6. For the positive quantities $h$, $j$, and $k$, $27\%$ of $h$ is equivalent to $24\%$ of $j$, and $j$ is equivalent to $45\%$ of $k$. What percentage of $k$ is $h$? (Disregard the $\%$ sign when entering your answer. For example, if your answer is $39\%$, enter $39$.)
Answer: 40
Domain: Problem-Solving and Data Analysis
Explanation: The statements give $0.27h = 0.24j$ and $j = 0.45k$. Substituting, $0.27h = 0.24(0.45k) = 0.108k$, so $h = \frac{0.108}{0.27}k = 0.4k$. Therefore $h$ is $40\%$ of $k$.

7. The weight of each object in two groups, A and B, was recorded. The histograms represent the distribution of weight, in grams, for the objects in groups A and B.

![Two histograms side by side, titled Group A and Group B. Each has a vertical axis labeled Number of objects, from 0 to 12 in steps of 2, and a horizontal axis labeled Weight (grams). Group A, with weights from 0 to 5 grams: 6 objects from 0 to 1, 3 from 1 to 2, 2 from 2 to 3, 3 from 3 to 4, and 6 from 4 to 5, for 20 objects. Group B, whose horizontal axis has a break between 0 and 9 and then runs from 9 to 14 grams: 2 objects from 9 to 10, 3 from 10 to 11, 10 from 11 to 12, 3 from 12 to 13, and 2 from 13 to 14, for 20 objects.](tests/images/data-analysis-a/q7.svg)

The mean weight of the objects in group A is equal to $2.1$, and the mean weight of the objects in group B is equal to $11.1$. Which of the following statements about the standard deviations of weight for the objects in these two groups is true?
A. The standard deviation of weight for the objects in group A is less than the standard deviation of weight for the objects in group B.
B. The standard deviation of weight for the objects in group A is equal to the standard deviation of weight for the objects in group B.
C. The standard deviation of weight for the objects in group A is greater than the standard deviation of weight for the objects in group B.
D. There is not enough information to compare the standard deviations of weight for the objects in these two groups.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The standard deviation measures how spread out the values are from the mean. Both groups have $20$ objects. In group A, $12$ of the objects are in the outer intervals ($0$ to $1$ and $4$ to $5$ grams), far from the mean of $2.1$, and only $2$ are in the $2$ to $3$ gram interval. In group B, $10$ of the objects are in the $11$ to $12$ gram interval, which contains the mean of $11.1$, and only $4$ are in the outer intervals. So the weights in group A are more spread out, and its standard deviation is greater. (This holds wherever the values lie within their intervals: the standard deviation of group A is at least about $1.52$ grams, and that of group B is at most about $1.26$ grams.)

8. A researcher selected $25$ guinea pigs from one habitat and $18$ wild cavies from another habitat at random in Venezuela. A field of a specific size within each habitat was divided into equally sized virtual squares, and the animals were allowed to wander in the field for a fixed amount of time. To observe their behavior, the researcher counted the number of times the guinea pigs and wild cavies crossed the virtual squares in their field during early adolescence and again during late adolescence. The researcher found that in early adolescence, the number of virtual squares the wild cavies crossed was significantly more than the number of virtual squares the guinea pigs crossed. The researcher also found that the number of virtual squares crossed by both the wild cavies and the guinea pigs decreased from early adolescence to late adolescence.

Based on the researcher's findings, which of the following statements is an appropriate conclusion that can be drawn from this study?
A. The statistically significant difference in behavior between the two age groups was caused by the differences in habitat.
B. The statistically significant difference in behavior between the two age groups was caused by aging.
C. The statistically significant difference in behavior during early adolescence between the two groups of animals can be generalized to all guinea pigs and wild cavies.
D. The statistically significant difference in behavior during early adolescence between the two groups of animals can only be generalized to the habitats in the study.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The animals were selected at random from one habitat for each species, so the results can be generalized to the animals in those habitats, but not to all guinea pigs and wild cavies everywhere (choice C). This was an observational study: the animals were not randomly assigned to habitats or to any treatment, so the study cannot show that the differences were caused by habitat (choice A) or by aging (choice B).

9. To investigate the effect of magnesium supplementation on the sleep quality of adults, a researcher selected $130$ adults at random from a community center to participate in a study. The researcher first measured the sleep efficiency of each participant. Each participant was then randomly assigned to take a magnesium supplement or a placebo each day for $10$ weeks. At the end of the $10$ weeks, the researcher measured the sleep efficiency of all participants again and found that the magnesium supplement caused statistically significant improvement in sleep quality for the adults at the community center. What feature of this study allowed the researcher to conclude that the magnesium supplement caused the improved sleep quality?
A. There were more than $100$ participants in the study.
B. The participants were selected at random from the community center.
C. The sleep efficiency of each participant was measured again at the end of $10$ weeks.
D. Each participant was randomly assigned to take a magnesium supplement or a placebo.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: A cause-and-effect conclusion requires random assignment of the treatments: because chance alone decided who took the supplement and who took the placebo, the two groups were alike except for the treatment. Random selection (choice B) allows the results to be generalized to the adults at the community center, but it does not establish cause and effect. The sample size (choice A) and the second measurement (choice C) do not establish cause and effect either.

10.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th></th><th>Amount invested</th><th>Balance increase</th></tr></thead><tbody><tr><td><b>Account A</b></td><td>\$500</td><td>6% annual interest</td></tr><tr><td><b>Account B</b></td><td>\$1,000</td><td>\$25 per year</td></tr></tbody></table></div>

Two investments were made as shown in the table above. The interest in Account A is compounded once per year. Which of the following is true about the investments?
A. Account A always earns more money per year than Account B.
B. Account A always earns less money per year than Account B.
C. Account A earns more money per year than Account B at first, but eventually earns less money per year.
D. Account A earns less money per year than Account B at first, but eventually earns more money per year.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: In the first year, Account A earns $6\%$ of \$500, which is $0.06 \times 500 = 30$ dollars, and Account B earns \$25. Each year the balance of Account A grows, so the $6\%$ interest it earns grows too (for example, $0.06 \times 530 = 31.80$ dollars in the second year), while Account B always earns \$25 per year. Since Account A starts above \$25 per year and its yearly earnings only increase, Account A always earns more money per year than Account B.

11. A scientist studied the effects of mixing two chemicals, chemical A and chemical B, by gradually adding more of each chemical to a mixture of the two chemicals. At the start of the study, the mass of chemical A in the mixture was equal to the mass of chemical B in the mixture. From the start of the study to the end of the study, the mass of chemical A in the mixture increased by $2{,}600\%$, and the mass of chemical B in the mixture increased by $380\%$. At the end of the study, approximately how many times greater was the mass of chemical A in the mixture than the mass of chemical B in the mixture?
A. $29.80$
B. $22.20$
C. $6.84$
D. $5.63$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Let $m$ be the starting mass of each chemical. An increase of $2{,}600\%$ makes the mass of chemical A $m + 26m = 27m$, and an increase of $380\%$ makes the mass of chemical B $m + 3.8m = 4.8m$. The ratio is $\frac{27m}{4.8m} = 5.625$, or about $5.63$. Choice C, $\frac{26}{3.8} \approx 6.84$, compares only the increases instead of the final masses.

12.

<div class="q-tables">
<table class="q-table"><thead><tr><th colspan="2">Data Set X</th></tr><tr><th>Value</th><th>Frequency</th></tr></thead><tbody><tr><td>$a$</td><td>0</td></tr><tr><td>$b$</td><td>5</td></tr><tr><td>$c$</td><td>19</td></tr></tbody></table>
<table class="q-table"><thead><tr><th colspan="2">Data Set Y</th></tr><tr><th>Value</th><th>Frequency</th></tr></thead><tbody><tr><td>$a$</td><td>1,900</td></tr><tr><td>$b$</td><td>500</td></tr><tr><td>$c$</td><td>0</td></tr></tbody></table>
</div>

Data sets X and Y are summarized in the tables shown, where $a$, $b$, and $c$ are positive, consecutive integers and $a < b < c$. Which statement comparing the means of the data sets is true?
A. The mean of data set X is $\dfrac{2(19)}{24}$ less than the mean of data set Y.
B. The mean of data set X is $\dfrac{2(19)}{24}$ greater than the mean of data set Y.
C. The mean of data set Y is $100$ times the mean of data set X.
D. The means of the two data sets are equal.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Since the integers are consecutive, $a = b - 1$ and $c = b + 1$. Data set X has $5 + 19 = 24$ values, and its mean is $\frac{5b + 19(b + 1)}{24} = b + \frac{19}{24}$. Data set Y has $1{,}900 + 500 = 2{,}400$ values, and its mean is $\frac{1{,}900(b - 1) + 500b}{2{,}400} = \frac{19(b - 1) + 5b}{24} = b - \frac{19}{24}$. The difference is $\left(b + \frac{19}{24}\right) - \left(b - \frac{19}{24}\right) = \frac{2(19)}{24}$, so the mean of data set X is $\frac{2(19)}{24}$ greater than the mean of data set Y.

13. The composition of an animal is defined as the muscles, bones, and fat of the animal. A scientist studied the composition of one young swamp buffalo and determined the buffalo had $133$ kilograms of muscle, which made up approximately $65.9\%$ of its composition. Of the remaining composition of this buffalo, approximately $46.2\%$ was bone, and the remainder was fat. Based on these approximations, to the nearest tenth, how many kilograms of this buffalo's composition was bone?
Answer: 31.8
Domain: Problem-Solving and Data Analysis
Explanation: The total composition is $\frac{133}{0.659} \approx 201.82$ kilograms, so the remaining composition is about $201.82 - 133 = 68.82$ kilograms. Bone was $46.2\%$ of this: $0.462 \times 68.82 \approx 31.80$ kilograms, which is $31.8$ to the nearest tenth.

14. A real estate company offers a series of three webinars. $2{,}000$ people attended the first webinar. $65\%$ of the people who attended the first webinar attended the second webinar, and $44\%$ of the people who attended both the first and second webinars attended the third webinar. Of those who attended the first but did not attend the second webinar, $31\%$ attended the third webinar. How many people attended both the first and third webinars but did not attend the second webinar?
Answer: 217
Domain: Problem-Solving and Data Analysis
Explanation: Since $65\%$ of the $2{,}000$ people attended the second webinar, $100\% - 65\% = 35\%$ of them did not: $0.35 \times 2{,}000 = 700$ people. Of these $700$ people, $31\%$ attended the third webinar: $0.31 \times 700 = 217$. (The $44\%$ is about people who attended the second webinar, so it is not needed.)

15. Ari examined a set of $85$ plants. The lightest plant had a mass of $2.8$ kilograms (kg), and the heaviest plant had a mass of $6.2$ kg. Chihiro examined the same set of $85$ plants and also an additional plant with a mass of $11.6$ kg. Which of the following must be true about the set of plants that Ari examined and the set of plants that Chihiro examined?
A. The standard deviation of the masses, in kg, of the plants that Ari examined is greater than the standard deviation of the masses, in kg, of the plants that Chihiro examined.
B. The range of the masses, in kg, of the plants that Ari examined is greater than the range of the masses, in kg, of the plants that Chihiro examined.
C. The median of the masses, in kg, of the plants that Ari examined is less than the median of the masses, in kg, of the plants that Chihiro examined.
D. The mean of the masses, in kg, of the plants that Ari examined is less than the mean of the masses, in kg, of the plants that Chihiro examined.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The mean of Ari's masses is at most $6.2$ kg, and Chihiro's set adds a mass of $11.6$ kg, which is greater than that mean, so Chihiro's mean must be greater. Choice B is false: Ari's range is $6.2 - 2.8 = 3.4$ kg and Chihiro's is $11.6 - 2.8 = 8.8$ kg. Choice A is false: adding a value far from all the others spreads the data out, so Chihiro's standard deviation is greater. Choice C need not be true: Ari's median is the $43$rd mass in order, and Chihiro's median is the mean of the $43$rd and $44$th masses, which is equal to Ari's median if those two masses are equal.

16.

![Dot plot with a horizontal axis labeled Orbital period (days), numbered from 720 to 732 in steps of 2, with a tick mark at every whole number. Each dot represents one moon. There are 2 dots at 720, 3 dots at 723, 2 dots at 724, 1 dot each at 726, 727, and 728, 2 dots at 730, and 1 dot at 732, for a total of 13 dots. There are no dots at 721, 722, 725, 729, or 731.](tests/images/data-analysis-a/q16.svg)

A data set of the orbital periods, rounded to the nearest whole number of Earth days, for $13$ of Jupiter's moons is represented in the dot plot. An additional moon with an orbital period of $621$ days is added to the original data set to create a new data set of $14$ orbital periods. Which statement best compares the mean and median of the new data set to the mean and median of the original data set?
A. The mean of the new data set is equal to the mean of the original data set, and the median of the new data set is equal to the median of the original data set.
B. The mean of the new data set is equal to the mean of the original data set, and the median of the new data set is less than the median of the original data set.
C. The mean of the new data set is less than the mean of the original data set, and the median of the new data set is less than the median of the original data set.
D. The mean of the new data set is less than the mean of the original data set, and the median of the new data set is equal to the median of the original data set.
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The original $13$ values in order are $720, 720, 723, 723, 723, 724, 724, 726, 727, 728, 730, 730, 732$; their sum is $9{,}430$, so the mean is about $725.4$, and the median is the $7$th value, $724$. The value $621$ is less than every original value, so it lowers the mean, to $\frac{9{,}430 + 621}{14} \approx 717.9$ days. The new median is the mean of the $7$th and $8$th of the $14$ values $621, 720, 720, 723, 723, 723, 724, 724, 726, \ldots$, which are both $724$, so the median is unchanged.

17. A researcher surveyed undergraduate students, graduate students, and postdoctoral students. The number of undergraduate students surveyed was $6{,}950\%$ of the number of postdoctoral students surveyed, and the number of graduate students surveyed was $35\%$ of the number of undergraduate students surveyed. If there were $4{,}865$ graduate students surveyed, what was the sum of the number of undergraduate students and postdoctoral students surveyed?
Answer: 14100
Domain: Problem-Solving and Data Analysis
Explanation: Let $u$ and $p$ be the numbers of undergraduate and postdoctoral students surveyed. Then $0.35u = 4{,}865$, so $u = 13{,}900$. Also $u = 69.5p$ (since $6{,}950\% = 69.5$), so $p = \frac{13{,}900}{69.5} = 200$. The sum is $13{,}900 + 200 = 14{,}100$.

18. Each of the following frequency tables represents a data set. Which of these frequency tables represents the data set with the smallest standard deviation?
A. $\begin{array}{|c|c|} \hline \text{Value} & \text{Frequency} \\ \hline 3 & 0 \\ \hline 4 & 10 \\ \hline 5 & 55 \\ \hline 6 & 10 \\ \hline 7 & 0 \\ \hline \end{array}$
B. $\begin{array}{|c|c|} \hline \text{Value} & \text{Frequency} \\ \hline 3 & 11 \\ \hline 4 & 17 \\ \hline 5 & 19 \\ \hline 6 & 17 \\ \hline 7 & 11 \\ \hline \end{array}$
C. $\begin{array}{|c|c|} \hline \text{Value} & \text{Frequency} \\ \hline 3 & 15 \\ \hline 4 & 15 \\ \hline 5 & 15 \\ \hline 6 & 15 \\ \hline 7 & 15 \\ \hline \end{array}$
D. $\begin{array}{|c|c|} \hline \text{Value} & \text{Frequency} \\ \hline 3 & 10 \\ \hline 4 & 17 \\ \hline 5 & 21 \\ \hline 6 & 17 \\ \hline 7 & 10 \\ \hline \end{array}$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Each data set has $75$ values and is symmetric about $5$, so each mean is $5$. The standard deviation is smallest for the data set whose values are most concentrated near the mean. In table A, $55$ of the $75$ values equal the mean, the other $20$ values are only $1$ away from it, and no values are at $3$ or $7$. Each of the other tables has fewer values at $5$ and some values $2$ away from the mean. (The standard deviations are about $0.52$ for A, $1.28$ for B, $1.41$ for C, and $1.23$ for D.)

19. An environmental scientist is investigating the volatility of $175$ organic compounds by finding the boiling point of each compound. The mean boiling point of all $175$ compounds is $183$ degrees Celsius. The scientist classifies each of these compounds as either semivolatile or volatile. Of the $175$ compounds, $50$ compounds were classified as semivolatile, and these $50$ compounds have a mean boiling point of $338$ degrees Celsius. The remaining $125$ compounds were classified as volatile. What is the mean boiling point, in degrees Celsius, of the $125$ compounds classified as volatile?
Answer: 121
Domain: Problem-Solving and Data Analysis
Explanation: The sum of all $175$ boiling points is $175 \times 183 = 32{,}025$ degrees. The sum for the $50$ semivolatile compounds is $50 \times 338 = 16{,}900$ degrees. So the sum for the $125$ volatile compounds is $32{,}025 - 16{,}900 = 15{,}125$ degrees, and their mean is $\frac{15{,}125}{125} = 121$ degrees Celsius.

20. The table shows the distribution of people in a certain city by age group.

| Age group | Proportion |
|:---|:---:|
| Less than 18 years old | 27% |
| 18–40 years old | 24% |
| 41–65 years old | 28% |
| Greater than 65 years old | 21% |

If a person in this city is selected at random, which of the following is closest to the probability of selecting a person who is greater than $65$ years old, given that the person is at least $18$ years old?
A. $0.21$
B. $0.29$
C. $0.23$
D. $0.25$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The people who are at least $18$ years old make up $24\% + 28\% + 21\% = 73\%$ of the city, and those greater than $65$ years old make up $21\%$. So the conditional probability is $\frac{21}{73} \approx 0.288$, which is closest to $0.29$. Choice A, $0.21$, is the probability for a person selected from the whole city, not only from those at least $18$ years old.

21. The positive number $a$ is $2{,}800\%$ of the number $c$, and $c$ is $20\%$ of the number $b$. What is the value of $a - b$ in terms of $c$?
A. $23c$
B. $140c$
C. $560c$
D. $2{,}240c$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Since $2{,}800\% = 28$, $a = 28c$. Since $c = 0.2b$, $b = \frac{c}{0.2} = 5c$. So $a - b = 28c - 5c = 23c$.

22. The table gives the distribution of flavor and type of topping for customer orders at an ice cream shop.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th rowspan="2">Flavor of ice cream</th><th colspan="2">Type of topping</th></tr><tr><th>Sprinkles</th><th>No Sprinkles</th></tr></thead><tbody><tr><td><b>Chocolate</b></td><td>60</td><td>30</td></tr><tr><td><b>Vanilla</b></td><td>20</td><td>30</td></tr><tr><td><b>Twist</b></td><td>80</td><td>20</td></tr></tbody></table></div>

If a customer order is selected at random, what is the probability of selecting an order with sprinkles, given the flavor of ice cream is vanilla?
A. $0.08$
B. $0.13$
C. $0.40$
D. $0.14$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: There are $20 + 30 = 50$ vanilla orders, and $20$ of them have sprinkles. So the probability is $\frac{20}{50} = 0.40$. Choice A, $\frac{20}{240} \approx 0.08$, divides by all $240$ orders, and choice B, $\frac{20}{160} \approx 0.13$, divides by all $160$ orders with sprinkles.

23. A district school board in a certain state is proposing a change to the length of lunch periods for all high schools in the district. A sample of $365$ high school students was selected at random from all high school students in the district. The selected students were asked whether they approved of the proposed change, and $211$ students responded that they did not approve. Which of the following is the largest population to which the results of the survey can be generalized?
A. All high school students in the district
B. The $365$ students who were surveyed
C. All high school students in the state
D. The $211$ students who responded that they did not approve of the proposed change
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The sample was selected at random from all high school students in the district, so the results can be generalized to that population. They cannot be generalized to all high school students in the state (choice C), because students outside the district had no chance of being selected. Choices B and D are smaller groups than the population that was sampled.

24. Data set A and data set B each consist of $26$ values. The table shows the frequencies of the values for each data set. Which of the following statements best compares the means of the two data sets?

| Value | Data set A frequency | Data set B frequency |
|:---:|:---:|:---:|
| 40 | 2 | 8 |
| 43 | 4 | 7 |
| 46 | 5 | 5 |
| 49 | 7 | 4 |
| 52 | 8 | 2 |
A. The mean of data set A is greater than the mean of data set B.
B. The mean of data set A is less than the mean of data set B.
C. The mean of data set A is equal to the mean of data set B.
D. There is not enough information to compare the means of the data sets.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Data set A has more of its values at the high end ($7$ at $49$ and $8$ at $52$), while data set B has more at the low end ($8$ at $40$ and $7$ at $43$). Computing: the mean of A is $\frac{2(40) + 4(43) + 5(46) + 7(49) + 8(52)}{26} = \frac{1{,}241}{26} \approx 47.7$, and the mean of B is $\frac{8(40) + 7(43) + 5(46) + 4(49) + 2(52)}{26} = \frac{1{,}151}{26} \approx 44.3$. So the mean of data set A is greater.

25. The speeds of particles A, B, and C are $a$ meters per second, $b$ meters per second, and $c$ meters per second, respectively. If the speed of particle A is $6{,}600\%$ of the speed of particle C and the speed of particle C is $0.004\%$ of the speed of particle B, which expression represents the value of $a + b$ in terms of $c$?
A. $25{,}066c$
B. $6{,}850c$
C. $6{,}604c$
D. $3{,}160c$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Since $6{,}600\% = 66$, $a = 66c$. Since $0.004\% = 0.00004$, $c = 0.00004b$, so $b = \frac{c}{0.00004} = 25{,}000c$. Therefore $a + b = 66c + 25{,}000c = 25{,}066c$.

26. The expression $kx$ represents the result of decreasing a positive force, $x$, acting on an object by $0.42\%$. What is the value of $k$?
Answer: 0.9958
Domain: Problem-Solving and Data Analysis
Explanation: Since $0.42\% = 0.0042$, decreasing $x$ by $0.42\%$ gives $x - 0.0042x = (1 - 0.0042)x = 0.9958x$. So $k = 0.9958$ (enter $.9958$).

27.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th></th><th>Even integers</th><th>Odd integers</th><th>Total</th></tr></thead><tbody><tr><td><b>List A</b></td><td>12</td><td>44</td><td>56</td></tr><tr><td><b>List B</b></td><td>40</td><td>4</td><td>44</td></tr><tr><td><b>Total</b></td><td>52</td><td>48</td><td>100</td></tr></tbody></table></div>

The given table shows the number of even and odd integers contained in list A and list B. No integer is contained in both lists. What fraction of the even integers represented in the table are in list A?
A. $\dfrac{12}{52}$
B. $\dfrac{12}{56}$
C. $\dfrac{52}{100}$
D. $\dfrac{52}{56}$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The table shows $52$ even integers in all, and $12$ of them are in list A. So the fraction is $\frac{12}{52}$. Choice B, $\frac{12}{56}$, is the fraction of the integers in list A that are even, and choice C, $\frac{52}{100}$, is the fraction of all the integers that are even.

28.

![Scatterplot in the xy-plane with origin O, an x-axis labeled at 15, 30, and 45, and a y-axis labeled at 15, 30, 45, and 60, with grid lines every 5 units covering x from 0 to about 52 and y from 0 to 65. Twelve data points trend downward, at approximately (10.3, 44.9), (12.4, 44.9), (13.9, 43.3), (15.3, 38.8), (15.6, 40), (21.5, 33.1), (25.9, 30.4), (30, 30.4), (32.4, 24.1), (34.5, 24.5), (35.8, 29), and (38.6, 20.2). A line of best fit is drawn from about (8, 47.6) to about (40.6, 19.4); it passes through approximately (10, 45.9) and (40, 20) and is not extended to the y-axis.](tests/images/data-analysis-a/q28.svg)

The scatterplot shows the relationship between two variables, $x$ and $y$, for data set A. A line of best fit for the data is also shown. Data set B is created by subtracting $11$ units from the value of $y$ for each data point from data set A. Which of the following is closest to the $y$-coordinate of the $y$-intercept of the line of best fit for data set B?
A. $43.57$
B. $53$
C. $59.62$
D. $62.75$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Subtracting $11$ from every $y$-value moves every data point $11$ units down, so the line of best fit for data set B is the line for data set A moved $11$ units down, with the same slope. The line shown passes through about $(10, 45.9)$ and $(40, 20)$, so its slope is about $\frac{20 - 45.9}{40 - 10} \approx -0.86$, and its $y$-intercept is about $45.9 + 0.86(10) \approx 54.5$. The $y$-intercept of the line for data set B is about $54.5 - 11 = 43.5$, which is closest to $43.57$.

29. For a school competition, each student in the sixth, seventh, and eighth grades is assigned to either the red team or the green team. The table shows the distribution of grade and team for the students in the school.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th></th><th>Red team</th><th>Green team</th><th>Total</th></tr></thead><tbody><tr><td><b>Sixth grade</b></td><td>47</td><td>42</td><td>89</td></tr><tr><td><b>Seventh grade</b></td><td>49</td><td>36</td><td>85</td></tr><tr><td><b>Eighth grade</b></td><td>38</td><td>52</td><td>90</td></tr><tr><td><b>Total</b></td><td>134</td><td>130</td><td>264</td></tr></tbody></table></div>

A student from the competition will be selected at random. What is the probability of selecting a student who is in the sixth or seventh grade, given that the student is on the green team? (Express your answer as a decimal or fraction, not as a percent.)
Answer: 3/5 | 0.6
Domain: Problem-Solving and Data Analysis
Explanation: There are $130$ students on the green team. Of these, $42$ are in the sixth grade and $36$ are in the seventh grade, so $42 + 36 = 78$ are in the sixth or seventh grade. The probability is $\frac{78}{130} = \frac{3}{5}$, or $0.6$.

30. The positive number $a$ is $2{,}352\%$ of the sum of the positive numbers $b$ and $c$, and $b$ is $84\%$ of $c$. What percent of $b$ is $a$?
A. $5{,}152\%$
B. $2{,}436\%$
C. $51.52\%$
D. $24.36\%$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Since $b = 0.84c$, $c = \frac{b}{0.84}$, and $b + c = b + \frac{b}{0.84} = \frac{1.84}{0.84}b$. Then $a = 23.52(b + c) = 23.52 \cdot \frac{1.84}{0.84}b = 28 \times 1.84b = 51.52b$. So $a$ is $51.52 \times 100\% = 5{,}152\%$ of $b$. Choice C forgets to multiply by $100$ when converting $51.52$ to a percent.

31. For $100$ neurons, the table summarizes the distribution of classification and cell body diameter.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th rowspan="2">Classification</th><th colspan="3">Cell body diameter (micrometers)</th></tr><tr><th>Less than 20</th><th>20 to 30</th><th>Greater than 30</th></tr></thead><tbody><tr><td><b>Sensory neuron</b></td><td>13</td><td>7</td><td>3</td></tr><tr><td><b>Motor neuron</b></td><td>0</td><td>15</td><td>18</td></tr><tr><td><b>Interneuron</b></td><td>10</td><td>34</td><td>0</td></tr></tbody></table></div>

One of these neurons will be selected at random. What is the probability of selecting a neuron with a cell body diameter that is less than or equal to $30$ micrometers, given that it is not classified as a motor neuron? (Express your answer as a decimal or fraction, not as a percent.)
Answer: 64/67
Domain: Problem-Solving and Data Analysis
Explanation: The neurons not classified as motor neurons are the $13 + 7 + 3 = 23$ sensory neurons and the $10 + 34 + 0 = 44$ interneurons, $67$ in all. Of these, the ones with a cell body diameter less than or equal to $30$ micrometers are in the first two columns: $13 + 7 + 10 + 34 = 64$. The probability is $\frac{64}{67}$ (or $.9552$).

32. A sleep study consisted of $59$ participants, of which $53$ participants each had an average of more than $120$ minutes of rapid eye movement (REM) sleep per night. If a participant from this sleep study is selected at random, what is the probability of selecting a participant that had an average of more than $120$ minutes of REM sleep per night?
A. $\dfrac{53}{100}$
B. $\dfrac{59}{100}$
C. $\dfrac{53}{59}$
D. $\dfrac{59}{53}$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Each of the $59$ participants is equally likely to be selected, and $53$ of them had an average of more than $120$ minutes of REM sleep per night. So the probability is $\frac{53}{59}$. Choice D is greater than $1$, so it cannot be a probability.

33. The area of a rectangular region is increasing at a rate of $280$ square feet per hour. Which of the following is closest to this rate in square meters per minute? (Use $1$ meter $= 3.28$ feet.)
A. $0.43$
B. $1.42$
C. $15.31$
D. $26.03$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Since $1$ meter $= 3.28$ feet, $1$ square meter $= 3.28^2 = 10.7584$ square feet. So $280$ square feet per hour is $\frac{280}{10.7584} \approx 26.03$ square meters per hour, and dividing by $60$ minutes per hour gives about $0.434$, or $0.43$ square meters per minute. Choice D is the rate per hour, and choice B divides by $3.28$ instead of $3.28^2$.

34. A group of $40$ employees selected at random from all the employees at a company were surveyed about the number of books they read last year. From the data collected, it was estimated that the mean number of books employees at the company read last year was $6.8$, with an associated margin of error of $1.1$. Which of the following is the most appropriate conclusion?
A. It is plausible that the actual mean number of books employees at the company read last year is less than $5.7$.
B. It is plausible that the actual mean number of books employees at the company read last year is between $5.7$ and $7.9$.
C. It is plausible that every employee at the company read between $6.8$ and $10.1$ books last year.
D. It is plausible that the actual mean number of books employees at the company read last year is greater than $7.9$.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The plausible values of the actual mean are the estimate plus or minus the margin of error: from $6.8 - 1.1 = 5.7$ to $6.8 + 1.1 = 7.9$ books. Choices A and D give values outside this interval. Choice C is about the number of books every individual employee read, but the margin of error describes only the mean.

35. The manager of a gym selected a sample of $139$ members at random to estimate the percentage of the gym's members that would continue to pay for a membership if the price increased. From the survey, the manager estimates that $82\%$ of the gym's members would continue to pay for a membership if the price increased, with an associated margin of error of $6.39\%$. If the survey is repeated with a random sample of $278$ members and the results are calculated in the same way, which of the following will be the most likely effect of using the larger random sample compared to the smaller random sample?
A. The margin of error will be lower.
B. The margin of error will be higher.
C. The estimate of the percentage of the gym's members that would continue to pay for a membership if the price increased will be lower.
D. The estimate of the percentage of the gym's members that would continue to pay for a membership if the price increased will be higher.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: When random samples are taken from the same population and the results are calculated in the same way, a larger sample size gives a smaller margin of error. Doubling the sample size from $139$ to $278$ members will most likely make the margin of error lower than $6.39\%$ (roughly $\frac{6.39\%}{\sqrt{2}} \approx 4.5\%$). A larger sample does not tend to make the estimate itself lower or higher; it only makes the estimate more precise, so choices C and D are incorrect.

36. A clothing store buys shirts at a wholesale price of $7.00$ dollars each and resells them each at a retail price that is $260\%$ of the wholesale price. At the end of the season, any remaining shirts are marked at a discounted price that is $75\%$ off the retail price. What is the discounted price of each remaining shirt, in dollars?
Answer: 4.55
Domain: Problem-Solving and Data Analysis
Explanation: The retail price is $260\%$ of $7.00$ dollars, which is $2.6(7.00) = 18.20$ dollars. A discount of $75\%$ off leaves $100\% - 75\% = 25\%$ of the retail price, so the discounted price is $0.25(18.20) = 4.55$ dollars.

37. At a convention center, there are a total of $375$ visitors. Each visitor is located in either room A, room B, or room C. If one of these visitors is selected at random, the probability of selecting a visitor who is located in room A is $0.68$, and the probability of selecting a visitor who is located in room B is $0.24$. How many visitors are located in room C?
A. $8$
B. $30$
C. $61$
D. $165$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Each visitor is in exactly one of the three rooms, so the probability of selecting a visitor in room C is $1 - 0.68 - 0.24 = 0.08$. The number of visitors in room C is therefore $0.08(375) = 30$. Check: room A has $0.68(375) = 255$ visitors and room B has $0.24(375) = 90$, and $255 + 90 + 30 = 375$. Choice A is the percent of visitors in room C ($8\%$), not the number of visitors.

38.

$$\text{Data set A: } 24, 34, 44, 54, 64$$

Data set A, which consists of the $5$ values shown, has a mean of $44$ and a standard deviation of approximately $14.14$. Data set B consists of the $5$ values from data set A and one additional value, $k$. For which of the following values of $k$ will the standard deviation of data set B be less than the standard deviation of data set A?
A. $14$
B. $49$
C. $74$
D. There is no value of $k$ such that the standard deviation of data set B will be less than the standard deviation of data set A.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The standard deviation measures how far the values typically are from the mean. The values of data set A are typically about $14$ away from the mean of $44$. Adding the value $49$, which is only $5$ away from the mean, makes the data more tightly clustered around the mean, so the standard deviation decreases (to about $13.04$). Adding $14$ or $74$, each $30$ away from the mean, spreads the data out and increases the standard deviation (to about $17.08$). Since $k = 49$ works, choice D is also incorrect.

39.

| Sample | Percent in favor | Margin of error |
|:---:|:---:|:---:|
| A | $67.83\%$ | $7.8\%$ |
| B | $72.94\%$ | $4.5\%$ |

The results of two random samples of votes for a proposition are given in the table. The samples were selected from the same population, and the margins of error were calculated using the same method. Which of the following is the most appropriate reason that the margin of error for sample A is greater than the margin of error for sample B?
A. Sample A had a larger sample size.
B. Sample A had a smaller sample size.
C. Sample A had a smaller number of votes that could not be recorded.
D. Sample A had a lower percent of favorable responses.
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: For random samples from the same population with margins of error calculated using the same method, the margin of error depends mainly on the sample size: the smaller the sample, the larger the margin of error. So the most appropriate reason that sample A has the greater margin of error ($7.8\%$ compared with $4.5\%$) is that sample A had a smaller sample size. Choice A has the relationship backward, and neither unrecorded votes (choice C) nor the slightly lower percent in favor (choice D) explains the larger margin of error.

40.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th colspan="2">Poll Results</th></tr></thead><tbody><tr><td>Angel Cruz</td><td>483</td></tr><tr><td>Terry Smith</td><td>320</td></tr></tbody></table></div>

The table shows the results of a poll. A total of $803$ voters selected at random were asked which candidate they would vote for in the upcoming election. According to the poll, if $6{,}424$ people vote in the election, by how many votes would Angel Cruz be expected to win?
A. $163$
B. $1{,}304$
C. $3{,}864$
D. $5{,}621$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: In the poll, Angel Cruz led by $483 - 320 = 163$ of the $803$ voters. Since $\frac{6{,}424}{803} = 8$, every count in the poll is multiplied by $8$ for the election, so Angel Cruz would be expected to win by $8(163) = 1{,}304$ votes. Choice A is the margin in the poll itself, and choice C is the expected number of votes for Angel Cruz, $8(483) = 3{,}864$.

41. Which of the following data sets appears to have the smallest standard deviation?
A. ![Dot plot on a number line with the values 0, 1, 2, 3, 4, and 5. There are 2 dots above each of the values 0, 1, 2, 3, 4, and 5 (12 dots in all).](tests/images/data-analysis-a/q41a.svg)
B. ![Dot plot on a number line with the values 0, 1, 2, 3, 4, and 5. There is 1 dot above 0, 2 dots above 1, 3 dots above 2, 3 dots above 3, no dots above 4, and 1 dot above 5 (10 dots in all).](tests/images/data-analysis-a/q41b.svg)
C. ![Dot plot on a number line with the values 0, 1, 2, 3, 4, and 5. There are 5 dots above 2 and 5 dots above 3, and no dots above 0, 1, 4, or 5 (10 dots in all).](tests/images/data-analysis-a/q41c.svg)
D. ![Dot plot on a number line with the values 0, 1, 2, 3, 4, and 5. There is 1 dot above 0, 1 dot above 1, 3 dots above 2, 3 dots above 3, 1 dot above 4, and 1 dot above 5 (10 dots in all).](tests/images/data-analysis-a/q41d.svg)
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Standard deviation measures how spread out the values are from the mean. In choice C, every value is $2$ or $3$, so each of the $10$ values is only $0.5$ away from the mean of $2.5$, and the standard deviation is $0.5$. The data sets in choices A, B, and D all have values spread from $0$ to $5$, so their values are farther from their means and their standard deviations are larger (about $1.71$, $1.33$, and $1.36$, respectively).

42. The table below shows the distribution of US states according to whether they have a state-level sales tax and a state-level income tax.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th colspan="3">2013 State-Level Taxes</th></tr><tr><th></th><th>State sales tax</th><th>No state sales tax</th></tr></thead><tbody><tr><td>State income tax</td><td>39</td><td>4</td></tr><tr><td>No state income tax</td><td>6</td><td>1</td></tr></tbody></table></div>

To the nearest tenth of a percent, what percent of states with a state sales tax do not have a state-level income tax?
A. $6.0\%$
B. $12.0\%$
C. $13.3\%$
D. $14.0\%$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: The states with a state sales tax are in the first column of numbers: $39 + 6 = 45$ states. Of these, $6$ have no state income tax. So the percent is $\frac{6}{45} \times 100\% \approx 13.3\%$. Choice B divides by all $50$ states ($\frac{6}{50} = 12.0\%$), and choice D divides by the $43$ states that have a state income tax ($\frac{6}{43} \approx 14.0\%$).

43.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th rowspan="2">State</th><th colspan="4">Power capacity</th></tr><tr><th>Low</th><th>Medium</th><th>High</th><th>Total</th></tr></thead><tbody><tr><td>Texas</td><td>4</td><td>2</td><td>3</td><td>9</td></tr><tr><td>California</td><td>1</td><td>0</td><td>1</td><td>2</td></tr><tr><td>Oregon</td><td>1</td><td>0</td><td>1</td><td>2</td></tr><tr><td>Indiana</td><td>0</td><td>2</td><td>0</td><td>2</td></tr><tr><td>Colorado</td><td>1</td><td>1</td><td>0</td><td>2</td></tr><tr><td>Iowa</td><td>2</td><td>0</td><td>0</td><td>2</td></tr><tr><td>Oklahoma</td><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>Total</td><td>10</td><td>5</td><td>5</td><td>20</td></tr></tbody></table></div>

The table shows the distribution, by location and power capacity (maximum rate of power generation), of the twenty largest wind projects in the United States in 2013. The total power capacity of the nine wind projects located in Texas was $4{,}952$ megawatts (MW), and the total power capacity of the twenty wind projects was $11{,}037$ MW in 2013. The amount of energy produced in one hour at a rate of one megawatt is one megawatt-hour. If each of the nine Texas wind projects in 2013 had operated continuously for $24$ hours at the maximum rate of power generation, approximately how many megawatt-hours of energy would the nine projects have produced?
A. $200$
B. $5{,}000$
C. $11{,}000$
D. $120{,}000$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Operating at their maximum rates, the nine Texas projects together generate $4{,}952$ MW. In $24$ hours they would produce $4{,}952 \times 24 = 118{,}848$ megawatt-hours, which is approximately $120{,}000$. Choice A divides by $24$ instead of multiplying ($\frac{4{,}952}{24} \approx 206$), choice B is the energy produced in only one hour, and choice C uses the total capacity of all twenty projects for only one hour.

44. A zoologist observed the nests of wood ducks in an area. Each year, the zoologist recorded the number of eggs in each of the first $30$ nests that were observed and created a frequency table for the data set. Which of the following frequency tables represents the data set with the smallest standard deviation?
A. $\begin{array}{|c|c|} \hline \text{Number of eggs} & \text{Frequency} \\ \hline 9 & 7 \\ \hline 10 & 6 \\ \hline 11 & 4 \\ \hline 12 & 6 \\ \hline 13 & 7 \\ \hline \end{array}$
B. $\begin{array}{|c|c|} \hline \text{Number of eggs} & \text{Frequency} \\ \hline 9 & 6 \\ \hline 10 & 6 \\ \hline 11 & 6 \\ \hline 12 & 6 \\ \hline 13 & 6 \\ \hline \end{array}$
C. $\begin{array}{|c|c|} \hline \text{Number of eggs} & \text{Frequency} \\ \hline 9 & 2 \\ \hline 10 & 7 \\ \hline 11 & 12 \\ \hline 12 & 7 \\ \hline 13 & 2 \\ \hline \end{array}$
D. $\begin{array}{|c|c|} \hline \text{Number of eggs} & \text{Frequency} \\ \hline 9 & 0 \\ \hline 10 & 5 \\ \hline 11 & 20 \\ \hline 12 & 5 \\ \hline 13 & 0 \\ \hline \end{array}$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Each frequency table is symmetric about $11$, so each data set has a mean of $11$. In table D, $20$ of the $30$ values equal the mean and the other $10$ values are only $1$ away from it, with no values at $9$ or $13$. The other tables have values at $9$ and $13$, which are $2$ away from the mean, and fewer values at $11$. So the values in table D are the most tightly clustered around the mean, and table D has the smallest standard deviation (about $0.58$, compared with about $1.51$, $1.41$, and $1.00$ for tables A, B, and C).

45. A department store sells pants in three lengths: short, regular, and long. The table summarizes the distribution of pants length by color, for all the pants in the store.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th></th><th>Black</th><th>Brown</th><th>Blue</th><th>Total</th></tr></thead><tbody><tr><td>Short</td><td>25</td><td>14</td><td>24</td><td>63</td></tr><tr><td>Regular</td><td>23</td><td>15</td><td>22</td><td>60</td></tr><tr><td>Long</td><td>20</td><td>19</td><td>19</td><td>58</td></tr><tr><td>Total</td><td>68</td><td>48</td><td>65</td><td>181</td></tr></tbody></table></div>

A pair of pants is selected at random. What is the probability of selecting a pair of pants that is brown, given that the pair of pants is regular length? (Express your answer as a decimal or fraction, not as a percent.)
Answer: 1/4 | 0.25
Domain: Problem-Solving and Data Analysis
Explanation: Because the pair of pants is given to be regular length, only the $60$ regular-length pairs are considered. Of these, $15$ are brown. So the probability is $\frac{15}{60} = \frac{1}{4}$, or $0.25$.

46.

![Histogram. The horizontal axis is labeled Number of points and runs from 0 to 70 in intervals of 10; the vertical axis is labeled Frequency and runs from 0 to 30 in steps of 5. Bar heights: 0 for 0 to 10, 10 to 20, and 20 to 30; 2 for 30 to 40; 7 for 40 to 50; 28 for 50 to 60; and 13 for 60 to 70 (50 games in all).](tests/images/data-analysis-a/q46.svg)

The histogram summarizes the distribution of an original data set that represents the number of points per game a basketball team has scored in the last $50$ games played. If the team scores $17$ points in the next game and this game is added to the original data set to create a new data set of $51$ values, which of the following must be true?

I. The median number of points per game for the new data set is less than the median number of points per game for the original data set.

II. The mean number of points per game for the new data set is less than the mean number of points per game for the original data set.
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: Every value in the original data set is at least $30$, so $17$ is less than every original value. Statement II: adding a value that is less than the original mean lowers the mean, so II must be true. Statement I: the original median is the average of the 25th and 26th values in order, which both lie in the $50$ to $60$ interval (the first $2 + 7 = 9$ values are below $50$). With $17$ added as the smallest value, the new median is the 26th of $51$ values, which is the original 25th value. If the original 25th and 26th values are equal (for example, both $55$), the median does not change, so I need not be true.

47.

![Histogram. The horizontal axis is labeled Maximum temperature on April 1 (°F) and runs from 40 to 80 in intervals of 5; the vertical axis is labeled Number of years and runs from 0 to 4. Bar heights: 1 for 40 to 45, 2 for 45 to 50, 3 for 50 to 55, 3 for 55 to 60, 1 for 60 to 65, 0 for 65 to 70, 0 for 70 to 75, and 1 for 75 to 80 (11 years in all).](tests/images/data-analysis-a/q47.svg)

The maximum temperature on April 1, in degrees Fahrenheit (°F), was recorded each year at a certain weather station for $11$ years. The histogram summarizes the recorded data set. The temperature of $77.9^{\circ}\text{F}$ is removed from this data set to create a new data set of $10$ temperatures. Which of the following statements must be true?

I. The mean of the new data set is less than the mean of the original data set.

II. The median of the new data set is less than the median of the original data set.
A. I and II
B. II only
C. Neither I nor II
D. I only
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The temperature $77.9^{\circ}\text{F}$ is the only value in the $75$ to $80$ interval, and every other value is less than $65$, so it is the largest value and is greater than the mean. Statement I: removing a value greater than the mean lowers the mean, so I must be true. Statement II: the original median is the 6th of the $11$ values in order. Removing the largest value leaves the first $10$ values unchanged, so the new median is the average of the 5th and 6th values. Both of these values are in the $50$ to $55$ interval (the first $1 + 2 = 3$ values are below $50$), and if they are equal, the median does not change. So II need not be true, and the answer is I only.

48.

$$\begin{gathered} \text{Data set X: } 13, 16, 19, 21, 24, 25, 25, 26, 38 \\[4pt] \text{Data set Y: } 13, 16, 19, 21, 24, 25, 25, 26, 33 \end{gathered}$$

Data set Y is created by replacing the number $38$ in data set X with the number $33$. Which of the following statements is true about the means and medians of data set X and data set Y?
A. The mean of data set X is greater than the mean of data set Y, and the median of data set X equals the median of data set Y.
B. The mean of data set X is greater than the mean of data set Y, and the median of data set X is greater than the median of data set Y.
C. The mean of data set X equals the mean of data set Y, and the median of data set X equals the median of data set Y.
D. The mean of data set X is less than the mean of data set Y, and the median of data set X is greater than the median of data set Y.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: Replacing $38$ with the smaller number $33$ decreases the sum of the values by $5$, so the mean of data set X, $\frac{207}{9} = 23$, is greater than the mean of data set Y, $\frac{202}{9} \approx 22.44$. Each data set has $9$ values listed in increasing order, so each median is the 5th value, which is $24$ for both data sets (the change affects only the largest value). So the means differ and the medians are equal.

49. For the positive quantities $m$, $q$, and $r$, $m$ is $20\%$ of $m + q + r$, $q$ is $30\%$ of $q + r$, and the value of $r$ is $1{,}526$. What is the value of $m$?
Answer: 545
Domain: Problem-Solving and Data Analysis
Explanation: Since $q = 0.3(q + r)$, it follows that $0.7q = 0.3r$, so $q = \frac{3}{7}(1{,}526) = 654$. Since $m = 0.2(m + q + r)$, it follows that $0.8m = 0.2(q + r)$, so $m = \frac{q + r}{4} = \frac{654 + 1{,}526}{4} = \frac{2{,}180}{4} = 545$.

50. A community organization surveyed a random sample of residents of the community to estimate the percentage of residents who visit their local library at least once per month. From the survey, the organization estimates that $12\%$ of residents of the community visit their local library at least once per month, with an associated margin of error of $3.9\%$. The organization repeated the survey with a random sample of residents that was double the original sample size. Assuming the margins of error are calculated in the same way for both studies, which of the following is true about the margin of error associated with the estimate from the larger sample?
A. The margin of error is less than $3.9\%$.
B. The margin of error is $7.8\%$.
C. The margin of error is greater than $12\%$.
D. The margin of error is $24\%$.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: When the margins of error are calculated in the same way, a larger random sample gives a smaller margin of error. So the margin of error from the sample that is double the original size is less than $3.9\%$ (roughly $\frac{3.9\%}{\sqrt{2}} \approx 2.8\%$). Choices B, C, and D all describe a margin of error larger than $3.9\%$, which would mean the larger sample gave a less precise estimate.

51. The table shows the distribution of two types of trees at two different sites.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th></th><th>Site A</th><th>Site B</th><th>Total</th></tr></thead><tbody><tr><td>Red maple</td><td>16</td><td>24</td><td>40</td></tr><tr><td>Chestnut oak</td><td>12</td><td>30</td><td>42</td></tr><tr><td>Total</td><td>28</td><td>54</td><td>82</td></tr></tbody></table></div>

If a tree represented in the table is selected at random, what is the probability of selecting a tree from site A, given that the tree is a red maple? Express your answer as a decimal or fraction, not as a percent.
Answer: 2/5 | 0.4
Domain: Problem-Solving and Data Analysis
Explanation: Because the tree is given to be a red maple, only the $40$ red maples are considered. Of these, $16$ are from site A. So the probability is $\frac{16}{40} = \frac{2}{5}$, or $0.4$. (Dividing $16$ by the $28$ trees at site A would instead give the probability that a tree is a red maple, given that it is from site A.)

52.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th></th><th>0–9 years</th><th>10–19 years</th><th>20+ years</th><th>Total</th></tr></thead><tbody><tr><td>Group A</td><td>15</td><td>18</td><td>7</td><td>40</td></tr><tr><td>Group B</td><td>6</td><td>7</td><td>27</td><td>40</td></tr><tr><td>Group C</td><td>19</td><td>15</td><td>6</td><td>40</td></tr><tr><td>Total</td><td>40</td><td>40</td><td>40</td><td>120</td></tr></tbody></table></div>

The table summarizes the distribution of age and assigned group for $120$ participants in a study. One of these participants will be selected at random. What is the probability of selecting a participant from group A, given that the participant is at least $10$ years of age?
A. $\dfrac{5}{24}$
B. $\dfrac{5}{16}$
C. $\dfrac{9}{20}$
D. $\dfrac{5}{8}$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The participants who are at least $10$ years of age are in the 10–19 years and 20+ years columns: $40 + 40 = 80$ participants. Of these, $18 + 7 = 25$ are in group A. So the probability is $\frac{25}{80} = \frac{5}{16}$. Choice A divides by all $120$ participants ($\frac{25}{120} = \frac{5}{24}$), and choice D divides by the $40$ participants in group A ($\frac{25}{40} = \frac{5}{8}$).

53. When a collection of books is sorted, $52\%$ are nonfiction and the remaining books are fiction. Of those that are fiction, $75\%$ are westerns and the remaining fiction books are romance. If there are $933$ romance books in this collection, what is the total number of books in the collection?
Answer: 7775
Domain: Problem-Solving and Data Analysis
Explanation: Fiction books are $100\% - 52\% = 48\%$ of the collection, and romance books are $100\% - 75\% = 25\%$ of the fiction books. So romance books are $0.25(0.48) = 0.12$, or $12\%$, of the collection. If $n$ is the total number of books, then $0.12n = 933$, so $n = \frac{933}{0.12} = 7{,}775$.

54. One gallon of sealant costs \$29 and will cover $300$ square feet of a surface. A deck has a total surface area of $d$ square feet. Which equation represents the cost $c$, in dollars, of the sealant needed to cover the deck twice?
A. $c = \dfrac{300d}{29}$
B. $c = \dfrac{600d}{29}$
C. $c = 29\left(\dfrac{d}{150}\right)$
D. $c = 29\left(\dfrac{d}{300}\right)$
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Covering the deck twice means covering $2d$ square feet, which requires $\frac{2d}{300} = \frac{d}{150}$ gallons of sealant. At \$29 per gallon, the cost is $c = 29\left(\frac{d}{150}\right)$ dollars. Choice D is the cost of covering the deck only once, and choices A and B divide by the price per gallon instead of multiplying by it.

55. A scientist studying the life cycle of butterflies counted the number of butterflies in a certain habitat each day for $46$ days. On June 15, there were $168$ butterflies in the habitat. The percent increase in the number of butterflies in the habitat from May 1 to June 15 was $31.25\%$. How many butterflies were in the habitat on May 1?
A. $128$
B. $116$
C. $53$
D. $5$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: A $31.25\%$ increase means the number on June 15 is $1.3125$ times the number on May 1. If $n$ is the number on May 1, then $1.3125n = 168$, so $n = \frac{168}{1.3125} = 128$. Choice B decreases $168$ by $31.25\%$ of $168$ ($168 - 52.5 \approx 116$), which applies the percent to the wrong number, and choice C is $31.25\%$ of $168$, rounded.

56. On average, a certain tree grows $39$ centimeters every $m$ months. At this rate, which expression represents the number of centimeters, on average, the tree grows every $k$ years?
A. $\dfrac{13m}{4k}$
B. $\dfrac{13k}{4m}$
C. $\dfrac{468m}{k}$
D. $\dfrac{468k}{m}$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: The tree grows $\frac{39}{m}$ centimeters per month, on average. Since $k$ years is $12k$ months, the tree grows $\frac{39}{m} \cdot 12k = \frac{468k}{m}$ centimeters every $k$ years. Choice B divides by $12$ instead of multiplying ($\frac{39k}{12m} = \frac{13k}{4m}$), and choices A and C have $m$ and $k$ in the wrong places.

57. The function $g$ is defined as $g(x) = \nobreak \dfrac{2x - 4}{(2x + 11)(x - 6)}$. If $g(a + 5) = 0$, where $a$ is a constant, what is the value of $a$?
Answer: -3
Domain: Advanced Math
Explanation: A rational function equals $0$ where its numerator equals $0$ and its denominator does not. The numerator $2x - 4$ equals $0$ only when $x = 2$, and the denominator at $x = 2$ is $(4 + 11)(2 - 6) = -60 \ne 0$, so $g(x) = 0$ only when $x = 2$. Therefore $a + 5 = 2$, and $a = -3$.

58. The manager of a gym selected a sample of $137$ members at random to estimate the percentage of the gym's members who would continue to pay for a membership if the price increased. From the survey, the manager estimates that $82\%$ of the gym's members would continue to pay for a membership if the price increased, with an associated margin of error of $6.43\%$. If the survey is repeated with a random sample of $274$ members and the results are calculated in the same way, which of the following will be the most likely effect of using the larger random sample compared to the smaller random sample?
A. The margin of error will be lower.
B. The margin of error will be higher.
C. The estimate of the percentage of the gym's members that would continue to pay for a membership if the price increased will be lower.
D. The estimate of the percentage of the gym's members that would continue to pay for a membership if the price increased will be higher.
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: When random samples are taken from the same population and the results are calculated in the same way, a larger sample size gives a smaller margin of error. Doubling the sample size from $137$ to $274$ members will most likely make the margin of error lower than $6.43\%$. A larger sample does not tend to make the estimate of $82\%$ lower or higher; it only makes the estimate more precise, so choices C and D are incorrect.

59. The positive number $a$ is $3{,}700\%$ of the number $c$, and $c$ is $20\%$ of the number $b$. If $a - b = wc$, where $w$ is a constant, what is the value of $w$?
Answer: 32
Domain: Problem-Solving and Data Analysis
Explanation: Since $3{,}700\%$ of $c$ is $37c$, it follows that $a = 37c$. Since $c = 0.2b$, it follows that $b = 5c$. Then $a - b = 37c - 5c = 32c$, so $w = 32$.

60.

<div class="q-table-wrap"><table class="q-table"><thead><tr><th></th><th>Live north of Center St.</th><th>Live south of Center St.</th><th>Total</th></tr></thead><tbody><tr><td>Less than 45 years old</td><td>13</td><td>12</td><td>25</td></tr><tr><td>At least 45 years old</td><td>22</td><td>88</td><td>110</td></tr><tr><td>Total</td><td>35</td><td>100</td><td>135</td></tr></tbody></table></div>

The table summarizes members of a local organization by age and whether they live north or south of Center St. If a member of the organization is selected at random, what is the probability that the selected member is at least $45$ years old?
A. $\dfrac{25}{135}$
B. $\dfrac{35}{135}$
C. $\dfrac{100}{135}$
D. $\dfrac{110}{135}$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: Of the $135$ members, $110$ are at least $45$ years old (the total of that row). So the probability of selecting a member who is at least $45$ years old is $\frac{110}{135}$. Choice A is the probability of selecting a member who is less than $45$ years old, and choices B and C are the probabilities of selecting a member who lives north or south of Center St.

61. The table shows the distribution of people in a certain city by age group.

| Age group | Proportion |
|:---|:---:|
| Less than 18 years old | $27\%$ |
| 18–40 years old | $28\%$ |
| 41–65 years old | $21\%$ |
| Greater than 65 years old | $24\%$ |

If a person in this city is selected at random, which of the following is closest to the probability of selecting a person who is greater than $65$ years old, given that the person is at least $18$ years old?
A. $0.24$
B. $0.33$
C. $0.49$
D. $0.89$
Answer: B
Domain: Problem-Solving and Data Analysis
Explanation: The people who are at least $18$ years old make up $28\% + 21\% + 24\% = 73\%$ of the city (that is, $100\% - 27\%$). Those who are greater than $65$ years old make up $24\%$ of the city. So the probability is $\frac{24}{73} \approx 0.33$. Choice A is the probability of selecting a person greater than $65$ years old from the whole city, which ignores the condition.

62. The daily precipitation total at a weather station is recorded by a weather instrument each day. The daily precipitation total recorded on Monday was $19.00$ millimeters. The daily precipitation total recorded on Tuesday was a $134.00\%$ increase from the daily precipitation total recorded on Monday. What was the daily precipitation total, in millimeters, recorded on Tuesday?
A. $8.12$
B. $14.18$
C. $25.46$
D. $44.46$
Answer: D
Domain: Problem-Solving and Data Analysis
Explanation: A $134.00\%$ increase means Tuesday's total is $100\% + 134\% = 234\%$ of Monday's total: $2.34(19.00) = 44.46$ millimeters. Choice C is $134\%$ of Monday's total ($1.34 \times 19.00 = 25.46$), which treats the increase as the new total.

63.

$$\begin{gathered} \text{Data set A: } 2, 2, 2, 5, 5, 8, 11, 11, 14, 14, 14 \\[4pt] \text{Data set B: } 2, 5, 5, 8, 8, 8, 8, 8, 11, 11, 14 \end{gathered}$$

Data set A and data set B each have $11$ values. Which of the following statements best compares the median of data set A and the median of data set B?
A. The median of data set A is greater than the median of data set B.
B. The median of data set A is less than the median of data set B.
C. The medians of data sets A and B are equal.
D. There is not enough information to compare the medians.
Answer: C
Domain: Problem-Solving and Data Analysis
Explanation: Each data set has $11$ values listed in increasing order, so each median is the 6th value. The 6th value of data set A is $8$, and the 6th value of data set B is also $8$. So the medians are equal, even though the values of data set A are much more spread out.

64. The mass of object A is $416\%$ of the mass of object B, and the mass of object A is $0.064\%$ of the mass of object C. If the mass of object C is $p\%$ of the mass of object B, what is the value of $\dfrac{p}{1{,}000}$?
Answer: 650
Domain: Problem-Solving and Data Analysis
Explanation: Let $A$, $B$, and $C$ be the masses of the three objects. Then $A = 4.16B$ and $A = 0.00064C$, so $C = \frac{A}{0.00064} = \frac{4.16B}{0.00064} = 6{,}500B$. The mass of object C is $6{,}500 \times 100\% = 650{,}000\%$ of the mass of object B, so $p = 650{,}000$ and $\frac{p}{1{,}000} = 650$.

65. For certain air temperatures, the table gives wind chill temperatures for two different wind speeds.

| Air temperature | Wind chill temperature at wind speed 15 mph | Wind chill temperature at wind speed 45 mph |
|:---:|:---:|:---:|
| 26°F | 14°F | 7°F |
| 30°F | 19°F | 12°F |
| 34°F | 24°F | 18°F |

According to the table, what is the wind chill temperature, in degrees Fahrenheit (°F), when the air temperature is $26^{\circ}\text{F}$ and the wind speed is $15$ miles per hour (mph)? (Disregard the degree symbol when entering your answer.)
Answer: 14
Domain: Problem-Solving and Data Analysis
Explanation: In the row for an air temperature of $26^{\circ}\text{F}$, the column for a wind speed of $15$ mph gives a wind chill temperature of $14^{\circ}\text{F}$. (The value $7^{\circ}\text{F}$ in that row is for a wind speed of $45$ mph.)

66. On a plot of land, $52.0\%$ of the square footage is farmland and the remaining square footage is pasture. There are buildings on exactly $21.5\%$ of the square footage of the farmland, and there are buildings on exactly $14.0\%$ of the square footage of the pasture. If there are buildings on exactly $p\%$ of the square footage of the plot of land, what is the value of $p$?
Answer: 17.9
Domain: Problem-Solving and Data Analysis
Explanation: The pasture is $100\% - 52.0\% = 48.0\%$ of the plot. Buildings on farmland cover $0.215(52.0\%) = 11.18\%$ of the plot, and buildings on pasture cover $0.140(48.0\%) = 6.72\%$ of the plot. In all, buildings cover $11.18\% + 6.72\% = 17.9\%$ of the plot, so $p = 17.9$.

67. While the mass of an object is the same everywhere, the weight of an object is not the same on different planets. An object has a weight of $170.00$ pounds on Earth and a weight of $186.32$ pounds on Neptune. The object's weight on Jupiter is $252.8\%$ of its weight on Earth. If the object's weight on Neptune is $x\%$ of its weight on Jupiter, which of the following is closest to the value of $x$?
A. $43.35$
B. $71.73$
C. $277.07$
D. $429.76$
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The object's weight on Jupiter is $2.528(170.00) = 429.76$ pounds. Then $x = \frac{186.32}{429.76} \times 100 \approx 43.35$. Choice D is the weight on Jupiter, in pounds, and choice C multiplies the Neptune weight as a percent of the Earth weight ($109.6\%$) by $2.528$ instead of dividing by it.

68. The maximum temperature on April 1, in degrees Fahrenheit (°F), was recorded each year at a certain weather station for $11$ years. The histogram summarizes the recorded data set.

![Histogram. The horizontal axis is labeled Maximum temperature on April 1 (°F) and runs from 40 to 80 in intervals of 5; the vertical axis is labeled Number of years and runs from 0 to 4. Bar heights: 1 for 40 to 45, 2 for 45 to 50, 3 for 50 to 55, 3 for 55 to 60, 1 for 60 to 65, 0 for 65 to 70, 0 for 70 to 75, and 1 for 75 to 80 (11 years in all).](tests/images/data-analysis-a/q68.svg)

The temperature of $78.2^{\circ}\text{F}$ is removed from this data set to create a new data set of $10$ temperatures. Which of the following statements must be true?

I. The mean of the new data set is less than the mean of the original data set.

II. The median of the new data set is less than the median of the original data set.
A. I only
B. II only
C. I and II
D. Neither I nor II
Answer: A
Domain: Problem-Solving and Data Analysis
Explanation: The temperature $78.2^{\circ}\text{F}$ is the only value in the $75$ to $80$ interval, and every other value is less than $65$, so it is the largest value and is greater than the mean. Statement I: removing a value greater than the mean lowers the mean, so I must be true. Statement II: the original median is the 6th of the $11$ values in order. Removing the largest value leaves the first $10$ values unchanged, so the new median is the average of the 5th and 6th values. Both of these values are in the $50$ to $55$ interval, and if they are equal, the median does not change. So II need not be true, and the answer is I only.
`
});
