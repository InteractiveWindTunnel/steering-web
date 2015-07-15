<?php
namespace KrOs\WFIS\FrontendBundle\Entity;

use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\ORM\Mapping as ORM;

/**
 * KrOs\WFIS\FrontendBundle\Entity\Setting
 *
 * @ORM\Entity()
 * @ORM\Table(name="settings")
 */
class Setting
{
  /**
  * @var integer $id
  *
  * @ORM\Column(name="id", type="integer")
  * @ORM\Id
  * @ORM\GeneratedValue(strategy="AUTO")
  */
    protected $id;
  
  /**
  * @var string $key
  *
  * @ORM\Column(type="string", length=255, name="key")
  */
    protected $key;
  
  /**
  * @var string $value
  *
  * @ORM\Column(type="string", length=255, name="value")
  */
    protected $value;
  
    public function getId()
    {
        return $this->id;
    }
    public function setKey($newVal)
    {
        $this->key = $newVal;
        return $this;
    }
    public function getKey()
    {
        return $this->key;
    }
    public function setValue($newVal)
    {
        $this->value = $newVal;
        return $this;
    }
    public function getValue()
    {
        return $this->value;
    }
}
