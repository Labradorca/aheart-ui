# Select 虚拟列表前置布局竞态复核

首轮desktop-webkit中，跟踪中间key用例在首次点击后未见活动行，原断言失败。trace显示输入点击时docs-demo-toolbar不存在，点击后才出现；此时Vue已mounted，DocInteractions仍在80 ms后隐藏源代码块并插入工具栏，触发器发生位移，不能把mounted当作完整布局就绪。[原用例和trace](../select-first-attempt/)保留。

e2e/d4-select-virtual.spec.ts现在在文档父页/iframe的原Vue mounted条件后，等待真实工具栏可见再交互。没有改活动key/index/id/可见性/滚动/行高/数据更新/iframe断言、超时或重试。Select/Combobox/Button源码和full.css未改变。其余两类相同竞态见[hover复核](../hover-recheck/README.md)与[Combobox复核](../combobox-recheck/results.json)。

完整Select virtual文件在五项目复核25/25通过，含宽度/字体、插入删除重排/活动移除、空搜索恢复、尾部/禁用导航/高度锚定和iframe卸载。配置与结果在本目录，命令输出在../select-recheck.txt。后续须用最终候选再跑全量，不能以局部复核抹掉首轮4项失败。
