# 命题逻辑基本等值式笔记

## 1. 结合律 (Associative Laws)
* $(P \vee Q) \vee R = P \vee (Q \vee R)$
* $(P \wedge Q) \wedge R = P \wedge (Q \wedge R)$
* $(P \leftrightarrow Q) \leftrightarrow R = P \leftrightarrow (Q \leftrightarrow R)$

## 2. 交换律 (Commutative Laws)

* $P \vee Q = Q \vee P$
* $P \wedge Q = Q \wedge P$
* $P \leftrightarrow Q = Q \leftrightarrow P$
> **注意：** 蕴含词 ($\to$) **不满足**结合律和交换律。

## 3. 分配律 (Distributive Laws)
* $P \vee (Q \wedge R) = (P \vee Q) \wedge (P \vee R)$
* $P \wedge (Q \vee R) = (P \wedge Q) \vee (P \wedge R)$
* $P \to (Q \to R) = (P \to Q) \to (P \to R)$

## 4. 吸收律 (Absorption Laws)
* $P \vee (P \wedge Q) = P$
* $P \wedge (P \vee Q) = P$

## 5. 关于否定词的等值式
* **双重否定律：** $\neg \neg P = P$
* **De Morgan 律：**
    * $\neg (P \vee Q) = \neg P \wedge \neg Q$
    * $\neg (P \wedge Q) = \neg P \vee \neg Q$
* **蕴含否定：** $\neg (P \to Q) = P \wedge \neg Q$
* **等价否定：**
    * $\neg (P \leftrightarrow Q) = \neg P \leftrightarrow Q = P \leftrightarrow \neg Q$
    * $\neg (P \leftrightarrow Q) = (P \wedge \neg Q) \vee (\neg P \wedge Q)$

## 6. 幂等律 (Idempotent Laws)
* $P \vee P = P$
* $P \wedge P = P$
* $P \to P = \text{T}$
* $P \leftrightarrow P = \text{T}$

## 7. 补余律 (Complement Laws)
* $P \vee \neg P = \text{T}$ （排中律）
* $P \wedge \neg P = \text{F}$ （矛盾律）
* $P \to \neg P = \neg P$
* $\neg P \to P = P$
* $P \leftrightarrow \neg P = \text{F}$

## 8. 同一律 (Identity Laws)
* $P \vee \text{F} = P$
* $P \wedge \text{T} = P$
* $\text{T} \to P = P$
* $P \to \text{F} = \neg P$
* $\text{T} \leftrightarrow P = P$
* $\text{F} \leftrightarrow P = \neg P$

## 9. 零律 (Domination Laws)
* $P \vee \text{T} = \text{T}$
* $P \wedge \text{F} = \text{F}$
* $P \to \text{T} = \text{T}$
* $\text{F} \to P = \text{T}$

## 10. 其他常用等值式 (含有 $\to$ 和 $\leftrightarrow$)
由于 $\neg, \wedge, \vee$ 更易于理解和处理，常将含 $\to$ 和 $\leftrightarrow$ 的公式改写：

* **蕴含等值式：** $P \to Q = \neg P \vee Q = \neg (P \wedge \neg Q)$
* **等价等值式：** $P \leftrightarrow Q = (P \to Q) \wedge (Q \to P)$
* **逆否律：** $P \to Q = \neg Q \to \neg P$
* **合取前提（输出律）：** $P \to (Q \to R) = (P \wedge Q) \to R$
* **等价变换：** $P \leftrightarrow Q = \neg P \leftrightarrow \neg Q$
* **同真同假：** $P \leftrightarrow Q = (P \wedge Q) \vee (\neg P \wedge \neg Q)$
* **一真一假（异或）：** $P \leftrightarrow Q = (P \vee \neg Q) \wedge (\neg P \vee Q)$

---
**💡 小贴士：**
* **变元混同：** 幂等律和补余律的特点是公式中只有同一个变元 $P$ 及其否定。
* **部分混同：** 同一律和零律的特点是变元 $P$ 与常元 $\text{T}$ 或 $\text{F}$ 进行运算。

------

------



**Russell-Whitehead 公理集**

------

### 📜 系统 $\mathcal{A}$ 的四条公理

#### A1. 析取简化公理 (Principle of Simplification)

$$(P \lor P) \supset P$$

- **直观理解**：如果“P 成立或者 P 成立”，那其实就是“P 成立”。它消除了逻辑中的冗余。

#### A2. 析取引入公理 (Principle of Addition)

$$P \supset (P \lor Q)$$

- **直观理解**：如果 P 已经是真的了，那么“P 或者任何东西（Q）”显然也是真的。这就像是你已经有了一张电影票（P），那么你说“我有电影票或者我有五百万（$P \lor Q$）”这句话在逻辑上是没毛病的。

#### A3. 析取交换公理 (Principle of Permutation)

$$(P \lor Q) \supset (Q \lor P)$$

- **直观理解**：逻辑上的“或者”不分先后。这保证了逻辑运算的对称性。

#### A4. 析取传递公理 (Principle of Summation)

$$(Q \supset R) \supset ((P \lor Q) \supset (P \lor R))$$

- **直观理解**：这是公理系统里威力最大的一条。它说：如果 Q 能推出 R，那么我们在 Q 的左边并列一个 P，在 R 的左边也并列一个 P，这种“推导关系”依然保持

---



### 🔑 揭秘还原的“通关密码”

- **“分”**：代表对该定理使用了一次分离规则（MP）。
- **“分分”**：代表对该定理使用了两次分离规则（MP）。

根据**推理定理（演绎定理）**，只要把“分/分分”左边的已知条件，重新用 $\supset$ 捆绑并挪回右边，就能百分之百还原出它原本作为**定理**的真面目！

以下为你整理出系统内 **10 到 24 号定理公式** 的完整全家福：

------

### 📜 命题逻辑系统定理库（No.10 - No.24）

#### 定理 10：同一律 (Law of Identity)

先前推导出的最基础定理。

$$\vdash \alpha \supset \alpha$$

#### 定理 11：交换律 (挖心规则的原形)

$$\vdash (\alpha \supset (\beta \supset \gamma)) \supset (\beta \supset (\alpha \supset \gamma))$$

#### 定理 12：传递律 (假言三段论 / 可传规则的原形)

$$\vdash (\alpha \supset \beta) \supset ((\beta \supset \gamma) \supset (\alpha \supset \gamma))$$

#### 定理 13：凝缩律 (凝缩规则的原形)

$$\vdash (\alpha \supset (\alpha \supset \beta)) \supset (\alpha \supset \beta)$$

#### 定理 14：等价左蕴含律

$$\vdash (\alpha \equiv \beta) \supset (\alpha \supset \beta)$$

#### 定理 15：等价右蕴含律

$$\vdash (\alpha \equiv \beta) \supset (\beta \supset \alpha)$$

#### 定理 16：等价引入律 (双蕴含原形)

$$\vdash (\alpha \supset \beta) \supset ((\beta \supset \alpha) \supset (\alpha \equiv \beta))$$

#### 定理 17：合取消去律 I

从“与”命题中抽离出左边项。

$$\vdash (\alpha \land \beta) \supset \alpha$$

#### 定理 18：合取消去律 II

从“与”命题中抽离出右边项。

$$\vdash (\alpha \land \beta) \supset \beta$$

> *注：17 和 18 号因为对应的导出规则太直观（即 $\alpha \land \beta \vdash \alpha$），不需要起花哨的名字，所以在你那张高级导出规则精简表里被跳过了。*

#### 定理 19：合取引入律 (合取规则的原形)

$$\vdash \alpha \supset (\beta \supset (\alpha \land \beta))$$

#### 定理 20：析取引入律 I

只要 $\alpha$ 成立，就能无条件引入“或 $\beta$”。

$$\vdash \alpha \supset (\alpha \lor \beta)$$

#### 定理 21：析取引入律 II

$$\vdash \beta \supset (\alpha \lor \beta)$$

#### 定理 22：析取消去律 (分类讨论 / 析取规则的原形)

$$\vdash (\alpha \supset \gamma) \supset ((\beta \supset \gamma) \supset ((\alpha \lor \beta) \supset \gamma))$$

#### 定理 23：逆否律 (Law of Contraposition)

大名鼎鼎的正面否定推背面否定。

$$\vdash (\alpha \supset \beta) \supset (\neg \beta \supset \neg \alpha)$$

#### 定理 24：双重否定消去律 (Double Negation)

$$\vdash \neg\neg\alpha \supset \alpha$$

------

### 💡 绝佳的复习视角

现在把这张表和你的课本对照来看，思路就彻底通了：

1. **10–13 号**：处理的是最纯粹的**蕴含控制**（同一、交换、传递、凝缩）。
2. **14–16 号**：专门处理符号 **$\equiv$（等价）** 的拆解与合并。
3. **17–19 号**：专门处理符号 **$\land$（与）** 的拆解与合并。
4. **20–22 号**：专门处理符号 **$\lor$（或）** 的拆解与合并（即分类讨论）。
5. **23–24 号**：开始引入 **$\neg$（非）** 的高级变形法则。

建议把这个列表保存好，后续做任何复杂的符号化推导大题时，它就是你最高效的定理备忘录。