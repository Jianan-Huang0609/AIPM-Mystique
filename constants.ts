
import { Post, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'PM Architecture', 'AI Cultivation', 'Q&A'];

// Using a stable generated avatar with your theme colors
const AUTHOR_AVATAR = 'https://ui-avatars.com/api/?name=Jianan+Huang&background=734025&color=fff&size=128';

export const MOCK_POSTS: Post[] = [
  // --- HOME PAGE ---
  {
    id: 'home',
    title: '论CER PoC项目的架构决策与研发效能管理',
    date: 'Intro',
    location: 'Overview',
    category: 'Intro',
    viewpoint: "在一个垂直领域，如何低成本基于敏捷开发实践AI解决方案",
    content: "我的总结可能只适合PoC阶段的非产品软件小型项目开发。",
    characteristics: [
      {
        label: "特点一",
        description: "开发资源都是借来的，没有强制的owner authority，做好大家随时可能被主线项目召回的准备；"
      },
      {
        label: "特点二",
        description: "Deadline不可动，一个月的时间如何彼此快速进入协作模式，怎么让大家持续投入？"
      },
      {
        label: "特点三",
        description: "Fuzzy input、Fuzzy output、重专家反馈的Evals，功能架构的边界模糊。"
      }
    ],
    images: [], 
    takeaway: "",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },

  // --- PART 1: PM Architecture (Steps 0-5) ---
  {
    id: 'step-0',
    title: '0. 【日常积累】Networking/组队选人 --> 技术栈选型',
    date: 'Step 0',
    location: 'Networking',
    category: 'PM Architecture',
    viewpoint: "PoC项目成功的基础在于选对人，就像选模型需要了解参数，选人需要理解背景和协作模式。",
    content: `### 底层逻辑

*   **产品化自己**：认清自己的长短板：缺工程经验但懂AI前沿产品、信息；
*   **前置Networking**：用项目合作经历/爱好作为连接器，在非项目周期就开始布局人脉网络；
*   **对潜在合作伙伴的三个关键理解**：过往经验、兴趣程度、可用时间/精力。

### 实践案例
差异化沟通&协作模式：

*   **A**：工程师思维严谨，端到端交付能力强，适合核心功能模块；
*   **B**：项目理解能力强，UI设计很有企业级审美，适合前端交互优化；
*   **关键动作**：成为对方频道的人，让团队对我形成靠谱、执行力强、沟通顺畅的第一印象。

### 实际效果

*   确认PoC团队对AI有热情、对项目有兴趣、对协作有期待
*   对结果导向的开发节奏有心理预期（能接受适度加班）
*   项目启动时已建立信任基础，减少磨合成本`,
    images: [], 
    takeaway: "项目未动，人脉先行。PM的第一个交付物不是文档，而是项目概念和个人名片，以争取团队向心信任",
    tradeoff: "Tradeoff: PoC阶段最大的风险不是具体的技术做不出来，而是中途断档。但若是成熟的Project，这个环节不用很刻意。",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  {
    id: 'step-1',
    title: '1. 项目启动：系统设计 → 需求定义与架构搭建',
    date: 'Step 1',
    location: 'Kickoff',
    category: 'PM Architecture',
    viewpoint: "PM在项目初期是信息密度最高的节点，需要将多方信息翻译成离开发者最近的语言。",
    content: `### 底层逻辑
*   **第一次会议的效率决定项目基调**。
*   **明确deadline**：11.27交付CER报告生成功能，大家往11.21号冲刺。
*   **明确场景和效果**：把自己对项目的理解和需求编写进框架。

### 实践案例

**1. 定义项目功能边界**
按照历史材料吸收CER的真实工作流和Evals + 并定义让用户眼前一亮的必备功能。

**2. 生成完整项目包（8个章节）：**

*   **CH1-2**: 需求定义、痛点梳理 + 传统工作流分析
    *   *价值*: 快速对齐团队认知，降低认知熵
*   **CH3**: 架构设计（设计hand层处理数据+Brian层输出生成式内容+UI层串联实现H in the loop） + 模块分工
    *   *价值*: 痛点→解决方案→角色分配的完整链路
*   **CH4**: Evals/Qulity Gate定义
    *   *价值*: 项目启动就建立质量意识（CMDE评估准备）
*   **CH5-7**: 任务清单 + 会议记录模板 + 权限开放（S_Code、SharePoint、Team chat）
    *   *价值*: 执行层面的操作规范

**3. 带着项目原型和开发沟通**
- Hand包、Brain包可以先写一个带着业务流程的框架给到开发。直接定义清楚input、output流程、格式和我期待的颗粒度。这样能帮助开发专注功能的开发与性能的优化。


**4. 队内维护信息尽早确立**
- 公共Teams频道、ShareFolder
- 通用模块架构文档
- Gitlab Code小组（输入输出文档、API Json包）
- 固定的周会/双周会节奏

### 实际效果
- 折叠多轮讨论时间，第一次会议后大家就知道自己要干什么，且有材料学习了解背景。
- 业务痛点被翻译成离开发者最近的实现逻辑。
- 文档既是人类说明书也是AI prompt，两端通用。`,
    images: [
      { url: 'assets/CER Function.png', caption: '章节理解与定义' },
	  { url: 'assets/项目管理文件.png', caption: '项目管理文件' },
      { url: 'assets/Hand Prototype.png', caption: 'Hand Prototype' },
      { url: 'assets/Brain Prototype.png', caption: 'Brain Prototype' }
    ],
    takeaway: "- 写人和工具都看得懂的文档，一文一功能、一页一需求。\n- 用把业务逻辑、输入输入、项目预期和优化空间写Prototype，减少开发理解需求的摩擦力。",
    tradeoff: "- 如果需求高度不确定（变更率>50%），重文档反而是负担\n- 如果团队是成熟团队（合作过3次以上），trust/Project experiences > documentation",
    reflection: "反思复盘\n- 并行开发而非端到端交付，注意收敛自己pushy的紧凑感。\n- 明确PM交叉属性的价值，而非大包大揽的兼顾：Brain层的框架搭建是可行高效的，但一定要给开发留独立完整的设计空间。\n- 做好没有人看文档的准备，意识到解释澄清在项目初期的重要性。",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  {
    id: 'step-2',
    title: '2. 开发过程：上下文管理 → 信息的精准投喂',
    date: 'Step 2',
    location: 'Process',
    category: 'PM Architecture',
    viewpoint: "对待团队成员像对待LLM——上下文需要充分、记忆管理需要完备、注意力需要被门控聚焦。",
    content: `### 底层逻辑
- 各个模块Owner不需要记住所有细节，甚至不需要参与全程讨论。只需要在每次会议前被注入当前任务最相关的context。这极大减少因信息不同步导致的开发偏差。

### 实践案例
**会议三段式流程：**

1. **会前准备**
   - 准备agenda，相关文档邮件提前发送
   - 针对每个人准备具体讨论话题
   - 准备Memo清单（按模块和优先级）

2. **会中执行**
   - 基于Memo清单，带着具体问题讨论
   - 往结论与共识靠拢，避免发散
   - 实时记录决策和分歧点

3. **会后闭环**
   - 快速整合：Owner + Action + DDL
   - Meeting Minutes 2小时内同步
   - 更新共享文档和代码库


### 实际效果
- 宝贵的会议时间聚焦于不确定问题的解决，而非公共信息的传递， 比如来自专家的feedback，来自大家的纠错和优化，来自模块包交互之间的需求。
- 开发人员专注于核心功能，不被流程打扰。`,
    images: [
      { url: 'assets/会前讨论.png', caption: '会前讨论' },
      { url: 'assets/会议三-专家讨论.png', caption: '专家讨论' },
      { url: 'assets/会议后action memo.png', caption: '会议后action memo' }
    ],
    takeaway: "正确认识PoC会议：要利用宝贵的PoC会议时间来减少/解决模糊性。会前能被整理的清晰的信息不应该占用会议时间现场生成。\n\n最小化记录和誊写工作：只准备一个输入源，但是设想好输出源的不同工具搭配。比如从设计到开发到present：可以直接md-->xml/html-->Slides",
    reflection: "反思复盘\n- 确保成员对模块的ownership：边界太清晰会遏制其他解法的可能性，Brainstorming类会议就不完全适用。",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  {
    id: 'step-3',
    title: '3. 质量保障：V&V验证 → PM作为Human-in-the-Loop',
    date: 'Step 3',
    location: 'Quality',
    category: 'PM Architecture',
    viewpoint: "PM是连接代码逻辑和业务逻辑的中间层，需要双向翻译并快速验证。",
    content: `### 底层逻辑
业务反馈需求和痛点 → PM挖掘并设计产品功能与架构 → 带着原型去找开发落地功能 → 开发人员输出代码（Model Output）→ PM基于产品功能+业务逻辑打分 + 反馈给开发人员做定性Evals 

### 实践案例

**案例1：沟通中枢对齐**
- 1112A成员输出脚本结果
- PM筛查一遍 + 约CUC专家20分钟快速会议
- 总结专家认可的模板逻辑
- 会上快速传递review feedback和优化方向


**案例2：技术探针验证**
- **需求**：差异分析需要三层逻辑（产品特性 + 临床影响 + 风险评估）
- **动作**：简单验证prompt是否达到效果
- **反馈链**：归纳业务逻辑 → 代码draft（验证效果+确定可行性） → 业务实现落地


**✅ 实际效果**
- 开发人员的输出与真实业务价值快速对齐
- 技术探针验证可行性后再投入开发资源
- 减少做了才发现不对的返工`,
    images: [
       { url: 'assets/三层逻辑.png', caption: '业务端的三层逻辑' },
       { url: 'assets/Change.png', caption: 'Change.md' },
       { url: 'assets/image.png', caption: 'Communication' }
    ],
    takeaway: "PM要站在user视角看代码逻辑，站在开发视角看需求。",
    tradeoff: "但是如果有更好/更资深的资源，PM不要主动承担翻译，而是引入翻译（请tech lead帮忙）",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  {
    id: 'step-4',
    title: '4. 风险控制：可观测性 → 进度监控与雷达预警',
    date: 'Step 4',
    location: 'Risk Control',
    category: 'PM Architecture',
    viewpoint: "PM作为系统的监控面板，实时查看进度偏差。",
    content: `### 底层逻辑
在会议与会议之间，通过代码进度和个人状态监测，在风险显性化之前介入。

### 实践案例
**关键周突发情况处理：**
- **情况**：有一个成员突发地在项目关键节点前要出差。
- **动作**：
  1. 快速确认ta的上下游依赖（谁在等ta的输出？ta在等谁的输入？）
  2. 评估风险：功能模块的优先级、是否有替代方案
  3. 决策：用mockup数据交付给ta的下游；沟通确认ta部分修改的方向能在1天内被实现
- **观察点**：代码提交频率、日常约饭交流；

### 实际效果
- 局部突发第一时间被监测到
- 团队感受到被关注但不被micromanage`,
    images: [], 
    takeaway: "不是盯人，是盯系统健康度。用commit频率等指标来观察系统开发速度。",
    tradeoff: "- 但是如果团队稳定性高，过度容错会有不信任感。\n- ",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  {
    id: 'step-5',
    title: '5. 封装发布 --> 总结复盘',
    date: 'Step 5',
    location: 'Release',
    category: 'PM Architecture',
    viewpoint: "把项目经验和中间产物资产化，方便调用不同工具进行复用和分享。",
    content: `### 底层逻辑
下一次做项目时，不需要从头总结，直接加载复盘后的模型，启动速度更快。

### 实践案例

**1. 文档资产化**
- 技术文档PRD化 → Copilot快速归纳/总结/审阅
- 非敏感信息HTML → 第三方AI工具可视化生图
- 项目timeline和决策树XML → draw图表自动生成并可编辑

**2. 经验蒸馏**
- 提炼可复用的Skill包（如会议三段式流程）
- 分享给跨项目PM，累加总结高效价值
- 扩大个人影响力和方法论的传播

### 目标
- 下一个PoC项目启动周期从2周缩短到3天
- 团队新成员onboarding时间减少50%
- 个人方法论成为团队标准流程`,
    images: [],
    takeaway: "项目结束不是终点，是下一个项目的起点。做知识的compound interest。",
    downloadableTemplate: {
      title: "一键复制PM管理包",
      filename: "PM管理包_HJN.md",
      content: `# PM 一键复制包

<模块根>/
├── README.md                 # 本模板（层级说明 + 使用/复用指南）
├── 01_需求定义/             # 需求层：需求说明、用户故事、验收标准
├── 02_工作流总结/           # 流程层：步骤、协作流程、端到端示例
├── 03_架构设计/             # 架构层：总体设计、各层职责、接口契约
├── 04_成功指标/             # 成功度量层：KPI、验收准则、质量指标
├── 05_会议记录/             # 现场沟通与决策记录
├── 06_潜在功能升级/         # 技术债/后续升级建议
├── 07_总结复盘/             # 可选，项目结束后归纳
├── 08_Skill包/              # 可选，项目结束后归纳

---

## 用法：可以copilot读取本readme，直接生成对应章节和模板.md

## 各章节可复用模板（01—08）

### CH01 — 需求定义 (01_需求定义)

- 目的：明确问题、目标用户、成功标准与时间线，作为后续所有设计与实现的度量基准。
- 必备条目：项目目标（一句话+KPI）、用户画像、用户痛点、关键功能清单、验收标准、里程碑时间线。
- 推荐结构：
	1. 项目概述（一句话）
	2. 核心目标（量化）
	3. 用户/场景（Who / When / Where）
	4. 用户痛点与影响
	5. 需求清单（Must / Should / Could / Won't）
	6. 验收标准与成功指标（可量化项）
	7. 时间线与关键里程碑
- 示例字段：核心目标：自动化率70%、输出符合法规、交付时间等。

### CH02 — 工作流总结 (02_工作流总结)

- 目的：把人工或现有流程固化为可执行的端到端步骤，便于团队理解人工步骤，由此设计自动化流程。
- 必备条目：流程概览图、每步输入/输出、负责人、依赖资源、自动化化程度（手工/半自动/全自动）。
- 推荐结构：
	1. 总览（流程图或表格）
	2. 步骤清单（Step N：目的/输入/输出/责任人）
	3. 异常与回退策略
	4. 自动化建议点与优先级
- 示例字段：Step 1 用户上产文件 → 调用 Hand.locate_content；Step 输出：结构化对比数据 + 抓取日志。

### CH03 — 架构设计 (03_架构设计)

- 目的：定义系统分层（Manager/Hand/Brain/Reviewer/Auditor/用户），并说明每层的输入/输出契约与质量闸口。
- 必备条目：总体架构图、各层职责表、核心接口规范（输入/输出 schema）、质量门（Reviewer/Auditor 判定阈值）、示例 prompt/函数签名。
- 推荐结构：
	1. 总体架构与图示
	2. 各层职责一览（表格）
	3. 接口契约（JSON schema / 占位符示例）
	4. 质量与审计策略（阈值、评分方法）
	5. 关键技术选型与性能要求
- 示例字段：Hand.parse_file 输出结构、Brain.analyze_difference 输出 JSON 模式、Reviewer 综合评分阈值。

### CH04 — 成功指标 (04_成功指标)

- 目的：把“成功”量化，给开发、评审与验收提供可测的 KPI 和验证方法。
- 必备条目：人工标准的输出样式、质量指标（准确率/引用准确率）。
- 推荐结构：
	1. KPI 列表与基线/目标
	2. 人工标准的输出样式
	3. 定性/定量指标（如准确率、生成速度等）
- 示例字段：总周期由 30 天降至 1-3 天；核心数据准确率 >95%。

### CH05 — 会议记录 (05_会议记录)

- 目的：记录决策、分工与行动项，保证信息可追溯并能驱动后续交付。

### 会前
- 发送议程+材料，标出“不确定/待决策”3-5 点。
- 为每个人准备专属问题/期待的结论。
- Memo 草单：按模块/优先级列问题，预期口径。

### 会中（30-60m）
- 按 Memo/Note 驱动，聚焦模糊点，现场收敛。
- 记录：结论、分歧、阻塞（谁来解、何时解）。

### 会后（<=2h）
- 输出 Owner/Action/DDL 表 + 背景链接。
- 更新文档/Issue，标记下一步阻塞点。

### 快速记录模版
| 议题 | 结论/分歧 | Owner | Action | DDL | 背景链接 |
|------|-----------|-------|--------|-----|----------|
| {议题} | {结论/待定} | {人} | {动作} | {日} | {文档/Issue} |

### CH06 — 潜在功能升级 / 技术栈 (06_潜在功能升级)

- 目的：记录技术债、优化建议与未来可选能力，便于后续版本迭代评估优先级。
- 必备条目：候选优化清单（优先级）、技术方案简述、风险/收益评估、预估成本与负责人建议。
- 推荐结构：
	1. 优化项表（名称/概述/收益/风险/优先级）
	2. 技术选型建议（工具/库/平台）
	3. 采纳决策流程
- 示例字段：OCR 优化（DeepSeek-OCR）→ 提高解析精度但增加成本；优先级：中。`
    },
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },

  // --- PART 2: AI Cultivation (Milestones 1-4) ---
  {
    id: 'm-1',
    title: 'Milestone 1：AI深度使用者',
    date: 'Level 1',
    location: 'User',
    category: 'AI Cultivation',
    viewpoint: "按需求能创新性高效能使用流程/工具组合，产品化思维：把每个痛点都当作可数字化/AI化的机会。",
    content: `### 能力画像
- Top Ranking模型/产品的深度使用者
- 按需求能创新性高效能使用流程/工具组合

### 价值体现
- **效能节省**：用AI处理重复性工作 → 外包AI实现他擅长的部分 → 辅助思考，深化决策；
- **Presentation优化**：自动生成图表、总结、美化；
- **产品化思维**：把每个痛点都当作可数字化/AI化的机会。

### Q&A
- 我最近一周用AI做了什么非常规操作？
- 对我的工作学习带来什么效能提高？`,
    images: [
      { url: 'assets/Prime.png', caption: '项目更新' },
      { url: 'assets/Prime2.0.png', caption: '5Dtable' }
    ],
    takeaway: "Deep Dive into AI Tools. Make it a habit.",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  {
    id: 'm-2',
    title: 'Milestone 2：前沿信息学习者',
    date: 'Level 2',
    location: 'Learner',
    category: 'AI Cultivation',
    viewpoint: "关注硅谷一线AI builder（学术界、科技公司、初创团队leader），用GPTs/Gemini构建属于自己的智囊团。",
    content: `### 信息源建设
- 关注硅谷一线AI builder（学术界、科技公司、初创团队leader）
- 参加线下活动，对标五年后的自己
- 用GPTs/Gemini构建属于自己的智囊团

### 价值体现
- 知道哪些技术已经实现，了解AI的能力边界(最近很惊艳的是仿生物学的记忆机制，Nested Learning)
- 了解外部企业和个人的实践，学习、链接、自我定位
- 避免闭门造车和重复造轮子

### 定期自检
- 总结近期AI领域的3个重大突破，以及对我的影响。
- 自我评估的能力画像和学习路径。`,
    images: [],
    takeaway: "Stay updated. Build your personal AI advisory board.",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  {
    id: 'm-3',
    title: 'Milestone 3：AI玩具/PoC/完整项目交付者',
    date: 'Level 3',
    location: 'Builder',
    category: 'AI Cultivation',
    viewpoint: "工程化能力：理解开发流程和技术债务；项目级PM能力：资源协调、风险控制、Evals把关。",
    content: `### 价值总结
- **工程化能力**：理解开发流程和技术债务
- **项目级PM能力**：资源协调、风险控制、Evals把关
- **能力画像清晰**：个人长板与短板定位

### 实践方法
- 用兴趣驱使做prototype，AI玩具。
- 在实践中补全知识和技能
- Wiki和Airtable作为外部知识库，我和GPTs一并编写。

### 交流分享
- 从0到1交付完整PoC或SaaS项目（AI玩具辅助学习生活）
- 建立个人方法论和工具箱(各类分享项目)
- 形成可复制的项目打法(版本管理、上下文工程/PDR意识、前端设计、产品化思维)`,
    images: [{ url: 'assets/knowvis.png', caption: 'KnowVis Project' }], 
    takeaway: "Ship it. From toy to tool.",
    links: [{ title: 'KnowVis', url: 'https://know-vis.vercel.app/' }],
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  {
    id: 'm-4',
    title: 'Milestone 4：AI知识布道者',
    date: 'Level 4',
    location: 'Evangelist',
    category: 'AI Cultivation',
    viewpoint: "以AI为探棒，结识相似兴趣的人才；成为业务端和开发端都信任的翻译官。",
    content: `### 核心动作
- 以AI为探棒，结识相似兴趣的人才
- 把每次活动转化为可deliver的项目或page
- 成为业务端和开发端都信任的翻译官

### 价值体现
- 扩大人才吸引力和影响力
- 成为团队的AI实践标杆
- 推动组织的AI能力建设

### 定期自检
- 最近一周有无线上Post/线下分享？
- 有多少人因为我开始尝试AI工具？`,
    images: [{ url: 'assets/cursor.png', caption: 'Cursor Meetups' }],
    takeaway: "Influence others. Be the bridge.",
    links: [{ title: 'Cursor Meetups', url: 'https://cursor-meets-up.vercel.app/' }],
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  },
  
  // --- Q&A SECTION ---
  {
    id: 'qa',
    title: 'Q&A & Thoughts',
    date: 'Q&A',
    location: 'Discussion',
    category: 'Q&A',
    viewpoint: "开放讨论：关于文档粒度、沟通效率与职责边界的思考。",
    content: "以下是关于PoC项目管理中常见问题的思考。",
    qaItems: [
      {
        topic: "关于文档",
        questions: [
            "你们更喜欢详细但长的PRD，还是简洁但可能要追问的Spec？",
            "如果我写了伪代码，你们会觉得有帮助还是多余？"
        ]
      },
      {
        topic: "关于沟通",
        questions: [
            "这种会前会后双向闭环的方式，你们觉得效率高还是太繁琐？",
            "如果你们希望PM少开会、多异步沟通，那什么信息适合异步、什么必须开会？"
        ]
      },
      {
        topic: "关于边界",
        questions: [
            "PM介入到技术探针验证这一步，你们觉得是帮忙还是越界？",
            "如果觉得越界了，你们希望PM在哪里停下来？"
        ]
      }
    ],
    images: [],
    takeaway: "Communication is the key.",
    author: 'Jianan Huang',
    authorAvatar: AUTHOR_AVATAR
  }
];
