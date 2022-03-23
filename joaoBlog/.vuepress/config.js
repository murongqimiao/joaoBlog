module.exports = {
    title: 'João`s 博客',
    description: 'Just playing around',
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' },
      ],
      // sidebar: ['/', '/game/', '/life/']
      sidebar: [
        {
          title: '首页',   // 必要的
          path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
        },
        {
          title: 'DAG-Diagram有向无环图',
          path: '/dag/',
          children: [
            '/dag/', '/dag/0'
          ]
        },
        {
          title: '交互帧动画游戏',
          path: '/game/',
          children: [
            '/game/', '/game/0'
          ],
          initialOpenGroupIndex: -1 // 可选的, 默认值是 0
        }
      ]
   }
}