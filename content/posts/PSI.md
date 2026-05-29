---
title: "PSI算法分析与实验对比"
date: 2026-05-28T17:06:54+08:00

summary: "本文介绍 DH-based、OT-based 与 HE-based 三类 PSI 技术路线，并对 DH-PSI、JL10-PSI、MiniPSI、SpOT-PSI 与 APSI 进行实验分析与性能对比。"

tags:
  - 隐私计算
  - PSI
  - 密码学
categories:
  - 网络安全

math: true
toc: true

featuredImage: "https://imgbed.031123.xyz/file/1779976911716_ChatGPT_Image_2026年5月28日_22_00_49.png"

featuredImagePreview: "/JFk0dVyvdvw.jpeg"

images:
  - "https://imgbed.031123.xyz/file/1779976911716_ChatGPT_Image_2026年5月28日_22_00_49.png"

---

## 一、什么是隐私集合交集（PSI）？

隐私集合交集（Private Set Intersection, PSI）是一种经典的安全多方计算技术。

其目标是：

> 在不泄露双方原始数据的前提下，计算两个集合的交集。

一个典型场景：

- 两家医院希望寻找共同患者；
- 但不愿泄露各自独有的数据。

PSI 技术便可以解决这一问题。

---

## 二、PSI 技术路线分类

目前主流 PSI 方案主要可以分为三类：

| 技术路线     | 代表算法                    | 核心技术               |
| ------------ | --------------------------- | ---------------------- |
| DH-based PSI | DH-PSI / JL10-PSI / MiniPSI | ECDH / ECC             |
| OT-based PSI | SpOT-fast / SpOT-low        | OT / OKVS              |
| HE-based PSI | APSI                        | Homomorphic Encryption |

不同路线具有不同特点：

- DH-based PSI 更适合小规模集合；
- OT-based PSI 更适合中大型集合；
- HE-based PSI 更适合非对称查询场景。

---

## 三、DH-based PSI

DH-based PSI 是最经典的一类 PSI 协议。

其核心思想来源于：

$$
(g^a)^b=(g^b)^a
$$

协议通常依赖：

- ECDH
- OPRF
- ECC 运算

特点包括：

- 通信量较低；
- 工程实现简单；
- 小规模集合性能优秀。

本文测试以下三种 DH-based PSI：

1. DH-PSI
2. JL10-PSI
3. MiniPSI

---

### 1. Runtime Comparison

{{< echarts >}}

{
  "title": {
    "text": "Runtime Comparison (DH-based PSI)",
    "left": "center"
  },

  "tooltip": {
    "trigger": "axis"
  },

  "legend": {
    "top": "8%",
    "data": ["DH-PSI", "JL10-PSI", "MiniPSI"]
  },

  "grid": {
    "left": "8%",
    "right": "5%",
    "bottom": "10%",
    "top": "20%",
    "containLabel": true
  },

  "xAxis": {
    "type": "category",
    "name": "log₂(n)",
    "nameLocation": "middle",
    "nameGap": 30,
    "data": ["7", "8", "9", "10"]
  },

  "yAxis": {
    "type": "value",
    "name": "Runtime (ms)"
  },

  "series": [

    {
      "name": "DH-PSI",
      "type": "line",
      "smooth": true,
      "symbol": "circle",
      "symbolSize": 10,
      "data": [32.3, 61.5, 122.9, 249.3]
    },
    
    {
      "name": "JL10-PSI",
      "type": "line",
      "smooth": true,
      "symbol": "rect",
      "symbolSize": 10,
      "data": [33.1, 70.0, 129.7, 262.5]
    },
    
    {
      "name": "MiniPSI",
      "type": "line",
      "smooth": true,
      "symbol": "triangle",
      "symbolSize": 12,
      "data": [27.9, 59.6, 115.7, 240.3]
    }

  ]
}

{{< /echarts >}}

---

### 2. Communication Comparison

{{< echarts >}}

{
  "title": {
    "text": "Communication Comparison (DH-based PSI)",
    "left": "center"
  },

  "tooltip": {
    "trigger": "axis"
  },

  "legend": {
    "top": "8%",
    "data": ["DH-PSI", "JL10-PSI", "MiniPSI"]
  },

  "grid": {
    "left": "8%",
    "right": "5%",
    "bottom": "10%",
    "top": "20%",
    "containLabel": true
  },

  "xAxis": {
    "type": "category",
    "name": "log₂(n)",
    "nameLocation": "middle",
    "nameGap": 30,
    "data": ["7", "8", "9", "10"]
  },

  "yAxis": {
    "type": "value",
    "name": "Communication (KB)"
  },

  "series": [

    {
      "name": "DH-PSI",
      "type": "line",
      "smooth": true,
      "symbol": "circle",
      "symbolSize": 10,
      "data": [8.88, 17.75, 36.00, 72.00]
    },
    
    {
      "name": "JL10-PSI",
      "type": "line",
      "smooth": true,
      "symbol": "rect",
      "symbolSize": 10,
      "data": [8.91, 17.79, 36.04, 72.04]
    },
    
    {
      "name": "MiniPSI",
      "type": "line",
      "smooth": true,
      "symbol": "triangle",
      "symbolSize": 12,
      "data": [8.04, 16.04, 32.04, 64.04]
    }

  ]
}

{{< /echarts >}}

---

### 3. 实验分析

从实验结果可以看出：

- 三种算法均呈线性增长趋势；
- MiniPSI 在运行时间与通信量方面均表现更优；
- DH-PSI 与 JL10-PSI 整体性能接近。

其中：

MiniPSI 通过 subset-sum 与 polynomial encoding 进一步压缩了通信量，因此在小规模集合场景下具有更好的整体性能。

---

## 四、OT-based PSI

OT-based PSI 主要基于：

- Oblivious Transfer
- OKVS
- Sparse OT Extension

相比 DH-based PSI：

- 更适合大规模集合；
- 在线阶段更快；
- 更适合工业场景。

本文测试：

1. SpOT-fast
2. SpOT-low

---

### 1. Runtime Comparison

{{< echarts >}}

{
  "title": {
    "text": "Runtime Comparison (OT-based PSI)",
    "left": "center"
  },

  "tooltip": {
    "trigger": "axis"
  },

  "legend": {
    "top": "8%",
    "data": ["SpOT-fast", "SpOT-low"]
  },

  "grid": {
    "left": "8%",
    "right": "5%",
    "bottom": "10%",
    "top": "20%",
    "containLabel": true
  },

  "xAxis": {
    "type": "category",
    "name": "log₂(n)",
    "nameLocation": "middle",
    "nameGap": 30,
    "data": ["10", "12", "14", "16"]
  },

  "yAxis": {
    "type": "value",
    "name": "Runtime (ms)"
  },

  "series": [

    {
      "name": "SpOT-fast",
      "type": "line",
      "smooth": true,
      "symbol": "circle",
      "symbolSize": 10,
      "data": [84.4, 182.5, 522.1, 1904.3]
    },
    
    {
      "name": "SpOT-low",
      "type": "line",
      "smooth": true,
      "symbol": "triangle",
      "symbolSize": 12,
      "data": [154.9, 560.8, 2548.0, 12143.4]
    }

  ]
}

{{< /echarts >}}

---

### 2. Communication Comparison

{{< echarts >}}

{
  "title": {
    "text": "Communication Comparison (OT-based PSI)",
    "left": "center"
  },

  "tooltip": {
    "trigger": "axis"
  },

  "legend": {
    "top": "8%",
    "data": ["SpOT-fast", "SpOT-low"]
  },

  "grid": {
    "left": "8%",
    "right": "5%",
    "bottom": "10%",
    "top": "20%",
    "containLabel": true
  },

  "xAxis": {
    "type": "category",
    "name": "log₂(n)",
    "nameLocation": "middle",
    "nameGap": 30,
    "data": ["10", "12", "14", "16"]
  },

  "yAxis": {
    "type": "value",
    "name": "Communication (KB)"
  },

  "series": [

    {
      "name": "SpOT-fast",
      "type": "line",
      "smooth": true,
      "symbol": "circle",
      "symbolSize": 10,
      "data": [92, 307, 1178, 4720]
    },
    
    {
      "name": "SpOT-low",
      "type": "line",
      "smooth": true,
      "symbol": "triangle",
      "symbolSize": 12,
      "data": [82, 256, 983, 3994]
    }

  ]
}

{{< /echarts >}}

---

### 3. 实验分析

实验结果表明：

- SpOT-fast 运行速度明显更快；
- SpOT-low 通信量更低；
- 当集合规模增大后，两者差异进一步扩大。

因此：

- SpOT-fast 更适合低延迟场景；
- SpOT-low 更适合带宽敏感环境。

---

## 五、HE-based PSI

HE-based PSI（Homomorphic Encryption-based PSI）主要基于：

- BFV Homomorphic Encryption
- Polynomial Evaluation
- OPRF
- Cuckoo Hashing

代表算法包括：

- Microsoft APSI

相比：

- DH-based PSI
- OT-based PSI

HE-based PSI 更适用于：

$$
|Y| \ll |X|
$$

即：

- Receiver 查询集合较小；
- Sender 数据库规模巨大；

的大规模非对称查询场景。

---

### 1. APSI 实验结果

> 说明：
>
> - R→S：Receiver → Sender 的通信量；
> - S→R：Sender → Receiver 的通信量。
>
> 在 APSI 中：
>
> - R→S 主要包含：
>   - OPRF request
>   - HE encrypted query
>   - cuckoo hashing query packing
>
> - S→R 主要包含：
>   - encrypted matching result
>   - polynomial evaluation result
>   - intersection response

| 实验类型  | Sender规模 | Receiver规模 | JSON参数文件       | R→S     | S→R     | Total   | Time   | Memory | 状态 |
| --------- | ---------- | ------------ | ------------------ | ------- | ------- | ------- | ------ | ------ | ---- |
| 非对称PSI | 4096       | 1024         | `1M-1024-com.json` | 1289 KB | 98 KB   | 1388 KB | 0.31 s | 18 MB  | 成功 |
| 非对称PSI | 65536      | 1024         | `1M-1024-com.json` | 1289 KB | 165 KB  | 1454 KB | 0.39 s | 19 MB  | 成功 |
| 非对称PSI | 262144     | 1024         | `1M-1024-com.json` | 1290 KB | 365 KB  | 1655 KB | 0.52 s | 21 MB  | 成功 |
| 非对称PSI | 1048576    | 1024         | `1M-1024-com.json` | 1289 KB | 1163 KB | 2453 KB | 9.79 s | 23 MB  | 成功 |
| 对称PSI   | 1024       | 1024         | `1M-1024-com.json` | 1289 KB | 98 KB   | 1388 KB | 0.28 s | 19 MB  | 成功 |
| 对称PSI   | 2048       | 2048         | `1M-2048-com.json` | 2700 KB | 227 KB  | 2928 KB | 0.44 s | 28 MB  | 成功 |

---

### 2. JSON 参数文件说明

| JSON文件           | 官方推荐规模                      | 特点                              |
| ------------------ | --------------------------------- | --------------------------------- |
| `1M-1024-com.json` | Sender ≤ 1048576，Receiver ≤ 1024 | communication optimized           |
| `1M-2048-com.json` | Sender ≤ 1048576，Receiver ≤ 2048 | 支持更大的 Receiver query packing |

---


### 3. 实验现象分析

#### （1）非对称 PSI

实验中：

$$
|Y| \ll |X|
$$

即：

- Receiver规模固定为1024；
- Sender规模从4096增长至1048576。

实验结果表明：

1. Receiver→Sender（R→S）通信量基本保持稳定；
2. Sender→Receiver（S→R）通信量随着 Sender 增长而增加；
3. Receiver 内存占用变化较小；
4. APSI 在大数据库查询场景下具有良好扩展性。

这是因为：

- R→S 主要由 query packing 决定；
- S→R 主要由 polynomial evaluation result 决定。

因此：

Sender 数据规模增长后：

$$
S \rightarrow R
$$

会显著增加。

---

#### （2）对称 PSI

实验中：

$$
|X| \approx |Y|
$$

实验结果表明：

1. 当 Receiver 从1024增长至2048时：
   - Receiver→Sender（R→S）通信量明显增长；
   - query packing 开销增加；
   - 内存占用明显增加；

2. APSI 的 Receiver complexity 主要由：

$$
|Y|
$$

决定；

3. balanced PSI 场景下：
   - HE ciphertext packing
   - cuckoo hashing

会成为主要性能瓶颈。

---

### 4. 核心结论

实验结果说明：

1. APSI 更适用于：

$$
|Y| \ll |X|
$$

的大规模非对称 PSI 场景；

2. Receiver query complexity 主要由：

$$
|Y|
$$

决定；

3. 在 Receiver规模固定时，
   Sender规模变化对：

$$
R \rightarrow S
$$

通信量影响较小；

4. 当 Receiver规模增加时，

- HE query packing
- cuckoo hashing

开销会显著增加。

因此：

HE-based PSI 虽然理论安全性较高，但：

- HE 开销较大；
- 内存占用较高；
- balanced PSI 场景下性能压力明显。

---

## 六、总结

不同 PSI 技术路线适用于不同场景：

| 技术路线     | 优点           | 缺点           |
| ------------ | -------------- | -------------- |
| DH-based PSI | 小规模效率高   | 不适合超大规模 |
| OT-based PSI | 在线阶段极快   | 协议实现复杂   |
| HE-based PSI | 支持非对称查询 | HE 开销较高    |

综合来看：

- DH-based PSI 更适合轻量级场景；
- OT-based PSI 更适合工业级大规模场景；
- HE-based PSI 更适合隐私数据库查询场景。
