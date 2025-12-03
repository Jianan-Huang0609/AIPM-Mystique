
import { Post, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'PM Architecture', 'AI Cultivation'];

export const MOCK_POSTS: Post[] = [
  // --- PART 1: PM Architecture (Steps 0-5) ---
  {
    id: 'step-0',
    title: '0. 组队选人 & 技术选型',
    date: 'Step 0',
    location: 'Networking',
    category: 'PM Architecture',
    viewpoint: "PoC项目成功的基础在于\"选对人\"，就像选模型需要了解参数，选人需要理解背景和协作模式。",
    content: `### 底层逻辑

*   **产品化自己**：认清自己的长短板：缺工程经验但懂AI前沿产品、信息；
*   **前置Networking**：用项目合作经历/爱好作为连接器，在非项目周期就开始布局人脉网络；
*   **对潜在合作伙伴的三个关键理解**：过往经验、兴趣程度、可用时间/精力。

### 实践案例
针对 **V1/VZR3** 项目组建：

*   **XH**：工程师思维严谨，端到端交付能力强，适合核心功能模块；
*   **ZR**：项目理解能力强，UI设计很有SSME审美，适合前端交互优化；
*   **关键动作**：成为"对方频道的人"，让团队对我形成"靠谱、执行力强、沟通顺畅"的第一印象。

### 实际效果

*   确认PoC团队对AI有热情、对项目有兴趣、对协作有期待
*   对结果导向的开发节奏有心理预期（能接受适度加班）
*   项目启动时已建立信任基础，减少磨合成本`,
    images: [
      { url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop', caption: 'Networking & Team Building' }
    ],
    takeaway: "项目未动，人脉先行。PM的第一个交付物不是文档，而是\"项目概念和个人名片，以争取团队向心信任\"。",
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },
  {
    id: 'step-1',
    title: '1. 项目启动：系统设计',
    date: 'Step 1',
    location: 'Kickoff',
    category: 'PM Architecture',
    viewpoint: "PM在项目初期是信息密度最高的节点，需要将多方信息\"翻译\"成离开发者最近的语言。",
    content: `### 底层逻辑
*   **第一次会议的效率决定项目基调**。
*   **明确deadline**：11.27交付CER报告生成功能，大家往11.21号冲刺。
*   **明确场景和效果**：把自己对项目的理解和需求编写进框架。

### 实践案例

**1. 花一个下午生成完整项目包（8个章节）：**

*   **CH1-2**: 需求定义、痛点梳理 + 传统工作流分析
    *   *价值*: 快速对齐团队认知，降低认知熵
*   **CH3**: 架构设计（设计hand层处理数据 + Brian层输出生成式内容 + UI层串联实现H in the loop） + 模块分工
    *   *价值*: 痛点→解决方案→角色分配的完整链路
*   **CH4**: Evals/Quality Gate定义
    *   *价值*: 项目启动就建立质量意识（CMDE评估准备）
*   **CH5-7**: 任务清单 + 会议记录模板 + 权限开放（SiemensCode、SharePoint、Team chat）
    *   *价值*: 执行层面的操作规范

**2. 带着项目原型和开发沟通**
Hand包、Brain包可以先写一个带着业务流程的框架给到开发。直接定义清楚input、output流程、格式和我期待的颗粒度。

*   公共Teams频道、ShareFolder
*   通用模块架构文档
*   SiemensCode小组（输入输出文档、API Json包）
*   固定的周会/双周会节奏

### 实际效果
*   折叠多轮讨论时间，第一次会议就能进入实质性技术讨论
*   业务痛点被翻译成离开发者最近的实现逻辑
*   文档既是"人类说明书"也是"AI prompt"，两端通用`,
    images: [
      { url: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Hand+Prototype', caption: 'Hand Prototype.png' },
      { url: 'https://placehold.co/800x600/cbd5e1/1e293b?text=Brain+Prototype', caption: 'Brain Prototype.png' }
    ],
    takeaway: "写AI和人都看得懂的文档。PRD不是给PM自己看的，是给\"全栈\"看的（人+AI）。用把业务逻辑、输入输入、项目预期和优化空间写Prototype。减少开发立即你需求的摩擦力。",
    reflection: "并行开发而非端到端交付；做好没有人看文档的准备。",
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },
  {
    id: 'step-2',
    title: '2. 开发过程：上下文管理',
    date: 'Step 2',
    location: 'Process',
    category: 'PM Architecture',
    viewpoint: "对待团队成员像对待LLM——上下文需要充分、记忆管理需要完备、注意力需要被门控聚焦。",
    content: `### 底层逻辑
各个模块Owner不需要记住所有细节，甚至不需要参与全程讨论。只需要在每次会议前被注入当前任务最相关的context。这极大减少因信息不同步导致的开发偏差。

### 实践案例：会议三段式流程

**1. 会前准备**
*   准备agenda，相关文档邮件提前发送。
*   针对每个人准备具体讨论话题。
*   准备Memo清单（按模块和优先级）。

**2. 会中执行**
*   基于Memo清单，带着具体问题讨论。
*   往结论与共识靠拢，避免发散。
*   实时记录决策和分歧点。

**3. 会后闭环**
*   快速整合：Owner + Action + DDL。
*   Meeting Minutes 2小时内同步。
*   更新共享文档和代码库。

### 实际效果
*   宝贵的会议时间聚焦于"不确定问题的解决"，而非"公共信息的传递"。
*   开发人员专注于核心功能，不被流程打扰。`,
    images: [
      { url: 'https://placehold.co/800x500/f1f5f9/1e293b?text=Meeting+Prep+Memo', caption: '会前讨论.png' },
      { url: 'https://placehold.co/800x500/e2e8f0/1e293b?text=Expert+Discussion', caption: '会议三-专家讨论.png' },
      { url: 'https://placehold.co/800x500/cbd5e1/1e293b?text=Action+Memo', caption: '会议后action memo.png' }
    ],
    takeaway: "正确认识PoC会议：要利用宝贵的PoC会议时间来减少/解决模糊性。会前能被整理的清晰的信息不应该占用会议时间现场生成。最小化记录和誊写工作：只准备一个输入源，但是设想好输出源的不同工具搭配。",
    reflection: "明确PM交叉属性的价值，而非大包大揽的兼顾：Brain层的框架搭建是可行高效的，但重复劳动没必要，一定要给开发留独立完整的设计空间。",
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },
  {
    id: 'step-3',
    title: '3. 质量保障：V&V验证',
    date: 'Step 3',
    location: 'Quality',
    category: 'PM Architecture',
    viewpoint: "PM是连接\"代码逻辑\"和\"业务逻辑\"的中间层，需要双向翻译并快速验证。",
    content: `### 底层逻辑
业务反馈需求和痛点 → PM挖掘并设计产品功能与架构 → 带着原型去找开发落地功能 → 开发人员输出代码（Model Output）→ PM基于产品功能+业务逻辑打分 + 反馈给开发人员做定性Evals。

### 实践案例

**案例1：沟通中枢对齐**
*   1112樊博输出脚本结果
*   PM筛查一遍 + 约CUC专家20分钟快速会议
*   总结专家认可的模板逻辑
*   会上快速传递review feedback和优化方向

**案例2：技术探针验证**
*   **需求**：差异分析需要三层逻辑（产品特性 + 临床影响 + 风险评估）
*   **动作**：简单验证prompt是否达到效果
*   **反馈链**：归纳业务逻辑 → 代码draft（验证效果+确定可行性） → 业务实现落地

### 实际效果
*   开发人员的输出与真实业务价值快速对齐
*   技术探针验证可行性后再投入开发资源
*   减少"做了才发现不对"的返工`,
    images: [
       { url: 'https://placehold.co/800x600/f8fafc/1e293b?text=Three+Layer+Logic', caption: '三层逻辑.png' },
       { url: 'https://placehold.co/800x600/f1f5f9/1e293b?text=Change+Analysis', caption: 'Change.png' },
       { url: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Communication', caption: 'image.png (Communication)' }
    ],
    takeaway: "PM要站在user视角看代码，站在开发视角看需求。做RLHF中的那个\"H\"。",
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },
  {
    id: 'step-4',
    title: '4. 风险控制：可观测性',
    date: 'Step 4',
    location: 'Risk Control',
    category: 'PM Architecture',
    viewpoint: "PM作为系统的\"监控面板\"，实时查看进度偏差。",
    content: `### 底层逻辑
在会议与会议之间，通过代码进度和个人状态监测，在风险显性化之前介入。

### 实践案例：关键周突发情况处理
*   **情况**：有一个队员突发地在项目关键节点前要出差。
*   **动作**：
    1.  快速确认ta的上下游依赖（谁在等ta的输出？ta在等谁的输入？）
    2.  评估风险：功能模块的优先级、是否有替代方案
    3.  决策：调整排期 or mockup资源补位
*   **工具**：代码提交频率、日常约饭交流。

### 实际效果
*   局部突发第一时间被监测到
*   团队感受到"被关注但不被micromanage"`,
    images: [
        { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', caption: 'Risk Monitoring & Radar' }
    ], 
    takeaway: "不是盯人，是盯系统健康度。",
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },
  {
    id: 'step-5',
    title: '5. 封装发布 & 总结复盘',
    date: 'Step 5',
    location: 'Release',
    category: 'PM Architecture',
    viewpoint: "把项目经验和中间产物\"资产化\"，方便调用不同工具进行复用和分享。",
    content: `### 底层逻辑
下一次做项目时，不需要从头总结，直接加载"复盘后的模型"，启动速度更快。

### 实践案例

**1. 文档资产化**
*   技术文档PRD化 → Copilot快速归纳/总结/审阅
*   非敏感信息HTML → 第三方AI工具可视化生图
*   项目timeline和决策树XML → draw图表自动生成并可编辑

**2. 经验蒸馏**
*   提炼可复用的Skill包（如"会议三段式流程"）
*   分享给跨项目PM，累加总结高效价值
*   扩大个人影响力和方法论的传播

### 实际效果
*   下一个PoC项目启动周期从2周缩短到3天
*   团队新成员onboarding时间减少50%
*   个人方法论成为团队标准流程`,
    images: [
        { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop', caption: 'Asset Library & Documentation' }
    ],
    takeaway: "项目结束不是终点，是下一个项目的起点。做知识的compound interest。",
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },

  // --- PART 2: AI Cultivation (Milestones 1-4) ---
  {
    id: 'm-1',
    title: 'Milestone 1：AI深度使用者',
    date: 'Level 1',
    location: 'User',
    category: 'AI Cultivation',
    viewpoint: "按需求能创新性高效能使用流程/工具组合，产品化思维：把每个痛点都当作可AI化的机会。",
    content: `### 能力画像
*   Top Ranking模型/产品的深度使用者
*   按需求能创新性高效能使用流程/工具组合

### 价值体现
*   **效能节省**：用AI处理重复性工作 → 外包AI实现他擅长的部分 → 辅助思考，深化决策；
*   **Presentation优化**：自动生成图表、总结、美化；
*   **产品化思维**：把每个痛点都当作可AI化的机会。

### Q&A
*   我最近一周用AI做了什么非常规操作？
*   对我的工作学习带来什么效能提高？`,
    images: [
      { url: 'https://placehold.co/800x600/f8fafc/1e293b?text=Prime+Update', caption: 'Prime.png' },
      { url: 'https://placehold.co/800x600/f1f5f9/1e293b?text=5D+Table', caption: 'Prime2.0.png' }
    ],
    takeaway: "Deep Dive into AI Tools. Make it a habit.",
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },
  {
    id: 'm-2',
    title: 'Milestone 2：前沿信息学习者',
    date: 'Level 2',
    location: 'Learner',
    category: 'AI Cultivation',
    viewpoint: "关注硅谷一线AI builder（学术界、科技公司、初创团队leader），用GPTs/Gemini构建属于自己的智囊团。",
    content: `### 信息源建设
*   关注硅谷一线AI builder
*   参加线下活动，对标"五年后的自己"
*   用GPTs/Gemini构建属于自己的智囊团

### 价值体现
*   知道哪些技术已经实现，了解AI的能力边界(最近很惊艳的是仿生物学的记忆机制，Nested Learning)
*   了解外部企业和个人的实践，学习、链接、自我定位
*   避免闭门造车和重复造轮子

### 定期自检
*   总结近期AI领域的3个重大突破，以及对我的影响。
*   自我评估的能力画像和学习路径。`,
    images: [
         { url: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=800&auto=format&fit=crop', caption: 'AI Advisory Board' }
    ],
    takeaway: "Stay updated. Build your personal AI advisory board.",
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },
  {
    id: 'm-3',
    title: 'Milestone 3：项目交付者',
    date: 'Level 3',
    location: 'Builder',
    category: 'AI Cultivation',
    viewpoint: "工程化能力：理解开发流程和技术债务；项目级PM能力：资源协调、风险控制、Evals把关。",
    content: `### 价值总结
*   **工程化能力**：理解开发流程和技术债务
*   **项目级PM能力**：资源协调、风险控制、Evals把关
*   **能力画像清晰**：个人长板与短板定位

### 实践方法
*   用兴趣驱使做prototype，AI玩具。
*   在实践中补全知识和技能
*   Wiki和Airtable作为外部知识库，我和GPTs一并编写。

### 交流分享
*   从0到1交付完整PoC或SaaS项目（AI玩具辅助学习生活）
*   建立个人方法论和工具箱(各类分享项目)
*   形成可复制的项目打法(版本管理、上下文工程/PDR意识、前端设计、产品化思维)`,
    images: [
      { url: 'https://placehold.co/800x500/f8fafc/1e293b?text=KnowVis+Project', caption: 'KnowVis Project Screenshot' }
    ],
    takeaway: "Ship it. From toy to tool.",
    links: [{ title: 'KnowVis Project', url: 'https://jianan-huang0609.github.io/KnowVis/Example.html' }],
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  },
  {
    id: 'm-4',
    title: 'Milestone 4：AI知识布道者',
    date: 'Level 4',
    location: 'Evangelist',
    category: 'AI Cultivation',
    viewpoint: "以AI为探棒，结识相似兴趣的人才；成为业务端和开发端都信任的\"翻译官\"。",
    content: `### 核心动作
*   以AI为探棒，结识相似兴趣的人才
*   把每次活动转化为可deliver的项目或page
*   成为业务端和开发端都信任的"翻译官"

### 价值体现
*   扩大人才吸引力和影响力
*   成为团队的AI实践标杆
*   推动组织的AI能力建设

### 定期自检
*   最近一周有无线上Post/线下分享？
*   有多少人因为我开始尝试AI工具？`,
    images: [
      { url: 'https://placehold.co/800x500/f8fafc/1e293b?text=AI+Self+Starter', caption: 'AI_Self_Starter Screenshot' }
    ],
    takeaway: "Influence others. Be the bridge.",
    links: [{ title: 'AI Self Starter', url: 'https://ai-self-starter.vercel.app/' }],
    author: 'Jianan Huang',
    authorAvatar: 'https://picsum.photos/seed/jianan/100/100'
  }
];
