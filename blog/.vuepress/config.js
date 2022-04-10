module.exports = {
    title: "João's 博客",
    description: 'Just playing around',
    themeConfig: {
      nav: [
        { text: 'Home', link: '/joaoBlog/' },
        { text: 'Guide', link: '/' },
      ],
      // sidebar: ['/', '/game/', '/life/']
      sidebar: [
        {
          title: '首页',   // 必要的
          path: '/joaoBlog/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
        },
        {
          title: 'DAG-Diagram有向无环图',
          path: '/joaoBlog/dag',
          children: [
            '/joaoBlog/dag/', '/joaoBlog/dag/0'
          ]
        },
        {
          title: '可交互帧动画游戏',
          path: '/joaoBlog/game',
          children: [
            '/joaoBlog/game/',
            '/joaoBlog/game/0',
            '/joaoBlog/game/1',
            '/joaoBlog/game/2',
            '/joaoBlog/game/3',
            '/joaoBlog/game/4',
          ],
          initialOpenGroupIndex: -1 // 可选的, 默认值是 0
        }
      ]
   }
}